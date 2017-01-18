#! /usr/bin/env node

var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var workingDir = '';
var logger = function (error) {
	if (error) {
		console.error(error);
	}	
}

function main(projectname) {
	workingDir = process.cwd() + '\\' + projectname;
	
	createRootStructure(projectname);
	createAppStructure(projectname);
	createGulpTasks(projectname);
}

/*
	root
	  ├ gulpfile.js
	  └ package.json
*/
function createRootStructure(projectname) {
	createGulpfile();
	createPackageJson(projectname);
	
	console.log('completed creation of root structure');
	
	function createGulpfile() {
		var content = [
			"var gulp = require('./gulp');"
		].join('\n');
		writef(workingDir + '\\gulpfile.js', content, logger);
	}
	function createPackageJson(projectname) {
		var content = [
			'{',
			'  "name": "' + projectname + '",',
			'  "version": "1.0.0",',
			'  "description": "",',
			'  "main": "index.js",',
			'  "scripts": {',
			'	"test": "echo \\\"Error: no test specified\\\" && exit 1"',
			'  },',
			'  "author": "Koen Morren (@KOMODO)",',
			'  "license": "ISC",',
			'  "dependencies": {',
			'	"angular": "^1.5.8",',
			'	"angular-route": "^1.5.8"',
			'  },',
			'  "devDependencies": {',
			'	"del": "^2.2.2",',
			'	"fs-extra": "^0.30.0",',
			'	"gulp": "^3.9.1",',
			'	"gulp-angular-templatecache": "^2.0.0",',
			'	"gulp-clean-css": "^2.0.12",',
			'	"gulp-concat": "^2.6.0",',
			'	"gulp-concat-css": "^2.3.0",',
			'	"gulp-connect": "^5.0.0",',
			'	"gulp-htmlmin": "^2.0.0",',
			'	"gulp-if": "^2.0.1",',
			'	"gulp-inject": "^4.1.0",',
			'	"gulp-less": "^3.1.0",',
			'	"gulp-uglify": "^2.0.0",',
			'	"merge-stream": "^1.0.0",',
			'	"path": "^0.12.7",',
			'	"run-sequence": "^1.2.2"',
			'  }',
			'}'
		].join('\n');
		writef(workingDir + '\\package.json', content, logger);
	}
}

