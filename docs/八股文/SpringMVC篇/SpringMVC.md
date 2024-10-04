# SpringMVC篇

::: tip SpringMVC篇口语回答

本篇记录了关于SpringMVC的口语话回答

:::

## 1. 什么是SpringMVC

Spring MVC 是 Spring 框架中的一个模块，用于构建基于 Web 的应用程序。它遵循 Model-View-Controller#(MVC)
设计模式，将业务逻辑、用户界面和数据分离，以促进代码的可维护性和可扩展性。

主要包含几个概念

模型(Model)：模型代表应用程序的数据和业务逻辑。它通常包含数据对象(如 POJO)和服务层(如 Spring 服务)
来处理业务逻辑。模型负责从数据库或其他数据源获取数据，并将数据传递给视图以显示给用户

视图(View)：视图负责展示数据，通常是 HTML 页面或其他类型的用户界面。Spring MVC
支持多种视图技术，包括JSP、Thymeleaf、FreeMarker等。视图从模型获取数据并将其呈现给用户

控制器(Controler)：控制器处理用户请求并决定将数据传递给哪个视图。它接收用户输入，调用模型进行处理，并选择合适的视图来显示结果。控制器通常使用
@Controller 注解来标识，并使用 @RequestMapping 注解来映射 URL 请求。

**Spring MVC 的工作流程**

1. 用户请求:用户通过浏览器发送 HTTP 请求到服务器。
2. 前端控制器(DispatcherServlet):Spring MVC的前端控制器 DispatcherServlet拦截所有请求并进行分发。
3. 处理器映射(Hander Mapping):根据请求URL，DispatcherServlet 查找相应的控制器
4. 控制器处理:控制器处理请求，调用服务层或数据访问层以获取数据，并将数据封装到模型中。
5. 视图解析器(View Resolver):控制器返回视图名称，DispatcherServlet 使用视图解析器将视图名称解析为实际的视图对象。
6. 视图渲染:视图对象负责将模型数据渲染为用户界面，通常是 HTML 页面
7. 响应返回:渲染后的视图返回给 DispatcherServlet，Dispatcherservlet 将最终的响应发送回用户浏览器。

**核心组件**

1. DispatcherServlet:前端控制器，负责接收并分发请求
2. Controller:处理用户请求，包含业务逻辑。
3. ModelAndView:包含模型数据和视图名称的对象。
4. View Resolver:将视图名称解析为实际的视图对象
5. Handler Mapping:根据请求 URL 查找相应的控制器。

## 2. SpringMVC的原理及执行流程？

**组件**

Spring MVC是一个基于Java的实现了MVC设计模式的请求驱动类型的轻量级Web框架，它大量使用了Spring框架中提供的设计模式。Spring
MVC框架的核心组件包括:

1. DispatcherServlet:前端控制器，负责接收请求并根据映射关系调用相应的控制器
2. HandlerMapping:负责根据请求的URL到HandlerMapping中找到映射的处理器(Controller)。
3. HandlerAdapter:负责根据处理器，生成处理器适配器，通过适配器调用实际的处理器。
4. Controller:处理器，执行相应的业务逻辑操作，并返回ModelAndView对象。
5. ModelAndView:包含了视图逻辑名和模型数据的对象，是连接控制器和视图的桥梁
6. ViewResolver:负责解析视图名到具体视图实现类的映射，根据视图名称找到对应的视图实现类。
7. View:视图，负责渲染数据并展示给用户

**执行流程**

Spring MVC 的执行流程大致可以分为以下几个步骤:

1. 发送请求到DispatcherServet:用户向服务器发送请求，请求被DispatcherServlet捕获。
2. 查找Handler: DispatcherServlet根据请求URL到HandlerMapping中查找映射的处理器(Controller)
3. 调用HandlerAdapter:DispatcherServlet根据处理器，到HandlerAdapter中找到对应的处理器适配器
4. 执行Controller:处理器适配器调用实际的处理器(Controller)执行业务逻辑操作，并返回ModelAndView对象。
5. 处理ModelAndView:DispatcherServlet根据ModelAndView中的视图名称，到ViewResolver中找到对应的视图实现类。
6. 渲染视图:视图实现类根据ModelAndView中的数据和视图模板渲染视图。
7. 返回响应到客户端:DispatcherServlet将渲染后的视图返回给客户端。

