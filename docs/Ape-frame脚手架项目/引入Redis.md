# 引入Redis

首先安装启动Redis（需要配置文件，密码什么的可选设定，端口）

## 未做Jackson序列化配置时引出的乱码问题

当然了，自己用命令行的方式自己和自己不会出现乱码，因为用命令行的方式不存在一个序列化的问题，远程使用的时候才存在

默认情况下RedisTemplate用的是默认的jdk形式的序列化，这个不好用，出现了如下的乱码问题

而且其实关于序列化，参考https://blog.csdn.net/ShuSheng0007/article/details/132052331

和https://www.jb51.net/program/291992e91.htm

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com/APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/Redis%E6%9C%AA%E5%81%9AJackson%E5%BA%8F%E5%88%97%E5%8C%96%E6%97%B6%E5%BC%95%E5%87%BA%E7%9A%84%E4%B9%B1%E7%A0%81%E9%97%AE%E9%A2%98.jpg)

总的来说，**key** 或者 **hashKey** 本来就是字符串，用 **String** 的序列化器即可，而 **value** 或者 **hashValue**
的话很多是对象，需要用到 **JSON**  序列化方式，之所以乱码是因为 **原生JDK的序列化方式**
弄出来的结果是如上图一样的人类不可读的东西，所以为了可读性我们要配置一下序列化方式

需要引入如下依赖 `jackson-annotations` 和 `jackson-databind`

```xml

<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.8.5</version>
</dependency>
<dependency>
<groupId>com.fasterxml.jackson.core</groupId>
<artifactId>jackson-databind</artifactId>
<version>2.11.4</version>
</dependency>
```

然后做如下配置

```java
package com.york.redis.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        redisTemplate.setKeySerializer(redisSerializer);
        redisTemplate.setHashKeySerializer(redisSerializer);
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer());
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer());
        return redisTemplate;
    }

    /**
     * 使用Jackson来进行Value的序列化
     */
    private Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer() {
        Jackson2JsonRedisSerializer<Object> jsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // 找不到属性不报错，规避报错
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        jsonRedisSerializer.setObjectMapper(objectMapper);
        return jsonRedisSerializer;
    }

}
```

做如上配置即可

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/redis%E4%B9%B1%E7%A0%81%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3.jpg)

## 封装RedisUtil

将RedisTemplate对Redis的操作封装成RedisUtil，在这里可以根据自己情况对其他的操作进行封装

```java
package com.york.redis.util;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * RedisUtil工具类
 */
@Component
@Slf4j
public class RedisUtil {

    private static final String CACHE_KEY_SEPARATOR = ".";
    
    @Resource
    private RedisTemplate redisTemplate;

    /**
     * 构建缓存key
     */
    public String buildKey(String... strObjs) {
        return Stream.of(strObjs).collect(Collectors.joining(CACHE_KEY_SEPARATOR));
    }

    /**
     * 是否存在key
     */
    public boolean exist(String key) {
        return redisTemplate.hasKey(key);
    }

    /**
     * 删除key
     */
    public boolean del(String key) {
        return redisTemplate.delete(key);
    }

    public void set(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public boolean setNx(String key, String value, Long time, TimeUnit timeUnit) {
        return redisTemplate.opsForValue().setIfAbsent(key, value, time, timeUnit);
    }

    public String get(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    public Boolean zAdd(String key, String value, Long score) {
        return redisTemplate.opsForZSet().add(key, value, Double.valueOf(String.valueOf(score)));
    }

    public Long countZset(String key) {
        return redisTemplate.opsForZSet().size(key);
    }

    public Set<String> rangeZset(String key, long start, long end) {
        return redisTemplate.opsForZSet().range(key, start, end);
    }

    public Long removeZset(String key, Object value) {
        return redisTemplate.opsForZSet().remove(key, value);
    }

    public void removeZsetList(String key, Set<String> value) {
        value.stream().forEach((val) -> redisTemplate.opsForZSet().remove(key, val));
    }

    public Double score(String key, Object value) {
        return redisTemplate.opsForZSet().score(key, value);
    }

    public Set<String> rangeByScore(String key, long start, long end) {
        return redisTemplate.opsForZSet().rangeByScore(key, Double.valueOf(String.valueOf(start)), Double.valueOf(String.valueOf(end)));
    }

    public Object addScore(String key, Object obj, double score) {
        return redisTemplate.opsForZSet().incrementScore(key, obj, score);
    }

    public Object rank(String key, Object obj) {
        return redisTemplate.opsForZSet().rank(key, obj);
    }

}
```

