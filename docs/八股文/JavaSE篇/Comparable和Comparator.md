# Comparable和Comparator

::: danger

讲个鬼故事，我发现自己这么久了，一直不会用这俩接口，传参也老是模模糊糊，必须安排了

:::

## 首先，看一下 Comparator 接口中的 compare 方法

```java
	/**
     * Compares its two arguments for order.  Returns a negative integer,
     * zero, or a positive integer as the first argument is less than, equal
     * to, or greater than the second.<p>
     *
     * In the foregoing description, the notation
     * <tt>sgn(</tt><i>expression</i><tt>)</tt> designates the mathematical
     * <i>signum</i> function, which is defined to return one of <tt>-1</tt>,
     * <tt>0</tt>, or <tt>1</tt> according to whether the value of
     * <i>expression</i> is negative, zero or positive.<p>
     *
     * The implementor must ensure that <tt>sgn(compare(x, y)) ==
     * -sgn(compare(y, x))</tt> for all <tt>x</tt> and <tt>y</tt>.  (This
     * implies that <tt>compare(x, y)</tt> must throw an exception if and only
     * if <tt>compare(y, x)</tt> throws an exception.)<p>
     *
     * The implementor must also ensure that the relation is transitive:
     * <tt>((compare(x, y)&gt;0) &amp;&amp; (compare(y, z)&gt;0))</tt> implies
     * <tt>compare(x, z)&gt;0</tt>.<p>
     *
     * Finally, the implementor must ensure that <tt>compare(x, y)==0</tt>
     * implies that <tt>sgn(compare(x, z))==sgn(compare(y, z))</tt> for all
     * <tt>z</tt>.<p>
     *
     * It is generally the case, but <i>not</i> strictly required that
     * <tt>(compare(x, y)==0) == (x.equals(y))</tt>.  Generally speaking,
     * any comparator that violates this condition should clearly indicate
     * this fact.  The recommended language is "Note: this comparator
     * imposes orderings that are inconsistent with equals."
     *
     * @param o1 the first object to be compared.
     * @param o2 the second object to be compared.
     * @return a negative integer, zero, or a positive integer as the
     *         first argument is less than, equal to, or greater than the
     *         second.
     * @throws NullPointerException if an argument is null and this
     *         comparator does not permit null arguments
     * @throws ClassCastException if the arguments' types prevent them from
     *         being compared by this comparator.
     */
	int compare(T o1, T o2);
```

### *对于这段源码的分析*

#### 1. 返回值的含义

源码注释明确说明 `compare(T o1, T o2)` 的返回值有三种情况：
- **负数**：`o1 < o2`，表示 `o1` 应该排在 `o2` 前面。
- **零**：`o1 == o2`，表示 `o1` 和 `o2` 位置相同，不需要交换。
- **正数**：`o1 > o2`，表示 `o1` 应该排在 `o2` 后面。

这个逻辑和我们之前讲的差值法 `o1 - o2` 一致。通过返回负数、0 或正数，来决定元素之间的排序顺序。

#### 2. `sgn(expression)` 的解释

源码提到了 `sgn(expression)`，也就是数学中的 **signum 函数**。它的作用是根据 `expression` 的正负性返回 -1、0 或 1：

- `sgn(expression)` 返回 -1 表示 `expression` 是负数；
- `sgn(expression)` 返回 0 表示 `expression` 是 0；
- `sgn(expression)` 返回 1 表示 `expression` 是正数。

`compare` 方法 **实际上实现** 的就是 `sgn` 函数：我们根据两个对象 `o1` 和 `o2` 之间的比较结果，返回对应的负数、0 或正数。

#### 3. 对称性要求

注释中提到：**`sgn(compare(x, y)) == -sgn(compare(y, x))`**。这意味着：
- 如果 `compare(x, y)` 返回的是正数（即 `x > y`），那么 `compare(y, x)` 一定要返回负数（即 `y < x`）。
- 如果 `compare(x, y)` 返回负数（即 `x < y`），那么 `compare(y, x)` 一定要返回正数（即 `y > x`）。

这个对称性保证了比较操作是自洽的，不会出现逻辑混乱的情况。

#### 4. 传递性要求

注释还强调了 **传递性**：如果 `compare(x, y) > 0` 且 `compare(y, z) > 0`，那么 `compare(x, z)` 也必须大于 0。这意味着如果 `x` 大于 `y`，并且 `y` 大于 `z`，那么 `x` 必须大于 `z`。否则，比较器的实现会出现不一致的排序结果。

这个规则 **确保了排序结果的一致性**。

#### 5. 等值性要求

注释还提到，如果 `compare(x, y) == 0`，则对于所有的 `z`，`sgn(compare(x, z))` 和 `sgn(compare(y, z))` 必须相等。也就是说，如果 `x` 和 `y` 被认为是相等的，那么它们与其他对象的比较结果应该保持一致。

