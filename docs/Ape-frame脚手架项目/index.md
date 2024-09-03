# APE-FRAME脚手架项目

## 概览

::: tip 项目简介✨

项目简介

ape-frame，ape是“猿”的意思，正好符合我们程序猿的称号!我希望未来这个框架是专属于我们程序猿的首选开发框架。

一直想做一款适用于中小企业的轻量级快速开发框架，涵盖平时业务开发的常用场景，做到即插即用。用户可根据自身情况选择组件来进行使用。采取组件化开发模式。比如用户需要redis，则选择redis组件，需要websocket，则引入websocket组件，用户自身不需要再开发什么，只需要按照组件规则进行使用即可。

同时，有些经典的工具以及经典的设计模式代码，提供了大量实例参考，用户的业务场景一旦用到，就可以直接使用。

项目整体采用maven结构开发，封装了大量的模块，彼此解耦。满足日常开发需要

:::

## 项目模块介绍

### ape-common

* ape-common-job:分布式任务调度组件(定时任务处理)
* ape-common-l0g:日志组件，提供日志切面自动记录及异步日志提升性能
* ape-common-mybatisplus:采用Mybatisplus作为与数据库交互
* ape-common-redis:缓存组件，提供基于redis的操作封装，redis分布式锁，guava的cache工具类
* ape-common-starter:启动类组件，与启动类相关的功能，放到此组件处
* ape-common-swagger:swagger组件，提供整体项目访问api的入口及方法文档
* ape-common-test:测试组件，集成springboot-test，及代码单元测试，代码覆盖率，行覆盖率检
  测
* ape-common-tool:常用的工具类组件，满足业务日常开发的各种需要，保障安全性，低入侵性
* ape-common-web:web组件，提供统一异常处理，web模块转换，统-返回值
* ape-common-websocket:websocket组件，提供一套带鉴权的websocket，引入即用，简单方便
* ape-mail:邮件发送组件

### ape-demo

提供ape-common各种组件的实际使用方式

### ape-dependencies

该项目只有一个pom文件，将各种依赖版本管理和打包插件都放在ape-dependencies项目中，其他包引入该包，不再做任何版本的指定，以此来加强对依赖包版本的管理！提供项目整体的maven包的锁定及规范，统一升级，统一引入。

## Build打包配置

因为SpringBoot是以内嵌jar包的形式存在，我们需要build插件以及打包工具，将SpringBoot位于resource的相关配置一并进行打包，不然很可能打包之后依然无法加载resource中的相关配置！

```xml
<properties>
    <java.version>1.8</java.version>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.plugin.version>3.10.1</maven.plugin.version>
    <maven.compile.source>1.8</maven.compile.source>
    <maven.compile.target>1.8</maven.compile.target>
</properties>

<build>
    <plugins>
        <plugin>
            <!-- 使用 Maven 打包插件 -->
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>${maven.plugin.version}</version>
            <!-- 对source、target以及encoding进行相关配置 -->
            <configuration>
                <source>${maven.compile.source}</source>
                <target>${maven.compile.target}</target>
                <encoding>UTF-8</encoding>
            </configuration>
        </plugin>
                    <!--springboot插件打包部署-->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.4.2</version>
                <configuration>
                    <mainClass>com.york.user.UserApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
    </plugins>
    <resources>
        <!-- 需要将source中的配置文件打进去 -->
        <resource>
            <directory>src/main/resources</directory>
        </resource>
        <!-- 需要将Mybatis-Plus也要打包进来 -->
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
        </resource>
    </resources>
</build>
```



