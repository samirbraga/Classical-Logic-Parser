let Token = require('./token');
let {ATOM, NEG, OR, AND, IMPL, IFF, EOF} = require('./tokenTypes');

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
            this.advance();
        }
    }

    error() {
        throw new Error('Error parsing input');
    }

    atom() {
        if (this.currentChar == 'T') return true;
        if (this.currentChar == 'F') return false;
    }

    getNextToken() {
        while (this.currentChar != null) {            
			if (this.currentChar === ' ') {
				this.skipWhiteSpace();
				continue;
            }

            if (this.currentChar == 'T' || this.currentChar == 'F') {
                let token = new Token(ATOM, this.atom());
                this.advance();
                return token;
            }

            if (this.currentChar == '^') {
                this.advance();
                return new Token(AND, '^');
            }

            if (this.currentChar == 'v') {
                this.advance();
                return new Token(OR, 'v');
            }

            if (this.currentChar == '>') {
                this.advance();
                return new Token(IMPL, '>');
            }

            this.error();
        }

        return new Token(EOF, null);
    }
}

module.exports = Lexer;