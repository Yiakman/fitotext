import Filter from '../classes/Filter'

const possesivesRegex = "('s|(s|S)')";
const acronymRegex = "((?<=(A-Za-z))(\.)(?=(A-Za-z)))";
const bracketRegex = "[\(\)\[\]\{\}]";
const bracketlessPunctuationRegex = "[^\w\s\(\)\[\]\{\}]";
const punctuationRegex = "[^\w\s]";

const filterFuncFactory = (...args: Array<string>) => (target: string) => {
  const filterRegex = new RegExp(args.join('|'), 'g');
  return target.replace(filterRegex, '');
}

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

module.exports = {
  ClassicFilter,
  LowerCaseFilter,
  UpperCaseFilter,
  PunctuationFilter
}