/*
	root
	  └ source
	    ├ app
		  ├ controllers
		  ├ directives
		  ├ services
		  └ %name%.module.js
		├ config
		  └ firebase.js
		├ less
		├ partials		
		├ favicon.ico
		└ index.html
*/
function createAppStructure(projectname) {
	createAppStructure(projectname);
	createConfigFolder();
	createLessFolder();
	createPartialsFolder();
	createIndexHtml(projectname);
	
	console.log('completed creation of app structure');
	
	function createAppStructure(projectname) {
		createModuleJs(projectname)
		createFolders();
		
		function createModuleJs(projectname) {
			var content = [
				'(function() {',
				'	\'use strict\';',
                '',
				'	angular',
				'		.module(\'' + projectname + '\', [\'ngRoute\'])',
				'		.config(configuration);',
				'',
				'	configuration.$inject = [\'$routeProvider\', \'$locationProvider\'];',
				'	function configuration($routeProvider, $locationProvider) {',
				'		\/\*',
				'		$routeProvider',
				'			.when(\'\/\', {',
				'				templateUrl: \'../../partials/home.html\'',
				'			})',
				'			.otherwise(\'/movies\');',
				'',
				'		//$locationProvider.html5Mode(true);',
				'		*/',
				'	}',
				'})();'
			].join('\n');
			
			writef(workingDir + '\\source\\app\\' + projectname + '.module.js', content, logger);
		}
		function createFolders() {
			writed(workingDir + '\\source\\app\\controllers\\a', logger);
			writed(workingDir + '\\source\\app\\directives\\a', logger);
			writed(workingDir + '\\source\\app\\services\\a', logger);
		}
	}
	function createConfigFolder() {
		writed(workingDir + '\\source\\config\\a', logger);
	}
	function createLessFolder() {
		writed(workingDir + '\\source\\less\\a', logger);
	}
	function createPartialsFolder() {
		writed(workingDir + '\\source\\partials\\a', logger);
	}
	function createIndexHtml(projectname) {
		var content = [
			'<html data-ng-app="' + projectname + '">',
			'	<head>',
			'		<title>' + projectname + '</title>',
            '',
			'		<meta name="viewport" content="width=device-width, initial-scale=1">',
            '',
			'		<base href="/">',
			'		<link rel="shortcut icon" href="favicon.ico" />',
			'',
			'		<!-- styles:css -->',
			'		<!-- endinject -->',
			'	</head>',
			'	<body>',
			'		<div class="container">',
			'			<div data-ng-view></div>',
			'		</div>',
            '',
			'		<!-- vendor:js -->',
			'		<!-- endinject -->',
			'		<!-- app:js -->',
			'		<!-- endinject -->',
			'	</body>',
			'</html>'
		].join('\n');
		
		writef(workingDir + '\\source\\index.html', content, logger);
	}
}
/*
	root
	  └ gulp
	    ├ tasks
		  ├ clean.js
		  ├ default.js
		  ├ fonts.js
		  ├ html.js
		  ├ icons.js
		  ├ img.js
		  ├ less.js
		  ├ partials.js
		  └ scripts.js
		├ config.json
		└ index.js
*/
function createGulpTasks(projectname) {
	createConfigFile(projectname);
	createIndexFile();
	
	createTasks();
	
	console.log('completed creation of gulp tasks');
	
	function createConfigFile() {
		var content = [
			'{',
			'	"productionEnv": false,',
			'	"moduleName": "' + projectname + '",',
			'	"vendor": [',
			'		"./node_modules/angular/angular.js",',
			'		"./node_modules/angular-route/angular-route.js"',
			'	]',
			'}'
		].join('\n');
		
		writef(workingDir + '\\gulp\\config.json', content, logger);
	}
	function createIndexFile() {
		var content = [
			'//modules',
			'var fse = require(\'fs-extra\');',
			'var tasks = fse.readdirSync(\'./gulp/tasks/\');',
            '',
			'//config',
			'var config = require(\'./config.json\');',
            '',
			'tasks.forEach(function (task) {',
			'	require(\'./tasks/\' + task);',
			'});'
		].join('\n');
		
		writef(workingDir + '\\gulp\\index.js', content, logger);
	}
	function createTasks() {
		createCleanTask();
		createDefaultTask();
		createFontsTask();
		createHtmlTask();
		createIconsTask();
		createImgTask();
		createLessTask();
		createPartialsTask();
		createScriptsTask();
		
		function createCleanTask() {
			var content = [
				'var gulp = require(\'gulp\');',
				'var del  = require(\'del\'); ',
                '',
				'gulp.task(\'clean_dist\', () => {',
				'	return del(\'./dist/*\');',
				'});',
                '',
				'gulp.task(\'clean_tmp\', () => {',
				'	return del(\'./tmp\');',
				'});'
			].join('\n');
			
			writef(workingDir + '\\gulp\\tasks\\clean.js', content, logger);
		};
		function createDefaultTask() {
			var content = [
				'var gulp = require(\'gulp\');',
				'var rseq = require(\'run-sequence\');',
				'var conn = require(\'gulp-connect\');',
                '',
				'gulp.task(\'default\', () => {',
				'	rseq(',
				'		\'build\',',
				'		\'watch\'',
				'	);',
				'});',
                '',
				'gulp.task(\'build\', (callback) => {',
				'	rseq(',
				'		\'clean_dist\',',
				'		\'vendor\',',
				'		\'partialsJS\',',
				'		\'partialsHTML\',',
				'		\'partials\',',
				'		\'scripts\',',
				'		\'less\',',
				'		\'fonts\',',
				'		\'img\',',
				'		\'html\',',
				'		\'icons\',',
				'		\'clean_tmp\',',
				'		callback',
				'	);',
				'});',
                '',
				'gulp.task(\'watch\', () => {',
				'	conn.server({',
				'		root: \'./dist/\',',
				'		port: 4333,',
				'		liveReload: true',
				'	});',
				'	gulp.watch([',
				'		\'./source/app/**/*.js\',',
				'		\'./source/app/**/*.html\',',
				'		\'!./source/app/templatecache/**/*.js\',',
				'		\'./source/less/**/*.less\',',
				'		\'./source/partials/**/*.html\',',
				'		\'./source/index.html\'',
				'	], [\'build\']);',
				'});'
			].join('\n');
			
			writef(workingDir + '\\gulp\\tasks\\default.js', content, logger);
		};
		function createFontsTask() {
			var content = [
				'var gulp = require(\'gulp\');',
                '',
				'gulp.task(\'fonts\', () => {',
				'	return gulp.src(\'./source/fonts/**/*.*\')',
				'			   .pipe(gulp.dest(\'./dist/css/fonts/\'));',
				'});'
			].join('\n');
			
			writef(workingDir + '\\gulp\\tasks\\fonts.js', content, logger);
		};
		function createHtmlTask() {
			var content = [
				'var gulp = require(\'gulp\');',
				'var inject = require(\'gulp-inject\');',
				'var config = require(\'../config.json\');',
                '',
				'gulp.task(\'html\', () => {',
				'	var styles = gulp.src(\'./dist/css/**/*.css\', { read: false });',
				'	var vendor = gulp.src(\'./dist/js/vendor.js\', { read: false });',
				'	var app = config.productionEnv ? gulp.src(\'./dist/js/\' + config.moduleName + \'.js\', { read: false }) : gulp.src(\'./dist/js/app/**/*.js\', { read: false });',
                '',
				'	return gulp.src(\'./source/index.html\')',
				'			   .pipe(gulp.dest(\'./dist/\'))',
				'			   .pipe(inject(styles, { relative: true, name: \'styles\'}))',
				'			   .pipe(inject(vendor, { relative: true, name: \'vendor\'}))',
				'			   .pipe(inject(app, { relative: true, name: \'app\'}))',
				'			   .pipe(gulp.dest(\'./dist/\'));',
				'});'
			].join('\n');
			
			writef(workingDir + '\\gulp\\tasks\\html.js', content, logger);
		};
		function createIconsTask() {
			var content = [
				'var gulp = require(\'gulp\');',
                '',
				'gulp.task(\'icons\', () => {',
				'	return gulp.src(\'./source/*.ico\')',
				'			   .pipe(gulp.dest(\'./dist/\'));',
				'});',
			].join('\n');
			
			writef(workingDir + '\\gulp\\tasks\\icons.js', content, logger);
		};
		function createImgTask() {
			var content = [
				'var gulp = require(\'gulp\');',
                '',
				'gulp.task(\'img\', function() {',
				'	return gulp.src(\'./source/img/**/*.*\')',
				'			   .pipe(gulp.dest(\'./dist/img/\'))',
				'});',
			].join('\n');
			
			writef(workingDir + '\\gulp\\tasks\\img.js', content, logger);
		};
		function createLessTask() {
			var content = [
				'//modules',
				'var gulp = require(\'gulp\');',
				'var less = require(\'gulp-less\');',
				'var clean = require(\'gulp-clean-css\');',
				'var concat = require(\'gulp-concat-css\');',
                '',
				'gulp.task(\'less\', () => {',
				'	return gulp.src(\'./source/**/*.less\')',
				'			   .pipe(less())',
				'			   .pipe(concat(\'style.css\'))',
				'			   .pipe(clean())',
				'			   .pipe(gulp.dest(\'./dist/css/\'));',
				'});',
                '',
				'gulp.task(\'watch:less\', () => {',
				'	gulp.watch(\'./source/less/**/*.less\', [\'less\']);',
				'});',
			].join('\n');
			
			writef(workingDir + '\\gulp\\tasks\\less.js', content, logger);
		};
		function createPartialsTask() {
			var content = [
				'var gulp = require(\'gulp\');',
				'var path = require(\'path\');',
				'var templateCache = require(\'gulp-angular-templatecache\');',
				'var uglify = require(\'gulp-uglify\');',
				'var htmlmin = require(\'gulp-htmlmin\');',
				'var merge = require(\'merge-stream\');',
				'var concat = require(\'gulp-concat\');',
				'var gulpif = require(\'gulp-if\');',
				'var config = require(\'../config.json\');',
                '',
				'var TEMPLATE_HEADER = [',
				'	\'(function () {\\r\\n\',',
				'	\'    \\\'use strict\\\';\\r\\n\',',
				'	\'\\r\\n\',',
				'	\'    angular.module(\\\'<%= module %>\\\'<%= standalone %>)\\r\\n\',',
				'	\'           .run([\\\'$templateCache\\\', function($templateCache) {\\r\\n\'].join(\'\');',
				'var TEMPLATE_BODY = \'        $templateCache.put(\\\'<%= url %>\\\',\\\'<%= contents %>\\\');\';',
				'var TEMPLATE_FOOTER = [',
				'	\'\\r\\n\',',
				'	\'    }]);\\r\\n\',',
				'	\'})();\'].join(\'\');',
                '',
				'var htmlminOptions = { collapseWhitespace: true };',
                '',
				'gulp.task(\'partials\', () => {',
				'	return gulp.src(\'tmp/templates/**/*.js\')',
				'			   .pipe(concat(\'templates.js\'))',
				'			   .pipe(gulpif(config.productionEnv, uglify()))',
				'			   .pipe(gulp.dest(\'./source/app/templatecache/\'));',
				'});',
                '',
				'gulp.task(\'partialsJS\', () => {',
				'	var templateCacheOptions = {',
				'		root: \'./js/\',',
				'		module: config.moduleName,',
				'		templateHeader: TEMPLATE_HEADER,',
				'		templateBody: TEMPLATE_BODY,',
				'		templateFooter: TEMPLATE_FOOTER,',
				'		filename: \'templatesJS.js\'',
				'	};',
                '',
				'	return gulp.src(\'./source/js/**/*.html\')',
				'			   .pipe(htmlmin(htmlminOptions))',
				'			   .pipe(templateCache(templateCacheOptions))',
				'			   .pipe(gulp.dest(\'./tmp/templates/\'));',
				'});',
                '',
				'gulp.task(\'partialsHTML\', () => {',
				'	var templateCacheOptions = {',
				'		root: \'../../partials/\',',
				'		module: config.moduleName,',
				'		templateHeader: TEMPLATE_HEADER,',
				'		templateBody: TEMPLATE_BODY,',
				'		templateFooter: TEMPLATE_FOOTER,',
				'		filename: \'templatesPartials.js\'',
				'	};',
                '',
				'	 return gulp.src(\'./source/partials/**/*.html\')',
				'			   .pipe(htmlmin(htmlminOptions))',
				'			   .pipe(templateCache(templateCacheOptions))',
				'			   .pipe(gulp.dest(\'./tmp/templates/\'));',
				'});',
			].join('\n');
			
			writef(workingDir + '\\gulp\\tasks\\partials.js', content, logger);
		};
		function createScriptsTask() {
			var content = [
				'//modules',
				'var gulp = require(\'gulp\');',
				'var path = require(\'path\');',
				'var uglify = require(\'gulp-uglify\');',
				'var concat = require(\'gulp-concat\');',
				'var gulpif = require(\'gulp-if\');',
				'var config = require(\'../config.json\');',
                '',
				'gulp.task(\'vendor\', () => {',
				'	return gulp.src(config.vendor)',
				'			   .pipe(concat(\'vendor.js\'))',
				'			   .pipe(gulpif(config.productionEnv, uglify()))',
				'			   .pipe(gulp.dest(\'./dist/js/\'));',
				'});',
                '',
				'gulp.task(\'scripts\', () => {',
				'	var basepath = \'./source/js/\';',
                '',
				'	return gulp.src([',
				'				path.join(basepath, \'**/*.module.js\'),',
				'				path.join(basepath, \'**/*.js\')',
				'			])',
				'			.pipe(gulpif(config.productionEnv, concat(config.moduleName + \'.js\')))',
				'			.pipe(gulpif(config.productionEnv, uglify()))',
				'			.pipe(gulpif(config.productionEnv, gulp.dest(\'./dist/js/\')))',
				'			.pipe(gulpif(!config.productionEnv, gulp.dest(\'./dist/js/app/\')));',
				'});',
                '',
				'gulp.task(\'watch:scripts\', () => {',
				'	gulp.watch(\'./source/js/**/*.js\', [\'scripts\']);',
				'});',
			].join('\n');
			
			writef(workingDir + '\\gulp\\tasks\\scripts.js', content, logger);
		};
	}
}


//helpers
function writef(_path, content, callback) {
	mkdirp(path.dirname(_path), function(error) {
		if (error) {
			return callback(error);
		}
		
		fs.writeFile(_path, content, callback);
	});	
}
function writed(_path, callback) {
	mkdirp(path.dirname(_path), function(error) {
		if (error) {
			return callback(error);
		}
	});	
}


if (process.argv[2]) {
	main(process.argv[2]);
} else {
	throw new Error('no project name specified');
}