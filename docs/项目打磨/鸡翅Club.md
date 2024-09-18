# 鸡翅Club项目专区

## 数据库设计

目前来说，项目还有足够大的完善空间，如社区的交流能力，以及题目练习的能力，我现阶段提供的数据表共有14张，可以扩展

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/%E9%B8%A1%E7%BF%85.jpg)

说明: 角色 `role` 就是 一组权限 `permission` 的集合, 所以权限构成了角色, 每个用户可以有多个角色, 每种角色又有多个权限,都是多对多的关系

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/%E9%B8%A1%E7%BF%85%E6%95%B0%E6%8D%AE%E8%A1%A82.jpg)

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/%E9%B8%A1%E7%BF%85%E6%95%B0%E6%8D%AE%E8%A1%A83.jpg)

## 1.介绍一下你这个项目吧![](https://img.shields.io/badge/重要-red)

好的，面试官，接下来我来阐述一个这个项目的业务是什么。

这个项目是我跟随某位技术大牛一步一步从零到一落地实现的, 由于自己前端技术并不精通, 因此本项目我专门针对于后端业务的编写。项目的
**制作初衷** 是鉴于当下求职过程中同学们 **要针对面试题有一套系统的复习过程**
，但是市面上的题目和配套的答案质量参差不齐，也没有相应的社区供同学们讨论，于是本项目就应运而生了。

从整体的项目架构上来说，我们采用的是主流的微服务架构Spring Cloud
Alibaba，再利用docker容器管理主流的中间件提供专精的功能，主要实现的功能有刷题、练题、社区交流等。整个项目中从数据库表的设计起步，经过严格的技术选型、架构设计最终实现以上功能。但由于本人技术有限，项目现在的功能并不完善。

## 2. 你认为这个项目的难点和亮点是什么？![](https://img.shields.io/badge/重要-red)

::: tip 重点提醒

这个题目几乎必考, 背会

**亮点和难点是针对你自身的情况来设定的。讲的时候，讲出自信，逻辑自洽，这个环节会刷掉一些对自己项目都不了解的人，一问就是：我觉得我这个项目没什么亮点和难点。**

:::

好的，面试官，这个项目对于我来说还是有很大的挑战性的，在此过程中，我也成长和学习到了不少。

亮点和难点方面我主要从三个方面来阐述，一个是业务方面，一个是整体设计方面，一个是技术方面。

业务方面来说，虽说是跟随课程学习，但还是需要花时间理解项目的实现意义和各个业务之间的关系，比如，虽然CRUD这样的操作听着很简单，但是必须建立在非常熟悉业务的基础上。这一点我认为体现在未来工作中
**主要就是理解需求说明**，不断挖掘用户背后的真实需求点。

从整体设计方面，采用的是 **微服务架构** 的形式，**领域能力** 的方式进行 **驱动划分**
，采取了一个整洁一点的分层模型架构，目前划分出来，题目主数据、权限、文件、网关几个服务。每个服务之间解藕。整体采用的是springcloud
alibaba作为后端的技术框架，中间件相关的东西，用docker进行中间件的部署。相较于目前的市面上的技术，项目采取的架构是比较新的。

最后，功能实现的过程中在技术方面对我的提升是非常大的，也拓宽了自己的知识面。比如，我们做了 **网关gateway配合redis实现分布式的会话共享
**， **基于threadlocal实现了整体用户上下文的打通**，**将一些设计模式融入到代码**中。

------

如果问到：

* **基于threadlocal实现了整体用户上下文的打通**：


* **网关gateway配合redis实现分布式的会话共享**：


* **将一些设计模式融入到代码**：

## 3.说说你这个项目的架构情况吧？

从整体部署情况上，因为是自己学习，所以只将服务搭建在一台服务器上，顺便连同着数据库、redis等中间件也都在这一台服务器上。如果考虑可用性等完全可以水平扩展，将服务部署在更多的服务器上。

前端项目可以配合nginx反向代理到网关服务，网关根据不同的请求类别打到不同的服务上。

## 4. 你在这里面主要负责哪些东西？![](https://img.shields.io/badge/重要-red)

好的，面试官。学习过程中，各个服务之间各有轻重，整个项目中我主要负责技术选型，框架的构建，**侧重于刷题模块的设计与开发**
（ps：记住这个地方要给面试官埋沟子，这块说的，让面试官有兴趣延伸）。

技术选型主要是评估用户量，服务器资源，选取最快能达成结果和比较主流的技术栈。

框架构建方面，也是学习到了DDD领域模型而不是传统的三层架构。虽然我没有非常专业、深刻的认识，但整体在coding的过程中
**对DDD有一些粗浅的领悟以及体会**：

刷题模块就是 从0到1 的设计与落地了。从需求沟通到业务建模到原型设计，数据库设计这些都是我来做的，最终开发进行落地。以上就是我负责的内容。

## 5. 浅谈技术选型？

技术选型主要是从几个方面来进行考虑的，需求背景，上手难易程度，技术生态等等。

整个项目是以学习为主，并不需要选取一些常见的框架业务做二次开发，而是完整的从0到1实现。整体上来说，整个项目的业务不是简单的一个两个，服务之间也有必要的关系，因此选取微服务cloud
alibaba的形式来进行开发。

数据库方面，存储的数据解构并不复杂，数据量也不会太大，因此直接使用mysql

缓存上用了redis

分布式搜索引擎就用了ElasticSearch

定时任务选择了xxl-job

## 6. 前后端的开发模式是什么样的？

项目采取的方式是前后端分离开发的模式，前后端通过 **接口文档配合原型** 来进行开发设计。

**整体的设计规范由后端的接口开发来定义**，后端编写接口文档要考虑到前端的展示能力，定义好接口的出入参之后，进行开发，文档用的是
apipost，进行团队的协作。

编写接口文档对接的时候，需要注意一下几点：

* 保证可理解性高，语义简单，定义好公共的出参格式。必填非必填等定义清晰，类型定义清晰
* 遵守原则：前端只负责进行渲染，尽可能的将逻辑进行后移，前端不要根据后端的参数做复杂的逻辑判断和处理
* 注重接口的性能

## 7. 这个刷题业务是怎么做的？![](https://img.shields.io/badge/重要-red)

::: tip 说明

既然上面提到了 **刷题业务是整个项目的核心业务**, 这一道题就需要认真准备

:::

先讲一下刷题业务的大概逻辑，刷题主要是为了方便看题库，题目是主要的信息。

题目会分为四个类型：单选、多选、判断和简答。在 **题型这块实践过程中扩展为工厂+策略的设计模式** 来做，这样做即使题型扩展，原先编写的代码也不需要修改。

为了方便查询题目，特别对题目做了 **分类和标签** 处理。其中分类表示大类，比如框架、数据库等等；而标签则对应更细的类型，一个题目可以属于多个标签，比如一道mysql
的题目，既可以属于 mysql 标签，也可以属于基础标签，这就可以做难度的划分。除此之外，还有题目的解析。

------

::: warning

这里为了 **防止给面试官解释不清楚分类和标签的设计**, 具体解释如下

分类有两个级别, 父级和子级之间靠 `parent_id` 这个字段关联( `parent_id` 为 `0` 表示父级, 否则表示对应以 `id`
为父级的子级)。

然后父级代表的就是 **岗位**, 好比 后端呀, 前端呀, 测试呀

子级代表的就是 **某个岗位里面涉及到的某些具体技术**，拿后端来说，这里的子级就可以是缓存呀，数据库呀，框架呀，消息队列什么的

接下来说标签，标签只和子级产生关系，**它能对应于某个技术里面更加精细的部分**，就比如，对于缓存这个子级，可能会有的标签比如
`Redis` 啊，事务啊，集群啊，分布式啊，数据一致性啊这样 **更加精细的点**

