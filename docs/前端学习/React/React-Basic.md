# React-Basic 学习

::: tip 笔者说

鹅鹅鹅 🪿 其实我一直对前端是很感兴趣的，只恨之前没有多花时间去学习，而且感觉会一些 React 还是有好处的，偷学学

:::

## 虚拟 Dom 和真实 Dom

1. 虚拟 Dom 本质是 Object 类型的对象（一般对象）
2. 虚拟 Dom 比较“轻”，真实 Dom 比较“重”，因为前者是 React 内部使用，无需真实 Dom 的很多不需要的属性，只保留一些关键属性
3. 虚拟 Dom 最终会被 React 转化成真实 Dom，呈现在页面上

## JSX（JavaScript XML）中使用 JS 表达式

### JSX 的语法规则

```
// const VDOM = (
//     <h2 id="atguigu">
//         <span>hello react</span>
//     </h2>
// );
```

1. 定义虚拟 Dom 时不要写引号`“”`
2. 标签中混入 JS 表达式的时候要用`{}`（这就是为什么有的地方要用大括号）
3. 样式的类名指定不要用`class`而是用`className`
4. 内联样式要用`style={{key:value}}`的形式去写（最外层的`{}`表示混入 JS 表达式必须用大括号，里面是因为样式使用对象去传入的，这是 JS 的语法）
5. 只有一个跟标签（初学的时候可以直接最外层放一个`<div>`处理）
6. 标签必须闭合
7. 标签首字母：
8. 如果是小写：则将该标签转为 HTML 中同名元素，若没有则报错
9. 如果是大写：React 去渲染对应的「组件」（**因为 React 的组件首字母大写**），如果组件没有定义就报错

### 为什么要用 JSX

JSX 表达式其实就是原生 JS 的一个语法糖（JavaScript 的扩展），原生的创建虚拟 Dom 的方式在有复杂嵌套结构的情况下非常繁杂，使用 JSX 的方式写起来就可以直接像写 Html 一样简单，但是最终执行时还是会把语法糖转化成原生的 JS 形式（说白了就是 coder 写代码的时候使用语法糖简写，编译时会转化成原始的 JS 形式）

`JSX`就是`JS`和`XML`的合并，呃呃兼备两者的特性，要想在`JSX`中使用`JS`表达式，可以通过使用**大括号{}**识别`JS`表达式，常用以下四种方法

```JSX
let count = 0;

function getName() {
    return "Jack";
}

function App() {
    return (
        <div className="App">
            this is a div
            {/* 这里介绍大括号{}在React的用法，识别js表达式 */}
            {/* 使用引号传递字符串 */}
            {"this is a message"}
            {/* 识别js变量 */}
            {"count的值是："}
            {count}
            {/* 函数调用 */}
            {"getName函数调用是："}
            {getName()}
            {/* 方法调用 */}
            {new Date().getDate()}
            {/* 使用js对象 */}
            <div style={{ color: "red" }}>this is a div</div>
        </div>
    );
}
```

但是注意：`if`、`switch`、变量声明属于语句而不是**表达式**，不能出现在`{}`中

因此有了**条件渲染**，还有**事件驱动**等等逻辑，按照下面的方式去写即可

```JSX
let count = 0;

let list = [
    { id: 1001, name: "React" },
    { id: 1002, name: "Vue" },
    { id: 1003, name: "Angular" },
];

function getName() {
    return "Jack";
}

let isLogin = true;

let articleType = 0;

function getArticleTemplate() {
    if (articleType === 0) {
        return <div>我是无图模式</div>;
    } else if (articleType === 1) {
        return <div>我是单图模式</div>;
    } else if (articleType === 3) {
        return <div>我是三图模式</div>;
    }
}

function App() {
    const handleClick = (e) => {
        console.log("button被点击了,事件对象e为：", e);
    };

    const handleClickCustom = (name) => {
        console.log("button被点击了,自定义参数对象name为：", name);
    };

    const handleClickCustom2 = (name, e) => {
        console.log(
            `button被点击了,自定义参数对象name为：${name},事件对象为：${e}`
        );
    };

    return (
        <div className="App">
            this is a div
            {/* 这里介绍大括号{}在React的用法，识别js表达式 */}
            {/* 使用引号传递字符串 */}
            {"this is a message"}
            {/* 识别js变量 */}
            {"count的值是："}
            {count}
            {/* 函数调用 */}
            {"getName函数调用是："}
            {getName()}
            {/* 方法调用 */}
            {new Date().getDate()}
            {/* 使用js对象 */}
            <div style={{ color: "red" }}>this is a div</div>
            {/* 渲染列表,重点是map方法，循环哪个结构就return它 */}
            {/* 注意：react内部为了提高更新性能，加上一个独一无二的key */}
            {/* 用字符串或者number作为id */}
            <ul>
                {list.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            {/* 条件渲染，isLogin的值是true的时候后面的div才显示否则不显示 */}
            {isLogin && <div>this is a div</div>}
            {!isLogin ? <div>this is a div</div> : <span>this is a span</span>}
            {/* 使用函数渲染不同的模板 */}
            {getArticleTemplate()}
            {/* 事件驱动——事件对象e */}
            <button onClick={handleClick}>Click me</button>
            {/* 事件驱动——传递自定义参数 */}
            <button onClick={() => handleClickCustom("Jack")}>
                Click me 传递自定义参数
            </button>
            {/* 事件驱动——事件对象e + 自定义参数 */}
            <button onClick={(e) => handleClickCustom2("Moe", e)}>
                Click me 传递自定义参数 + 事件对象e
            </button>
        </div>
    );
}
```

## React 中的组件

一个组件就是用户界面的一部分，可以有自己的逻辑和外观，组件之间可以**互相嵌套，可以复用**。组件化开发方式就像搭积木一样

React 的组件分为「函数式组件（适用于简单组件的定义）」和「类式组件（适用于复杂组件的定义）」。**组件名必须首字母大写**

「简单组件」和「复杂组件」关键在于是否有「状态」-> `state`（后续说）

### 函数式组件

在 React 中，一个组件就是一个**首字母大写的函数**（本质就是函数，只要是首字母大写即可，所以这里除了用`function`直接声明也可以用箭头函数这样的写法），内部存放了组件的逻辑和视图 UI，渲染组件只需要把组件**当成标签书写**即可

