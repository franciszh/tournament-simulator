/**
 * Created by franciszhao on 27/5/17.
 */

const baseURL = window.location.href;

class Service{

    constructor(httpHandler){
        this.httpHandler = httpHandler;
    }

     getFirstRoundData(numberOfTeams,teamsPerMatch){
        return this.httpHandler.post(baseURL+"tournament",{
            numberOfTeams : numberOfTeams,
            teamsPerMatch : teamsPerMatch
        });
    }

     getScoresForOneMatch(tournamentId,thisMatchID,teamIds,round) {
        let getScoresPromiseAllAry = [];
        getScoresPromiseAllAry.push(this.httpHandler.get(`${baseURL}match?tournamentId=${tournamentId}&round=${round}&match=${thisMatchID}`));
        getScoresPromiseAllAry.push(tournamentId);
        for (let teamId of teamIds) {
            getScoresPromiseAllAry.push(this.httpHandler.get(`${baseURL}team?tournamentId=${tournamentId}&teamId=${teamId}`))
        }
        return Promise.all(getScoresPromiseAllAry);
    }

     getWinnerScore(scoresForOneMatch){
        let matchScore = JSON.parse(scoresForOneMatch[0]).score;
        let tournamentId = JSON.parse(scoresForOneMatch[1]);
        let teamScoreString = `tournamentId=${tournamentId}&matchScore=${matchScore}`;
        let teamScoreMap = new Map();

        scoresForOneMatch.forEach(function(value, i) {
            if(i>1){
                let teamScoreObj = JSON.parse(value);
                teamScoreString+=`&teamScores=${teamScoreObj.score}`
                teamScoreMap.set(teamScoreObj.teamId,teamScoreObj.score);
            }

        });
        return Promise.all([this.httpHandler.get(`${baseURL}winner?${teamScoreString}`),teamScoreMap]);
    }

     getWinnerNameByID(tournamentId,teamId){
        return this.httpHandler.get(`${baseURL}team?tournamentId=${tournamentId}&teamId=${teamId}`);
    }
}