子级下面可以有多个标签，某个标签也可以对应于多个子级，就好比 **事务**，它可以对应在缓存中，也可以对应在数据库中

以图片为例

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE%E7%9A%84%E8%AE%BE%E8%AE%A1.jpg)

:::

------
为了方便查询题目，特别对题目做了 **分类和标签** 处理。其中分类表示大类，比如框架、数据库等等；而标签则对应更细的类型，一个题目可以属于多个标签，比如一道
mysql 的题目，既可以属于 mysql 标签，也可以属于基础标签，这就可以做难度的划分。除此之外，还有题目的解析。

为了方便精准查找，做了全文检索的高亮设计。

## 8. 你说其中用到了设计模式，这样设计有什么好处吗？![](https://img.shields.io/badge/中等-orange)

在目前的项目中，用了几处设计模式，第一块就是题目录入的时候，目前题型有四种，考虑到 **题型的可扩展性于是用工厂 + 策略模式**
进行处理，好处是，四个题型各写各的逻辑，互相解耦，互相没有任何影响，还可以扩展题型，通过在枚举中添加相应的类型，而不影响先前编写的业务代码。

另一处设计模式的使用，是 **文件相关的适配器模式**。在文件的 sdk 上封装一层
adapter，主要是为了操作底层文件的时候，不用处理任何的上层代码。上层业务无需进行任何修改，即可更换文件存储 oss。

## 9. 你这个项目的分层是怎么做的？

主要分为 **对外接口层**，**应用层**，**领域层**，**基础设施层**，**公共层**，**启动层**。

相较于传统的三层架构，这样来做模块分层 **更加的清晰，便于管理，每层只关注自身行为**。

* 对外接口层：主要是微服务之间的 api 接口提供，方便消费方进行引用调用。
* 应用层：放接口的入口，比如 controller 入口，mq 的消费，job 的启动。
* 领域层：放领域性的代码，比如新增题目能力，可能涉及很多原子，在领域层做组装，提供出去。
* 基础设施层：做最原子性的处理，主要是与 mysql，redis 等数据来源的交互，以及外部的 rpc 调用。
* 公共层：抽取所有层都需要的包及逻辑，便于复用。
* 启动层：单独抽取一个 starter，专注于启动配置。

## 10. 数据库密码加解密怎么做的？

数据库的密码加密主要是保证信息的安全性。直接使用了 **Druid**连接池的方式。利用 Druid提供的加密工具，先生成公钥和私钥，再将密码进行加密。

在项目配置文件进行配置，其中 Druid提供了一个 property，可以开启加密的使用，然后配置密钥。就实现了密码在配置文件的加密。

------

详细过程

在 Spring Boot 中使用 Druid 数据库连接池时，可以通过配置开启数据库连接信息的加解密功能，以保护数据库连接密码的安全。Druid
本身提供了加密和解密的功能，以下是具体的配置步骤。

### 1. 添加 Druid 依赖

首先，确保 `pom.xml` 中添加了 Druid 的依赖：

```xml

<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.8</version> <!-- 请使用最新版本 -->
</dependency>
```

### 2. 配置 Druid 连接池加密

Druid 提供了一种通过加密工具对数据库密码进行加密的方法。先使用 Druid 提供的加密工具生成加密后的密码。

#### 生成加密密码

运行以下代码来生成加密的数据库密码：

```java
import com.alibaba.druid.filter.config.ConfigTools;

public class DruidEncryptPassword {
    public static void main(String[] args) throws Exception {
        // 需要加密的数据库密码
        String password = "yourDatabasePassword";
        String[] keyPair = ConfigTools.genKeyPair(512);
       
        // 私钥
        System.out.println("Private Key: " + keyPair[0]);
        // 公钥
        System.out.println("Public Key: " + keyPair[1]);
        // 使用私钥加密后的密码
        System.out.println("Encrypted Password: " + ConfigTools.encrypt(keyPair[0], password));
    }
}
```

运行此程序后，将得到：

- 私钥：用于解密
- 公钥：用于加密
- 加密后的密码

将加密后的密码保存在 `application.yml` 文件中。

#### 3. 配置 Druid

接下来，可以在 `application.yml` 中配置 Druid 数据库连接池的相关参数，并使用加密后的密码。

**application.yml 示例**

```yaml
spring:
  datasource:
    druid:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://localhost:3306/yourDatabase
      username: yourUsername
      # 使用加密后的密码
      password: "{cipher}加密后的密码"
      filters: stat,wall,config
      connection-properties: config.decrypt=true;config.decrypt.key=公钥
```

在上面的配置中：

- `{cipher}` 是密码加密的标记，用于告诉 Druid 这是一个加密后的密码。
- `config.decrypt=true` 表示开启解密功能。
- `config.decrypt.key=公钥` 需要配置公钥，以便 Druid 在运行时解密密码。

#### 4. 代码解密密码

如果需要在代码中手动解密密码，可以使用 Druid 提供的 `ConfigTools` 类：

```java
String encryptedPassword = "加密后的密码";
String publicKey = "公钥";
String decryptedPassword = ConfigTools.decrypt(publicKey, encryptedPassword);
System.out.println("Decrypted Password: " + decryptedPassword);
```

### 5. 验证配置

启动 Spring Boot 应用后，Druid 会使用提供的公钥来解密加密的数据库密码并进行连接。

## 11. 分类和标签这个业务是怎么做的？![](https://img.shields.io/badge/重要-red)

这个分类和标签的设计主要也是调研了一下需求，一开始我们设计的是一个分类对应一个标签，然后一个题目只能打一个标签，后来发现，比如
redis 为什么这么快，从分析上来看，属于缓存分类，属于 redis 和基础的两个标签。那么就要打破一对一的关系。其次就是标签为基础，不仅仅是
redis 下面的，也可以是其他分类下面的。所以做了一个标签池的概念，只和分类做关联，这样做之后，既方便了录题，也方便查询。其次就是题目与他们的关联关系，通过中间表来进行关联做，这样就打通了分类，标签，题目三者的关系。

## 12. 你说你封装了一些提效的组件，这块都有什么？

举一个例子，我们在做 es 的时候，发现无论是 data 操作还是传统的 client
组装起来还是很麻烦的。其中呢，又有大量的需要组装的重复代码。还有就是集群和索引切换的情况基于这种情况，就封装了一个
esclient，其中封装了常见的各种使用，通过入参，传入属性，可以去做不同的查询逻辑，比如高亮，模糊，精准搜索等等。同时将 es
多集群，多索引的情况，通过加载的形式，放入了工厂 map，涉及不同 service 的场景，直接传入 key 就可以取到 es
的链接。进行切换使用。这个小组件，在项目里面用起来十分的方便。

## 13. 自动部署你是怎么做的？![](https://img.shields.io/badge/中等-orange)

::: tip 说明

这道题我感觉自己有能力设立钩子,引面试官问这道题相关的内容

:::

自动部署主要是采用了 **Jenkins** 来做，通过 Jenkins 构建一个 maven 项目。

在 Jenkins 的系统工具里面配置好 maven、jdk 环境，用 git 插件拉取 gitee 上托管的代码，配置其中打包的 pom 文件位置。

然后，配置 maven 打包的命令。进行这几步后，就可以从 git 上拉取代码并进行打包，生成 jar 包，但是生成 jar
包启动还需要手动启动，这样很麻烦。于是就编写 shell 脚本将打包好的 jar 包，复制到自己设置的目录中进行统一管理，其实就是运行nohuo
java -jar这要用守护线程来启动服务。

## 14. 自动部署如何往多台服务器部署呢？

往多台服务器部署的能力主要是使用了 Jenkins 的一个插件 **publish over ssh**，当 Jenkins 服务器打包完成后，可以通过这个插件将
jar 包发送到不同的机器上，发送完毕后，还可以执行配置好的 shell 脚本，这样就实现了往多台机器自动部署，只需操作一个 Jenkins。

