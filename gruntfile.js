module.exports = function(grunt) {
  // Configuration
  var config = {
    // Chemin vers les fichiers à inspecter
    root: "", // Chemin vers la racine à partir de /grunt
    chemin: "", // Chemin de la racine vers le thème
    projet: "" // Le nom du projet
  };
  // Validation de la présence de certains prérequis à l'exécution de Grunt
  //
  // On valide la présence d'un fichier README.md à la racine du projet
  /*  grunt.loadNpmTasks('grunt-readme');
if(!grunt.file.exists(config.root + 'README.md')){
  grunt.fail.fatal('Le projet n'a pas de fichier README.md');
} */

  // -- Fin de la validation

  var pngquant = require("imagemin-pngquant");
  var jpegoptim = require("imagemin-jpegoptim");
  var gifsicle = require("imagemin-gifsicle");

  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);

  grunt.initConfig({
    config: {
      // Chemin vers les fichiers à inspecter
      root: config.root, // Chemin vers la racine à partir de /grunt
      path: config.path, // Chemin de la racine vers le thème
      chemin: config.root + config.path, // root + path
      projet: config.projet // Le nom du projet
    },

    // Tâche de veille de changements des fichiers
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: [
          //Désactiver/activer ces lignes lorsque désiré
          //'<%= config.chemin %>/js/*.js',
          //'<%= config.chemin %>/*.php',
          "<%= config.chemin %>/css/*.css"
          //'<%= config.chemin %>/sources/images/*',
        ]
      },

      // Tâche lors de changements des fichiers scss sources
      less: {
        files: ["<%= config.chemin %>/sources/less/*.less", "<%= config.chemin %>/sources/less/*/*.less"],
        tasks: ["less"]
      },

      // Tâche lors de changements des fichiers images sources
      images: {
        files: ["<%= config.chemin %>/sources/images/*.*"],
        tasks: ["imagemin"]
      },

      // Tâche lors de changements des fichiers js sources
      js: {
        files: ["<%= config.chemin %>/sources/js/*.js"],
        tasks: ["uglify"]
      },

      // Tâche lors de changements des plugins js sources
      jsplugins: {
        files: ["<%= config.chemin %>/sources/js/plugins/*.js"],
        tasks: ["concat", "uglify"]
      }
    },

    //Tâche pour compiler les fichiers LESS
    less: {
      dev: {
        options: {
          compress: true,
          sourceMap: true,
          sourceMapFilename: "<%= config.chemin %>/css/<%= config.projet %>.css.map",
          sourceMapURL: "<%= config.projet %>.css.map",
          sourceMapBasepath: "<%= config.path %>/css",
          sourceMapRootpath: "/"
        },
        files: {
          "<%= config.chemin %>/css/<%= config.projet %>.css": "<%= config.chemin %>/sources/less/main.less",
          "<%= config.chemin %>/css/icones_data_fallback.css":
            "<%= config.chemin %>/sources/less/base/icones_data_fallback.less",
          "<%= config.chemin %>/css/icones_data_png.css": "<%= config.chemin %>/sources/less/base/icones_data_png.less",
          "<%= config.chemin %>/css/icones_data_svg.css": "<%= config.chemin %>/sources/less/base/icones_data_svg.less"
        }
      }
    },

    //Tâche pour concaténer les fichiers de plugins js
    //Regroupe tous les fichiers .js dans le dossier /plugins/ en un seul fichier
    concat: {
      dist: {
        src: ["<%= config.chemin %>/sources/js/plugins/*.js"],
        dest: "<%= config.chemin %>/js/plugins.js"
      }
    },

    //Tâche pour optimiser les scripts js
    uglify: {
      my_target: {
        options: {
          compress: true
        },
        files: [
          {
            expand: true,
            cwd: "<%= config.chemin %>/sources/js",
            src: "*.js",
            dest: "<%= config.chemin %>/js"
          },
          {
            expand: true,
            cwd: "<%= config.chemin %>/js",
            src: "*.js",
            dest: "<%= config.chemin %>/js"
          }
        ]
      }
    },

    // Pour optimisation des images : https://www.webfoobar.com/node/11
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3
          // use: [
          //   pngquant(),
          //   jpegoptim({
          //     options: 85
          //   }),
          //   gifsicle()
          // ],
        },
        files: [
          {
            expand: true,
            cwd: "<%= config.chemin %>/sources/images/",
            src: ["**/*.{png,jpg,gif,svg}"],
            dest: "<%= config.chemin %>/images/"
          }
        ]
      }
    },

    // Pour générer les fichiers de langue de WordPress
    pot: {
      options: {
        text_domain: "<%= config.projet %>", //Your text domain. Produces my-text-domain.pot
        dest: "<%= config.chemin %>/languages/", //directory to place the pot file,
        encoding: "UTF-8",
        keywords: [
          //WordPress localisation functions
          "__:1",
          "_e:1",
          "_x:1,2c",
          "esc_html__:1",
          "esc_html_e:1",
          "esc_html_x:1,2c",
          "esc_attr__:1",
          "esc_attr_e:1",
          "esc_attr_x:1,2c",
          "_ex:1,2c",
          "_n:1,2",
          "_nx:1,2,4c",
          "_n_noop:1,2",
          "_nx_noop:1,2,3c"
        ]
      },
      files: {
        src: ["<%= config.chemin %>/**/*.php"], //Parse all php files
        expand: true
      }
    },

    grunticon: {
      myIcons: {
        files: [
          {
            expand: true,
            cwd: "<%= config.chemin %>/sources/images/icones/",
            src: ["*.svg", "*.png"],
            dest: "<%= config.chemin %>/sources/"
          }
        ],
        // Permet de générer automatiquement les différentes couleurs
        // Exemple nom de fichier : absolu.colors-blanc-noir-orange.svg
        options: {
          colors: {
            blanc: "#ffffff",
            noir: "#000000",
            bleu: "#22428F",
            bigstone: "#192545",
            orange: "#ff4c00",
            flamepea: "#df5a3b"
          },
          cssprefix: ".i-",
          pngfolder: "/images/icones/png",
          pngpath: "../images/icones/png",
          enhanceSVG: true,
          datasvgcss: "less/base/icones_data_svg.less",
          datapngcss: "less/base/icones_data_png.less",
          urlpngcss: "less/base/icones_data_fallback.less",
          loadersnippet: "js/grunticon.loader.js"
        }
      }
    },

    // Outil d'analyse du fichier CSS
    // https://github.com/katiefenn/parker
    // https://www.npmjs.com/package/grunt-parker
    // http://csswizardry.com/2016/06/improving-your-css-with-parker/
    parker: {
      options: {
        metrics: [
          "TotalStylesheets",
          "TotalStylesheetSize",
          "TotalRules",
          "TotalSelectors",
          "TotalIdentifiers",
          "TotalDeclarations",
          "SelectorsPerRule",
          "IdentifiersPerSelector",
          "SpecificityPerSelector",
          "TopSelectorSpecificity",
          "TopSelectorSpecificitySelector",
          "TotalIdSelectors",
          "TotalUniqueColours",
          "UniqueColours",
          "TotalImportantKeywords",
          "TotalMediaQueries",
          "MediaQueries"
        ]
      },
      src: ["<%= config.chemin %>/css/<%= config.projet %>.css"]
    }
  });

  // Tâche par défaut
  grunt.registerTask("default", ["watch"]);

  // Tâches composées
  grunt.registerTask("js", ["concat", "uglify"]);
  grunt.registerTask("images", ["imagemin"]);
  grunt.registerTask("icones", ["grunticon", "less"]);
  grunt.registerTask("css-test", ["parker"]);
};
