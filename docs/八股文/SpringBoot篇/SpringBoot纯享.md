# SpringBoot纯享版

## 1. 什么是SpirngBoot

**口语化回答**  

Spring Boot 是一个用来简化 Spring 开发的工具，能让你不用花太多时间配置各种东西。它自带很多默认设置，比如你不用手动配置 Web 服务器，它就已经帮你集成好了 Tomcat，可以直接通过一个 JAR 文件运行你的应用。这也让它特别适合做微服务，因为每个服务都能独立运行。另外，它还提供了很多监控、健康检查等功能，帮助你更好地管理应用。总之，Spring Boot 让开发变得更轻松，特别是快速搭建应用时非常方便。

使用@Transactional注解即可打开事务

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

------

>SpringBoot的目动装配原埋是基于Spring Framework的条件化配置和@EnableAutonfiguration江解头现种机制允许开发者在项目中引入相关的依赖，SpringBoot 将根据这些依赖自动配置应用程序的上下文和功能。
>
>SpringBoot 定义了一套接口规范，这套规范规定:SpringBoot 在启动时会扫描外部引用jar 包中的META-INF/spring.factories文件，将文件中配置的类型信息加载到 Spring 容器(此处涉及到 JM 类加载机制与 Spring的容器知识)，并执行类中定义的各种操作。对于外部jar 来说，只需要按照 SpringBoot 定义的标准，就能将自的功能装置进 SpringBoot。
>
>通俗来讲，自动装配就是通过注解或一些简单的配置就可以在SpringBoot的帮助下开启和配置各种功能，比如数据库访问、Web开发。

`@SpringBootApplication` 这个注解点开以后会发现一堆注解

* @Target：该注解指定了这个注解可以用来标记在类上。在这个特定的例子中@Target({ElementType.TYPE})，这表示该注解用于标记配置类。
* @Retention(RetentionPolicy.RUNTIME)：这个注解指定了注解的生命周期，即在运行时保留。这是因为Spring Boot 在运行时扫描类路径上的注解来实现自动配置，所以这里使用了 RUNTIME 保留策略。
* @Documented：该注解表示这个注解应该被包含在 Java 文档中。它是用于生成文档的标记，使开发者能够看到这个注解的相关信息。
* @Inherited：**这个注解指示一个被标注的类型是被继承的**。在这个例子中，它表明这个注解可以被继承，如果一个类继承了带有这个注解的类，它也会继承这个注解。
* @SpringBootconfiguration：这个注解表明这是一个 Spring Boot 配置类。如果点进这个注解内部会发现与标准的 `@Configuration` 没啥区别，只是为了表明这是一个专门用于 SpringBoot 的配置。
* @EnableAutoconfiguration：这个注解是 Spring Boot 自动装配的核心。它告诉 Spring oot 启用自动配置机制，根据项目的依赖和配置自动配置应用程序的上下文。通过这个注解，SpringBoot 将尝试根据类路径上的依赖自动配置应用程序。
* @ComponentScan：这个注解用于配置组件扫描的规则。在这里，它告诉 SpringBoot 在指定的包及其子包中查找组件，这些组件包括被注解的类、@Component 注解的类等。其中的 excludefilters 参数用于指定排除哪些组件，这里使用了两个自定义的过滤器，分别是TypeExcludeFilter 和AutoConfigurationExcludeFilter.

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

## 20. SpringBoot 用到了哪些设计模式

* 代理模式：Spring 的 AOP 通过动态代理实现方法级别的切面增强，有静态和动态两种代理方式，采用动态代理方式。
* 策略模式：Spring AOP 支持 JDK 和 Cglib 两种动态代理实现方式，通过策略接口和不同策略类，运行时动态选择，其创建一般通过工厂方法实现。
* 装饰器模式；Spring 用 TransactionAwareCacheDecorator 解决缓存与数据库事务问题增加对事务的支持
* 单例模式：Spring Bean 默认是单例模式，通过单例注册表(如 HashMap)实现。
* 简单工厂模式：Spring 中的 Beanfactory 是简单工厂模式的体现，通过工厂类方法获取 Bean 实例。
* 工厂方法模式：Spring中的 FactoryBean 体现工厂方法模式，为不同产品提供不同工厂。
* 观察者模式：Spring 观察者模式包含 Event 事件、Listener 监听者、Publisher 发送者，通过定义事件、监听器和发送者实现，观察者注册在 Applicationcontext 中，消息发送由ApplicationEventMulticaster 完成。
* 模板模式：Spring Bean 的创建过程涉及模板模式，体现扩展性，类似 Callback 回调实现方式。
* 适配器模式：Spring MVC 中针对不同方式定义的 Controller，利用适配器模式统一函数定义，定义了统-接囗 HanderAdapter 及对应适配器类,

