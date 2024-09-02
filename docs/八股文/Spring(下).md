# Spring篇(下)

::: tip Spring篇口语回答

本篇记录了关于Spring的口语话回答

:::

## Spring选择哪种方式代理?

好的，面试官，动态代理的方式主要是jdk 动态代理和 cglib 动态代理，spring 也是使用者两种方式，具体选择哪种最主要取决于要被代理的类有没有实现接口，如果类已经实现了接口，就用idk 的动态代理即可，如果没有实现接口，就需要用子类的形式，采用 cglib 动态代理。在 Spring 配置中，可以通过@EnableAspectAutoProxy注解的proxyTargetClass属性来强制使用 CGLIB 代理。以上。

## Spring引入外部配置文件的方式

好的，面试官，spring引入外部配置文件的方式，主要有通过property-placeholder 在xml 中引入外部标签利用PropertySource 注解，引入配置文件。还可以通过最经典的application.properties 来自动加载。在微服务的情况下，可以配合 cloud config 或者是 nacos 来引入相关的配置属性。以上。

## Spring中的单例Beans是线程安全的吗

好的，面试官。单例 bean 不是线程安全的。因为单例意味着在整个 spring 容器中会重复使用。一般来说 bean里面不掺杂公用的变量，这种叫做无状态的 bean，在方法内部调整变量里面的数据。假设一个 bean 里面有一个int 变量 10，bean 里面的方法都操作这个变量，那就会产生线程安全问题，解决的方式可以用锁啊，支持线程安全的类呀，这些方式。不过最好还是无状态的，这样不影响性能。以上

## Spring事务传播行为

好的，面试官，传播行为主要有几种，REQUIRED，如果当前存在事务，则加入，否则创建一个新的。这是默认的事务传播行为。还有就是其他的不常用的事务形式，比如REQUIRES NEW，总是创建一个新的事务。如果当前存在事务，则挂起当前事务。SUPPORTS总是创建一个新的事务，使用方式就是@Transactional 里面的propagation 属性进行直接指定即可。其他不常见的就不多提了，就是围绕有事务，无事务，嵌套，以及异常来
分不同情况选择事务创建，以上。

##  Spring事务中的隔离级别有哪几种?

在 Spring 中，事务的隔离级别(lsolation Level)定义了一个事务与其他事务隔离的程度。隔离级别控制着事务在并发访问数据库时的行为，特别是如何处理多个事务同时读取和修改数据的情况。不同的隔离级别提供了不同的并发性和数据一致性保证，
Spring 提供了以下几种隔离级别，通过@Transactional注解的isolation属性来配置:DEFAULT:使用底层数据库的默认隔离级别。通常情况下，这个默认值是READCOMMITTED。
READ UNCOMMITTED:允许一个事务读取另一个事务尚未提交的数据。可能会导致脏读(DirtyRead)、不可重复读(Non-repeatable Read)和幻读(Phantom Read)问题READCOMMITTED:保证一个事务只能读取另一个事务已经提交的数据。可以防止脏读，但可能会导致不可重复读和幻读问题。
REPEATABLE READ:保证一个事务在读取数据时不会看到其他事务对该数据的修改。可以防止脏读和不可重复读，但可能会导致幻读问题。
SERIALIZABLE:最高的隔离级别。保证事务按顺序执行，完全隔离。可以防止脏读、不可重复读和幻读问题，但并发性最低，可能导致性能下降。

## Spring中用到了哪些设计模式

好的，面试官，设计模式在 spring 中有很多的体现，比如工厂模式，spring的 applicationtext 就是spring 实现工厂模式的典型例子，以及 spring 容器中，默认每个 bean 都是单例的。aop 的面向切面则是体现的代理模式。还有就是 spring 的 event 的事件驱动，采取了观察者模式。其他的还有装饰器，策略模式等，以上。