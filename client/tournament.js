/**
 * Created by franciszhao on 27/5/17.
 */
class Tournament{

    constructor(teamsNum,teamsPerMatch,tournamentId){
        this.round = 0;
        this.teamsNum = teamsNum;
        this.teamsPerMatch = teamsPerMatch;
        this.tournamentId = tournamentId;
        this.winnerList = [];
    }

    getTournamentId(){
        return this.tournamentId;
    }

    newRound(){
        this.round++;
    }

    getCurrentRound(){
        return this.round;
    }


    pushWinners(teamId){
        this.winnerList.push(teamId);
    }

    isRoundFinished(){
        return this.winnerList.length === (this.teamsNum/Math.pow(this.teamsPerMatch,this.round+1));
    }

    isTournamentFinished(){
        return this.winnerList.length === 1;
    }

    getTournamentWinnerId(){
        return this.winnerList[0];
    }

    generateMatchSchedule(){
        let finalisedList = this.winnerList.sort(function(a,b){
            return a-b;
        });
        this.winnerList = [];
        let teamsPerMatch = this.teamsPerMatch;
        let matchUps = [];
        let numberOfMatches = finalisedList.length/teamsPerMatch;
        for(let i = 0; i < numberOfMatches; i++){
            let oneMatch = {};
            oneMatch.match = i;
            oneMatch.teamIds = finalisedList.slice(i*teamsPerMatch,i*teamsPerMatch+teamsPerMatch);
            matchUps.push(oneMatch);
        }
        return matchUps;
    }

}
