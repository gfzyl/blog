# Spring篇(上)

::: tip Spring篇口语回答

本篇记录了关于Spring的口语话回答

:::

## Spring是什么

好的，面试官，spring是一个轻量级的容器框架，ioc和aop是他的核心。spring将传统的代码以来形式，变为从容器中获取，提高了开发效率，非常的方便。spring衍生出了很多生态，比如，spring-jdbc,springboot等等。方便我们进行各种场景下的开发，以上。

## Spring 优势?

好的，面试官，spring 的优点主要的是ioc和 aop，还有模块化设计。ioc 是一大特色，也叫控制反转，配合依赖注入，可以解决代码中硬编码的问题，从而实现松耦合，提高了代码的灵活性和可维护性。aop 的切面可以将重复的逻辑抽取到切面中，减少代码重复，提高代码的可维护性。经常可以做日志记录，事务管理这些。以上。

##  解释一下 Spring 的 ioc 控制反转?

好的，面试官，控制反转通过将对象的创建和依赖关系的管理交给Spring ioc容器，极大地提高了代码的模块化和可维护性。ioc的主要实现方式是依赖注入，其中通过构造函数注入、Setter方法注入和字段注入等形式来注入，这样 Spring容器能够自动管理对象的依赖关系，使得应用程序代码更加简洁。以上。

##  spring 的依赖注入是什么?

好的，面试官，依赖注入(Dependency Injection，简称Dl)是Spring框架实现控制反转(loC)的主要手段。DI的核心思想是将对象的依赖关系从对象内部抽离出来，通过外部注入的方式提供给对象。这样，依赖对象的创建和管理由Spring容器负责，而不是由对象自身负责，使得代码更加模块化、松耦合和易于测试。以上。

## BeanFactory和ApplicationContext 的区别

好的，面试官。Beanfactory和ApplicationContext都是用于管理Bean的容器接口。BeanFactory功能相对简单。提供了Bean的创建、获取和管理功能。默认采用延迟初始化，只有在第一次访问Bean时才会创建该Bean.因为功能较为基础，BeanFactory通常用于资源受限的环境中，比如移动设备或嵌入式设备。ApplicationContext是BeanFactory的子接口，提供了更丰富的功能和更多的企业级特性。默认会在启动时创建并初始化所有单例Bean，支持自动装配Bean，可以根据配置自动注入依赖对象。有多种实现，如ClassPathXmlApplicationContext、FileSystemXmlApplicationContext.AnnotationConfigApplicationContext等。以上

## Applicationcontext的实现类有哪些?

好的，面试官。常用的只要用 classpathxml 的基于 xml 的方式，annotion 的基于注解的方式，不常见的还有web 和 groovy。在目前的实际情况下，主要是 annotion，注解形式放入到容器中。像老的 tomcat 那种方式用的是 web 形式，不过现在都是 boot 注解形式够用。groovy 适用于一些动态加载 bean 的方式，通过脚本的形式处理。以上。

##  Bean 标签的属性?

好的，面试官。bean 是最长使用的标签，如果是使用 xml形式。最常见的基本属性就是id，name，class。分别标识唯一的 bean，bean 的别名和实际要注入的类。也可以通过一些属性实现，bean 开始时候的操作，比如init-method，配置的方法，可以在 bean 初始化的时候，进行执行。bean 还有常见的构造函数注入标签，注入bean 中的属性。以上。

##  bean 的作用范围和生命周期?
好的，面试官。bean 的作用范围主要用 singleton，prototype，request，session，globalsession，application。常用的就是 singleton，singleton 是单例的，当 bean 是无状态的时候，singleton 是最好的使用方式，如果说 bean 里面涉及共享数据，singeton 就不够安全了，这个时候需要使用 prototype。bean 的生命周期从实例化创建 bean 开始，然后进行属性设置，再之后，调用 bean 的一些初始化方法，如果有则执行，这样处理完之后，bean 就可以被使用了。最终当 bean 要被销毁的时候，就会调用 destroy 方法进行 bean 的后置处理，以上。

## spring循环依赖问题是什么?

好的，面试官，Spring循环依赖问题是指在Spring容器中，两个或多个Bean之间存在直接的或间接的依赖关系导致在创建和初始化这些Bean时形成了一个闭环，使得无法正确地创建和初始化这些Bean。主要有两种形式，一种是构造器循环依赖，一种是 setter 方式的循环依赖。构造器循环依赖主要是 Bean A的构造器需要Bean B作为参数，而Bean B的构造器又需要Bean A作为参数。由于构造器是在Bean实例化时调用的，所以Spring容器无法先创建其中一个Bean，因为这样会导致另一个Bean无法实例化，从而形成死循环。setter循环依赖发生在Bean的setter注入方法中。与构造器循环依赖不同，setter注入是在Bean实例化之后进行的。如果循环依赖关系复杂或配置不当，也可能导致Spring容器无法正确初始化Bean。Spring容器采用了三级缓存机制来处理setter注入的循环依赖。以上。

## Spring 循环依赖是如何解决的?

好的，面试官。循环依赖问题的解决主要是靠三级缓存机制来解决的。其中一级缓存用于存储完全初始化好的单例 Bean，二级缓存用于存储早期暴露的 Bean 实例，部分初始化的 Bean。三级缓存用于存储 Bean 工厂，主要用于创建 Bean 的代理对象。假设现在有两个对象 A依赖 B，B 依赖 A。那么在A创建过程中发现需要属性 B，查找发现 B还没有在一级缓存中，于是先将 A放到三级缓存中，此时的 A不完整，没有属性，但是可以引用。接下来就去实例化B。B开始创建，此时发现需要A，于是B先查一级缓存寻找A，如果没有，再查二级缓存，如果还没有，再查三级缓存，找到了A，然后把三级缓存里面的这个A放到二级缓存里面，并删除三级缓存里面的A。B顺利初始化完毕，将自己放到一级缓存里面(此时B里面的A依然是创建中的状态)。然后回来接着创建A，此时B已经创建结束，可以直接从一级缓存里面拿到B，这样 A就完成了创建，并将A放到一级缓存。以上。