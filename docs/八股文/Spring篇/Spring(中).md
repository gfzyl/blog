# Spring篇(中)

::: tip Spring篇口语回答

本篇记录了关于Spring的口语话回答

v1.1 2024/10/24 新增内容

:::

## Spring 实例化 bean 有哪几种方式?

好的，面试官。实例化 bean 的方式，主要有构造器实例化，bean 注解实例化，不常用的用静态工厂和实例工厂实例化。构造器实例化主要是通过调用类的构造器来实例化 Bean。构造器可以是无参构造器，也可以是有参构造器。配合 bean 标签的 xml 配置形式，放入容器中。bean 注解的方式就更加常用，尤其是现在都是 boot 的形式。一个注解就可以放入容器中。以上。

## Spring 的属性注入方式有哪几种?

好的，面试官，属性注入的方式主要有几种，比如构造器注入，setter 注入，字段注入，value 注入等等。最常见的我们平时用的最多的就是，就是@Resource ，@Autowired 这种，像构造器和 setter 这种，经常在第三方依赖包的一些情况下，会进行使用，比如对接一些阿里云 oss，就体现的很明显。像@Value.这种就常常用于读取配置文件的属性值，来使用。以上。

## Spring使用注解的进行装配的时候，需要什么注解

好的，面试官，其实这个问题的目的就是将 bean 让 spring 扫描到，并识别出要放到容器中。那就涉及到第一个概念，ComponentScan，自动扫描指定的包，配合basePackages 性。指定包之后能，spring 就会将@Service、@Repository和@Controller 这些带了注解的类，作为 bean 放入到容器中。Componentscan 也提供了一些比如 excludefilter 想排除某些包，或者加特定包的方式。以上。

## 说说Spring常用的注解

好的，面试官，比较常用的就是Component，将类放到容器管理，autowired，resource，来装配bean。还有就是 confiquration 和 bean 进行配合，装载 bean 进入容器。以及一些扩展的注解比如 aop的 aspect 切面事务相关的 transsactional。以上。

## @Autowired和@Resource的区别
好的，面试官，Autowired 和 Resource 都是依赖注入注解。一个是 spring 框架带的，一个是javaee 框架带的。Autowired 主要是类型注入，Resource 是按照名称注入，名称找不到的话，会按照类型进行注入。Autowired 当存在多个的时候，可以配合Qualifier 来进行使用。一般在实际工作中比较常用 Resource。以上。

## @Component和@Bean的区别是什么

好的，面试官。component和 bean 是非常常用的将类注册到容器中的注解。component 需要配合@ComponentScan注解使用，Spring 会自动扫描指定包及其子包中的所有类，找到带有@Component注解的类，并将它们注册为 Bean。@Bean 标记在方法上，方法所在的类需要用@Configuration注解标记。不需要扫描，主动的注入到 spring 容器中。

## 什么是aop，aop的作用和优势?

好的，面试官。aop 是 spring 框架的一个核心。常见的可以做日志记录，事务管理等公共性的处理。当我们想要统一做一些水平统一的操作的时候，就常用 aop。aop 的核心概念就是面向切面变成。通过 aop 可以在范围内的类方法执行之前，执行之后，或者异常的时候，做统一的操作。aop 可以提高代码的可维护性，任何修改只需要在切面中进行，而不需要修改业务逻辑代码。基于动态代理机制，还可以在不修改源代码的情况下为现有代码添加功能。在 boot 应用使用中，只需要配合Aspect 注解，即可实现功能，以上。

### AOP的一些概念

Aspect:切面，只是一个概念，没有具体的接口或类与之对应，是 Join point，Advice 和 Pointcut 的一个统称。

Join point:连接点，指程序执行过程中的一个点，例如方法调用、异常处理等。在 Spring AOP 中，仅支持方法级别的连接点。

Advice:通知，即我们定义的一个切面中的横切逻辑，有“around"，“before"和“after"三种类型。在很多的 AOP实现框架中，Advice 通常作为一个拦截器，也可以包含许多个拦截器作为一条链路围绕着 Join point 进行处理。

Pointcut:切点，用于匹配连接点，一个Aspect 中包含哪些 Join point 需要由 Pointcut 进行筛选。

Introduction:引介，让一个切面可以声明被通知的对象实现任何他们没有真正实现的额外的接口。例如可以让一个代理对象代理两个目标类

Weaving:织入，在有了连接点、切点、通知以及切面，如何将它们应用到程序中呢?没错，就是织入，在切点的引导下，将通知逻辑插入到目标方法上，使得我们的通知逻辑在方法调用时得以执行。

AOP proxy:AOP 代理，指在 AOP 实现框架中实现切面协议的对象。在 Spring AOP 中有两种代理，分别是 JDK动态代理和 CGLIB 动态代理。

Target object:目标对象，就是被代理的对象

Spring AOP 是基于 JDK 动态代理和 Cglib 提升实现的，两种代理方式都属于运行时的一个方式，所以它没有编译时处理，因此 Spring 是通过 Java 代码实现的

## 什么是动态代理

好的，面试官。动态代理主要是在我们的程序运行时动态生成一种代理类的机制，让我们在不修改原始类的情况下，可以帮助原始类增加一些功能。通常有两种方式，一种是jdk的 proxy，一种是cglib。动态代理在 spring框架中的应用也非常常见。主要的 aop 机制就是通过动态代理实现。那么动态代理主要的优势就是解耦，减少代码重复，同时增强现有代码。以上。

## 动态代理常用的两种方式?

好的，面试官，动态常见的两种，一种是jdk 动态代理，一种是 cglib 动态代理，两者的最主要区别是 jdk 动态代理主要是依赖于接口创建代理对象，cglib 是通过生成子类的方式，不需要接口，两种经常会在一起配合，假设类没有接口的时候，就可以通过 cglib 来弥补不足。从性能上来看，因为 jdk 使用反射机制，他的性能，相比 cglib稍有逊色。cglib 会更占用内存一些。两者都可以满足各种需求，按照有没有接口的原则进行选择。以上。

* 基于JDK的动态代理：
* 基于C

## jdk动态代理如何实现

好的，面试官。jdk 的动态代理主要是依赖Proxy 和InvocationHandler 接口。jdk 动态代理要求类必须有接口。在进行实现的时候，首先要定义接口，比如MvService，这个接口就是我们的正常功能的实现。但是希望在不更改MvService 的情况下增加，那么我们需要定义一个实现InvocationHandler 接口的实现类，同时在方法实现上面增加额外的逻辑。最后通过 Proxy 的 newProxyinstance 将二者结合到一起。就实现了动态代理。以上。

## Cglib的Enhancer实现动态代理?

好的，面试官，cglib 代理相比jdk 动态代理不同的就是不需要被代理的类实现接口。假设我们现在有一个MyService，其中有一个方法是performTask，我们只需要定义一个新的类，实现MethodInterceptor 接口，然后再里面的 intercept 方法实现需要增强的方法。最终通过 cqlib 的enhancer 类，先设置父类，父类就是我们要增强的类，再设置 callback 也就是我们要增强的功能。最后使用 create 就生成了 cqlib 的一个代理类。以上.