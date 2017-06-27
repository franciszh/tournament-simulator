/**
 * Created by franciszhao on 25/5/17.
 */
class domHandler{

    static emptyWinner(){
        document.getElementById('winner').innerText = "";
    }

    static updateWinner(winnerName){
        document.getElementById('winner').innerText = `${winnerName}${env==="test"?"":" is the Winner."}`
    }

    static appendEmptyMatchBox(numberOfMatches){
        this.eraseElementsByClassName("empty-box");
        this.eraseElementsByClassName("fill-box");

        for(let i = 0; i < numberOfMatches; i++){
            let box = document.createElement("div");
            box.className = "empty-box";
            document.body.appendChild(box);
        }
    }

    static fillMatchBox(){
        document.getElementsByClassName("empty-box")[0].className = "fill-box";
    }

    static eraseElementsByClassName(className){
        let elements = document.getElementsByClassName(className);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
    static showError(){
        this.eraseElementsByClassName("empty-box");
        this.eraseElementsByClassName("fill-box");
        document.getElementById('winner').innerText = `The input is not valid`;
    }
}