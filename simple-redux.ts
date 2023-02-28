export function createStore(reducer) {
  //数据属性
  let state;
  //监听函数数组
  let listeners = [];

  //获取state
  const getState = () => state;

  //分发action任务
  const dispatch = (action) => {
    state = reducer(state, action);//执行reduce并获取新的state
    //此时state已经更新，依次执行所有listener监听器方法
    listeners.forEach(listener => {
      console.log("监听函数刷新执行");
      listener();
    });
  };

  //绑定监听器方法
  const subscribe = (listener) => {
    //直接添加到listeners数值中即可
    listeners.push(listener);
    return () => {
      //filter:   array.filter(function (x) {return x % 2 !== 0;});)
      console.log("listeners filter前:"+listeners);
      listeners = listeners.filter((l) => {return l !== listener});//返回listeners中不同的listener
      console.log("listeners filter后:"+listeners);
    }
  };

  //先调用一次dispatch  以初始化state
  dispatch({});

  return { getState, dispatch, subscribe };
}
