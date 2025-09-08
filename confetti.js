class Confetti {
    type;
    speed;
    y;
    x;
	size;
    
    constructor(type, speed, x, y, size) {
        this.type = type;
        this.speed = speed;
        this.y = y;
        this.x = x;
		this.size = size;
    }
    
    move() {
        this.y += this.speed; 
    }

    get getX(){
        return this.x;
    }
    
    get getY(){
        return this.y;
    }
}	

const confettiTypes = ["red","green","blue","yellow"];
let confettiList = [];

function createConfetti(type, id, size)
{
    let element = document.createElement("div");
    element.className = "confetti_" + type;
    element.id = "confetti_" + id;
    element.style.width = size;
	element.style.height = size;
	
	document.getElementById("confetti").appendChild(element);
    
}

function confetti()
{
    let amount = parseInt(window.innerWidth / 100) * 80;
    
	confettiList = [];
    document.getElementById("confetti").innerHTML = "";
    document.getElementById("confetti").style.display = "block";

    let flash_el = document.createElement("div");
    flash_el.id = "confetti_flash";
    document.getElementById("confetti").appendChild(flash_el);

	for(let i=0; i < amount; i++)
    {
		let size = Math.floor( (Math.random() * 6) + 4);
		
        let xPos = Math.floor(Math.random() * 105);
        let yPos = Math.floor(Math.random() * -300);
        let speed = Math.floor(Math.random() * 25);
        let type = confettiTypes[Math.floor(Math.random() * confettiTypes.length)];
        let confettiItem = new Confetti(type, speed, (xPos - 5), yPos, size);
        confettiList.push(confettiItem);
        createConfetti(type, i, size);
    }
    
    animateConfetti();
}

function animateConfetti()
{
    let timer = null;
    
    let time = 0;
    clearInterval(timer);
    timer = setInterval(frame, 20);
    
    function frame() {
        if (time == 100) {
            clearInterval(timer);
            document.getElementById("confetti").innerHTML = "";
            document.getElementById("confetti").style.display = "none";

        } else {
            for(let i=0; i < confettiList.length; i++)
            {
                confettiList[i].move();
                document.getElementById("confetti_" + i).style.top = confettiList[i].getY;
                document.getElementById("confetti_" + i).style.left = confettiList[i].getX + "%"; 
                document.getElementById("confetti_" + i).style.opacity = 1.0 - (time / 100);  
            }
            document.getElementById("confetti_flash").style.opacity = 1.0 - ((time * 10) / 100);
            time++;
        }
    }	
}
