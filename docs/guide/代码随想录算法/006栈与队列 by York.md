# 栈与队列专题

## 专题题目

### 232.用栈实现队列

1. 题目

   使用栈实现队列的下列操作：

   push(x) -- 将一个元素放入队列的尾部。
   pop() -- 从队列首部移除元素。
   peek() -- 返回队列首部的元素。
   empty() -- 返回队列是否为空。

   示例:

   ```java
   MyQueue queue = new MyQueue();
   queue.push(1);
   queue.push(2);
   queue.peek();  // 返回 1
   queue.pop();   // 返回 1
   queue.empty(); // 返回 false
   ```

   说明:

   - 你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
   - 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
   - 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。

2. 思路

   我的思路是让其中一个栈作为按队列逻辑存放的栈，另一个栈用来辅助即可

   最重要就是入栈，只需要在入栈前，把结果栈的数据全都pop到辅助栈后将目标值push入结果栈，再把辅助栈中的数据全都pop到结果栈，这样就保证了结果栈是按照队列的逻辑存放的，也就是说其实是栈的逆序，所以这样出站的时候就是队列那样，先进先出啦

3. 我的代码

   ```java
   class MyQueue {
       
       Stack<Integer> helpStack;
       Stack<Integer> queueStack;
       
       public MyQueue() {
           this.helpStack = new Stack<>();
           this.queueStack = new Stack<>();
       }
       
       public void push(int x) {
           while(!queueStack.empty()){
               helpStack.push(queueStack.pop());
           }
           queueStack.push(x);
           while(!helpStack.empty()){
               queueStack.push(helpStack.pop());
           }
       }
       
       public int pop() {
           return queueStack.pop();
       }
       
       public int peek() {
           return queueStack.peek();
       }
       
       public boolean empty() {
           return queueStack.empty();
       }
   }
   
   /**
    * Your MyQueue object will be instantiated and called as such:
    * MyQueue obj = new MyQueue();
    * obj.push(x);
    * int param_2 = obj.pop();
    * int param_3 = obj.peek();
    * boolean param_4 = obj.empty();
    */
   ```
   
4. 官方推荐

   ```java
   class MyQueue {
       Deque<Integer> inStack;
       Deque<Integer> outStack;
   
       public MyQueue() {
           inStack = new ArrayDeque<Integer>();
           outStack = new ArrayDeque<Integer>();
       }
   
       public void push(int x) {
           inStack.push(x);
       }
   
       public int pop() {
           if (outStack.isEmpty()) {
               in2out();
           }
           return outStack.pop();
       }
   
       public int peek() {
           if (outStack.isEmpty()) {
               in2out();
           }
           return outStack.peek();
       }
   
       public boolean empty() {
           return inStack.isEmpty() && outStack.isEmpty();
       }
   
       private void in2out() {
           while (!inStack.isEmpty()) {
               outStack.push(inStack.pop());
           }
       }
   }
   
   作者：力扣官方题解
   链接：https://leetcode.cn/problems/implement-queue-using-stacks/solutions/632369/yong-zhan-shi-xian-dui-lie-by-leetcode-s-xnb6/
   来源：力扣（LeetCode）
   著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
   ```
   
   

### 225. 用队列实现栈

1. 题目

   使用队列实现栈的下列操作：

   - push(x) -- 元素 x 入栈
   - pop() -- 移除栈顶元素
   - top() -- 获取栈顶元素
   - empty() -- 返回栈是否为空

   注意:

   - 你只能使用队列的基本操作-- 也就是 push to back, peek/pop from front, size, 和 is empty 这些操作是合法的。
   - 你所使用的语言也许不支持队列。 你可以使用 list 或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。
   - 你可以假设所有操作都是有效的（例如, 对一个空的栈不会调用 pop 或者 top 操作）。  

