const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

fs.readdir(`${path.join(__dirname, 'templates')}`, (err, files) => {

    // if the file doesn't exist
    if (err) throw new Error('please check your file path or file')

    const CHOICES = files

    const QUESTIONS = [
        {
            name: 'project-choice',
            type: 'list',
            message: 'What project template would you like to generate?',
            choices: CHOICES
        },
        {
            name: 'project-name',
            type: 'input',
            message: 'Project name',
            validate: (input) => {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true
                else return 'Project name may only include letters, numbers, underscores and hashes';
            }
        }
    ]

    // for users current directory 
    const CURR_DIR = process.cwd();

    inquirer.prompt(QUESTIONS)
        .then(answers => {
            console.log(answers);
            const projectChoice = answers['project-choice'];
            const projectName = answers['project-name'];
            const templatePath = `${__dirname}/templates/${projectChoice}`;

            fs.mkdirSync(`${CURR_DIR}/${projectName}`);

            createDirectoryContents(templatePath, projectName);
        })

    // createDirectoryContents function Definition
    function createDirectoryContents(templatePath, projectName) {
        const readFiles = fs.readdirSync(templatePath);

        readFiles.forEach(file => {

            const userFile = `${CURR_DIR}/${projectName}/${file}`;

            const stat = fs.statSync(`${templatePath}/${file}`);

            if (stat.isFile()) {
                const content = fs.readFileSync(`${templatePath}/${file}`, "utf-8");

                fs.writeFileSync(userFile, content, "utf-8");

            } else if (stat.isDirectory()) {
                fs.mkdirSync(`${CURR_DIR}/${projectName}/${file}`);
            }
        })
    }
})

