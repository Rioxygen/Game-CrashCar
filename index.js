class Car {
    constructor(img, id) {
        this.img = img;
        this.id = id;
    }
    CreateCar(url) {
        var el = document.createElement("div");
        el.className = "car";
        el.id = this.id;
        el.style.backgroundImage = this.img;
        el.style.display = "none";
        document.getElementById("WindowOfGame").appendChild(el);
    }
    move(right, top) {
        var el = document.getElementById(this.id);
        el.style.right = right + "px";
        el.style.top = top + "px";
        el.style.display = "";
    }
    static random() {
        var rand = 0 + Math.random() * ((arguments[1]||3) + 1 - 0);
        rand = Math.floor(rand);
        if (arguments[0] == "Car") {
            var res;
            switch (rand) {
                case 0: res = 90;
                    break;
                case 1: res = 200;
                    break;
                case 2: res = 325;
                    break;
                case 3: res = 435;
                    break;
            }
            return res;
        }
        return rand;
    }
}

class PlayerCar extends Car
{
    move(top)
    {
        var el = document.getElementById(this.id);
        el.style.top = top + "px";
        el.style.right = "500px";
        el.style.display = "";
    }
}

class Road {
    built_lines(left) {
        var lines = document.getElementsByClassName("road_line");
       
        for (var i = 0; i < lines.length; i++) {
          
            if (parseInt(getComputedStyle(lines[i]).left) > -200) {
                lines[i].style.left = (parseInt(getComputedStyle(lines[i]).left) - left) + "px";
                
            }
            else if (parseInt(getComputedStyle(lines[i]).left) == -200) {
                lines[i].style.left = 800 + "px";
            }
        }
    }

    built_grass(left) {
        var gr_top = document.getElementsByClassName("grass-top");
        var gr_bot = document.getElementsByClassName("grass-bot");

        for (var i = 0; i < gr_bot.length; i++) {

            if (parseInt(getComputedStyle(gr_bot[i]).left) > -190) {
                gr_bot[i].style.left = (parseInt(getComputedStyle(gr_bot[i]).left) - left) + "px";
                gr_top[i].style.left = (parseInt(getComputedStyle(gr_top[i]).left) - left) + "px";

            }
            else if (parseInt(getComputedStyle(gr_bot[i]).left) == -190) {
                gr_bot[i].style.left = 800 + "px";
                gr_top[i].style.left = 800 + "px";
            }
        }
    }
}

class Menu
{
    createMainMenu()
    {
        var menu = document.createElement("div");
        menu.classList.add("menu");
        var but_start = document.createElement("button");
        but_start.innerHTML = "Start";
        but_start.classList.add("but_start");
        menu.appendChild(but_start);
        document.getElementById("WindowOfGame").appendChild(menu);
    };

    createLastMenu(curScore) {
        var container = document.createElement("div");
        container.classList.add("menu_last");
        var g = document.createElement("p");
        g.innerHTML = "GAME OVER";
        g.className="gameover-text";
        container.appendChild(g);
        var but = document.createElement("button");
        but.innerHTML = "Replay";
        but.classList.add("but_start");
        container.appendChild(but);
        let score = document.createElement("span");
        let bestScore = document.createElement("span");
        score.classList.add("score");
        bestScore.classList.add("bestScore");
        score.innerHTML = "SCORE: " + curScore;
        bestScore.innerHTML = "SCORE: " + localStorage.getItem("score");
        container.appendChild(score);
        container.appendChild(bestScore);
        but.onclick = startGame;
        document.getElementById("WindowOfGame").appendChild(container);
    };
};
document.body.onkeydown = function(e){
    e = e || window.event;
    var c = e.keyCode;
    if(c>36 && c<41 || c>32 && c<37) return false;
}
    
var menu = new Menu();
menu.createMainMenu();

document.getElementsByClassName("but_start")[0].onclick = startGame;
    
