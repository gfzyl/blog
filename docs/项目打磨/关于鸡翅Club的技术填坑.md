# 关于鸡翅Club的技术填坑

::: warning 为什么

之前学的时候技术掌握的不行, 后来很多技术都有去学了一遍, 现在二刷填坑的感觉还是非常的棒啊

其实比如我的 `JUC` 现在就已经填坑啦, `Redis` 这块感觉还是需要再填坑一下

:::

## 1. `RedisUtil` 工具类

下面是封装好的 `RedisUtil` 工具类, 当时写的时候也没在意, 应该熟悉一下是怎么封装的, 具体作用是啥, 别只会用不知道啥含义

```java
/**
 * RedisUtil工具类
 */
@Component
@Slf4j
public class RedisUtil {

    @Resource
    private RedisTemplate redisTemplate;

    private static final String CACHE_KEY_SEPARATOR = ".";

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

    /**
     * set(不带过期)
     */
    public void set(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * set(带过期)
     */
    public boolean setNx(String key, String value, Long time, TimeUnit timeUnit) {
        return redisTemplate.opsForValue().setIfAbsent(key, value, time, timeUnit);
    }

    /**
     * 获取string类型缓存
     */
    public String get(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    /**
     * 在Zset中添加数据
     * @param key zset的键
     * @param value zset中加入的元素的值
     * @param score zset中加入的元素的分数
     * @return 是否添加成功
     */
    public Boolean zAdd(String key, String value, Long score) {
        return redisTemplate.opsForZSet().add(key, value, Double.valueOf(String.valueOf(score)));
    }

    /**
     * Zset的大小
     */
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

    public Set<ZSetOperations.TypedTuple<String>> rankWithScore(String key, long start, long end) {
        Set<ZSetOperations.TypedTuple<String>> set = redisTemplate.opsForZSet().reverseRangeWithScores(key, start, end);
        return set;
    }

    public void putHash(String key, String hashKey, Object hashVal) {
        redisTemplate.opsForHash().put(key, hashKey, hashVal);
    }

    public Integer getInt(String key) {
        return (Integer) redisTemplate.opsForValue().get(key);
    }

    public void increment(String key, Integer count) {
        redisTemplate.opsForValue().increment(key, count);
    }

    public Map<Object, Object> getHashAndDelete(String key) {
        Map<Object, Object> map = new HashMap<>();
        Cursor<Map.Entry<Object, Object>> cursor = redisTemplate.opsForHash().scan(key, ScanOptions.NONE);
        while (cursor.hasNext()) {
            Map.Entry<Object, Object> entry = cursor.next();
            Object hashKey = entry.getKey();
            Object value = entry.getValue();
            map.put(hashKey, value);
            redisTemplate.opsForHash().delete(key, hashKey);
        }
        return map;
    }
}
```

这里提供一个引用了上面的工具类的操作

```java
/**
* 根据用户名获取权限
*
* @param userName
* @return
*/
@Override
public List<String> getPermission(String userName) {
    // 创建一个key再获取
    String permissionKey = redisUtil.buildKey(authPermissionPrefix, userName);
    String permissionValue = redisUtil.get(permissionKey);
    if (StringUtils.isBlank(permissionValue)) {
        return Collections.emptyList();
    }
    List<AuthPermission> permissionList = new Gson().
        fromJson(permissionValue, new TypeToken<List<AuthPermission>>(){}.getType());
    return permissionList.stream()
        .map(AuthPermission::getPermissionKey)
        .collect(Collectors.toList());
}
```