## 3. 什么是 DispatcherServlet？

DispatcherServlet 充当前端控制器(Front Controller)，负责接收所有进入的 HTTP 请求并将它们分派给适当的处理器进行处理。
DispatcherServlet 是实现 MVC 模式的关键部分，负责协调整个请求处理流程

**主要职责**

1. 请求接收和分派:拦截所有进入的 HTTP 请求并将它们分派给适当的控制器(Controler)。
2. 处理器映射:根据请求 URL，查找相应的处理器(通常是控制器方法)。
3. 视图解析:将控制器返回的视图名称解析为实际的视图对象。
4. 请求处理:调用处理器进行请求处理，并将处理结果封装到模型中
5. 视图渲染:将模型数据传递给视图对象进行染，并生成最终的响应。

**工作流程**

1. 初始化:
   在应用程序启动时，DispatcherServlet 被初始化。它加载 Spring 应用程序上下文，配置处理器映射、视图解析器等组件。
2. 接收请求:
   用户通过浏览器发送 HTTP 请求到服务器。 DispatcherServlet 拦截所有符合配置的 URL 模式的请求
3. 处理器映射:
   DispatcherServlet 使用处理器映射器(Handler Mapping)根据请求 URL 查找相应的处理器(Controller)。
4. 调用处理器:
   找到处理器后， DispatcherServlet 调用处理器的方法进行请求处理。处理器执行业务逻辑，通常会调用服务层或数据访问层获取数据，并将数据封装到模型中。
5. 视图解析:
   处理器处理完请求后，返回一个包含视图名称和模型数据的 `ModelAndView` 对象。DispatcherServlet使用视图解析器(View
   Resolver)将视图名称解析为实际的视图对象。

6. 视图渲染:
   视图对象负责将模型数据渲染为用户界面，通常是 HTML页面。
7. 响应返回:
   渲染后的视图返回给 DispatcherServlet，Dispatcherservlet 将最终的响应发送回用户浏览器

## 4. 什么是 Handler Mapping？

Handler Mapping 负责将 HTTP 请求映射到相应的处理器(通常是控制器方法)。当 DispatcherServlet 接收到一个请求时，它会使用
Handler Mapping 来确定哪个处理器应该处理这个请求。

**主要职责**

1. 请求映射:根据请求的 URL、HTTP 方法、请求参数等信息，查找并确定相应的处理器
2. 处理器返回:返回一个包含处理器对象和处理器拦截器链的 HandlerExecutionChain 对象。

**工作流程**

1. 请求到达 DispatcherServlet :当一个HTTP请求到达 DispatcherServlet 时，它会首先交给 Handler Mapping 进行处理,
2. 查找处理器:Handler Mapping根据请求的 URL、HTTP 方法等信息查找匹配的处理器
3. 返回处理器返回一个 HandlerExecutionChain 对象，其中包含处理器(通常是Handler Mapping控制器方法)和处理器拦截器链。
4. 处理请求: DispatcherServlet使用找到的处理器来处理请求，并生成响应

**常见的 Handler Mapping 实现**

1. BeanNameUrlHandlerMapping
   通过 bean 的名称来映射处理器。例如，bean 名称为/he1lo 的处理器会处理 /he11o 请求。

2. SimpleUrlHandlerMapping:
   通过显式配置的 URL 路径来映射处理器。可以在 Spring 配置文件中指定 URL 到处理器的映射关系

3. DefaultAnnotationHandlerMapping(**过时**)

   通过注解(如 @RequestMapping )来映射处理器。在较新的 Spring 版本中被RequestMappingHandlerMapping 取代。

4. RequestMappingHandlerMapping
   这是最常用的 Handler Mapping 实现。通过注解(如 @RequestMapping、@GetMapping@PostMapping 等)
   来映射处理器。支持复杂的请求映射规则，包括路径变量、请求参数、请求头等。

## 5. 什么是 Handler Adapter

Handler Adapter 负责将处理器(Handler)适配为具体的处理方法。 Handler Adapter 的主要作用是根据处理器的类型和具体实现，执行相应的处理逻辑。Handler
Adapter 是 DispatcherServlet 和具体处理器之间的桥梁。

