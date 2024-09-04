# Stream流式计算

::: tip 引出

JDK 8 引入了流式计算（Stream API），它为集合类提供了一种高效、可读性强的操作方式。Stream API 允许你以声明式的方式处理数据，并且支持并行计算。下面是
JDK 8 中流式计算的主要 API 及其相应的示例。

:::

## 1. **创建流 (Stream Creation)**

你可以从集合、数组、生成器、文件等创建流。

```java
// 从集合创建流
List<String> list = Arrays.asList("a", "b", "c", "d");
Stream<String> streamFromList = list.stream();

// 从数组创建流
String[] array = {"a", "b", "c", "d"};
Stream<String> streamFromArray = Arrays.stream(array);

// 使用 Stream.of() 创建流
Stream<String> stream = Stream.of("a", "b", "c");

// 使用 Stream.generate() 创建无限流
Stream<Double> randomNumbers = Stream.generate(Math::random);

// 使用 Stream.iterate() 创建流
Stream<Integer> numbers = Stream.iterate(0, n -> n + 2);

// 从文件生成流 (Java 8 NIO Files.lines)
Stream<String> lines = Files.lines(Paths.get("file.txt"), Charset.defaultCharset());
```

## 2. **中间操作 (Intermediate Operations)**

这些操作是惰性求值的，即仅在终端操作触发时才会执行。

### 2.1 **过滤 (Filter)**

根据条件过滤元素。

```java
List<String> result = list.stream()
    .filter(s -> s.startsWith("a"))
    .collect(Collectors.toList());
```

### 2.2 **映射 (Map)**

将每个元素映射为另一种元素。

```java
List<String> result = list.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

### 2.3 **扁平化 (FlatMap)**

将每个元素的流展开为单个流。

```java
List<List<String>> listOfLists = Arrays.asList(
    Arrays.asList("a", "b"),
    Arrays.asList("c", "d")
);
List<String> result = listOfLists.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());
```

### 2.4 **排序 (Sorted)**

对流中的元素进行排序。

```java
List<String> result = list.stream()
    .sorted()
    .collect(Collectors.toList());
```

### 2.5 **去重 (Distinct)**

去除流中的重复元素。

```java
List<String> result = list.stream()
    .distinct()
    .collect(Collectors.toList());
```

### 2.6 **限制 (Limit)**

限制流中的元素数量。

```java
List<String> result = list.stream()
    .limit(2)
    .collect(Collectors.toList());
```

### 2.7 **跳过 (Skip)**

跳过前 n 个元素。

```java
List<String> result = list.stream()
    .skip(2)
    .collect(Collectors.toList());
```

## 3. **终端操作 (Terminal Operations)**

这些操作会触发流的执行，并生成一个结果。

### 3.1 **收集 (Collect)**

将流结果收集为列表、集合或映射。

```java
List<String> result = list.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

### 3.2 **迭代 (ForEach)**

遍历流中的每个元素。

```java
list.stream()
    .forEach(System.out::println);
```

### 3.3 **匹配 (Match)**

检查流中的元素是否满足特定条件，返回布尔值。

```java
boolean anyStartsWithA = list.stream()
    .anyMatch(s -> s.startsWith("a"));
```

### 3.4 **查找 (Find)**

查找符合条件的第一个或任意一个元素。

```java
Optional<String> first = list.stream()
    .filter(s -> s.startsWith("a"))
    .findFirst();
```

### 3.5 **归约 (Reduce)**

将流中的元素组合成一个结果。

```java
Optional<String> concatenated = list.stream()
    .reduce((s1, s2) -> s1 + s2);
```

### 3.6 **计数 (Count)**

计算流中元素的数量。

```java
long count = list.stream()
    .filter(s -> s.startsWith("a"))
    .count();
```

## 4. **并行流 (Parallel Stream)**

流可以并行执行以提高性能。

```java
List<String> result = list.parallelStream()
    .filter(s -> s.startsWith("a"))
    .collect(Collectors.toList());
```

## 总结

JDK 8 的 Stream API 提供了强大的流式数据处理功能，允许你以声明式的方式对集合进行复杂的操作。通过使用流，可以写出更简洁、更易维护的代码，同时在需要时利用并行流提高性能。