## 15. nacos 的动态配置原理是什么？

nacos 主要是 **长轮询** 的方式获取数据，client 也就是我们的服务会像 nacos 的 server
发送请求，判断数据是否有变更的情况。如果与本地的数据对比有变化则进行配置的更新，其中判断是否更新了采取的是整体加密后的 md5
串的对比。如果无变化，则证明无更新，有变化，则拉取最新的配置。

## 16. 搭建项目你是如何解决包冲突的问题和各种组件的兼容？

在最初进行选择的时候，比如 boot 与 cloudalibababa 的冲突适配问题，我们是先选择了 springboot 的版本，考虑再三觉得 2 还是比 3
更加成熟一点，3 可能有一些还没有适配上。于是我们选择了稳定的 2.4.2 版本。

然后再通过 springboot 给我们提供的组件选择，还有 **阿里云的脚手架工具**，只需要配置我们想要使用的微服务的组件，就能给出对应组件合适兼容的版本。

其次开发过程中可能有 maven 产生的包依赖的冲突，主要依靠的是 mavenhelper 插件，他可以帮助我们将整个 pom
梳理成树结构，同时冲突的会变成红色进行标注。方便我们找到冲突，还可以通过他直接操作排除，非常方便。

## 17. 鉴权模型你是如何设计的？![](https://img.shields.io/badge/重要-red)

基于角色把授权和用户的访问控制做结合。

用户就是系统的使用者。权限就比如用户我们对系统的操作以及数据的读写权限等等。

Role（角色）就是一组权限的集合。核心思想就是把 **角色** 和 **权限** 做关联，实现整体灵活访问，提高系统的安全性和管理性。

::: danger

参考: https://sa-token.cc/doc.html#/use/jur-auth

网关统一鉴权

校验权限, 校验用户的角色等等的东西, 我们就放在网关里面统一去做

不放在网关, 导致我们的每个微服务, 全都要引入鉴权的框架和逻辑, 不断地重复代码逻辑

但同时就引来了数据的权限获取问题:

1. 网关直接对接数据库, 从数据库中查询权限

2. Redis 中获取数据, 获取不到的时候再去数据库查

3. Redis 中获取缓存, 获取不到从 auth 服务里面获取相关的信息(✅)
   auth服务就是一个非常原子性的服务, 权限相关的基操(就是实际的和数据库之间有关权限的几张表的CRUD都在这个微服务里)在这个服务中

   **关于鉴权总结就是 :先从Redis中获取缓存数据，获取不到时走RPC调用子服务 (专门的权限数据提供服务) 获取**, 可见 `auth`
   模块的作用是专门提供权限数据

:::

## 18. 权限数据你是放到了哪里？redis 吗？

<img src="https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/1707878867889-2fd212f5-4932-49c6-8361-1568dbec3755.png" alt="img" style="zoom:67%;" />

是的。在微服务架构下的一个难题即 **会话信息同步**，**单机版的Session在分布式环境下一般不能正常工作**，我们选择了主流的
redis 来存储权限信息，配合了网关 gateway 实现权限接口，实现统一的鉴权处理，避免了与数据库频繁的交互。

------

::: warning 关于“单机版的Session在分布式环境下一般不能正常工作”

在分布式环境中，使用单机版的 Session 通常会出现问题，因为单机版 Session 依赖于将用户的会话数据存储在单个服务器的内存中，会话数据在不同服务器之间无法共享。

:::

## 19. 为什么选取 satoken 来作为权限框架？![](https://img.shields.io/badge/重要-red)

一方面是 **技术选型涉及的成本**，权限是每个项目都绕不开的，如何快速的接入，并且具备较好的扩展性，功能完备，是我们最开始需要考虑的。而satoken
十分轻量，功能齐全，学习成本低，可以快速上手。

另一方面是 **复杂性考虑**：Sa-Token 是一个轻量级 Java 权限认证框架，他能解决例如 
**登录认证、权限认证、单点登录、OAuth2.0、分布式Session会话、微服务网关鉴权** 等一系列权限相关问题，正好符合我们的微服务分布式项目的场景。

无需实现任何接口，无需创建任何配置文件，只需要一句静态代码的调用，便可以完成会话登录认证。

## 20. token 机制的鉴权有什么好处？![](https://img.shields.io/badge/中等-orange)

说到 token 必须先说一下 **cookie**。传统的一般由 Cookie 完成，Cookie
有两个特性：可由后端控制写入，每次请求自动提交。这就使得我们在前端代码中，无需任何特殊操作，就能完成鉴权的全部流程。但是在app、小程序等前后端分离场景中，一般是没有
Cookie 这一功能的。

于是引入 token 这个概念。拆解出来主要是两步：

* 登录后，后端返回 token
* 前端请求带着 token，将 token 放到 header 里面

实现了 token 的传递之后，token 的生成过程可以包含各种信息，比如用户的用户名，相关的权限，都可以包含在里面，这样一个 token
就可以帮助我们带来很多信息，鉴权等功能也就非常容易做了，同时还解决了 cookie 问题。

## 21. gateway 网关你是怎么设计的？![](https://img.shields.io/badge/重要-red)

参考: https://sa-token.cc/doc.html#/micro/gateway-auth

gateway 网关，作为项目的整个流量入口，目前主要实现了路由，负载，**统一鉴权**，全局过滤器，异常处理这些功能。

路由和负载承载了后台微服务的 uri 转发和前缀匹配。

统一鉴权主要是配合 satoken，**在 gateway 集成 redis，同时实现 satoken 提供的权限读取接口**，在其中自定义读取逻辑，实现 **鉴权
** 的校验(网关在redis里面读取权限鉴权)。

**关于鉴权总结就是 :先从Redis中获取缓存数据，获取不到时走RPC调用子服务 (专门的权限数据提供服务) 获取**

还实现了登录拦截器，用于传递 loginId 到微服务中，借助了 header 的传递。

```yml
gateway:
  routes:
    - id: oss
      uri: lb://jc-club-oss
      # 断言
      predicates:
        - Path=/oss/**
      # 隐藏路径的一种方式，比如访问oss时要写成 /oss/jc-club-oss/getAllBucket才行
      # 按照下面的配置 /oss/getAllBucket这样就可以访问
      filters:
        - StripPrefix=1
    - id: subject
      uri: lb://jc-club-subject
      predicates:
        - Path=/subject/**
      filters:
        - StripPrefix=1
    - id: auth
      uri: lb://jc-club-auth
      predicates:
        - Path=/auth/**
      filters:
        - StripPrefix=1
```

上面的 `lb://` 表示使用负载均衡, 后面的 `jc-club-subject`  其实就是这个服务集群的各个ip (用了lb就必须引入负载均衡的依赖)

`      filters: StripPrefix=1` 是隐藏路径的一种方式，比如访问oss时要写成 /oss/jc-club-oss/getAllBucket才行, 按照下面的配置
/oss/getAllBucket这样就可以访问
统一鉴权主要是配合 satoken，**在 gateway 集成 redis，同时实现 satoken 提供的权限读取接口**
，在其中自定义读取逻辑，实现鉴权的校验。还实现了登录拦截器，用于传递 loginId 到微服务中，借助了 header 的传递。

## 22. 分布式会话的鉴权在微服务中的是怎么做的？![](https://img.shields.io/badge/重要-red)

分布式会话鉴权的 **重点主要是如何获取到权限数据，然后进行校验处理**。

在这里采取的方法是：直接从 redis 中获取缓存的权限数据，也就是说完全信任缓存。实际项目中必须要求redis的高可用性。

::: details 为什么？

为什么可以完全信任缓存？