```JSX
const Button = () => {
    // 定义函数式组件
    return <button>click me</button>;
};
// App就是最大的组件
function App() {
    return (
        <div className="App">
            {/*使用组件的方式（渲染组件）,单独闭合或者成对标签都是可以的*/}
            <Button />
            <Button></Button>
        </div>
    );
}
```

当我们定义好组件以后，使用组件时，React 就会解析组件标签（找到目标组件），发现组件是函数式定义则调用这个函数，将返回的虚拟 Dom 转化为真实 Dom，随后呈现到页面上

### 类式组件

定义一个继承自`React.Component`的类，类名就是组件名（同样大写），构造器不是必须的（因为继承自`React.Component`除非自己想有别的意图否则完全可以不写构造器），必须要有一个`render()`方法且必须有`return`返回，返回的就是你想要呈现的样式

`render`方法在*类的原型对象上，供实例对象使用*。那实例对象何来？很明显，这里使用了`<MyComponent />`组件

——React 解析组件标签找到`MyComponent`组件并发现该组件是类定义的，_随后 new 出来该类的实例，并通过<u>该实例对象</u>调用原型上的 render 方法_，再将`render`返回的虚拟 Dom 转化为真实 Dom 随后呈现在页面上

```jsx
// 创建(在类里面写函数不能用function，直接写函数名开始写)
class MyComponent extends React.Component {
    render() {
        return <h2>我是类式组件</h2>;
    }
}
// 渲染，这个ReactDOM.render和上面类式定义的render只是同名而已，没有关系
ReactDOM.render(<MyComponent />, document.getElementById("test"));
```

### 组件的三大属性（引出，后续细说）

`context`（上下文，主要是说后面三个属性）、`props`、`refs`、`state`这几个重要特性都来源于`React.Component`

其实一开始这三大特性（首先基于**实例**）是对于类式组件才有的特性，后面的版本函数式组件也有了这些特性

在引入下面的`useState`之前，我们先来一个前瞻（其实就是`useState`的原理）

因为是**组件的**特性，这些特性是在组件身上的。下面我们看一个例子

```JSX
class Weather extends React.Component {
constructure(props){
    super(props)
    this.state = {isHot: true}
}
// 这个render表示渲染，就是这个组件在声明以后会调用这个render函数
render () {
    console.log(this);
    const isHot = {this.state.isHot};
    return (
        <h2>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
    )
}
}
```

这里的写法是必须的，即构造器必须传入`props`属性然后用`super`调用父类构造器（也就是`React.Component`的构造器），然后把你想定义的某一个状态`state`以「对象」的方式传入（因为状态可以有很多，自己定义，所以传对象的方式即可），然后下面的“凉爽”还是“炎热”就取决于`isHot`这个状态值了，这就是所谓的「状态驱动视图」

### React 事件绑定（关于 State）

这个就是比如`onXxxx`的东西，原生的比如`onclick`这样的属性被 React 重写了一套，并且命名为`onXxx`的形式，先看下面的实例

```jsx
class Weather extends React.Component {
constructure(props){
    super(props)
    this.state = {isHot: true}
}
// 这个render表示渲染，就是这个组件在声明以后会调用这个render函数
render () {
    console.log(this);
    const isHot = {this.state.isHot};
    return (
        <h2 onClick={changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
    )
}
}

function changeWeather(){
console.log('标题被点击了');
}
```

重点看`onClick={changeWeather}`其实这里我们有几点解惑：首先为什么用`{}`这点之前解释过，JSX 的语法规定标签中混杂 JS 的用法要用`{}`括起来，其次，我们知道想表达的含义是`onClick`在点击的时候执行这个`changeWeather`函数，说白了`changeWeather`这个函数作为回调函数，这里的`=`赋值的含义仅仅是把这个方法（方法也是一个特殊的属性）赋给`onClick`这里是没有在调用的。但是不能写成`changeWeather()`！！！，因为`changeWeather()`这样的写法就是一个「函数调用表达式」，也就是把`changeWeather`的调用结果返回给`onClick`（暗含你已经执行了这个表达式的意思），如果这样写就导致了由于调用`render`渲染组件而引起的本来作为「回调 函数」的方法直接被执行。

「下面的东西都是为了一步一步引出这个 useState」

看了上面的代码，我们想把函数`changeWeather`在类中定义，但是同时也引起了问题，就是用下面的方法的时候这个`console.log(this);`的`this`是`undefined`，这是怎么回事？

```jsx
class Weather extends React.Component {
...(和上面的代码一样)
render () {
    console.log(this);
    const isHot = {this.state.isHot};
    return (
        <h2 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
    )
}

changeWeather(){
    console.log(this);
}
}
```

`<h2 onClick={this.changeWeather}>`这里的作用等同于没有把函数放到类中定义时`<h2 onClick={changeWeather}>`的效果一样，就是把这个函数赋值。

我们知道类中定义的方法放在了类的「原型对象」上，供实例对象使用。由于`changeWeather`是作为`onClick`的回调，不是通过实例对象调用的而是直接调用，因为类中的方法默认开启了「局部的严格模式」，所以`changeWeather`中的`this`就是`undefined`。（说白了就是，如果正确调用的话，这个回调也应该交给`Weather`类的实例对象调用，但是这个实例对象被 React 帮我们创建好了在渲染的时候调用了`render`方法，但是此时调用回调`changeWeather`方法并不是由这个实例对象调用的，属于直接调用，因此这个`this`不具有指向，是`undefined`）

::: warning

那如何解决？

:::

```jsx
class Weather extends React.Component {
constructure(props){
    super(props)
    this.state = {isHot: true}
    // 在这里做变动，利用bind方法，顺着原型找到changeWeather
    // 然后创建新的changeWeather（并且把它的‘this’指向这里的this）
    // 解决了this指向问题
    this.changeWeather = this.changeWeather.bind(this)
}
render () {
    console.log(this);
    const isHot = {this.state.isHot};
    return (
        <h2 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
    )
}
changeWeather(){
    console.log(this);
}
}
```

