const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

fs.readdir(`${path.join(__dirname, '../', 'templates')}`, (err, files) => {

    // if the file doesn't exist
    if (err) throw new Error('please check your path or file');

    const CHOICES = files;

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

    // users current directory 
    const CURR_DIR = process.cwd();

    inquirer.prompt(QUESTIONS)
        .then(answers => {
            const projectChoice = answers['project-choice'];
            const projectName = answers['project-name'];
            const templatePath = path.join(__dirname, '../', 'templates', projectChoice);

            fs.mkdirSync(`${CURR_DIR}/${projectName}`);

            // getting exact path for the file
            function formatPath(root, dirName, file) {

                // if dirName is falsy value
                if (!dirName) return path.format({ dir: root, base: file })

                const exactPath = path.format({
                    root: root,
                    dir: dirName,
                    base: file
                })
                return exactPath
            }

            createDirectoryContents(templatePath)
                .then(files => {

                    const directories = [];

                    files.forEach((file) => {
                        const userFile = formatPath(CURR_DIR, projectName, file);
                        const tempFile = formatPath(templatePath, null, file);

                        // stat 
                        const stat = fs.statSync(tempFile);

                        if (stat.isFile()) {
                            const content = fs.readFileSync(tempFile);
                            fs.writeFileSync(userFile, content);
                        }
                        else if (stat.isDirectory()) { directories.push(file) }

                    })

                    return directories;

                }).then(directories => {
                    directories.forEach((dir) => {
                        const userPath = formatPath(CURR_DIR, projectName, dir);
                        const tempPath = formatPath(templatePath, null, dir);

                        // creating directory
                        fs.mkdirSync(userPath);

                        const readDir = fs.readdirSync(tempPath);

                        readDir.forEach(file => {
                            const stat = fs.statSync(formatPath(tempPath, null, file));

                            if (stat.isFile()) {
                                const content = fs.readFileSync(formatPath(tempPath, null, file));

                                fs.writeFileSync(formatPath(userPath, null, file), content);
                            }
                        })
                    })
                })
                .catch(err => console.log(err));
        })

    // createDirectoryContents function Definition
    function createDirectoryContents(templatePath) {
        return new Promise((resolve, reject) => {
            fs.readdir(templatePath, (err, success) => err ? reject(err) : resolve(success));
        });
    }

})