**主要职责**

1. 处理器执行:调用处理器的方法来处理请求
2. 返回模型和视图:处理完请求后，返回一个ModelAndView 对象，包含视图名称和模型数据

**工作流程**

1. 请求到达 DispatcherServlet当一个 HTTP 请求到达 DispatcherServlet 时，它会先通过 Handler Mapping 找到对应的处理器
2. 选择 Handler Adapter: DispatcherServlet 根据处理器的类型选择合适的 Handler Adapter 。
3. 执行处理器: Handler Adapter 调用处理器的方法来处理请求
4. 返回结果:处理完请求后，Handler Adapter 返回一个 ModelAndView 对象，DispatcherServlet再根据这个对象生成最终的响应。

**常见的 Handler Adapter 实现**

1. HttpRequestHandlerAdapter:
   用于处理实现 HttpRequestHandler接囗的处理器。例如实现了 HttpRequestHandler接口的处理器。
2. SimpleControllerHandlerAdapter
   用于处理实现 Controller 接口的处理器。例如实现了Controller 接口的处理器
3. RequestMappingHandlerAdapter
   最常用的 Handler Adapter 实现。用于处理使用 @RequestMapping 注解的控制器方法。支持复杂的请求映射规则和数据绑定。

## 6. 什么是 View Resolver

View Resolver 负责 **将逻辑视图名称解析为具体的视图对象**(如JSP、Thymeleaf模板等)。 View Resolver
的主要作用是根据控制器返回的视图名称，找到相应的视图资源，并将其染成最终的 HTML 响应。

**主要职责**

1. 视图名称解析:将控制器返回的逻辑视图名称解析为具体的视图对象
2. 视图对象返回:返回一个 View 对象，该对象可以用来染模型数据。

**工作流程**

1. 控制器处理请求:当一个 HTTP 请求到达 Dispatcherervlet 时，它会通过 Handler Adapter 调用控制器的方法来处理请求。
2. 返回视图名称:控制器方法处理完请求后，会返回一个包含视图名称和模型数据的ModelAndView 对象
3. 视图名称解析: DispatcherServlet 使用 View Resolver 将逻辑视图名称解析为具体的视图对象
4. 渲染视图: View 对象使用模型数据来渲染最终的 HTML 响应。

**常见的 View Resolver 实现**

1. InternalResourceViewResolver
   最常用的 View Resolver 实现。用于解析JSP 文件。通过配置前缀和后缀来确定视图的实际路径。
2. ThymeleafViewResolver
   用于解析 Thymeleaf 模板文件。需要配合 Thymeleaf 模板引擎使用
3. BeanNameViewResolver:
   通过视图名称作为 bean 名称来查找视图对象。适用于视图对象作为 Spring bean 定义的情况
4. XmlViewResolver
   通过 XML 文件配置视图名称和视图对象的映射关系。

## 7. Spring MVC 中的 @Controller 注解有什么作用?

@Controller注解用于标记一个类作为控制器组件。控制器是处理 HTTP 请求的核心组件，它负责接收请求处理业务逻辑并返回视图或数据响应。

**主要作用**

1. 标识控制器类: @Controller 注解告诉 Spring 该类是一个控制器，应该由 Spring 容器管理
2. 处理请求:控制器类中的方法通过映射注解(如 @RequestMapping\@GetMapping\@PostMapping等)处理 HTTP 请求。

**相关注解**

在 Spring MVC 中，除了 @Controller，还有一些常用的注解用于处理请求:

1. @RequestMapping:

   用于定义请求 URL和 HTTP 方法的映射。可以应用于类级别和方法级别。

2. @GetMapping、@PostMapping、@PutMapping、@DeleteMapping:

   分别用于处理 GET、POST、PUT、DELETE 请求。是 @RequestMapping 的快捷方式。

3. @RequestParam :

   用于绑定 **请求参数** 到方法参数。可以指定参数名称、是否必需以及默认值

4. @PathVariable :

   用于绑定 **URL路径** 中的变量到方法参数。

5. @ModelAttribute :

   用于将请求参数绑定到模型对象，并将模型对象添加到模型中。

