import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

const firebaseConfig =
{
  apiKey: "AIzaSyDICcooHUciQZvAs_dPpExVxqBhtJMojbY",
  authDomain: "codelab-database-1.firebaseapp.com",
  databaseURL: "https://codelab-database-1-default-rtdb.firebaseio.com",
  projectId: "codelab-database-1",
  storageBucket: "codelab-database-1.appspot.com",
  messagingSenderId: "573387563239",
  appId: "1:573387563239:web:161f23412c218ba50ac242",
  measurementId: "G-4XTVC35JQL"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef  = ref(database, 'Messages/');

var messageContainer;
var messageForm;
var messageInput;
var name;

document.addEventListener('DOMContentLoaded', (event) => {

  messageContainer = document.getElementById('message-container');
  messageForm = document.getElementById('send-container');
  messageInput = document.getElementById('message-input');

  name = prompt('What is your name?');

  messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    const style = 'float: right;';

    displayMessage(`You: ${message}`, style);

    set(dataRef, {userMess: message, userName: name});
    messageInput.value = '';
  })

    onValue(dataRef, displayReceiverMessage);

})


function displayMessage(message, style) 
{
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.style = style;
  messageContainer.append(messageElement);
}

function displayReceiverMessage(messageObj)
{
    const style = 'float: left;';
    if (messageObj.val().userName != name)
      displayMessage(`${messageObj.val().userName}: ${messageObj.val().userMess}`, style);
}

