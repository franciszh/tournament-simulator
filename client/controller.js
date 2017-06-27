/**
 * Created by franciszhao on 27/5/17.
 */
function main(numberOfTeams, teamsPerMatch, service, classTournament) {

    service.getFirstRoundData(numberOfTeams, teamsPerMatch).then(function (tournamentSetup) {
        let firstRound = JSON.parse(tournamentSetup);
        let matchUps = firstRound.matchUps;
        //draw the empty matchbox
        domHandler.appendEmptyMatchBox(totalNumberOfMatches(numberOfTeams, teamsPerMatch));
        domHandler.emptyWinner();

        //set up a new tournament data model
        tournament = new classTournament(numberOfTeams, teamsPerMatch, firstRound.tournamentId);

        //simulate the first round
        organiseMatches(tournament, matchUps, service);
    }).catch(function(){
        domHandler.showError();
    });
}

// max 6 concurrent matches are allowed
function organiseMatches(tournament, matchUpsObjs, service) {
    let round = tournament.getCurrentRound();
    let tournamentId = tournament.getTournamentId();
    let maxUnfinishedMatches = 6;
    let currentUnfinishedMatches = maxUnfinishedMatches;
    let maxConcurrentMatch = Math.min(matchUpsObjs.length,maxUnfinishedMatches);

    simulateMatches(maxConcurrentMatch,matchUpsObjs,tournamentId,round,currentUnfinishedMatches,service);

}

function simulateMatches(maxConcurrentMatch,matchUpsObjs,tournamentId, round, currentUnfinishedMatches,service){
    let currentUnfinishedMatches_local = currentUnfinishedMatches;
    for(let i = 0; i < maxConcurrentMatch; i++) {
        let thisMatch = matchUpsObjs[i];
        let thisMatchID = thisMatch['match'];
        let teamIds = thisMatch['teamIds'];

        service.getScoresForOneMatch(tournamentId, thisMatchID, teamIds, round)
            .then(function (scoresForOneMatch) {
                return service.getWinnerScore(scoresForOneMatch);
            })
            .then(function (winnerScoreAndTeamMap) {
                //wait until all the matches' results come back
                let winner = announceWinner(winnerScoreAndTeamMap[0], winnerScoreAndTeamMap[1]);

                domHandler.fillMatchBox();
                //record winners for next round
                tournament.pushWinners(winner);

                currentUnfinishedMatches_local--;

                if (tournament.isRoundFinished()) {
                    if (tournament.isTournamentFinished()) {
                        service.getWinnerNameByID(tournament.getTournamentId(),
                            tournament.getTournamentWinnerId()).then(
                            function (TournamentWinner) {
                                domHandler.updateWinner(JSON.parse(TournamentWinner).name);
                            }
                        );
                    } else {
                        prepareForNextRound(tournament, service);
                    }
                }else if(currentUnfinishedMatches_local<1){
                    //organise remaining matches when concurrent matches finished
                    organiseMatches(tournament, matchUpsObjs.slice(maxConcurrentMatch), service)
                }
            })
    }
}

function prepareForNextRound(tournament, service) {
    tournament.newRound();
    organiseMatches(tournament, tournament.generateMatchSchedule(), service);
}

function announceWinner(winnerScoreStr, teamScoreMap) {
    let winner = Number.MAX_SAFE_INTEGER;
    let winnerScore = JSON.parse(winnerScoreStr).score;
    for (let [key, value] of teamScoreMap.entries()) {
        if (value === winnerScore) {
            winner = Math.min(winner, key);
        }
    }
    return winner;
}

function totalNumberOfMatches(numberOfTeams, teamsPerMatch) {
    let sum = 0;
    while (numberOfTeams / teamsPerMatch !== 1) {
        sum += numberOfTeams / teamsPerMatch;
        numberOfTeams = numberOfTeams / teamsPerMatch;
    }
    return sum + 1;
}