考虑到当前项目主要是学习为主，实际并不会有过高的并发量，因此完全相信缓存而简化

:::

## 23. gateway 如何实现的全局异常处理？![](https://img.shields.io/badge/重要-red)

::: tip 强调

简历上写了,必须背背

:::

gateway 的全局异常处理主要需要 **实现一个接口ErrorWebExceptionHandler**，实现其中的 **handle** 方法，在方法内我们能获取到其中
**request 与 response**，webhandler 会帮助我们拦住所有异常的情况。然后可以做拦截的进一步处理，比如更改状态码，状态错误信息等等。最后通过
response 可以将其返回出去。

## 24. 用户登录的密码加密你做了吗？

要做加密，即使拿到了密码信息， 也不能还原原始的密码。

加密主要有摘要加密，对称加密，非对称加密。

我们采用的是 md5 摘要配合加盐。摘要算法比如 md5，光加密 123456，结果都是一样的，如果是破解的库里正好有这个 md5 就很容易知道逆向是
123456。来一手加盐。盐是随机的字符串，他来与原密码进行一波二次加密。这样获取到的很难破解出来。

网上有许多md5破译的密码信息，一些常见的密码很容易有破译结果。

## 25. 缓存与数据一致性，你有什么样的理解吗？

没啥好说的直接看鸡哥https://www.yuque.com/jingdianjichi/kwag7a/rk2bbdr71lhntod8

## 26. 你是如何对接公众号登录的？![](https://img.shields.io/badge/重要-red)

::: tip 说明

这个问题可能会和Sa-Token挂钩

:::

首先，在一开始的数据表设计是有用户名和密码的逻辑的，但是现在微信扫码的方式很方便，其次，微信公众号的方式 **每个用户都有其唯一的
openId** 作为唯一标识，也能方便登录，所以引入这种方式

整体流程主要是用户扫公众号码，扫码后后台随机回复一个验证码，用户在登陆扫码后输入这个验证码点击登录，此时 redis 中就存储了
`openId + 验证码` 的结构。

如果是首次登陆即为注册，进入注册的模块同时关联一些基础默认的角色和权限，其他情况下就是登陆操作，这时角色和权限就是该用户对应的角色和权限，
**到这里，我们就实现了网关的统一鉴权**。

由于每个用户都有自己唯一的 openId, 结合 Sa-Token 登录的方式，我们将 openId 传入，这样每个用户都有自己独特的状态的
token，之后所有的请求都会带着这个 token， 所有的请求都根据该 token 的状态来鉴权判定是否执行。

## 27. 你是如何监听用户发给公众号的消息的？

**主要是对接公众号的回调消息平台配置**。重点主要分为三步：填写服务器配置，验证服务器地址的有效性，依据接口文档实现业务逻辑。

在公众号配置界面填写服务器地址（URL）、Token和EncodingAESKey

* URL是我们编写的微信后端服务接口，我们把它部署到服务器上，或者用内网穿透工具实现

* Token可以任意填写，用作生成签名（该Token会和接口URL中包含的Token进行比对，从而验证安全性）

* EncodingAESKey手动填写或随机生成，将用作消息体加解密密钥。

验证消息的确来自微信服务器：**微信服务器将发送GET请求** 到填写的服务器地址URL（**其实就是我们自己写的微信的后端服务**
）上，GET请求携带参数有签名，内容，时间戳之类的，后台服务要通过一样的加密形式来进行校验。

依据接口文档实现业务逻辑：验证URL有效性成功后即接入生效，用户每次向公众号发送消息，开发者填写的服务器配置URL将得到微信服务器推送过来的消息和事件，开发者可以依据自身业务逻辑进行响应，如回复消息。

微信的消息是XML结构的，可以观察微信消息的结构，提取关键字从而实现发送和接受消息

## 28. 回调消息的验证校验是如何做的？

开发者通过检验signature对请求进行校验。若确认此次GET请求来自微信服务器，请原样返回echostr参数内容，则接入生效，成为开发者成功，否则接入失败。加密/校验流程如下：

1）将token、timestamp、nonce三个参数进行字典序排序

2）将三个参数字符串拼接成一个字符串进行sha1加密

3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信

## 29. 多线程你是在哪里用到的，咋用的？![](https://img.shields.io/badge/重要-red)

多线程主要是用于前端的 **分类请求**，一开始每个分类都是轮询获取标签，比如有 10 个分类，要串行调用 10 次，速度特别的慢。

于是将逻辑进行后移，将 **分类换成多线程并发获取**，然后统一进行组装，再返回给前端,提高了性能。

主要用到了 **`futuretask`** 和  **`CompletableFuture`（主要）** 和来进行实现，同时 **自定义线程池**，而不是使用 jdk
提供的默认线程池。

------

::: danger

为了防止这些话看不懂给面试官解释不清楚，我们对上面的话进行一波改版

（前提：翻到最上面看我写的具体设计，把这个设计先给面试官说清楚）

依据我们的设计，每个岗位下都有一系列二级分类（这里就称为 **技术**），每个 **技术** 下面又有各自的一系列标签

点击一个岗位肯定要先查询到这个岗位下面的技术有哪些，这个是 **前置**
也是必须的，接着对于标签就是根据这些技术来查，怎么查就是下面的关键啦~

原先我们的设计没有引入多线程，这意味着当用户从前端刚进入页面的时候，此时展示一个默认岗位下面的信息，那么这个默认岗位下面的一系列
**技术** 对应的标签就需要用 **轮询** 的方法，即一个技术一个技术的去查到对应的标签信息最后全部展示出来。*
*简单来说，查询的时候某个时刻只能查到一个技术下面的标签**

引入多线程以后（而且是池化技术，线程复用减少了上下文切换），对于一个岗位下面的多个技术来说，在线程池里启动线程，*
*每个线程负责查询一个技术下面的标签**，最后根据 `CompletableFuture` 的特性，**异步** 地 **组装** 这些线程各自获得的结果最后展示出来。
**简单来说，查询的时候某个时刻可以查到多个技术下面的标签**

如果是用 `FutureTask`， 可以结合 `CountDownLatch`
（其实就是个倒数计时器，因为异步任务你不知道什么时候他就执行完了，总不能每次都特别等一段长点儿的时间然后返回结果，这样太蠢了，对与我们这里的场景来说，用
`CountDownLatch` 的话就可以初始化为 **技术的个数**， 那么等待这个计数器消耗完毕，也就是所有技术都查询完了以后再获取结果就ok了）

主流的话是用 `CompletableFuture`

**时间相关**：原本的需要200-300ms，多线程可以优化到 40-70ms，

:::

下面是优化前进入前端，这个时候请求还在查询，需要好一会儿才会出来

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/%E5%85%B3%E4%BA%8E%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E4%BC%98%E5%8C%96%E5%89%8D-%E7%AD%BE%E5%89%8D%E7%AB%AF%E7%9A%84%E5%93%8D%E5%BA%94%E6%83%85%E5%86%B5.jpg)

------

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/%E5%88%86%E7%B1%BB%E5%AD%90%E5%88%86%E7%B1%BB%E6%A0%87%E7%AD%BE.png)

