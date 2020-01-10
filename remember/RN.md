#### 

react-native run-ios
react-native run-android

#### gradle
brew doctor

brew update && brew install gradle

brew install gradle
brew uninstall gradle
  brew versions gradle
    // brew tap homebrew/boneyard  
    brew install subversion@1.8
brew upgrade gradle

/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

#### brew update无反应
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git

####  Deprecated Gradle features were used in this build, making it incompatible with Gradle 6.0.
cd ./android

//Windows
gradle.bat assembleRelease      

//Linux,Macd
./gradle assembleRelease  

export GRADLE_HOME=/Applications/Android Studio.app/Contents/gradle/gradle-4.4/bin
export PATH=${PATH}:${GRADLE_HOME}/bin


#### command not found: vim
export PATH=/usr/bin:/usr/sbin:/bin:/sbin:/usr/X11R6/bin
vim ~/.bash_profile
source ~/.bash_profile  

#### SDK location not found. Define location with an ANDROID_SDK_ROOT environment variable or by setting the sdk.dir path in your project's local properties file at '/Users/jerry/Desktop/github/maohaizi/mhz-app/WisdomCat/android/local.properties'.
从androidStudio根目录中，复制一份local.properties到react-native android项目根目录中

sdk.dir=/Users/jerry/Library/Android/sdk
flutter.sdk=/Users/jerry/flutter
flutter.versionName=1.0.0
flutter.versionCode=1

#### Failed to connect to development server using "adb reverse": spawnSync adb ENOENT
adb reverse tcp:8081 tcp:8081
#### command not found: adb
source ~/.bash_profile

#### Make sure you have an Android emulator running or a device connected and have set up your Android...
1、手机（虚拟机）没有连上电脑，用adb devices查看是否列出设备。
2、local.properties中没有配置本地SDK的路径。
3、修改android/gradlew的权限。在项目根路径下运行chmod 755 android/gradlew
4、除去能查到的常规原因，还可能是手机内存不足安装失败导致的（这就是我遇到的原因）。

#### Could not find method implementation() for arguments [com.facebook.react:react-native:+] on object of type org.gradle.api.internal.artifacts.dsl.dependencies.DefaultDependencyHandler.
react-native link react-native-image-crop-picker
"react-native-image-crop-picker": "git+https://github.com/ivpusic/react-native-image-crop-picker",