

    const graficContainer = document.querySelector("#charsGraficElement")

    var graficFontSize = parseFloat(getComputedStyle(graficContainer).fontSize) ;

    const graficWidth = graficContainer.offsetWidth
    const graficHeight = graficContainer.offsetHeight
    
    // also font-family: monospace has the width and height of chasr the same px..
    // that is a good rati to apply directly the style of the html element containing the grafic. 
    const WIDTH =  Math.round ( (graficWidth / graficFontSize) * 1.65 ) 
    const HEIGHT =  Math.round ( (graficHeight / graficFontSize) * 0.84 )

   

    // the welcome animation is about 2.5 seconds
    // the char engine can start after that time


const print = (WIDTH, HEIGHT, positions, CHAR)=>{
        let result = [];
        let resultI = 0;
    
        // difining existence of screen
        // print first a blank screen
        // background char is CHAR
        for (let height = 0; height < HEIGHT; height++) {
            for (let width = 0; width < WIDTH ; width++) {
                // SET RESULT ARRAY AS ALL BLANK CHAR
                result[resultI]= CHAR;
                resultI ++;
            }
            result[resultI]= '\n';
            resultI ++;
        }
    
        // elements
        let left = 0 ;
        let top = 0 ;

        // init char for printing elements
        let el_CHAR = ' ';
    
        // put elements
        positions.forEach(e => {
            left = e[0] +1;
            top = e[1];
            sizeX = e[2];
            sizeY = e[3];
            el_CHAR = e[4];

            // begin of top left
            let top_left = (top * WIDTH ) + left ;

            // funtction to skip rows based on '\n'
            const height = (relativePosition) =>{
                for (let i = 0; i < sizeY * WIDTH; i+= WIDTH +1) {
                    if(result[relativePosition + i] == '\n'){
                        relativePosition += 1;
                        break;
                    }            
                    result[relativePosition + i] = el_CHAR;
                }
            }

            // print x row per row
            for (let i = 0; i < sizeX; i++) {
                // check if border of right side
                if(result[top_left + i] == '\n'){
                    top_left += 1;
                    break;
                }
                // set in array new position
                result[top_left + i] = el_CHAR;
                
                // ...() same...
                // print 1 column
                height(top_left + i);
            }
        });
        return result;
    }

//  @   #   #   #   #   #   #   #
//  @   DEFINE VITAL VARIABLES


//  @   !   !   !   !   !   !   !   !   !   !   !   !
//  @   all grafics need to be dropped in this array
//  @   a grafic element is made of 1 or more rectangles
let ELEMENTS_BUNCH = [/*[0,0,0,0]*/];

//  @   
//  @   if report needed
let REPORT = "";

//  @   
//  @   DEFINING OBJECTS

let x;
let y;


// there is already 10000 available js representation objects of the grafic
// they are then added in time interval, to then be on the screen
const available = [];
for (let i = 0; i < 10000; i + 2) {

    y = Math.floor(Math.random() * ( HEIGHT - 5 ) ) ;
    x = WIDTH - 4;
    
    const fromRight = {
        x:x,
        y:y,
        sizeX:4,
        sizeY:5,
        speedX:Math.floor(Math.random()* -1 * 3) -1 ,
        speedY:Math.floor(Math.random() * 2),
        type:"0",
        collision:false,
        get:function(){
            return {
                x:this.x , 
                y:this.y , 
                sizeX:this.sizeX , 
                sizeY:this.sizeY , 
                grafic:this.grafic
            }
        },
        // when printing is always to mind the \n , so x has to be + y, for now
        //[x,y,w,h,'c']
        grafic:[[x + y , y , 2 ,5,'+'], [x + y -1 , y+1 , 2 ,3,'#']],
    }
    available.push(fromRight);
    i++;

    y = Math.floor(Math.random() * (HEIGHT -5) ) ;
    x = 0; // adding \n chars
    const fromLeft = {
        x:x,
        y:y,
        sizeX:4,
        sizeY:5,
        speedX:Math.floor(Math.random() * 3) + 1,
        speedY:Math.floor(Math.random() * 2) ,
        type:"0",
        collision:false,
        get:function(){
            return {
                x:this.x , 
                y:this.y , 
                sizeX:this.sizeX , 
                sizeY:this.sizeY , 
                grafic:this.grafic
            }
        },
        
        // when printing is always to mind the \n , so x has to be + y, for now
        //         x   y   w   h    c             x   y   w   h    c           
        grafic:[ [ x + y , y , 2 , 5 , 'X' ],[ x+ y +3, y+1 , 2 , 3 , 'D' ] ]
    }

    available.push(fromLeft);
    i++
}

//  @   
//  @   CREATE OBJECTS ARRAY
const OBJECTS=[];

/*
// this funciton is now in the setinterval at the end of the file
// to start the whoole engine after the animation is finished that is the cheapest idea for now
let i = 0;
setInterval(()=>{
    OBJECTS.push(available[i]);
    i++;
},200);
*/

//  @
//  @   SET CHARACHTER FORMING BACKGROUND
const CHAR = ' ';

//  @
//  @   SET FRAME RATE
let FRAME_RATE = 70; // ms

//  @
//  @   COLLISION DETECTION
let collision = false;

