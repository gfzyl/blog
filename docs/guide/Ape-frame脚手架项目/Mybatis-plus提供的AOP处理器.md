#Ape-frame即学即用脚手架

## Mybatis-Plus提供的基于AOP的处理器

> 应用场景：![](./../%E9%B8%A1%E7%BF%85Club%E9%A1%B9%E7%9B%AE/1%E4%B8%80%E6%9C%9F/%E7%9F%A5%E8%AF%86/%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF.jpg)
>
> 如上表所示的create_by\create_time\update_time\update_by，这一类字段的设置，主要应用在insert和update两个时候，倘若很多表的字段都有这些属性，那么重复的代码就太多了，用AOP切面编程的思想，Mybatis-Plus为我们提供了handler，实现其方法即可

首先在对应的Po上面设置相应的属性：，类似下面的代码

```java
package com.york.user.entity.po;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.util.Date;

/**
 * UerPo
 */
@TableName("user")
@Data
public class UserPo {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String name;

    private Integer age;

    @TableField(value = "create_by", fill = FieldFill.INSERT)
    private String createBy;

    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(value = "update_by", fill = FieldFill.UPDATE)
    private String updateBy;

    @TableField(value = "update_time", fill = FieldFill.UPDATE)
    private Date updateTime;

    @TableField(value = "delete_flag", fill = FieldFill.INSERT)
    private Integer deleteFlag;

    /**
     * 便于使用mybatis提供的乐观锁
     */
    @TableField(value = "version", fill = FieldFill.INSERT)
    private Integer version;
}
```

然后配置一个处理器，在insert和update的时候触发

```java
package com.york.handler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * 拦截器，插入和修改字段的时候AOP
 */
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        this.strictInsertFill(metaObject, "createBy", String.class, "York");
        this.strictInsertFill(metaObject, "createTime", Date.class, new Date());
        this.strictInsertFill(metaObject, "deleteFlag", Integer.class, 0);
        this.strictInsertFill(metaObject, "version", Integer.class, 0);

    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.strictUpdateFill(metaObject, "updateBy", String.class, "York");
        this.strictUpdateFill(metaObject, "updateTime",  Date.class, new Date());
    }
}
```

### 为了更好的显示sql日志对于Mybatis专门的日志信息设置

可以将日志中的???转变为实际数据

1. 配置如下的拦截器

