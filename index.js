//Main Node file

var express = require('express'),
	handlebars = require('express-handlebars').create({defaultLayout:'main'}),
	app = express();

//set port
app.set('port',process.env.PORT || 3000);
//render engine
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//testing environment
app.use(function(req,rsp,next){
	//rsp.locals is object is part of the context will be passed to views
	rsp.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

//static files
app.use(express.static(__dirname + '/public/'));

//routes
app.get('/',function(req,rsp){
	rsp.render('home');
});

app.use(function(req,rsp,next){
	rsp.status(404);
	rsp.render('404');
});

app.use(function(err,req,rsp,next){
	// console.error(err);
	rsp.status(500);
	rsp.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Server started at localhost://'+app.get('port')+' Press Ctrl+C to terminate');
});