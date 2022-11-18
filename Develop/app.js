const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
var employeeList = []; 

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");
userChoice();
function userChoice() {
    inquirer.prompt([
        {
            type: "list",
            name: "User",
            message: "Employee Management System List",
            choices: ["Add Engineer", "Add Manager", "Add Intern", "Exit Application"]
        }
    ]).then(function (response) {
        switch(response.User){
            case "Add Engineer": addEngineer(); break;
            case "Add Manager": addManager(); break;
            case "Add Intern": addIntern(); break;
            default: exitApplication();
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "Input",
            name: "Name",
            message: "Enter Engineer Name"
        },
        {
            type: "Input",
            name: "id",
            message: "Enter Engineer ID"
        },
        {
            type: "Input",
            name: "Email",
            message: "Enter Engineer Email"
        },
        {
            type: "Input",
            name: "GitHub",
            message: "Enter Engineer Username"
        }
    ]).then(function (response) {
        const engineer = new Engineer(response.Name, response.id,  response.Email, response.GitHub);
        var obj = {
            role: engineer.getRole(),
            name: engineer.getName(),
            email: engineer.getEmail(),
            id: engineer.getId(),
            github: engineer.getGithub()
        }
        employeeList.push(obj);
        console.log(employeeList);
        userChoice();
    });
}

function addIntern() {
    inquirer.prompt([
        {
            type: "Input",
            name: "Name",
            message: "Enter Intern's Name"
        },
        {
            type: "Input",
            name: "id",
            message: "Enter Intern ID"
        },
        {
            type: "Input",
            name: "Email",
            message: "Enter Intern Email"
        },
        {
            type: "Input",
            name: "School",
            message: "Enter School name"
        }
    ]).then(function (response) {
        const intern = new Intern(response.Name, response.id,  response.Email, response.School);
        var obj = {
            role: intern.getRole(),
            name: intern.getName(),
            email: intern.getEmail(),
            id: intern.getId(),
            School: intern.getSchool()
        }
        employeeList.push(obj);
        console.log(employeeList);

        userChoice();
    });
}

function addManager() {
    inquirer.prompt([
        {
            type: "Input",
            name: "Name",
            message: "Enter Manager's Name"
        },
        {
            type: "Input",
            name: "id",
            message: "Enter Manager ID"
        },
        {
            type: "Input",
            name: "Email",
            message: "Enter Manager Email"
        },
        {
            type: "Input",
            name: "OfficeNumber",
            message: "Enter Office Number"
        }
    ]).then(function (response) {
        const manager = new Manager(response.Name, response.id,  response.Email, response.OfficeNumber);
        var obj = {
            role: manager.getRole(),
            name: manager.getName(),
            email: manager.getEmail(),
            id: manager.getId(),
            OfficeNumber: manager.getOfficeNumber()
        }
        employeeList.push(obj);
        console.log(employeeList);

        userChoice();
    });
}

function exitApplication() {
    // process.exit(0);
    var html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>My Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading">
                    <h1 class="text-center">My Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex justify-content-center">`
                var managerHtml = "";
                var internHtml = "";
                var engineerHtml = "";
                for (i = 0; i < employeeList.length; i++){
                    if (employeeList[i].role === "Manager"){
                        managerHtml += `<div class="card employee-card">
                        <div class="card-header">
                            <h2 class="card-title">${employeeList[i].name}</h2>
                            <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${employeeList[i].role}</h3>
                        </div>
                        <div class="card-body">
                            <ul class="list-group">
                                <li class="list-group-item">ID: ${employeeList[i].id}</li>
                                <li class="list-group-item">Email: <a href="mailto:${employeeList[i].email}">${employeeList[i].email}</a></li>
                                <li class="list-group-item">Office number: ${employeeList[i].OfficeNumber}</li>
                            </ul>
                        </div>
                    </div>`
                    }else if (employeeList[i].role === "Engineer"){
                        engineerHtml += `<div class="card employee-card">
                        <div class="card-header">
                            <h2 class="card-title">${employeeList[i].name}</h2>
                            <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${employeeList[i].role}</h3>
                        </div>
                        <div class="card-body">
                            <ul class="list-group">
                                <li class="list-group-item">ID: ${employeeList[i].id}</li>
                                <li class="list-group-item">Email: <a href="mailto:${employeeList[i].email}">${employeeList[i].email}</a></li>
                                <li class="list-group-item">GitHub Username: ${employeeList[i].github}</li>
                            </ul>
                        </div>
                    </div>`
                    }else if (employeeList[i].role === "Intern"){
                        internHtml += `<div class="card employee-card">
                        <div class="card-header">
                            <h2 class="card-title">${employeeList[i].name}</h2>
                            <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${employeeList[i].role}</h3>
                        </div>
                        <div class="card-body">
                            <ul class="list-group">
                                <li class="list-group-item">ID: ${employeeList[i].id}</li>
                                <li class="list-group-item">Email: <a href="mailto:${employeeList[i].email}">${employeeList[i].email}</a></li>
                                <li class="list-group-item">School: ${employeeList[i].School}</li>
                            </ul>
                        </div>
                    </div>`
                    }
                }

                html += managerHtml + internHtml + engineerHtml
                html += `</div>
            </div>
        </div>
    </body>
    
    </html>`
    fs.writeFile("./templates/main.html", html, function (err, data){
        if (err)
        throw err
        console.log("Html generator");
        process.exit(0);
    })
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```