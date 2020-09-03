var bodyDiv = document.createElement('div');
bodyDiv.setAttribute('id','bodyDiv');
document.body.appendChild(bodyDiv);

var typeDiv = document.createElement('div');
typeDiv.setAttribute('id','bg-modal');

var type_select = document.createElement('div');
type_select.setAttribute('id','bg-content');

typeDiv.appendChild(type_select);
document.body.appendChild(typeDiv);


var easy = document.createElement('button');
easy.setAttribute('class','type');
easy.setAttribute('id','easy');
easy.setAttribute('onclick','easyGame()');
easy.innerHTML = 'Easy';

var medium = document.createElement('button');
medium.setAttribute('class','type');
medium.setAttribute('id','medium');
medium.setAttribute('onclick','mediumGame()');
medium.innerHTML = 'Medium';

var hard = document.createElement('button');
hard.setAttribute('class','type');
hard.setAttribute('id','hard');
hard.setAttribute('onclick','hardGame()');
hard.innerHTML = 'Hard';

type_select.appendChild(easy);
type_select.appendChild(document.createElement('br'));
type_select.appendChild(medium);
type_select.appendChild(document.createElement('br'));
type_select.appendChild(hard);
//-----------------------------------------------------------------------Creating Header container start--------------------------------------------------------------------------------
var container = document.createElement('div');
container.setAttribute('class','container');
var gameName = document.createElement('h1');
//gameName.innerHTML = 'HANGMAN';
container.appendChild(gameName);
var gameDescription = document.createElement('p');
gameDescription.innerHTML = `Click on Alphabets to guess the word and save the man from hanging..!`
container.appendChild(gameDescription);

bodyDiv.appendChild(container);

//-----------------------------------------------------------------------Creating Header container Done.--------------------------------------------------------------------------------


//-----------------------------------------------------------------------Creating Field for valid chosen letters-------------------------------------------------------------------------

var field = document.createElement('div');
var category = document.createElement('h2');
category.setAttribute('id','categoryDisplay');
var scoreCard = document.createElement('h1');
scoreCard.innerHTML = 'Score:'
scoreCard.setAttribute('id','scorecard');
scoreCard.setAttribute('style','float:left !important; margin-right: 100px');
field.appendChild(scoreCard);
field.appendChild(category);
field.setAttribute('id','field');

bodyDiv.appendChild(field);

//-----------------------------------------------------------------------Creating Field for valid chosen letters Done.-------------------------------------------------------------------------
var categoryDiv = document.createElement('div');


//-----------------------------------------------------------------------Creating Canvas for Hanging the Man :( -------------------------------------------------------------------------
//var canvasArea = document.createElement('div');
var canvas = document.createElement('canvas');
canvas.setAttribute('id','hangHere');

bodyDiv.appendChild(canvas);


//-----------------------------------------------------------------------Creating Canvas for Hanging the Man Done :( -------------------------------------------------------------------------


var lifeDiv = document.createElement('div');
lifeDiv.setAttribute('class','lifeDiv');
var lifeDisplay = document.createElement('p');
var hintDisplay = document.createElement('h3');
hintDisplay.setAttribute('id','hintDisplay');
lifeDiv.appendChild(lifeDisplay);
lifeDiv.appendChild(hintDisplay);

bodyDiv.appendChild(lifeDiv);






var guess;  //This will store the guessed alphabet
var categoryChosen; //Category of the displayed word will be here.
var wordtoDisaply; //Word to be displayed for guessing.
var alphabetHolder; //This layout holds alphabets
var alphaButton; //Alphabet Buttons
var lives;  //Chances for a wrong guess are stored here.
var counter; //This keeps track of the valid guesses.
var space;  // Number of Spaces in the displayed word.. that are replaced by '-'
var guessedArray = []; // This array will store the guesses made by the player.
var canvasStart;
var categoryIndex;
var score = 0;
var man;
var context;
var draw;
var drawArray = [];
//-----------------------------------------------------------------------Creating Alphabets holder. -------------------------------------------------------------------------------------------
var alphabetsArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    alphabetHolder = document.createElement('div');
    alphabetHolder.setAttribute('id','alphabetHolder');
    alphabetHolder.setAttribute('style','display:inline-block;')
