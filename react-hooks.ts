// useCallback useMemo 简单实现

let hookStates = [];// 保存状态的数组
let hookIndex = 0;//索引

function useMemo(factory, dependencies) {
  if (hookStates[hookIndex]) { // 说明不是第一次
    let [lastMemo, lastDependencies] = hookStates[hookIndex];
    // 判断一下新的依赖数组中的每一项是否跟上次完全相等
    let same = dependencies.every((item, index) => item === lastDependencies[index]);
    // 没变则用老的
    if (same) {
      hookIndex++;
      return lastMemo;
    } else { //只要有一个依赖变量不一样的话
      let newMemo = factory();
      hookStates[hookIndex++] = [newMemo, dependencies];
      return newMemo;
    }
  } else {// 说明是第一次渲染 
    let newMemo = factory();
    hookStates[hookIndex++] = [newMemo, dependencies];
    return newMemo;
  }
}

function useCallback(callback, dependencies) {
  if (hookStates[hookIndex]) { // 说明不是第一次
    let [lastCallback, lastDependencies] = hookStates[hookIndex];
    // 判断一下新的依赖数组中的每一项是否跟上次完全相等
    let same = dependencies.every((item, index) => item === lastDependencies[index]);
    if (same) {// 老依赖和新依赖都相同，则直接返回老的，如果不相同，则返回新的
      hookIndex++;
      return lastCallback;
    } else { //只要有一个依赖变量不一样的话
      hookStates[hookIndex++] = [callback, dependencies];
      return callback;
    }
  } else {// 说明是第一次渲染 
    hookStates[hookIndex++] = [callback, dependencies];
    return callback;
  }
}