# Swift-Task-Manager
Final year project assignment to demonstrate skills gained throughout the degree. This project takes the form of a full-stack task management web application.

## Stack

**Frontend**: 
- Next.js 14.1.0
- React 18.2.0

**Backend**: 
- ASP.NET Core 7.0.405
- Entity Framework Core 7.0.0

**Database**: 
- SQLite

## Installation

These instructions have been written for, and tested on, both Windows and MacOS devices.

1. Download and unzip source code. 

2. Install [Docker](https://www.docker.com/) on your system.

3. Install [Node.js](https://nodejs.org/en/download) on your system. 

4. Open `taskAPI` directory (contains `Program.cs` file) in Terminal and run command `docker-compose up`. 
   

5. Open `task-client` directory (contains `src` directory) in Terminal and run command `npm install`. 

6. Still within `task-client` directory in Terminal, run command `npm run dev`.

The ASP.NET Core web api will now be running at `http://localhost:6001`. 

The Next.js frontend will now be running at `http://localhost:3000`. 

To view the list of API endpoints, navigate to `http://localhost:6001/swagger/index.html`

If the frontend is running on any other port (such as 3001), it will not be able to connect to the backend. If this happens, it is likely there is already an instance of the frontend, or some other application, running on port 3000. 

## Usage Instructions

Upon navigation to `http://localhost:3000`, an automatic redirection to the login page (`/login`) will occur. 

### Registration

1. On the login page, click `Register` found below the login button. 

2. On the registration page, enter the desired email, password, and full name. For instance:

   ```
   Email:      test@test.com 
   Password:   Pass01
   First Name: John
   Last Name:  Doe
   ```
3. Press the `Enter` key or click the `Register` button.

   A redirection to the dashboard page (`/dashboard`) will occur.

### Login

1. On the login page, enter the email and password used to register an account. For instance:

   ```
   Email:      test@test.com 
   Password:   Pass01
   ```

2. Press the `Enter` key or click the `Login` button.

   A redirection to the dashboard page will occur

### Logout

1. On the dashbord page, click the `Account` button found at the bottom left of the page in the sidebar.

2. Directly above the `Account` button, press the `Logout` button that has appeared.