function buttonLayout(){      
    for(let index = 0 ; index < alphabetsArray.length ; index++)
    {
        alphaButton = document.createElement('button');
        alphaButton.setAttribute('class','alphabetButton');
        alphaButton.setAttribute('value',`${alphabetsArray[index]}`);
        alphaButton.innerHTML = `${alphabetsArray[index]}`;
        clicked();
        alphabetHolder.appendChild(alphaButton);  //

    }

} 
bodyDiv.appendChild(alphabetHolder);

//-----------------------------------------------------------------------Creating Alphabets holder Done.---------------------------------------------------------------------------------------

var hintAndPlayAgain = document.createElement('div');
hintAndPlayAgain.setAttribute('class','hintAndPlayAgain');
var hintButton = document.createElement('button');
hintButton.setAttribute('id','hint');
hintButton.innerHTML = 'Hint';
hintButton.setAttribute('onclick','hint()');
var playAgain = document.createElement('button');
playAgain.setAttribute('id','playagain');
playAgain.innerHTML = 'Play Again';
playAgain.setAttribute('onclick','location.reload()');

hintAndPlayAgain.appendChild(hintButton);
hintAndPlayAgain.appendChild(playAgain);

bodyDiv.appendChild(hintAndPlayAgain);





function clicked(){
    alphaButton.onclick = function(){
        var guess = this.innerHTML;
        this.setAttribute('id','selected');
        this.onclick = null;
        if(wordtoDisaply.includes(guess))
        {
            score+= 100;
        }
        else
        {
            score-= 100;
        }
        
    for(let index = 0 ; index < wordtoDisaply.length ; index++)
        {
         if(wordtoDisaply[index] === guess)
            {
                guessedArray[index].innerHTML = guess ;
                counter+= 1; 
                
            }
        }
        var existance = (wordtoDisaply.indexOf(guess))
        if(existance === -1)
        {
            lives = lives - 1;
            comentary();
            show();
        }
        else{
            comentary();
        }
        document.getElementById('scorecard').innerHTML = `Score: ${score}`;
    }
} 

function comentary()
{
    lifeDisplay.innerHTML = `You have ${lives} lives..!`;
    if(lives < 1)
    {
        document.getElementById('alphabetHolder').style.display = 'none';
        lifeDisplay.innerHTML = `oops..!! Game Over. You Could not save him.`
        lifeDisplay.innerHTML = `<p>You missed it.. <h1>${wordtoDisaply}</h1> Better Luck Next time </p>`

    }
    for(let index = 0 ; index < guessedArray.length ; index++)
    {
        if(wordtoDisaply.includes('-'))
        {
            if(counter + space === guessedArray.length)
            {
                congratulate(); 
                lifeDisplay.innerHTML = `Congratulation.. You saved the man.`;
            
            }
        }
        else if(counter  === guessedArray.length)
        {
            congratulate(); 
                lifeDisplay.innerHTML = `Congratulation.. You saved the man.`;
        }
        
    }
    if(score === (100 * wordtoDisaply.length))
    {
        alert('Awesome..!! You are on a STREAK..!.');
    }
}

function showField(){
    var wordField = document.getElementById('field');
    var valid = document.createElement('ul');
    valid.setAttribute('id','validLetter');
    for(let index = 0 ; index < wordtoDisaply.length ; index++)
    {
        guess = document.createElement('li');
       guess.setAttribute('class','guessPlace');
        if(wordtoDisaply[index] === '-')
        {
            guess.innerHTML = '-';
            space = 1;
        }
        else{
            guess.innerHTML = '_';
        }
        guessedArray.push(guess);
        wordField.appendChild(valid);
        valid.appendChild(guess);
    }
}



function congratulate(){
    
    document.body.style.backgroundImage = `url(giphy.gif)` ;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.color = 'black';
    document.getElementById('hangHere').style.display = 'none';
}

var wordList = [ 
    ['atom','electron','isotope','neutron','plasma','radiation','wavelength','black-hole','corona','galaxy'],
    ['zebra','monkey','alligator','seal','bear','elephant','giraffe'],
    ['goad','defile','levity','astrology','parry','lament'],
    ['object-oriented','algorithm','argument','array','assignment','bug','compiler','function','syntax'] 
];

