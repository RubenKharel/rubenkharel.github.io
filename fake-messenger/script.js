//Declearing variables of classes to easily access when required and effencesy.
//Extracting the data given in the inputfield.
//All the data are stored in this function
let theData = () => {

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

  //getting the input from user
  let getInput = () => {
    let person = document.querySelector(DOMstring.whoDid);
    let message = document.querySelector(DOMstring.whatMessage);
    //The upper sibling message's class to help modify the chat bubble after each new message send.
    let last = document.querySelector(DOMstring.lastMessage);

    if ((person != null && message != null) && (message.value !== '')){
      return {
        person : person.value,
        message : message.value,
        last : last.lastElementChild.classList.value
      }
    }
    //if no message is given send :/ ...... ;)
    else {
      alert('NO EMPTY MESSAGES please!')
      return {
        person: person.value,
        message : ':/',
        //not added last for intentional error xD
      }
    }
    console.log("nothing")
  }
  return{
    DOMstring : DOMstring,
    messageInput : getInput()
  }
}

//DOM Manipulation
let dataManipuation = (data) => {
  var inputObject = data.messageInput
  var DOMstring = data.DOMstring


  var classfinder = (function(inputObject){
    let className;

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
    return className;
  })(inputObject)

  let domModifier = (className, inputObject, DOMstring) => {
    let html, newHtml;

    html = `<span class='%who% ${className}'>%message%</span>`

    // replace place holder text with stuff code
    newHtml = html.replace('%who%', inputObject.person);
    newHtml = newHtml.replace('%message%', inputObject.message);
    //Manipulate DOM
    document.querySelector(DOMstring.lastMessage).insertAdjacentHTML('beforeend', newHtml)
  }

  let redesigner = (className) => {
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

  //clear text field after message send.
  (clearTextField = () => {
    document.querySelector('.message').value = '';
  })();

  return{
    modify: domModifier(classfinder, inputObject, DOMstring),
    redesign : redesigner(classfinder)

  }
}



//Main execution?

//adding event listener
document.addEventListener('keypress', function(event){
  //added .keycode for incompatible device support
  if (event.keyCode === 13 || event.which === 13 || event.key === 'Enter'){
    //execute everything here here
    dataManipuation(theData())
    //clear text field after data is being manipulated
  }
})
