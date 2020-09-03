var buttonDiv = document.createElement('div');
var anchor = document.createElement('a');
buttonDiv.appendChild(anchor);
anchor.setAttribute('href','hangman.html')
var play = document.createElement('button');
play.setAttribute('id','button');
play.innerHTML = 'Let\'s Play'
anchor.appendChild(play);

var info = document.createElement('h1');
info.innerHTML = 'Click on Button to start the Game.'
document.body.appendChild(info);

document.body.appendChild(buttonDiv);
