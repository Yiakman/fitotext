import Tokenizer from '../classes/Tokenizer';
import { tokenizerFuncFactory, tokenizerFuncSimpleFactory } from '../classes/Tokenizer';

export class insideQuotesTokenizer extends Tokenizer {
  constructor() {
    const filterRegex = /"(.*?)" ?/g;
    const captureRegex = /(?<=")(.*)(?=")/g;
    super(
    (target: string) => {
      const capture = target.match(captureRegex);
      return {
        captured: capture || [],
        uncaptured: target.replace(filterRegex, '')
      }
    },
    (target: string) => {
      const capture = target.match(captureRegex);
      return capture || [];
    });
  }
}

export class CapitalizedTokenizer extends Tokenizer {
  constructor() {
    const capitalizationRegex = "((?<!\\w)[A-Z][a-z]+(?=\\W+))";
    super(
      tokenizerFuncFactory(capitalizationRegex),
      tokenizerFuncSimpleFactory(capitalizationRegex)
    );
  }
}

export class ClassicTokenizer extends Tokenizer {
  constructor(preserveBrackets: boolean=false) {
    const captureRegex = preserveBrackets ?
    /(\(|\[|\{|")?[A-Za-z0-9]+(\.|\#|-)?[A-Za-z0-9]+(\)|\]|\}|")?/g :
    /[A-Za-z0-9]+(\.|\#|-)?[A-Za-z0-9]+/g;
    super((target: string) => {
      return {
        captured: target.match(captureRegex) || [],
        uncaptured: target.replace(captureRegex, ''),
      }
    }, (target: string) => target.match(captureRegex) || []);
  }
}

export class TimeTokenizer extends Tokenizer {
  constructor() {
    const cT = new ClassicTokenizer(false);
    const timeRegex = /17:00\n8:00AM\n8:61\n08:59pm\n23:56\n12:35pm\n9am08am/g;
    super((target: string) => {
      return {
        captured: cT.simpleTokenize(target).filter(timeRegex.test),
        uncaptured: target.replace(timeRegex, '')
      }
    }, (target: string) => cT.simpleTokenize(target).filter(timeRegex.test));
  }
}

export class DateTokenizer extends Tokenizer {
  constructor() { // TODO: only format right now is dd/mm/yyyy
    const dateRegex = /(?<![0-9a-zA-Z])(((3?[0-1])|([0-2]?[0-9]))\/((0?[0-9])|(1[0-2]))\/([0-9]{1,4}))/g
    super((target: string) => {
      return {
        captured: target.match(dateRegex) || [],
        uncaptured: target.replace(dateRegex, ''),
      }
    }, (target: string) => target.match(dateRegex) || []);
  }
}
export class CSVTokenizer extends Tokenizer {
  constructor() {
    const csvRegex = /,\s*/g;
    super((target: string) => {
      return {
        captured: target.split(csvRegex),
        uncaptured: (csvRegex.test(target)) ? '' : target,
      }
    }, (target: string) => target.split(csvRegex));
  }
}
export class RegexTokenizer extends Tokenizer {
  constructor(regex: string | RegExp) {
    const parsedRegex = typeof regex === 'string' ? regex : (new RegExp(regex.source, 'g')).source;
    const regexTokenizer = tokenizerFuncFactory(parsedRegex);
    const simpleRegextokenizer = tokenizerFuncSimpleFactory(parsedRegex);
    super(regexTokenizer, simpleRegextokenizer);
  }
}
