const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

fs.readdir(`${path.join(__dirname, 'templates')}`, (err, files) => {

    // if the file doesn't exist
    if (err) throw new Error('please check your file path or file')

    const CHOICES = files

    // const QUESTIONS = [
    //     {
    //         name: 'project-choice',
    //         type: 'list',
    //         message: 'What project template would you like to generate?',
    //         choices: CHOICES
    //     },
    //     {
    //         name: 'project-name',
    //         type: 'input',
    //         message: 'Project name',
    //         validate: (input) => {
    //             if (/^([A-Za-z\-\_\d])+$/.test(input)) return true
    //             else return 'Project name may only include letters, numbers, underscores and hashes';
    //         }
    //     }
    // ]

    // inquirer.prompt(QUESTIONS)
    //     .then(answers => {
    //         console.log(answers);
    //     })
})
