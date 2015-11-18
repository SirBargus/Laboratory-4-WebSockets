//eliza.js
//responses
responses = {
	"NOTFOUND": [
		"What does that suggest to you?",
		"I see.",
		"I'm not sure I understand you fully.",
		"Can you elaborate?",
		"That is quite interesting."
	],
	"always": [ "Can you think of a specific example?" ],
	"because": ["Is that the real reason?"],
	"sorry": ["Please don't apologize."],
	"maybe": ["You don't seem very certain."],
	"i think": ["Do you really think so?"],
	"you": ["We were discussing you, not me."],
	"yes": [
		"Why do you think so?",
		"You seem quite positive."
	],
	"no": [
		"Why not?",
		"Are you sure?"
	],
	"i am": [
		"I am sorry to hear you are *.",
		"How long have you been *?",
		"Do you believe it is normal to be *?",
		"Do you enjoy being *?"
	],
	"i'm": [
		"I am sorry to hear you are *.",
		"How long have you been *?",
		"Do you believe it is normal to be *?",
		"Do you enjoy being *?"
	],
	"i feel": [
		"Tell me more about such feelings.",
		"Do you often feel *?",
		"Do you enjoy feeling *?",
		"Why do you feel that way?"
	],
	"family":[
		"Tell me more about your family.",
		"How do you get along with your family?",
		"Is your family important to you?"
	],
	"mother":[
		"Tell me more about your family.",
		"How do you get along with your family?",
		"Is your family important to you?"
	],
	"father":[
		"Tell me more about your family.",
		"How do you get along with your family?",
		"Is your family important to you?"
	],
	"mom":[
		"Tell me more about your family.",
		"How do you get along with your family?",
		"Is your family important to you?"
	],
	"dad":[
		"Tell me more about your family.",
		"How do you get along with your family?",
		"Is your family important to you?"
	],
	"sister":[
		"Tell me more about your family.",
		"How do you get along with your family?",
		"Is your family important to you?"
	],
	"brother":[
		"Tell me more about your family.",
		"How do you get along with your family?",
		"Is your family important to you?"
	],
	"husband":[
		"Tell me more about your family.",
		"How do you get along with your family?",
		"Is your family important to you?"
	],
	"wife":[
		"Tell me more about your family.",
		"How do you get along with your family?",
		"Is your family important to you?"
	],
	"dream":[
		"What does that dream suggest to you?",
		"Do you dream often?",
		"What persons appear in your dreams?",
		"Are you disturbed by your dreams?"
	],
	"nightmare":[
		"What does that dream suggest to you?",
		"Do you dream often?",
		"What persons appear in your dreams?",
		"Are you disturbed by your dreams?"
	]
};
var keywords = ["always", "because", "sorry", "maybe", "i think", "you", "yes", "no", "i am", "i'm",
		"i feel", "family", "mother", "mom", "dad", "father", "sister", "brother", "husband", "wife", "dream",
		"nightmare"];

exports.respond=function(s){
	var found = false, response;
	for (var i = 0; i < keywords.length; i++){
		//Find the word inside the keywords
		var aux = keywords[i];
		if (s.search(aux) > -1 && responses[aux] != ""){
			found = true;
			response = responses[aux][Math.floor((Math.random() * responses[aux].length))];
			//Remplace *
			if (response.search("/*") > -1){
				s = s.replace(aux + " ", "");
				s_aux = s[s.length - 1].replace(/\W+/g, "");
				if (s_aux == "") s = s.substr(0, s.length - 1);
				response = response.replace("*", s);
			}
			break;
		}
	}
	if (!found)
		response = responses["NOTFOUND"][Math.floor((Math.random() * responses["NOTFOUND"].length))];
	return response;
}
