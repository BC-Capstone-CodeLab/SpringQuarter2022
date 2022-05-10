import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

//import { initializeApp } from "firebase/app";
//import { getDatabase, ref, set, onValue, update } from "firebase/database";

const firebaseConfig = {//Personal Firebase
    apiKey: "AIzaSyD3M9j2pGKraAnDOHOx0JdZOvblyj-84x4",
    authDomain: "capstone-ide.firebaseapp.com",
    databaseURL: "https://capstone-ide-default-rtdb.firebaseio.com",
    projectId: "capstone-ide",
    storageBucket: "capstone-ide.appspot.com",
    messagingSenderId: "402917015039",
    appId: "1:402917015039:web:98a9c4b13ea95de44fbbca",
    measurementId: "G-Z3ECK6ZW3K"
  };

// Initialize Firebase editor
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef  = ref(database, 'User2/');
const dataRef2  = ref(database, 'User1/');
const JsCodeArea = document.getElementById("MyIDE");

// Create ACE editor
const aceEditor = ace.edit("MyIDE"); 
aceEditor.setTheme("ace/theme/idle_fingers");
aceEditor.getSession();

// Create ACE editor 2  
const aceEditor2 = ace.edit("HostIDE"); 
aceEditor2.setTheme("ace/theme/idle_fingers");
aceEditor.getSession();
aceEditor2.session.setMode("ace/mode/c_cpp");
document.getElementById("HostIDE");


           

var languageCode = 'cpp';
//Change Language select section
window.changeLanguage = function changeLanguage(){
  let language = $("#languages").val();
  if(language == 'c++' ){
    aceEditor.session.setMode("ace/mode/c_cpp");
    languageCode = 'cpp';
  } else if(language == 'java' ){
    aceEditor.session.setMode("ace/mode/java");
    languageCode = 'java';
  } else if(language == 'python' ){
    aceEditor.session.setMode("ace/mode/python");
    languageCode = 'python3';
  } else if(language == 'node' ){
    aceEditor.session.setMode("ace/mode/javascript");
    languageCode = 'nodejs';
  }
};


//function getter from firbase and setter into ace editor
function updateEditor(data)
	{
    var cursorPosition = aceEditor.getCursorPosition();
    var txtarea = data.val().codeEditor;
    var compileArea = data.val().codeCompiler;
  
    //console.log("txtarea = "+txtarea);
    aceEditor.getSession().setValue(txtarea, 1); //set value in ace editor
    aceEditor.moveCursorToPosition(cursorPosition);

    document.getElementById("output").innerHTML = compileArea;
	}


  //function getter from firbase and setter into ace editor
function updateEditor2(data)
{
  var cursorPosition = aceEditor2.getCursorPosition();
  var txtarea = data.val().codeEditor;
  var compileArea = data.val().codeCompiler;

  //console.log("txtarea = "+txtarea);
  aceEditor2.getSession().setValue(txtarea, 1); //set value in ace editor
  aceEditor2.moveCursorToPosition(cursorPosition);

  //document.getElementById("output2").innerHTML = compileArea;
}


//function getter from ace editor and setter into firebase
function listenSetFirebase(event) 
{ 
  console.log("check event.key: "+event.key);
  var CodeArea=aceEditor.getSession().getValue();
  console.log("Listener = "+CodeArea);
  var jsedit = 
  {
    codeEditor : CodeArea
  };
  update(dataRef, jsedit);
}


//----Main-----
changeLanguage();
onValue(dataRef, updateEditor); //update editor from firebase
onValue(dataRef2, updateEditor2);
JsCodeArea.addEventListener('keyup', listenSetFirebase); //set firebase from key event



// helper function used for displayOut where it clears message input from input box after a message is sent
function eraseText() 
{
    document.getElementById("SendChat").value = "";
}

// function is used to print content of message from input box to chat box
window.displayOut = function displayOut() 
{
    var input = document.getElementById("SendChat").value;
    if (input == null || input.trim() === '') 
    {
        alert("Please enter a valid input");
        document.getElementById("SendChat").value = "";
        return;
    }
    var text2 = document.getElementById("SessionChat");
    text2.value = text2.value +"\n\n" + input;

    eraseText();
}

// function is used to pop up a new window that will be used as a terminal to show output of code in ide when running it
window.OpenNewWindow = function OpenNewWindow()  
{  
  var CodeArea=aceEditor.getSession().getValue();
  //console.log("Output =" +CodeArea);
  var triggerData = 
  {
    codeLanguage : languageCode,
    codeTrigger : languageCode+CodeArea
  };
  update(dataRef, triggerData);
  document.getElementById("output").innerHTML = "compiling........";

  /*
  var terminalWindow = window.open(undefined, 'about', 'width=800,height=400,scrollbars=yes');  
    
    for (let i = 0; i < 100; i++) 
    {
        terminalWindow.document.write("Hello World ");
        terminalWindow.document.write('<br>');
        
    }

    var name = terminalWindow.prompt("Enter something: ")
    terminalWindow.document.write(name);
    */
}
