let Token = require('./token');
let Lexer = require('./lexer');
let {ATOM, NEG, OR, AND, IMPL, IFF, EOF} = require('./tokenTypes');


let opers = {};

opers[OR] = (a, b) => a || b;
opers[AND] = (a, b) => a && b;
opers[IMPL] = (a, b) => (a && b) || (!a);

class Interpreter {
    constructor (lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }
    
    error() {
        throw new Error('Error parsing input');
    }

	eat(tokenType) {
		if (this.currentToken.type == tokenType) {
			this.currentToken = this.lexer.getNextToken();
		} else {
			this.error();
		}
	}

	atom() {
		let token = this.currentToken;
		this.eat(ATOM);
		return token.value;
	}

	term() {
		let result = this.atom();

		while ([IMPL].includes(this.currentToken.type)) {
			let token = this.currentToken;
			
			this.eat(token.type);
			result = opers[token.type](result, this.atom());
		}

		return result;
	}

	expr() {
		let result = this.term();

		while ([OR, AND].includes(this.currentToken.type)) {
			let token = this.currentToken;
			
			this.eat(token.type);
			result = opers[token.type](result, this.term());
		}

		return result;
	}
}

module.exports = Interpreter;