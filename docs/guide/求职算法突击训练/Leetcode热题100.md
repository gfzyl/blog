# Leetcode热题100





























> **思路与算法**
>
> 空间复杂度 O(1) 时间复杂度为 O(n)
>
> 根据题目意思
>
> **如果两个链表相交，那么相交点之后的长度是相同的**
>
> 我们需要做的事情是，让两个链表从同距离末尾同等距离的位置开始遍历。这个位置只能是较短链表的头结点位置。
> 为此，**我们必须消除两个链表的长度差**
>
> * 指针 pA 指向 A 链表，指针 pB 指向 B 链表，依次往后遍历
>
> * 如果 pA 到了末尾，则 pA = headB 继续遍历
>
> * 如果 pB 到了末尾，则 pB = headA 继续遍历
> * 比较长的链表指针指向较短链表head时，长度差就消除了
>   如此，只需要将最短链表遍历两次即可找到位置
>   ![相交链表.png](https://pic.leetcode-cn.com/e86e947c8b87ac723b9c858cd3834f9a93bcc6c5e884e41117ab803d205ef662-%E7%9B%B8%E4%BA%A4%E9%93%BE%E8%A1%A8.png)

```java
public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    if (headA == null || headB == null) return null;
    ListNode pA = headA, pB = headB;
    while (pA != pB) {
        pA = pA == null ? headB : pA.next;
        pB = pB == null ? headA : pB.next;
    }
    return pA;
}
```

