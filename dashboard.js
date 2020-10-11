var xhttp = new XMLHttpRequest();

var counter = 1
var time_created = ""
var correct_url = ""
var transcription_id = ""
var transcribed_split = []
var messages = []
var convId = ""
const localDb = window.localStorage


// code that updates weaknesses and strengths based on drag and drop interface
console.log(localDb.getItem("weaknesses"))
console.log(localDb.getItem("strengths"))
var weaknesses = localDb.getItem("weaknesses").split(",")
var strengths = localDb.getItem("strengths").split(",")

// show strengths in strengths column and show weaknesses in weaknesses column
function createBox(content, category){
    var div = document.createElement("div");
    div.innerHTML = content;
    div.className = "drag-block"

    document.getElementById(category).appendChild(div);
}

for (var r = 0; r < weaknesses.length; r++) {
    createBox(weaknesses[r], "weak")
}

for (var r = 0; r < strengths.length; r++) {
    createBox(strengths[r], "strength")
}

// on click listener for note to self (trigger phone call to user)
document.getElementById("record").addEventListener("click", function() {
    console.log("+1" + localDb.getItem("phoneNumber"))
    avayaCallNumber("+1" + localDb.getItem("phoneNumber"))
});

// on click listener for emergency contact (trigger phone call to top emergency contact)
document.getElementById("press").addEventListener("click", function() {
    console.log("+1" + localDb.getItem("emergencyNumber"))
    avayaNotifyEmergency("+1" + localDb.getItem("emergencyNumber"))
})

// @ counter = 1, get date, begin to get recordings, ++
// @ counter = 2, get date, begin to transcribe url, ++
// @ counter = 3, get transcription id, begin to receive transcription, ++
// @ counter = 4, create messages with the transcription, ++
// @ counter = 5, with conversation id, get the insights


//////////////////////////////// MASTER CODE ////////////////////////////////////////



xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
    	console.log(this.responseText)
    	var responseText = this.responseText       
		if (counter == 1) {
			counter++
			setTimeout(() => {  avayaGetRecordings()}, 30000);
        }
        else if (counter == 2) {
        	correct_url = responseText.substring(responseText.indexOf("RecordingUrl") + 13, responseText.indexOf("</RecordingUrl>"))
        	console.log(correct_url)
        	counter++
        	avayaTranscribeAudioUrl(correct_url)
        }
        else if (counter == 3) {
        	transcription_id = responseText.substring(responseText.indexOf("Transcriptions/") + 15, responseText.indexOf(".json"))
        	console.log(transcription_id)
        	counter++
        	setTimeout(() => {avayaGetTranscription(transcription_id)}, 10000)
        	
        }
        else if (counter == 4) {
        	var transcribed_text = responseText.substring(responseText.indexOf("transcription_text") + 22, responseText.indexOf("api_version") - 8)
			transcribed_text = transcribed_text.replace(/I /g, 'asdfghjklI ');
			transcribed_split = transcribed_text.split("asdfghjkl")
        	console.log(transcribed_split)
        	counter++
			for (var j = 0; j < transcribed_split.length; j++) {
				messages.push({"payload": {"content": transcribed_split[j]}})
			}
			messages.shift()

        	symblCreateConvo(token, messages)
        }
        else if (counter == 5) {
        	convId = responseText.substring(responseText.indexOf("conversationId") + 17, responseText.indexOf("jobId") - 3)
        	console.log(convId)
        	counter++
        	setTimeout(() => {symblAnalyzeConvo(token, convId)}, 10000)
        }
        else {
            var responseJSON = JSON.parse(this.responseText)
            var outputString = ""
        	for (var j = 0; j < responseJSON["insights"].length; j++) {
        		outputString += responseJSON["insights"][j]["type"] + ": " + responseJSON["insights"][j]["text"] + "</br>"
            }
            outputString = outputString.replace(/action_item/g, 'Action Item');
            outputString = outputString.replace(/topic/g, 'Topic');
            outputString = outputString.replace(/question/g, 'Question');
            document.getElementById("note").innerHTML = outputString
        }
    }
};

var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiS29sNXQ3QXRGZlFlVEYwaXp4UWlyVVhtS0pBcndBYnNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjAyMzgyNDAyLCJleHAiOjE2MDI0Njg4MDIsImF6cCI6IktvbDV0N0F0RmZRZVRGMGl6eFFpclVYbUtKQXJ3QWJzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.wKgc3lHJ1buuxcGzfid1NzwWs9l3WDcFhL5GPzuDvO7Lvqjc9WzCAyWZNJ5s-DqN-r1QFOvRks_eVy76v64oExTHuGX8kpnmq5BC-NGUhql6khgjx_yDTAHwHVQ8GnXLAoc1T5BJmVYFGBug-tFGGEp23xufwwDwyY7XHQydM3EFpe56-jc7tr1z6wPdOBcT_Pk2VS5H63yRMdo0c-FgxiZ9LPZj_eBp4qoBqpXMgTUYivuxhp9sfqwu_7mvDH24hUMo8f68VulhFJ-DI11TxHYZrhyo5aKeTBDRCh-7nMZXKiVhIcMzO-qeh7-J3iRHLZ0eOHKWsYu_ZBXmqBxivQ"