## 缓存预热

::: tip 缓存预热场景需求

很多时候我们需要在服务 **启动** 的时候，在缓存中先预热一些数据，这就是缓存预热

防止服务刚刚启动的时候大批请求突然发送导致数据库请求过大

:::

1. 首先定义一个抽象类，给子类提供模板，继承即可在initCache中选择预热要加入的数据

   ```java
   package com.york.redis.init;
   
   import org.springframework.stereotype.Component;
   
   /**
    * 定义抽象类AbstractCache，给子类提供模板
    * 子类只需要实现即可
    */
   @Component
   public abstract class AbstractCache {
   
       public abstract void initCache();
   
       public abstract <T> T getCache();
   
       public abstract void clearCache();
   
       public void reloadCache() {
           clearCache();
           initCache();
       }
   }
   ```

   这里举例一个继承了该抽象类的类

   ```java
   package com.york.user.cache;
   
   import com.york.redis.init.AbstractCache;
   import com.york.redis.util.RedisUtil;
   import org.springframework.data.redis.core.RedisTemplate;
   import org.springframework.stereotype.Component;
   
   import javax.annotation.Resource;
   
   /**
    * 实现缓存预热，在initCache中设置的数据即为缓存预热的数据
    */
   @Component
   public class SysUserCache extends AbstractCache {
   
       private static final String SYS_USER_CACHE_KEY = "SYS_USER";
   
       @Resource
       private RedisTemplate redisTemplate;
   
       @Resource
       private RedisUtil redisUtil;
   
       /**
        * 初始化，预热数据
        */
       @Override
       public void initCache() {
           // 和数据库做联动，或者和其他数据来源做联动
           redisUtil.set(SYS_USER_CACHE_KEY, "York");
       }
   
       @Override
       public <T> T getCache() {
           if (!redisTemplate.hasKey(SYS_USER_CACHE_KEY).booleanValue()) {
               reloadCache();
           }
           return (T) redisTemplate.opsForValue().get(SYS_USER_CACHE_KEY);
       }
   
       @Override
       public void clearCache() {
           redisTemplate.delete(SYS_USER_CACHE_KEY);
       }
   }
   ```

   按照这种逻辑，对应于SysUser就可以启动时预热一个数据，即`"SYS_USER":"York"`，其他类可以仿照, 当然要预热的数据也是按照自己的需求去做


2. 我们已经配置好了上面的预热数据，那么最重要的 **initCache()** 由谁来调用呢？

   这就是最关键的点，首先引出了 **接口CommandLineRunner**，实现该接口的 **run** 方法，就可以在项目启动时运行run方法中的代码，所以其实预热就是在项目启动时将上面
   **initCache()** 在这里调用

   ```java
   import org.springframework.boot.CommandLineRunner;
   import java.util.Map;
   import java.util.Map.Entry;
   
   @Component
   public class InitCache implements CommandLineRunner {
   
       /**
        * 项目启动时候会直接运行run中内容
        */
       @Override
       public void run(String... args) throws Exception {
           System.out.println("缓存成功...");
       }
   }
   ```

::: warning 问题引出

有傻瓜式的运行方式，即只要有一个继承了AbstractCache的类就主动的new一个该对象然后在这里调用，但是这样就很蠢，有一种更高效更自动的方式

