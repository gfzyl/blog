# 实现Redis通过lua脚本对compareAndSwap(即cas)的操作

> 参考：https://juejin.cn/post/7339741848079466534
>
> 场景：Redis 执行 Lua能保证原子性
>
> Lua 本身并没有提供对于原子性的直接支持，它只是一种脚本语言，通常是嵌入到其他宿主程序中运行，比如 Redis。
>
> 在 Redis中执行 Lua的原子性是指：整个 Lua脚本在执行期间，会被当作一个整体，不会被其他客户端的命令打断

而cas也就是compareAndSwap，什么意思呢？

希望用这种操作首先比较oldValue是否是你以为的oldValue，比较成功才会设定newValue。通俗来说就是，执行前先看看现在的值是不是你之前得到的或者你认为现在应该是多少的
**旧值**，比较成功，才允许你设定为 **新值**，否则不允许。

```lua
local key = KEYS[1]
local oldValue = ARGV[1]
local newValue = ARGV[2]

local redisValue = redis.call('get', key)
if (redisValue == false or tonumber(redisValue) == tonumber(oldValue))
then
    redis.call('set', key, newValue)
    return true
else
    return false
end
```

以上就是一个简单的lua脚本，他的意思就是先取出来redis中当前key对应的value，和oldValue比较相同才允许set成newValue

```java
package com.york.redis.util;

import com.alibaba.fastjson.JSON;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.scripting.support.ResourceScriptSource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * 封装Redis的底层操作，直接用Util去操作，做一个解耦
 */
@Component
public class RedisUtil {


    @Resource
    private RedisTemplate redisTemplate;

    private static final String CACHE_KEY_SEPARATOR = ".";

    private DefaultRedisScript<Boolean> casScript;

    @PostConstruct
    public void init() {
        casScript = new DefaultRedisScript<>();
        casScript.setResultType(Boolean.class);
        casScript.setScriptSource(new ResourceScriptSource(new ClassPathResource("compareAndSet.lua")));
        System.out.println(JSON.toJSON(casScript));
    }

    public Boolean compareAndSet(String key, Long oldValue, Long newValue) {
        List<String> keys = new ArrayList();
        keys.add(key);
        return (Boolean) redisTemplate.execute(casScript, keys, oldValue, newValue);
    }

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

上面的代码主要看Boolean compareAndSet(String key, Long oldValue, Long newValue)

```java
@Test
public void testCompareAndSet() throws Exception {
    Boolean result = redisUtil.compareAndSet("luaCas", 2L, 3L);
    log.info("RedisUtilTest.testCompareAndSet.result:{}", result);
}
```

这里我们准备了一个测试环境，意图是看看key=luaCas对应的key，原来的值如果是2的话，就改成3，否则这次操作是失败的。

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/lua%E8%84%9A%E6%9C%AC%E6%89%A7%E8%A1%8C%E5%89%8D.jpg)

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/lua%E8%84%9A%E6%9C%AC%E6%89%A7%E8%A1%8C%E5%90%8E.jpg)

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/lua%E8%84%9A%E6%9C%AC%E6%89%A7%E8%A1%8C%E5%90%8Eredis%E7%9A%84%E5%8F%98%E5%8C%96.jpg)

可以看到我们的操作确实是成功的

现在再次执行的话，执行会失败，原因是redis中当前存储的是3而不是2

![](https://york-blog-1327009977.cos.ap-nanjing.myqcloud.com//APE-FRAME%E8%84%9A%E6%89%8B%E6%9E%B6%E9%A1%B9%E7%9B%AE/lua%E8%84%9A%E6%9C%AC%E6%89%A7%E8%A1%8C%E5%90%8E%EF%BC%88%E6%AD%A3%E5%B8%B8%EF%BC%89.jpg)

这样一来我们Redis用lua脚本的就实现啦