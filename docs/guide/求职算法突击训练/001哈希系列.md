# LeetCode热题100

## 哈希专题

### No.1 [两数之和](https://leetcode.cn/problems/two-sum/)

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** *`target`* 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

**示例 1：**

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

**示例 2：**

```
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

**示例 3：**

```
输入：nums = [3,3], target = 6
输出：[0,1]
```

> **思路及算法**
>
> 注意到方法一的时间复杂度较高的原因是寻找 target - x 的时间复杂度过高。因此，我们需要一种更优秀的方法，能够快速寻找数组中是否存在目标元素。如果存在，我们需要找出它的索引。
>
> 使用哈希表，可以将寻找 target - x 的时间复杂度降低到从 O(N) 降低到 O(1)。
>
> 这样我们创建一个哈希表，对于每一个 x，我们首先查询哈希表中是否存在 target - x，然后将 x 插入到哈希表中，即可保证不会让 x 和自己匹配。

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> table = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        if (table.containsKey(target - nums[i])) {
            return new int[] { i, table.get(target - nums[i]) };
        }
        table.put(nums[i], i);
    }
    return new int[0];
}
```

### No2. [字母异位词分组](https://leetcode.cn/problems/group-anagrams/)

给你一个字符串数组，请你将 **字母异位词** 组合在一起。可以按任意顺序返回结果列表。

**字母异位词** 是由重新排列源单词的所有字母得到的一个新单词。

 **示例 1:**

```
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

**示例 2:**

```
输入: strs = [""]
输出: [[""]]
```

**示例 3:**

```
输入: strs = ["a"]
输出: [["a"]]
```

> **思路及算法**
>
> 由于互为字母异位词的两个字符串包含的字母相同，因此对两个字符串分别进行排序之后得到的字符串一定是相同的，故可以将排序之后的字符串作为哈希表的键。

```java
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    for(String str : strs){
        char[] array = str.toCharArray();
        Arrays.sort(array);
        String key = new String(array);
        List<String> list = map.getOrDefault(key, new ArrayList<String>());
        list.add(str);
        // 添加完以后修改
        map.put(key, list);
    }
    return new ArrayList<List<String>>(map.values());
}   
```

### No3. [最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)

给定一个未排序的整数数组 `nums` ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 `O(n)` 的算法解决此问题。

 **示例 1：**

```
输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
```

**示例 2：**

```
输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
```

> **思路及算法**
>
> 我们考虑枚举数组中的每个数 x，考虑以其为起点，不断尝试匹配 x+1,x+2,⋯ 是否存在，假设最长匹配到了 x+y，那么以 x 为起点的最长连续序列即为 x,x+1,x+2,⋯,x+y，其长度为 y+1，我们不断枚举并更新答案即可。
>
> 对于匹配的过程，暴力的方法是 O(n) 遍历数组去看是否存在这个数，但其实更高效的方法是用一个哈希表存储数组中的数，这样查看一个数是否存在即能优化至 O(1) 的时间复杂度。
>
> 仅仅是这样我们的算法时间复杂度最坏情况下还是会达到 O(n 2)（即外层需要枚举 O(n) 个数，内层需要暴力匹配 O(n) 次），无法满足题目的要求。但仔细分析这个过程，我们会发现其中执行了很多不必要的枚举，如果已知有一个 x,x+1,x+2,⋯,x+y 的连续序列，而我们却重新从 x+1，x+2 或者是 x+y 处开始尝试匹配，那么得到的结果肯定不会优于枚举 x 为起点的答案，因此我们在外层循环的时候碰到这种情况跳过即可。
>
> 那么怎么判断是否跳过呢？由于我们要枚举的数 x 一定是在数组中不存在前驱数 x−1 的，不然按照上面的分析我们会从 x−1 开始尝试匹配，因此我们每次在哈希表中检查是否存在 x−1 即能判断是否需要跳过了。
>
> 增加了判断跳过的逻辑之后，时间复杂度是多少呢？外层循环需要 O(n) 的时间复杂度，只有当一个数是连续序列的第一个数的情况下才会进入内层循环，然后在内层循环中匹配连续序列中的数，因此数组中的每个数只会进入内层循环一次。根据上述分析可知，总时间复杂度为 O(n)，符合题目要求。

```java
public int longestConsecutive(int[] nums) {
    Set<Integer> num_set = new HashSet<Integer>();
    for (int num : nums) {
        num_set.add(num);
    }
    int longestStreak = 0;
    for (int num : num_set) {
        // 这处判断是为了找到某一个序列的开头
        if (!num_set.contains(num - 1)) {
            int currentNum = num;
            int currentStreak = 1;
			// 从此处找到了某段序列的开头，从这个开头起算出这个序列的长度
            while (num_set.contains(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }
            // 比较获得最长的序列长度
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }
    return longestStreak;
}
```