## 21. 怎么理解SpringBoot中的约定大于配置

* 自动化配置：Spring Boot 提供了大量的自动化配置，通过分析项目的依赖和环境，自动配置应用程序的行为。开发者无需显式地配置每个细节，大部分常用的配置都已经预设好了。例如，Spring Boot 可以根据项目中引入的数据库依赖自动配置数据源。
* 默认配置：Spring Boot 在没有明确配置的情况下，会使用合理的默认值来初始化应用程序。这种默认行为使得开发者可以专注于核心业务逻辑，而无需关心每个细节的配置。
* 约定优于配置：Spring Boot 遵循了约定优于配置的设计哲学，即通过约定好的方式来提供默认行为，减少开发者需要做出的决策。例如，约定了项目结构、Bean 命名规范等，使得开发者可以更快地上手并保持团队间的一致性。

Spring Boot 的”约定大于配置”原则是一种 *设计理念*，通过减少配置和提供合理的默认值，使得开发者可以更快速地构建和部署应用程序，同时降低了入门门槛和维护成本。

Spring Boot通过「*自动化配置*」和「*起步依赖*」实现了约定大于配置的特性。

* 自动化配置：Spring Boot根据项目的依赖和环境自动配置应用程序，无需手动配置大量的XML或Java配置文件。例如，如果项目引入了Spring Web MVC依赖，Spring Boot会自动配置一个基本的Web应用程序上下文。
* 起步依赖（stater依赖）：Spring Boot提供了一系列起步依赖，这些依赖包含了常用的框架和功能，可以帮助开发者快速搭建项目。

## 21. SpringBoot的项目结构是怎么样的？

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/1721712159282-79195670-9acf-4bfb-93b1-47d089a4bc1c.png)

## 22. 说几个启动器(starter)?

* spring-boot-starter-web:这是最常用的起步依赖之一，它包含了Spring MVC和Tomcat嵌入式服务器，用于快速构建Web应用程序。
* spring-boot-starter-security:提供了Spring Security的基本配置，帮助开发者快速实现应用的安全性，包括认证和授权功能。
* mybatis-spring-boot-starter:这个Starter是由MyBatis团队提供的，用于简化在Spring Boot应用中集成MyBatis的过程。它自动配置了MyBatis的相关组件，包括SqlSessionFactory、MapperScannerConfigurer等，使得开发者能够快速地开始使用MyBatis进行数据库操作。
* spring-boot-starter-data-jpa或 spring-boot-starter-jdbc: 如果使用的是Java Persistence API (PA)进行数据库操作，那么应该使用spring-boot-starter-data-jpa。这个Starter包含了Hibernate等JPA实现以及数据库连接池等必要的库，可以让你轻松地与MySQL数据库进行交互。你需要在application.properties或application.ym|中配置MySQL的连接信息。如果倾向于直接使用JDBC而不通过JPA，那么可以使用spring-boot-starter-jdbc，它提供了基本的JDBC支持。
* spring-boot-starter-data-redis:用于集成Redis缓存和数据存储服务。这个Starter包含了与Redis交互所需的客户端(默认是Jedis客户端，也可以配置为Lettuce客户端)，以及Spring Data Redis的支持使得在Spring Boot应用中使用Redis变得非常便捷。同样地，需要在配置文件中设置Redis服务器的连接详情。
* spring-boot-starter-test:包含了单元测试和集成测试所需的库，如Jnit, Spring Test,Assert等，便于进行测试驱动开发(TDD)。

## 23. SpringBoot里面有哪些重要的注解?还有一个配置相关的注解是哪个?
* @SpringBootApplication:用于标注主应用程序类，标识一个Spring Boot应用程序的入口点，同时启用自动配置和组件扫描。
* @Controller:标识控制器类，处理HTTP请求。
* @RestController:结合@Controller和@ResponseBody，返回RESTful风格的数据@Service:标识服务类，通常用于标记业务逻辑层。
* @Repository:标识数据访问组件，通常用于标记数据访问层。
* @Component:通用的Spring组件注解，表示一个受Spring管理的组件
* @Autowired:用于自动装配Spring Bean。
* @Value:用于注入配置属性值。
* @RequestMapping:用于映射HTTP请求路径到Controller的处理方法。@GetMapping、@PostMapping、@PutMapping、@DeleteMapping:简化@RequestMapping的GET、POST、PUT和DELETE请求.
* @Configuration:用于指定一个类为配置类，其中定义的bean会被Spring容器管理。通常与@Bean配合使用，@Bean用于声明一个Bean实例，由Spring容器进行管理。（与配置相关）