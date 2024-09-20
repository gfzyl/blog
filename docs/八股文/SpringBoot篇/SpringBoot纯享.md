# SpringBoot纯享版

## 1. 什么是SpirngBoot

**口语化回答**  

Spring Boot 是一个用来简化 Spring 开发的工具，能让你不用花太多时间配置各种东西。它自带很多默认设置，比如你不用手动配置 Web 服务器，它就已经帮你集成好了 Tomcat，可以直接通过一个 JAR 文件运行你的应用。这也让它特别适合做微服务，因为每个服务都能独立运行。另外，它还提供了很多监控、健康检查等功能，帮助你更好地管理应用。总之，Spring Boot 让开发变得更轻松，特别是快速搭建应用时非常方便。

## 2. SpringBoot的优缺点

**口语化回答**  

Spring Boot 的优点主要是它让开发变得特别简单和快速。比如，自动配置功能能帮你省去很多复杂的手动设置，开箱即用，直接可以运行应用。而且你不用去配置 Web 服务器，它已经内嵌好了，打包成一个 JAR 文件就可以运行，非常适合做微服务开发。还有它的生产级功能，比如监控、健康检查，能帮助你更好地管理应用。社区也很大，资源丰富，遇到问题很容易找到解决方案。不过，Spring Boot 也有一些缺点。它自动配置虽然方便，但有时你不知道它背后做了什么，可能会让调试变得复杂。另外，它启动大型应用时可能会有点慢，资源消耗也比较高，尤其是内存需求较大。对于没用过 Spring 的人来说，可能还需要花点时间去学习和适应。

## 3. SpringBoot如何固定版本

**口语化回答：**

要固定 Spring Boot 的版本，可以通过几种方式：

1. **用 spring-boot-starter-parent**  

   在 `pom.xml` 中引入 `spring-boot-starter-parent`，直接指定 Spring Boot 版本，比如 `<version>2.7.5</version>`。这样所有 Spring Boot 相关的依赖都会用这个版本的默认配置。

2. **用 dependencyManagement**  

   如果你的项目已经有了别的父 POM，不想用 `starter-parent`，可以用 `dependencyManagement` 来引入 Spring Boot 的 BOM（Bill of Materials），然后在 `dependencies` 中不需要手动写每个依赖的版本。

3. **手动指定依赖版本**  

   你也可以手动给每个依赖指定版本号，不过这会比较麻烦，因为需要自己管理所有依赖的版本。

4. **用 BOM**  

   通过 `dependencyManagement` 引入 Spring Boot 的 BOM，这样和上面类似，可以不用手动指定每个依赖的版本。

**总结**：最简单的是用 `starter-parent` 或 `dependencyManagement`，能减少手动管理版本的麻烦。

## 4. SpringBoot的使用方式

**口语化回答**：

Spring Boot 是一个用来快速构建 Spring 应用的框架，简化了开发流程。要使用 Spring Boot，可以通过 Spring Initializr 这个在线工具快速生成项目，选择基本配置后下载并导入 IDE。如果不想用这个工具，也可以手动创建项目，首先创建一个 Maven 项目，然后在 `pom.xml` 中添加 Spring Boot 的依赖。接着，编写主应用类，使用 `@SpringBootApplication` 注解标注，并在主类的 `main` 方法中启动应用。你还可以创建 REST 控制器，通过简单的 `@GetMapping` 来处理请求。运行 Spring Boot 应用可以通过 IDE、Maven 命令，或者生成一个可执行的 JAR 文件来完成。Spring Boot 还提供了灵活的配置方式，可以通过 `application.properties` 或 `application.yml` 文件配置应用程序，比如设置端口、数据库连接等。总结来说，Spring Boot 通过自动配置和嵌入式服务器，让你更专注于业务逻辑的实现，大大提高了开发效率。

## 5. SpringBoot自动配置原理

**口语化回答**：

Spring Boot 的自动配置功能可以根据项目的依赖和配置自动设置 Spring 应用，省去了大量手动配置的麻烦。它的核心原理是通过条件注解来判断是否需要应用特定的配置，比如检查类路径是否存在某些类，或者是否已有相应的 Bean。通过使用 `@EnableAutoConfiguration` 注解，Spring Boot 会扫描 `spring.factories` 文件，找到所有的自动配置类，并根据条件注解的评估来决定是否加载这些类。

例如，自动配置数据源时，Spring Boot 会检查 `DataSource` 类是否存在，以及容器中是否已存在相应的 Bean。如果这些条件都满足，系统就会自动注册 DataSource Bean。如果需要禁用某些自动配置，可以在 `@SpringBootApplication` 注解中使用 `exclude` 属性，或者在 `application.properties` 文件中配置。这种机制让开发者能更专注于业务逻辑，而不是繁琐的配置，理解它的原理有助于更好地利用 Spring Boot 的优势。