6. @ResponseBody:

   用于将方法的返回值直接作为 HTTP 响应体。常用于返回 JSON 或 XML 数据。

## 8. 什么是 ModelAndView?

ModelAndView 用于封装模型数据和视图信息。它允许控制器方法返回一个对象，该对象包含视图名称和模型数据，从而将数据传递给视图进行渲染。

**ModelAndView 的组成部分**

1. 视图名称:表示要渲染的视图的名称，通常对应于某个 JSP、Thymeleaf 模板或其他视图模板。模型数据:包含要传递给视图的数据。一个Map
   或者 Model 对象

**ModelAndView的常用方法**

1. 构造函数:

   `ModelAndView()`:创建一个空的ModelAndView 对象

   `ModelAndView(String viewName)`:创建一个带有视图名称的 ModelAndView 对象

   `ModelAndView(String viewName,String modelName，Object modelObject)`:创建一个带有视图名

   称和单个模型数据的 ModelAndView 对象。

   `ModelAndView(String viewame，Map<String，?>model)`:创建一个带有视图名称和模型数据的 ModelAndView 对象。

2. 设置视图名称:
   `void setViewName(String viewName)`:设置视图名称。

3. 添加模型数据:

   `ModelAndView addObject(String attributeName,Object attributeValue)`:添加单个模型数据

   `ModelAndView addObject(Object attributeValue)`:添加单个模型数据，属性名为对象的类名。

   `ModelAndView addAllObjects(Map<String，?>modelMap)`:添加多个模型数据。

4. 获取模型数据:
   `Map<String，0bject>getModel()`:获取模型数据。
5. 获取视图名称:
   `String getViewName()`:获取视图名称。

**使用 ModelAndview 的优点**

1. 清晰分离模型和视图:

   将模型数据和视图信息封装在一个对象中，使得控制器方法的返回值更加清晰和结构

2. 灵活性:

   可以在一个地方设置视图和模型数据，便于维护和修改。

3. 简化代码:

   通过返回 ModelAndView 对象，可以避免在控制器方法中显式设置模型和视图,

## 9. 什么是 @ModelAttribute 注解?

@ModelAttribute 注解是 Spring MVC 中用于绑定请求参数到模型对象的注解。它可以用于方法参数、方法和控制器类中，以便将请求中的数据绑定到模型对象，并将该对象添加到模型中，以便在视图中使用。

**@ModelAttribute的使用场景**

1. 方法参数:用于绑定请求参数到方法参数，并将该参数添加到模型中。
2. 方法:用于在处理请求之前准备模型数据。通常用于在处理请求之前初始化一些公共数据。
3. 控制器类:用于在所有请求处理方法之前初始化模型数据，

**用于方法参数**

当 @ModelAttribute 注解用于控制器方法参数时，它会自动 **将请求参数绑定到该参数对象** 中，并将该对象添加到模型中

```java
@Controller
public class UserController{

    @PostMapping("/register")
    public string registerUser(@ModelAttribute User user){
        // user 对象已经绑定了请求参数
        // 可以在这里处理业务逻辑
        return "result";
    }
}
```

在 @ModelAttribute 注解用于 User 对象的参数。这意味着 Spring MVC 会自动将请求参数绑定到 User对象的属性中，并将该对象添加到模型中。

**用于方法**

@ModelAttribute 注解用于控制器方法时，该方法会在每个处理请求的方法之前执行，用于准备模型数据

```java
@Controller
public class UserController{

    @ModelAttribute
    public void addAttributes(Model model){
        model.addAttribute("commonAttribute""This is a common attribute");
    }
    
    @GetMapping("/register")
    public string showForm(Model model){
        fmodel.addAttribute("user",new User());
        return "register";
    }
}
```

addAttributes 方法会在 showForm 方法之前执行，并将一个公共属性添加到模型中。这样commonAttribute 可以在视图中使用。

**用于控制器类**

@ModelAttribute 注解用于控制器类时，它会在所有请求处理方法之前执行，用于初始化模型数据。

```java
@Controller
@RequestMapping("/users")
public class UserController{

    @ModelAttribute
    public void addCommonAttributes(Model model){
        model.addAttribute("appName","User Management System");
    }

    @GetMapping("/register")
    public string showForm(Model model){
        model.addAttribute("user",new User());return "register";
    }
    
    @PostMapping("/register")
    public string registerUser(@ModelAttribute User user){
        // user 对象已经绑定了请求参数//可以在这里处理业务逻辑
        return "result";
    }
}
```