```java
/**
     * 查询分类下标签-一次性
     *
     * @param subjectCategoryBO
     * @return
     */
@SneakyThrows
@Override
public List<SubjectCategoryBO> queryCategoryAndLabel(SubjectCategoryBO subjectCategoryBO) {
    Long id = subjectCategoryBO.getId();
    String cacheKey = "categoryAndLabel." + subjectCategoryBO.getId();
    List<SubjectCategoryBO> subjectCategoryBOS = cacheUtil.getResult(cacheKey,
                                                                     SubjectCategoryBO.class, (key) -> getSubjectCategoryBOS(id));
    return subjectCategoryBOS;
}

private List<SubjectCategoryBO> getSubjectCategoryBOS(Long categoryId) {
    SubjectCategory subjectCategory = new SubjectCategory();
    subjectCategory.setParentId(categoryId);
    subjectCategory.setIsDeleted(IsDeletedFlagEnum.UN_DELETED.getCode());
    List<SubjectCategory> subjectCategoryList = subjectCategoryService.queryCategory(subjectCategory);
    if (log.isInfoEnabled()) {
        log.info("SubjectCategoryController.queryCategoryAndLabel.subjectCategoryList:{}",
                 JSON.toJSONString(subjectCategoryList));
    }
    List<SubjectCategoryBO> categoryBOList = SubjectCategoryConverter.INSTANCE.convertBoToCategory(subjectCategoryList);
    Map<Long, List<SubjectLabelBO>> map = new HashMap<>();
    List<CompletableFuture<Map<Long, List<SubjectLabelBO>>>> completableFutureList =
        categoryBOList.stream()
        .map(category -> CompletableFuture.supplyAsync(() -> getLabelBOList(category), labelThreadPool)) // [!code highlight]
        .collect(Collectors.toList());
    completableFutureList.forEach(future -> {
        try {
            Map<Long, List<SubjectLabelBO>> resultMap = future.get();
            if (!MapUtils.isEmpty(resultMap)) {
                map.putAll(resultMap);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    });
    categoryBOList.forEach(categoryBO -> {
        if (!CollectionUtils.isEmpty(map.get(categoryBO.getId()))) {
            categoryBO.setLabelBOList(map.get(categoryBO.getId()));
        }
    });
    return categoryBOList;
}

private Map<Long, List<SubjectLabelBO>> getLabelBOList(SubjectCategoryBO category) {
    if (log.isInfoEnabled()) {
        log.info("getLabelBOList:{}", JSON.toJSONString(category));
    }
    Map<Long, List<SubjectLabelBO>> labelMap = new HashMap<>();
    SubjectMapping subjectMapping = new SubjectMapping();
    subjectMapping.setCategoryId(category.getId());
    List<SubjectMapping> mappingList = subjectMappingService.queryLabelId(subjectMapping);
    if (CollectionUtils.isEmpty(mappingList)) {
        return null;
    }
    List<Long> labelIdList = mappingList.stream().map(SubjectMapping::getLabelId).collect(Collectors.toList());
    List<SubjectLabel> labelList = subjectLabelService.batchQueryById(labelIdList);
    List<SubjectLabelBO> labelBOList = new LinkedList<>();
    labelList.forEach(label -> {
        SubjectLabelBO subjectLabelBO = new SubjectLabelBO();
        subjectLabelBO.setId(label.getId());
        subjectLabelBO.setLabelName(label.getLabelName());
        subjectLabelBO.setCategoryId(label.getCategoryId());
        subjectLabelBO.setSortNum(label.getSortNum());
        labelBOList.add(subjectLabelBO);
    });
    labelMap.put(category.getId(), labelBOList);
    return labelMap;
}
```

这段代码的主要功能是查询分类及其下的标签。具体流程如下：

1. **`queryCategoryAndLabel` 方法：**
    - 该方法是查询分类及其标签的入口。
    - 首先从 `SubjectCategoryBO` 中获取分类的 `id`，并生成缓存键 `cacheKey`。
    - 使用 `cacheUtil.getResult` 从缓存中查询分类及其标签信息，如果缓存中没有，则通过回调 `getSubjectCategoryBOS(id)`
      获取数据。

2. **`getSubjectCategoryBOS` 方法：**
    - 该方法用于根据分类 ID 查询该分类及其下的标签信息。
    - 首先构造一个 `SubjectCategory` 对象，用于查询所有属于该分类的子分类，并过滤掉已删除的分类。
    - 查询结果后，将其转换为 `SubjectCategoryBO` 对象的列表。
    - 然后，使用 `CompletableFuture` 异步查询每个分类下的标签信息。每个分类下的标签查询操作在 `getLabelBOList`
      方法中执行，并在一个独立的线程池 `labelThreadPool` 中进行。
    - 所有的标签查询结果存放在 `map` 中，最后将标签信息与对应的分类绑定起来。

3. **`getLabelBOList` 方法：**
    - 该方法负责为给定的分类查询其关联的标签。
    - 通过 `SubjectMapping` 对象查询该分类下的标签 ID 列表。
    - 如果找到标签 ID，则通过 `subjectLabelService.batchQueryById` 批量查询标签信息，并将其转换为 `SubjectLabelBO`
      对象列表，最后将标签信息放入 `labelMap` 中。

### 关键流程总结：

1. **从缓存中获取分类和标签信息**，若不存在，则进行数据库查询。
2. **异步处理标签查询**：为每个分类异步查询标签，提升查询效率。
3. **结果合并**：将查询到的标签绑定到相应的分类对象中。

代码的总体目的是通过分类 ID，查询该分类及其下的子分类，并为每个分类获取其对应的标签列表，最终返回分类与标签的完整数据结构。
主要用到了 **futuretask** 来进行实现，同时 **自定义线程池**，而不是使用 jdk 提供的默认线程池。

## 30. 自定义线程工厂的意义是什么？![](https://img.shields.io/badge/重要-red)

自定义线程工厂好处多多，比如:

* **可以设置自定义的线程名**，方便我们开发调试，问题日志查找及定位。

* 可以设置守护线程。
* 可以设置 **线程优先级**
* 可以处理未捕获的异常：在执行一个任务时，线程可能会由于未捕获的异常而终止，默认处理是将异常打印到控制台。但这种处理方式有时并非你所想要的，存放如文件或者db会更合适。
* 拒绝策略优先选择`CallerRunsPolicy`，即调用者执行，在线程池中不足以处理的时候交给调用者来执行

## 31.线程池的数量应该设置多少

**没有固定答案，先设定预期，比如我期望的CPU利用率在多少，负载在多少，GC频率多少之类的指标后，再通过测试不断的调整到一个合理的线程数**

网传的如下是不合理的，Java创建的线程是受很多指标影响的，这么简单的计算肯定是没有严谨的科学依据的，看着就不靠谱，**一定要经过不断的测试**

1. CPU 密集型的程序 - 核心数 + 1
2. I/O 密集型的程序 - 核心数 * 2

## 32. 全局的用户上下文打通你是怎么做的？![](https://img.shields.io/badge/重要-red)

::: details 重要

这个问题还是很关键的,必须掌握

**关于threadlocal**:

`ThreadLocal` 是 Java 提供的一种用于在**多线程环境下存储每个线程自己的变量副本**
的工具。它为每个线程都维护了一个独立的变量副本，这样每个线程都可以独立地改变它的副本，而不会影响其他线程中的副本。
`ThreadLocal` 通常用于解决在多线程环境下共享变量时的并发问题。

1. **基本概念**

`ThreadLocal` 提供了一种线程级别的局部变量存储机制。每个线程都可以通过 `ThreadLocal` 对象来访问该线程独有的变量，即使多个线程在使用同一个
`ThreadLocal` 对象，它们也只能访问自己线程中的值。

主要的几个方法：

- **`set(T value)`**：将当前线程的局部变量设置为 `value`。
- **`get()`**：返回当前线程局部变量的值。
- **`remove()`**：移除当前线程的局部变量，防止内存泄漏。
- **`initialValue()`**：返回当前线程局部变量的初始值。默认是 `null`，但可以通过重写这个方法提供一个默认值。

2. **使用场景**

`ThreadLocal` 主要用于以下场景：

- **线程隔离**：在多线程环境下，每个线程拥有自己独立的变量副本，避免线程之间相互干扰。
- **共享资源管理**：适合在某些情况下需要为每个线程提供独立的资源（如数据库连接、事务、Session、用户信息等）。
- **避免锁**：与传统的通过加锁来保护共享变量不同，`ThreadLocal` 允许每个线程使用自己独立的副本，从而避免了使用同步锁带来的性能开销。