`this.changeWeather = this.changeWeather.bind(this)`这个赋值语句的作用：先看右边 👉，`this.changeWeather.bind(this)`就是先找到`Weather`类实例的「原型对象」上面的``changeWeather`方法，然后创建一个一样的新的`changeWeather`方法并且把它挂到`Weather`类实例上！

那么也就是说，原先是只有`Weather`类实例的「原型对象」上有`changeWeather`这个方法，`bind`之后，在`Weather`类的实例对象上也有了这个方法！`<h2 onClick={this.changeWeather}>`这里赋值的时候也就不需要引用原型对象的方法而是引用实例对象了。（实现这个效果的根本就是原来原型对象上有这个方法）

`bind`返回的是一个函数，于是赋值语句的左边，也就是说实例对象上就有了一个名为`changeWeather`的属性，它是方法，并且这个方法的`this`就是`bind`绑定的对象，在这里也就是`this`（这个`this`指的是`Weather`实例对象）

举个例子就明白了

```jsx
function demo() {
    console.log(this);
}
demo(); // 这样不处理输出的就是window（因为直接调用就是window）
const x = demo.bind({ a: 1, b: 2 }); // 通过bind函数绑定，通过这个demo函数搞一个新的函数，新的函数的this绑定给{a: 1, b: 1}这个对象上，x指向这个新的函数
// 也就是说接下来demo的this就指向了{a: 1, b: 1}这个对象
x(); // 输出的就是{a: 1, b: 1}这个对象
```

那么上面的意思说来说去，总结：`this.changeWeather = this.changeWeather.bind(this)`这句是在构造器里面，所以最右边的`this`此时表示的是`Weather`类的实例对象，所以通过`bind`创建一个新的`changeWeather`函数，这个新函数赋值给了`Weather`实例名为`changeWeather `的新属性，并且这个新函数的`this`指向了`Weather`实例对象。

#### 继续探讨

其实到上一步我们解决了`this`的问题已经可以修改状态的值了，完全可以在`changeWeather`里把属性取反，但是！这样做从编码角度看确实可以改变，但是在 React 的调试工具中你会发现这个状态值根本没有发生变化！这是 React 不认可的

**状态不可直接更改，要借助内置 API 更改**

自定义组件继承自`React.Component`我们发现它里面有一个`setState`这个 API，修改状态就是用这个 API 来实现的

```jsx
changeWeather () {
const isHot = this.state.isHot
this.setState({isHot: !isHot})
}
```

#### 还不够精简

上面我们探讨半天，写法都是很标准的写法，但是开发中没人会这么写，太浪费代码。原因是有几个忽略的点，第一我们用了构造器传入了状态还有表示修改状态的函数，但是，在**类中直接使用赋值语句就表示给该类添加该属性**，因此我们完全可以放弃构造器的方式而变为**赋值语句**的形式，加入状态和对应的会调方法（注意方法必须写成箭头函数的样子做成赋值语句），这样状态和对因的方法就都是`Weather`类自己的属性了，也十分精简

```jsx
class Weather extends React.Component {
state = {isHot: true}

render () {
    console.log(this);
    const isHot = {this.state.isHot};
    return (
        <h2 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
    )
}
changeWeather = () => {
    const isHot = this.state.isHot
    this.setState({isHot: !isHot})
}
}
```

#### 关于上面的总结

类式组件，使用一次组件（`<Weather />`），构造器只执行 1 次，`render`渲染方法调用 1 + n 次（n 代表后续状态更新次数，1 代表初始化的时候执行），`changeWeather`也就是代表了引起状态改变的方法，改变几次调用几次

## useState

useState 是一个 React Hook（函数），允许我们向组件中添加一个**状态变量**，从而控制影响组件的渲染结果

本质：和普通的`JS`变量不同的是，**状态变量**一旦发生变化组件的视图 UI 也会跟着变化（**数据驱动视图**）

```jsx
const [count, setCount] = useState(0);
```

解释：

1. useState 是一个函数，返回值是一个数组
2. 数组中的第一个参数是**状态变量**，第二个参数是一个用来修改状态变量的**函数**
3. useState 的参数将作为 count 的**初始值**

使用案例如下：

```jsx
import { useState } from "react";

const [count, setCount] = useState(0);

const handleCount = () => {
    // 作用是用传入的新的值修改原来的值count，所以count实现了+1的逻辑
    // 每次调用都会用最新的count渲染UI，这就是「状态变量」的好处
    // 这里的setCount就是一个处理的函数，逻辑就是把原值改成什么样的值，这个自定义即可
    setCount(count + 1);
};
```

看上面做法 setCount 函数的使用方法有点蒙蔽，为什么要这么做呢，既然`count`是一个变量，为什么不可以在函数中直接使用`count++`这样的操作呢？？？

在 React 中，状态被认为是**只读**的，始终都应该**替换而不是修改**，直接修改是可以这样做，但是他并不能引发视图的更新（所以其实使用这个 setCount 函数的时候，才会引发视图更新，否则就只是改了值但不更新视图）复杂一点的话就看对象的处理即可

```jsx
const [form, setForm] = useState({ name: "jack" });
const changeForm = () => {
    setForm({
        // ...是展开运算符，就是现在我们是要把form这个复杂的对象中的某一个值替换
        // 其他成分不变而把name字段替换最新的值
        // 这就好理解了，...form这里就是把原来form的所有的值都列出来
        // 下面的 name: 'john' 就是把上面原来的name给替换了
        ...form,
        name: "john",
    });
};
```

## React 中导入样式的写法

有三种，其实是两种

1. `<div style={{color: 'red'}}/>`行内样式控制：不推荐

2. 也是行内样式控制，但是比第一种是更推荐的，这种写法都适合简单样式的控制，要注意这里多字符的一般要写成**小驼峰**风格

```jsx
const style = {
    color: 'red',
    fontSize: '15px'
}

<div style={style}/>
```

3. 最推荐的写法，在 css 文件中写好，以类的方式引入

首先在 css 文件中定义一个类的样式

```css
/* index.css文件 */
.foo {
    color: blanchedalmond;
}
```

接着再导入引用，但是必须用 React 规定的`className`这个属性去接对应类名的样式

```jsx
import "./index.css";

