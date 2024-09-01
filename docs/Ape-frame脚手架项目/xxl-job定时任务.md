# 为什么用xxl-job

由于SpringBoot自带的定时任务有诸多缺点，例如调度任务的程序是分布式的，需要我们在程序中实现分布式锁，有诸多的弊端，所以选择集成 ==**xxl-job**== 来实现定时任务！

## 如何使用

###一、运行xxl-job服务端

**说明：**我们将该代码下载下来，可以看到下面的目录，最关键的是 **xxl-job-admin**（使用的模块），如果没有相关依赖可以将 xxl-job-core 模块使用maven进行install打包即可（打包完成版本为xxl-job-core-2.4.0-SNAPSHOT.jar），剩下的 xxl-job-executor-samples 则是官方集成的一个简易案例（我们可以进行参考）！

我下载的路径在：D:\Project\workspace4idea\myproject\xxl-job-2.4.1

以后就直接用

首先打开==下载==好的项目，打开其中的db目录可以看到执行xxl-job的后台的sql，先把这个sql在数据库中运行起来

![](./../%E6%AF%8F%E6%97%A5%E5%AE%8C%E6%88%90%E8%AE%A1%E5%88%92%E6%88%AA%E5%9B%BE/xxl-job/xxl-job%E4%BD%BF%E7%94%A8%E4%B9%8B%E5%89%8D%E7%9A%84%E6%95%B0%E6%8D%AE%E5%BA%93%E6%93%8D%E4%BD%9C.jpg)

然后再application.properties中配置刚刚设置的数据库

![](./../%E6%AF%8F%E6%97%A5%E5%AE%8C%E6%88%90%E8%AE%A1%E5%88%92%E6%88%AA%E5%9B%BE/xxl-job/%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E5%BA%93.jpg)

调完这些以后就可以启动服务登录啦

登录账号是admin

密码是123456

![](./../%E6%AF%8F%E6%97%A5%E5%AE%8C%E6%88%90%E8%AE%A1%E5%88%92%E6%88%AA%E5%9B%BE/xxl-job/%E5%A6%82%E4%BD%95%E8%BF%9B%E5%85%A5XXLJOB%E4%BB%BB%E5%8A%A1%E8%B0%83%E5%BA%A6%E4%B8%AD%E5%BF%83.jpg)

![](./../%E6%AF%8F%E6%97%A5%E5%AE%8C%E6%88%90%E8%AE%A1%E5%88%92%E6%88%AA%E5%9B%BE/xxl-job/%E8%BF%9B%E5%85%A5%E4%BB%A5%E5%90%8E.jpg)

### 二、对自己的项目配置xxl-job

首先先引入依赖

```xml
<dependency>
    <groupId>com.xuxueli</groupId>
    <artifactId>xxl-job-core</artifactId>
</dependency>
```

xxl-job-admin启动下，先给自己的项目配置这些

```yml
# xxl-job相关配置，由configuration读取这些配置信息
xxl:
  job:
    # xxl-job的开关,这是下面我们自己配置的，根据这个开关就可以选择是否用xxl-job,突出了我们的可插拔式的好处
    enable: true
    admin:
      # xxl-job-admin的端口，和xxl-job的后台启用端口一致即可
      addresses: http://127.0.0.1:8080/xxl-job-admin
    accessToken: default_token
    executor:
      appname: ape-frame
      address:
      # 下面就是xxl-job
      ip: 127.0.0.1
      port: 9999
      # 日志路径和保存时间
      logpath: /data/applogs/xxl-job/jobhandler
      logretentiondays: 30
```

按照以上内容配制好，需要由configuration类读取这些配置信息进而加载

==@ConditionalOnProperty(name = {"xxl.job.enable"}, havingValue = "true")== 我真是爱死了，可插拔，这样配置就可以完全自己选择啦

