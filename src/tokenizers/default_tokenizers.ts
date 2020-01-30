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

export class timeTokenizer extends Tokenizer {
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