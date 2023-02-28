/** 节流：隔一定的时间才执行函数 */
function throttle(fn, wait = 0) {
    let timerId;
    let lastInvoke = Number.MIN_SAFE_INTEGER; // 上次调用时间
  
    return function(...args) {
      // 当前时间
      const currTime = new Date().getTime();
      // 距离下次执行的剩余时间
      const remain = Math.max(lastInvoke + wait - currTime, 0);
      // 更新定时器，确保同一时间只有一个定时器在运行
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        lastInvoke = new Date().getTime();
        fn(...args);
      }, remain);
    }
}

const debounce = function (fn, wait) {
    // 自由变量，debounce执行完成被释放，time也不会被释放
    let time;
    // 返回一个闭包，接受参数
    return function (...args) {
      // 清除上一次的定时器
      if (time) {
        clearTimeout(time);
      };
      // 不再是直接执行fn，在内部传递参数
      time = setTimeout(() => {
        fn(args);
      }, wait);
    }
}