# JS 学习杂记

::: tip 笔者说
Js 基础薄弱，写一些前端的东西有点难受，虽然可以看懂吧，还是有许多疑惑 🤔
这里就记录一些以前粗略学习的时候没有注意的点，东西其实也不太多
:::

## 操作数组

数组本质是数据集合，操作 CRUD，下面是它的一些 API

-   增加元素：
    `arr.push(新增内容)`：将一个或多个元素添加到**末尾**，**并返回新数组长度**
    `arr.unshift(新增内容)`：将一个或多个元素添加到**开头**，**并返回新数组长度**

-   删除元素：
    `arr.pop()`：删除数组中最后一个元素，并返回该值
    `arr.shift()`：删除数组中第一个元素，并返回该值
    `arr.splice(操作下标，删除个数)`：`arr.splice(startIndex, deleteCount)`

## 函数传参的参数默认值

如果一个形参没有设置默认值，这个变量默认就是`undefined`，这样如果拿它去操作，很可能就会拿到`NaN`（Not a Number）的结果，为了改进这个问题，可以在声明函数参数的时候设置**形参的默认值**，程序会更加严谨

```JavaScript
function getSum(x = 0, y = 0){
    document.write(x + y)
}
```

如上就是设置**形参的默认值**

## 匿名函数

首先，Js 中函数调用的语法就是`()`，也就是说函数名+`()`就是执行这个函数

### 变量名赋值函数

将匿名函数赋值给一个变量，并且通过变量名称进行调用，我们将这个称为**函数表达式**

```JavaScript
let fn = function () {
    // 函数体
}

fn(); // 调用
```

### 立即执行函数（本质是已经调用了）

场景：避免全局变量之间的污染(相同名称可能会覆盖，因此导致污染)
下面是语法

```JavaScript
// 方式1（语句结束或者最开头必须要加上`;`）
(function (x, y){
    console.log(x + y)
    })(1, 2);

// 方式2
(function(){}());

```

-   方式 1 中的语法抽象为：`(function(){})()`，第一个最外层的小括号内写一个函数（所以形参在这里写），后面那个小括号本质还是执行，因此是**立即执行函数**，在这可以输入实参
-   方式 2 同理，只不过是在整个小括号中

## Js 中的对象

### 对象的属性特点

```Javascript
let obj = {
    uname: 'John',
    age: 36,
    gender: 'male,
    song: function () {
        console.log('冰雨')
    }
}

obj.song() // 调用对象的方法
```

1. 属性都是成对出现，包括属性名和对应值
2. 属性就是依附在对象上的变量
3. 属性名可以使用`""`或者`''`，**一般情况下省略**，除非名称遇到特殊符号如空格、中横线等等

### 获取对象属性的两种方式

```Javascript
// 1. 对象名.属性名
console.log(obj.num)
// 2.对象名['属性名'],必须在中括号中先用引号引起来，然后属性名
// 这种对于属性名有特殊符号而在用`.`表达式的时候不能用
console.log(obj['num'])
```

### 遍历对象

Js 中遍历对象，因为对象不是数组，不知道长度也就不知道什么时候结束，而且没有下标，因此用`for（k in obj）`的方式

```JavaScript
 let obj = {
            name: "John",
            age: 30,
            greet: function () {
                console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
            }
        };

for (let k in obj) {
    console.log(k, obj[k]);
}

// 输出的情况是
name John
age 30
greet ƒ () {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
```

从输出结果来看，这里必须要用`obj[k]`（相当于`obj['属性名']`）的方式，因为`k`实际是属性名**即 k 就是一个字符串**，如果是`obj.k`就相当于`obj.'属性名'`，这不符合正确写法

### 内置对象 Math

`Math.PI`

和数学运算相关的 API

-   random：生成 0-1 之间的随机数，[0,1)
-   ceil：向上取整
-   floor：向下取整
-   round：四舍五入
-   max：最大
-   min： 最小
-   pow：幂运算
-   abs：绝对值

生成 N-M 之间的随机数：`Math.floor(Math.random() * (M - N + 1)) + N`

## Js 的 APIs

### 变量声明