function startGame () {
    var DomElMenu = document.getElementsByClassName("menu")[0];
    if (DomElMenu) {
        document.getElementById("WindowOfGame").removeChild(DomElMenu);
    }
    DomElMenu = document.getElementsByClassName("menu_last")[0];
    if (DomElMenu) {
        document.getElementById("WindowOfGame").removeChild(DomElMenu);
    }
        function createScoreBar(curScore) {
            let Score = document.getElementById("score");
            if (arguments.length == 1) {
                if (!Score) {
                    
                    var CurScoreContainer = document.createElement("span");
                    CurScoreContainer.id = "cur-score-container";
                    Score = document.createElement("span");
                    Score.id = "score";
                    CurScoreContainer.appendChild(Score);
                    document.getElementById("WindowOfGame").appendChild(CurScoreContainer);

                    bestScoreContainer = document.createElement("span");
                    bestScoreContainer.id = "best-score-container"
                    bestScore = document.createElement("span");
                    bestScore.id = "bestscore";
                    bestScoreContainer.appendChild(bestScore);
                    document.getElementById("WindowOfGame").appendChild(bestScoreContainer);
                }
                Score.innerHTML ="Score: " + curScore;
            }
            if (arguments.length == 0) {
                if (CurScoreContainer) {
                    document.getElementById("WindowOfGame").removeChild(CurScoreContainer);
                }
            }
        }

        function moveCar(swCar, arrObjCar, posCar, nLine, pos, curScore) {
            for (var i = 0; i < swCar.length; i++) {
                if (swCar[i]) {
                    arrObjCar[i].move(posCar[i], nLine[i]);
                    posCar[i] += 5;
                    if (((500 - posCar[i]) <= 155 && (500 - posCar[i]) >= -165) && 
                    ((nLine[i] - pos) <= 63 && (nLine[i] - pos) >= -63)) {
                        endGame(curScore);
                    }
                }
            }
            posCar.forEach(function (val, index) { 
                if (val > 810) { 
                    swCar[index] = false; 
                    posCar[index] = -217; 
                    nLine[index] = 0 
                } 
            });
        }

        function endGame(curScore) {
            clearInterval(timer1);
            clearInterval(timer2);
            menu.createLastMenu(curScore);
            if (localStorage.getItem("score") < curScore) {
                localStorage.setItem("score", curScore);
            }
        };

    var arr_obj_car = [];
    arr_obj_car[0] = new Car("url(Images/Audi2.png)", 1);
    arr_obj_car[0].CreateCar();
    arr_obj_car[1] = new Car("url(Images/Police.png)", 2)
    arr_obj_car[1].CreateCar();
    arr_obj_car[2] = new Car("url(Images/Ambulance.png)", 4);
    arr_obj_car[2].CreateCar();
    arr_obj_car[3] = new Car("url(Images/Black_viper.png)", 5);
    arr_obj_car[3].CreateCar();
    arr_obj_car[4] = new Car("url(Images/Car.png)", 6);
    arr_obj_car[4].CreateCar();
    arr_obj_car[5] = new Car("url(Images/Mini_truck.png)", 7);
    arr_obj_car[5].CreateCar();
    arr_obj_car[6] = new Car("url(Images/Mini_van.png)", 8);
    arr_obj_car[6].CreateCar();
    arr_obj_car[7] = new Car("url(Images/truck.png)", 9);
    arr_obj_car[7].CreateCar();
    var player = new PlayerCar("url(Images/Taxi.png)", 3)
    player.CreateCar();

    arr_obj_car.forEach(function (item) { item.move(-217, 90); })
    var posPlayerCar = 90;
    var road = new Road();
    var move_bot_timer;
    var move_top_timer;
    var score = 1;
    var n_car;
    var position_car = [-217, -217, -217, -217, -217, -217, -217, -217];
    var n_line = [];
    var sw_car = [0, 0, 0, 0, 0, 0, 0, 0];

    addEventListener("keydown", function (event) {
        switch (event.keyCode) {
            case 40: if (!move_bot_timer) { 
                        move_bot_timer = setInterval(function () {
                            if (posPlayerCar <= 435) { 
                                 posPlayerCar += 5; 
                            } 
                        }, 30) 
                    };
                break;
            case 38:
                if (!move_top_timer) { 
                    move_top_timer = setInterval(function () { 
                        if (posPlayerCar >= 90) { 
                            posPlayerCar -= 5; 
                        } 
                    }, 30) 
                };
                break;
        }

    });
    addEventListener("keyup", function (event) {
        switch (event.keyCode) {
            case 40: clearInterval(move_bot_timer);
                move_bot_timer = null;
                break;
            case 38: clearInterval(move_top_timer);
                move_top_timer = null;
                break;
        }
    });

    var timer1 = setInterval(function () {
        if (Car.random(0, 2) == 1 && sw_car.some(function (val) { return !val })) {
            n_car = Car.random(0, 7);
            var line = Car.random("Car");
            if (!sw_car[n_car] && !n_line.some(function (val, ind) {
                if (val == line && position_car[ind] < 310) {
                    return true;
                }
            })) {
                if (position_car[n_car + 1] > 270 || position_car[n_car + 1] == -217 || 
                    position_car[n_car - 1] > 270 || position_car[n_car - 1] == -217) { 
                    n_line[n_car] = line;
                    sw_car[n_car] = true;
                }
            }
        };

        createScoreBar(score);
        document.getElementById("bestscore").innerHTML = "BestScore: "+localStorage.getItem("score") || 0;
    }, 500);

    var timer2 = setInterval(function () {
        road.built_lines(5);
        road.built_grass(5);
        moveCar(sw_car, arr_obj_car, position_car, n_line, posPlayerCar, score);
        player.move(posPlayerCar);
        score += 1;
    }, 25);
};