```java
package com.york.interceptor;

import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.defaults.DefaultSqlSession.StrictMap;

import java.lang.reflect.Field;
import java.sql.Statement;
import java.util.*;

@Intercepts(value = {

        @Signature(args = {Statement.class, ResultHandler.class}, method = "query", type = StatementHandler.class),
        @Signature(args = {Statement.class}, method = "update", type = StatementHandler.class),
        @Signature(args = {Statement.class}, method = "batch", type = StatementHandler.class)})
public class SqlBeautyInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {

        Object target = invocation.getTarget();
        long startTime = System.currentTimeMillis();
        StatementHandler statementHandler = (StatementHandler) target;
        try {
            return invocation.proceed();
        } finally {

            long endTime = System.currentTimeMillis();
            long sqlCost = endTime - startTime;
            BoundSql boundSql = statementHandler.getBoundSql();
            String sql = boundSql.getSql();
            Object parameterObject = boundSql.getParameterObject();
            List<ParameterMapping> parameterMappingList = boundSql.getParameterMappings();
            sql = formatSql(sql, parameterObject, parameterMappingList);
            System.out.println("SQL： [ " + sql + " ]执行耗时[ " + sqlCost + "ms ]");

        }

    }

    @Override
    public Object plugin(Object o) {
        return Plugin.wrap(o, this);
    }

    @Override
    public void setProperties(Properties properties) {
    }

    private String formatSql(String sql, Object parameterObject, List<ParameterMapping> parameterMappingList) {

        if (sql == "" || sql.length() == 0) {
            return "";
        }

        sql = beautifySql(sql);
        if (parameterObject == null || parameterMappingList == null || parameterMappingList.size() == 0) {
            return sql;
        }

        String sqlWithoutReplacePlaceholder = sql;

        try {
            if (parameterMappingList != null) {
                Class<?> parameterObjectClass = parameterObject.getClass();
                if (isStrictMap(parameterObjectClass)) {
                    StrictMap<Collection<?>> strictMap = (StrictMap<Collection<?>>) parameterObject;
                    if (isList(strictMap.get("list").getClass())) {
                        sql = handleListParameter(sql, strictMap.get("list"));
                    }

                } else if (isMap(parameterObjectClass)) {
                    Map<?, ?> paramMap = (Map<?, ?>) parameterObject;
                    sql = handleMapParameter(sql, paramMap, parameterMappingList);
                } else {
                    sql = handleCommonParameter(sql, parameterMappingList, parameterObjectClass, parameterObject);
                }

            }

        } catch (Exception e) {
            return sqlWithoutReplacePlaceholder;
        }
        return sql;
    }

    private String handleCommonParameter(String sql, List<ParameterMapping> parameterMappingList,

                                         Class<?> parameterObjectClass, Object parameterObject) throws Exception {

        Class<?> originalParameterObjectClass = parameterObjectClass;
        List<Field> allFieldList = new ArrayList<>();
        while (parameterObjectClass != null) {
            allFieldList.addAll(new ArrayList<>(Arrays.asList(parameterObjectClass.getDeclaredFields())));
            parameterObjectClass = parameterObjectClass.getSuperclass();
        }

        Field[] fields = new Field[allFieldList.size()];
        fields = allFieldList.toArray(fields);
        parameterObjectClass = originalParameterObjectClass;
        for (ParameterMapping parameterMapping : parameterMappingList) {
            String propertyValue = null;
            if (isPrimitiveOrPrimitiveWrapper(parameterObjectClass)) {
                propertyValue = parameterObject.toString();
            } else {
                String propertyName = parameterMapping.getProperty();
                Field field = null;
                for (Field everyField : fields) {
                    if (everyField.getName().equals(propertyName)) {
                        field = everyField;
                    }

                }

                field.setAccessible(true);
                propertyValue = String.valueOf(field.get(parameterObject));
                if (parameterMapping.getJavaType().isAssignableFrom(String.class)) {
                    propertyValue = "\"" + propertyValue + "\"";
                }
            }
            sql = sql.replaceFirst("\\?", propertyValue);

        }

        return sql;

    }

    private String handleMapParameter(String sql, Map<?, ?> paramMap, List<ParameterMapping> parameterMappingList) {

        for (ParameterMapping parameterMapping : parameterMappingList) {
            Object propertyName = parameterMapping.getProperty();
            Object propertyValue = paramMap.get(propertyName);

            if (propertyValue != null) {
                if (propertyValue.getClass().isAssignableFrom(String.class)) {
                    propertyValue = "\"" + propertyValue + "\"";
                }
                sql = sql.replaceFirst("\\?", propertyValue.toString());
            }

        }
        return sql;
    }

    private String handleListParameter(String sql, Collection<?> col) {

        if (col != null && col.size() != 0) {
            for (Object obj : col) {
                String value = null;
                Class<?> objClass = obj.getClass();

                if (isPrimitiveOrPrimitiveWrapper(objClass)) {
                    value = obj.toString();
                } else if (objClass.isAssignableFrom(String.class)) {
                    value = "\"" + obj.toString() + "\"";
                }
                sql = sql.replaceFirst("\\?", value);
            }

        }

        return sql;

    }

    private String beautifySql(String sql) {
        sql = sql.replaceAll("[\\s\n ]+", " ");
        return sql;

    }

    private boolean isPrimitiveOrPrimitiveWrapper(Class<?> parameterObjectClass) {

        return parameterObjectClass.isPrimitive() || (parameterObjectClass.isAssignableFrom(Byte.class)

                || parameterObjectClass.isAssignableFrom(Short.class)
                || parameterObjectClass.isAssignableFrom(Integer.class)
                || parameterObjectClass.isAssignableFrom(Long.class)
                || parameterObjectClass.isAssignableFrom(Double.class)
                || parameterObjectClass.isAssignableFrom(Float.class)
                || parameterObjectClass.isAssignableFrom(Character.class)
                || parameterObjectClass.isAssignableFrom(Boolean.class));
    }

    /**
     * 是否DefaultSqlSession的内部类StrictMap
     */

    private boolean isStrictMap(Class<?> parameterObjectClass) {
        return parameterObjectClass.isAssignableFrom(StrictMap.class);
    }

    /**
     * 是否List的实现类
     */

    private boolean isList(Class<?> clazz) {

        Class<?>[] interfaceClasses = clazz.getInterfaces();
        for (Class<?> interfaceClass : interfaceClasses) {
            if (interfaceClass.isAssignableFrom(List.class)) {
                return true;
            }

        }
        return false;
    }

    /**
     * 是否Map的实现类
     */

    private boolean isMap(Class<?> parameterObjectClass) {

        Class<?>[] interfaceClasses = parameterObjectClass.getInterfaces();

        for (Class<?> interfaceClass : interfaceClasses) {
            if (interfaceClass.isAssignableFrom(Map.class)) {
                return true;
            }
        }
        return false;
    }

}
```

2. 配置如下的config

```java
package com.york.config;

import com.york.handler.interceptor.SqlBeautyInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MybatisConfiguration {

    @Bean
    public SqlBeautyInterceptor sqlBeautyInterceptor() {
        return new SqlBeautyInterceptor();
    }
}

```

==**执行效果如下**==

```
SQL： [ INSERT INTO user ( name, age, create_by, create_time, delete_flag, version ) VALUES ( "灵魂汁子", 18, "York", Mon Jul 29 10:11:20 CST 2024, 0, 0 ) ]执行耗时[ 2ms ]
```

### 但是以上配置我们要做成一个自动装配的优化

> 也就是说，我们要做成如果用户希望使用这样的配置的时候才生效

```java
@Configuration
public class MybatisConfiguration {

    @Bean
    // 这个配置就是说是否要注入这个bean，取决于是否配置了"sql.beauty.show"
    // 其默认值"havingValue"是true，然后匹配不到也是true，所以默认情况是打开的
    @ConditionalOnProperty(name = {"sql.beauty.show"}, havingValue = "true", matchIfMissing = true)
    public SqlBeautyInterceptor sqlBeautyInterceptor() {
        return new SqlBeautyInterceptor();
    }
}
```

关键就在于这里的==**@ConditionOnProperty**==，它决定了该配置类是否注入容器

这样就可以看我们在yml中配置sql.beauty.show是否是开启的，从而是否打开上面的日志配置