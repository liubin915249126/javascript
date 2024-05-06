# only these branches will be run through CI:
#   - master
#   - testing
#   - dev
#

# The runner will use following pre-defined variables for build:
#   - CI_PROJECT_NAME: project name
#   - CI_COMMIT_REF_NAME: branch/tag name
#   - CI_REGISTRY: the address of GitLab's Container Registry
#   - CI_JOB_TOKEN: Token used for authenticating with the GitLab Container Registry
#   - K8S_API_SERVER: choose predefined variables among K8S_API_SERVER_${MASTER, STAGING, TESTING, DEV}
#   - K8S_API_TOKEN: choose predefined variables among K8S_API_TOKEN_${MASTER, STAGING, TESTING, DEV}
#   - MAVEN_PULL_USER: maven download account
#   - MAVEN_PULL_PASSWORD: maven download account password
#   - MAVEN_PUSH_USER: maven upload account
#   - MAVEN_PUSH_PASSWORD: maven upload account password
#
# If the CI_PROJECT_NAME is "api", the RELEASE_VERSION is "v2", CI_COMMIT_REF_NAME is "master", the
# generated kubernetes deployment name would be like:
#     api-v2-master
# If the CI_PROJECT_NAME is "api", the RELEASE_VERSION is "v2", CI_COMMIT_REF_NAME is "testing", the
# generated kubernetes deployment name would be like:
#     api-v2-testing
#
# only variables in the "editable area" should be modified.

variables:
  # {{ editable area begin }}
  RELEASE_VERSION: v2
  # {{ editable area end }}
  K8S_API_SERVER: K8S_API_SERVER_${CI_COMMIT_REF_NAME}
  K8S_API_TOKEN: K8S_API_TOKEN_${CI_COMMIT_REF_NAME}
  CONTAINER_IMAGE: ${CI_REGISTRY}/exchange/code/${CI_PROJECT_NAME}
  CONTAINER_IMAGE_FULL: ${CI_REGISTRY}/exchange/code/${CI_PROJECT_NAME}:${CI_COMMIT_REF_NAME}
  DEPLOYMENT_NAME: ${CI_PROJECT_NAME}-${RELEASE_VERSION}-${CI_COMMIT_REF_NAME}
  DEPLOYMENT_NAME_A: ${CI_PROJECT_NAME}-${RELEASE_VERSION}-${CI_COMMIT_REF_NAME}-nodejs

  # do not modify variables below
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: ''
  GIT_STRATEGY: clone
  GIT_SUBMODULE_STRATEGY: none
  S3_PATH: s3://static-prod/web-frontend
  AWS_RETRY_MODE: standard
  AWS_MAX_ATTEMPTS: 6
  # GIT_SUBMODULE_UPDATE_FLAGS: --remote --checkout --no-single-branch

before_script:
  - git branch

stages:
  - build
  - release
  - deploy

workflow:
  rules:
    - if: '$CI_COMMIT_REF_NAME == "dev"'
      variables:
        S3_PATH: s3://static-dev/web-frontend
    - if: '$CI_COMMIT_REF_NAME == "testing"'
      variables:
        S3_PATH: s3://static-file/web-frontend
    - if: '$CI_COMMIT_REF_NAME == "master"'
      variables:
        S3_PATH: s3://static-prod/web-frontend
    - if: '$CI_COMMIT_REF_NAME == "beta"'
      variables:
        S3_PATH: s3://static-prod/web-frontend