在 Web 应用中，通常会为每个用户请求创建一个独立的用户上下文信息，例如登录用户的身份信息、请求上下文等。这些信息是线程独有的，可以使用
`ThreadLocal` 来保存，避免在每次请求中传递额外的参数。

:::

链路流程：

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/%E9%93%BE%E8%B7%AF%E6%B5%81%E7%A8%8B.jpg)

详细设计：

<img src="https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/1707884371208-a9f8d49a-0fe0-477b-afb9-f08db05f5b35.png" alt="img" style="zoom:50%;" />

当用户的请求来临的时候，前端会带着 token，token 里面有用户的 loginId 信息，首先经过网关的全局拦截器，拦截器会帮我们放入
header 里面，传递到其他微服务，微服务自己又实现了拦截器，获取到之后，放入上下文对象中，如果是微服务之间的 feign 调用，则又实现了
feign 的拦截器交互。然后提供了全局的 `Util` 操作，只要应用这个工具类，就可以随时获得用户信息

------

### 细节：

1. #### 网关层面的全局拦截器 `LoginFilter`<img src="https://img.shields.io/badge/重要-red" style="zoom:150%;" />

   这个是开头，所有的请求都要先打到网关，在网关中把信息放到Header中去

   ```java
   /**
    * 网关全局过滤器，把除了登录以外的请求从token中获取loginId放入header中
    *
    * @author York
    * @className LoginFilter
    * @date 2024/09/17 16:44
    * @description
    */
   @Component
   @Slf4j
   public class LoginFilter implements GlobalFilter {
   
       @Override
       @SneakyThrows
       public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
           ServerHttpRequest request = exchange.getRequest();
           ServerHttpResponse response = exchange.getResponse();
           ServerHttpRequest.Builder mutate = request.mutate();
           String url = request.getURI().getPath();
           log.info("LoginFilter.filter.url:{}", url);
           if (url.equals("/user/doLogin")) {
               return chain.filter(exchange);
           }
           SaTokenInfo tokenInfo = StpUtil.getTokenInfo();
           log.info("LoginFilter.filter.url:{}", new Gson().toJson(tokenInfo));
           String loginId = (String) tokenInfo.getLoginId();
           mutate.header("loginId", loginId);
           return chain.filter(exchange.mutate().request(mutate.build()).build());
       }
   }
   ```

2. #### 对于每个微服务我们都要做如下的设置<img src="https://img.shields.io/badge/重要-red" style="zoom:150%;" />

   由网关分发过来的对每个微服务的调用请求，都经过拦截器的处理，把header中的信息添加到上下文对象中（每个微服务都要这样）

   从网关发来的请求经过 **登录拦截器 `LoginInterceptor` **，从 **Header** 中获取 `loginId` 并把它存到上下文对象 `LoginContextHolder` 中

   这里的上下文对象就是根据 `InheritableThreadLocal` 实现的，他可以实现子线程继承父线程的本地变量，也能解决多线程复用带来的一些问题

   ```java
   /**
    * 登录拦截器
    * 除了登录以外的所有请求经过网关的LoginFilter以后，Header中就已经带上了loginId这个信息
    * 但是微服务之间各种调用需要用上下文对象，把这个loginId存到这个上下文对象，做法是结合threadlocal
    */
   public class LoginInterceptor implements HandlerInterceptor {
   
       private static final String LOGIN_ID = "loginId";
   
       @Override
       public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
           String loginId = request.getHeader(LOGIN_ID);
           if (StringUtils.isNotBlank(loginId)) {
               // 将loginId存入到上下文对象中
               LoginContextHolder.set(LOGIN_ID, loginId);
           }
           return true;
       }
       
       // [!code focus:7]
       // 将上下文对象清除，这是threadlocal使用的一个非常要注意的点，否则由于线程复用会造成数据问题
       @Override
       public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
           LoginContextHolder.remove();
       }
   }
   ```

3. #### 补充上述我们的上下文对象

   ```java
   /**
    * 登录上下文对象
    */
   public class LoginContextHolder {
   
       private static final InheritableThreadLocal<Map<String, Object>> THREAD_LOCAL
           = new InheritableThreadLocal<>();
   
       public static void set(String key, Object val) {
           Map<String, Object> map = getThreadLocalMap();
           map.put(key, val);
       }
   
       public static Object get(String key) {
           Map<String, Object> threadLocalMap = getThreadLocalMap();
           return threadLocalMap.get(key);
       }
   
       public static String getLoginId() {
           return (String) getThreadLocalMap().get("loginId");
       }
   
       public static void remove() {
           THREAD_LOCAL.remove();
       }
   
       public static Map<String, Object> getThreadLocalMap() {
           Map<String, Object> map = THREAD_LOCAL.get();
           if (Objects.isNull(map)) {
               map = new ConcurrentHashMap<>();
               THREAD_LOCAL.set(map);
           }
           return map;
       }
   }
   ```

4. #### 将登录拦截器 `LoginInterceptor` 注册到 MVC 的全局拦截器中，这样才会生效

   ```java
   /**
    * mvc的全局处理
    * 为了解决SpringMVC出现的问题，比如那个disable SerializationFeature.FAIL_ON_EMPTY_BEANS
    */
   @Configuration
   public class GlobalConfig extends WebMvcConfigurationSupport {
   
       /**
        * 全局配置
        *
        * @param converters
        */
       @Override
       protected void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
           super.configureMessageConverters(converters);
           converters.add(mappingJackson2HttpMessageConverter());
       }
   	
       // [!code focus:7]
       @Override
       protected void addInterceptors(InterceptorRegistry registry) {
           registry.addInterceptor(new LoginInterceptor())
               .addPathPatterns("/**")
               .excludePathPatterns("/user/doLogin");
       }
   
       private MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
           ObjectMapper objectMapper = new ObjectMapper();
           objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
           // 需求：后端返回的东西如果是null就不返回给前端了
           objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
           MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter(objectMapper);
           return converter;
       }
   }
   ```

5. 创建一个工具类 `LoginUtil` 及时获取 `loginId`

   直接从上下文对象中获取即可

   ```java
   public class LoginUtil {
   
       public static String getLoginId() {
           return LoginContextHolder.getLoginId();
       }
   }
   ```

------

#### 关于RPC调用

这样上下文就打通了？不！对于 `RPC`（这里我们用的是Feign的调用方式，我们发现，Feign调用的时候之前封装的信息会丢失，就是比如A服务要调用B服务，请求正常打到A服务到A服务调用B服务之前这个信息我们一直都是能拿到的，但是A服务调用B服务的时候，这个信息就丢失了，这个就是我们要探讨的地方）

==关于这点，可以看我的【技术分享】专栏里面，关于微服务调用这里的看到的博客==

看一下Feign调用的源码执行，可以看到主要是 *构建了一个新的RequestTemplate ，之前处理的Header加入的信息就都没了*

