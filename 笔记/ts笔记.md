## 基本概念

TS 是JS类型的超集，它可以编译成纯JS

TS可以在任何浏览器，任何计算机和任何操作系统上运行，并且是开源的



 TS和JS之间的关系其实就是Less/Sass和CSS之间的关系 就像Less/Sass是对CSS进行扩展一样, TS也是对JS进行扩展 就像Less/Sass最终会转换成CSS一样, 我们编写好的TS代码最终也会换成JS

 TypeScript是JavaScript的超集，因为它扩展了JavaScript，有JavaScript没有的东西。 硬要以父子类关系来说的话，TypeScript是JavaScript子类，继承的基础上去扩展。



**为什么需要TypeScript?**

简单来说就是因为JavaScript是弱类型, 很多错误只有在运行时才会被发现 而TypeScript提供了一套静态检测机制, 可以帮助我们在编译时就发现错误

好处：

1. 强类型语言，对JS弱类型的一个良好补充
2. TS利于大型项目团队合作，可以一定程度上提高研发效率，避免低级错误。
3. TS的研发成本是比较高的，会多写一些额外的代码。玩的好它就很有帮助，玩的不好就是炸弹





## 基础类型

#### 布尔值

```JavaScript
let isDone: boolean = false;
```

#### **数字**

```JavaScript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

#### **字符串**

```JavaScript
let name: string = "bob";
name = "smith";
```

#### **数组**

```JavaScript
let list: number[] = [1, 2, 3];

let list: Array<number> = [1, 2, 3];
```



#### **元组**

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 `string`和`number`类型的元组。

` 元祖类型定义的类型和值要一一对应，否则会抛出错误`



应用场景：**用于函数的返回值，有多个的情况下**

```JavaScript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```



#### **枚举**

`enum`类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```JavaScript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

console.log(Color)  ——>![image-20231020163409291](F:\workspace\shc\ts-study\笔记\ts笔记.assets\image-20231020163409291.png)

console.log(c) ——> 打印出来的是对应的索引



**枚举的下标可以修改，也可以通过枚举的下标来获取对应的值**

![image-20231020163629218](F:\workspace\shc\ts-study\笔记\ts笔记.assets\image-20231020163629218.png)



#### any

any表示任何类型，当然于没用TS

```js
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```





#### Void

某种程度上来说，`void`类型像是与`any`类型相反，它表示没有任何类型

```js
function warnUser(): void {
    console.log("This is my warning message");
}
```



#### Null 和 Undefined

TypeScript里，`undefined`和`null`两者各自有自己的类型分别叫做`undefined`和`null`。 和 `void`相似，它们的本身的类型用处不是很大

```js
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null
```

`默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量`



#### Never

`never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。`

`never类型是任何类型的子类型，也可以赋值给任何类型；然而，*没有*类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使any也不可以赋值给never`

应用场景：**错误，死循环**

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```



#### Object

`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。

使用`object`类型，就可以更好的表示像`Object.create`这样的API。例如：

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```



#### 类型断言

有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

**简单来说就是自己知道某个值代表什么类型，去自定义它（我是对的，你是错的，听我的）**

```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

另一个为`as`语法：

```ts
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```



## 接口

TypeScript的核心原则之一是对值所具有的*结构*进行类型检查。在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

```ts
interface labelledObjType {
  label: string;
  size: number;
}
function printLabel(labelledObj: labelledObjType) {
  console.log(labelledObj);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

```

