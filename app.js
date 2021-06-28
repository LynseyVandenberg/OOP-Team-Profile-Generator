const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeList = [];

const initialQuestion = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What type of employee?',
            name: 'employeeType',
            choices: [Manager, Engineer, Intern]
        },
    ])
        .then(answer => {

            if (answer.employeeType === 'Manager') {
                managerQuestions();
            } else if
                (answer.employeeType === 'Engineer') {
                engineerQuestions();
            } else if
                (answer.employeeType === 'Intern') {
                internQuestions();
            }
            else {
                return;
            }
        })
}

initialQuestion();

const internQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: "What is the intern's name?",
            name: 'internName'
        },
        {
            type: 'input',
            message: "What is the intern's employee id?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the intern's email?",
            name: 'email',
        },
        {
            type: 'input',
            message: "What is the intern's school?",
            name: 'school',
        },
        {
            type: 'confirm',
            message: "Do you need to enter another employee?",
            name: 'addCheck',
        },

    ])
        .then(answers => {
            const intern = new Intern(answers.internName, answers.id, answers.email, answers.school);
            employeeList.push(intern);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeList);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                });
            }
        })
}

const engineerQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: "What is the engineer's name?",
            name: 'engineerName'
        },
        {
            type: 'input',
            message: "What is engineer's employee id?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the engineer's email?",
            name: 'email',
        },
        {
            type: 'input',
            message: "What is the engineer's github username?",
            name: 'github',
        },
        {
            type: 'confirm',
            message: "Do you need to enter another employee?",
            name: 'addCheck',
        },

    ])
        .then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.id, answers.email, answers.github);
            employeeList.push(engineer);


            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeList);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                });
            }
        })
}

const managerQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: "What is the manager's name?",
            name: 'managerName'
        },
        {
            type: 'input',
            message: "What is the manager's id",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the manager's email?",
            name: 'email',
        },
        {
            type: 'input',
            message: "What is the manager's office number?",
            name: 'officeNumber',
        },
        {
            type: 'confirm',
            message: "Do you need to enter another employee?",
            name: 'addCheck',
        },

    ])
        .then(answers => {
            const manager = new Manager(answers.managerName, answers.id, answers.email, answers.officeNumber);
            employeeList.push(manager);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeList);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                });
            }


        })
}
