const localDb = window.localStorage
console.log(localDb.getItem("name"))
            console.log(localDb.getItem("phoneNumber"))
            console.log(localDb.getItem("email"))
            console.log(localDb.getItem("password"))
const auth = firebase.auth()
var button1 = document.getElementById("next");

var userResponse = "";

var questions = [["On a scale of 1-10, how happy were you over the past few weeks? (1 = “very unhappy”, 10 = “very happy”)"],
["On a scale of 1-10, how active are you? (1 = “not active”, 10 = “very active”)"],["On a scale of 1-10, how satisfied are you after eating a meal? (1 = “not satisfied”, 10 = “very satisfied”)"],["On a scale of 1-10, how often do you use substances to deal with external influences? (1 = “never”, 10 = “all the time”)"],["On a scale of 1-10, how often do you talk with others? (1 = “never”, 10 = “all the time”)"],["On a scale of 1-10, how comfortable are you with asking for help? (1 = “Very uncomfortable”, 10 = “Very comfortable”)"],
["On a scale of 1-10, how overworked do you feel? (1 = “not overworked”, 10 = “very overworked”)"],["On a scale of 1-10, how would you rate the level of enjoyment you have performing daily activities? (1 = “no enjoyment”, 10 = “lots of enjoyment”)"],["On a scale of 1-10, How comfortable are you in your own skin? (1 = “Very uncomfortable”, 10 = “Very comfortable”)"],["On a scale of 1-10, How much do you prioritize putting time into your relationships? (1 = “no priority”, 10 = “lots of priority”)"]] // 2D array of the questions

var responses = [];


var i = 1;
console.log(questions[0]);

document.getElementById("sampleQ").innerHTML = questions[0];



function callQuestions(){

    button1.onclick = function (){
        if (i < 10) {
            userResponse = document.getElementById("myRange").value;
            console.log(i);
            responses.push(userResponse);
            
            document.getElementById("sampleQ").innerHTML = questions[i][0];
            
            i+=1;
        }
        else {
            userResponse = document.getElementById("myRange").value;
            console.log(i);
            responses.push(userResponse);
            localDb.setItem("response0", responses[0])
            localDb.setItem("response1", responses[1])
            localDb.setItem("response2", responses[2])
            localDb.setItem("response3", responses[3])
            localDb.setItem("response4", responses[4])
            localDb.setItem("response5", responses[5])
            localDb.setItem("response6", responses[6])
            localDb.setItem("response7", responses[7])
            localDb.setItem("response8", responses[8])
            localDb.setItem("response9", responses[9])
            const email = localDb.getItem("email")
            const pw = localDb.getItem("password")
            console.log(email)
            console.log(pw)
            auth.createUserWithEmailAndPassword(email, pw).catch(function(error) {
                // handle errors
            }).then(function() {
                location.href = 'summary.html'
            })
            
        }

    }
}

callQuestions();
