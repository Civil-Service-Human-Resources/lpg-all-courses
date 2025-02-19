# All Active Courses script

This is a script to run to create a CSV file of all courses and their modules that exist in the learning platform.

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

To run the script to get all the courses, within the `lpg-all-courses` directory execute the run script.

#### With Docker

Mac / Linux:

```sh
./run.sh
```

Windows (PowerShell)

```sh
.\run.ps1
```

#### Without Docker

To run the script without Docker, you'll need to install NodeJS first:

```sh
npm i && npm start
```

This script will generate a CSV file called `csl_courses_<day>_<month>_<year>.csv` in the root directory.

Here's what the script does:

Firstly, the script will install all the necessary stuff (Node packages) the script needs to run

Then it will check for a `credentials.json` file which should contain the login details for the Learning Catalogue. If the file doesn't exist, then it will prompt you to add them:

```
We need the credentials for the ElasticSearch server first:
Server URL: https://my-es-server.com:443
Username: myUsername
Password: *********
```


The resulting `credentials.json` file should look like this:

```json
{
    "requestUrl": "https://my-es-server.com:443",
    "username": "myUsername",
    "password": "password1"
}
```

It will then try and get all the courses available in the catalogue and store them in the CSV file. This is how it'll look like in the terminal:

```bash
Getting courses...
Found 623 courses.
Creating CSV...
Created file with name csl_courses_31_Oct_2024.csv
```

The resulting CSV file should look like this when opened with a text editor:

```csv
"courseID","courseName","courseCreationDate","moduleID","moduleName","moduleType"
"ABC","Course1","2024-04-04T11:28:25","abc123","Module1","file"
"ABD","Course2","2024-04-04T11:28:25","abc125","Module2","file"
```