#### 6. 与 `equals` 的一致性（非强制要求）

源码提到：`compare(x, y) == 0` 并不严格要求 `x.equals(y)` 为 `true`。通常，排序器和 `equals` 方法是保持一致的，但并不是强制的。如果比较器不遵循 `equals` 的一致性，开发者应清楚说明这点，比如在注释中指出"这个比较器的排序与 `equals` 方法不一致"。

#### 7. 异常处理

- 如果 `compare(x, y)` 抛出异常，则 `compare(y, x)` 也应该抛出相同的异常。
- 如果对象类型不匹配，比较器可以抛出 `ClassCastException`。
- 如果比较的对象是 `null`，并且比较器不允许 `null`，则可以抛出 `NullPointerException`。

#### 总结：

- `compare(T o1, T o2)` 通过返回负数、零或正数来决定两个对象的排序顺序。
- `sgn(compare(x, y)) == -sgn(compare(y, x))` 确保比较操作的对称性。
- 传递性和等值性要求确保排序结果的一致性。
- 与 `equals` 不强制要求一致，但推荐在不一致时做出说明。

这段注释深入描述了实现 `Comparator` 时需要遵循的规则和逻辑，从而保证排序过程的正确性和一致性。

## 如何比较 `double` 类型

直接使用 `o1 - o2` 这种做法对 `int` 类型是安全的，但对于 `double` 或 `float` 类型，直接相减并转换为 `int` 可能不严谨，尤其在处理精度问题时。所以，推荐使用 **`Double.compare(o1, o2)`** 方法。

`Double.compare(double d1, double d2)` 方法返回：

- 如果 `d1` 小于 `d2`，返回负数；
- 如果 `d1` 等于 `d2`，返回 0；
- 如果 `d1` 大于 `d2`，返回正数。

这个方法在比较 `double` 时能够更准确处理浮点数的精度问题和特殊值（例如 `NaN` 和 `Infinity`）。

**示例：**

```java
Comparator<Double> doubleComparator = (d1, d2) -> Double.compare(d1, d2);
```

这个 `Comparator` 可以直接用于 `Arrays.sort` 或其他排序操作，确保浮点数比较的严谨性。

### 3. 从小到大和从大到小的 `double` 比较

- **从小到大**：`Double.compare(d1, d2)`。
- **从大到小**：`Double.compare(d2, d1)`。

例子：

```java
Double[] numbers = {3.1, 4.5, 2.7};
Arrays.sort(numbers, (d1, d2) -> Double.compare(d1, d2)); // 从小到大排序
Arrays.sort(numbers, (d1, d2) -> Double.compare(d2, d1)); // 从大到小排序
```

### 总结：
- `o1 - o2` 适用于 `int` 类型，反映从小到大的顺序；反过来 `o2 - o1` 则是从大到小。
- 对于 `double` 或 `float`，应使用 `Double.compare(d1, d2)` 进行比较，确保精度和正确性。
- `Double.compare` 更适合处理浮点数的特殊情况，如 `NaN` 和无穷大。

这样，在排序 `double` 类型时可以避免直接转 `int` 的问题，同时保持排序的精度和逻辑的严谨性。

## Comparable 和 Comparator 都是用于比较对象大小的接口，详细说明一下区别

### 1. Comparable 接口

**作用**：它主要是用来 **定义对象的"自然顺序"** 。实现该接口的类需要实现 `compareTo(T o)` 方法，用于比较当前对象和传入的对象的大小。

其实就是让这个类具有 *可比较* 的能力。

**使用场景**：当你 **希望某个类的实例可以直接比较大小** 时，比如排序一个 `List` 或者数组，通常会让这个类实现 `Comparable` 接口。比如排序学生的年龄、名字等。

**实现方法**：

```java
class Student implements Comparable<Student> {
    private int age;

    // constructor, getters, setters

    @Override
    public int compareTo(Student other) {
        return this.age - other.age; // 从小到大排序
    }
}
```

**在 `Arrays.sort` 中的使用**：当对象实现了 `Comparable` 接口后，可以直接调用 `Arrays.sort(数组)` 来按"自然顺序"进行排序。

**也就是说，用于排序的数组的元素，本身就是可比较的** 

```java
Student[] students = {new Student(20), new Student(18), new Student(22)};
Arrays.sort(students);
```

### 2. Comparator 接口

**作用**：用于 **定义一个“定制顺序”**，当你不想或者无法修改类的定义时，可以通过 `Comparator` 来进行排序。它可以用在不同的场合下实现不同的排序规则。

**使用场景**：当你希望 **以不同的标准来排序对象** 时，比如学生按年龄、按名字排序等。通过 `Comparator`，你可以定义多个排序规则，而不需要修改类本身。

**实现方法**：

