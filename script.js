let typingMode = 'character'; // Default mode

function toggleMode() {
let modeSwitch = document.getElementById('mode_switch');
let modeStatus = document.getElementById('mode_status');
if (modeSwitch.checked) {
typingMode = 'word';
modeStatus.textContent = 'Type Words';
} else {
typingMode = 'character';
modeStatus.textContent = 'Type Characters';
}
resetValues();
}

// Modify the processCurrentText function to handle word typing
function processCurrentText() {
// ... existing code ...

// Check the typing mode
if (typingMode === 'word') {
// Split by space for words
curr_input_array = curr_input.split(' ');
// ... handle word typing logic ...
} else {
// Split by characters
curr_input_array = curr_input.split('');
// ... handle character typing logic ...
}

// ... existing code ...
    
}

// define the time limit
let TIME_LIMIT = 30;

// define quotes to be used
let quotes_array = [
  "Men work in the dark to serve the light.",
  "No man should pass from this world without knowing some kindness.",
  "In a world without gold, we might have been heroes.",
  "We are what we choose to be.",
  "Whats true and what is arent always the same.",
  "My enemy is a notion, not a nation.",
  "The world is an illusion. One we can either submit to, as most do, or transcend.",
  "A warning to you both - choose to follow me or oppose me and I will kill you.",
  "It's-a Me, Mario!",
  "Wanting something does not give you the right to have it.",
  "Beware of the easy path. Knowledge grows only through challenge.",
  "That is rather cynical."
];

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
    // Generate random index
    let j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
    }
    }

    function updateQuote() {
        quote_text.textContent = null;
        current_quote = quotes_array[quoteNo];
        
        // separate each character and make an element 
        // out of each of them to individually style them
        current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quote_text.appendChild(charSpan);
        });
        
        // Move to the next quote
        quoteNo++;
        if (quoteNo >= quotes_array.length) {
        quoteNo = 0;
        }
        }

function processCurrentText() {

  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  // increment total characters typed
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      // incorrect characters
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      // increment number of errors
      errors++;
    }
  });

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Click on restart to start a new game.";

  // display restart button
  restart_btn.style.display = "block";

  // calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}


function startGame() {
// Shuffle the quotes array once at the start of the game
shuffleArray(quotes_array);
resetValues();
updateQuote();

// Start the timer
clearInterval(timer);
timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}
function setCustomTime() {
    let timeInput = document.getElementById('time_input').value;
    let customTime = parseInt(timeInput);
    if (!isNaN(customTime) && customTime > 0) {
    TIME_LIMIT = customTime;
    resetValues();
    } else {
    alert('Please enter a valid number for time.');
    }
    }
    