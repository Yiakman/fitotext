export interface IFilterFunc {
  (target: string): string;
}

export default class Filter {
  private filterFunc: IFilterFunc;

  constructor(filterFunc: IFilterFunc ) {
    this.filterFunc = filterFunc;
  }
  filter(target: string) {
    return this.filterFunc(target);
  }
}

export const filterFuncFactory = (...args: Array<string>) => (target: string) => {
  const filterRegex = new RegExp(args.join('|'), 'g');
  return target.replace(filterRegex, '');
}
