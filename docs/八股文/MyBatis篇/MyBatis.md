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

## 6. 使用 MyBatis 的 mapper 接口调用时有哪些要求?

在使用 mybatis 的 mapper 的时候，我们要注意，接口必须是 public 的，其次就是接口中的方法名，必须与 xml文件中的 id 相同，才能正常映射成功，在 xm|文件中，要保证 namespace 与接口的全类名，保持一致。还有就是要保证接口里面的入参与xml 里面的 paramtype 和 resulttype 保持一致。

## 8. MyBatis的Xml映射文件中，都有哪些常见标签?

常见的有 mapper，select，resultmap，if，sql等等标签，像 mapper 标签是 xml 中的根部,有了它才能够和接口进行映射。select，insert 这些定义了这个 sql 行为到底是查询还是插入。当我们把查询出的数据要映射到实体的时候，可以封装一个 map，这样我们不用每个字段都写 as，只需要用resultmap，就可以自动帮我们进行属性映射。当想要判断一些条件来决定是否拼接 sql的时候，可以使用 if。最后就是公共的 sal，比如 select 后面的一堆属性，可以放在 sq| 标签内。

下面展示几个自己比较薄弱的

### `<choose>,<when>,<otherwise>`

类似于`switch-case`语句，根据条件执行不同的SQL片段，有属性`test`，指定 **条件表达式**

```xml
<select id="findUsers" resultType="com.example.model.User">
    SELECT * FROM users
    WHERE 1=1
    <choose>
        <when test="username != null">
            AND username = #{username}
        </when>
        <when test="password != null">
            AND password = #{password}
        </when>
        <otherwise>
            AND status = 'active'
        </otherwise>
    </choose>
</select>
```

### `<trim>,<where>,<set>`

用于生成动态 SQL片段，自动处理 SQL语句中的多余字符(如逗号、AND、OR 等)

**属性**:

`<trim>`: prefix、suffix、prefixOverrides、suffixOverrides.

`<where>`:自动添加 WHERE 关键字,

`<set>`:自动添加 SET 关键字并处理逗号

```xml
<!--使用<where>-->
<select id="findUsers" resultType="com.example.model.User">
	SELECT * FROM users
    <where>
    	<if test="username != null">
        	username = #{username}
        </if>
        <if test="password != null">
        	password = #{password}
        </if>
    </where>
</select>

<!--使用<set>-->
<update id="updateUser" parameterType="com.example.model.User">
	UPDATE users
    <set>
    	<if test="username != null">
        	username = #{username}
        </if>
        <if test="password != null">
        	password = #{password}
        </if>
    </set>
    WHERE id=#{id}
</update>
```

### `<foreach>`

用于遍历集合生成动态的 SQL 语句，常用于 IN 字句等。有属性：item、index、collection、open、close、separator

```xml
<select id="findUsersByIds" resultType="com.example.model.User">
    SELECT * FROM users WHERE id IN
    <foreach item="id" collection="list" open="(" separator="," close=")">
        #{id}
    </foreach>
</select>
```

### `<sql>`

定义可重用的 SQL 片度，有属性：id，唯一标识该 SQL 片段

```xml
<sql id="userColumns">
	id, username, password
</sql>

<select id="selectUser" resultType="com.example.model.User">
	SELECT 
    <include refid="userColumns"/> FROM users WHERE id=#{id}
</select>
```

### `<include>`

引入`<sql>`标签定义的 SQL 片段，有属性：refid，引用 `<sql>` 标签的 ID

```xml
<select id="selectUser" resultType="com.example.model.User">
	SELECT 
    <include refid="userColumns"/> FROM users WHERE id=#{id}
</select>
```

## 9. 当实体类中的属性名和表中的字段名不一样，怎么办?

实际使用中，经常会出现比如实体类里面叫 userName，但是数据库字段是 user_name 这种情况。我们要使用 resultmap 来进行使用。resultmap 里面可以定义出一套数据库字段和属性的对应关系，然后mybtais 会帮助我们自动的进行映射。这是常见的方式。另一种就是可以手动把字段不断的 as 重新命名映射。

假设是注解接口的形式，可以使用 @Results 配合 @Result 来进行配合实现映射。

**案例**

假设数据库表 users

```sql
CREATE TABLE users (
	user_id INT PRIMARY KEY,
    user_name VARCHAR(50),
    user_password VARCHAR(50)
);
```

对应的实体类 User 如下

```java
public class User {
    private int id;
    private String username;
    private String password;
    // getters setters
}
```

