import Filter from '../classes/Filter'
import { filterFuncFactory } from '../classes/Filter'

const possesivesRegex = "('s|(s|S)')";
const acronymRegex = "((?<=(A-Za-z))(\.)(?=(A-Za-z)))";
const bracketRegex = "[\(\)\[\]\{\}]";
const bracketlessPunctuationRegex = "[^\w\s\(\)\[\]\{\}]";
const punctuationRegex = "[^\w\s]";

class ClassicFilter extends Filter {
  constructor() {
    const classicFilter = filterFuncFactory(possesivesRegex, acronymRegex);
    super(classicFilter);
  }
}

class LowerCaseFilter extends Filter {
  constructor() {
    super((target: string) => target.toLowerCase());
  }
}

class UpperCaseFilter extends Filter {
  constructor() {
    super((target: string) => target.toUpperCase());
  }
}

class PunctuationFilter extends Filter {
  constructor(includeBrackets: boolean=true) {
    const punctuationFilter = filterFuncFactory((includeBrackets ? punctuationRegex : bracketlessPunctuationRegex));
    super(punctuationFilter);
  }
};

class RegexFilter extends Filter {
  constructor(regex: string | RegExp) {
    const parsedRegex = typeof regex === 'string' ? regex : (new RegExp(regex.source, 'g')).source;
    const regexFilter = filterFuncFactory(parsedRegex);
    super(regexFilter);
  }
}

module.exports = {
  ClassicFilter,
  LowerCaseFilter,
  UpperCaseFilter,
  PunctuationFilter,
  RegexFilter,
}