:::

   ```java
   @SpringBootApplication
   @MapperScan(value = "com.york.*.mapper")
   @ComponentScan(value = "com.york")
   public class UserApplication {
       public static void main(String[] args) {
           ApplicationContext aoc = SpringApplication.run(UserApplication.class);
       }
   }
   ```

首先，看这里的 **ApplicationContext** 就知道了，这是熟悉的Spring容器，里面注入了各种bean

如果我们把继承了 **AbstractCache** 的类都 **注入到容器中**，然后从容器中取出来这些对象，统一的调用他们的 *initCache()*
，这样如果我们再继承AbstractCache，就全可以取出来并执行initCache()方法

::: tip 实现机制

当一个类实现了ApplicationContextAware接口之后,

这个类就可以方便的获得ApplicationContext对象（Spring上下文）,

Spring发现某个Bean实现了 **ApplicationContextAware** 接口,

Spring容器会在创建该Bean之后，自动调用该Bean的 **setApplicationContext**（参数）方法,

调用该方法时，会将容器本身ApplicationContext对象作为参数传递给该方法,

因此 **applicationContext** 中就存有了初始化的容器中注入的所有对象

:::

   ```java
   package com.york.redis.util;
   
   import org.springframework.beans.BeansException;
   import org.springframework.context.ApplicationContext;
   import org.springframework.context.ApplicationContextAware;
   import org.springframework.stereotype.Component;
   
   @Component
   public class SpringContextUtil implements ApplicationContextAware {
   
       private static ApplicationContext applicationContext;
   
       public static ApplicationContext getApplicationContext() {
           return applicationContext;
       }
   
       // 自动调用, 因此该bean创建之后就可以拿到容器对象applicationContext
       @Override
       public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
           this.applicationContext = applicationContext;
       }
   
       /**
        * 从容器中获得对应类型的bean
        *
        * @param type Class类
        * @return 对应类型的实例对象
        */
       public static Object getBean(Class type) {
           return applicationContext.getBean(type);
       }
   }
   ```

注释已经很详细了，就是这个bean是在容器注入完以后，自动调用 **setApplicationContext** 将 **applicationContext** 设置为容器对象，这样
*applicationContext* 就是我们的容器

### 最后的 *InitCache* 实现方式

**通过逐一获取容器中继承了 AbstractCache 的 bean, 遍历调用 initCache 方法**

   ```java
   package com.york.redis.init;
   
   import com.york.redis.util.SpringContextUtil;
   import org.springframework.boot.CommandLineRunner;
   import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
   import org.springframework.context.ApplicationContext;
   import org.springframework.stereotype.Component;
   
   import java.util.Map;
   import java.util.Map.Entry;
   
   /**
    * 在使用SpringBoot构建项目时，我们通常有一些预先数据的加载。
    * SpringBoot提供了CommandLineRunner方式来实现
    * CommandLineRunner是一个接口，需要时实现即可
    * （如果存在多个加载的数据，我们也可以使用@Order注解来排序）
    */
   @Component
   @ConditionalOnProperty(name = {"init.cache.enable"}, havingValue = "true")
   public class InitCache implements CommandLineRunner {
   
       /**
        * 项目启动时候会直接运行run中内容
        */
       @Override
       public void run(String... args) throws Exception {
           // 需要知道哪些缓存需要进行预热
           ApplicationContext applicationContext = SpringContextUtil.getApplicationContext();
           // 获得继承了AbstractCache的所有类对象
           Map<String, AbstractCache> beanMap = applicationContext.getBeansOfType(AbstractCache.class);
           // 调用其init方法
           if (!beanMap.isEmpty()) {
               for (Entry<String, AbstractCache> entry : beanMap.entrySet()) {
                   // 获取AbstractCache的子类(实现缓存方法的类)，并调用其initCache()方法
                   AbstractCache abstractCache = 
                       (AbstractCache)SpringContextUtil.getBean(entry.getValue().getClass());
                   abstractCache.initCache();
               }
           }
           System.out.println("缓存成功...");
       }
   }
   ```

