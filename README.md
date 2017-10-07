# j-async

## 使用方法
```javascript
const urls = [
  'http://placehold.it/1300x1600/E97452/fff',
  'http://placehold.it/1300x1300/4C6EB4/fff',
  'http://placehold.it/1300x1250/449F93/fff',
  'http://placehold.it/dsadsa/936FBC/fff',
  'http://placehold.it/1000x500/D25064/fff',
  'http://placehold.it/1300x1200/D25064/fff',
  'http://placehold.it/749x1327/D25064/fff'
]

const loadImg = (url) => {
  return new Promise((res, rej) => {
    const img = new Image()
    img.src = url
    img.onload = () => res(img)
    img.onerror = rej
  })
}

asyncLimit(
  urls,             // 请求的url数组
  loadImg,          // 请求的处理方法(要求返回Promise对象)
  4,                // 并发数限制值
  (data, err) => {  // 单个请求回调
    // ...
  }
)
.then(results => {  // 所有请求完成回调
  // ...
})
```


