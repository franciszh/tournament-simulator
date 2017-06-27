
// global env variable
let env = (window.location.href==="http://localhost:8765/")?"prod":"test";

document.addEventListener('DOMContentLoaded', function(){
    //Should use class import, however chrome 58 doesn't support it.
    let httpHandler = new HttpHandler();
    let service = new Service(httpHandler);
    let classTournament = Tournament;
    document.getElementById("start").addEventListener('click',function(){
        let teamsPerMatch = Math.round(document.getElementById("teamsPerMatch").value);
        let numberOfTeams = Math.round(document.getElementById("numberOfTeams").value);
        main(numberOfTeams, teamsPerMatch, service, classTournament)
    });
}, false);


