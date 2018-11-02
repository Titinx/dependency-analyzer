const fs = require('fs')
const csv = require('csv-parser')

const fw = require('./fetch-websites.js')
const dependency = require('./dependency.js')
const exercices = require('./exercises.js')

const fileCSV = 'websites.csv'
const websiteList = []

async function run (websiteList) {
  const promises = websiteList.map((web) => {
    return fw.fetch(web).then(dependency.getDependencies)
  })
  
  let result = await Promise.all(promises)

  console.log(`
    1- Length: Retrieve the list of results containing
    the website name and the content length( in bytes)
   `)

  console.log(exercices.contentLength(result))

  console.log(`
    2.1- Dependencies: Retrieve the list of results containing
    the website name and the dependencies
  `)

  console.log(exercices.dependencyList(result))

  console.log(`
    2.2 - Frequency
    Retrieve the dependencies and the frequency occurrences:
  `)

  console.log(exercices.frequency(result))
}

fs.createReadStream(fileCSV)
  .pipe(csv({headers: ['website', 'path'], separator: ','}))
  .on('data', (e) => { websiteList.push(e) })
  .on('end', () => { run(websiteList) })




