const path = require('path')
const glob = require("glob")

function addMapping(router, mapping, prefix) {
  Object.keys(mapping).forEach(url => {
    if (url.startsWith('GET ')) {
      let path = url.substring(4)
      router.get(`${prefix}${path}`, mapping[url])
      console.log(`register URL mapping: GET ${prefix}${path}`)
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5)
      router.post(`${prefix}${path}`, mapping[url])
      console.log(`register URL mapping: POST ${prefix}${path}`)
    } else if (url.startsWith('PUT ')) {
      let path = url.substring(4)
      router.put(`${prefix}${path}`, mapping[url])
      console.log(`register URL mapping: PUT ${prefix}${path}`)
    } else if (url.startsWith('DELETE ')) {
      let path = url.substring(7)
      router.del(`${prefix}${path}`, mapping[url])
      console.log(`register URL mapping: DELETE ${prefix}${path}`)
    } else if(url.startsWith('ALL ')) {
      let path = url.substring(4)
      router.all(`${prefix}${path}`, mapping[url])
      console.log(`register URL mapping: ALL ${prefix}${path}`)
    } else {
      console.log(`invalid URL: ${url}`)
    }
  })
}

function addControllers(router, dir, prefix) {
  glob(path.resolve(dir, `**/*.js`), {}, function (err, files) {
    files.map(f => {
      console.log(`process controller: ${f}...`)
      let mapping = require(f)
      addMapping(router, mapping, prefix)
    })
  })
}

module.exports = function (KoaRouter, prefix, dir) {
  const router = new KoaRouter()
  addControllers(router, dir, prefix)
  return router
}
