#Ape-frame即学即用脚手架

##WebSocket的引入

> 什么是WebSocket，他有什么用处？
>
> 参考https://blog.csdn.net/zengliguang/article/details/137635579

**说明：**只要使用WebSocket，就需要创建一个WebSocketConfig配置类，这样就可以自动启动一个WebSocket服务！

```java
package com.york.websocket.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
 * @author York
 * @className WebSocketConfig
 * @date 2024/7/30
 * @description
 */
@Configuration
public class WebSocketConfig {

    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

}
```

==WebSocketCheckConfig鉴权配置类==

**说明：**业务场景中可能不能什么用户都可以进行访问WebSocket，所以需要进行鉴权和配置相关信息的功能！

```java
package com.york.websocket.config;

import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;
import java.util.List;
import java.util.Map;

/**
 * @author York
 * @className WebSocketCheckConfig
 * @date 2024/7/30
 * @description
 */
@Component
// 鉴权拦截使用ServerEndpointConfig.Configurator
public class WebSocketCheckConfig extends ServerEndpointConfig.Configurator {

    /**
     * 重写checkOrigin进行鉴权
     */
    @Override
    public boolean checkOrigin(String originHeaderValue) {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = servletRequestAttributes.getRequest();
        // 校验逻辑
//        request.xxx()
        return true;
    }

    /**
     * 重写modifyHandshake提供可以通过HandshakeRequest的形式拿到WebSocket连接情况
     */
    @Override
    public void modifyHandshake(ServerEndpointConfig sec, HandshakeRequest request, HandshakeResponse response) {
        // 获取WebSocket的所有请求参数
        Map<String, List<String>> parameterMap = request.getParameterMap();
        // 获取erp相关的参数信息
        List<String> erpList = parameterMap.getOrDefault("erp", null);
        if (!CollectionUtils.isEmpty(erpList)) {
            // 使用ServerEndpointConfig来进行相应的参数传递(此处将erp相关参数信息作为用户参数传递)
            sec.getUserProperties().put("erp", erpList.get(0));
        }
    }

}

```

测试如下

```java
package com.york.user.websocket;

import com.york.websocket.config.WebSocketCheckConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
// 设置WebSocket路径，配置创建的WebSocketCheckConfig鉴权配置类
@ServerEndpoint(value = "/sys/socket", configurator = WebSocketCheckConfig.class)
@Component
public class SysWebSocket {

    /**
     * 记录当前在线连接数
     */
    private static AtomicInteger onlineCount = new AtomicInteger(0);

    /**
     * 存放所有在线的客户端
     */
    private static Map<String, SysWebSocket> clients = new ConcurrentHashMap<>();

    /**
     * 与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    private Session session;

    /**
     * 当前会话的唯一标识key
     */
    private String erp = "";

    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, EndpointConfig conf) throws IOException {
        //获取用户信息
        try {
            // 获取用户配置
            Map<String, Object> userProperties = conf.getUserProperties();
            // 从用户配置中获取"erp"的用户内容
            String erp = (String) userProperties.get("erp");
            this.erp = erp;
            this.session = session;
            // 如果在线的客户端中存在这个用户，则先关闭下线
            if (clients.containsKey(this.erp)) {
                clients.get(this.erp).session.close();
                clients.remove(this.erp);
                onlineCount.decrementAndGet();
            }
            // 将当前用户再连接上去
            clients.put(this.erp, this);
            onlineCount.incrementAndGet();
            log.info("有新连接加入：{}，当前在线人数为：{}", erp, onlineCount.get());
            sendMessage("连接成功", this.session);
        } catch (Exception e) {
            log.error("建立链接错误{}", e.getMessage(), e);
        }
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        try {
            if (clients.containsKey(erp)) {
                clients.get(erp).session.close();
                clients.remove(erp);
                onlineCount.decrementAndGet();
            }
            log.info("有一连接关闭：{}，当前在线人数为：{}", this.erp, onlineCount.get());
        } catch (Exception e) {
            log.error("连接关闭错误，错误原因{}", e.getMessage(), e);
        }
    }

    /**
     * 收到客户端消息后调用的方法
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        log.info("服务端收到客户端[{}]的消息:{}", this.erp, message);
        // 模拟心跳机制：
        //    前端可以通过setInterval定时任务每个15秒钟调用一次reconnect函数
        //    reconnect会通过socket.readyState来判断这个websocket连接是否正常
        //    如果不正常就会触发定时连接，每15s钟重试一次，直到连接成功
        if (message.equals("ping")) {
            this.sendMessage("pong", session);
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        log.error("Socket:{},发生错误,错误原因{}", erp, error.getMessage(), error);
        try {
            session.close();
        } catch (Exception e) {
            log.error("onError.Exception{}", e.getMessage(), e);
        }
    }

    /**
     * 指定发送消息
     */
    public void sendMessage(String message, Session session) {
        log.info("服务端给客户端[{}]发送消息：{}", this.erp, message);
        try {
            session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            log.error("{}发送消息发生异常，异常原因{}", this.erp, message);
        }
    }

    /**
     * 群发消息
     */
    public void sendMessage(String message) {
        for (Map.Entry<String, SysWebSocket> sessionEntry : clients.entrySet()) {
            String erp = sessionEntry.getKey();
            SysWebSocket socket = sessionEntry.getValue();
            Session session = socket.session;
            log.info("服务端给客户端[{}]发送消息{}", erp, message);
            try {
                session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                log.error("{}发送消息发生异常，异常原因{}", this.erp, message);
            }
        }
    }

}
```

![](./../%E9%B8%A1%E7%BF%85Club%E9%A1%B9%E7%9B%AE/1%E4%B8%80%E6%9C%9F/%E7%9F%A5%E8%AF%86/websocket.jpg)

![](./../%E9%B8%A1%E7%BF%85Club%E9%A1%B9%E7%9B%AE/1%E4%B8%80%E6%9C%9F/%E7%9F%A5%E8%AF%86/websocket%E7%9A%84%E5%90%8E%E7%AB%AF%E5%93%8D%E5%BA%94.jpg)