var fs = require('fs')
	, async = require('async')
	, target = 'less/'
	, source = 'components/jquery.ui/themes/base/'
	, variables = {}
	, queue
	;

function handleDirectory(source, target) {
	// Attempt folder creation, keep going even on failure / already exists
	fs.mkdir(target, function () {
		fs.readdir(source, function (err, files) {
			files = files.map(function (fileName) {
				console.log(source + fileName);
				return {
					fileName: fileName,
					source: source,
					target: target
				};
			});
			async.each(files, queue.push);
		});
	});
}

queue = async.queue(function (info, callback) {
	var path = info.source + info.fileName
		, target = info.target + info.fileName;

	fs.stat(path, function (err, stats) {
		if (stats.isDirectory()) {
			handleDirectory(path + '/', target + '/');
			callback();
			return;
		}

		if (info.fileName.substr(-4) === '.css') {
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

				fs.writeFile(target.replace('.css', '.less'), replaced, function (err) {
					callback();
				});
			});
		} else {
			fs.readFile(path, function (err, data) {
				fs.writeFile(target, data, function () {
					callback();
				});
			});
		}
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

handleDirectory(source, target);