addCommonAttributes 方法会在所有请求处理方法之前执行，并将一个公共属性添加到模型中。这样，appName可以在所有视图中使用。

## 10. 什么是 @RequestParam 注解?

@RequestParam 注解是 Spring MVC 中用于将请求参数绑定到处理方法的参数上的注解。它可以用于从
URL查询参数、表单数据或其他请求参数中提取值，并将这些值传递给控制器方法的参数。

**@RequestParam的基本用法**

绑定单个请求参数

```java
@Controller
public class UserController{
    
    @GetMapping("/greet")
    @ResponseBody
    public String greetUser(@RequestParam String name){
        return "Hello" + name;
    }
}
```

如果请求 URL是 `/greet?name`，@RequestParam 注解用于将请求参数 name的值绑定到方法参数name

**指定请求参数名称**

可以通过 value 属性指定请求参数的名称:

```java
@GetMapping("/greet")
@ResponseBody
public string greetUser(@RequestParam("username")String name){
    return "Hello,"+ name;
}
```

`@RequestParam("username")`表示将请求参数 `username` 的值绑定到方法参数 `name`上。

**设置请求参数的默认值**

可以通过 defaultValue 属性设置请求参数的默认值:

```java
@GetMapping("/greet")
@ResponseBody
public String greetUser(@RequestParam(value ="name",defaultValue = "Guest")string name){
    return "Hello,"+name;
}
```

**请求参数为可选**

可以通过`required`属性指定请求参数是否是必需的:

```java
@GetMapping("/greet")
@ResponseBody
public String greetUser(@RequestParam(value = "name",required = false)String name){
    if(name == null){
        name = "Guest";
    }

    return "Hello,"+ name;
}
```

**高级用法**

绑定多个请求参数

```java
@GetMapping("/user")
@ResponseBody
2public String getUserInfo(@RequestParam String name, @RequestParam int age){return"User:"+name +"，Age:"+ age;
```

name 和 age 请求参数将分别绑定到方法参数 name 和 age 上，如果请求URL是 `/user?name=John&age=30`， 那么方法参数 name 的值将是
John，age 的值将是 30。

**绑定到集合类型**

```java
@GetMapping("/numbers")
@ResponseBody
public String getNumbers(@RequestParam List<Integer>nums){
    return "Numbers:"+ nums;
}
```

请求参数将绑定到方法参数nums上。如果请求URL是 `/numbers?nums=1&nums=2&nums=3`，那么方法参数nums 的值将是[1，2，3]。

## 11. 什么是 @PathVariable 注解?

@PathVariable 注解是 Spring MVC 中用于将 URL 路径中的变量绑定到处理方法的参数上的注解。它允许你从
URL路径中提取参数，并将这些参数传递给控制器方法，从而实现更加动态和灵活的 URL路由。(默认是String，可以绑定多个)

**绑定单个路径变量**

可以将 URL路径中的变量绑定到方法参数上:

```java
@Controller
public class UserController{
    @GetMapping("/users/{id}")
    @ResponseBody
    public string getUserById(@PathVariable string id){
        return "User ID:" + id;
    }
}
```

@PathVariable 注解用于将URL路径中的 id 变量绑定到方法参数 id上。如果请求 URL是`/users/123`，那么方法参数 id 的值将是 123。

**指定路径变量名称**

可以通过 value 属性 **指定** 路径变量的名称:

```java
@Controller
public class UserController{
    @GetMapping("/users/{userId}")
    @ResponseBody
    public string getUserById(@PathVariable("userId") string id){
        return "User ID:" + id;
    }
}
```

@PathVariable("userId")表示将 URL路径中的 userId 变量绑定到方法参数 id上。如果请求 URL是`/users/123`，那么方法参数 id 的值将是
123。

**绑定到特定类型**

可以将路径变量绑定到特定类型的参数上:

```java
@GetMapping("/products/{productId}")
@ResponseBody
public string getProductById(@PathVariable int productId){
    return "Product ID:"+productId;
}
```

