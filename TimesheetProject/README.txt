Timesheet APP
A client server application with .NET Framework, SQL Database and ReactJS/Redux


Setting up the project:


SQL Database:


Sample database is located in the TimesheetDb folder (.mdf file).


Connection String can be changed in the Web.config file under <connectionStrings>.


TimesheetAPI (.NET Framework):

Before starting the project, you may need to open .sln file in Visual Studio, right click on References --> Manage NuGet Packages and click on Restore.


The maximum number of hours can be configured in the Web.config file, <add key="timeSheetMaxHours" value="8"/>.


TimesheetAPP(ReactJS & Redux):


Before starting the project, please check the base URL in the api.service.js (line 3), and change this to the URL on which your API is running (for example: axios.defaults.baseURL = 'https://localhost:44396/api/').


The requirement for npm is to have the Node.js version that is higher than 10.x.


The base setup of ReactJS application is created with create-react-app cli.








Starting the project:


TimesheetAPI (.NET Framework):


Start TimesheetApplication.sln from the TimesheetAPI folder on the      green IIS Express play button in Visual Studio.


TimesheetAPP(ReactJS & Redux):


Open the terminal of your choice, navigate to the TimesheetAPP folder and run following commands:


* In order to install the node modules, run npm ci command,
* To start the project, run npm start and wait for it to load in your browser.