## 6. SpringBoot配置文件注入

**口语化回答**：

在 Spring Boot 中，配置文件用于定义各种应用程序参数，比如使用 `application.properties` 或 `application.yml` 文件。通过配置文件注入，我们可以方便地将这些参数注入到 Spring Bean 中，使得应用程序更加灵活。

首先，我们可以使用 `@Value` 注解直接将配置文件中的值注入到 Bean 中。例如，我们可以在 `AppConfig` 类中用 `@Value` 注解获取应用名称和版本。另一种方法是使用 `@ConfigurationProperties` 注解，它可以将配置文件中的属性映射到一个 Java Bean 中，这通常和 `@EnableConfigurationProperties` 注解一起使用，像 `AppProperties` 类就可以用来管理所有与应用相关的配置。

此外，我们还可以通过 Spring 的 `Environment` 接口来获取配置，这种方式灵活且可以动态访问配置。最后，如果需要加载外部配置文件，可以使用 `@PropertySource` 注解，这样可以将额外的配置文件引入到应用程序中。

总结来说，Spring Boot 提供了多种方式来注入配置文件中的属性，使得应用程序的配置管理变得更加方便和灵活。

## 7. @Value和@ConfigurationProperties比较

**口语化回答**：

@Value 和 @ConfigurationProperties 是 Spring Boot 中两种注入配置属性的方法。@Value 比较简单，适合注入单个属性，灵活性高，支持在字段或方法上使用，还能用 Spring 表达式语言。不过，如果你有很多相关的配置，就得一个个注入，代码会显得冗长，而且类型安全性差，需要手动转换类型。另一方面，@ConfigurationProperties 适合注入一组相关的属性，支持批量注入，提供更好的类型安全性，还可以处理复杂的嵌套结构。虽然它需要更多的配置，但如果你需要更好的可读性和可维护性，它是一个不错的选择。

## 8. 讲讲@PropertySource

**口语化回答**：

@PropertySource 是 Spring 提供的一个注解，用来加载外部属性文件，比如 `.properties` 文件，并将它们注入到 Spring 的环境中。你可以通过这个注解轻松地管理应用程序的配置。通常，@PropertySource 和 @Configuration 一起使用，只需简单地指定要加载的文件路径。它还支持同时加载多个属性文件，这样你可以把配置分散到不同的文件中。如果你需要获取这些属性值，可以使用 @Value 注解或 Spring 的 Environment 接口。这种方式让你在处理应用配置时更加灵活，提高了代码的可维护性。

## 9. 讲讲@lmportResource

**口语化回答**

`@ImportResource` 是 Spring 框架中的一个注解，用来将 XML 配置文件导入到基于 Java 配置的 Spring 应用中。这意味着你可以在使用 Java 配置的同时，继续使用已有的 XML 配置文件。这样做的好处是你可以逐步迁移旧的 XML 配置，而不需要一次性重写所有配置。比如，你可以在 Java 配置中定义一些新组件，同时保留 XML 文件中已经配置好的组件，保持应用的兼容性和稳定性。

## 10. SpringBoot的profile加载

**口语化回答**

Spring Boot 的 Profile 机制让我们能够为不同的环境（比如开发、测试、生产）设置不同的配置，而不需要修改代码或重新打包应用。你可以通过创建不同的 `application-{profile}.properties` 文件来为各个环境定义特定的配置，比如 `application-dev.properties` 用于开发环境，`application-prod.properties` 用于生产环境。此外，还可以使用 `@Profile` 注解来标记在特定环境下才会加载的 Bean，这样能让你的应用在不同环境中灵活切换。

## 11. SpringBoot激活指走profile的几种方式

**口语化回答**

Spring Boot 提供了多种方法来激活不同的配置 Profile，方便你根据环境需求灵活调整。首先，你可以在 `application.properties` 文件中直接设置 `spring.profiles.active` 属性来激活特定的 Profile。另外，在启动应用时，你可以通过命令行参数来指定 Profile。环境变量也是一个选择，通过设置 `SPRING_PROFILES_ACTIVE` 来激活。此外，你可以通过 JVM 系统属性在启动时指定 Profile，或者在代码中使用 `System.setProperty` 方法动态设置。最后，在测试时，可以使用 `@ActiveProfiles` 注解来指定要激活的 Profile。

## 12. SpringBoot项目内部配置文件加载顺序

**口语化回答**

