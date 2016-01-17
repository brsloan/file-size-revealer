'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var fs = require('fs');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var type = upload.single('file');

module.exports = function (app) {

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/api/fileanalyze/')
		.post(type, function(req, res){
			var fileSize = req.file.size;
			fs.unlink(req.file.path);
			res.json({
				fileSize: fileSize
			});
		});
};
