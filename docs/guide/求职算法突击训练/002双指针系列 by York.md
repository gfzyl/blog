# LeetCode热题100

## 双指针系列

### No1. [移动零](https://leetcode.cn/problems/move-zeroes/)

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

**请注意** ，必须在不复制数组的情况下原地对数组进行操作。

 **示例 1:**

```
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
```

**示例 2:**

```
输入: nums = [0]
输出: [0]
```

> **思路及算法**
>
> **两次遍历**
> 我们创建两个指针 i 和 j，第一次遍历的时候指针 j 用来记录当前有多少 非0 元素。即遍历的时候每遇到一个 非0 元素就将其往数组左边挪，第一次遍历完后，j 指针的下标就指向了最后一个 非0 元素下标。
> 第二次遍历的时候，起始位置就从 j 开始到结束，将剩下的这段区域内的元素全部置为 0。
> 动画演示：
>
> <img src="https://pic.leetcode-cn.com/9669b4ffb158eaeeee6f0cd66a70f24411575edab1ab8a037c4c9084b1c743f5-283_1.gif" alt="283_1.gif" style="zoom: 50%;" />
> 时间复杂度：O(n)
> 空间复杂度：O(1)
>
> 
>
> **一次遍历**
>
> 这里参考了快速排序的思想，快速排序首先要确定一个待分割的元素做中间点 x，然后把所有小于等于 x 的元素放到 x 的左边，大于 x 的元素放到其右边。
>
> ==这里我们可以用 0 当做这个中间点，把不等于 0(注意题目没说不能有负数)的放到中间点的左边，等于 0 的放到其右边。==
>
> 这的中间点就是 0 本身，所以实现起来比快速排序简单很多，我们使用两个指针 i 和 j，只要 nums[i]!=0，我们就交换 nums[i] 和 nums[j]
>
> 请对照动态图来理解：
> <img src="https://pic.leetcode-cn.com/36d1ac5d689101cbf9947465e94753c626eab7fcb736ae2175f5d87ebc85fdf0-283_2.gif" alt="283_2.gif" style="zoom:50%;" />
>
> 时间复杂度：O(n)
>
> 空间复杂度：O(1)

```java
public void moveZeroes(int[] nums) {
    int fast = 0, slow = 0;
    for(; fast < nums.length; fast++){
        if(nums[fast] != 0){
            nums[slow++] = nums[fast];
        }
    }
    // 循环结束时快指针已经到头，说明剩下的地方全是0
    while(slow != nums.length){
        nums[slow++] = 0;
    }
}
```

更优化的解法

```java
public void moveZeroes(int[] nums) {
    if(nums==null) {
        return;
    }
    //两个指针i和j
    int j = 0;
    for(int i=0;i<nums.length;i++) {
        //当前元素!=0，就把其交换到左边，等于0的交换到右边
        if(nums[i]!=0) {
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j++] = tmp;
        }
    }
}
```

### No2.[盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

给定一个长度为 `n` 的整数数组 `height` 。有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])` 。

找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**说明：**你不能倾斜容器。

**示例 1：**

![img](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg)

```
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

**示例 2：**

```
输入：height = [1,1]
输出：1
```