在 Spring Boot 项目中，配置文件的加载顺序非常重要，因为它决定了哪些配置会被使用。首先，`bootstrap.yml`（或 `bootstrap.properties`）文件会在应用启动阶段加载，用于配置外部资源，优先级最高。接着是项目根目录下 `config` 文件夹中的配置文件，这些文件的优先级高于根目录中的配置文件。然后是项目根目录下的配置文件，最后是 `resources/config` 目录中的配置文件。最后，`resources` 目录下的配置文件会被加载。使用 `@PropertySource` 注解指定的文件会在所有内部配置文件之后加载。如果有重复的配置项，高优先级的文件会覆盖低优先级的文件。

## 13. SpringBoot外部配置文件加载顺序

**口语化回答**

在 Spring Boot 中，外部配置文件的加载顺序是很重要的，因为它决定了哪些配置会被最终应用。首先，命令行参数具有最高优先级，可以直接覆盖其他配置项。接着，来自 JNDI 的属性紧随其后，然后是 Java 系统属性。操作系统的环境变量排在其后，接下来是随机值的配置。然后是外部配置文件（如 `application.properties` 或 `application-{profile}.yml`），其中带有 profile 的文件优先于不带 profile 的。接下来是 jar 包内部的配置文件，然后是通过 `@PropertySource` 注解指定的配置文件，最后是通过 `SpringApplication.setDefaultProperties` 设置的默认属性，这个优先级最低。

## 14. SpringBoot日志关系

**口语化回答**

在 Spring Boot 中，日志系统是由 SLF4J 和 Logback 组成的。SLF4J 提供了一个统一的日志记录 API，让你不必依赖于具体的日志实现，而 Logback 是默认的日志实现，性能很好且配置灵活。默认情况下，日志输出到控制台，日志级别为 INFO。你可以通过 `application.properties` 或 `application.yml` 文件来调整日志级别和输出格式，比如设置日志为 DEBUG 级别、指定特定包的日志级别，或者将日志输出到文件中。使用 SLF4J 记录日志非常简单，只需导入相关类并调用相应的方法。总的来说，Spring Boot 的日志系统很灵活，能够满足不同的需求。

## 15. SpringBoot如何扩展SpringMVC的配置

**口语化回答**

在 Spring Boot 中，你可以通过多种方式来扩展和定制 Spring MVC 的配置。首先，你可以创建一个带有 `@Configuration` 注解的类，并实现 `WebMvcConfigurer` 接口来进行各种配置，比如设置跨域请求、静态资源处理、视图控制器和拦截器等。其次，你可以实现特定的接口，比如自定义拦截器，通过 `HandlerInterceptor` 接口来处理请求。在全局异常处理方面，你可以使用 `@ControllerAdvice` 和 `@ExceptionHandler` 注解来统一处理应用中的异常。此外，你还可以通过 `@Bean` 注解注册一些 Spring MVC 组件，如自定义的 `ViewResolver`。这些方法让你可以灵活地根据需求定制 Spring MVC 的行为。

## 16. SpringBoot如何注册filter，servlet,listener

**口语化回答**

在 Spring Boot 中，你可以通过多种方式注册 Filter、Servlet 和 Listener。首先，使用注解是最简单的方法，你只需在类上添加 `@WebFilter`、`@WebServlet` 和 `@WebListener` 注解，然后在主应用类上添加 `@ServletComponentScan` 注解。其次，你可以在配置类中使用 `@Bean` 注解来注册它们，这样可以更灵活地配置。最后，对于某些简单的配置，还可以在 `application.properties` 文件中进行设置。这些方法让你可以根据需求选择最合适的方式来注册和配置这些组件。

## 17. SpringBoot的定时任务

**口语化回答**

在 Spring Boot 中，可以通过 `@Scheduled` 注解轻松实现定时任务。首先，你需要在主应用类或配置类上添加 `@EnableScheduling` 注解，以启用调度功能。然后，在任何 Spring 管理的 Bean 中，你可以使用 `@Scheduled` 注解来定义具体的定时任务。这些任务可以按照固定的频率、延迟或使用 Cron 表达式来执行。这样，你就能灵活地安排任务的执行时间和方式

## 18. SpringBoot热部署

**口语化回答**

热部署是一种允许你在开发过程中不重启服务器就能看到代码更改效果的技术，这样可以显著提高开发效率。在 Spring Boot 中，你可以通过两种主要方式实现热部署：使用 Spring Boot DevTools 或 JRebel。Spring Boot DevTools 是一个方便的工具，默认支持自动重启和 LiveReload 功能；而 JRebel 是一个商业工具，提供更高级的热部署体验。

## 19. SpringBoot整合redis

**口语化回答**

在 Spring Boot 中整合 Redis，可以通过几个简单的步骤来实现，包括添加依赖、配置 Redis 连接、创建配置类，以及使用 `RedisTemplate` 进行操作。这使得在应用中使用 Redis 变得非常方便，可以有效地进行缓存和数据存储。