productId 路径变量将绑定到方法参数productId上，并自动转换为int类型。如果请求 URL是 /products/789，那么方法参数productId的值将是789。

## 12. 如何在 Spring MVC 中配置拦截器?

通过 Java 配置类来配置拦截器是一种更现代和推荐的方式。需要实现 **WebMvcConfigurer** 接口，并在其中注册你的拦截器。

1. 创建一个拦截器类:实现HandlerInterceptor 接囗。
2. 创建一个配置类:实现 WebMvcConfigurer 接口，并在其中注册拦截器。

拦截器类:

```java
@Component
public class MyInterceptor implements HandlerInterceptor {
   
    @0verride
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, 
                             Object handler) throws Exception {
        System.out.println("Pre Handle method is Calling");
        return true;//返回 true 继续处理请求，返回 false 中止请求
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, 
                           Object handler) throws Exception {
        System.out.println("Post Handle method is Calling");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler) throws Exception {
        System.out.println("Request and Response is completed");
    }
}
```

接着配置

```java
@Configuration
public class WebConfig implements WebMvcConfigurer{
    @Autowired
    private MyInterceptor myInterceptor;
    
    @0verride
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(myInterceptor)
            .addPathPatterns("/**");//拦截所有请求
    }
}
```

## 13. 什么是 Spring MVC 的异常处理机制?

在 Spring MVC 中，无论是 DAO 层、Service 层还是 Controller 层，都有可能抛出异常。这些异常可以通过 throws Exception
向上抛出，并最终由Spring MVC的前端控制器(DispatcherServlet)交给异常处理器进行处理。Spring MVC
提供了多种异常处理机制，以便开发者能够根据自己的需求选择最适合的方式。

**异常处理的主要方式**

### 使用 SimpleMappingExceptionResolver

`SimpleMappingExceptionResolver` 是 Spring MVC 提供的一个简单异常处理器，它实现了 `HandlerExceptionResolver`
接口。通过配置该处理器，开发者可以定义异常类型与视图之间的映射关系，从而指定当特定类型的异常发生时应该渲染哪个视图。

**配置方式**:

在 Spring MVC 的配置文件中(如 XML 配置文件或 Java 配置类)配置 `SimpleMappingExceptionResolver`，并设置其属性，如
`defaultErrorView`(默认错误视图)、`exceptionMappings`(异常类型与视图的映射关系)等

### 实现 HandlerExceptionResolver 接口

如果 `SimpleMappingExceptionResolver` 不能满足需求，开发者可以实现 `HandlerExceptionResolver`
接口来创建自定义的异常处理器。这种方式提供了更高的灵活性，允许开发者在异常处理过程中执行更复杂的逻辑

**实现方式**:

创建一个类实现 `HandlerExceptionResolver`接口，并重写 `resolveException` 方法。在该方法中，可以根据异常类型决定如何处理异常，并返回一个ModelAndView
对象，该对象指定了要渲染的视图和要传递给视图的模型数据。

### 使用 @ControllerAdvice + @ExceptionHandler

从 Spring 3.2开始，SpringMVC引入了 `@ControllerAdvice` 和 `@ExceptionHandler` 注解，提供了一种基于注解的异常处理机制。这种方式允许开发者
**将异常处理逻辑与具体的 Controller 分离**，从而 **实现更加模块化和可重用的异常处理代码**。

**实现方式**:

首先，使用 `@ControllerAdvice` 注解标记一个类，该类将 **作为全局的异常处理类**。然后，在该类中使用 `@ExceptionHandler`
注解标记方法，并指定该方法用于处理哪种类型的异常。当指定的异常发生时，Spring MVC 将自动调用该方法进行处理,

### 异常处理机制的优势

* 统一处理:

  能够将所有类型的异常处理从各处理过程解耦出来，既保证了相关处理过程的功能较单一，也实现了异常信息的统一处理和维护，

* 灵活性:

  提供了多种异常处理方式，允许开发者根据自己的需求选择最适合的方式。

* 用户体验:

  通过友好的错误页面或错误信息提示，可以提升用户体验。

## 14. 什么是 Spring MVC 的 REST 支持?

