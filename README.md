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

To run the script to get all the courses, within the `all-courses` directory run the `run.sh` script:

```
./run.sh
```

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
