# Knockout Tournament

The goal of this task is to simulate a single-elimination knockout tournament in the browser, determining the winner as quickly as possible.


The simulation must implement the following flow:

1. The user enters the teams participating per match (`#teamsPerMatch`).
2. The user enters the number of teams participating in the tournament (a non-zero power of the `#teamsPerMatch` value)
3. The user clicks the start button.
4. The first round's match-ups are fetched from the server.
5. The winner of a match moves on to the next round and matches up against the adjacent winner(s).
6. Matches are simulated until the winning team is determined.
7. The winning team's name is shown in the UI.

Both teams and matches have scores that are constant for the duration of the tournament. To simulate a match:

1. The teams' scores are fetched from the server.
2. The match's score is fetched from the server.
3. All these scores are sent to the server and it returns the winning team's score.
4. In the event of a tie, the team with the lowest ID wins.