```java
package com.york.job.config.config;

import com.xxl.job.core.executor.impl.XxlJobSpringExecutor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

/**
 * xxl-job config
 *
 * @author xuxueli 2017-04-28
 */
@Configuration
@ConditionalOnProperty(name = {"xxl.job.enable"}, havingValue = "true")
public class XxlJobConfig {
    private Logger logger = LoggerFactory.getLogger(XxlJobConfig.class);

    @Value("${xxl.job.admin.addresses}")
    private String adminAddresses;

    @Value("${xxl.job.accessToken}")
    private String accessToken;

    @Value("${xxl.job.executor.appname}")
    private String appname;

    @Value("${xxl.job.executor.address}")
    private String address;

    @Value("${xxl.job.executor.ip}")
    private String ip;

    @Value("${xxl.job.executor.port}")
    private int port;

    @Value("${xxl.job.executor.logpath}")
    private String logPath;

    @Value("${xxl.job.executor.logretentiondays}")
    private int logRetentionDays;


    @Bean
    public XxlJobSpringExecutor xxlJobExecutor() {
        logger.info(">>>>>>>>>>> xxl-job config init.");
        XxlJobSpringExecutor xxlJobSpringExecutor = new XxlJobSpringExecutor();
        xxlJobSpringExecutor.setAdminAddresses(adminAddresses);
        xxlJobSpringExecutor.setAppname(appname);
        xxlJobSpringExecutor.setAddress(address);
        xxlJobSpringExecutor.setIp(ip);
        xxlJobSpringExecutor.setPort(port);
        xxlJobSpringExecutor.setAccessToken(accessToken);
        xxlJobSpringExecutor.setLogPath(logPath);
        xxlJobSpringExecutor.setLogRetentionDays(logRetentionDays);

        return xxlJobSpringExecutor;
    }

    /**
     * 针对多网卡、容器内部署等情况，可借助 "spring-cloud-commons" 提供的 "InetUtils" 组件灵活定制注册IP；
     *
     *      1、引入依赖：
     *          <dependency>
     *             <groupId>org.springframework.cloud</groupId>
     *             <artifactId>spring-cloud-commons</artifactId>
     *             <version>${version}</version>
     *         </dependency>
     *
     *      2、配置文件，或者容器启动变量
     *          spring.cloud.inetutils.preferred-networks: 'xxx.xxx.xxx.'
     *
     *      3、获取IP
     *          String ip_ = inetUtils.findFirstNonLoopbackHostInfo().getIpAddress();
     */
}
```

用以上配置读取配置信息中的字段，然后就可以启动啦

上述配置就能读取字段，然后应该可以用自动注册的方式将自己的项目配置到xxl-job-admin上，如果没有的话也可以手动配置

![](./../%E6%AF%8F%E6%97%A5%E5%AE%8C%E6%88%90%E8%AE%A1%E5%88%92%E6%88%AA%E5%9B%BE/xxl-job/%E6%89%8B%E5%8A%A8%E5%BD%95%E5%85%A5%E8%87%AA%E5%B7%B1%E7%9A%84%E9%A1%B9%E7%9B%AE.jpg)

### 三、启动相关

> 以上已经把自己的项目注册到了xxl-job-admin中，关键是如何用呢？

```java
package com.york.user.job;

import com.alibaba.fastjson.JSON;
import com.xxl.job.core.context.XxlJobHelper;
import com.xxl.job.core.handler.annotation.XxlJob;
import com.york.user.entity.SysUser;
import com.york.user.entity.po.SysUserPo;
import com.york.user.service.SysUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class SampleXxlJob {
    private static Logger logger = LoggerFactory.getLogger(SampleXxlJob.class);

    @Resource
    private SysUserService sysUserService;

    /**
     * 1、简单任务示例（Bean模式）
     */
    @XxlJob("demoJobHandler")
    public void demoJobHandler() throws Exception {
        XxlJobHelper.log("XXL-JOB, Hello World.");
        for (int i = 0; i < 5; i++) {
            XxlJobHelper.log("beat at:" + i);
            SysUserPo sysUserPo = sysUserService.queryById(1L);
            XxlJobHelper.log("sysUser" + JSON.toJSONString(sysUserPo));
        }
    }

}
```

以上是我们设置的一个简单样例，就是相当于让他去执行我们的任务做一个调度

==@XxlJob("demoJobHandler")== 用这个注解的方式，将其中方法新增到任务管理中，可以看到我们JobHandler就是这个注解的值（方法名）

![](./../%E6%AF%8F%E6%97%A5%E5%AE%8C%E6%88%90%E8%AE%A1%E5%88%92%E6%88%AA%E5%9B%BE/xxl-job/%E6%96%B0%E5%A2%9E%E4%BB%BB%E5%8A%A1.jpg)

接着对任务可以选择启动

![](./../%E6%AF%8F%E6%97%A5%E5%AE%8C%E6%88%90%E8%AE%A1%E5%88%92%E6%88%AA%E5%9B%BE/xxl-job/%E5%AF%B9%E4%BB%BB%E5%8A%A1%E5%8F%AF%E4%BB%A5%E9%80%89%E6%8B%A9.jpg)

接着就可以选择执行，执行完以后可以看到日志

![](./../%E6%AF%8F%E6%97%A5%E5%AE%8C%E6%88%90%E8%AE%A1%E5%88%92%E6%88%AA%E5%9B%BE/xxl-job/%E6%9F%A5%E7%9C%8B%E8%B0%83%E5%BA%A6%E6%97%A5%E5%BF%97.jpg)

![](./../%E6%AF%8F%E6%97%A5%E5%AE%8C%E6%88%90%E8%AE%A1%E5%88%92%E6%88%AA%E5%9B%BE/xxl-job/%E8%BF%99%E9%87%8C%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E6%89%A7%E8%A1%8C%E6%97%A5%E5%BF%97.jpg)

这样就大工告成啦