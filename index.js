var alexa = require('alexa-app');
var app = new alexa.app();

var paragraph = [
	request.session('name')+" is the only "+request.session('object')+" who is able to see the "+request.session('thing')+" of the "+request.session('subject')+".",
	"The "+request.session('subject')+'is the '+request.session('object')+"of"+request.session('name')
];

/**
 * LaunchRequest.
 */
app.launch(function(request,response) {

	response.say("Welcome to the madlib skill. ");
	response.say("To use this skill you will need to set the values for various parts of speech.");
	response.reprompt("Are you ready to start the game?");

	response.session('name','');
	response.session('subject','');
	response.session('object','');

	response.card({
		type:    "Simple",
		title:   "Madlib Skill",  //this is not required for type Simple 
		content: "Welcome to the madlib skill"
	});

});
app.intent('SetNameIntent', {
	'utterances':[ 'set the name {name}' ]
}, function(request, response){
	var name = request.slot('name');
	response.session('name', name);
	response.say('setting the name to '+name);
	response.reprompt('what do you want to set the name to?');
	response.send();
});
app.intent('SetSubjectIntent', {
	'utterances':[ 'set the subject {subject}' ]
}, function(request, response){
	var subject = request.slot('subject');
	response.session('subject', subject);
	response.say('setting the subject to '+subject);
	response.reprompt('what do you want to set the subject to?');
	response.send();
});
app.intent('SetObjectIntent', {
	'utterances':[ 'set the object {object}' ]
}, function(request, response){
	var object = request.slot('object');
	response.session('object', object);
	response.say('setting the object to '+object);
	response.reprompt('what do you want to set the object to?');
	response.send();
});

app.intent('ReadMadlibIntent', {

}, function(request, response){
	if(request.session('name') != '' && request.session('subject') != '' && request.session('object')!= '' ){
		response.say(paragraph[Math.floor(Math.random()*paragraph.length)]);
		response.shouldEndSession(true);
		response.send();
	}else{
		if(!request.session('name')){
			response.say('It looks like you have not selected a persons name just yet. Set a name by saying ');
			response.say('set the name, and the name you want to enter. ');
			response.reprompt('set the name, and the name you want to enter ');
			response.send();
		}
		if(!request.session('object')){
			response.say('It looks like you have not selected a object just yet. Set a object by saying ');
			response.say('set the object, and the object you want to enter. ');
			response.reprompt('set the object, and the object you want to enter ');
			response.send();
		}
		if(!request.session('subject')){
			response.say('It looks like you have not selected a subject just yet. Set a subject by saying ');
			response.say('set the subject, and the subject you want to enter. ');
			response.reprompt('set the subject, and the subject you want to enter. ');
			response.send();
		}
	}
});

/**
 * Error handler for any thrown errors.
 */
app.error = function(exception, request, response) {
    response.say('Sorry, something bad happened');
};

// Connect to lambda
exports.handler = app.lambda();
