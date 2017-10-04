const asyncLimit = (urls, limit = 1, handler) => {
    const queue = Array.from(urls)
    const result = []
    let count = 0

    return new Promise((res, rej) => {
      const next = () => {
        if (queue.length <= 0 || count > limit) return
        count++
        handler(queue.shift())
          .then(img => {
            count--
            next()
            result.push(img)
            if (count === 0) res(result)
          })
          .catch(rej)
      }
      
      for (let i = 0; i < limit && i < queue.length; i++) {
        next()
      }
  })
}