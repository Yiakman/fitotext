
export interface TokenizerFunc { (target: string): {
    captured: string[];
    uncaptured: string;
  }
}

export interface TokenizerFuncSimple { (target: string): string[] }

export interface TokenizerFuncFactory { (regexString: string): TokenizerFunc };

export interface TokenizerFuncSimpleFactory { (regexString: string): TokenizerFuncSimple };

export default class Tokenizer {
  private tokenizerFunc: TokenizerFunc;
  private simpleTokenizerFunc?: TokenizerFuncSimple;

  constructor(tokenizerFunc: TokenizerFunc, simpleTokenizerFunc?: TokenizerFuncSimple) {
    this.tokenizerFunc = tokenizerFunc;
    this.simpleTokenizerFunc = simpleTokenizerFunc;
  }
  tokenize(target: string) {
    return this.tokenizerFunc(target);
  }
  simpleTokenize(target: string) {
    if (this.simpleTokenizerFunc) return this.simpleTokenizerFunc(target);
    throw 'simpleTokenize is not defined in this Tokenizer'
  }
}

export const tokenizerFuncFactory: TokenizerFuncFactory =
(regexString: string): TokenizerFunc  => {
  const regex = new RegExp(regexString, 'g');
  return (target: string) => {
    const capturedTry = target.match(regex);
    return {
      captured: (capturedTry && capturedTry.length) ? capturedTry : [],
      uncaptured: target.replace(regex, '')
    };
  }
}

export const tokenizerFuncSimpleFactory: TokenizerFuncSimpleFactory = (regexString: string) => {
  const regex = new RegExp(regexString, 'g');
  console.log(regex);
  return (target: string) => {
    const capturedTry = target.match(regex);
    return capturedTry || [];
  }
}
