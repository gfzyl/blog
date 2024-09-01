# LeetCode热题100

## 矩阵系列

###　No1. [矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes/)

给定一个 `*m* x *n*` 的矩阵，如果一个元素为 **0** ，则将其所在行和列的所有元素都设为 **0** 。请使用 **[原地](http://baike.baidu.com/item/原地算法)** 算法**。**

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/08/17/mat1.jpg)

```
输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
输出：[[1,0,1],[0,0,0],[1,0,1]]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/08/17/mat2.jpg)

```
输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

> **思路及算法**
>
> 我们可以维护两个数组，一个是行的，一个是列的
>
> ```java
>         boolean[] row = new boolean[m];
>         boolean[] col = new boolean[n];
> ```
>
> 这两个数组可以在我们第一次遍历整个数组的时候**标记**所在位置的这一行这一列是有0存在的
>
> 也就是说，直接对**行号和列号**进行了标记，第二次循环的时候一旦行或者列有标记，那么直接赋值为0

```java
class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean[] row = new boolean[m];
        boolean[] col = new boolean[n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 0) {
                    row[i] = col[j] = true;
                }
            }
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (row[i] || col[j]) {
                    matrix[i][j] = 0;
                }
            }
        }
    }
}
```

### No2. [螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)

给你一个 `m` 行 `n` 列的矩阵 `matrix` ，请按照 **顺时针螺旋顺序** ，返回矩阵中的所有元素。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg)

```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg)

```
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
```

> **思路及算法**
>
> 矩阵说白了就是个矩形
>
> 我们可以维护四个变量，分别表示矩形的四个边，对他们赋初值
>
> ```java
> int u = 0; // 表示最上一行
> int d = matrix.length - 1; // 表示最后一行对应下标
> int l = 0; // 表示左边界
> int r = matrix[0].length - 1; // 表示右边界，最初在最右边
> ```
>
> 其中关键在于上下边界，我们在遍历的时候也是按着顺时针走的，只要模拟这条路线即可
>
> 首先呢，从最上一行的左边开始，**先遍历到最右边**，那么首行就遍历结束了。`从左遍历到r的位置`
>
> 到**最右边以后开始从上到下**`u++，从上面遍历到d的位置`
>
> 到**最下边以后开始从右到左**`从右遍历到l的位置`
>
> 到**最左边以后开始从下到上**`从下遍历到u的位置`（注意此前u已经++，表示遍历到第二行了）
>
> ...
>
> 接着就一直这样，只要判断现在最后一行遍历完了没就行

```java
public class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> ans = new ArrayList<>();
        if (matrix.length == 0)
            return ans; // 若数组为空，直接返回答案

        int u = 0; // 赋值上下左右边界
        int d = matrix.length - 1;
        int l = 0;
        int r = matrix[0].length - 1;

        while (true) {
            for (int i = l; i <= r; ++i)
                ans.add(matrix[u][i]); // 向右移动直到最右
            if (++u > d)
                break; // 重新设定上边界，若上边界大于下边界，则遍历完成，下同
            for (int i = u; i <= d; ++i)
                ans.add(matrix[i][r]); // 向下
            if (--r < l)
                break; // 重新设定右边界
            for (int i = r; i >= l; --i)
                ans.add(matrix[d][i]); // 向左
            if (--d < u)
                break; // 重新设定下边界
            for (int i = d; i >= u; --i)
                ans.add(matrix[i][l]); // 向上
            if (++l > r)
                break; // 重新设定左边界
        }

        return ans;
    }
}
```

### No3. [旋转图像](https://leetcode.cn/problems/rotate-image/)

给定一个 *n* × *n* 的二维矩阵 `matrix` 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在**[ 原地](https://baike.baidu.com/item/原地算法)** 旋转图像，这意味着你需要直接修改输入的二维矩阵。**请不要** 使用另一个矩阵来旋转图像。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg)

```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg)

```
输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

>**思路及算法**
>
>![image-20240813232537548](./../../%E6%AF%8F%E6%97%A5%E5%AE%8C%E6%88%90%E8%AE%A1%E5%88%92%E6%88%AA%E5%9B%BE/image-20240813232537548.png)
>
>顺时针旋转90°
>
>等价的方式还是有不止一种的，上图是将整个矩阵先从中间的水平线向上翻折（其实就是做一个关于水平中线的对称），然后再关于主对角线对称
>
>那其实还可以关于3 6 9 右边这一条竖线对称，那这样就相当于从左边变成了中间，再从中间变最后（这一步是关于副对角线对称）
>
>| 1    | 2    | 3    |      | 3    | 2    | 1    |      | 7    | 4    | 1    |
>| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
>| 4    | 5    | 6    |      | 6    | 5    | 4    |      | 8    | 5    | 2    |
>| 7    | 8    | 9    |      | 9    | 8    | 7    |      | 9    | 6    | 3    |
>
>所以说白了就是对称上面的运算
>
>所以其实我觉得我写的更好

```java
class Solution {
   public void rotate(int[][] matrix) {
        int n = matrix.length;
        // 水平翻转
        for (int i = 0; i < n / 2; ++i) {
            for (int j = 0; j < n; ++j) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[n - i - 1][j];
                matrix[n - i - 1][j] = temp;
            }
        }
        // 主对角线翻转
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < i; ++j) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
    }
}
```

### No4. [搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)

编写一个高效的算法来搜索 `*m* x *n*` 矩阵 `matrix` 中的一个目标值 `target` 。该矩阵具有以下特性：

- 每行的元素从左到右升序排列。
- 每列的元素从上到下升序排列。 

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/searchgrid2.jpg)

```
输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
输出：true
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/searchgrid.jpg)

```
输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
输出：false
```

> **思路及算法**
>
> 这个题妙就妙在，他和**二叉搜索树**极其类似
>
> ![Picture1.png](https://pic.leetcode-cn.com/6584ea93812d27112043d203ea90e4b0950117d45e0452d0c630fcb247fbc4af-Picture1.png)
>
> 所以可以从数组的最左下角或者最右上角开始按照二叉搜索树的搜索过程执行

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // 确实是二叉搜索树 从最右上角（或者最左下角）那个值开始遍历搜索
        int row = 0, column = matrix[0].length - 1;
        while(row <= matrix.length - 1 && column >= 0){
            if(target > matrix[row][column]){
                // 大于就row++
                row++;
            }else if(target < matrix[row][column]){
                // 小于就column-- 
                column--;
            }else{
                // 找到了
                return true;
            }
        }
        return false;
    }
}
```

