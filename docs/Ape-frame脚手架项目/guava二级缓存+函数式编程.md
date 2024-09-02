# guaua二级缓存+函数式编程

> 场景：当QPS突然非常大的时候，访问缓存很可能得不到会因为CPU突然处理不过来而导致拿不到redis缓存的数据，因此需要做本地的二级缓存

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
 * @date 2024/7/30
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