Spring MVC的REST支持是指Spring MVC框架提供的一系列特性和工具，用于简化构建RESTful Web服务的过程。REST(Representational
State Transfer)是一种架构风格，用于设计网络应用程序，特别是Web应用程序。它基于HTTP协议，使用标准的HTTP方法(
如GET、POST、PUT、DELETE)来操作资源。

**Spring MVC的几个REST支持特性**:

1. @RestControler注解:

   这个注解是专门为REST控制器设计的。它相当于 *同时使用* `@Controller` 和 `@ResponseBody` 注解，表示该控制器返回的对象 *
   *会被自动序列化为JSON或XML等格式**

2. @RequestMapping注解:

   这个注解用来映射HTTP请求到特定的处理方法。可以指定请求的方法、路径参数等信息。

3. @PathVariable注解:

   用于从URL中提取变量并将其作为方法参数传递。

4. @RequestParam注解:

   用于从HTTP请求参数中获取值并将其作为方法参数传递

5. @RequestBody注解:

   用于将HTTP请求体转换为方法参数的对象

6. @ResponseBody注解:

   用于将方法返回的对象序列化为HTTP响应体。

7. ResponseEntity类:

   提供了一个可以直接返回HTTP响应的对象，包括状态码、响应头和响应体。

8. @ExceptionHandler注解:

   用于处理控制器方法中可能抛出的异常，并返回适当的HTTP响应

9. HTTP Message Converters:

   Spring MVC内置了多个消息转换器，支持将各种对象类型转换为JSON、XML、Form Data等格式。

10. Content Negotiation:

    Spring MVC支持根据客户端请求的Accept头自动选择合适的消息转换器。

11. HATEOAS (Hypermedia as the Engine of Application State): Spring HATEOAS提供了一组工具和注解，帮助你在RESTfu
    API中实现HATEOAS原则，例如生成链接和描述资源的关系。

## 15. 如何在 Spring MVC 中处理 JSON 数据?

处理 JSON 数据包括 **接收** 和 **返回** JSON 数据

*接收*

1. 使用 @RequestBody 注解:

在控制器方法的参数上使用@RequestBody注解可以将 HTTP 请求体中的JSON 数据自动解析为对应的 Java 对象。

```java
@PostMapping("/api/users")
public ResponseEntity<String>createUser(@RequestBody User user){
    //处理 user 对象
}
```

在上面的例子中， User 是一个普通的 Java 对象，Spring MVC 会自动将请求体中的JSON 数据转换为 User对象。

2. 手动解析 JSON:

   如果需要更多的控制权，可以使用 *Jackson* 或 *Gson* 等库手动解析 JSON 数据。首先你需要将请求体读取到一个字符串中，然后使用JSON
   解析器将其转换为Java 对象。例如，使用Jackson:
   ```java
   @PostMapping("/api/users")
   public ResponseEntity<String>createUser(@RequestBody String json){
       ObjectMapper mapper=new ObjectMapper();
       User user =mapper.readValue(json,User.class);//处理 user 对象
   }
   ```

*返回*

1. 使用 @ResponseBody 注解:

   在控制器方法上使用 @ResponseBody 注解可以将方法返回的对象自动序列化为 JSON 数据并写入到 HTTP 响应体中。

   例如:

   ```java
   @GetMapping("/api/users/{id}")
   @ResponseBody
   public User getUser(@PathVariable Long id){// 从数据库中获取用户
       return user;
   }
   ```

   在上面的例子中，Spring MVC会自动将 User对象序列化为JSON 数据并返回给客户端。

2. 手动序列化 JSON:

   如果需要更多的控制权，可以使用Jackson 或 Gson 等库手动将 Java 对象序列化为JSON 数据。例如，使用Jackson:

   ```java
   @GetMapping("/api/users/{id}")
   public ResponseEntity<String>getUser(@PathVariable Long id){
       // 从数据库中获取用户
       User user =...
       ObjectMapper mapper=new ObjectMapper();
       String json = mapper.writeValueAsString(user);
       return ResponseEntity.ok(json);
   }
   ```

## 16. 如何在 Spring MVC 中实现跨域资源共享(CORS)?

**使用 @CrossOrigin 注解**

该注解是 `Spring Framework` 提供的一个注解，用于在控制器 **方法** 或者 **整个控制器** 上指定允许的跨域请求，所以可以在方法级别或者类级别使用

