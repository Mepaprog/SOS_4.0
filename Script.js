
//------VARIABLES------
let maxTimer = 30;
let timerInterval;
let countdown = maxTimer;
let boardSize = 15;
let totalPlayers = 0;
let currentPlayer = 'plr1';
let currentColor = 'red';
let currentLetter = 'S';
var boxval = [];
//------VARIABLES------

//Scan Total Players
for(let i=1;i<5;i++){
  const eachplr = document.querySelector('.plr'+i);
  if(eachplr){
    totalPlayers = totalPlayers + 1;
  }
}
if(totalPlayers==1){
  document.querySelector('.ai').setAttribute('class','plr2');
}
//Scan Total Players

function createBoard(){
  const board = document.querySelector('.boardCon');
  board.setAttribute('style','display:grid;grid-template-columns:repeat('+boardSize+',1fr);grid-template-rows:repeat('+boardSize+',1fr);');
  for(let i=1;i<(boardSize*boardSize)+1;i++){
    const newbutton = document.createElement('button');
    newbutton.setAttribute('id','B'+i);
    newbutton.setAttribute('onclick','boxClicked('+i+');')
    if(boardSize<=10){
      newbutton.setAttribute('class','f10');
    }else if(boardSize<=20){
      newbutton.setAttribute('class','f20');
    }else if(boardSize<=25){
      newbutton.setAttribute('class','f25');
    }else if(boardSize<=30){
      newbutton.setAttribute('class','f30');
    }else{
      newbutton.setAttribute('class','fabove');
    }
    board.append(newbutton);
  }
}
createBoard();


function Aicond(x,y,z,t){
  if(t==1){
    if(document.getElementById('B'+x).innerHTML==''&&
      document.getElementById('B'+y).innerHTML=='O'&&
      document.getElementById('B'+z).innerHTML=='S'&&
      (document.getElementById('B'+x).style.color==''||
      document.getElementById('B'+y).style.color==''||
      document.getElementById('B'+z).style.color==''))
    {return true;}else{return false;}
  }else if(t==2){
    if(document.getElementById('B'+x).innerHTML=='S'&&
      document.getElementById('B'+y).innerHTML==''&&
      document.getElementById('B'+z).innerHTML=='S'&&
      (document.getElementById('B'+x).style.color==''||
      document.getElementById('B'+y).style.color==''||
      document.getElementById('B'+z).style.color==''))
    {return true;}else{return false;}
  }else if(t==3){
    if(document.getElementById('B'+x).innerHTML=='S'&&
      document.getElementById('B'+y).innerHTML=='O'&&
      document.getElementById('B'+z).innerHTML==''&&
      (document.getElementById('B'+x).style.color==''||
      document.getElementById('B'+y).style.color==''||
      document.getElementById('B'+z).style.color==''))
    {return true;}else{return false;}
  }
}

let refresh = false;
let prevMove = 1;
function Aimove(x,y,z,t){
  if(!refresh){
    currentPlayer = 'plr1';
    currentColor = document.getElementById('p1clr').value;
    document.querySelector('.plr2').classList.remove('isnext');
    document.querySelector('.plr1').classList.add('isnext');
    document.querySelector('.timer').setAttribute('style','background: linear-gradient(to right,white,'+currentColor+','+currentColor+',white);');
    return;
  }
  if(t==1){
    document.getElementById('B'+x).innerHTML='S';
    document.getElementById('B'+x).style.color=currentColor;
    document.getElementById('B'+y).style.color=currentColor;
    document.getElementById('B'+z).style.color=currentColor;
    document.getElementById('B'+prevMove).style.border='';
    document.getElementById('B'+x).setAttribute('style','border:1px solid '+currentColor+';');
    document.getElementById('B'+x).style.color = currentColor;
    prevMove = x;
    boxval.push('B'+x);
    addScore();
    return true;
  }else if(t==2){
    document.getElementById('B'+y).innerHTML='O';
    document.getElementById('B'+x).style.color=currentColor;
    document.getElementById('B'+y).style.color=currentColor;
    document.getElementById('B'+z).style.color=currentColor;
    document.getElementById('B'+prevMove).style.border='';
    document.getElementById('B'+y).setAttribute('style','border:1px solid '+currentColor+';');
    document.getElementById('B'+y).style.color = currentColor;
    prevMove = y;
    boxval.push('B'+y);
    addScore();
    return true;
  }else if(t==3){
    document.getElementById('B'+z).innerHTML='S';
    document.getElementById('B'+x).style.color=currentColor;
    document.getElementById('B'+y).style.color=currentColor;
    document.getElementById('B'+z).style.color=currentColor;
    document.getElementById('B'+prevMove).style.border='';
    document.getElementById('B'+z).setAttribute('style','border:1px solid '+currentColor+';');
    document.getElementById('B'+z).style.color = currentColor;
    prevMove = z;
    boxval.push('B'+z);
    addScore();
    return true;
  }
}