> **思路及算法**
>
> 设两指针 i , j ，指向的水槽板高度分别为 h[i] , h[j] ，此状态下水槽面积为 S(i,j) 。由于可容纳水的高度由两板中的 短板 决定，因此可得如下 面积公式 ：
>
> S(i,j)=min(h[i],h[j])×(j−i)
>
> ![Picture0.png](https://pic.leetcode-cn.com/1628780627-VtSmcP-Picture0.png)
>
>
> 在每个状态下，无论长板或短板向中间收窄一格，都会导致水槽 底边宽度 −1 变短：
>
> 若向内 移动短板 ，水槽的短板 min(h[i],h[j]) 可能变大，因此下个水槽的面积 可能增大 。
> 若向内 移动长板 ，水槽的短板 min(h[i],h[j]) 不变或变小，因此下个水槽的面积 一定变小 。
> 因此，初始化双指针分列水槽左右两端，循环每轮将短板向内移动一格，并更新面积最大值，直到两指针相遇时跳出；即可获得最大面积。
>
> 算法流程：
>
> * 初始化： 双指针 i , j 分列水槽左右两端；
> * 循环收窄： 直至双指针相遇时跳出；
> * 更新面积最大值 res ；
> * 选定两板高度中的短板，向中间收窄一格；
> * 返回值： 返回面积最大值 res 即可；
>
> 正确性证明：
>
> 若暴力枚举，水槽两板围成面积 S(i,j) 的状态总数为 C(n,2) 。
>
> * 假设状态 S(i,j) 下 h[i]<h[j] ，在向内移动短板至 S(i+1,j) ，则相当于消去了 S(i,j−1),S(i,j−2),...,S(i,i+1) 状态集合。而所有消去状态的面积一定都小于当前面积（即 <S(i,j)），因为这些状态：
>
> * 短板高度：相比 S(i,j) 相同或更短（即 ≤h[i] ）；
> * 底边宽度：相比 S(i,j) 更短；
> * 因此，每轮向内移动短板，所有消去的状态都 不会导致面积最大值丢失 ，证毕。

```java
// 初始化： 双指针 i , j 分列水槽左右两端；
// 循环收窄： 直至双指针相遇时跳出；
// 选定两板高度中的短板，向中间收窄一格；
// 当你选择收窄时肯定是优先换更短的，因为短的可以换成大的或者小的
public int maxArea(int[] height) {
    int res = 0;
    int left = 0;
    int right = height.length - 1;
    while (left < right) {
        int leftHeight = height[left];
        int rightHeight = height[right];
        res = Math.max(res, (right - left) * Math.min(leftHeight, rightHeight));
        // 马上要进行下一次计算，但是下一次计算可以
        if (leftHeight < rightHeight) {
            while (left < right && height[left] <= leftHeight)
                left++;
        } else {
            while (left < right && height[right] <= rightHeight)
                right--;
        }          
    }
    return res;
}
```

### No3. [三数之和](https://leetcode.cn/problems/3sum/)

给你一个整数数组 `nums` ，判断是否存在三元组 `[nums[i], nums[j], nums[k]]` 满足 `i != j`、`i != k` 且 `j != k` ，同时还满足 `nums[i] + nums[j] + nums[k] == 0` 。请你返回所有和为 `0` 且不重复的三元组。

**注意：**答案中不可以包含重复的三元组。

 **示例 1：**

```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
```

**示例 2：**

```
输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
```

**示例 3：**

```
输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 
```

> **思路及算法**
>
> **其实这道题目使用哈希法并不十分合适**，因为在去重的操作中有很多细节需要注意，在面试中很难直接写出没有bug的代码。
>
> 而且使用哈希法 在使用两层for循环的时候，能做的剪枝操作很有限，虽然时间复杂度是O(n^2)，也是可以在leetcode上通过，但是程序的执行时间依然比较长 。
>
> 接下来介绍另一个解法：双指针法，**这道题目使用双指针法 要比哈希法高效一些**，那么来讲解一下具体实现的思路。
>
> 动画效果如下：
>
> ![15.三数之和](https://code-thinking.cdn.bcebos.com/gifs/15.%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C.gif)
>
> 拿这个nums数组来举例，*首先将数组**排序***，然后有一层for循环，i从下标0的地方开始，同时定一个下标==left== 定义在i+1的位置上，定义下标==right== 在数组结尾的位置上。
>
> 依然还是在数组中找到 abc 使得a + b +c =0，我们这里相当于 a = nums[i]，b = nums[left]，c = nums[right]。
>
> 接下来如何移动left 和right呢， 如果nums[i] + nums[left] + nums[right] > 0 就说明 **此时三数之和大了**，因为数组是排序后了，所以**right下标就应该向左移动**，这样才能让三数之和小一些。
>
> 如果 nums[i] + nums[left] + nums[right] < 0 说明 **此时三数之和小了**，left 就向右移动，才能让三数之和大一些，直到left与right相遇为止。
>
> 时间复杂度：O(n^2)。

```java
public List<List<Integer>> threeSum(int[] nums) {
    List<List<Integer>> listNest = new ArrayList<>();
    if (nums.length < 3) {
        // 直接返回空
        return listNest;
    }
    Arrays.sort(nums);
    for (int i = 0; i < nums.length - 2; i++) {
        Integer num1 = nums[i];
        if (num1 > 0) {
            // 因为是有序的，当nums[1]为正数时，其他两个数不可能相加是负数
            break;
        }
        if (i > 0 && nums[i] == nums[i - 1]) {
            // 避免重复
            continue;
        }
        Integer target = -num1;
        // 两个指针分别知道i的后一位和列表的最后一位
        int front = i + 1;
        int end = nums.length - 1;

        while (front < end) {
            int sumOfTwo = nums[front] + nums[end];
            if (sumOfTwo == target) {
                listNest.add(Arrays.asList(nums[i], nums[front], nums[end]));
                front++;
                end--;
                // 这里需要做一个防重复的处理
                while (front < end && nums[front] == nums[front - 1]) {
                    // 相同的数值，第一个指针从左到右前进一步
                    front++;
                }
                while (front < end && nums[end] == nums[end + 1]) {
                    // 相同的数值，第一个指针从右到左前进一步
                    end--;
                }

            } else if (sumOfTwo > target) {
                end--;
            } else {
                front++;
            }
        }
    }
    return listNest;
}
```

### No4. [接雨水](https://leetcode.cn/problems/trapping-rain-water/)

给定 `n` 个非负整数表示每个宽度为 `1` 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)

```
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
```

**示例 2：**

```
输入：height = [4,2,0,3,2,5]
输出：9
```

> **思路及算法**
>
> **按列求**
>
> 求每一列的水，我们只需要关注当前列，以及左边最高的墙，右边最高的墙就够了。
>
> 装水的多少，当然根据木桶效应，我们只需要看左边最高的墙和右边最高的墙中较矮的一个就够了。
>
> 所以，根据较矮的那个墙和当前列的墙的高度可以分为三种情况。
>
> * 较矮的墙的高度大于当前列的墙的高度
>
> ![image.png](https://pic.leetcode-cn.com/fecc535fe1e90c9e47e528e919857643c66d094fa73ac0c493da621d7d99ccc0-image.png)
>
> * 较矮的墙的高度小于当前列的墙的高度
>
> ![image.png](https://pic.leetcode-cn.com/ccdd41d5ed8b35ae0420ccc4cd7a38759c71f3b4d3e6f94b45866eaa87bbd1ce-image.png)
>
> * 较矮的墙的高度等于当前列的墙的高度。
>
> ![image.png](https://pic.leetcode-cn.com/89e7671c4cc94bfde2f532d7871c83dfce00e80ba687100a8839d2ea5bf5cd28-image.png)
>
> **动态规划**
> 我们注意到，解法二中。对于每一列，我们求它左边最高的墙和右边最高的墙，都是重新遍历一遍所有高度，这里我们可以优化一下。
>
> 首先用两个数组，max_left [i] 代表第 i 列左边最高的墙的高度，max_right[i] 代表第 i 列右边最高的墙的高度。（一定要注意下，第 i 列左（右）边最高的墙，是不包括自身的，和 leetcode 上边的讲的有些不同）
>
> 对于 max_left我们其实可以这样求。
>
> max_left [i] = Max(max_left [i-1],height[i-1])。它前边的墙的左边的最高高度和它前边的墙的高度选一个较大的，就是当前列左边最高的墙了。
>
> 对于 max_right我们可以这样求。
>
> max_right[i] = Max(max_right[i+1],height[i+1]) 。它后边的墙的右边的最高高度和它后边的墙的高度选一个较大的，就是当前列右边最高的墙了。
>
> 这样，我们再利用解法二的算法，就不用在 for 循环里每次重新遍历一次求 max_left 和 max_right 了。
>
> **双指针**
>
> 这里要用到两个指针，left 和 right，从两个方向去遍历。
>
> 那么什么时候从左到右，什么时候从右到左呢？根据下边的代码的更新规则，我们可以知道
>
> Java
> max_left = Math.max(max_left, height[i - 1]);
> height [ left - 1] 是可能成为 max_left 的变量， 同理，height [ right + 1 ] 是可能成为 right_max 的变量。
>
> 只要保证 height [ left - 1 ] < height [ right + 1 ] ，那么 max_left 就一定小于 max_right。
>
> 因为 max_left 是由 height [ left - 1] 更新过来的，而 height [ left - 1 ] 是小于 height [ right + 1] 的，而 height [ right + 1 ] 会更新 max_right，所以间接的得出 max_left 一定小于 max_right。
>
> 反之，我们就从右到左更。

```java
public int trap(int[] height) {
    // 求每一列上面积攒多少水，动态规划，每一列对应两个指标，左边最高的高度以及右边最高的高度
    // 然后根据左右两端最高高度的最小值，去和当前列比较，就能知道当前列上面有没有水
    // 如果那个最小值比当前列还小，说明当前列不可能积水；否则会积水，而且积水量是最小值-当前列高度
    int sum = 0;
    int[] max_left = new int[height.length];
    int[] max_right = new int[height.length];

    for (int i = 1; i < height.length - 1; i++) {
        max_left[i] = Math.max(max_left[i - 1], height[i - 1]);
    }
    for (int i = height.length - 2; i >= 0; i--) {
        max_right[i] = Math.max(max_right[i + 1], height[i + 1]);
    }
    for (int i = 1; i < height.length - 1; i++) {
        int min = Math.min(max_left[i], max_right[i]);
        if (min > height[i]) {
            sum = sum + (min - height[i]);
        }
    }
    return sum;
}
```

双指针的解法

```java
public int trap(int[] height) {
    int sum = 0;
    int max_left = 0;
    int max_right = 0;
    int left = 1;
    int right = height.length - 2; // 加右指针进去
    for (int i = 1; i < height.length - 1; i++) {
        //从左到右更
        if (height[left - 1] < height[right + 1]) {
            max_left = Math.max(max_left, height[left - 1]);
            int min = max_left;
            if (min > height[left]) {
                sum = sum + (min - height[left]);
            }
            left++;
        //从右到左更
        } else {
            max_right = Math.max(max_right, height[right + 1]);
            int min = max_right;
            if (min > height[right]) {
                sum = sum + (min - height[right]);
            }
            right--;
        }
    }
    return sum;
}
```

