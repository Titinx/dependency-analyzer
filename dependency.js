const htmlparser = require('htmlparser2')

module.exports = {

  getDependencies: function (web) {
    return new Promise((resolve, reject) => {
      const dependencies = []
      const parser = new htmlparser.Parser({
        onopentag: function(name, attrs){
          if(name === 'script' && attrs.src){
            let dependency = attrs.src.split('/').pop()
            dependency = dependency.split('?').shift()
            dependencies.push(dependency)
          }
        },
      }, {decodeEntities: true})
      parser.write(web.html)
      parser.end()
      web.dependencies = dependencies
      resolve(web)
    })
  }
  
}