<span className="foo" />;
```

这个`className`后面其实就是字符串，通常情况下可能有多个类名且这些类名何时添加是具有条件的，对于这样的情况传统使用\`\`（反引号）引起来做一个字符串拼接的效果，但是东西多了麻烦容易出错，所以用`classnames`这个 JS 类库去做，具体做法的区别如下：

```jsx
// 引入classnames类库的classNames方法
import classNames from "classnames";

className={classNames({check: type === item.type})}
className={`${type === item.type && 'check'}`}
```

这个`classNames`方法参数是可变长的，可以把不受条件控制的单纯类名用字符串的方式写进去，对于有条件控制的类名就可以用类似`{check: type === item.type}`的做法，这里的`check`就是条件控制的类名，后面的判断就是条件

## 受控绑定

何谓「受控绑定」？就是「状态变量」和「输入框内容」互相绑定，也就是说，状态变量的值是多少，输入框的值就是多少，反之亦然。

绑定的流程（即如何做到）？

注意**绑定 input 的 onChange 事件，通过事件参数 e 拿到输入框最新的输入值（e.target.value）**，这个就是最经典的获取输入框的值的做法

```jsx
// 1. 声明一个react状态变量，通过input的value属性绑定react的状态变量
// 2. 绑定input的onChange事件，通过事件参数e拿到输入框最新的输入值（e.target.value），反向修改到react的状态

const [value, setValue] = useState("");

<input value={value} onChange={(e) => setValue(e.target.value)} type="text" />;
```

## 获取 DOM

上面我们介 绍了 React 用`useState`函数控制「状态变量」，其实「获取 DOM」也有类似的做法，这里用的是`useRef`函数

```jsx
const inputRef = useRef(null); // 表示inputRef这个变量的初始值是null，现在还没有绑定到想要获取的DOM

// 利用ref去绑定，这样，这个input（DOM）就绑定到了inputRef这个变量上，就可以用inputRef去控制这个DOM了
<input ref={inputRef} />;
```

做法很简单，但是有一个注意点就是，`useRef`获取的绑定的 DOM，必须是**渲染好**以后的 DOM，也就是说一个被绑定的 DOM 渲染以后才能获取它，比如你要获取一个 input 输入框，那么你可以通过点击事件绑定获取这个 DOM，因为点击的时候一定已经渲染好了

## 关于时间格式的插件 dayjs

处理时间的插件`dayjs`，用`npm install dayjs`下载即可

用例展示：

```jsx
<span>当前时间为：{dayjs(new Date()).format("MM-DD HH:mm:ss")}</span>
```

## 关于组件通信

组件树 🌳（DOM）的结构就是树形的，组件之间的通信就是组件通信，通信方式又取决于组件之间是何种关系：父子通信-兄弟通信-跨层通信

### 父子通信

#### 01 父传子

1. 父组件**传递**给子组件值（这一步对应就是在父组件中声明子组件的时候，给子组件绑定一个属性，这就相当于给子组件传递：`<Son sonName={sonName}/>`）
2. 子组件**接受**父组件传递来的值（这一步对应就是在子组件函数声明的地方，首先接受一个名为`props`的参数，虽然不是强制这个名字但最好就起这个名字，这个`props`参数是一个对象，就是接受父组件传来的值，详细看下面的代码即可理解）

```jsx
function Son(props) {
    // props： 是一个对象，里面包含了父组件传递过来的所有数据
    // props对象的形式是 {父组件传来的参数名: 父组件传来的参数值}
    // 对于<Son sonName={sonName}/>，就是父组件给子组件传递了一个名为sonName的参数，值就是sonName这个变量的值
    console.log(props);
    return <div>this is son, {props.sonName}</div>;
}

function App() {
    const sonName = "this is app name";
    return (
        <div className="App">
            <div>
                <Son sonName={sonName} />
            </div>
        </div>
    );
}
```

关于`props`对象的说明：

1. 可传递任意的数据，包括数字、字符串、布尔值、数组、对象、函数、JSX

```jsx
<Son
    name={appName}
    age={20}
    isTrue={true}
    list={("Vue", "React")}
    obj={{ name: "jack" }}
    cb={() => console.log(123)}
    child={<span>this is a span child</span>}
/>
```

2. props 对象是一个「只读」的对象：子组件只能**读取 props 中的数据而不能修改**，父组件的数据只能有父组件修改（毕竟是父组件传递过来的）

3. 特殊的场景，上面父传子的时候，子组件都是「自闭合」的使用方法，如果是**给子组件嵌套一些标签**，那么这些标签就会自动被`props`对象默认的`children`属性接受

```jsx
<Son>
    <span>this is span</span>
</Son>;
// 就是上面的方式，这样的话，我们看到的props对象中，就会有默认的children属性
props;
children: <span />;
```

#### 02 子传父

子传父依赖于父传子，首先父组件要给子组件提供一个通信的方式（其实就是给子组件暴露一个函数），然后让子组件调用这个函数，父组件就可以接受消息

步骤也是两步：

1. 父组件给子组件提供函数（依靠父传子）

2. 子组件接受父组件提供的函数然后调用

```jsx
function Son2({ onGetSonMsg }) {
    // Son组件中的数据
    const sonMsg = "this is son msg";
    return (
        <div>
            this is Son
            {/*这里就是子组件调用父组件暴露的函数*/}
            <button onClick={() => onGetSonMsg(sonMsg)}>sendMsg</button>
        </div>
    );
}

function App() {
    // 父组件提供函数
    const [msg, setMsg] = useState("");
    const getMsg = (msg) => {
        // 代表发来什么msg就显示msg
        setMsg(msg);
    };

    return (
        <div className="App">
            <div>
                this is App, {msg}
                {/*这里就是父组件暴露给子组件的函数*/}
                <Son2 onGetSonMsg={getMsg} />
            </div>
        </div>
    );
}
```

这里看到上面的代码，子组件接受父组件传递给的函数（这里之前说过通信可以传递的东西是任意的，什么都可以传递），接受的时候这里不是用`props`这个对象去接受，而使用「解构表达式」，其实道理是一样，只是`function Son2({onGetSonMsg})`这样的写法就是直接使用`props`对象的成员`onGetSonMsg`，而不需要`props.onGetSonMsg`这样写了

### 兄弟通信

处于同一个父组件的兄弟组件之间的通信，其实很容易想到，就是利用同一个父组件传递消息。即 A 组件（子传父）发送到父组件，然后由父组件（父传子）发送到 B 组件，这样就实现了「兄弟组件之间的通信」

```jsx
function A({ onGetAName }) {
    const name = "this is A name";
    return (
        <div>
            this is A component
            <button onClick={() => onGetAName(name)}>send</button>
        </div>
    );
}

