# Swagger接口统一管理工具

swagger不仅可以用来展示有什么接口，他可以测试，而且速度极快

==注意版本即可，我下面用的是2.7.0==，不同版本引入方式不同

引入依赖

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.7.0</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.7.0</version>
</dependency>
```

做一些配置（这是写死的方法）

```java
package com.york.swagger.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(this.getApiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.york"))
                .paths(PathSelectors.any())
                .build();
    }

    public ApiInfo getApiInfo() {
        return new ApiInfoBuilder()
                .title("ape-frame通用脚手架")
                .contact(new Contact("York", "https://gitee.com/CodeNoobPromising/ape-frame.git", "gfzd1411@163.com"))
                .version("1.0版本")
                .description("开箱即用的脚手架")
                .build();
    }
}

```

项目启动以后，浏览器访问http://localhost:8081/swagger-ui.htm即可

进入以后如图界面

![](./../%E9%B8%A1%E7%BF%85Club%E9%A1%B9%E7%9B%AE/1%E4%B8%80%E6%9C%9F/%E7%9F%A5%E8%AF%86/swagger%E7%9A%84%E4%BD%BF%E7%94%A8.jpg)

### 优化1

上述配置中我们将基本信息都写死了，这样搞很不友好，于是我们把基本信息抽取成为一个bean出来，让用户在yaml中自己配置，然后系统读取这些配置，即读取生成的bean的属性

```java
package com.york.swagger.bean;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 优化，为了让使用脚手架的用户可以自定义配置
 */
@Component
@ConfigurationProperties(prefix = "swagger")
public class SwaggerInfo {
    private String basePackage;

    private String title;

    private String contactName;

    private String contactUrl;

    private String contactEmail;

    private String version;

    private String description;

    public String getBasePackage() {
        return basePackage;
    }

    public void setBasePackage(String basePackage) {
        this.basePackage = basePackage;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactUrl() {
        return contactUrl;
    }

    public void setContactUrl(String contactUrl) {
        this.contactUrl = contactUrl;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

```

把该类注入到配置中去，然后读取其中的信息

```yaml
# 说明：虽然我们字段是 basePackage，但是在配置文件中可以用 驼峰basePackage方式 和 非驼峰base-package方式 两种！
#1）驼峰方式：
swagger:
  basePackage: com.qj
  title: ape-sys
  contactName: 
  contactUrl: git@git/ape-frame.git
  contactEmail: @qq.com
  version: 1.0版本
  description: 开箱即用的脚手架

#2）非驼峰方式：
swagger:
  base-package: com.qj
  title: ape-sys
  contact-name: 
  contactUrl: g
  contact-email: 23
  version: 1.0版本
  description: 开箱即用的脚手架
```

### 优化2

打开swagger以后看到的都是英文，缺少必要的中文解释，我们可以用注解

==@ApiOperation(notes = "逻辑删除数据", value = "逻辑删除数据:/logicDelete/{id}")== 在controller的方法上用注解描述，这个就是如下图右侧显示，其中的notes就是点开以后的详细显示

==@ApiParam("姓名")== 在Po的属性字段上用这样的注解，就是对字段的描述，在swagger上会显示出来

![](./../%E9%B8%A1%E7%BF%85Club%E9%A1%B9%E7%9B%AE/1%E4%B8%80%E6%9C%9F/%E7%9F%A5%E8%AF%86/swagger%E9%85%8D%E7%BD%AE%E4%BC%98%E5%8C%96.jpg)