所以最后的我们的配置就是这样的，而且还`"init.cache.enable"`优化了这个配置，默认打开了缓存预热，只要想对不同对象进行缓存预热，就继承AbstractCache

   ```java
   # 自定义的redis预热启动
   init:
     cache:
       enable: true
   ```

## 分布式锁

::: tip 说明

**说明**：为了脚手架的的实现，此处不使用 **Redission** 来直接实现，完全手动实现一个抢占式的分布式锁

Redisson 是一个功能强大的 Redis 客户端库，它将 Redis
的基本功能扩展为一个全面的分布式工具包，适用于构建高可用、高性能的分布式应用程序。如果你的应用需要分布式锁、分布式集合、分布式缓存或其他高级分布式功能，Redisson
是一个非常好的选择。

:::

### 使用场景

1）任务调度（集群环境下，一个服务的多个实例的任务不想同一时间都进行执行）

2）并发修改相关（操作同一个数据）

### 配置过程

封装一个异常类

```java
package com.york.redis.exception;

/**
 * @author York
 * @className ShareLockException
 * @description ShareLockException分布式锁异常
 */
public class ShareLockException extends RuntimeException {
    public ShareLockException(String message){
        super(message);
    }
}

```

然后写一个 **RedisShareLockUtil**，核心原理就是用redis的 *setnx* 是一个 **原子性**
的操作，如果key存在就会失败，只有key不存在才行，因此用setnx的方法就是获取锁的方法

```java
package com.york.redis.util;

/**
 * @author York
 * @className RedisShareLockUtil
 * @description Redis分布式抢占锁RedisShareLockUtil
 */
import com.york.redis.exception.ShareLockException;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

@Component
public class RedisShareLockUtil {
    @Resource
    private RedisUtil redisUtil;

    private static final Long TIME_OUT = 1000L;

    /**
     * 加锁方法
     */
    public boolean lock(String lockKey, String requestId, Long time) {
        if (StringUtils.isBlank(lockKey) || StringUtils.isBlank(requestId) || time <= 0) {
            throw new ShareLockException("分布式锁-加锁参数异常");
        }
        long currentTime = System.currentTimeMillis();
        long outTime = currentTime + TIME_OUT;
        boolean result = false;
        // 加旋的方式，如果暂时拿不到就等一会儿再拿
        while (currentTime < outTime) {
            // 用setNx其实是获得锁的方法
            result = redisUtil.setNx(lockKey, requestId, time, TimeUnit.MILLISECONDS);
            if (result) {
                return result;
            }
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            currentTime = System.currentTimeMillis();
        }
        return result;
    }

    /**
     * 解锁方法, 利用setnx的key先获得值, 然后把这对键值对删掉即可
     */
    public boolean unLock(String key, String requestId) {
        if (StringUtils.isBlank(key) || StringUtils.isBlank(requestId)) {
            throw new ShareLockException("分布式锁-解锁参数异常");
        }
        try {
            String value = redisUtil.get(key);
            if (requestId.equals(value)) {
                redisUtil.del(key);
                return true;
            }
        } catch (Exception e) {
            //补日志
        }
        return false;
    }

    /**
     * 尝试加锁方法, 就只setnx一次,成不成都拉倒
     */
    public boolean tryLock(String lockKey, String requestId, Long time) {
        if (StringUtils.isBlank(lockKey) || StringUtils.isBlank(requestId) || time <= 0) {
            throw new ShareLockException("分布式锁-尝试加锁参数异常");
        }
        return redisUtil.setNx(lockKey, requestId, time, TimeUnit.MILLISECONDS);
    }
}
```

## Spring注解缓存实现

> 首先说明：非常不推荐！

