const axios = require("axios")
const fs = require("fs")
const { parse } = require('json2csv')
const prompt = require('prompt-sync')()

async function run() {
    if (!credentialsAreStored()) {
        storeCredentials()
    }

    const credentials = require("./credentials.json")

    console.log("Getting courses...")
    let courses = await getAllCourses(credentials)
    console.log(`Found ${courses.length} courses.`)
    
    let courseModules = getModuleRows(courses)

    console.log("Creating CSV...")
    let csvFileName = `csl_courses_${getCurrentFormattedDate()}.csv`
    
    let csv = parse(courseModules)
    fs.writeFileSync(csvFileName, csv)

    console.log(`Created file with name ${csvFileName}`)
}

function credentialsAreStored(){
    return fs.existsSync("./credentials.json")
}
 
function storeCredentials() {
    console.log("We need the credentials for the ElasticSearch server first:")
    const requestUrl = prompt('Server URL: ')
    const username = prompt('Username: ')
    const password = prompt('Password: ', { echo: "*" })

    fs.writeFileSync("credentials.json", JSON.stringify({
        requestUrl,
        username,
        password
    }))
}

async function getAllCourses(credentials) {
    let dataQuery = {
        "query": {
            "query_string": {
                "fields": ["status"],
                "query": "Published"
            }
        }
    }

    let response = await axios({
        method: "get",
        url: `${credentials.requestUrl}/courses/_search?size=10000`,
        auth: {
            username: credentials.username,
            password: credentials.password
        },
        headers: {
            'content-type': 'application/json'
        },
        data: dataQuery
    })

    let data = response.data

    let courses = data.hits.hits

    return courses
}

function getModuleRows(courses){
    let courseModules = []

    courses.forEach((course) => {
        let modules = course._source.modules

        modules.forEach((module) => {
            courseModules.push({
                courseID: course._source.id,
                courseName: course._source.title,
                courseCreationDate: course._source.createdTimestamp,
                moduleID: module.id,
                moduleName: module.title,
                moduleType: module.type
            })
        })
    })

    return courseModules
}

function getCurrentFormattedDate() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    const date = new Date()
    const day = String(date.getDate()).padStart(2, '0')
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    
    return `${day}_${month}_${year}`
}

run()