import Tokenizer from '../classes/Tokenizer';
import { tokenizerFuncFactory, tokenizerFuncSimpleFactory } from '../classes/Tokenizer';


export class insideQuotesTokenizer extends Tokenizer {
  constructor() {
    const filterRegex = /"(.*?)"/g;
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
    const capitalizationRegex = "((?<!\w)[A-Z][a-z]+(?=\W+))";
    super(
      tokenizerFuncFactory(capitalizationRegex),
      tokenizerFuncSimpleFactory(capitalizationRegex)
    );
  }
}