2. 思路 

   **其实很多算法题目主要是对知识点的考察和教学意义远大于其工程实践的意义，所以面试题也是这样！**

   **队列模拟栈，其实一个队列就够了**，那么我们先说一说两个队列来实现栈的思路。

   **队列是先进先出的规则，把一个队列中的数据导入另一个队列中，数据的顺序并没有变，并没有变成先进后出的顺序。**

   但是依然还是要用两个队列来模拟栈，只不过没有输入和输出的关系，而是另一个队列完全用来备份的！

   如下面动画所示，**用两个队列que1和que2实现队列的功能，que2其实完全就是一个备份的作用**，把que1最后面的元素以外的元素都备份到que2，然后弹出最后面的元素，再把其他元素从que2导回que1。

   模拟的队列执行语句如下：

   ```java
   queue.push(1);        
   queue.push(2);        
   queue.pop();   // 注意弹出的操作       
   queue.push(3);        
   queue.push(4);       
   queue.pop();  // 注意弹出的操作    
   queue.pop();    
   queue.pop();    
   queue.empty();    
   ```

   ![225.用队列实现栈](https://code-thinking.cdn.bcebos.com/gifs/225.%E7%94%A8%E9%98%9F%E5%88%97%E5%AE%9E%E7%8E%B0%E6%A0%88.gif)

   如果只有一个队列实现栈的话，为了实现由本应该“先进先出”的队列变成“先进后出”的栈，我们相当于每次都让队列的最后一个元素出队列就好，那么我们需要做的，就是把最后一个元素以前的元素出队然后入队，这样就相当于让队列中最后一个元素跑到了最前面

4. 官方推荐

   ```java
   class MyStack {
       //q1作为主要的队列，其元素排列顺序和出栈顺序相同
       Queue<Integer> q1 = new ArrayDeque<>();
       //q2仅作为临时放置
       Queue<Integer> q2 = new ArrayDeque<>();
   
       public MyStack() {
   
       }
       //在加入元素时先将q1中的元素依次出栈压入q2，然后将新加入的元素压入q1，再将q2中的元素依次出栈压入q1
       public void push(int x) {
           while (!q1.isEmpty()) {
               q2.add(q1.poll());
           }
           q1.add(x);
           while (!q2.isEmpty()) {
               q1.add(q2.poll());
           }
       }
   
       public int pop() {
           return q1.poll();
       }
   
       public int top() {
           return q1.peek();
       }
   
       public boolean empty() {
           return q1.isEmpty();
       }
   }
   ```
   

### 20. 有效的括号

1. 题目

   - 给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

     有效字符串需满足：

     1. 左括号必须用相同类型的右括号闭合。
     2. 左括号必须以正确的顺序闭合。
     3. 每个右括号都有一个对应的相同类型的左括号。

      

     **示例 1：**

     ```
     输入：s = "()"
     输出：true
     ```

     **示例 2：**

     ```
     输入：s = "()[]{}"
     输出：true
     ```

     **示例 3：**

     ```
     输入：s = "(]"
     输出：false
     ```

      

     **提示：**

     - `1 <= s.length <= 104`
     - `s` 仅由括号 `'()[]{}'` 组成

      

2. 思路

   我的思路是：扫描输入串，只让左括号入栈，遇到右括号就要和当前栈顶匹配，匹配成功就出栈，继续扫描剩下的

   没匹配成功就错了，最后扫描完如果栈是空的就成功了 

   这里有三种不匹配的情况，

   1. 第一种情况，字符串里左方向的括号多余了 ，所以不匹配。 ![括号匹配1](https://code-thinking-1253855093.file.myqcloud.com/pics/2020080915505387.png)
   2. 第二种情况，括号没有多余，但是 括号的类型没有匹配上。 ![括号匹配2](https://code-thinking-1253855093.file.myqcloud.com/pics/20200809155107397.png)
   3. 第三种情况，字符串里右方向的括号多余了，所以不匹配。 ![括号匹配3](https://code-thinking-1253855093.file.myqcloud.com/pics/20200809155115779.png)

   **太秀了！**正是因为我们只考虑括号匹配问题，我们只需要在左括号入栈的时候，将入栈元素变成该左括号对应的右括号，这样的话，我们扫描字符串到右括号的时候，就可以直接去比较出栈元素和当前字符是不是一样的！！！这样就省去了不少时间！

3. 我的代码

   ```java
   class Solution {
       public boolean isValid(String s) {
           if (s.charAt(0) == ')' || s.charAt(0) == ']' || s.charAt(0) == '}'
                   || s.charAt(s.length() - 1) == '(' || s.charAt(s.length() - 1) == '['
                   || s.charAt(s.length() - 1) == '{')
               return false;
           Stack<Character> stack = new Stack<>();
           for (int i = 0; i < s.length(); i++) {
               char head = s.charAt(i);
               // 只把左括号入栈即可
               if (head == '(' || head == '[' || head == '{') {
                   stack.push(s.charAt(i));
               } else if (!stack.empty() && isMatch(stack.peek(), head)) {
                   stack.pop();
                   // 右括号的话需要匹配
               }else{
                   return false;
               }
           }
           // 最后栈空才是匹配
           return stack.empty();
       }
       public boolean isMatch(char pre, char back){
           return (pre == '(' && back == ')') || (pre == '[' && back == ']') || (pre == '{' && back == '}'); 
       }
   }
   ```

4. 官方推荐

   ```java
   class Solution {
       public boolean isValid(String s) {
           Deque<Character> deque = new LinkedList<>();
           char ch;
           for (int i = 0; i < s.length(); i++) {
               ch = s.charAt(i);
               //碰到左括号，就把相应的右括号入栈
               if (ch == '(') {
                   deque.push(')');
               }else if (ch == '{') {
                   deque.push('}');
               }else if (ch == '[') {
                   deque.push(']');
               } else if (deque.isEmpty() || deque.peek() != ch) {
                   return false;
               }else {//如果是右括号判断是否和栈顶元素匹配
                   deque.pop();
               }
           }
           //最后判断栈中元素是否匹配
           return deque.isEmpty();
       }
   }
   ```
   

### 	1047. 删除字符串中的所有相邻重复项

1. 题目

   给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。

   在 S 上反复执行重复项删除操作，直到无法继续删除。

   在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

   示例：

   - 输入："abbaca"
   - 输出："ca"
   - 解释：例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。

   提示：

   - 1 <= S.length <= 20000
   - S 仅由小写英文字母组成。

      

2. 思路

    

3. 我的代码

   ```java
   class Solution {
       public String removeDuplicates(String s) {
           Stack<Character> stack = new Stack<>();
           for (int i = 0; i < s.length(); i++) {
               if (!stack.empty() && stack.peek() == s.charAt(i)) {
                   stack.pop();
                   continue;
               }
               stack.push(s.charAt(i));
           }
           String newStr = "";
           // 逆序即可
           while (!stack.empty()) {
               newStr = stack.pop() + newStr;
           }
           return newStr;
       }
   }
   ```

4. 官方推荐

   ```java
   class Solution {
       public String removeDuplicates(String s) {
           StringBuffer stack = new StringBuffer();
           int top = -1;
           for (int i = 0; i < s.length(); ++i) {
               char ch = s.charAt(i);
               if (top >= 0 && stack.charAt(top) == ch) {
                   stack.deleteCharAt(top);
                   --top;
               } else {
                   stack.append(ch);
                   ++top;
               }
           }
           return stack.toString();
       }
   }
   
   ```
   

### 150. 逆波兰表达式求值【中等】

1. 题目

   根据 逆波兰表示法，求表达式的值。

   有效的运算符包括 + , - , * , / 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。

   说明：

   **整数除法只保留整数部分**。 **给定逆波兰表达式总是有效的**。换句话说，**表达式总会得出有效数值且不存在除数为 0 的情况。**

   示例 1：

   - 输入: ["2", "1", "+", "3", " * "]
   - 输出: 9
   - 解释: 该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9

   示例 2：

   - 输入: ["4", "13", "5", "/", "+"]
   - 输出: 6
   - 解释: 该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6

   示例 3：

   - 输入: ["10", "6", "9", "3", "+", "-11", " * ", "/", " * ", "17", "+", "5", "+"]

   - 输出: 22

   - 解释:该算式转化为常见的中缀算术表达式为：

     ```text
     ((10 * (6 / ((9 + 3) * -11))) + 17) + 5       
     = ((10 * (6 / (12 * -11))) + 17) + 5       
     = ((10 * (6 / -132)) + 17) + 5     
     = ((10 * 0) + 17) + 5     
     = (0 + 17) + 5    
     = 17 + 5    
     = 22    
     ```

   **逆波兰表达式：是一种后缀表达式，所谓后缀就是指运算符写在后面。**

   平常使用的算式则是一种中缀表达式，如 ( 1 + 2 ) * ( 3 + 4 ) 。

   该算式的逆波兰表达式写法为 ( ( 1 2 + ) ( 3 4 + ) * ) 。

   逆波兰表达式主要有以下两个优点：

   - 去掉括号后表达式无歧义，上式即便写成 1 2 + 3 4 + * 也可以依据次序计算出正确结果。
   - 适合用**栈**操作运算：遇到数字则入栈；遇到运算符则取出栈顶两个数字进行计算，并将结果压入栈中。

2. 思路

   好说，遍历给定的逆波兰表达式转换的字符数组，是操作数就入栈，是操作符就出栈两个元素，用**后出栈的元素 操作符对应的运算 先出栈的元素**，接着把最后的结果压入操作数栈即可，最后操作数栈应该只有一个元素，就是最后的结果啦 

   

   ！！！其实可以用递归思路来写

   **栈与递归之间在某种程度上是可以转换的！** 这一点我们在后续讲解二叉树的时候，会更详细的讲解到。

   那么来看一下本题，**其实逆波兰表达式相当于是二叉树中的后序遍历**。 大家可以把运算符作为中间节点，按照后序遍历的规则画出一个二叉树。 

3. 我的代码

   ```java
   class Solution {
           public int evalRPN(String[] tokens) {
           Stack<Integer> operateStack = new Stack<>();
           for (int i = 0; i < tokens.length; i++) {
               if (tokens[i].equals("+") || tokens[i].equals("-") || tokens[i].equals("*")
                       || tokens[i].equals("/") && operateStack.size() >= 2) {
                   int backNum = operateStack.pop();
                   int preNum = operateStack.pop();
                   int result = 0;
                   switch (tokens[i].charAt(0)) {
                       case '+':
                           result = preNum + backNum;
                           break;
                       case '-':
                           result = preNum - backNum;
                           break;
                       case '*':
                           result = preNum * backNum;
                           break;
                       case '/':
                           result = preNum / backNum;
                           break;
                   }
                   operateStack.push(result);
               } else {
                   operateStack.push(Integer.parseInt(tokens[i]));
               }
           }
           return operateStack.pop();
       }
   }
   ```

4. 官方推荐

   ```java
   class Solution {
       private int index = 0;
       public int evalRPN(String[] tokens) {
           //return evalStack(tokens);
           index = tokens.length - 1;
           return eval(tokens);
       }
   
       //使用栈的方式
       private int evalStack(String[] tokens) {
           if (tokens.length == 0) return 0;
   
           Deque<Integer> stack = new ArrayDeque<>();
           for (String token : tokens) {
               if (token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/")) {
                   int num1 = stack.pop();
                   int num2 = stack.pop();
                   if (token.equals("+")) {
                       stack.push(num2 + num1);
                   } else if (token.equals("-")) {
                       stack.push(num2 - num1);
                   } else if (token.equals("*")) {
                       stack.push(num2 * num1);
                   } else if (token.equals("/")) {
                       stack.push(num2 / num1);
                   }
               } else {
                   stack.push(Integer.parseInt(token));
               }
           }
           return stack.pop();
       }
   
       /**
        * 递归方式.代替栈的操作.
        * 设置全局变量index，确保每次递归，数组下标都前移一位.
        */
       private int eval(String[] tokens) {
           String token = tokens[index--];
           if (token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/")) {
               int num1 = eval(tokens);
               int num2 = eval(tokens);
               switch (token) {
                   case "+":
                       return num2 + num1;
                   case "-":
                       return num2 - num1;
                   case "*":
                       return num2 * num1;
                   case "/":
                       return num2 / num1;
               }
           }
           return Integer.parseInt(token);
       }
   }
   ```
   

### 	239. 滑动窗口最大值【**困难**】

1. 题目

   给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

   返回滑动窗口中的最大值。

   进阶：

   你能在线性时间复杂度内解决此题吗？

   ![img](https://code-thinking.cdn.bcebos.com/pics/239.%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%9C%80%E5%A4%A7%E5%80%BC.png)

   提示：

   - 1 <= nums.length <= 10^5
   - -10^4 <= nums[i] <= 10^4
   - 1 <= k <= nums.length

      

2. 思路

   这是使用单调队列的经典题目。

   难点是如何求一个区间里的最大值呢？ （这好像是废话），暴力一下不就得了。

   暴力方法，遍历一遍的过程中每次从窗口中再找到最大的数值，这样很明显是O(n × k)的算法。

   有的同学可能会想用一个大顶堆（优先级队列）来存放这个窗口里的k个数字，这样就可以知道最大的最大值是多少了， **但是问题是这个窗口是移动的，而大顶堆每次只能弹出最大值，我们无法移除其他数值，这样就造成大顶堆维护的不是滑动窗口里面的数值了。所以不能用大顶堆。**

   此时我们需要一个队列，这个队列呢，放进去窗口里的元素，然后随着窗口的移动，队列也一进一出，每次移动之后，队列告诉我们里面的最大值是什么。  

   这个队列应该长这个样子：

   ```cpp
   class MyQueue {
   public:
       void pop(int value) {
       }
       void push(int value) {
       }
       int front() {
           return que.front();
       }
   };
   ```

   每次窗口移动的时候，调用que.pop(滑动窗口中移除元素的数值)，que.push(滑动窗口添加元素的数值)，然后que.front()就返回我们要的最大值。
   
   这么个队列香不香，要是有现成的这种数据结构是不是更香了！
   
   其实在C++中，可以使用 multiset 来模拟这个过程，文末提供这个解法仅针对C++，以下讲解我们还是靠自己来实现这个单调队列。
   
   然后再分析一下，队列里的元素一定是要排序的，而且要最大值放在出队口，要不然怎么知道最大值呢。
   
   但如果把窗口里的元素都放进队列里，窗口移动的时候，队列需要弹出元素。
   
   那么问题来了，已经排序之后的队列 怎么能把窗口要移除的元素（这个元素可不一定是最大值）弹出呢。
   
   大家此时应该陷入深思.....
   
   **其实队列没有必要维护窗口里的所有元素，只需要维护有可能成为窗口里最大值的元素就可以了，同时保证队列里的元素数值是由大到小的。**
   
   那么这个维护元素单调递减的队列就叫做**单调队列，即单调递减或单调递增的队列。C++中没有直接支持单调队列，需要我们自己来实现一个单调队列**
   
   **不要以为实现的单调队列就是 对窗口里面的数进行排序，如果排序的话，那和优先级队列又有什么区别了呢。**
   
   来看一下单调队列如何维护队列里的元素。
   
   动画如下：
   
   ![239.滑动窗口最大值](https://code-thinking.cdn.bcebos.com/gifs/239.%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%9C%80%E5%A4%A7%E5%80%BC.gif)
   
   对于窗口里的元素{2, 3, 5, 1 ,4}，单调队列里只维护{5, 4} 就够了，保持单调队列里单调递减，此时队列出口元素就是窗口里最大元素。
   
   此时大家应该怀疑单调队列里维护着{5, 4} 怎么配合窗口进行滑动呢？
   
   设计单调队列的时候，pop，和push操作要保持如下规则：
   
   1. pop(value)：如果窗口移除的元素value等于单调队列的出口元素，那么队列弹出元素，否则不用任何操作
   2. push(value)：如果push的元素value大于入口元素的数值，那么就将队列入口的元素弹出，直到push元素的数值小于等于队列入口元素的数值为止

   保持如上规则，每次窗口移动的时候，只要问que.front()就可以返回当前窗口的最大值。

   为了更直观的感受到单调队列的工作过程，以题目示例为例，输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3，动画如下：

   ![239.滑动窗口最大值-2](https://code-thinking.cdn.bcebos.com/gifs/239.%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E6%9C%80%E5%A4%A7%E5%80%BC-2.gif)

   那么我们用什么数据结构来实现这个单调队列呢？

   使用deque最为合适，在文章[栈与队列：来看看栈和队列不为人知的一面 (opens new window)](https://programmercarl.com/栈与队列理论基础.html)中，我们就提到了常用的queue在没有指定容器的情况下，deque就是默认底层容器。
   
3. 我的代码

   ```java
   
   ```

4. 官方推荐

   ```java
   
   ```

   



### 347.前 K 个高频元素【中等】

1. 题目

   给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

   示例 1:

   - 输入: nums = [1,1,1,2,2,3], k = 2
   - 输出: [1,2]

   示例 2:

   - 输入: nums = [1], k = 1
   - 输出: [1]

   提示：

   - 你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
   - 你的算法的时间复杂度必须优于 $O(n \log n)$ , n 是数组的大小。
   - 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。
   - 你可以按任意顺序返回答案。 

2. 思路

   这道题目主要涉及到如下三块内容：

   1. 要统计元素出现频率
   2. 对频率排序
   3. 找出前K个高频元素

   首先统计元素出现的频率，这一类的问题可以使用map来进行统计。

   然后是对频率进行排序，这里我们可以使用一种 容器适配器就是**优先级队列**。

   什么是优先级队列呢？

   其实**就是一个披着队列外衣的堆**，因为优先级队列对外接口只是从队头取元素，从队尾添加元素，再无其他取元素的方式，看起来就是一个队列。

   而且优先级队列内部元素是自动依照元素的权值排列。那么它是如何有序排列的呢？

   缺省情况下priority_queue利用max-heap（大顶堆）完成对元素的排序，这个大顶堆是以vector为表现形式的complete binary tree（完全二叉树）。

   什么是堆呢？

   **堆是一棵完全二叉树，树中每个结点的值都不小于（或不大于）其左右孩子的值。** 如果父亲结点是大于等于左右孩子就是大顶堆，小于等于左右孩子就是小顶堆。

   所以大家经常说的大顶堆（堆头是最大元素），小顶堆（堆头是最小元素），如果懒得自己实现的话，就直接用priority_queue（优先级队列）就可以了，底层实现都是一样的，从小到大排就是小顶堆，从大到小排就是大顶堆。

   本题我们就要使用优先级队列来对部分频率进行排序。

   为什么不用快排呢， 使用快排要将map转换为vector的结构，然后对整个数组进行排序， 而这种场景下，我们其实只需要维护k个有序的序列就可以了，所以使用优先级队列是最优的。

   此时要思考一下，是使用小顶堆呢，还是大顶堆？

   有的同学一想，题目要求前 K 个高频元素，那么果断用大顶堆啊。

   那么问题来了，定义一个大小为k的大顶堆，在每次移动更新大顶堆的时候，每次弹出都把最大的元素弹出去了，那么怎么保留下来前K个高频元素呢。

   而且使用大顶堆就要把所有元素都进行排序，那能不能只排序k个元素呢？

   **所以我们要用小顶堆，因为要统计最大前k个元素，只有小顶堆每次将最小的元素弹出，最后小顶堆里积累的才是前k个最大元素。**

   寻找前k个最大元素流程如图所示：（图中的频率只有三个，所以正好构成一个大小为3的小顶堆，如果频率更多一些，则用这个小顶堆进行扫描）

   ![347.前K个高频元素](https://code-thinking.cdn.bcebos.com/pics/347.%E5%89%8DK%E4%B8%AA%E9%AB%98%E9%A2%91%E5%85%83%E7%B4%A0.jpg)

   关于map的方法——getOrDefault:

   ### getOrDefault

   default [V](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Map.html)  getOrDefault([Object](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/lang/Object.html)  key, [V](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Map.html)  defaultValue)            

   返回指定键映射到的值，如果此map不包含键的映射，则返回 `defaultValue`。

   - 实现要求：

     默认实现不保证此方法的同步或原子性属性。任何提供原子性保证的实现都必须重写此方法并记录其并发属性。

   - 参数：

     `key` - 要返回其关联值的键

     `defaultValue` - 键的默认映射

   - 返回：

     指定键映射到的值，或者 `defaultValue` 如果此map不包含键的映射

   - 抛出：

     `ClassCastException` - 如果键的类型不适合此map ([optional](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Collection.html#optional-restrictions))

     `NullPointerException` - 如果指定的键为空且此map不允许空键 ([optional](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Collection.html#optional-restrictions))

    

3. 官方推荐

   ```java
   /*
    * Comparator接口说明:
    * 返回负数，形参中第一个参数排在前面；返回正数，形参中第二个参数排在前面
    * 对于队列：排在前面意味着往队头靠
    * 对于堆（使用PriorityQueue实现）：从队头到队尾按从小到大排就是最小堆（小顶堆），
    *                                从队头到队尾按从大到小排就是最大堆（大顶堆）--->队头元素相当于堆的根节点
    * */
   class Solution {
       //解法1：基于大顶堆实现
       public int[] topKFrequent1(int[] nums, int k) {
           Map<Integer,Integer> map = new HashMap<>(); //key为数组元素值,val为对应出现次数
           for (int num : nums) {
               map.put(num, map.getOrDefault(num,0) + 1);
           }
           //在优先队列中存储二元组(num, cnt),cnt表示元素值num在数组中的出现次数
           //出现次数按从队头到队尾的顺序是从大到小排,出现次数最多的在队头(相当于大顶堆)
           PriorityQueue<int[]> pq = new PriorityQueue<>((pair1, pair2) -> pair2[1] - pair1[1]);
           for (Map.Entry<Integer, Integer> entry : map.entrySet()) {//大顶堆需要对所有元素进行排序
               pq.add(new int[]{entry.getKey(), entry.getValue()});
           }
           int[] ans = new int[k];
           for (int i = 0; i < k; i++) { //依次从队头弹出k个,就是出现频率前k高的元素
               ans[i] = pq.poll()[0];
           }
           return ans;
       }
       //解法2：基于小顶堆实现
       public int[] topKFrequent2(int[] nums, int k) {
           Map<Integer,Integer> map = new HashMap<>(); //key为数组元素值,val为对应出现次数
           for (int num : nums) {
               map.put(num, map.getOrDefault(num, 0) + 1);
           }
           //在优先队列中存储二元组(num, cnt),cnt表示元素值num在数组中的出现次数
           //出现次数按从队头到队尾的顺序是从小到大排,出现次数最低的在队头(相当于小顶堆)
           PriorityQueue<int[]> pq = new PriorityQueue<>((pair1, pair2) -> pair1[1] - pair2[1]);
           for (Map.Entry<Integer, Integer> entry : map.entrySet()) { //小顶堆只需要维持k个元素有序
               if (pq.size() < k) { //小顶堆元素个数小于k个时直接加
                   pq.add(new int[]{entry.getKey(), entry.getValue()});
               } else {
                   if (entry.getValue() > pq.peek()[1]) { //当前元素出现次数大于小顶堆的根结点(这k个元素中出现次数最少的那个)
                       pq.poll(); //弹出队头(小顶堆的根结点),即把堆里出现次数最少的那个删除,留下的就是出现次数多的了
                       pq.add(new int[]{entry.getKey(), entry.getValue()});
                   }
               }
           }
           int[] ans = new int[k];
           for (int i = k - 1; i >= 0; i--) { //依次弹出小顶堆,先弹出的是堆的根,出现次数少,后面弹出的出现次数多
               ans[i] = pq.poll()[0];
           }
           return ans;
       }
   }
   ```

   这是简化版

   ```java
   class Solution {
       public int[] topKFrequent(int[] nums, int k) {
           // 优先级队列，为了避免复杂 api 操作，pq 存储数组
           // lambda 表达式设置优先级队列从大到小存储 o1 - o2 为从小到大，o2 - o1 反之
           PriorityQueue<int[]> pq = new PriorityQueue<>((o1, o2) -> o1[1] - o2[1]);
           int[] res = new int[k]; // 答案数组为 k 个元素
           Map<Integer, Integer> map = new HashMap<>(); // 记录元素出现次数
           for (int num : nums) map.put(num, map.getOrDefault(num, 0) + 1);
           for (var x : map.entrySet()) { // entrySet 获取 k-v Set 集合
               // 将 kv 转化成数组
               int[] tmp = new int[2];
               tmp[0] = x.getKey();
               tmp[1] = x.getValue();
               pq.offer(tmp);
               // 下面的代码是根据小根堆实现的，我只保留优先队列的最后的k个，只要超出了k我就将最小的弹出，剩余的k个就是答案
               if(pq.size() > k) {
                   pq.poll();
               }
           }
           for (int i = 0; i < k; i++) {
               res[i] = pq.poll()[0]; // 获取优先队列里的元素
           }
           return res;
       }
   }
   ```

   









