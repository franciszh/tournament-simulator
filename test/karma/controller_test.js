// Writing unit tests is entirely optional for the challenge.
// However we have included this unit test harness should you prefer to develop in a TDD environment.

// http://chaijs.com/api
// https://mochajs.org
// http://sinonjs.org/docs

describe('controller', function () {
    describe('announceWinner', function () {
        it('should get the winning teamId', function () {
            let winnerScoreStr = JSON.stringify({score: 8});
            let teamScoreMap = new Map();
            teamScoreMap.set(1, 8);
            teamScoreMap.set(0, 9);
            let winner = announceWinner(winnerScoreStr, teamScoreMap);
            expect(winner).to.equal(1);

        });

        it('should get the lowest teamId when it is tie', function () {
            let winnerScoreStr = JSON.stringify({score: 8});
            let teamScoreMap = new Map();
            teamScoreMap.set(0, 8);
            teamScoreMap.set(1, 8);
            let winner = announceWinner(winnerScoreStr, teamScoreMap);
            expect(winner).to.equal(0);
        });
    });

    describe('totalNumberOfMatches', function () {
        it('should get the correct total number of matches when it is a big tournament', function () {
            expect(totalNumberOfMatches(256, 4)).to.equal(85);
        });

        it('should get the correct total number of matches when it is a small tournament', function () {
            expect(totalNumberOfMatches(2, 2)).to.equal(1);
        });
    });
});
