# DailyToDo
DailyToDo is an account-based daily planner styled full stack web application that tracks user defined tasks (including both complete and incomplete tasks). A simplistic and intuitive user interface design, persistent data (which does not disappear after user signout), and positive reinforcement were used with the goal of helping users increase their amount of daily productivity.

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
3. Open two terminal applications.
4. In one terminal application, open the `/front-end` directory, and run command `yarn` and then `yarn start`. For users who prefer npm, run `npm start`. This will run the front-end React application.
5. In the second terminal application, open the `/back-end` directory, and run the command `source env/bin/activate` to activate the virtual Python environment which contains all of the necessary python dependencies.
6. In the terminal application with `back-end/api` open, run commands `python3 manage.py makemigrations`, `python3 manage.py makemigrations main`, `python manage.py migrate --run-syncdb`, and `python manage.py runserver` all in order. This will run the back-end runtime environment.

Upon completing these instructions, you will be able to use DailyToDo on your machine locally by navigating to `localhost:3000` in any web browser. Persistent application to-do list item data will be stored on your device in the SQLite database, and account login information will be saved locally in your browser, so that you can use the application without having to re-enter credentials.
    
# Contributors
**Nathan Drapeza**: Front-end, back-end, user interface application design (including logo and design mockups), and all work from the original GitHub repository. Specific externally sourced helper code is labeled and cited.
