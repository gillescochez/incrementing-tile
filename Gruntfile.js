module.exports = function(grunt) {

    let pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        babel: {
            options: {
                presets: ["es2015"]
            },
            dist: {
                files: {
                    ["dist/" + pkg.name + ".es5.js"]: pkg.name + ".js"
                }
            }
        },
        uglify: {
            es5: {
                src: "dist/" + pkg.name + ".es5.js",
                dest: "dist/" + pkg.name + ".es5.min.js"
            }
        },
        watch: {
            files: [pkg.name + '.js'],
            tasks: ['babel', 'uglify'],
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('default', ['babel', 'uglify']);
};