build:
  stage: build
  only:
    - master
    - beta
    - testing
    - dev
  tags:
    - gcp-grouprunner
  # cache:
  #   key: $CI_JOB_NAME-$CI_COMMIT_REF_NAME
  #   paths:
  #     - node_modules/
  image: registry.bitmartpro.com/exchange/code/node:16.15.0-python3.05
  before_script:
    - git config -f .gitmodules submodule.frontend-shared.branch ${CI_COMMIT_REF_NAME}
    - git submodule update --init --recursive --remote
    # - export PATH=/root/.nvm/versions/node/v10.15.3/bin:$PATH
    - mkdir -p /cache/"${DEPLOYMENT_NAME}"/"${CI_COMMIT_REF_NAME}"
    # - rm -f package-lock.json
    - cat package.json
    - npm install pnpm@8.3.0 -g
    - pnpm install
  script:
    - pnpm run ${CI_COMMIT_REF_NAME}:build
    - pnpm run ${CI_COMMIT_REF_NAME}:generate
    - pnpm prune --production
    - cd .nuxt/dist/
    - aws s3 sync client $S3_PATH/client --endpoint-url https://926665fbecf5fd26176d2bc48baa2ba6.r2.cloudflarestorage.com
    - cd ../..
    - aws s3 sync dist $S3_PATH/static --endpoint-url https://926665fbecf5fd26176d2bc48baa2ba6.r2.cloudflarestorage.com --exclude 'charting_library-v22-221103/*' --exclude '*.html'
    - tar -czf build.tar.gz node_modules/ .nuxt/ dist/ static/ scripts/
    - if [ ! -d /cache/"${DEPLOYMENT_NAME}"/"${CI_COMMIT_REF_NAME}" ];then  mkdir -p /cache/"${DEPLOYMENT_NAME}"/"${CI_COMMIT_REF_NAME}" ; fi
    - mv build.tar.gz /cache/"${DEPLOYMENT_NAME}"/"${CI_COMMIT_REF_NAME}"/

release:
  stage: release
  services:
    - docker:dind
  only:
    - master
    - beta
    - testing
    - dev
  tags:
    - gcp-grouprunner-ssh
  image: docker:latest
  script:
    - cp /data/buildfile/"${DEPLOYMENT_NAME}"/"${CI_COMMIT_REF_NAME}"/build.tar.gz ./
    - tar -xzf build.tar.gz
    - docker login -u ${USER} -p ${TOKEN} ${CI_REGISTRY}
    - docker build -t ${CONTAINER_IMAGE_FULL} .
    - docker push ${CONTAINER_IMAGE_FULL} | grep sha256 | cut -d ' ' -f 3 > hash
  artifacts:
    name: imagehash
    paths:
      - hash
    expire_in: 3 month

deploy:
  stage: deploy
  only:
    - master
    - beta
    - testing
    - dev
  tags:
    - gcp-grouprunner-ssh
  image: lachlanevenson/k8s-kubectl:v1.8.4
  script:
    - K8S_API_SERVER="$(echo ${K8S_API_SERVER}|tr '[:lower:]' '[:upper:]')" && K8S_API_TOKEN="$(echo
      ${K8S_API_TOKEN}|tr '[:lower:]' '[:upper:]')" && eval K8S_API_SERVER=$(echo \$$K8S_API_SERVER)
      && eval K8S_API_TOKEN=$(echo \$$K8S_API_TOKEN) &&
    - >-
      export imagehash=$(  cat hash  ) && echo $imagehash &&
      kubectl --insecure-skip-tls-verify
      --server="${K8S_API_SERVER}" --token="${K8S_API_TOKEN}"
      patch deployment "${DEPLOYMENT_NAME}" -n default
      --patch="
      {\"spec\":
        {\"template\":
          {\"spec\":
            {\"containers\":
              [{\"name\":\"${DEPLOYMENT_NAME}\", \"image\":\"${CONTAINER_IMAGE}@${imagehash}\"}]
            }
          }
        }
      }"
    - >-
      export imagehash=$(  cat hash  ) && echo $imagehash &&
      kubectl --insecure-skip-tls-verify
      --server="${K8S_API_SERVER}" --token="${K8S_API_TOKEN}"
      patch deployment "${DEPLOYMENT_NAME_A}" -n default
      --patch="
      {\"spec\":
        {\"template\":
          {\"spec\":
            {\"containers\":
              [{\"name\":\"${DEPLOYMENT_NAME_A}\", \"image\":\"${CONTAINER_IMAGE}@${imagehash}\"}]
            }
          }
        }
      }"