function selectCategory(){
    if(categoryChosen === wordList[0])
    {
        document.getElementById('categoryDisplay').innerHTML = 'Chosen Category is Space Tech and Science';
    }
    else if(categoryChosen === wordList[1])
    {
        document.getElementById('categoryDisplay').innerHTML = 'Chosen Category is Animals';
    }
    else if(categoryChosen === wordList[2])
    {
        document.getElementById('categoryDisplay').innerHTML = 'Chosen Category is English Vocabulory';
    }
    else
    {
        document.getElementById('categoryDisplay').innerHTML = 'World of Programming';
    }
}



function startGame(){
                 
    categoryChosen = wordList[Math.floor(Math.random() * wordList.length)];
    wordtoDisaply = categoryChosen[Math.floor(Math.random() * categoryChosen.length)];
    wordtoDisaply = wordtoDisaply.replace(/\s/g,'-');
    guessedArray = [];
   // lives = 6;
    counter = 0;
    buttonLayout();
    
    showField();
    comentary();
    selectCategory();
    canvasStart();
    
    
}






function hint(){
    var hint = [['the smallest component of an element','an elementary particle with negative charge',
	      'atom with same atomic number, different number of neutrons','a subatomic particle with zero charge',
	      'a fourth state of matter distinct from solid, liquid or gas','energy transmitted in the form of rays or waves or particles',
	      'distance between successive crests of a periodic disturbance','a region of space resulting from the collapse of a star',
	      'the outermost region of the sun\'s atmosphere','a collection of star systems'],
	      ['Black and White Striped Animal like a Horse','A small animal with a long tail, The primate',
	      'Large reptile with a wide snout, Sharp teeth','Flippered mammal living on the land and in the sea',
	      'A Large, strong wild mammal with a sheggy fur','A Large land mammal with tusks and a trunk','large tall animal with a very long neck'],
	      ['Antonym of discourage','To make something less pure or good','Antonym of Gravity','a mystical art that tries to predict future','synonym of block','synonym of grieve'],
	      ['designed using objects','a step-by-step procedure to achieve a specific goal','a value that is passed into a function when it is called',' a type of value that contains a sequence of other values','the act of putting a value into a variable',' a mistake in a program',
          ' a program that converts code into an executable, and checks that the syntax is correct','a piece of code that is not run until it is called','the grammatical rules of a programming language']];
          
           categoryIndex = wordList.indexOf(categoryChosen);
        var hintIndex = categoryChosen.indexOf(wordtoDisaply);
        document.getElementById('hintDisplay').innerHTML = `HINT : - ${hint[categoryIndex][hintIndex]}` ;        
}



var show = function(){
    var drawHim = lives;
    drawList[drawHim]();
}

function canvasStart(){
    man = document.getElementById('hangHere');
    context = man.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#000';
    context.lineWidth = 3;
}

var head = function(){
    man = document.getElementById('hangHere');
    context = man.getContext('2d');
    context.beginPath();
    context.arc(70, 37, 10, 0, Math.PI*2, true);
    context.stroke();
}

draw = function(fromX,fromY,toX,toY)
{
    context.moveTo(fromX,fromY);
    context.lineTo(toX,toY);
    context.stroke();

}

//-----------------------------------------------------------------------Creating Header container start--------------------------------------------------------------------------------


var base = function(){
    draw(10,140,150,140);
}

var pole = function(){
    draw(10,10,10,140);
}

var roof = function(){
    draw(10,15,70,15);
}

var hanger = function(){
    draw(70,30,70,15)
}

var hisBody = function(){
    draw(70,48,70,80)
}

var rightHand = function(){
    draw(70,48,100,53);
}

var leftHand = function(){
    draw(70,48,40,53);
}

var rightLeg = function(){
    draw(70,80,100,100);
}

var leftLeg = function(){
    draw(70,80,40,100);
}

drawList = [leftLeg,rightLeg,leftHand,rightHand,head,hisBody,hanger,roof,pole,base];


/*
var base = draw(10,140,150,140);
var pole = draw(10,10,10,140)
var roof = draw(10,15,70,15)
var hanger = draw(70,30,70,15)
document.getElementById('hangHere').append(base);
*/


var easyGame = function(){
    document.getElementById('bg-modal').style.visibility = 'hidden';
    document.getElementById('bodyDiv').style.visibility = 'visible';
    lives = 10;
    startGame();
}

