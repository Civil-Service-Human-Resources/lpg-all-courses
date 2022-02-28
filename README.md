# All Courses Script

This is a script to run to create a CSV file of all courses that exist in the learning platform, with their status.

## Running the script

### Prerequisites

1. You will need to have Git ([install here](https://git-scm.com/downloads)) and Docker ([install here](https://docs.docker.com/get-docker/)) installed and running
2. You will need to have the Elastic Search server credentials at hand. This includes, the server URL, username and password.

### 1. Clone this repo

```sh
git clone https://github.com/Civil-Service-Human-Resources/lpg-all-courses.git
cd lpg-all-courses
```

### 2. Run the script

To run the script to get all the courses, within the `lpg-all-courses` directory run these lines within your Terminal:

<details>
    <summary>Mac / Linux</summary>
<pre><code>./run.sh</code></pre>
</details>

<details>
    <summary>Windows</summary>
    In Powershell, run:

<pre><code>docker run -it --rm -v ${PWD}:/all-courses -w /all-courses node:17.6.0-slim bash -c "npm i && npm start"</code></pre>
</details>

This script will generate a CSV file called `courses.csv` in that directory with all the courses plus their status.

Here's what the script does:

Firstly, the script will install all the necessary stuff (Node packages) the script needs to run

Then it will check for a `credentials.json` file which should contain the login details for the Learning Catalogue. If the file doesn't exist, then it will prompt you to add them:

```
We need the credentials for the ElasticSearch server first:
Server URL: 
```


The resulting `credentials.json` file should look like this:

```json
{
    "requestUrl": "https://es-url:9200",
    "username": "username",
    "password": "password"
}
```

It will then try and get all the courses available in the catalogue and store them in the `courses.csv` file. This is how it'll look like in the terminal:

```
🔎 Getting courses...
📖 Found 1010 courses. Saving them to "courses.csv"...
🗄 "courses.csv" file created
✅ Done!
```

The resulting `courses.csv` file should look like this when opened with a text editor:

```
"title","status"
"Course 1","Published"
"Course 2","Published"
"Course 3","Draft"
"Course 4","Archived"
```

## Configuration

You can change various settings by editing the `config.json` file.

### Add and remove fields from the output

By default, the output file contains the "title" and "status" of each course. You can add or remove fields to be included in the output by updating the `fields` array in the `config.json` file.

### Change the name of the output file

By default, the output file is `courses.csv`. You can change the name of the file by editing the value of `outputFile` in the `config.json` file.