function B({ name }) {
    return <div>this is B component,{name}</div>;
}

function App() {
    // 父组件提供函数
    const [name, setName] = useState("");
    const getAName = (name) => {
        setName(name);
    };

    return (
        <div className="App">
            <div>
                <A onGetAName={getAName} />
                <B name={name} />
            </div>
        </div>
    );
}
```

### 跨层通信

嵌套结构，App -> A1 -> B1，要实现从 App 发送消息到 B1

使用`Context`机制跨层组件通信，实现步骤如下：

1. 使用`createContext`方法创建一个上下文对象`Ctx`（起一个名字）
2. 在顶层组件（App）中通过`Ctx.Provider`（这个对象的属性`Provider`）这个组件提供数据（说白了这个组件用来形成上下文结构，然后用`value`属性作为传递消息的媒介）
3. 在底层组件（B）中通过`useContext`钩子函数获取消费数据

```jsx
// 1. 使用createContext方法创建上下文对象
const MsgContext = createContext();

function A1() {
    return (
        <div>
            this is A component
            {/*0. A1嵌套B1组件，将A1放进App，形成一个跨层的组件*/}
            <B1 />
        </div>
    );
}

function B1() {
    // 3. 在底层组件通过useContext钩子函数使用传过来的数据
    const receiveMsg = useContext(MsgContext);
    return <div>this is B component,{receiveMsg}</div>;
}

function App() {
    const msg = "this is msg";

    return (
        <div className="App">
            <div>
                {/*2. 使用Ctx.Provider组件包含，形成一个嵌套结构，通过该结构的value属性提供数据（就是要发送的数据）*/}
                <MsgContext.Provider value={msg}>
                    this is App
                    <A1 />
                </MsgContext.Provider>
            </div>
        </div>
    );
}
```

## useEffect

需求：在组建渲染完毕之后，立刻从服务端获取数据并显示到页面上

语法：`useEffect(() => {}, [])`

第一个参数即「回调函数」，可以叫作副作用函数，在函数内部执行你想实现的操作

第二个参数数组（可选参数），在数组中放置「依赖项」，不同依赖项会影响回调函数的执行，**当传入的是空数组的时候，回调函数只会在组件渲染完毕以后执行一次**

```jsx
import { useEffect } from "react";

function App() {
    useEffect(
        () => {
            // 执行操作
        },
        //传入空数组，渲染后执行一次
        []
    );
}
```

关于第二个参数：

1. 没有依赖项：组件初始渲染 + 组件更新时执行
2. 空数组：只在初始渲染时执行一次
3. 添加特定依赖项：组件初始渲染 + 特性依赖项变化时执行

### useEffect 清除副作用

在`useEffect`中编写的**由渲染本身引起的对接组件外部的操作**（即副作用），想在组件卸载时清理的过程就叫清理副作用

比如在 useEffect 中打开了一个定时器，卸载组件的时候要把这个定时器清理掉，就是清理副作用

语法就是，在 useEffect 的第一个参数（就是那个渲染完毕后启动的逻辑函数）中加入一个 return，在这个 return 中就是清理副作用的时候执行的代码逻辑

```jsx
useEffect(() => {
    // 实现副作用逻辑
    return () => {
        // 清理副作用的逻辑
    };
});
```

## 自定义 Hook 函数（钩子函数）

所谓 Hook 函数，是 React 自带的一些函数，实习自定义 Hook 函数，就可以把一些函数封装和复用。

自定义 Hook 函数的步骤：

1. 声明一个以`use`开头的函数
2. 在函数体内封装可以复用的逻辑（只要是可复用的逻辑即可）
3. 把组件中用到的状态或者回调`return`出去（以对象或者数组的方式）
4. 在哪个组件中要用到这个逻辑就执行这个 Hook 函数，解构出来状态和回调进行使用

举例：未封装 Hook 函数之前，我们要实现一个条件显示需要如下

```jsx
function App() {
    const [condition, setCondition] = useState(true);
    const toggle = () => setCondition(!condition);

    return (
        <div>
            {condition && <div>this is div</div>}
            <button onClick={toggle}>toggle</button>
        </div>
    );
}
```

如果我们还有别的组件也是希望通过点击确定是否显示，其实是同样的逻辑，但我们还要重新写这个逻辑，不能复用

```jsx
function useToggle() {
    const [condition, setCondition] = useState(true);
    const toggle = () => setCondition(!condition);
    return {
        condition,
        toggle,
    };
}

function App() {
    const { condition, toggle } = useToggle();
    return (
        <div>
            {condition && <div>this is div</div>}
            <button onClick={toggle}>toggle</button>
        </div>
    );
}
```

## React 的 Hook 函数使用规则

1. 只能在组件中或者其他自定义 Hook 函数中调用
2. 只能在组件的顶层调用，不能嵌套在`if`、`for`、其他函数中

## Redux——集中状态管理工具

Redux 是 React 中最常用的**集中状态管理工具**，可以**独立于框架运行**。作用：通过集中管理的方式管理应用的状态

为了职责清晰数据流向明确，Redux 把整个数据修改的流程分为三个核心概念：state、action 和 reducer

1. state：是一个对象，用于存放管理的数据状态
2. action：是一个对象，用于描述变更数据状态的逻辑
3. reducer：是一个函数，根据`action`的变更逻辑生成新的`state`

要用两个插件：Redux Toolkit（Redux 的一套工具集合，简化书写方式）、react-redux（用来链接 Redux 和 React 组件的中间件）

```
npx create-react-app react-redux
npm i @reduxjs/toolkit react-redux
npm run start
```

下载好插件以后，在`package.json`中可以看到：

```json
"@reduxjs/toolkit": "^2.3.0",
"react-redux": "^9.1.2",
```

### 设计 store 目录结构（集中状态管理工具一般都这样设置结构）

1. 通常集中状态管理的部分都会单独创建一个`store`目录
2. 应用通常会有很多个`子store模块`，创建一个`modules`目录，内部编写所有的`子store`
3. `store`的入口文件`index.js`的作用是组合`modules`的所有子模块并导出`store`

### 计数器案例（步骤就按照这样）

#### 1. 创建一个子模块，用于存储计数器的 state

在这里利用 toolkit 里面的`createSlice`方法创建子模块的 store，在其中可以设定名字，设定初始值，设定修改的方法（这里的`reducers`涵盖的就是引起数据变更的`action`对象对应的变更逻辑），最后我们**导出创建 action 对象的函数和 reducer 函数**

```jsx
/*counterStore.js*/
import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
    // 指定一个名字
    name: "counter",
    // 设定初始数据状态
    initialState: {
        count: 0,
    },
    // 修改数据的同步方法（注意，这里Redux是支持直接修改的！！！）
    reducers: {
        increment(state) {
            state.count++;
        },
        decrement(state) {
            state.count--;
        },
    },
});