```java
Comparator<Student> ageComparator = new Comparator<Student>() {
    @Override
    public int compare(Student s1, Student s2) {
        return s1.getAge() - s2.getAge(); // 从小到大排序
    }
};
```

**lambda 表达式**：你说的 `o1` 和 `o2` 是 `Comparator` 的写法。用 lambda 表达式可以简化上面的代码：
```java
Comparator<Student> ageComparator = (s1, s2) -> s1.getAge() - s2.getAge();
```

**在 `Arrays.sort` 中的使用**：你可以通过 `Comparator` 指定排序规则：
```java
Arrays.sort(students, ageComparator);
```

### 3. **主要区别**

- **Comparable** 是让对象自身具备比较能力，通常是默认排序规则。
- **Comparator** 是外部定义的比较器，可以灵活地指定不同的排序规则。
- Comparable 实现的是 `compareTo` 方法，而 Comparator 实现的是 `compare` 方法，后者常用于定制排序。

### 4. **从小到大 / 从大到小排序的 lambda 写法**

- **从小到大排序**：`(o1, o2) -> o1 - o2` 或者 `(o1, o2) -> o1.getAge() - o2.getAge()`。
- **从大到小排序**：可以通过反转顺序实现：`(o1, o2) -> o2 - o1` 或者 `(o1, o2) -> o2.getAge() - o1.getAge()`。

例子：
```java
Arrays.sort(students, (s1, s2) -> s2.getAge() - s1.getAge()); // 从大到小排序
```

### 总结：
- 使用 `Comparable` 实现类内的自然排序，通常用 `compareTo`。
- 使用 `Comparator` 定制外部排序规则，常用 `compare`，并且 `Comparator` 更适合使用 lambda 表达式，通常 `(o1, o2)` 用于指定比较逻辑。
- 如果你只需要基本的从小到大或从大到小排序，lambda 表达式就可以很方便地实现。

希望这样解释对你有帮助！

## 一个例子

下面是一个贪心算法的例子，在其中有必要使用Comparable接口使得Guest类有比较大小的能力

```java
class Main7 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // 总共n个桌子
        int n = sc.nextInt();
        // 总共m批人
        int m = sc.nextInt();
        // 记录每张桌子最大容纳数
        int[] maxCovers = new int[n];
        Guest[] guests = new Guest[m];
        // 初始化每张桌子最大容纳量
        for (int i = 0; i < n; i++) {
            maxCovers[i] = sc.nextInt();
        }
        // 初始化每批客人
        for (int i = 0; i < m; i++) {
            int totalPeople = sc.nextInt();
            int needPay = sc.nextInt();
            guests[i] = new Guest(totalPeople, needPay);
        }
        // n个桌子是否已经被使用了
        boolean[] used = new boolean[n];
        int res = process(guests, maxCovers, used);
        System.out.println(res);
    }

    public static int process(Guest[] guests, int[] maxCovers, boolean[] used) {
        // 桌子按照能容纳的量从小到大排序
        Arrays.sort(maxCovers);
        // 桌子数量
        int n = maxCovers.length;
        // 对客人按照人均预计消费排序,从大到小
        Arrays.sort(guests);
        int maxPerPay = 0;
        for (Guest guest : guests) {
            int needPeople = guest.totalPeople;
            int needPay = guest.needPay;
            for (int i = 0; i < n; i++) {
                if (!used[i] && needPeople <= maxCovers[i]) {
                    // 只要有桌子没被使用过，且可以容纳，那就用这张桌子,跳出循环，对下一批顾客查找即可
                    used[i] = true;
                    maxPerPay += needPay;
                    break;
                }
            }
        }
        return maxPerPay;
    }
}

class Guest implements Comparable<Guest> {
    // 这一批客人总数
    int totalPeople;
    // 这一批客人预计花费的钱
    int needPay;

    // 人均预计花费
    double perPay;

    public Guest(int totalPeople, int needPay) {
        this.totalPeople = totalPeople;
        this.needPay = needPay;
        this.perPay = needPay / (double) totalPeople;
    }

    // [!code focus: 6]
    @Override
    public int compareTo(Guest o) {
        // 为了确保对客人按照人均预计消费排序,从大到小
        return Double.compare(o.perPay, this.perPay);
    }
}
```

当然了，如果不使用 `Comparable` 赋予能力的话，也可以直接在Sort排序时指定排序的能力

```java
// 最原始的写法
Arrays.sort(guests, new Comparator<Guest>() {
    @Override
    public int compare(Guest o1, Guest o2) {
        return Double.compare(o1.perPay, o2.perPay);
    }
});
// 引用lambda
Arrays.sort(guests, (o1, o2) -> Double.compare(o1.perPay, o2.perPay));
// Comparator的属性
Arrays.sort(guests, Comparator.comparingDouble(guest -> guest.perPay));
```