说明1：因为查询的时候，每次都走数据库会导致查询非常缓慢，所以Spring提供了一套缓存机制，在查询相同接口的时候会先查询缓存，再查询数据库，大大提高了接口响应速度！
说明2：Spring Boot会自动配置合适的CacheManager作为相关缓存的提供程序（此处配置了Redis的CacheManager），当你在配置类(
@Configuration)上使用@EnableCaching注解时，会触发一个后处理器(post processor )，它检查每个Spring
bean，查看是否已经存在注解对应的缓存；如果找到了，就会自动创建一个代理拦截方法调用，使用缓存的bean执行处理。
注意：**在实际工作中基本不使用Spring注解缓存，因为无法为每个缓存单独设置过期时间（除非为每个缓存进行单独的配置），很可能导致整个业务产生缓存雪崩现象的出现！
**

## Redis 实现延时队列

::: tip 说明

1. 前言

**说明**：我们有一个任务的情况下，我们会期望这个任务在某个时间点去执行，那么就要使用延时队列。一般延时队列可以使用
*RabbitMQ* 或者*RocketMQ* 来进行实现，另外一种常用的方式就是使用 *Redis* 来进行实现了！

**实现方案**：基于redis来进行实现，我们主要使用的是 **zset这个数据类型天生的具有score的特性**。

<u>zset可以根据score放入，而且可以通过range进行排序获取，以及删除指定的值</u>。从业务上，我们可以再新增任务的时候放入，再通过定时任务进行拉取，要
*注意的一点就是拉取的时候要有分布式锁，不要进行重复拉取，或者交由分布式任务调度来处理拉取，都是可以的*。

**使用场景：**我们更加偏向于 **定时群发，定时取消**
等。就举一个发博客的例子吧，博客我们可以选择定时发布，那么就可以应用redis的延迟队列来进行实现。<u>
要注意的一个点就是小心大key的产生，要做好延迟队列的key的隔离</u>。

2. 任务对延迟队列的推送方法和拉取的方法

**实现思路：**

**入队**：入队消息体一定要有时间的概念，<u>把时间转换为毫秒，来作为我们zset的score</u>；

底层就是zset的add方法，由key，value以及score来组成。

**出队：**<u>出队要基于rangeByScore来进行实现，指定我们的score的区间，也就是我们要拉取哪些的任务</u>
，拉取成功之后，我们先去执行业务逻辑，执行成功之后，我们再将其从消息队列进行删除。

:::

实现例子

```java
@Service
@Slf4j
public class MassMailTaskService {
    // 该MassMailTaskService类位于Redis中ZSet结构的key
    private static final String MASS_MAIL_TASK_KEY = "massMailTask";

    @Resource
    private RedisUtil redisUtil;

    public void pushMassMailTaskQueue(MassMailTask massMailTask) {
        Date startTime = massMailTask.getStartTime();
        if (startTime == null) {
            return;
        }
        if (startTime.compareTo(new Date()) <= 0) {
            return;
        }
        log.info("定时群发任务加入延时队列，massMailTask:{}", JSON.toJSON(massMailTask));
        // 使用ZSet数据结构 (key, value, score)
        redisUtil.zAdd(MASS_MAIL_TASK_KEY, massMailTask.getTaskId().toString(), startTime.getTime());
    }

    // 拉取下来的任务可能会很多
    public Set<Long> poolMassMailTaskQueue() {
        // 拉取key为"massMailTask"，时间从0到当前时间的任务
        Set<String> taskIdSet = redisUtil.rangeByScore(MASS_MAIL_TASK_KEY, 0, System.currentTimeMillis());
        log.info("获取延迟群发任务，taskIdSet：{}", JSON.toJSON(taskIdSet));
        if (CollectionUtils.isEmpty(taskIdSet)) {
            return Collections.emptySet();
        }
        redisUtil.removeZsetList(MASS_MAIL_TASK_KEY, taskIdSet);
        return taskIdSet.stream().map(n -> Long.parseLong(n)).collect(Collectors.toSet());
    }
}
```

