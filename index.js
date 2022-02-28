const axios = require("axios")
const fs = require("fs")
const { parse } = require('json2csv')
const prompt = require('prompt-sync')()

async function run(){
    storeCredentials()

    const credentials = require("./credentials.json")

    console.log("🔎 Getting courses...")
    let courses = await getAllCourses(credentials)
    console.log(`📖 Found ${courses.length} courses. Saving them to "courses.csv"...`)

    createFile(courses)
    console.log(`🗄 "courses.csv" file created`)

    console.log("✅ Done!")
}

function storeCredentials(){
    if(!fs.existsSync("./credentials.json")){
        console.log("We need the credentials for the ElasticSearch server first:")
        const requestUrl = prompt('Server URL: ')
        const username = prompt('Username: ')
        const password = prompt('Password: ', {echo: "*"})

        fs.writeFileSync("credentials.json", JSON.stringify({
            requestUrl,
            username,
            password
        }))
    }
}

async function getAllCourses(credentials){
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
        data: {
            "query": {
                "match_all": {}
            }
        }
    })

    let data = response.data

    let courses = data.hits.hits

    let courseDetails = courses.map((course) => {
        return {
            title: course._source.title,
            status: course._source.status
        }
        
    })

    return courseDetails
}

function createFile(courses){
    const fields = ['title', 'status']
    const opts = { fields }
    const csv = parse(courses, opts);
    fs.writeFileSync("./courses.csv", csv)
}

run()