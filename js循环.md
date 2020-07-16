#### js循环
#####   - for in 和 for of 以及其他遍历

- for in 是js本来就有的方法，for of 是参照其他语言在es6里面推出的方法；
- 不推荐for in 来遍历数组：
~~~
  let arr = [9,undefined,,7]
  arr.local = 'js' ;
  for( ie in arr ){
    console.log(ie);        // 0,1,3,local
    console.log(arr[ie])    // 9,undefined,7,'js'
  }
  let arr = [9,undefined,,7]
  arr.local = 'js' ;
  for( ie of arr ){
    console.log(ie)    // 9,undefined,undefined,7
  }
~~~ 
##### 可以看出for in 会遍历出我们不需要的属性，另外得到的是键值，不是直接得到元素,而且会自动跳过空值，但是这恰恰我们有时间是需要的获取的
- 其他的遍历方式：
  + forEach 不能使用 break/continue,只能用 return false跳出当前循环
  ~~~
  let arr = [9,undefined,,7];
  arr.local = 'js';
  arr.forEach(ele=>{
    if(!ele){
      // break;    // Illegal break statement
      return false 
    }
    console.log(ele)    // 9 , 7
  })
  ~~~
  + 基本的for循环没有明显缺点
  + Array.prototype.map 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
  + Array.prototype.filter 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
  + Array.prototype.every() 返回布尔值
  + Array.prototype.some() 返回布尔值 
  
  


