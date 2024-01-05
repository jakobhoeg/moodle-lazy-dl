# moodle-lazy-dl
A bot that **downloads** all files from all your assigned _Moodle courses_, so you don't *manually* have to do it yourself :yawning_face:

Works on **Windows**, **Mac** and **Linux Desktop**.

> As of now, this is created and tested only for EASV - Erhvervsakademi Sydvest. Feel free to test it out for any other universities that use Moodle, and contribute to the repo :)

## Demo
https://github.com/jakobhoeg/moodle-lazy-dl/assets/114422072/9c3a826a-bf3c-4c46-9f6c-86c66869b4ed

## Requisites
You must have installed [Node.js](https://nodejs.org/en/download) to run the bot. The installation in the link includes npm (node package manager), which is also required.

## Quick Start
Below are instructions to set up the **moodle-lazy-dl** on your computer.

**1. Clone the repository to a directory on your pc via command prompt:**
   
```
git clone https://github.com/jakobhoeg/moodle-lazy-dl
```

**2. Open the folder:**

```
cd moodle-lazy-dl
```
   
**3. Install dependencies:**

```
npm install
```

**4. Rename the `.example.env` to `.env`:**

```
mv .example.env .env
```

**5. Replace the variables in the `.env` file with your university's _Moodle_ web url and your _username_ & _password_:**

```
MOODLE_WEB_URL="https://moodle.easv.dk"
MOODLE_USERNAME="your_username"
MOODLE_PASSWORD="your_password"
```
   
7. _This step is not required, but if you want to download **ALL** your courses (from ALL semesters) and not only the ones from your current semester, you have to change a variable in the **app.js** file:_

```
// Change the variable below to "Alle":
const listItemText = "I gang";
```

**8. Run the program:**

```
node .
```
Or:
```
node app.js
```

> Occasionally, playwright dependency doesn't install correctly. If that happens, you might have to install it manually with ```npx playwright install``` and then you should be able to run ```node app.js```.

Default folder path for downloaded files are ```C:\Users\<username>\moodle```
