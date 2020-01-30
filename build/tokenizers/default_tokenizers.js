"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Tokenizer_1 = __importDefault(require("../classes/Tokenizer"));
const Tokenizer_2 = require("../classes/Tokenizer");
class insideQuotesTokenizer extends Tokenizer_1.default {
    constructor() {
        const filterRegex = /"(.*?)" ?/g;
        const captureRegex = /(?<=")(.*)(?=")/g;
        super((target) => {
            const capture = target.match(captureRegex);
            return {
                captured: capture || [],
                uncaptured: target.replace(filterRegex, '')
            };
        }, (target) => {
            const capture = target.match(captureRegex);
            return capture || [];
        });
    }
}
exports.insideQuotesTokenizer = insideQuotesTokenizer;
class CapitalizedTokenizer extends Tokenizer_1.default {
    constructor() {
        const capitalizationRegex = "((?<!\\w)[A-Z][a-z]+(?=\\W+))";
        super(Tokenizer_2.tokenizerFuncFactory(capitalizationRegex), Tokenizer_2.tokenizerFuncSimpleFactory(capitalizationRegex));
    }
}
exports.CapitalizedTokenizer = CapitalizedTokenizer;
class ClassicTokenizer extends Tokenizer_1.default {
    constructor(preserveBrackets = false) {
        const captureRegex = preserveBrackets ?
            /(\(|\[|\{|")?[A-Za-z0-9]+(\.|\#|-)?[A-Za-z0-9]+(\)|\]|\}|")?/g :
            /[A-Za-z0-9]+(\.|\#|-)?[A-Za-z0-9]+/g;
        super((target) => {
            return {
                captured: target.match(captureRegex) || [],
                uncaptured: target.replace(captureRegex, ''),
            };
        }, (target) => target.match(captureRegex) || []);
    }
}
exports.ClassicTokenizer = ClassicTokenizer;
class TimeTokenizer extends Tokenizer_1.default {
    constructor() {
        const cT = new ClassicTokenizer(false);
        const timeRegex = /17:00\n8:00AM\n8:61\n08:59pm\n23:56\n12:35pm\n9am08am/g;
        super((target) => {
            return {
                captured: cT.simpleTokenize(target).filter(timeRegex.test),
                uncaptured: target.replace(timeRegex, '')
            };
        }, (target) => cT.simpleTokenize(target).filter(timeRegex.test));
    }
}
exports.TimeTokenizer = TimeTokenizer;
class DateTokenizer extends Tokenizer_1.default {
    constructor() {
        const dateRegex = /(?<![0-9a-zA-Z])(((3?[0-1])|([0-2]?[0-9]))\/((0?[0-9])|(1[0-2]))\/([0-9]{1,4}))/g;
        super((target) => {
            return {
                captured: target.match(dateRegex) || [],
                uncaptured: target.replace(dateRegex, ''),
            };
        }, (target) => target.match(dateRegex) || []);
    }
}
exports.DateTokenizer = DateTokenizer;
class CSVTokenizer extends Tokenizer_1.default {
    constructor() {
        const csvRegex = /,\s*/g;
        super((target) => {
            return {
                captured: target.split(csvRegex),
                uncaptured: (csvRegex.test(target)) ? '' : target,
            };
        }, (target) => target.split(csvRegex));
    }
}
exports.CSVTokenizer = CSVTokenizer;
class RegexTokenizer extends Tokenizer_1.default {
    constructor(regex) {
        const parsedRegex = typeof regex === 'string' ? regex : (new RegExp(regex.source, 'g')).source;
        const regexTokenizer = Tokenizer_2.tokenizerFuncFactory(parsedRegex);
        const simpleRegextokenizer = Tokenizer_2.tokenizerFuncSimpleFactory(parsedRegex);
        super(regexTokenizer, simpleRegextokenizer);
    }
}
exports.RegexTokenizer = RegexTokenizer;