var mediumGame = function(){
    document.getElementById('bg-modal').style.visibility = 'hidden';
    document.getElementById('bodyDiv').style.visibility = 'visible';
    lives = 6;
    man = document.getElementById('hangHere');
    context = man.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#000';
    context.lineWidth = 3;
    context.moveTo(10,140);
    context.lineTo(150,140);
    context.stroke();
    context.moveTo(10,10);
    context.lineTo(10,140);
    context.stroke();
    context.moveTo(10,15);
    context.lineTo(70,15);
    context.stroke();
    context.moveTo(70,30);
    context.lineTo(70,15);
    context.stroke();
    startGame();
}

var hardGame = function(){
    document.getElementById('bg-modal').style.visibility = 'hidden';
    document.getElementById('bodyDiv').style.visibility = 'visible';
    lives = 3;
    counter = 0;
    man = document.getElementById('hangHere');
    context = man.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#000';
    context.lineWidth = 3;
    context.moveTo(10,140);
    context.lineTo(150,140);
    context.stroke();
    context.moveTo(10,10);
    context.lineTo(10,140);
    context.stroke();
    context.moveTo(10,15);
    context.lineTo(70,15);
    context.stroke();
    context.moveTo(70,30);
    context.lineTo(70,15);
    context.stroke();

    categoryChosen = wordList[Math.floor(Math.random() * wordList.length)];
    wordtoDisaply = categoryChosen[Math.floor(Math.random() * categoryChosen.length)];
    wordtoDisaply = wordtoDisaply.replace(/\s/g,'-');
    guessedArray = [];
      
        for(let index = 0 ; index < alphabetsArray.length ; index++)
        {
            alphaButton = document.createElement('button');
            alphaButton.setAttribute('class','alphabetButton');
            alphaButton.setAttribute('value',`${alphabetsArray[index]}`);
            alphaButton.innerHTML = `${alphabetsArray[index]}`;
            clicked();
            alphabetHolder.appendChild(alphaButton);  //
    
        }

    function clicked(){
    alphaButton.onclick = function(){
        console.log(counter);
        var guess = this.innerHTML;
        this.setAttribute('id','selected');
        this.onclick = null;
        if(wordtoDisaply.includes(guess))
        {
            score+= 100;
        }
        else
        {
            score-= 100;
        }
        
    for(let index = 0 ; index < wordtoDisaply.length ; index++)
        {
         if(wordtoDisaply[index] === guess)
            {
                guessedArray[index].innerHTML = guess ;
                counter += 1; 
                
            }
        }
        var existance = (wordtoDisaply.indexOf(guess))
        if(existance === -1)
        {
            lives = lives - 1;
            comentary();
            var drawHim = 2*lives + 1;
            drawList[drawHim]();
            drawHim--
            drawList[drawHim]();
        }
        else{
            comentary();
        }
        document.getElementById('scorecard').innerHTML = `Score: ${score}`;
    }
} 

function comentary()
{
    if(lives > 1)
    {
        lifeDisplay.innerHTML = `You have ${lives} lives..!`;
    }
    else
    {
        lifeDisplay.innerHTML = `You have ${lives} life..!`;
    }
   
    if(lives < 1)
    {
        document.getElementById('alphabetHolder').style.display = 'none';
        lifeDisplay.innerHTML = `oops..!! Game Over. You Could not save him.`
        lifeDisplay.innerHTML = `<p>You missed it.. <h1>${wordtoDisaply}</h1> Better Luck Next time </p>`

    }
    for(let index = 0 ; index < guessedArray.length ; index++)
    {
        if(wordtoDisaply.includes('-'))
        {
            if(counter + space === guessedArray.length)
            {
                document.body.style.backgroundImage = `url(giphy.gif)` ;
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundSize = 'cover';
                document.body.style.color = 'black';
                document.getElementById('hangHere').style.display = 'none';
                lifeDisplay.innerHTML = `Congratulation.. You saved the man.`;
            
            }
        }
        else if(counter  === guessedArray.length)
        {
            document.body.style.backgroundImage = `url(giphy.gif)` ;
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.color = 'black';
            document.getElementById('hangHere').style.display = 'none';
            lifeDisplay.innerHTML = `Congratulation.. You saved the man.`;
        }
        
    }
    if(score === (100 * wordtoDisaply.length))
    {
        alert('Awesome..!! You are on a STREAK..!.');
    }
}

    showField();
    comentary();
    selectCategory();
    canvasStart();

}


