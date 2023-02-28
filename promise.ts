const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function myPromise(executor) {
    var _this = this
    this.state = PENDING; //状态
    this.value = undefined; //成功结果
    this.reason = undefined; //失败原因

    this.onFulfilled = [];//成功的回调
    this.onRejected = []; //失败的回调
    function resolve(value) {
        if(_this.state === PENDING){
            _this.state = FULFILLED
            _this.value = value
            _this.onFulfilled.forEach(fn => fn(value))
        }
    }
    function reject(reason) {
        if(_this.state === PENDING){
            _this.state = REJECTED
            _this.reason = reason
            _this.onRejected.forEach(fn => fn(reason))
        }
    }
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
myPromise.prototype.then = function (onFulfilled, onRejected) {
    if(this.state === FULFILLED){
        typeof onFulfilled === 'function' && onFulfilled(this.value)
    }
    if(this.state === REJECTED){
        typeof onRejected === 'function' && onRejected(this.reason)
    }
    if(this.state === PENDING){
        typeof onFulfilled === 'function' && this.onFulfilled.push(onFulfilled)
        typeof onRejected === 'function' && this.onRejected.push(onRejected)
    }
};

/** Promise.all */
(Promise as any).all2 = function(iterators) {
  return new Promise((resolve, reject) => {
    if (!iterators || iterators.length === 0) {
      resolve([])
    } else {
      // 计算器，用于判断所有任务是否执行完成
      let count = 0;
      // 结果数组
      let result = [];
      // 执行数组长度
      let len = iterators.length
      for(let i = 0; i < len; i++) {
        // 考虑到iterators[i]可能是普通对象，则统一包装为Promise对象
        Promise.resolve(iterators[i]).then( (data) => {
          // 按顺序保存对应的结果
          result[i] = data;
          // 判断++count 的次数是否等于 传入执行数组的长度
          if (++count === len) {
              resolve(result);
          }
        }, (err) => {
          // 任何一个Promise对象执行失败，则调用reject()方法
          reject(err);
        })
      }
    }
  })
}
