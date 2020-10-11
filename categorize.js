var strengths = [];
var weaknesses = [];
var questions = ["blah","blah","blah"];
const localDb = window.localStorage
pastResponses = localDb.getItem("responses")
console.log(pastResponses)

var responses = [[1,"Talk about feelings"],[2,"Keep active"],[3,"Eat well"],[4,"Substance use"],[5,"Keep in touch"],[6,"Ask for help"],[7,"Take a break"],[8,"Using your skills"],[9,"Acceptance"],[10,"Caring"]];

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




    console.log(responses)

    for(var i = 0; i < responses.length; i++){
        if(parseInt(responses[i][0]) >= 80) {
            strengths.push(responses[i]);
        }
        else if (parseInt(responses[i][0]) < 60) {
            weaknesses.push(responses[i]);
        }
    }
    console.log(strengths);
    console.log(weaknesses)

    
}

categorize();