/////////////////////////////////////////////////////////////////////////////////////

// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4) {
//     	console.log(this.responseText)
//     }
// }

// symblGetAuthKey()

// symbl.ai (x-api-key changes every 24 hours)

function symblGetAuthKey() {
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	xhttp.open("POST", proxyurl + "https://api.symbl.ai/oauth2/token:generate", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify({
	  "type": "application",
	  "appId": "4b6f6c357437417446665165544630697a7851697255586d4b4a417277416273",
	  "appSecret": "6b52644d44686a496e444149516636456570426d4677387378464c436457794936396b306e31396243365f762d43325a7a74447644324d4a6d6251646a734156"
	}));
}

function symblCreateConvo(token, messages) {
	xhttp.open("POST", "https://api.symbl.ai/v1/process/text", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.setRequestHeader("x-api-key", token);
	xhttp.send(JSON.stringify({
	    "messages": messages
	}));	
}

function symblAnalyzeConvo(token, id) {
	console.log("https://api.symbl.ai/v1/conversations/" + id + "/insights")
	xhttp.open("GET", "https://api.symbl.ai/v1/conversations/" + id + "/insights", true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.setRequestHeader("x-api-key", token);
	xhttp.send();	
}

// AVAYA

// call user
function avayaCallNumber(user_number) {
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	xhttp.open("POST", proxyurl + "https://api.zang.io/v2/Accounts/AC777c3e32a92fe233aa594ffb9d4974c6/Calls.json?To=" + user_number + "&Url=https://cloud.zang.io/data/inboundxml/a1b62ca6aa745773a58bc727d027a73dc3412276&From=+15148191895", true);
	xhttp.setRequestHeader("Authorization", "Basic QUM3NzdjM2UzMmE5MmZlMjMzYWE1OTRmZmI5ZDQ5NzRjNjphNGE3ODYxYjg0ZGE0OTVhOGVmZGM0ZjE1NGU2YzcwZg==")
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();		
}

function avayaNotifyEmergency(emergency_number) {
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	xhttp.open("POST", proxyurl + "https://api.zang.io/v2/Accounts/AC777c3e32a92fe233aa594ffb9d4974c6/Calls.json?To=" + user_number + "&Url=http://cloud.zang.io/data/inboundxml/5175120b79a3f1d13a704b757ceff9f2c775c495&From=+15148191895", true);
	xhttp.setRequestHeader("Authorization", "Basic QUM3NzdjM2UzMmE5MmZlMjMzYWE1OTRmZmI5ZDQ5NzRjNjphNGE3ODYxYjg0ZGE0OTVhOGVmZGM0ZjE1NGU2YzcwZg==")
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();		   
}

// get audio from the user and transcribe it
function avayaTranscribeAudioUrl(url) {
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	xhttp.open("POST", proxyurl + "https://api.zang.io/v2/Accounts/AC777c3e32a92fe233aa594ffb9d4974c6/Transcriptions.json?AudioUrl=" + url + "&TranscribeCallback=https://webhook.site/d5fb9213-d04b-45fc-8196-ef72c1059acb", true);
	xhttp.setRequestHeader("Authorization", "Basic QUM3NzdjM2UzMmE5MmZlMjMzYWE1OTRmZmI5ZDQ5NzRjNjphNGE3ODYxYjg0ZGE0OTVhOGVmZGM0ZjE1NGU2YzcwZg==")
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();	
}

function avayaGetRecordings() {
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	xhttp.open("GET", proxyurl + "https://api.zang.io/v2/Accounts/AC777c3e32a92fe233aa594ffb9d4974c6/Recordings", true);
	xhttp.setRequestHeader("Authorization", "Basic QUM3NzdjM2UzMmE5MmZlMjMzYWE1OTRmZmI5ZDQ5NzRjNjphNGE3ODYxYjg0ZGE0OTVhOGVmZGM0ZjE1NGU2YzcwZg==")
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();	
}

function avayaGetTranscription(transcription_id) {
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	xhttp.open("GET", proxyurl + "https://api.zang.io/v2/Accounts/AC777c3e32a92fe233aa594ffb9d4974c6/Transcriptions/" + transcription_id + ".json", true);
	xhttp.setRequestHeader("Authorization", "Basic QUM3NzdjM2UzMmE5MmZlMjMzYWE1OTRmZmI5ZDQ5NzRjNjphNGE3ODYxYjg0ZGE0OTVhOGVmZGM0ZjE1NGU2YzcwZg==")
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();
}


