const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], [])

module.exports = { 
  contentLength: function (websites) {
    return websites.map(web => `${web.website}, ${web.html.length}`)
  }, 
    
  dependencyList: function (websites) {
    const listWebDependency = web => {
      return web.dependencies.map(dependency => `${web.website}, ${dependency}`)
    }
    return flatMap(listWebDependency, websites)
  }, 
    
  frequency: function (websites) {
    const allDependencies = flatMap((web => web.dependencies), websites)
    const counter = allDependencies.reduce((repetitions, dep) => {
      repetitions[dep] = (repetitions[dep] || 0) + 1
      return repetitions
    }, {})

    let sort = Object.keys(counter).sort((a,b) => counter[b] - counter[a])
    return sort.map(e => `${e}, ${counter[e]}`)
  } 
}