# MyBatis篇

## 1. 与传统的JDBC相比，MyBatis的优点?
基于 SQL语句编程，相当灵活，不会对应用程序或者数据库的现有设计造成任何影响，SQL写在 XML里，解除 sql 与程序代码的耦合，便于统一管理；提供 XML标签，支持编写动态 SQL语句，并可重
用。

与 JDBC相比，减少了 50%以上的代码量，消除了JDBC 大量冗余的代码，不需要手动开关连接；很好的与各种数据库兼容，因为 MvBatis 使用 JDBC来连接数据库，所以只要 JDBC 支持的数据库MyBatis 都支持。

能够与 Spring 很好的集成，开发效率高。

提供映射标签，支持对象与数据库的 ORM 字段关系映射；提供对象关系映射标签，支持对象关系组件维护。

## 2. 还记得JDBC连接数据库的步骤吗?
使用Java JDBC连接数据库的一般步骤如下：

* 加载数据库驱动程序：在使用JDBC连接数据库之前，需要加载相应的数据库驱动程序。可以通过Class.forName("com.mysqljdbc.Driver”)来加载MySQL数据库的驱动程序。不同数据库的驱动类名会有所不同。
* 建立数据库连接：使用 DriverManager 类的 getConnection(ur, username,password) 方法来连接数据库，其中url是数据库的连接字符串(包括数据库类型、主机、端口等)、username是数据库用户名password是密码。
* 创建 Statement 对象：通过 Connection 对象的 createStatement()方法创建一个 Statement 对象，用于执行 SQL查询或更新操作。
* 执行 SQL 查询或更新操作：使用 Statement 对象的 *executeQuery(sql)* 方法来执行 SELECT 查询操作或者使用 *executeUpdate(sql)* 方法来执行 INSERT、UPDATE 或 DELETE 操作。
* 处理查询结果：如果是 SELECT查询操作，通过 ResultSet 对象来处理查询结果。可以使用 Resultset 的next() 方法遍历查询结果集，然后通过 getXXX() 方法获取各个字段的值。
* 关闭连接：在完成数据库操作后，需要逐级关闭数据库连接相关对象，即先关闭 ResultSet，再关闭Statement，最后关闭 Connection。

## 3. Mybatis里的#和$的区别?
Mybatis 在处理 #{} 时，会创建 **预编译** 的 SQL语句，将 SQL中的 # 替换为 ? 号，在执行 SQL 时会为预编译 SQL中的占位符(?)赋值，调用 *PreparedSatement* 的 set 方法来赋值，预编译的 SQL 语句执行效率高，并且可以防止SQL注入，提供更高的安全性，适合传递参数值。

Mybatis 在处理 ${} 时，只是创建 **普通的** SQL语句，然后在执行 SQL语句时 MvBatis 将参数直接拼入到 SQL里，不能防止 SQL注入，因为参数直接拼接到 SQL语句中，如果参数未经过验证、过滤，可能会导致安全问题。

## 4. MybatisPlus和Mybatis的区别?
MybatisPlus是一个基于MyBatis的增强工具库，旨在简化开发并提高效率。以下是MybatisPlus和MyBatis之间的一些主要区别：

* CRUD操作：MybatisPlus通过继承BaseMapper接口，提供了一系列内置的快捷方法，使得CRUD操作更加简单，无需编写重复的SQL语句。
* 代码生成器：MybatisPlus提供了代码生成器功能，可以根据数据库表结构自动生成实体类、Mapper接口以及XML映射文件，减少了手动编写的工作量。
* 通用方法封装：MybatisPlus封装了许多常用的方法，如条件构造器、排序、分页查询等，简化了开发过程，提高了开发效率。
* 分页插件：MybatisPlus内置了分页插件，支持各种数据库的分页查询，开发者可以轻松实现分页功能，而在传统的MyBatis中，需要开发者自己手动实现分页逻辑。
* 多租户支持：MybatisPlus提供了多租户的支持，可以轻松实现多租户数据隔离的功能。
* 注解支持：MvbatisPlus引入了更多的注解支持，使得开发者可以通过注解来配置实体与数据库表之间的映射关系，减少了XML配置文件的编写:

## 5. MyBatis运用了哪些常见的设计模式?
* 建造者模式(Builder)，如:SqlSessionfactoryBuilder、XMLConfigBuilder、XMLMapperBuilder.
  XMLStatementBuilder、CacheBuilder等;
* 工厂模式，如:SqlSessionFactory、ObjectFactory、MapperProxyFactory;
* 单例模式，例如ErrorContext和LogFactory;
* 代理模式，Mybatis实现的核心，比如MapperProxy、ConnectionLogger，用的jdk的动态代理;还有executor.loader包使用了cqlib或者iavassist达到延迟加载的效果:
* 组合模式，例如SqINode和各个子类ChoosesqINode等:
* 模板方法模式，例如BaseExecutor和SimpleExecutor，还有BaseTypeHandler和所有的子类例如IntegerTypeHandler;
* 适配器模式，例如Log的Mybatis接口和它对jdbc、log4j等各种日志框架的适配实现;
* 装饰者模式，例如Cache包中的cache.decorators子包中等各个装饰者的实现;
* 迭代器模式，例如迭代器模式PropertyTokenizer;