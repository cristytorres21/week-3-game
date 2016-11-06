$(document).ready(function() {

	// declare needed variables
	// possible hangman words 
	var wordBank = ["horse","cowboy","saloon","sheriff","longhorns","blacksmith", "giddyup", "grit", "buckaroo", "jail", "maverick", "rodeo", "outlaw", "villanous", "vigilant","bandit", "wrangler"];

	// computer to choose random word
	var randomWord = wordBank[Math.floor(Math.random()*wordBank.length)].toLowerCase();
	console.log(randomWord); // prints randomWord in console 

	// stores separate characters of randomWord
	var chars = [];
	
	// overwrite "chars" with "_" characters
	var underscore = []; 

	// user's remaining guesses
	var guessRemaining = 10;

	// letters guessed by user
	var guessLetters = [];



	for (var i = 0; i < randomWord.length; i++) {  
		// places each individual character in its own element of stringArray     
		chars[i] = randomWord.charAt(i);

		// creates underscore of equal length, but with "_" character
		underscore[i] = "_";   

		// replaces currentWord with underscore
		document.getElementById("currentWord").innerHTML = underscore.join(" ");
    }  



    // event listener to capture key pressed upon release of key
    document.onkeyup = function() {

		// makes sure 1) key pressed is a letter/number 2) checks if there's remaining guesses
		if ((event.keyCode <=90) && (event.keyCode >= 65) && (guessRemaining > 0)) {
	    
	        // capture keyCode in keyPressed
	        var keyPressed = event.which || event.keyCode;

	        // convert keyCode into ASCII character and store in letter
	        var letter = String.fromCharCode(keyPressed).toLowerCase();
	        
	        // boolean to keep track of whether letter is in randomWord (used to decrease guessRemaining)
	        var guess = false;

	        // If letter has not already been guessed
	        if (guessLetters.join(" ").indexOf(letter) == -1) { 
	        	
	        	// goes through randomWord to check if letter is in it
	        	for (var i = 0; i < randomWord.length; i++) {   
	                
	                // check if the letter is found at all in chars                 
	                if (letter == chars[i]) {
	                    // If found, replace underscore's ith element with the real letter
	                    underscore[i] = chars[i];
	                    
	                    // makes guess = true
	                    guess = true;
	                }
	            }
	       		
	       		// adds letter to guessLetters 
	            guessLetters.push(letter);
	        } else {
	        	// If letter has already been guessed, change guess to true
	        		guess = true;
	        	}
	     

	        // If no more underscores in the array, you win.
			if (underscore.join(" ").indexOf("_") == -1) {   
				// player wins
				alert("You Win!");
			}

			if (guessRemaining == 0) {
	 			// player has lost
				alert("RIP! Better luck next time!");
				
				// shows player answer
				document.getElementById("correctWord").innerHTML = randomWord;
			}

	        
	        // if guess is false (letter is not in randomWord & it hasn't been guessed before)
	        if (guess == false) {
	        	// decrease guessRemaining by 1
				guessRemaining--;
			}

			// Replaces the html on the page after each iteration
			document.getElementById("currentWord").innerHTML = underscore.join(" ");
			document.getElementById("guessRemaining").innerHTML = "Guesses Remaining: " + guessRemaining;
			document.getElementById("guessLetter").innerHTML = "Letters Guessed: " + guessLetters;
	    } 
        
    }

});