可以看到实体类和数据库字段是不一致的，为了匹配即可做resultmap

```xml
<mapper namespace="com.example.mapper.UserMapper">
    <!-- 定义 resultMap -->
    <resultMap id="UserResultMap" type="com.example.model.User">
        <id property="id" column="user_id"/>
        <result property="username" column="user_name"/>
        <result property="password" column="user_password"/>
    </resultMap>

    <!-- 使用 resultMap -->
    <select id="selectUser" parameterType="int" resultMap="UserResultMap">
    	SELECT * FROM users WHERE user_id = #{id}
    </select>
</mapper>
```

## 10. 模糊查询like语句该怎么写?

```xml
<mapper namespace= com.example.mapper.UserMapper>
    <!--定义resultMap -->
    <resultMap id="userResultMap" type="com.example.model.User">
        <id property="id" column="user id"/>
        <result property="username" column="user name"/>
        <result property="password" column="user password"/>
    </resultMap>

    <!--模糊查询 -->
    <select id="selectUsersByUsername" parameterType="String" resultMap="userResultMap">
        SELECT*FROM users WHERE user_name LIKE CONCAT('%',#{username}, '%')
    </select>
</mapper>
```

使用 `CONCAT` 连接 `%` 和 传入的参数

## 11. Mybatis的Xml映射文件中，不同的Xml映射文件，id是否可以重复?

可以重复，每个 XML 映射文件有一个唯一的命名空间，确保不同文件中的id不会冲突。这个就有点像 java 的包的概念，回想一下，包名不同，里面的类相同也没事。同时每个 Mapper 接口对应一个 XML 映射文件，接口的方法名与 XML 文件中的id相对应。这样就已经隔离开了，即使 id 重复也不会有冲突。



## 12. 如何避免 sql 注入?

sql注入是一个非常难搞的问题。如果不加以防范就会对我们的系统造成危险。mybatis 避免 sql注入的方式，有几种。首先就是 myabtis 采取了预编译的 sql语句，预编译的 sql 语句是参数化查询，不是直接拼接，这种就会导致攻击者的输入并不会当作 sql 执行，这是一种防御机制。

另一种就是我们在开发的过程中，要保证在拼接的时候，使用 `#` 占位符。`#` 不会直接拼接，可以安全的传递，然而如果使用 `$` 就会导致 **直接拼接**，这样会造成 sql注入问题，不过有些需求确实是动态的 sql处理，要动态传入表名，动态传入字段等等。这种情况也就只能使用 `$` 进行了。

## 13. Mybatis是如何将sql执行结果封装为目标对象?都有哪些映射形式?

mybatis 映射结果从形式上主要分为 **自动映射** 和 **手动映射**。

从类型上面又可以变为 **嵌套映射，集合映射**。

手动映射主要是借助 resultmap，采取property 属性和 cloumn 一 一对应的关系，然后查询的时候，可以映射到实体。

自动映射是要保持查询的时候，列名和类的属性名一致，才可以自动完成。

针对一些类里面又嵌套类的情况的，mybatis 提供了 `association` 来进行映射，association 适用方式和 resultmap 一样，不过他是放到 resultmap 中的。如果是集合的映射则适用 `collection` 来进行。

### 嵌套映射案例

假设有一个Order类，其中包含一个User对象:
```java
public class Order{
    private int id;
    private User user;
    private string orderNumber;

    // Getters and Setters
}
```

定义一个嵌套的resultMap:
```xml
<resultMap id="OrderResultMap" type="com.example.model.0rder">
    <id property="id" column="id"/>
    <result property="orderNumber" column="order number"/>
    <association property="user" javaType="com.example.model.User">
        <id property="id" column="user id"/>
        <result property="username" column="username"/>
        <result property="email"column="email"/>
    </association>
</resultMap>
```

使用：

```xml
<select id="selectOrderById" parameterType="int" resultMap="OrderResultMap">
    SELECT o.id,o.order number,u.id As user id,u.username, u.email
    FROM orders o
    JOIN users uON o.user id = u.idWHERE o.id = #{id}
</select>
```

### 嵌套查询案例



## 13. mybatis和数据库交互的原理:



## 14. mybatis分页的原理和分页插件的原理?





## 15. Mybatis的一级缓存是什么?



## 16. mybatis的二级缓存是什么?



## 17. mybatis与jdbc编程相比有什么优势?



## 18. mybatis的paramtertype为什么可以写简称?



## 19. Mybatis自带连接池都有什么?