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
  var html, newHtml, className;

  if (inputObject.person === 'me'){
    if (inputObject.last.includes('him')){
      className = 'single'
    }
    if (inputObject.last === 'me single'){
      className = 'mend'
      //singleTostart
    }
    if (inputObject.last === 'me mmiddle'){
      className = 'mend'
    }
    if (inputObject.last === 'me mend'){
      className = 'mend'
      //mendTomid
    }
    if (inputObject.last === 'null'){
      className = 'single';
    }
  }
  else if (inputObject.person === 'him'){
    if (inputObject.last.includes('me')){
      className = 'single'
    }
    if (inputObject.last === 'him single'){
      className = 'hend'
      //singleTostart
    }
    if (inputObject.last === 'him hmiddle'){
      className = 'hend'
    }
    if (inputObject.last === 'him hend'){
      className = 'hend'
      //mendTomid
    }
    if (inputObject.last === 'null') {
      className = 'single';
    }
  }
  



  html = `<span class='%who% ${className}'>%message%</span>`

  // replace place holder text with stuff code
  newHtml = html.replace('%who%', inputObject.person);
  newHtml = newHtml.replace('%message%', inputObject.message);
  //Manipulate DOM
  document.querySelector(DOMstring.lastMessage).insertAdjacentHTML('beforeend', newHtml)


  if (className === 'mmiddle'){
    singleToStart();
  }

  if (className === 'mend'){
    endToMiddle();
    singleToStart();
  }

  if (className === 'hmiddle'){
    singleToStartx();
  }

  if (className === 'hend'){
    endToMiddlex();
    singleToStartx();
  }
}

var singleToStart = () => {
  document.querySelector(DOMstring.lastMessage).lastElementChild.previousElementSibling.classList.remove('single')

  document.querySelector(DOMstring.lastMessage).lastElementChild.previousElementSibling.classList.add('mstart')

}
var endToMiddle = () => {
  if (document.querySelector(DOMstring.lastMessage).lastElementChild.previousElementSibling.classList[1] === 'mend'){
  document.querySelector(DOMstring.lastMessage).lastElementChild.previousElementSibling.classList.remove('mend')
  document.querySelector(DOMstring.lastMessage).lastElementChild.previousElementSibling.classList.add('mmiddle')
  }
}

var singleToStartx = () => {
  document.querySelector(DOMstring.lastMessage).lastElementChild.previousElementSibling.classList.remove('single')
  document.querySelector(DOMstring.lastMessage).lastElementChild.previousElementSibling.classList.add('hstart')

}
var endToMiddlex = () => {
  if (document.querySelector(DOMstring.lastMessage).lastElementChild.previousElementSibling.classList[1] === 'hend'){
  document.querySelector(DOMstring.lastMessage).lastElementChild.previousElementSibling.classList.remove('hend')
  document.querySelector(DOMstring.lastMessage).lastElementChild.previousElementSibling.classList.add('hmiddle')
  }
}