// 解构出创建action对象的函数(就是引发变化的函数，就是上面的reducers里面的)
const { increment, decrement } = counterStore.actions;

// 获取reducers函数
const counterReducer = counterStore.reducer;

// 导出创建action对象的函数（语义化为actionCreater方法）和reducer函数
export { increment, decrement };
export default counterReducer;
```

#### 2. 创建 store 组合子模块

根据模块设计结构，`store`目录下有`index.js`，用于组合`modules`的所有子模块并导出`store`。步骤就是用工具包下面的`configureStore`函数做配置，最后把这个`store`导出（其实这个`store`就是组合意义了，可以包含所有我们想要的`modules`）

```jsx
/*负责store的index.js（./store/index.js）*/
import { configureStore } from "@reduxjs/toolkit";
// 导入写好的子模块store
import counterReducer from "./modules/counterStore";

// 创建store组合子模块
const store = configureStore({
    reducer: {
        // const { count } = useSelector((state) => state.counter)，在这里就是用这个名字
        counter: counterReducer,
    },
});

export default store;
```

#### 3. 使用 react-redux 中间件

react-redux 这个中间件的意义就是把 redux 和 react 之间链接，首先我们用其提供的`<Provider/>`组件包含我们原来的`<APP/>`组件，并把刚刚导出的`store`传递进去即可

```jsx
/*整个项目的index.js(./index.js)*/
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// 导入刚刚导出的store，引入工具中的Provider组件
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* 用Provider组件包围App，并将store传递 */}
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
```

#### 4. 使用和修改 store 中的数据

主要是借助两个钩子函数`useSelector`和`useDispatch`

`useSelector`：可以在 React 组件中使用`store`中的数据，作用是把`store`中的数据映射到组件上

`useDispatch`：修改 React 组件中`store`的数据，作用是生成提交`action`对象的`dispatch`函数

```jsx
/*App.js*/
import { useSelector, useDispatch } from "react-redux";
// 导入store模块中导出的actionCreater方法
import { decrement, increment } from "./store/modules/counterStore";

function App() {
    // 使用useSelector这个钩子函数可以在React组件中使用store中的数据，作用是把store中的数据映射到组件上
    const { count } = useSelector((state) => state.counter);
    // 得到dispatch函数,使用useDispatch这个钩子函数修改React组件中store的数据，作用是生成提交action对象的dispatch函数
    const dispatch = useDispatch();
    return (
        <div className="App">
            {/* 调用dispatch提交action对象 */}
            <button onClick={() => dispatch(decrement())}>-</button>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
        </div>
    );
}

export default App;
```

这里也看到了，`dispatch`是用于提交`action`对象的函数，这里我们的 ➕ 和 ➖ 操作是控制加减的两个方法（`increment`和`decrement`），注意了在`dispatch`这个函数执行中是`decrement()`和`increment()`也就是传递的是这两个函数是执行的结果

### 提交 action 传参

还是之前的计数器，但是需要两个按钮，实现点击一步跳跃到 10，一部跳跃到 20，这就需要传参了

实现方法：在`reducers`的同步修改方法中添加`action`对象参数，在调用`actionCreator`时传递参数，参数会自动被传提到`action`对象的`payload`属性上

```jsx
/*counterStore.js*/
import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
    // ...和之前一样
    // 修改数据的同步方法
    reducers: {
        // ...和之前一样
        addToNum(state, action) {
            state.count = action.payload;
        },
    },
});
// 解构出创建action对象的函数(就是引发变化的函数，就是上面的reducers里面的)
const { increment, decrement, addToNum } = counterStore.actions;
// ...和之前一样
// 导出创建action对象的函数和reducer函数
export { increment, decrement, addToNum };
export default counterReducer;
```

```jsx
/* App.js */
import { useDispatch, useSelector } from "react-redux";
// 导入创建action对象的方法
import { decrement, increment, addToNum } from "./store/modules/counterStore";

function App() {
    // ...和之前一样
    const dispatch = useDispatch();
    return (
        <div className="App">
            {/* ...和之前一样 */}
            <button onClick={() => dispatch(addToNum(10))}>add to 10</button>
            <button onClick={() => dispatch(addToNum(20))}>add to 20</button>
        </div>
    );
}

export default App;
```

主要就是在`dispatch`执行的方法（`actionCreator`方法）传入的参数，就会赋值给`action.payload`

### 异步方式（前面是同步，异步除关键步骤不同以外都一样）

所谓异步方式，实际就是显示数据是异步请求得到的，下面是关键不同

```JSX
/*channelStore.js*/
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// 还是根据createSlice方法创建store
const channelStore = createSlice({
// 这里的name属性才是store的数据的名称
name: 'channel',
// 初始值是空数组
initialState: {
    channelList: []
},
// [!code focus: 7]
// 异步请求这里也是依靠传参会自动赋值给action的payload属性
reducers: {
    setChannels(state, action) {
        state.channelList = action.payload
    }
}
})

const url = 'http://geek.itheima.net/v1_0/channels'
const { setChannels } = channelStore.actions

