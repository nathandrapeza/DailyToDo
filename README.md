# DailyToDo
DailyToDo is an account-based daily planner styled full stack web application that tracks user defined tasks (including both complete and incomplete tasks). A simplistic and intuitive user interface design, persistent data (which does not disappear after user signout), and positive reinforcement were used with the goal of helping users increase their amount of daily productivity.


*(The low amount of git commits on this repository is due to an accidental information leak from the original repository, which had 40+ commits. I have deleted the original repository and have placed all contents into this one.)*
# Demonstration
## Typical user workflow
![User workflow demonstration](https://raw.githubusercontent.com/nathandrapeza/DailyToDo/main/demo/user_workflow.gif)
## Account Registration
![Account registration demonstration](https://raw.githubusercontent.com/nathandrapeza/DailyToDo/main/demo/account_registration.gif)
## Lost Password Management
![Password reset demonstration](https://raw.githubusercontent.com/nathandrapeza/DailyToDo/main/demo/password_reset.gif)

# Technologies Used

* Backend runtime environment - Django (Python)
* RESTful API - Django Rest Framework (Python)
* Database - SQLite
* Frontend Framework - React
* Other technologies
    * Styling - SASS / SCSS
    * HTTP Interactions - axios
    * Notifications - Toast
    
# Running Locally
1. Ensure React, Yarn (or NPM), and Python are installed on your device.
2. Clone this repository onto your local drive.
3. Open two terminal applications, and change into the `/front-end` directory and `/back-end` directory.
4. In the `/front-end` directory, run command `yarn start` or `npm start`, depending on package manage preference.
5. in the `/back-end` directory, run command `source env/bin/activate` to activate the virtual Python environment containing all python dependencies.
6. In the terminal running the virtual Python environment, open the `back-end/api` directory and run command `python3 manage.py runserver`

Upon completing these instructions, you will be able to use DailyToDo on your machine locally by navigating to `localhost:3000` in any web browser. Persistent application to-do list item data will be stored on your device in the SQLite database, and account login information will be saved locally in your browser, so that you can use the application without having to re-enter credentials.
    
# Contributions
**Nathan Drapeza**: Front-end, back-end, user interface application design (including logo and design mockups). Specific externally sourced helper code is labeled and cited.
