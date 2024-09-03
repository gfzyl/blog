# Guava 二级缓存+函数式编程

::: tip 关于Guava

Guava 是 Google 开源的一个 Java 库，它包含了一些非常有用的工具类和集合库。其中，Guava 的本地缓存（Guava
Cache）是一个轻量级的内存缓存工具，提供了简单、灵活且高效的缓存实现。Guava
本地缓存主要用于在应用程序中缓存计算结果或数据，以提高性能并减少对外部数据源（如数据库、文件系统等）的访问次数。

**场景**：当QPS突然非常大的时候，访问缓存很可能得不到会因为CPU突然处理不过来而导致拿不到redis缓存的数据，因此需要做本地的二级缓存

**说明**：利用guava本地缓存和函数式编程来实现一个本地缓存。

**注意**：因为之前缓存使用Redis来做，如果当所有的缓存都存储在Redis中的时候，一旦网络不稳定导致未及时相应，所有请求都可能被阻塞，导致内存和CPU被打满，从而引起重大问题！

**Guava 本地缓存的主要特点**：

1. **基于内存的缓存**：

   Guava Cache 是一个纯内存缓存，它不涉及持久化。因此，缓存的数据存储在内存中，当 JVM 停止或内存不足时，缓存的数据会丢失。

2. **强类型缓存**：

   Guava Cache 是一个泛型类，支持缓存键值对，并可以指定缓存中键和值的类型。

3. **自动加载（LoadingCache）**：

   Guava 提供了 `LoadingCache` 接口，当缓存中没有找到指定的键时，可以自动加载数据。例如，你可以指定一个从数据库或计算中加载数据的回调方法，这样当请求的数据不在缓存中时，Guava
   会自动调用这个方法加载数据。

4. **过期策略**：

   Guava Cache 提供了多种过期策略，比如基于时间的过期（如固定时间的 TTL），基于访问或写入时间的过期等。

5. **缓存大小限制**：

   可以设置缓存的最大容量，当缓存达到这个容量时，Guava 会自动清理最近最少使用（LRU）的缓存条目。

6. **清理机制**：

   除了通过过期策略和大小限制自动清理，Guava Cache 还提供了手动清理的方法，以便在特定条件下手动清除缓存。

7. **统计信息**：

   Guava Cache 可以记录缓存的命中率、加载新值的时间和次数、缓存被驱逐的次数等统计信息，以便优化缓存的使用。

:::

```xml
<!--配置本地缓存所需要的依赖-->
<!-- guava -->
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>${guava.version}</version>
</dependency>
        <!-- fastjson -->
<dependency>
<groupId>com.alibaba</groupId>
<artifactId>fastjson</artifactId>
<version>${fastjson.version}</version>
</dependency>
```

就是封装一个CacheUtil，里面用到了函数式编程

非常的应该多去看看

```java
package com.york.redis.util;

import com.alibaba.fastjson.JSON;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

/**
 * @author York
 * @className CacheUtil
 * @description
 */
@Component
@Slf4j
public class CacheUtil<K, V> {
    // 意图从Nacos的配置文件中获取，流量大的时候开启本地缓存，流量小的时候关闭本地缓存
    @Value("${guava.cache.switch}")
    public Boolean switchCache;

    // 初始化一个guava的Cache
    private Cache<String, String> localCache = CacheBuilder.newBuilder()
            .maximumSize(5000)
            .expireAfterWrite(3, TimeUnit.SECONDS)
            .build();

    public Map<K, V> getResult(List<K> skuIdList, String cachePrefix,
                               Class<V> clazz, Function<List<K>, Map<K, V>> function) {
        if (CollectionUtils.isEmpty(skuIdList)) {
            return Collections.emptyMap();
        }
        Map<K, V> resultMap = new HashMap<>(16);

        // 1)本地缓存未开
        if (!switchCache) {
            // 从rpc接口查所有数据，返回结果集
            resultMap = function.apply(skuIdList);
            return resultMap;
        }
        // 2)默认开启本地缓存
        List<K> noCacheList = new ArrayList<>();
        // (2.1)查guava缓存
        for (K skuId : skuIdList) {
            String cacheKey = cachePrefix + "_" + skuId;
            String content = localCache.getIfPresent(cacheKey);
            if (StringUtils.isNotBlank(content)) {
                // 能查到的直接放进结果集中
                V v = JSON.parseObject(content, clazz);
                resultMap.put(skuId, v);
            } else {
                // 查不到的先放进noCacheList中，后面统一使用rpc查询
                noCacheList.add(skuId);
            }
        }
        // (2.2)如果没有查不到的，直接返回结果集
        if (CollectionUtils.isEmpty(noCacheList)) {
            return resultMap;
        }
        // (2.3)如果有查不到的，从rpc接口查guava中没有缓存的数据
        Map<K, V> noCacheResultMap = function.apply(noCacheList);
        
        // (2.4)如果rpc接口也没查到任何数据，直接返回结果集
        if (CollectionUtils.isEmpty(noCacheResultMap)) {
            return resultMap;
        }
        // (2.5)将从rpc中查出的结果，添加guava的本地缓存和结果集中
        for (Entry<K, V> entry : noCacheResultMap.entrySet()) {
            K skuId = entry.getKey();
            V content = entry.getValue();
            // 查询内容放进结果集
            resultMap.put(skuId, content);
            // 查询内容放进guava本地缓存
            String cacheKey = cachePrefix + "_" + skuId;
            localCache.put(cacheKey, JSON.toJSONString(content));
        }
        // (2.6)返回结果集
        return resultMap;
    }
}
```

