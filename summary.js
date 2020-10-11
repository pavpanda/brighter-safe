const localDb = window.localStorage
var strengths = [];
var weaknesses = [];
var questions = ["blah","blah","blah"];
var responses = [[1,"TAYF"],[2,"KA"],[3,"EW"],[4,"SU"],[5,"KIT"],[6,"AFH"],[7,"TAB"],[8,"DSYGA"],[9,"AWYA"],[10,"CFO"]];
var weaknessestext = []
var strengthstext = []
var text_messages = ["", "", "", "", "", "", "", "", "", ""]

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

}

function sendAppropriateMessages() {
    const user_phone_number = localDb.getItem("phoneNumber")
    for (var i = 0; i < responses.length; i++) {
        if (weaknessestext.contains(responses[i][1])) {
            intelepeerSendSMS(user_phone_number, text_messages[i])
        }
        else if (strengthstext.contains(responses[i][1])) {
            intelepeerSendSMS(user_phone_number, text_messages[i])
        }
    }

    intelepeerSendSMS(user_phone_number, "what's up??")
}
// INTELEPEER

function intelepeerGetToken() {
	xhttp.open("POST", "https://atmosphere.intelepeer.com/_rest/v4/authenticate", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify({
	    "username": "pandurangi1381@students.d211.org",
	    "password": "theblackmarker"
	}));	
}

function intelepeerSendSMS(user_number, text) {

	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	const url = "https://api.intelepeer.com/_rest/v4/app/sms/send"; // site that doesn’t send Access-Control-*

	fetch(proxyurl + url, {
	  method: 'post',
	  headers: {
	  	'Access-Control-Allow-Origin': "*",
	  	'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJjaWQiOiI3MTAwMDAzIiwiY3RkIjoxNjAyMzUwNDE5LCJleHAiOjE2MDI0MzY4MTksInNyYyI6ImVDb21tZXJjZSIsInVpZCI6IjVmODFkNWJkMmRlMDI1MTk0ODYzMGNiZCJ9.P441dPLH2DBQYbEaccRrq5xEapsxqpRqL5clWuBFu_mgvobmfPIDrgi6iFMC3GOcCXp5kwgEnvFMyzYCvMVH9Q',
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({"from": "+14257493678", "to": user_number, "text": text})
	}).then(res=>res.json())
	  .then(res => console.log(res));
}

categorize();
