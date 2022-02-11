module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            pkg: grunt.file.readJSON('package.json'),
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    './main.css': './main.scss',       // 'destination': 'source'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-sass');
}