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

Note that this is an early stage project. Feel free to submit pull requests, or report issues.