async function Ai(){
  let found = false;
  for(let i=0;i<boardSize;i++){//Horizontal
    for(let j=1;j<boardSize-1;j++){
      const sc = (i*boardSize)+j;
      if(Aicond(sc,sc+1,sc+2,1)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found = Aimove(sc,sc+1,sc+2,1);}
      if(Aicond(sc,sc+1,sc+2,2)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found = Aimove(sc,sc+1,sc+2,2);}
      if(Aicond(sc,sc+1,sc+2,3)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found = Aimove(sc,sc+1,sc+2,3);}
    }
  }
  
  for(let  i=0;i<boardSize-2;i++){//Vertical
    for(let j=1;j<(boardSize-1)+2;j++){
      const sc = (i*boardSize)+j;
      if(Aicond(sc,sc+(1*boardSize),sc+(2*boardSize),1)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found = Aimove(sc,sc+(1*boardSize),sc+(2*boardSize),1);}
      if(Aicond(sc,sc+(1*boardSize),sc+(2*boardSize),2)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found = Aimove(sc,sc+(1*boardSize),sc+(2*boardSize),2);}
      if(Aicond(sc,sc+(1*boardSize),sc+(2*boardSize),3)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found = Aimove(sc,sc+(1*boardSize),sc+(2*boardSize),3);}
    }
  }
  
  for(let i=0;i<boardSize-2;i++){//Diagonal Right
    for(let j=1;j<boardSize-1;j++){
      const sc = (i*boardSize)+j;
      if(Aicond(sc,sc+(1*boardSize)+1,sc+(2*boardSize)+2,1)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found= Aimove(sc,sc+(1*boardSize)+1,sc+(2*boardSize)+2,1);}
      if(Aicond(sc,sc+(1*boardSize)+1,sc+(2*boardSize)+2,2)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found= Aimove(sc,sc+(1*boardSize)+1,sc+(2*boardSize)+2,2);}
      if(Aicond(sc,sc+(1*boardSize)+1,sc+(2*boardSize)+2,3)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found= Aimove(sc,sc+(1*boardSize)+1,sc+(2*boardSize)+2,3);}
    }
  }

  for(let i=0;i<boardSize-2;i++){//Diagonal Left
    for(let j=3;j<(boardSize-1)+2;j++){
      const sc = (i*boardSize)+j;
      if(Aicond(sc,sc+(boardSize-1),sc+(2*boardSize)-2,1)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found = Aimove(sc,sc+(boardSize-1),sc+(2*boardSize)-2,1);}
      if(Aicond(sc,sc+(boardSize-1),sc+(2*boardSize)-2,2)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found = Aimove(sc,sc+(boardSize-1),sc+(2*boardSize)-2,2);}
      if(Aicond(sc,sc+(boardSize-1),sc+(2*boardSize)-2,3)){
        await new Promise(resolve => setTimeout(resolve, 1000));
        found = Aimove(sc,sc+(boardSize-1),sc+(2*boardSize)-2,3);}
    }
  }

  if(found){
    countdown = maxTimer+1;
    Ai();
  }else{
    if(!refresh){return;}
    let randomLetter = Math.ceil(Math.random()*2);
    if(randomLetter==1){randomLetter = 'S';}else{randomLetter='O';}
    let randomBox = Math.ceil(Math.random()*(boardSize*boardSize));
    
    putOnEmptyBox();
    async function putOnEmptyBox(){
      for(let i=1;i<(boardSize*boardSize)+1;i++){
        if(randomBox==i&&document.getElementById('B'+i).innerHTML==''){
          await new Promise(resolve => setTimeout(resolve, 1000));
          document.getElementById('B'+i).innerHTML=randomLetter;
          boxval.push('B'+i);
          document.getElementById('B'+prevMove).style.border='';
          document.getElementById('B'+i).setAttribute('style','border:1px solid '+currentColor+';');
          prevMove = i;
          return;
        }else if(i==(boardSize*boardSize)){
          if(boxval.length==(boardSize*boardSize)){
            console.log('Board is Full');
            alert('Board is Full.');
            return;
          }
          console.log('Ai Picked Another Random Box');
          randomBox = Math.ceil(Math.random()*(boardSize*boardSize));
          putOnEmptyBox();
        }
      }
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    switchNextPlayer();
  }
}



function switchNextPlayer(){
  if(currentPlayer=='plr1'){
    currentPlayer = 'plr2';
    currentColor = document.getElementById('p2clr').value;
    document.querySelector('.plr1').classList.remove('isnext');
    document.querySelector('.plr2').classList.add('isnext');
    document.querySelector('.timer').setAttribute('style','background: linear-gradient(to right,white,'+currentColor+','+currentColor+',white);');
    if(totalPlayers==1){
      refresh = true;
      Ai();
    }
    return;
  }
  if(currentPlayer=='plr2'){
    if(totalPlayers<=2){
      currentPlayer = 'plr1';
      currentColor = document.getElementById('p1clr').value;
      document.querySelector('.plr2').classList.remove('isnext');
      document.querySelector('.plr1').classList.add('isnext');
      document.querySelector('.timer').setAttribute('style','background: linear-gradient(to right,white,'+currentColor+','+currentColor+',white);');
      return;
    }else{
      currentPlayer = 'plr3';
      currentColor = document.getElementById('p3clr').value;
      document.querySelector('.plr2').classList.remove('isnext');
      document.querySelector('.plr3').classList.add('isnext');
      document.querySelector('.timer').setAttribute('style','background: linear-gradient(to right,white,'+currentColor+','+currentColor+',white);');
      return;
    }
  }
  if(currentPlayer=='plr3'){
    if(totalPlayers==3){
      currentPlayer = 'plr1';
      currentColor = document.getElementById('p1clr').value;
      document.querySelector('.plr3').classList.remove('isnext');
      document.querySelector('.plr1').classList.add('isnext');
      document.querySelector('.timer').setAttribute('style','background: linear-gradient(to right,white,'+currentColor+','+currentColor+',white);');
      return;
    }else{
      currentPlayer = 'plr4';
      currentColor = document.getElementById('p4clr').value;
      document.querySelector('.plr3').classList.remove('isnext');
      document.querySelector('.plr4').classList.add('isnext');
      document.querySelector('.timer').setAttribute('style','background: linear-gradient(to right,white,'+currentColor+','+currentColor+',white);');
      return;
    }
  }
  if(currentPlayer=='plr4'){
    currentPlayer = 'plr1';
    currentColor = document.getElementById('p1clr').value;
    document.querySelector('.plr4').classList.remove('isnext');
    document.querySelector('.plr1').classList.add('isnext');
    document.querySelector('.timer').setAttribute('style','background: linear-gradient(to right,white,'+currentColor+','+currentColor+',white);');
    return;
  }
}


function addScore(){
  if(currentPlayer=='plr1'){
    document.getElementById('p1s').textContent = parseInt(document.getElementById('p1s').textContent) + 1;
  }
  if(currentPlayer=='plr2'){
    document.getElementById('p2s').textContent = parseInt(document.getElementById('p2s').textContent) + 1;
  }
  if(currentPlayer=='plr3'){
    document.getElementById('p3s').textContent = parseInt(document.getElementById('p3s').textContent) + 1;
  }
  if(currentPlayer=='plr4'){
    document.getElementById('p4s').textContent = parseInt(document.getElementById('p4s').textContent) + 1;
  }
}


function foundSos(){
  let found = false;
  for(let i=0;i<boardSize;i++){//Horizontal
    for(let j=1;j<boardSize-1;j++){
      const sc = (i*boardSize)+j;
      if(document.getElementById('B'+sc).innerHTML=='S'&&
         document.getElementById('B'+(sc+1)).innerHTML=='O'&&
         document.getElementById('B'+(sc+2)).innerHTML=='S'&&
         (document.getElementById('B'+sc).style.color==''||
         document.getElementById('B'+(sc+1)).style.color==''||
         document.getElementById('B'+(sc+2)).style.color=='')){
        document.getElementById('B'+sc).style.color=currentColor;
        document.getElementById('B'+(sc+1)).style.color=currentColor;
        document.getElementById('B'+(sc+2)).style.color=currentColor;
        addScore();
        found = true;
      }
    }
  }
  for(let  i=0;i<boardSize-2;i++){//Vertical
    for(let j=1;j<(boardSize-1)+2;j++){
      const sc = (i*boardSize)+j;
      if(document.getElementById('B'+sc).innerHTML=='S'&&
         document.getElementById('B'+(sc+(1*boardSize))).innerHTML=='O'&&
         document.getElementById('B'+(sc+(2*boardSize))).innerHTML=='S'&&
         (document.getElementById('B'+sc).style.color==''||
         document.getElementById('B'+(sc+(1*boardSize))).style.color==''||
         document.getElementById('B'+(sc+(2*boardSize))).style.color=='')){
        document.getElementById('B'+sc).style.color=currentColor;
        document.getElementById('B'+(sc+(1*boardSize))).style.color=currentColor;
        document.getElementById('B'+(sc+(2*boardSize))).style.color=currentColor;
        addScore();
        found = true;
      }
    }
  }
  for(let i=0;i<boardSize-2;i++){//Diagonal Right
    for(let j=1;j<boardSize-1;j++){
      const sc = (i*boardSize)+j;
      if(document.getElementById('B'+sc).innerHTML=='S'&&
         document.getElementById('B'+(sc+(1*boardSize)+1)).innerHTML=='O'&&
         document.getElementById('B'+(sc+(2*boardSize)+2)).innerHTML=='S'&&
         (document.getElementById('B'+sc).style.color==''||
         document.getElementById('B'+(sc+(1*boardSize)+1)).style.color==''||
         document.getElementById('B'+(sc+(2*boardSize)+2)).style.color=='')){
        document.getElementById('B'+sc).style.color=currentColor;
        document.getElementById('B'+(sc+(1*boardSize)+1)).style.color=currentColor;
        document.getElementById('B'+(sc+(2*boardSize)+2)).style.color=currentColor;
        addScore();
        found = true;
      }
    }
  }
  for(let i=0;i<boardSize-2;i++){//Diagonal Left
    for(let j=3;j<(boardSize-1)+2;j++){
      const sc = (i*boardSize)+j;
      if(document.getElementById('B'+sc).innerHTML=='S'&&
         document.getElementById('B'+(sc+(boardSize-1))).innerHTML=='O'&&
         document.getElementById('B'+(sc+(2*boardSize)-2)).innerHTML=='S'&&
         (document.getElementById('B'+sc).style.color==''||
         document.getElementById('B'+(sc+(boardSize-1))).style.color==''||
         document.getElementById('B'+(sc+(2*boardSize)-2)).style.color=='')){
        document.getElementById('B'+sc).style.color=currentColor;
        document.getElementById('B'+(sc+(boardSize-1))).style.color=currentColor;
        document.getElementById('B'+(sc+(2*boardSize)-2)).style.color=currentColor;
        addScore();
        found = true;
      }
    }
  }
  
  if(found){return true;}
}


//----Timer
function updateCountdown() {
    if (countdown <= 0) {
      clearInterval(timerInterval);
      if(totalPlayers!=1||currentPlayer=='plr1'){
        switchNextPlayer();
      }
      countdown = maxTimer+1;
      timerInterval = setInterval(updateCountdown, 1500);
    } else {
      countdown--;
      document.querySelector('.timer').innerHTML = countdown;
    }
}
//----Timer

let firstTime = true;
function boxClicked(box){
  if(totalPlayers==1&&currentPlayer=='plr2'){return;}
  if(document.getElementById('B'+box).textContent===''){
    document.getElementById('B'+box).innerHTML = currentLetter;
    boxval.push('B'+box);

    document.getElementById('B'+prevMove).style.border='';
    document.getElementById('B'+box).setAttribute('style','border:1px solid '+currentColor+';');
    prevMove = box;

    if(!foundSos()){
      switchNextPlayer();
    }
  }
  countdown = maxTimer+1;
  if(firstTime==true){
    timerInterval = setInterval(updateCountdown, 1500);
    firstTime = false;
  }
}

function switchLetter(letter){
  currentLetter = letter;
  if(letter=='S'){
    document.getElementById('bs').setAttribute('style','background-color: yellow;');
    document.getElementById('bo').removeAttribute('style');
  }else{
    document.getElementById('bo').setAttribute('style','background-color: yellow;');
    document.getElementById('bs').removeAttribute('style');
  }
}

function saveSetting(){

  refresh = false;

  const timev = document.getElementById('timev');
  maxTimer = parseInt(timev.value);
  clearInterval(timerInterval);
  countdown = maxTimer;
  firstTime = true;
  document.querySelector('.timer').innerHTML = maxTimer;

  boxval = [];

  const bsv = document.getElementById('bsv');
  boardSize = bsv.value;
  document.querySelector('.boardCon').innerHTML = '';
  createBoard();
  
  document.querySelector('.plr1').style.backgroundColor = document.getElementById('p1clr').value;
  document.querySelector('.plr2').style.backgroundColor = document.getElementById('p2clr').value;
  document.getElementById('p1s').innerHTML = 0;
  document.getElementById('p2s').innerHTML = 0;

  if(document.querySelector('.plr3')){
    document.querySelector('.plr3').style.backgroundColor = document.getElementById('p3clr').value;
    document.getElementById('p3s').innerHTML = 0;
  }

  if(document.querySelector('.plr4')){
    document.querySelector('.plr4').style.backgroundColor = document.getElementById('p4clr').value;
    document.getElementById('p4s').innerHTML = 0;
  }

}