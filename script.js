// Object variables
let objects = [];
let objectImages = ["rock.png", "paper.png", "scissors.png"];
let objectTypes = ["Rock", "Paper", "Scissors"];
let objectSizes = [35, 35, 35];
let objectSpeeds = [];

let objectNumber = []
// let objectNumber = [1,2,3]

// Load the object images
let imagesLoaded = 0;
let images = [];

function addImages(){
    for (let i = 0; i < objectImages.length; i++) {
        let img = new Image();
        img.src = objectImages[i];
        img.onload = function() {
            // imagesLoaded++;
            // if (imagesLoaded == objectImages.length) {
            //     addObjects();
            //     gameLoop();
            // }
        };
        images.push(img);
    }
}


// Canvas variables
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

// Add objects to the canvas
function addObjects() {
    objects = []
    for (let i = 0; i < 3; i++) {
        for(let j = 0; j < objectNumber[i]; j++){
            let object = {
                x: getRandomInt(objectSizes[i]/2, canvas.width - objectSizes[i]),
                y: getRandomInt(objectSizes[i]/2, canvas.height - objectSizes[i]),

                type: objectTypes[i],
                size: objectSizes[i],
                image: images[i],
                speedX: 1,
                speedY: 1
            };
            objects.push(object);
        }
    }
}

// Update the positions of the objects
function updateObjects() {
    for (let i = 0; i < objects.length; i++) {
        objects[i].x += objects[i].speedX;
        objects[i].y += objects[i].speedY;
        
        // Check for collisions with other objects
        for (let j = i + 1; j < objects.length; j++) {
            let dx = objects[i].x - objects[j].x;
            let dy = objects[i].y - objects[j].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            let minDistance = objects[i].size/2 + objects[j].size/2;
            // console.log(distance)
            // console.log(minDistance)

            if (distance <= minDistance) {


                if(objects[i].type == "Rock" && objects[j].type == "Scissors"){
                    objects[j].type = "Rock";
                    objects[j].image = objects[i].image;
                    console.log("Collision");
                }else if(objects[i].type == "Scissors" && objects[j].type == "Rock"){
                    objects[i].type = "Rock";
                    objects[i].image = objects[j].image;
                    console.log("Collision");
                }

                if(objects[i].type == "Paper" && objects[j].type == "Rock"){
                    objects[j].type = "Paper";
                    objects[j].image = objects[i].image;
                    console.log("Collision");
                }else if(objects[i].type == "Rock" && objects[j].type == "Paper"){
                    objects[i].type = "Paper";
                    objects[i].image = objects[j].image;
                    console.log("Collision");
                }

                if(objects[i].type == "Scissors" && objects[j].type == "Paper"){
                    objects[j].type = "Scissors";
                    objects[j].image = objects[i].image;
                    console.log("Collision");
                }else if(objects[i].type == "Paper" && objects[j].type == "Scissors"){
                    objects[i].type = "Scissors";
                    objects[i].image = objects[j].image;
                    console.log("Collision");

                }

                objects[i].speedX *= -1;
                objects[i].speedY *= -1;
                objects[j].speedX *= -1;
                objects[j].speedY *= -1;

                objects[i].x += 2*objects[i].speedX;
                objects[i].y += 2*objects[i].speedY;

                objects[j].x += 2*objects[j].speedX;
                objects[j].y += 2*objects[j].speedY;


            }
        }
        
        if (objects[i].x > canvas.width - objects[i].size || objects[i].x < 0) {
            objects[i].speedX *= -1;
        }
        if (objects[i].y > canvas.height - objects[i].size || objects[i].y < 0) {
            objects[i].speedY *= -1;
        }

        drawObjects();

    }
}

function drawObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < objects.length; i++) {
        ctx.drawImage(objects[i].image, objects[i].x, objects[i].y, objects[i].size, objects[i].size);
    }
}

var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});



function checkWin(){

    let winSet = new Set()
    for(let i = 0; i < objects.length; i++){
        winSet.add(objects[i].type);
    }

    if (winSet.size == 1){
        const setIterator = winSet.values();

        for(let value of setIterator){
            console.log(value + " Win!")
            document.querySelector("#win-type").innerHTML = value;
            myModal.show();
            
            setTimeout(() => {
                audio.pause();
            }, 1000);

        }

        return true
    }
    
    return false
}

// Main game loop
function gameLoop() {
    updateObjects();
    drawObjects();
    let win = checkWin();
    if(win == true){
        return
    }
    requestAnimationFrame(gameLoop);


}


var audio = new Audio('background.mp3');

let customBtn = document.querySelector("#customBtn").addEventListener("click", () => {

    objects = []
    objectNumber = []
    objectSpeeds = [2, 2, 2];

    audio.play();

    Swal.fire({
        position: 'bottom-end',
        icon: 'info',
        title: 'Volume Up',
        showConfirmButton: false,
        timer: 1500
    })

    let rockNumber = parseInt(document.querySelector("#rock").value)
    let paperNumber = parseInt(document.querySelector("#paper").value)
    let scissorsNumber = parseInt(document.querySelector("#scissors").value)

    console.log(rockNumber)
    console.log(paperNumber)
    console.log(scissorsNumber)
    if(isNaN(rockNumber) || isNaN(paperNumber) || isNaN(scissorsNumber)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Input correct data'
        })
        return
    }

    objectNumber.push(rockNumber)
    objectNumber.push(paperNumber)
    objectNumber.push(scissorsNumber)
    start();

})

let randomBtn = document.querySelector("#randomBtn").addEventListener("click", () => {
    objects = []
    objectNumber = []
    objectSpeeds = [2, 2, 2];

    audio.play();

    Swal.fire({
        position: 'bottom-end',
        icon: 'info',
        title: 'Volume Up',
        showConfirmButton: false,
        timer: 1500
    })

    for(let i = 0; i < 3; i++){
        objectNumber.push(getRandomInt(4, 25));
    }

    start();

})

addImages();

function start(){
    addObjects();
    gameLoop();
    
}

