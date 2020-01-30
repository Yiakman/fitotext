"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
class Tokenizer {
    constructor(tokenizerFunc, simpleTokenizerFunc) {
        this.tokenizerFunc = tokenizerFunc;
        this.simpleTokenizerFunc = simpleTokenizerFunc;
    }
    tokenize(target) {
        return this.tokenizerFunc(target);
    }
    simpleTokenize(target) {
        if (this.simpleTokenizerFunc)
            return this.simpleTokenizerFunc(target);
        throw 'simpleTokenize is not defined in this Tokenizer';
    }
}
exports.default = Tokenizer;
exports.tokenizerFuncFactory = (regexString) => {
    const regex = new RegExp(regexString, 'g');
    return (target) => {
        const capturedTry = target.match(regex);
        return {
            captured: (capturedTry && capturedTry.length) ? capturedTry : [],
            uncaptured: target.replace(regex, '')
        };
    };
};
exports.tokenizerFuncSimpleFactory = (regexString) => {
    const regex = new RegExp(regexString, 'g');
    console.log(regex);
    return (target) => {
        const capturedTry = target.match(regex);
        return capturedTry || [];
    };
};
