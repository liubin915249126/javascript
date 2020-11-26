# Jenkins 官网构建 任务 #
*Testnet* :  首先需要去  build-deploy_home-Testnet  选择日期分支构建脚本。 然后使用 newprod-deploy-home-Testnet 发布/回滚
*Prod* :  首先需要去  build-deploy_home-Prod  选择日期分支构建脚本。 然后使用 newprod-deploy-home 发布/回滚
官网的 打包方式改了，去掉了submoudle， 打包后会push 到 deploy-home 的repo