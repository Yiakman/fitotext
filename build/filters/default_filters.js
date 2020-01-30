"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Filter_1 = __importDefault(require("../classes/Filter"));
const Filter_2 = require("../classes/Filter");
const possesivesRegex = "('s|(s|S)')";
const acronymRegex = "((?<=(A-Za-z))(\.)(?=(A-Za-z)))";
const bracketRegex = "[\(\)\[\]\{\}]";
const bracketlessPunctuationRegex = "[^\w\s\(\)\[\]\{\}]";
const punctuationRegex = "[^\w\s]";
class ClassicFilter extends Filter_1.default {
    constructor() {
        const classicFilter = Filter_2.filterFuncFactory(possesivesRegex, acronymRegex);
        super(classicFilter);
    }
}
exports.ClassicFilter = ClassicFilter;
class LowerCaseFilter extends Filter_1.default {
    constructor() {
        super((target) => target.toLowerCase());
    }
}
exports.LowerCaseFilter = LowerCaseFilter;
class UpperCaseFilter extends Filter_1.default {
    constructor() {
        super((target) => target.toUpperCase());
    }
}
exports.UpperCaseFilter = UpperCaseFilter;
class PunctuationFilter extends Filter_1.default {
    constructor(includeBrackets = true) {
        const punctuationFilter = Filter_2.filterFuncFactory((includeBrackets ? punctuationRegex : bracketlessPunctuationRegex));
        super(punctuationFilter);
    }
}
exports.PunctuationFilter = PunctuationFilter;
;
class RegexFilter extends Filter_1.default {
    constructor(regex) {
        const parsedRegex = typeof regex === 'string' ? regex : (new RegExp(regex.source, 'g')).source;
        const regexFilter = Filter_2.filterFuncFactory(parsedRegex);
        super(regexFilter);
    }
}
module.exports = {
    ClassicFilter,
    LowerCaseFilter,
    UpperCaseFilter,
    PunctuationFilter,
    RegexFilter,
};