```java
@RestController
public class MyController {
    @GetMapping("/api/data")
    // [!code focus:4]
    //@Cross0rigin 注解指定了来自 http://localhost:3000 的跨域请求是被允许的，
    // 并且设置了预检请求的缓存时间为 3600秒(1小时)。
    @CrossOrigin(origins ="http://localhost:3000"，maxAge = 3600)
    public List<Data> getData(){// 返回数据
    }
}
```

**使用 WebMvcConfigurer 接口**

如果需要全局配置 CORS 策略，可以实现 `WebMvcConfigurer` 接口重写 `addCorsMappigns` 方法

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer{
    @0verride
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
            .allowedorigins("http://localhost:3080")
            .maxAge(3600);
    }
```

## 17. 如何在 Spring MVC 中使@ExceptionHandler 注解?

在 Spring MVC 中， @ExceptionHandler 注解用于定义全局异常处理器。它允许你在一个地方集中处理应用程序中的异常，而不是在每个控制器方法中都编写重复的代码。

使用 @ExceptionHandler 注解可以使你的应用程序更加健壮和易于维护，通过集中处理异常来提高代码的可读性和可维护性。

### 创建一个异常处理器方法

在控制器类中创建一个带有 `@ExceptionHandler` 注解的方法，该方法由来捕获和处理特定类型的异常

```java
@Controller
public class MyController{

    @ExceptionHandler(Exception.class)
    // @ExceptionHandler(value ={SQLException.class,IOException.class})
    // @Responsestatus(HttpStatuS.INTERNAL_SERVER_ERROR)
    public string handleException(Exception ex){
        //处理异常并返回视图名或重定向到其他页面
        //  logger.error("An error occurred", ex);
        return "error";
    }
}
```

`handleException()` 方法将被用来处理所有类型的Exception。如果在控制器方法中抛出一个异常，Spring MVC 将调用这个方法来处理它。

### 指定要处理的异常类型

```java
@ExceptionHandler(value ={SQLException.class,IOException.class})
```

可以向上面的代码一样，指定要处理的异常类，根据不同的异常类型做不同的处理

### 设置 HTTP 状态码

通过 `@ResponseStatus` 注解设置

```java
@Responsestatus(HttpStatuS.INTERNAL_SERVER_ERROR)
```

### 访问异常信息

```java
logger.error("An error occurred", ex);
```

输出异常信息

### 返回视图或重定向到其他页面

```java
return "error";
```

返回一个名为 “error” 的错误视图

## 19. 什么是 Spring MVC 的生命周期?

**初始化阶段**

Spring 容器初始化，包括加载和解析配置文件、创建 Bean 对象等。对于 Spring MVC 应用，通常需要配置 `DispatcherServlet`，它是
Spring MVC 的核心组件，负责接收请求、处理请求和生成响应。

**处理阶段**

当一个请求到达服务器时，DispatcherServlet会根据请求的 URL找到对应的处理器(Controller)。涉及：

* URL匹配: DispatcherServlet会遍历所有的HandlerMapping，找到能够处理当前请求的 Handler(即Controller)。
* 解析请求参数:如果请求中包含参数，Spring MVC会自动将其绑定到 @RequestParam或 @PathVariable 注解的方法参数中。
* 执行业务逻辑: DispatcherServlet 会调用 Controller 的方法，执行相应的业务逻辑。
* 视图解析:如果 Controller 方法返回一个视图名， DispatcherServlet 会根据视图名找到对应的视图解析器，并将模型数据传递给视图。

**渲染阶段**

视图会根据模型数据生成最终的响应内容。Spring MVC支持多种视图技术，包括JSP、Thymeleaf、Freemarker等

**错误处理阶段**

如果在处理阶段或渲染阶段发生了错误，Spring MVC 会跳转到错误处理阶段。在这个阶段，DispatcherServlet 会查找并调用
@ExceptionHandler注解的方法来处理异常。

**销毁阶段**

当应用程序关闭或者 Spring 容器被销毁时，所有的 Bean 对象也会被销毁。对于 Spring MVC 应用，这意味着DispatcherServlet 和所有的
Controller 对象都会被销毁。