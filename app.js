// Game Features
// 1. Word randomizer from collection
// 2. Check function to see if user input letter matches the string 
// 3. Attempt counter. When number of failed attempts reaches max, game over
// Refresh counter function
// Track used letters and display to user
// 4. Reset Attempt counter
// 4. Start, Continue, End options
// 5. Display Total Score

// ---Simple Pseudocode
// start game and randomize word
// check randomize word and store it
// count number of letters in the word and generate a string with same number of "_" inside
// when user enters a key, loop through the word and check if it matches any
// if yes then get the index, and replace the "_" in the other array being displayed
// if not, then decrease the numberOfTries counter + update the attemptedLetters array(if counter == 0, end game)


let randomWord 
let wordCollection = ['wander','chase','accuse','pause', 'accuse','pause','want','inspect','commission','write','inform','recognise',
                        'exist','fix','scan','adjust','hesitate','fetch', 'strain', 'impress', 'reinforce', 'install','remain','exhaust',
                        'wake','tighten','float','watch','honour','enjoy','praise']

// check for user input
let attemptedLetters = [],  isLetterFound = false
// counters
let attemptsCounter = 10, completedWords = 0

// linking to DOM
let wordContainer = document.querySelector('#word-container')
let attemptsContainer = document.querySelector('#attempts-container')
let usedLettersContainer = document.querySelector('#used-letters-container')
let scoreContainer = document.querySelector('#score-container')

// Initialize and set the randomized word
randomizeWord(wordCollection)

function randomizeWord(wordCollection){
    // splice out a word randomly at a particular index
    // return that spliced out word as the current random word
    let min = 0, max = wordCollection.length-1
    let randomizedIndex = Math.floor(Math.random() * (max - min + 1) ) + min
    let [result] = wordCollection.splice(randomizedIndex,1)
    randomWord = result
    createNewUnderscores(result)
}

function createNewUnderscores(inputWord){
    let tempWord = "_"
    console.log("inputword is",inputWord)
    for(let i= 1; i< inputWord.length; i++){
        tempWord = tempWord.concat("_")
    }
    displayedWord = tempWord
    wordContainer.innerHTML = tempWord
}

document.addEventListener('keydown',(e)=>{
    // limit the range from a to z only
    if(!(e.key >= "a" && e.key <= "z")) return

    // check if letter matches any letters from randomized word
    checkForMatch(e.key)
    checkIfWin()
})

function checkForMatch(key){
    for(let i = 0; i<randomWord.length; i++){
        if(key == randomWord[i]){
            let tempWord = displayedWord.split('')
            tempWord[i] = key
            displayedWord = tempWord.join('')
            wordContainer.innerHTML = displayedWord

            // prevents storing the same letter into the attempted letter twice
            if (isLetterFound == false){
                attemptedLetters.push(`<span>${key}</span>`)
            }
            isLetterFound = true
        } 
    } 

    if (!isLetterFound){
        attemptedLetters.push(key)
        attemptsCounter --
        attemptsContainer.innerHTML = `Number of tries left: <span>${attemptsCounter}</span>`
        checkIfLost(attemptsCounter)
    } 
    usedLettersContainer.innerHTML = `Attempted Letters: ${[...attemptedLetters]}`
    // reset back the boolean check
    isLetterFound = false
}

function checkIfWin(){
    if (displayedWord !== randomWord) return 
    setTimeout(() => {
        resetCount()
    }, 1000);
    
    // update score
    completedWords++
    scoreContainer.innerHTML = `${completedWords}/10`

    if(completedWords !== 10) return
    setTimeout(() => {
        alert("Congrats, you beat the game!")
        resetCount()
        completedWords = 0
        scoreContainer.innerHTML = `${completedWords}/10`
    }, 500);
}

function resetCount(){
    randomizeWord(wordCollection)
    wordContainer.innerHTML = displayedWord
    attemptedLetters = []
    attemptsCounter = 10
    usedLettersContainer.innerHTML = `Attempted Letters: `
    attemptsContainer.innerHTML = `Number of tries left: <span>${attemptsCounter}</span>`
}

function checkIfLost(counterValue){
    if(counterValue !== 0) return
    

    setTimeout(() => {
        alert(`The correct word was "${randomWord}". Your total score is ${completedWords}/10!`)
        resetCount()
    }, 100);
}


