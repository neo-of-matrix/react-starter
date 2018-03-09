### 16、React Native环境搭建 ###

### 一、安装Node.js, python 2（一定是版本2）, yarn（可选） ###

    yarn global add react-native-cli
    或者
    npm install react-native-cli -g

设置镜像地址

具体设置参考：[https://github.com/designersmallweb/react-technology-stack/blob/master/docs/1%E3%80%81%E5%AE%89%E8%A3%85node%E5%92%8Cyarn.md](https://github.com/designersmallweb/react-technology-stack/blob/master/docs/1%E3%80%81%E5%AE%89%E8%A3%85node%E5%92%8Cyarn.md "https://github.com/designersmallweb/react-technology-stack/blob/master/docs/1%E3%80%81%E5%AE%89%E8%A3%85node%E5%92%8Cyarn.md")

### 二、安装Android Studio ###

[http://www.android-studio.org/](http://www.android-studio.org/ "http://www.android-studio.org/")

### 三、安装Android SDK ###

下载最新SDK-TOOLS（也就是SDK Manager一个下载工具）

打开Android Studio

打开SDK Manager

更新Android SDK Tools（最新版更新以后不能直接双击打开，只能通过Android Studio打开了）

下载Android 6.0下面的Android SDK platform 23

下载最新版Android SDK Build-Tools

下载Android SDK Build-Tools 23.0.1

下载Android Emulator

下载Android SDK Platform-Tools

下载Intel x86 Emulator Accelerator (HAXM installer)

下载Android Support Repository

### 四、设置环境变量 ###

    Android_HOME SDK路径
    Path SDK\tools
    Path SDK\platform-tools

### 五、安装模拟器 ###

海马玩模拟器本身没有菜单键

两种方式调出菜单

1. 键盘上的菜单键
1. 使用Droid4X 快捷键工具

[http://www.droid4x.cn/bbs/forum.php?mod=viewthread&tid=9461](http://www.droid4x.cn/bbs/forum.php?mod=viewthread&tid=9461 "http://www.droid4x.cn/bbs/forum.php?mod=viewthread&tid=9461")

### 六、运行项目 ###

1、模拟器运行

打开模拟器

react-native init 项目名

cd 项目名

react-native run-android

2、真机运行

下载"网络adb"

[http://dl.pconline.com.cn/download/1016932.html](http://dl.pconline.com.cn/download/1016932.html "http://dl.pconline.com.cn/download/1016932.html")

打开基于网络的adb，需要root权限

命令行adb connect 地址（格式为IP:5555）

react-native run-android