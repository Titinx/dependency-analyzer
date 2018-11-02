const fs = require('fs')
const rp = require('request-promise')

module.exports = { 

	/**
	 * @param {Object} web - represent information about a website.
	 * @param {string} web.website - the website's name.
	 * @param {string} web.path - the website's uri or path depending where it is stored
	 * @returns {Promise} Promise object represents the web object + web.html content.
	 */
	fetch: function (web) {
		return (web.path.includes('http'))
			? this.fetchFromExternal(web)
			: this.fetchFromLocal(web)
	},

	fetchFromLocal: function (web) {
	  return new Promise((resolve, reject) => {
	    fs.readFile(web.path.trim(), 'utf8', (err, data) => {
	      if (err && err.code === 'ENOENT') {
	        reject(err)
	      }
	      web.html = data
	      resolve(web)
	    })
	  }) 
	},

	fetchFromExternal: function (web) {
	  return rp({
	    uri: web.path,
	    method: 'GET',
	    resolveWithFullResponse: true
	  })
	    .then((response) => {
	      web.html = response.body
	      return web
	    })
	    .catch((err) => { return err })
	}
}