变量声明有`var`、`let`、`const`，首先应该排除`var`这种老派写法，问题很多，建议`let`和`const`优先选择`const`毕竟它的语义化更好一些，而且很多变量声明的时候就知道他不会再变动了，实际开发中 react 框架中基本都是 const
const：其声明的值不能改变，而且 const 声明变量时需要初始化，但是对于引用数据类型，const 声明变量存储的值是地址，这个地址指向实际存储的对象
举个例子：

```JavaScript
// 这样的写法是错误的，因为names这个变量的引用发生了变化，指向了一个新地址
const names = []
names = [1,2,3]
// 这样的写法才是正确的，在arr指向的数组空间做变化
const names = []
names[0] = 1


// 下面一组也如上
const obj = {}
obj = {uname: 'york'}

const obj = {}
obj.uname = 'york'
```

### DOM

-   DOM（Documnet Object Model）：文档对象模型，用来呈现以及任意与 HTML 或者 XML 文档交互的 API
    即，DOM 是浏览器提供的一套专门用来操作网页内容的功能
-   DOM 树：将 HTML 文档以树状结构直观表现出来即 DOM 树，体现标签与标签之间的关系
-   DOM 对象：将 HTML 标签当作 JS 对象处理，所有的标签都可以在 DOM 对象上找到，修改这个对象的属性就自动映射到标签上
-   document 对象：是 DOM 提供的一个对象，它提供的方法和属性都可以**用来访问和操作网页内容**

获取对象的 API：`querySelector`和`querySelectorAll`，使用实例如下

```JavaScript
// 下面是比较常用的，用css选择器的方式就可以获取目标对象
document.querySelector('#nav') // 获取id为nav的对象（id是唯一的）
document.querySelector('.box') // 获取类为box的对象
document.querySelectorAll('ul li') // 获取ul下面的所有li，是一个伪数组（有长度有索引但是没有pop()\push()等方法）
document.querySelector('div') // 获取第一个div
// 下面是比较语义化的
documnet.getElementById('nav')
document.getElementsByTagName('div')
document.getElementsByClassName('w')
```

### 操作元素内容

1. 元素 innerText 属性：将文本内容添加/更新到任意标签位置，显示的是纯文本内容不会解析标签

```JavaScript
const info = document.querySelector('.info')
info.innerText = '<strong>Hello</strong>'
```

2. 元素 innerHTML 属性：将文本内容添加/更新到任意标签位置，会解析标签，标签结构复杂的时候建议使用模板字符'``'
   innerHTML 得不到表单的值

```JavaScript
const info = document.querySelector('.info')
info.innerHTML = '<strong>Hello</strong>'
```

### 操作元素属性

-   简单属性：通过`对象.属性=值`的方式直接操作元素属性
-   样式属性：

    1. 通过`style`属性操作：多组单词的采取——小驼峰命名法，CSS 样式记得值都是字符串的形式，别忘了单位
    2. 操作类名`className`操作：修改样式较多时，直接用`style`属性比较繁琐
       （className 是使用新值换旧值，如果要添加一个类需要保留之前的类名）

    ```JavaScript
    // 因为class是关键字所以使用className去代替
    // 示例获取类名为'active`的样式
    元素.className = 'active'
    ```

    3. 通过`classList`操作：为了解决`className`容易覆盖以前的类名，使用`classList`可以追加和删除类名

    ```JavaScript
    元素.classList.add('类名') // 追加
    元素.classList.remove('类名') // 删除
    元素.classList.toggle('类名') // 切换一个类
    ```

### 操作表单元素属性

表单正常的有属性有取值的和其他标签属性没有任何区别，都是通过`DOM对象.属性名`的方式设置或者获取值

-   表单的值通过`表单元素.value`得到或者修改
-   表单中比如添加就有效果移除就没有效果的控件一律都用布尔值控制（disabled,checked,selected）
-   自定义属性：（标准属性是指标签天生自带的属性比如 class，id，title 等等可以直接用`.`去操作）
    所谓自定义属性，就必须以`data-`开头，在 DOM 对象上一律以`dataset`对象的方式获取

    ```JSX
    <div class="box" data-id="10">盒子</div>
    const box = document.querySelector('.box');
    console.log(box.dataset.id)
    ```

### 定时器——间歇函数

场景：每隔一段时间需要**自动**执行一段代码而不需要手动触发，开始和关闭

-   开启语法：

        ```JavaScript
        // 1.表示间隔interval的时间执行一次下面的函数
        let n = setInterval(() => {}, interval);
        // 2.也可以把这个函数定义在外面
        function fn(){}
        let n = setInterval(fn, interval) // 注意这里不是fn()，这样的话就是调用了
        ```

    注意：`setInterval`这个函数的返回值是一个`id`数字，因为页面中可能不止一个定时器，给对应定时器一个计数

-   关闭语法：

    ```JavaScript
    let n = setInterval(() => {}, interval);
    clearInterval(n);
    ```

## 事件监听

关于事件监听，有两个版本，on 事件的方式会被覆盖，而`addEventListener`的方式可以绑定多次，拥有事件更多特性，推荐使用

-   V0:`事件源.on事件 = function(){}`
-   V2:`事件源.addEventListener(EventType, function)`

### 事件类型

-   鼠标事件：鼠标触发（click，mouseenter（鼠标经过），mouseleave（鼠标离开））
-   焦点事件：表单获得光标（focus，blur（失去焦点））
-   键盘事件：键盘触发（Keydown，Keyup）
-   文本事件：表单输入处罚（input）

示例：

```JavaScript
div.addEventListener('mouseleave', function (event) {
    console.log('mouseleave');
})

