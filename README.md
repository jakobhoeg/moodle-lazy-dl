# moodle-lazy-dl
An extremely simple bot that **downloads** all files from all your assigned _Moodle courses_, so you don't have to *manually* do it yourself :yawning_face:

Works on **Windows**, **Mac** and **Linux**.

> As of now, this is created and tested only for EASV - Erhvervsakademi Sydvest. Feel free to test it out for any other universities that use Moodle, and contribute to the repo :)

https://github.com/jakobhoeg/moodle-lazy-dl/assets/114422072/9c3a826a-bf3c-4c46-9f6c-86c66869b4ed

## Requisites
You must have installed [Node.js](https://nodejs.org/en/download) to run the bot. The installation also includes npm (node package manager).

## Get started
Follow these steps:
1. **Clone the repository** or **download the zip** and unzip it to a folder.
2. Open the folder in a command prompt.
3. Install dependencies by typing ```npm install```
4. Create a **.env** file in the root of the project with the same variables that are in **.env.example** and make sure to edit your _username_ and _password_.
5. _This step is not required, but if you want to download **ALL** your courses (from ALL semesters) you have to change the variable ```listItemText``` in the **app.js** file from ```I gang``` to ```Alle```. By default it only downloads the courses that are In Progress._
6. Run the program by typing ```node app.js```

> Occasionally, playwright dependency doesn't install correctly. If that happens, you might have to install it manually with ```npx playwright install``` and then you should be able to run ```node app.js```.

Default folder path for downloaded files are ```C:\Users\<username>\moodle```