// 异步获取数据的做法，跟同步的区别在于下面
// 单独封装一个[函数]，在函数内部[return一个新函数]，新函数中
// 1. 封装异步请求获取数据(这里为什么传入dispatch其实跟前面的案例类似)
// 加减的操作对应于这里数据请求的操作，异步请求得到结果，然后把结果设置成新的状态从而生成新的action对象
// 然后这个action对象在被dispatch，即下面的2
// 2. 调用同步actionCreator传入异步数据生成一个action对象并dispatch提交
const fetchChannelList = () => {
return async (dispatch) => {
    const res = await axios.get(url)
    dispatch(setChannels(res.data.data.channels))
}
}

const channelReducer = channelStore.reducer

export { fetchChannelList }
export default channelReducer
```

紧接着就是之前的`modules`的组合，把新写的子模块组合即可

```JSX
import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./modules/counterStore";
import channelReducer from "./modules/channelStore";

// 创建store组合子模块
const store = configureStore({
reducer: {
    counter: counterReducer,
    channel: channelReducer
}
})

export default store
```

再然后就是在组件中使用了

```JSX
import { useDispatch, useSelector } from "react-redux";
// 导入创建action对象的方法
import { decrement, increment, addToNum } from "./store/modules/counterStore";
import { fetchChannelList } from "./store/modules/channelStore";
import { useEffect } from "react";

function App() {
// 使用useSelector这个钩子函数可以在React组件中使用store中的数据，作用是把store中的数据映射到组件上
const { count } = useSelector(state => state.counter)
// [!code focus: 2]
const { channelList } = useSelector(state => state.channel)
// 得到dispatch函数,使用useDispatch这个钩子函数修改React组件中store的数据，作用是生成提交action对象的dispatch函数
const dispatch = useDispatch()

// [!code focus: 5]
// 使用useEffect触发异步请求,就是在渲染组件后调方法，并且「依赖项」是dispatch
useEffect(() => {
dispatch(fetchChannelList())
}, [dispatch])

return (
<div className="App">
    {/* 调用dispatch提交action对象 */}
    <button onClick={() => dispatch(decrement())}>-</button>
    <span>{count}</span>
    <button onClick={() => dispatch(increment())}>+</button>
    <button onClick={() => dispatch(addToNum(10))}>add to 10</button>
    <button onClick={() => dispatch(addToNum(20))}>add to 20</button>
    {/* 渲染 */}
    <ul>
    {channelList.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
</div>
);
}

export default App;
```

补充一个原生 js 的方法

```JavaScript
/*
reduce()
功能：从左到右对数组每个元素进行累计计算，最终返回一个累加的结果。
*/
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((total, num) => total + num, 0); // 10
```

## React-Route 前端路由

需要导入 ReactRouter 包`npm i react-router-dom`

### 什么是前端路由

一个路径 path 对应一个组件 component，当我们在浏览器中访问一个 path 的时候，path 对应的组件会在页面中进行渲染

```JavaScript
const routes = [
{
    path: '/about',
    component: About,
},
{
    path: '/article',
    component: Article,
},
]
```

简单做法：引入`'react-router-dom'`中的`createBrowserRouter, RouterProvider`，利用他们创建路由，并用 Provider 作为路由外层

```JSX
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
{
path: '/login',
element: <div>我是登录页面</div>
},
{
path: '/article',
element: <div>我是文章页面</div>
},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<RouterProvider router={router}></RouterProvider>
</React.StrictMode>
);
```

上面的做法有些问题，实际在做的时候我们会把`router`单独抽取出来，作为针对「路由」的模块

其次，在路由中设定的元素也不是简单的`<div>`而是复杂的组件，上面只是简单的使用示例

### 拆分模块细致的做法

为什么要拆分也是为了每个模块能各司其职，互相不混乱，我们的做法就是`page`（react 更喜欢称为页面式的组件）模块放各种组件，然后单独声明一个`router`模块，专门做路由部分
这样做更加细致一些，如下举例

```JSX
/* /page/Login/index.js */
const login = () => {
return <div>我是登录页面</div>
}

export default Login

/* /page/Article/index.js */
const Article = () => {
return <div>我是文章页面</div>
}

export default Article

/* /router/index.js */
import Login from '../page/Login'
import Article from '../page/Article'

import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
{
    path: '/login',
    element: <Login />
},
{
    path: '/article',
    element: <Article />
},
])

export default router