```

### 事件对象

事件对象也是一个对象，存储了**事件触发时的相关信息**。「在**事件绑定**的回调函数的第一个参数就是事件对象」
使用场景：判断用户按下那个按键，鼠标点击了哪个元素在什么位置

事件对象的常用属性：

-   type：获取当前事件类型
-   clientX/clientY：获取光标相当于浏览器可见窗口左上角的位置
-   offsetX/offsetY：获取光标相当于当前 DOM 元素左上角的位置
-   key：用换下的键盘键的值（现在不提倡使用`keyCode`）

    ```JavaScript
    if(e.key === 'enter'){
        console.log('Enter被按下了');
    }
    ```

### 环境对象

环境对象指的是**函数内部特殊的变量 this**，它代表当前函数运行所处的环境
谁调用这个函数`this`就是谁（这是一个粗略规则，细致还是很深刻的）

```JavaScript
// 每个函数都有this环境对象，普通函数里面的this指向window
function fn () {
    console.log(this)
}
fn() // 输出的是windows对象，而且实际fn()应该是写成window.fn()

const btn = document.querySelector('button');
btn.addEventListener('click', function (e) {
    console.log(this) // 输出的是btn对象也就是button按键
}
```

### 回调函数

如果函数 A 作为参数传递给函数 B 时，称函数 A 为回调函数

## 事件流

事件流指的是事件完整执行过程中的流动路径，有两个阶段：捕获阶段（从 Document 一直找到目标标签）和冒泡阶段（从目标标签到 Document）
简单说：捕获阶段就是从父到子的过程，冒泡阶段就是从子到父的过程。实际工作中使用**冒泡时间为主**

### 事件捕获

从 DOM 的根元素开始执行对应的事件（从外到里），事件捕获需要写对应的代码才能看到效果

```JavaScript
DOM.addEventListener(事件类型,事件处理函数,是否使用捕获机制)
// 第三个参数传入true表示捕获阶段触发（很少使用）传入false就是冒泡阶段触发且是默认的
```

### 事件冒泡

当一个元素的事件被触发时，同样的事件将会在该元素的所有祖先元素中依次被触发，这一过程就是事件冒泡
简单说就是一个元素触发事件后，会依此向上调用所有父级元素的**同名事件**
事件冒泡默认是开启的

### 阻止冒泡

默认的冒泡模式是存在的，**容易导致事件影响到父级元素**，如果想把事件限制在当前元素内，就要阻止事件冒泡，前提是拿到事件对象
注意这个方法其实是阻断事件流动传播，不光在冒泡阶段有效，捕获阶段也有效

```JavaScript
事件对象.stopPropagation()
```

某些情况下需要组织默认行为的发生，比如组织链接跳转，表单域跳转
语法：

```HTML
// e.preventDefault()
<form method="post" action="xxx">
    <input type="submit" value="提交">
</form>

<script>
    const form = document.querySelector('form')
    form.addEventListener('click', function(e) {
        // 阻止表单默认提交行为
        e.preventDefault()
    })
</script>
```

### 解绑事件

-   on 事件方式，直接使用`null`覆盖就可以实现解绑事件

    ```JavaScript
    btn.onClick = function () {}

    btn.onClick = null; // 解绑
    ```

-   addEventListener 方式，必须使用`removeEventListener(事件类型,事件处理函数,[获取捕获或者冒泡阶段])`
    但是如果写成匿名函数，则无法解绑，所以你把函数定义出来才可以

    ```JavaScript

    btn.addEventListener('click', fn)

    btn.removeEventListener('click', fn) // 解绑

    ```

-   关于鼠标经过事件
    `mouseenter`和`mouseleave`没有冒泡效果，更加推荐
    `mouseover`和`mouseout`会有冒泡效果

### 事件委托

**利用事件流的特征解决一些开发需求**，优点是减少注册的次数提高程序性能，其原理是：「事件委托其实是利用事件冒泡的特点」
（给父元素注册事件，当触发子元素的时候会冒泡到父元素身上，从而触发父元素的事件）

实现：事件对象.target.tagName（标签的大写）可以获得真正触发事件的元素

```JavaScript
// ul是无序列表，里面嵌套了一堆li，这样点击li的事件冒泡到了父级元素ul身上
// 这样我们就无须把所有li都绑定一个监听事件，而把事件绑定到了ul上，通过冒泡处理
ul.addEventListener('click', function(e){
    if(e.target.tagName == 'LI'){
        this.style.color = 'pink';
    }
})
```

### 页面加载事件

-   加载外部资源（如图片，外联 CSS 和 JavaScript 等）加载完毕时触发的事件
    有些时候需要等待页面资源全部处理完毕之后再做一些事
    事件名称“load”,不光可以监听整个页面资源加载完毕，也可以针对某个资源绑定对应的 load 事件

    ```JavaScript
    // 监听页面所有资源加载完毕可以给window添加load事件
    window.addEventListener('load', function(){})
    ```

-   当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无须等待样式表、图像等完全加载
    事件名：DOMContentLoaded（其实就是只要有这个 DOM 结构之后就会触发）

    ```JavaScript
    document.addEventListener('DOMContentLoaded', function(){})
    ```

### 页面滚动事件

网页需要检测用户把页面滚动到某个区域后做一些处理，比如固定导航栏比如返回顶部
事件名：scroll

```JavaScript
window.addEventListener('scroll', function(){})
```

但是通常我们是检测整个页面的滚动，我们还可以**获取位置**
获取位置主要是用`scrollLeft`和`scrollTop`两个属性，这两个属性的值是**可读写的**，怎么理解呢？

-   `scrollLeft`：我们拉取滚动条向右滑动，这意味着整个页面向左移动，`scrollLeft`就代表向左移动的距离
-   `scrollTop`：同理，我们拉取滚动条向下滑动，这意味着整个页面向上移动，`scrollTop`就代表向上移动的距离

利用这两个属性的值我们就可以在网页滑动的时候，同步导航栏标签的变动等信息，不过这里要注意下面的东西
对于`<html>`这个标签的获取，有一个固定的写法是`document.documentElement`，这样就可以获取整个页面的`<html>`这个标签的元素
那获得这个标签的对象有什么用呢？我们通常看到的滑动整个页面然后做出相应反应的都是根据这个标签，也就是说整个页面的变动，最大的标签就是`<html>`而不是`<body>`，对于`<html>`这个标签的获取是这样固定的写法，记住就行

```JavaScript
document.documentElement.scrollTop
```

## 本地存储

要点：`key`都要以字符串的形式添加，`value`因为本地存储只能存储字符串数据类型，最终会转化成字符串

### localStorage（存储复杂数据类型无法直接使用）

存储在浏览器中而不是在内存中（在内存中刷新就会丢失），可以将数据**永久存储在本地（用户的电脑）除非手动删除否则关闭页面也会存在**
语法：

-   存储数据:`localStorage.setItem(key, value)`
-   获取数据:`localStorage.getItem(key)`
-   删除数据:`localStorage.removeItem(key)`
-   清除:`localStorage.clear()`
-   获取存储个数:`localStorage.length`

### sessionStorage

特性：生命周期为**关闭浏览器窗口**，在同一个窗口（页面）下数据可以共享，以键值对的形式存储使用，用法和`localStorage`相同名称可能会覆盖

### 存储和获取复杂数据类型

做法：将复杂数据类型转化成 JSON 字符串（就是序列化和反序列化）
`JSON.stringfy(复杂数据类型)`
`JSON.parse(JSON串)`

## 垃圾回收机制

内存的生命周期：JS 环境中分配的内存，一般如下的生命周期：

1. 内存分配：声明变量、函数、对象的时候，系统会自动分配内存
2. 内存使用：读写内存也就是使用变量函数等
3. 内存回收：使用完毕，由垃圾回收器自动回收不再使用的内存

说明：全局变量一般不会回收（关闭页面回收）、一般情况下局部变量的值不使用就会被自动回收（也是有内存泄漏的风险）

## 闭包

概念：一个函数对周围状态的引用捆绑在一起，内层函数中访问到其他外层函数的作用域
作用：**封闭数据（实现数据的私有）**，提供操作，外部也可以访问函数内部的变量
问题：可能会引起内存泄露（因为数据可能应该被清理但是一直无法清理）
简单理解：**闭包 = 内层函数 + 外层函数的变量**，最简单的形式如下代码：

```JavaScript
function outer() {
    const a = 1
    function fn() {
        console.log(a)
    }
    fn()
    return fn // 外层函数返回内层函数，这样在外边调用外层函数的时候，返回的就是这个内层函数
    // 也就实现了
}
const fun =  outer() // 根据垃圾回收机制，我们也能知道这个引用链一直指向了局部变量，所以它直到关闭是一直不会被回收的
fun() // 使用函数
```

首先外层函数提供一个变量（因为是定义在函数内部的变量，因此原则上这个变量只能在函数内部使用，外部无法访问），然后内层函数要使用这个变量并且外层函数对外返回这个内层函数（也就是变相的返回了对外层函数提供的变量的使用逻辑），这样才是闭包，单纯地外层函数嵌套内层函数是不算的
通过这种做法，外层函数提供的变量就不会被随意的修改，做一个封装

## 可变长参数（动态参数）

和 Java 中一个原理，JS 中可变长参数使用`argument`这个变量表示，它实际是一个**伪数组**，即有下标有长度但是没有一些常用的方法
// 注意可变长参数，这里形参就不需要写了，直接用`argument`来看
用法示例：

```JavaScript
function getSum(){
    let sum = 0
    for(let i = 0; i < arguments.length; i++){
        sum += argument[i]
    }
    return sum
}
```

## 剩余参数(开发中推荐)

允许我们将一个不定数量的参数表示为一个数组，是**真数组**（有 api），`...`是语法符号，置于最末函数形参之前，用于获取多余的实参，和可变长参数比起来，他可以接受“至少有 x 个参数”类似的需求

```JavaScript
function config(baseURL, ...other){ // 在这用`...`是表示other是一个剩余参数表示的数组，就是一个声明，下面就可以直接使用了
    console.log(baseURL)
    console.log(other) // [ 'get', 'json']
}

config('http://baidu.com', 'get', 'json')
```

## 展开运算符

不会修改原数组！
展开运算符（`...`）将一个**数组**进行展开
典型应用：求数组的最大最小值，合并数组等等

```JavaScript
// Math.max(1,2,3)
// 上面的方法参数只能是一个一个的数字，不能直接传入一个数组，而且数组也没有直接求最值的api
Math.max(...arr)// 用展开运算符就可以
// 合并数组
const arr1 = [1,2,3]
const arr2 = [4,5,6]
const arr = [...arr1, ...arr2]
```

## 箭头函数

目的：引入箭头函数的目的是更简短的函数写法并且不绑定 this，箭头函数的语法比函数表达式更加简洁
使用场景：更适用于那些本来需要匿名函数的地方
箭头函数**没有 arguments 动态参数**，但是有剩余参数`...args`

1. 只有一个形参的时候，可以省略小括号
    ```JavaScript
    const fn = x => {
        console.log(x)
    }
    ```
2. 只有一行代码的时候可以省略大括号，可以省略 return

    ```JavaScript
    const fn = x => console.log(x)
    ```

3. 箭头函数可以直接返回一个对象

    ```JavaScript
    const fn = unmae => ({name: uname})
    fn('刘德华')
    ```

### 箭头函数的 this

箭头函数出现前，每一个函数根据他是被如何调用的来定义该函数的 this 指向问题；箭头函数不会创建自己的 this，而是从自己的作用域链的上一层沿用 this
DOM 事件回调函数不太推荐使用箭头函数，特别是需要用到 this 的时候，因为事件回调函数使用箭头函数时，this 为全局的 window

## 解构赋值

其实操作是**解构**，但是使用形式呈现的是赋值形式，所以叫解构赋值，可以嵌套，比如有一个对象数组，可以先用`[]`解构最外层的数组，然后每一个元素有可以用`{}`解构

### 数组解构

#### 需求

有一个数组，里面存了最大值最小值和平均值，但是他们存放在哪一个下标很容易忘记，于是选择用变量的方式收集起来，但是这又很麻烦，因此出现了数组解构

```JavaScript
const arr = [100, 60, 80]
// const max = arr[0]
// const min = arr[1]
// const avg = arr[2]
// 上面三行这样写很繁杂，于是有了下面的解构表达式
const [max, min, avg] = arr
console.log(max)
console.log(min)
console.log(avg)
```

数组解构就是把数组的单元值快速批量赋值给一系列变量的简介语法
赋值运算符 `=` 左侧的`[]`用于批量声明变量，右侧单元值将赋值给左侧的变量，并且按顺序依次

#### 典型应用：交换元素

```JavaScript
let a = 1
let b = 2
;[b, a] = [a, b] // 这个分号一定要注意，数组开头的，特别是前面有语句的一定要注意加上
console.log(a)
console.log(b)
```

这里这个`;`的处理是这样的，数组开头，我们一般是用一个变量接受指向这个数组，一般不直接拿一个数组开头使用，如果这么做的话，内部会把这个数组和上一行代码连在一起，所以这个`;`就是起一个分隔作用，注意下就好

#### 引入剩余参数

当需要解构赋值的数组元素很多的时候，我们也可以引进**剩余参数**

```JavaScript
const [a, b, ...c] = [1, 2, 3, 4]
```

#### 防止 undefined 传递

-   当解构的变量多，单元值少（也就是不够解构分，就会有 undefined）
-   当解构的变量少，单元值多，允许

```JavaScript
const [a = 0, b = 1] = []
```

#### 按需导入赋值

单元值是按照`,`分隔开的，所以解构的时候，也按照`,`分隔开其实就能拿到想要的值
`const [a, b, , d] = [1, 2, 3, 4]`

#### 多维数组解构

`const [a, b, [c, d]] = [1, 2, [3, 4]]`

### 对象解构

要求属性名和变量名必须一致，但是也可以改名，改名的语法是：`旧变量名: 新变量名`

```JavaScript
const {uname: username, age} = {uname: 'uname', age: 18}
// 相当于
const username = obj.uname
const age = obj.age

// 对象数组
const goods = [
    {
        goodsName: '小米',
        price: 1099
    }
]

const [{goodsName, price}] = goods

const pig = {
    name: '佩奇',
    age: 18,
    family: {
        mother: '猪妈',
        father: '猪爸',
        brother: '乔治'
    }
}

const {name, age, family:{mother, father, brother}} = pig
```

## forEach 方法（重要）

用于调用数组的每一个元素，将元素传递给回调函数
`被遍历的数组.forEach(function (当前数组元素（必须）, 当前元素索引号（可选）))`、

```JavaScript
const arr = ['red', 'green', 'blue']
arr.forEach(function (item, index){
    console.log(item) // red, green, blue
    console.log(index) // 索引号
})
```
