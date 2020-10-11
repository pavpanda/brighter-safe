var strengths = [];
var weaknesses = [];
var questions = ["blah","blah","blah"];
var responses = [[1,"TAYF"],[2,"KA"],[3,"EW"],[4,"SU"],[5,"KIT"],[6,"AFH"],[7,"TAB"],[8,"DSYGA"],[9,"AWYA"],[10,"CFO"]];

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
        if(parseInt(responses[i][0]) >= 8) {
            strengths.push(responses[i][0]);
        }
        else if(parseInt(responses[i][0]) < 6)
            weaknesses.push(responses[i][0]);
    }
    console.log(strengths);


    
}
