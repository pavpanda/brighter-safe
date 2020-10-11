const localDb = window.localStorage
var strengths = [];
var weaknesses = [];
var questions = ["blah","blah","blah"];
var responses = [[1,"Talk about feelings"],[2,"Keep active"],[3,"Eat well"],[4,"Substance use"],[5,"Keep in touch"],[6,"Ask for help"],[7,"Take a break"],[8,"Using your skills"],[9,"Acceptance"],[10,"Caring"]];
var weaknessestext = []
var strengthstext = []
const strengthstexts = ["Make sure to keep doing the things you love.",
                        "Keep exercising, it’s good for your physical and mental health!",
                        "Satisfaction after eating is good as it’s an important part of your physical health.",
                        "Keep up the good work; don’t rely on substances to control your mood.",
                        "It’s great that you’re maintaining social relationships.",
                        "Asking others for help is a great way to connect with people.",
                        "Keep taking those breaks. They’re important for your mental health.",
                        "Keep doing the things you’re good at.",
                        "It’s good to accept yourself. It’s important for your mental health.",
                        "Keep caring for those people; empathy is one of the most important things a person can have."]
const weaknessestexts = ["Try to find an activity that you enjoy.",
                         "Try to move around more, you’ll find that your mood will improve.",
                         "Keep a food journal, this is extremely helpful if you’re not satisfied after mealtimes.",
                         "Try using less, it’s not good for them to control your mood.",
                         "Try to reach out to people and talk with them. It will be good for you.",
                         "Try to ask others for help, it’s a great way to connect with people and get the help you need.",
                         "Try to take more breaks or do more of the things you love during these times.",
                         "Try to do more things that you’re good at, and if you think there are none, you are most definitely good at something.",
                         "Try to accept yourself, think of what you like about yourself.",
                         "Find the people you love and do something for them, no matter how small it may be."]
function categorize(){

    responses[0][0] = localDb.getItem("response0")
    responses[1][0] = localDb.getItem("response1")
    responses[2][0] = localDb.getItem("response2")
    responses[3][0] = localDb.getItem("response3")
    responses[4][0] = localDb.getItem("response4")
    responses[5][0] = localDb.getItem("response5")
    responses[6][0] = localDb.getItem("response6")
    responses[7][0] = localDb.getItem("response7")
    responses[8][0] = localDb.getItem("response8")
    responses[9][0] = localDb.getItem("response9")

    for(var i = 0; i <responses.length; i++){
        if(parseInt(responses[i][0]) >= 80) {
            strengths.push(responses[i]);
        }
        else if(parseInt(responses[i][0]) < 60)
            weaknesses.push(responses[i]);
    }
    console.log(strengths);

    for(var i=0; i<strengths.length; i++){
        strengthstext.push(strengths[i][1])
        console.log(strengths[i]);
        document.getElementById("table").rows[i+1].cells[0].innerHTML = strengths[i][0]+ " " + strengths[i][1];

    }
    for(var i=0; i<weaknesses.length; i++){
        weaknessestext.push(weaknesses[i][1])
        console.log(weaknesses[i]);
        document.getElementById("table").rows[i+1].cells[1].innerHTML = weaknesses[i][0] + " " + weaknesses[i][1];
    }

    localDb.setItem("weaknesses", weaknessestext)
    localDb.setItem("strengths", strengthstext)

    sendAppropriateMessages()

}

function sendAppropriateMessages() {
    const user_phone_number = localDb.getItem("phoneNumber")
    for (var i = 0; i < responses.length; i++) {
        if (weaknessestext.includes(responses[i][1])) {
            setTimeout(intelepeerSendSMS("+1" + user_phone_number, weaknessestexts[i]), 3000)
        }
        else if (strengthstext.includes(responses[i][1])) {
            setTimeout(intelepeerSendSMS("+1" + user_phone_number, strengthstexts[i]), 3000)
        }

    }
}
// INTELEPEER

function intelepeerGetToken() {
	xhttp.open("POST", "https://atmosphere.intelepeer.com/_rest/v4/authenticate", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify({
	    "username": "email_removed",
	    "password": "pw_removed"
	}));	
}

function intelepeerSendSMS(user_number, text) {

	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	const url = "https://api.intelepeer.com/_rest/v4/app/sms/send"; // site that doesn’t send Access-Control-*

	fetch(proxyurl + url, {
	  method: 'post',
	  headers: {
	  	'Access-Control-Allow-Origin': "*",
	  	'Authorization': 'Bearer removed',
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({"from": "+14257493678", "to": user_number, "text": text})
	}).then(res=>res.json())
	  .then(res => console.log(res));
}
document.getElementById("next").onclick = function(){
    location.href = 'dashboard.html'
}

categorize();
