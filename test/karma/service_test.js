// Writing unit tests is entirely optional for the challenge.
// However we have included this unit test harness should you prefer to develop in a TDD environment.

// http://chaijs.com/api
// https://mochajs.org
// http://sinonjs.org/docs

describe('service', function () {

    describe('getFirstRoundData', function () {
        it('should send request to server with correct parameters', function () {
            let httpHandler = {
                post: function () {
                }
            };
            let postSpy = sinon.spy(httpHandler, 'post');

            let service = new Service(httpHandler);
            let numberOfTeams = 2;
            let teamsPerMatch = 4;
            service.getFirstRoundData(numberOfTeams, teamsPerMatch);

            postSpy.restore();
            sinon.assert.calledOnce(postSpy);
            sinon.assert.calledWith(postSpy, sinon.match(`tournament`), {
                numberOfTeams: numberOfTeams,
                teamsPerMatch: teamsPerMatch
            });
        });
    });

    describe('getScoresForOneMatch', function () {
        it('should assemble three get requests', function () {
            let httpHandler = {
                get: function () {
                }
            };
            let getSpy = sinon.spy(httpHandler, 'get');
            let service = new Service(httpHandler);

            service.getScoresForOneMatch(0, 0, [0, 1], 0);
            getSpy.restore();
            sinon.assert.calledThrice(getSpy);
        });
    });

    describe('getWinnerScore', function () {
        it('should send one get request with correct parameters', function () {
            let httpHandler = {
                get: function () {
                }
            };
            let getSpy = sinon.spy(httpHandler, 'get');
            let service = new Service(httpHandler);

            service.getWinnerScore([JSON.stringify({score: 27}), 0,
                JSON.stringify({score: 6}), JSON.stringify({score: 7})]);
            getSpy.restore();
            sinon.assert.calledOnce(getSpy);
            sinon.assert.calledWith(getSpy, sinon.match(`winner?tournamentId=0&matchScore=27&teamScores=6&teamScores=7`));
        });
    });

    describe('getWinnerNameByID', function () {
        it('should send one get request with correct parameters', function () {
            let httpHandler = {
                get: function () {
                }
            };
            let getSpy = sinon.spy(httpHandler, 'get');
            let service = new Service(httpHandler);

            service.getWinnerNameByID(0, 0);
            getSpy.restore();
            sinon.assert.calledOnce(getSpy);
            sinon.assert.calledWith(getSpy, sinon.match(`team?tournamentId=0&teamId=0`));
        });
    });

});
