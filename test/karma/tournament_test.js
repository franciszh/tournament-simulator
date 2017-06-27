// Writing unit tests is entirely optional for the challenge.
// However we have included this unit test harness should you prefer to develop in a TDD environment.

// http://chaijs.com/api
// https://mochajs.org
// http://sinonjs.org/docs

describe('model tournament', function () {
    describe('isRoundFinished', function () {
        it('should handle one-round tournament', function () {
            let testTournament = new Tournament(2, 2, 0);
            testTournament.pushWinners(99);
            expect(testTournament.isRoundFinished()).to.equal(true);
        });
        it('should handle multi-round tournament', function () {
            let testTournament = new Tournament(2, 4, 0);
            testTournament.pushWinners(99);
            expect(testTournament.isRoundFinished()).to.equal(false);
        });
    });

    describe('generateMatchSchedule', function () {
        it('should generate correct schedule for one round', function () {
            let testTournament = new Tournament(2, 4, 0);
            testTournament.pushWinners(1);
            testTournament.pushWinners(2);
            let generateMatchSchedule = testTournament.generateMatchSchedule();
            expect(generateMatchSchedule).to.be.an('array');
            expect(generateMatchSchedule.length).to.equal(1);
            expect(generateMatchSchedule[0].match).to.equal(0);
            expect(generateMatchSchedule[0].teamIds).to.eql([1,2]);
        });

        it('should sort the winner list', function () {
            let testTournament = new Tournament(2, 4, 0);
            testTournament.pushWinners(2);
            testTournament.pushWinners(1);
            let generateMatchSchedule = testTournament.generateMatchSchedule();
            expect(generateMatchSchedule[0].teamIds).to.eql([1,2]);
        });

        describe('isTournamenrtFinished', function () {
            it('should return true when one winner left', function () {
                let testTournament = new Tournament(2, 4, 0);
                testTournament.pushWinners(2);
                expect(testTournament.isTournamentFinished()).to.equal(true);
            });
            it('should return false when multiple winners left', function () {
                let testTournament = new Tournament(2, 4, 0);
                testTournament.pushWinners(2);
                testTournament.pushWinners(1);
                expect(testTournament.isTournamentFinished()).to.equal(false);
            });
        });
    });
});