//  @
//  @   CASE OF RUN IN THE BROWSER
const root = document.getElementById("charsGraficElement");
let result_string_for_div = "";

function rnd(n){
    return Math.floor( Math.random()*n);
}


//  @
//  @   GAME LOOP
function start(){

setInterval(()=>{

    ELEMENTS_BUNCH = [];
    // change  DIRECTION
    OBJECTS.forEach( (x,i) =>{

        // reset x and y locations
        x.y = x.y + x.speedY ;
        x.x = x.x + x.speedX ;

        // GUARDING FOR DIRECTION
        OBJECTS[i] = borders(x);
        
        collisionDetection(i, OBJECTS);
        
        if(!x.collision){
            // get x and y from grafic
            let minX = 9999999;
            let minY = 9999999;

            REPORT = `${x.x}`;
        //  @
        //  @   SET POSITION TO OBJ.GRAFIC []
            x.get().grafic.forEach(a => {
                a[0] += x.speedX + x.speedY; // compensate \n chars, every x row has an \n char at the end
                a[1] += x.speedY;
                ELEMENTS_BUNCH.push(a);
            });

        }
    });

    OBJECTS.forEach( (x,i) =>{
        if(x.collision){
            OBJECTS.splice(i,1);
        }
    });

    //  @
    //  @   PRINT 

    result2 = print ( 
        WIDTH,
        HEIGHT,
        ELEMENTS_BUNCH,
        CHAR
    );

    // CONSOLE.LOG() PRINTS THE WINDOW
    // console.log('\n',REPORT);

    //console.log(result2.join(""));

    for(var i = 0; i < result2.length; i++){
       result2[i] = result2[i].replace(' ', "&nbsp;");
    }

    result_string_for_div = result2.join("");
    
    // for browser
    root.innerHTML = "";
    root.innerHTML = result_string_for_div;

}, FRAME_RATE);
}
//  @
//  @   END OF GAME LOOP




//  @   #   #   #   #   #   #   #
//  @   USEFUL FUNCTIONS

function borders( obj ) {
    //`${x.x + x.sizeX} = ${WIDTH} :: ${x.y + x.sizeY} = ${HEIGHT} `;

    if (obj.x + obj.sizeX >= WIDTH || obj.x <= 0) {
        obj.speedX = obj.speedX * -1;
        obj.x = obj.x + obj.speedX ; 
    }


    if (obj.y + obj.sizeY >= HEIGHT || obj.y <= 0) {
        obj.speedY = obj.speedY * -1; 
        obj.y = obj.y + obj.speedY ;
    }

    return obj;

}

function collisionDetection( index , obj_arr ) {
    let collision = false;
    const el = obj_arr[index];
    let row = false;
    let column = false;

    obj_arr.forEach((o,i)=>{
        if(i != index){
            // compare x
            if ( (el.x + el.sizeX > o.x ) &&  ( el.x < o.x + o.sizeX  )  ) {
                row = true;
            }
            // compare y
            if ( (el.y + el.sizeY > o.y ) &&  ( el.y < o.y + o.sizeY  )  ) {
                column = true;
            }
        }

        if (row && column) {
            collision = true;
            obj_arr[i].collision = true;
            obj_arr[index].collision = true;
            i = obj_arr.length;
        }
        row = false ; column = false;

    });

    return collision;
}


// here are variables used only in this website, for now


let available_spacesheeps_index = 0
let spacesheeps_birt_frequency = 200 // ms

// yes just craete a new spacesheep is also a good idea
// but in our array there are 10000 already ;)
function addSpacesheep(){
    OBJECTS.push(available[available_spacesheeps_index]);
    available_spacesheeps_index++
}

let intervalID;

function startInterval() {
    intervalID = setInterval(addSpacesheep, spacesheeps_birt_frequency);
}

function stopInterval() {
  clearInterval(intervalID);
}

let btn_less = document.querySelector("#less_spacesheeps")
let btn_more = document.querySelector("#more_spacesheeps")

btn_less.addEventListener("click" , (e)=>{
    spacesheeps_birt_frequency += 100
    if(spacesheeps_birt_frequency > 1000 ){
        spacesheeps_birt_frequency = 1000
    }
    console.log(spacesheeps_birt_frequency)
    // new interval with new frequency
    stopInterval()
    startInterval()

})

btn_more.addEventListener("click" , (e)=>{
    spacesheeps_birt_frequency -= 100
    if(spacesheeps_birt_frequency < FRAME_RATE){
        spacesheeps_birt_frequency = FRAME_RATE -20
    }
    console.log(spacesheeps_birt_frequency)
    // new interval with new frequency
    stopInterval()
    startInterval()

})






// used just to wait welcome animation
setTimeout(()=>{
    // start game loop
    start()
    // start adding spacesheeps
    startInterval()
    },600)



    // start interval , stop interval example

    /*

let intervalID;

function startChange() {
    intervalID = setInterval(changeColor, 1000);
    let index = 100;
    console.log(index)
}

function changeColor() {
  if (document.body.style.backgroundColor !== 'black') {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
}

function stopChange() {
  clearInterval(intervalID);
}

document
  .getElementById('start')
  .addEventListener('click', startChange);
document.getElementById('stop').addEventListener('click', stopChange);




    */