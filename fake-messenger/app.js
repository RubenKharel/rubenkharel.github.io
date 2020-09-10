//classes variables
var DOMstring = {
  whoDid: '.add__type',
  whatMessage: '.message',
  lastMessage: '#msg',

  h : '.him',
  hstart : '.hstart',
  hmiddle : '.hmiddle',
  hend : '.hend',

  me : '.me',
  mstart : '.mstart',
  mmiddle : '.mmiddle',
  mend : '.mend'
}
var person, message;

var getInput = function(){
person = document.querySelector(DOMstring.whoDid);
message = document.querySelector(DOMstring.whatMessage);
last = document.querySelector(DOMstring.lastMessage);
if (person != null && message != null){
    if (message.value !== ''){
    return {
      person : person.value,
      message : message.value,
      last : last.lastElementChild.classList.value
    }
  }
  else {
    return {
      person : person.value,
      message : ':/'
    }
}
}
}


//eventlistener
document.addEventListener('keypress', function(event){

  if (event.keyCode === 13 || event.which === 13){
    SendMessage(getInput());
  }
});



let SendMessage = (inputObject) => {
  var html, newHtml, lastHalf, firstHalf;

  if (inputObject.person === 'him'){
    className = 'him single'
  }
  else if (inputObject.person === 'me'){
    className = 'me single'
  }
  firstHalf = `<div class="%?%"><span class='${className}'>`
  lastHalf = '%message%</span></div>'
  html = firstHalf+lastHalf;
  // replace place holder text with stuff code
  newHtml = html.replace('%who%', inputObject.person);
  newHtml = newHtml.replace('%message%', inputObject.message);
  //Manipulate DOM
  document.querySelector(DOMstring.lastMessage).insertAdjacentHTML('beforeend', newHtml)
}
