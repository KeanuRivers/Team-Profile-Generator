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