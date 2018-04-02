class Lexer {
    constructor(text) {
        this.text = text;
        this.pos = 0;
        this.currentChar = this.text[this.pos];
    }

    advance() {
        if (this.pos < this.text.length - 1 && this.currentChar != null) {
            this.currentChar = this.text[++this.pos];
        }
    }

    skipWhiteSpace() {
        while (this.currentChar != null && this.currentChar == ' ') {
            this.advance()
        }
    }

    atomic() {
        
    }
}

module.exports = Lexer;