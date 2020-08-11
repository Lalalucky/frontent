## 常见问答 
+ 节流和防抖分别是什么，有什么区别

>防抖是在单位时间里面，控制操作的次数，比如防止多次点击导致的页面卡顿；
> 节流是将多次执行变成每隔一段时间执行；
> 最根本的区别在于：防抖是将多次执行变成最后一次执行；而节流是将多次执行改成每隔一段时间执行
```
const debounce = (fn, wait) => {    
  let timer
  return (...args) => {
    // 你要是敢点，我就在你点击完之后的 wait 时间之后给你执行
    clearTimeout(timer)       
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }
}

const throttle = (fn, wait) {
  let timer
  return (...args) => {
    // 要是延时器没有完成，你就等完成之后，我再给你执行
    if (timer) { return }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, wait)
  }
}
```
---