```java
//1.在远程调用的方法上打个断点
List<MemberAddressVo> address = memberFeignService.getAddress(memberRespVo.getId());

//2.进入方法内部 ReflectiveFeign.class
public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    //判断调用是不是equal方法
    if (!"equals".equals(method.getName())) {
        //判断是不是调用hashCode
        if ("hashCode".equals(method.getName())) {
            return this.hashCode();
        } else {
            //判断是不是调用toString 都不是就执行  ((MethodHandler)this.dispatch.get(method)).invoke(args);
            return "toString".equals(method.getName()) ? this.toString() : ((MethodHandler)this.dispatch.get(method)).invoke(args);
        }
    } else {
        try {
            Object otherHandler = args.length > 0 && args[0] != null ? Proxy.getInvocationHandler(args[0]) : null;
            return this.equals(otherHandler);
        } catch (IllegalArgumentException var5) {
            return false;
        }
    }
}

//3. ((MethodHandler)this.dispatch.get(method)).invoke(args); 
//点击进入invoke 方法  SynchronousMethodHandler.class
public Object invoke(Object[] argv) throws Throwable {
    // [!code focus:4]
    //就是在这 构建了一个新的RequestTemplate ，之前处理的Header加入的信息就都没了
    RequestTemplate template = this.buildTemplateFromArgs.create(argv);
    Retryer retryer = this.retryer.clone();

    while(true) {
        try {
            //在这即将执行该方法
            return this.executeAndDecode(template);
        } catch (RetryableException var8) {
            RetryableException e = var8;

            try {
                retryer.continueOrPropagate(e);
            } catch (RetryableException var7) {
                Throwable cause = var7.getCause();
                if (this.propagationPolicy == ExceptionPropagationPolicy.UNWRAP && cause != null) {
                    throw cause;
                }

                throw var7;
            }

            if (this.logLevel != Level.NONE) {
                this.logger.logRetry(this.metadata.configKey(), this.logLevel);
            }
        }
    }
}
```

深入查看 `executeAndDecode方法` 原因：

```java
Object executeAndDecode(RequestTemplate template) throws Throwable {
    // [!code focus:3]
    //这里 它会对我们的请求进行一些包装 
    Request request = this.targetRequest(template);
    
    if (this.logLevel != Level.NONE) {
        this.logger.logRequest(this.metadata.configKey(), this.logLevel, request);
    }

    long start = System.nanoTime();

    Response response;
    try {
        response = this.client.execute(request, this.options);
    } catch (IOException var15) {
        if (this.logLevel != Level.NONE) {
            this.logger.logIOException(this.metadata.configKey(), this.logLevel, var15, this.elapsedTime(start));
        }

        throw FeignException.errorExecuting(request, var15);
    }

    // [!code focus:14]
    //下面我们查看一下targetRequest方法
    Request targetRequest(RequestTemplate template) {
        //拿到对应的所有请求拦截器的迭代器
        Iterator var2 = this.requestInterceptors.iterator();

        //遍历所有的请求拦截器
        while(var2.hasNext()) {
            RequestInterceptor interceptor = (RequestInterceptor)var2.next();
            //这里是每个请求拦截器 依次对该方法进行包装
            interceptor.apply(template);
        }
        return this.target.apply(template);
    }


    //我们发现它是一个接口 所以可以重写一下这个方法 对我们的请求做一些包装 借鉴一下别的实现方法
    public interface RequestInterceptor {
        void apply(RequestTemplate var1);
    }

    public class BasicAuthRequestInterceptor implements RequestInterceptor {
        public void apply(RequestTemplate template) {
            template.header("Authorization", new String[]{this.headerValue});
        }
    }
```

**所以我们要做的就是自主的添加这么一个 `RequestInterceptor`**

```java
/**
 * Feign请求拦截器
 * 我们发现，使用微服务RPC调用时（我们这里是用Feign的方式）
 * 根据之前的MVC全局拦截器，从网关一开始打来的请求Header中已经加入了loginId这个信息
 * 但是用Feign调用的时候，这个信息却丢失了（扩展：还要注意一点是Feign的重置有三次）
 * 根据Feign调用的源码执行，会构建一个新的RequestTemplate，之前处理的Header加入的信息就都没了
 */
@Component
public class FeignRequestInterceptor implements RequestInterceptor {

    private static final String LOGIN_ID = "loginId";

    @Override
    public void apply(RequestTemplate requestTemplate) {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = requestAttributes.getRequest();
        if (Objects.nonNull(request)) {
            String loginId = request.getHeader(LOGIN_ID);
            if (StringUtils.isNotBlank(loginId)) {
                requestTemplate.header(LOGIN_ID, loginId);
            }
        }
    }
}
```

然后把这个拦截器注入到配置中即可

```java
/**
 * openFeign的配置类
 * 这里加入了我们自定义的拦截器FeignRequestInterceptor
 * 作用是为了让RPC调用时也能拿到user的loginId，也就是username
 */
@Configuration
public class FeignConfiguration {

    @Bean
    public RequestInterceptor requestInterceptor(){
        return new FeignRequestInterceptor();
    }

}
```

到此，所有的上下文才算完全打通

## 33. 微服务之间的数据交互是如何做的？

微服务之间的交互用的是 **openfeign** 进行远程调用。回到架构设计上特别设计的 api 模块层，专门来写对外提供的服务 api，打包成
jar 后，需要调用的服务直接引入 jar 包就可以实现调用。api 包，我们定义了当前微服务对外的各种接口，比如我们的题目微服务，想要调用用户信息，直接引入
auth 微服务的 jar 包即可。开启 **feignclient** 指定好应用名，就可以开始调用了。

## 34. 本地缓存在哪里使用的？![](https://img.shields.io/badge/中等-orange)

本地缓存在项目中是在 **分类和标签查询** 使用的，<u>分类和标签的数据很少产生变更，加个缓存速度更快</u>，其实从实际的角度，其实直接用
redis 作为缓存就可以适合这个场景了。但是可以去额外了解 **本地缓存 Guava 的使用**，于是引入了本地缓存。并且基于此配合函数式编程封装了一个公共缓存工具类。

## 35. 你这个函数式编程配合泛型是为了解决什么问题？![](https://img.shields.io/badge/一般-g)

::: tip 提示

这个点我并没有在简历上写,自己暂时知道即可

:::

对于我们大多数的场景，无非就是先查询缓存，缓存内没有数据，则去查询数据库。这个过程其实是一个很固定的模式。

查询数据库的地方可以抽象为函数
function，返回数据和入参可以作为泛型。中间和缓存的交互，我可以通过序列化，在工具内部进行判断。如果做了这个工具类，那就意味着，只要我调用工具类的一个静态方法，传入一个当缓存不存在的时候，我要执行的动作，那么就可以实现缓存的存入和读取了。

## 36. 全文检索怎么做的，有高亮吗？

全文检索只要是引入了 es 模块。依靠其强大的 **倒排索引** 的能力来做关键词的反向搜索，获取搜索结果相关性的评分，评分高的证明相关性越高，排序排在最前面。

高亮是用 **highlight** 的方式，确定高亮数据要展示的标签，比如我们加了一个 `<span> red`，这样返回给前端之后，前端将其展示出来就变为了红色。其中的分词我使用了
ik 分词器，更加的符合中文的切分逻辑。

------

其实 **高亮** 本来就是先找到目标文字, 然后给目标文字 **加上使之高亮的标签**, 然后前端渲染这个带了高亮标签的文档, 这就是高亮

## 37. 你封装的这个 es 工具有什么好处吗？

我们在做 es 的时候，发现无论是 data 操作还是传统的 client 组装起来还是很麻烦的。其中有大量的需要组装的重复代码。

还有集群和索引切换的情况基于这种情况，于是就封装了一个 esclient，其中封装了常见的各种使用，通过入参，传入属性，可以去做不同的查询逻辑，比如高亮，模糊，精准搜索等等。

同时将 es 多集群，多索引的情况，通过加载的形式，放入了工厂 map，涉及不同 service 的场景，直接传入 key 就可以取到 es
的链接。进行切换使用。这个小组件，在项目里面用起来十分的方便。

## 38. 排行榜是如何设计的？

直接看：https://www.yuque.com/jingdianjichi/kwag7a/dkdh73io7gxcbgxe

## 39. 点赞和收藏怎么设计的？

直接看：https://www.yuque.com/jingdianjichi/kwag7a/dkdh73io7gxcbgxe

## 40. 项目有用到定时任务吗？怎么做的？

