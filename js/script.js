class Game {
//0 - verde, 1 - vermelho, 2 - amarelo, 3 - azul
    constructor() {
       this.order = [];
       this.clickedOrder = [] ;
       this.score = 0;

       this.blue = document.querySelector('.blue');
       this.red = document.querySelector('.red');
       this.green = document.querySelector('.green');
       this.yellow = document.querySelector('.yellow');

       this.checkOrder();
       this.click();
       this.adicionarEventoAosBotoes();
       this.playGame();

       this.green.onclick = ()=> this.click(0);
       this.red.onclick = ()=> this.click(1);
       this.blue.onclick = ()=> this.click(2);
       this.yellow.onclick = ()=> this.click(3);
    }

    adicionarEventoAosBotoes() {
        this.green.addEventListener('click', this.click(0));
        this.red.addEventListener('click', this.click(1));
        this.blue.addEventListener('click', this.click(2));
        this.yellow.addEventListener('click', this.click(3));
    }

    shuffleOrder() {
        let colorOrder = Math.floor(Math.random() * 4);
        this.order[this.order.length] = colorOrder;
        this.clickedOrder = [];

        for (let indice in this.order) {
            let elementColor = this.createColorElement(this.order[indice]);
            this.lightColor(elementColor, Number(indice)+1);
        }
        
    }

    createColorElement(colorSelected) {
        if (colorSelected == 0) {
            return this.green;
        } else if (colorSelected == 1) {
            return this.red;
        } else if (colorSelected == 2) {
            return this.yellow;
        } else if (colorSelected == 3) {
            return this.blue;
        }
    }

    lightColor(element, number) {
        number = number * 500;
        setTimeout(()=>{
            element.classList.add('selected');
        }, number - 250);

        setTimeout(() => {
          element.classList.remove('selected');  
        });
    }

    checkOrder() {
        for (let i in this.clickedOrder) {
            if (this.clickedOrder[i] != this.order[i]) {
                this.gameOver();
                break;
            }
        }
        if (this.clickedOrder.length === this.order.length) {
            alert(`Pontuação ${this.score}\nVocê acertou! Iniciando próximo nível`);
            this.nextLevel();
        }
    }

    click(color) {
      if (color === undefined) {
          return;
      }
      this.clickedOrder[this.clickedOrder.length] = color;
      this.createColorElement(color).classList.add('selected');

      setTimeout(() => {
        this.createColorElement(color).classList.remove('selected');
        this.checkOrder();
      });
    }

    nextLevel() {
        this.score++;
        this.shuffleOrder();
    }

    gameOver() {
        alert(`Pontuação: ${this.score}\nVocê perdeu o jogo!\nClique em ok, para reiniciar.`);
        this.order = [];
        this.clickedOrder = [];
        this.playGame();
    }

    playGame() {
        alert('Bem vindo ao Genesis! Iniciando novo jogo!');
        this.score = 0;
        this.nextLevel();
    }

    
}