/**
 * asyncLimit 异步并发控制
 * @param {Array} arr 请求数组
 * @param {Function} handler 请求处理函数要求返回Promise对象 ((...) => new Promise(...))
 * @param {Number} [limit=1]  并发数限制值
 * @param {Function} [callback=false] (可选) 单个请求处理函数
 * @returns 
 */
const asyncLimit = (
  arr,
  handler,
  limit = 1,
  callback = false
) => {
  const queue = Array.from(arr)
  const result = []
  let count = 0

  return new Promise((res, rej) => {
    const next = () => {
      if (queue.length <= 0 || count > limit) return
      count++
      handler(queue.shift())
        .then(data => {
          count--
          next()
          result.push(data)
          callback 
            ? callback(data)
            : (count === 0) 
              ? res(result)
              : ''
        })
        .catch(err => 
          callback
            ? callback(err) 
            : rej(err)
        )
    }
    
    if (limit === 1) return next()
    for (let i = 0; i < limit && i < queue.length; i++) {
      next()
    }
  })
}