有的，项目上的定时任务，我们采用的是 **xxljob**
，分布式任务调度，因为我们这一块用的是微服务，必须要考虑多个服务的执行的问题，如果用传统的定时任务方式，防止不了同时执行的问题，可能还有自己写分布式锁来进行排斥处理。不如直接使用
xxljob，xxljob 的调度十分完善，故障转移，负载均衡算法选择都非常方便，引入后，直接配置即可执行。

像项目里面同步点赞和收藏的数据，我们就是采用定时任务来进行操作的。定时任务扫描到待同步的数据，扫描后同步到数据库。

## 41. 你还有什么想要问我的吗？

::: danger 重点

这个问题，鸡哥真的要给你们好好说一说，一定不要说没啥。在这个问题上，到这里就是面试的尾声了，你要体现的是自己的积极上进，意愿强烈，这些东西。说几个比较好的问题。

听🐔鸡哥的准没错

:::

1、面试官，请问咱们这个部门的业务主要是做什么呢？ps：如果是网上能搜到的业务，你就不要在这重复问了，显得你不会收集信息。

2、面试官，请问咱们这个产品的并发和用户量有多少？平时技术挑战多吗？

3、面试官，通过这场面试，您觉得我应该在哪些方面进行继续的努力？

4、面试官，我觉得我十分想加入咱们公司，有哪些东西是我可以提前准备准备的？（ps 这个问题，hr 面，或者终面，觉得效果不错再问）



------

# 补充

## 1. “采取**适配器模式**实现oss对接”是怎么做的

首先这个做法的场景是希望切换不同的OSS服务时不需要改动任何业务代码, 而只在 Nacos 中指定想要的 OSS 服务的 type, 依据Nacos
结合 `@RefreshScope注解` 动态的刷新配置, 即读取指定的 type 然后修改为相应的适配器, 具体做法如下:

首先对不同的 OSS 服务的主要功能 抽取出一个公共的接口即 `Adapter`, 这里以 `MinIO` 为例。写一个配置类 `MinIOConfig` 先来读取
`yml` 中关于 `MinIO` 必要的配置信息, 比如 `url`, `accessKey`, `secretKey`, 接着根据 `MinIO` 提供的 `MinIOClient`
进一步封装其中的操作为一个工具类 `MinIOUtil`, 接着就可以专门为 `MinIO` 实现上述的适配器,
只需要注入刚刚封装好的工具类即可实现.这时一个可用的适配器就做好了

接着, 为了在 `Controller` 中透明的提供 `OSS` 的服务, 于是对适配器做一个包装, 创建一个配置类专门动态的读取和刷新 `OSS`
服务的 `type`, 根据不同的类型返回一个相应的适配器对象, 但统一都名为 `storageAdapter`, 即最上面提到的适配器类型。最后,
创建一个 `FileService`, 用 `构造器注入Bean` 的方法注入这个适配器的实现对象, 就可以实现 根据类型注入对应的适配器对象,
这样就可以用了

```java
private final StorageAdapter storageAdapter;

public FileService(StorageAdapter storageAdapter) {
    this.storageAdapter = storageAdapter;
}
```

------

**简单记忆**:

为实现适配器模式对接OSS并动态切换服务，首先定义一个公共接口 `StorageAdapter`，抽象出不同OSS服务的核心功能。以MinIO为例，编写
`MinIOConfig` 读取配置，并通过 `MinIOClient` 封装为工具类 `MinIOUtil`，再实现MinIO的适配器。接着，通过配置类动态读取Nacos中的OSS服务类型，结合
`@RefreshScope` 实现配置刷新，返回相应适配器实例，统一命名为 `storageAdapter`。最后，在 `FileService` 中通过构造函数注入
`storageAdapter`，实现动态注入对应的适配器，确保业务代码无需修改。

## 2. “Gateway 网关实现全局异常处理” 怎么实现的

```java
/**
 * 网关实现全局异常处理
 */
@Component
public class GatewayExceptionHandler implements ErrorWebExceptionHandler {

    private ObjectMapper objectMapper = new ObjectMapper();


    @Override
    public Mono<Void> handle(ServerWebExchange serverWebExchange, Throwable throwable) {
        ServerHttpRequest request = serverWebExchange.getRequest();
        ServerHttpResponse response = serverWebExchange.getResponse();
        Integer code = 200;
        String message = "";
        if (throwable instanceof SaTokenException) {
            code = 401;
            message = "用户无权限";
            throwable.printStackTrace();
        } else {
            code = 500;
            message = "系统繁忙";
            throwable.printStackTrace();
        }
        Result result = Result.fail(code, message);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        return response.writeWith(Mono.fromSupplier(() -> {
            DataBufferFactory dataBufferFactory = response.bufferFactory();
            byte[] bytes = null;
            try {
                bytes = objectMapper.writeValueAsBytes(result);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            return dataBufferFactory.wrap(bytes);
        }));
    }
}
```

实现 `ErrorWebExceptionHandler` 接口, 重写 `handle` 方法, 其中的 `serverWebExchange` 就包含了本次请求中的 `request` 和
`response` 等信息, 主要利用这两个就可以根据 `throwable` 异常信息做出相应的反馈

## 3. 缓存与数据一致性问题

==**当我们选择了完全信任缓存的时候，以下不需要考虑**==

一般的流程是，先查缓存，缓存没有的话查数据库，查到数据库的信息在返回之前将这条信息放入缓存中去。但是这样在并发环境下会有数据不一致的问题

### 一种方法是先删除缓存，再更新数据库

这种方法有一定的使用量，即使数据库更新失败，缓存也会刷，确保了缓存和数据的一致性

但是这种方法==**在高并发下**==，

比如有A\B两个线程，按照先删除缓存再更新数据库的操作，A线程把缓存中的数据删了正在更新数据库，此时B线程发现缓存没有数据于是去查询数据库，这时数据库的信息还没有更新完毕已经查到了，==这就是脏数据==，把这个脏数据又插入到了缓存中去，于是出现了问题

### 比较好的推荐方法——延迟双删

对于以上比较好的解决方法：

就是更新完数据库以后（这里隐含了一次更新前删除缓存、并在更新完以后将最新的数据插入到缓存中的操作），这时再删一次缓存，于是再查一次数据库将最新的数据放入到缓存中去（这就是删两次）

### 扩展思路

1. 消息队列补偿

   删除失败的缓存，作为消息打入mq，mq消费者进行监听，再次进行重试刷缓存

2. canal

   监听数据库的变化，做一个公共服务，专门对接缓存刷新。优点是业务解耦，否则的话业务太多冗余代码复杂度

## 4. 把这几种常用的MP的实例好好记一记 老忘

```xml

<select id="listUserInfoByIds" resultType="com.york.auth.infra.basic.entity.AuthUser">
    select
    id, user_name, nick_name, email, phone, password, sex, avatar, status, introduce, ext_json, created_by,
    created_time, update_by, update_time, is_deleted
    from auth_user
    where user_name in
    <foreach collection="userNameList" index="index" item="item" open="(" separator="," close=")">
        #{item}
    </foreach>
</select>

        <!--新增所有列，用selectKey返回本次插入后的id-->
<insert id="insert" keyProperty="id" useGeneratedKeys="true">
<selectKey resultType="java.lang.Long" keyProperty="id" order="AFTER">
    SELECT LAST_INSERT_ID()
</selectKey>
insert into auth_user(user_name, nick_name, email, phone, password, sex, avatar, status, introduce, ext_json,
created_by, created_time, update_by, update_time, is_deleted)
values (#{userName}, #{nickName}, #{email}, #{phone}, #{password}, #{sex}, #{avatar}, #{status}, #{introduce},
#{extJson}, #{createdBy}, #{createdTime}, #{updateBy}, #{updateTime}, #{isDeleted})
</insert>
```

## 5. 如何优雅的关闭线程池