/* /index.js */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import router from './router'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<RouterProvider router={router}></RouterProvider>
</React.StrictMode>
);
```

从上面可以看到，这样的做法就是为组件单独拆分，也更推荐这样做

## ReactRouter - 路由导航

解释： 路由系统中的多个路由之间需要进行「路由跳转」，并且跳转的同时可能还需要「传递参数进行通信」

### 路由导航跳转

跳转有两种方式：

1. 声明式导航
   通过在模板中「通过`<Link/>`组件描述出要跳转到哪里去」，这种比较简单，比如后台管理系统的左侧菜单通常用这种方式
   通过`to属性`指定要跳转到路由`path`，组件会被渲染为浏览器支持的`a`链接，如果需要传参，直接「通过字符串拼接」的方式拼接参数即可

```JSX
<Link to="/article">文章</Link>
```

2. 编程式（命令式）导航
   通过`useNavigate`钩子得到导航方法，然后通过「调用方法以命令式的形式」进行路由跳转，比如想在登录请求完成之后跳转就可以选择这种方式，更加灵活

```JSX
import {Link, useNavigate} from 'react-router-dom'
const Login = () => {
const navigate = useNavigate()
return(
    <div>
        我是登录页
        {/* 声明式的写法 */}
        <Link to="/article">跳转至文章页</Link>
        {/* 命令式的写法 */}
        <button onClick={() => navigate('/article')}>跳转至文章页</button>
    </div>
)
}
```

### 路由导航传参

两种方式：主要就是利用`useSearchParams`和`useParams`两个钩子函数获取传来的参数，用法上稍有不同

1. useSearchParams 的方式
   这个钩子函数的用法有点类似于`getElementById`，因此用法非常简单

    ```JSX
    {/* searchParams方式传参，这种方式只需要在navigate中写入请求参数 */}
    <button onClick={() => navigate('/article?id=1001&name=jack')}>searchParams跳转至文章页</button>
    ```

    这样的传参样式类似于一般浏览器请求的参数，因此做法比较简单，当我们在跳转到的页面中接受传来的参数的时候，只需要按下面的做法

    ```JSX
    // 解构表达式，params是useSearchParams这个函数返回的一个东西，必须用params
    // 这个params是一个对象，里面有get方法，类似于getElementById的用法
    const [params] = useSearchParams()

    const id = params.get('id')
    const name = params.get('name')
    ```

    接下来就可以在想要渲染的位置渲染

2. useParams 的方式
   这个钩子函数做法就是事先在`router`组件中绑定好传参的属性，得到的`params`就是一个包含了绑定好属性的对象，可以用`.`操作符得到结果
    ```JSX
    {/* params方式传参，这种方式在navigate中传参形式比较简单，但是需要在router路由中提前绑定参数 */}
    {/* 这两个方式选一种 */}
    <button onClick={() => navigate('/article/1002/york')}>params跳转至文章页</button>
    ```
    通过这种方式传参，接着在`router`组件中绑定好传参的属性
    ```JSX
    {
        path: '/article/:id/:name',
        element: <Article />
    },
    ```
    `Article`是跳转后的页面，在`Article`中接受传来的参数，因此按照上面的在`router`中绑定好传参属性，`:id`这个意思就是绑定属性
    接着，就可以在 Article 中使用传来的参数
    ```JSX
    // useParams函数同意放回一个params，跟上面类似，但是这个对象有事先在router中配置以后而绑定好的属性
    const params2 = useParams()
    const id2 = params2.id
    const name2 = params2.name
    ```

### 嵌套路由配置

所谓嵌套路由，就是很经典的子路由这样嵌套格式的，比如一个页面中固定组件不变化，有专门一个显示区域是嵌套路由决定显示的

做法如下：先在路由中如下设置嵌套结构

```JSX
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'board',
                element: <Board />,
            },
            {
                path: 'about',
                element: <About />,
            },
        ]
    },
```

其中`Layout`组件的结构是嵌套结构，组件定义如下。重点在于这里的`<Outlet />`组件，这是专门针对嵌套路由的组件，上面定义的`<Layout />`组件中的子结构显示区域就在这个`<Outlet />`组件中。

```JSX
import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            我是Layout页面
            <Link to="/board">面板</Link>
            <Link to="/about">关于</Link>
            {/* 二级路由出口, 要用Outlet这个组件 */}
            <Outlet />
        </div>
    )
}

export default Layout
```

如果想要将某一个嵌套路由设置成默认的，即访问的是一级路由的时候就可以展示默认二级路由而不需要跳转

```JSX
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Board />,
            },
            {
                path: 'about',
                element: <About />,
            },
        ]
    },
```

如上，只需要把想要设置成默认的二级路由的`path`属性去掉，转而设置`index=true`属性，这样这个二级路由将成为该一级路由的默认路由

### 配置 NotFound 页面

NotFound 是经常会有的 404（文件资源找不到）的提示页面，这个组件通常需要专门设计 NotFound 的组件，在路由配置的时候只需要`path='*'`将这个组件匹配即可

```JSX
{
    path: '*',
    element: <NotFound />,
},
```

### 两种路由模式

各个主流框架的路由常用的路由模式有两种，`history`模式和`hash`模式，ReactRouter 分别由`createBrowserRouter`和`createHashRouter`函数负责创建，区别如下：
hash 模式只需要把创建路由的 api 替换成`createHashRouter`即可，其他地方不需要变化

<table>
<tr>
    <th>
        路由模式
    </th>
    <th>
        url表现
    </th>
    <th>
        底层原理
    </th>
    <th>
        是否需要后端支持
    </th>
</tr>
<tr>
    <td>history</td>
    <td>url/login</td>
    <td>history对象 + pushState事件</td>
    <td>需要</td>
</tr>
    <td>hash（很多都使用）</td>
    <td>url/#/login</td>
    <td>监听 hashChange事件</td>
    <td>不需要</td>
</tr>
</table>

## 配置别名路径@

就是在 Vue 中常见的`@`符号的解析，其实这分为两点内容

1. 路径解析的配置（交给 Webpack，Webpack 是一个打包模块化 javascript 的工具）：**把@/ 解析成 src/**
   需要用到`craco`插件
   CRA(就是我们创建项目的时候用的指令`create-react-app`)本身把 WebPack 配置包装到了黑盒里无法直接修改，修改需要借助插件，就是`craco`

    配置过程：

    1. 安装`craco`：输入指令`npm i -D @craco/craco` (-D 就是安装在开发环境)
    2. 项目根目录下创建配置文件：`craco.config.js`
    3. 配置文件中添加路径解析的配置

    ```JSX
     const path = require('path');

     module.exports = {
         // webpack 配置
         webpack: {
             // 配置别名
             alias: {
                 // 约定使用@表示src文件路径，__dirname表示项目根目录（就是输入启动项目的路径，不是src）
                 '@': path.resolve(__dirname, 'src')
             }
         }
     }
    ```

    4. 包文件中配置启动和打包命令（在 package.json 中修改这些启动命令）

    ```json
     "scripts": {
         "start": "craco start",
         "build": "craco build"
     }
    ```

2. 路径联想配置（针对于编辑器的联想，比如 Vscode）:在 Vscode 中输入 @/ 时，自动联想出对应的 src/ 下面的子集目录
   需要用到`jsconfig.js`，同样实在项目根目录创建，之后 Vscode 就可以联想

    ```json
    {
        "compilerOptions": {
            "baseUrl": "./",
            "paths": {
                "@/*": ["src/*"]
            }
        }
    }
    ```

## SCSS

SCSS 是一种后缀为`.scss`的**预编译 CSS**语言，支持一些原生 CSS 不支持的高级用法，比如变量使用，嵌套语法等，使用 SCSS 可以让样式代码更加**高效灵活**

使用`CRA`项目引入`SCSS`，使用指令`npm install sass -D`

## Ant Design

由蚂蚁金服出品的社区使用最广泛的 React **PC 端组件库**，内置了常用的现成组件

安装指令：`npm install antd --save`，[详见官网](https://ant-design.antgroup.com/docs/react/use-with-create-react-app-cn)：
