const TypeWriter = function (txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function(){
    // Current index of word -array-
    const current = this.wordIndex % this.words.length;
    // Get full text of the current word
    const fullTxt = this.words[current]
    
    // Check if deleting 
    if(this.isDeleting){
      // Remove a character
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    }else{
      // Add a character
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }
    
    // Insert txt intp element for inserting DOM
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
   
    //Initial type Speed
    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is completely be wrote.
    if(!this.isDeleting && this.txt === fullTxt){
        // Make a pause at the end of each word.
        typeSpeed = this.wait;
        // Set delete to true for start to deleting.
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pasue before start typing again
        typeSpeed = 500;
    }
 

    setTimeout(() => this.type(), typeSpeed);
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', init);

// İnitialize Typer app Gett data from HTML.
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
     // Initalize typeWriter
     new TypeWriter(txtElement, words, wait);
}
