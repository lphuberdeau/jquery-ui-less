var fs = require('fs')
	, async = require('async')
	, target = 'less/'
	, source = 'components/jquery.ui/themes/base/'
	, variables = {}
	, queue
	;

if (! fs.existsSync(target)) {
	fs.mkdirSync(target);
}

queue = async.queue(function (fileName, callback) {
	var path = source + fileName;

	fs.stat(path, function (err, stats) {
		if (stats.isDirectory()) {
			callback();
			return;
		}

		fs.readFile(path, {
			encoding: "utf-8"
		}, function (err, data) {
			var replaced = data
				.replace(/([^\s]+)\/\*\{(\w+)\}\*\//g, function (whole, value, key) {
					key = "ui_" + key;
					variables[key] = value;
					return "@" + key;
				})
				.replace(/\.css/g, '.less')
				;

			fs.writeFile(target + fileName.replace('.css', '.less'), replaced, function (err) {
				callback();
			});
		});
	});
}, 5);

queue.drain = function () {
	var data = "// Content auto-generated\n\n";

	for (var key in variables) {
		data = data + "@" + key + ": " + variables[key] + ";\n";
	}
	fs.writeFile(target + 'jquery.ui.variables.less', data);

	fs.writeFile(target + 'jquery.ui.less', "// Content auto-generated\n\n@import \"jquery.ui.variables.less\";\n@import \"jquery.ui.all.less\";\n");
};

fs.readdir(source, function (err, files) {
	async.each(files, queue.push);
});

