# JQuery-UI LESS

A simple conversion of the JQuery-UI CSS components into .less files.

The ThemeRoller variables are converted into less @variables with the ui prefix.

To use:

    npm install           # Obtain dependencies for the script
	bower install         # Obtain the jquery-ui code
	node src/builder.js   # Regenerate the content of the less/ directory

Generated files:

* less/jquery.ui.less, which includes the variables and the jquery-ui-all file. This is the file to compile back to CSS.
* less/jquery.ui.variables.less, containing all extracted variables at their default values.

## No longer active

This project is no longer active.

A fork of the project made the effort to take it one step further.

http://dc-development.github.io/jquery-ui-less/ 

