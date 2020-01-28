interface IFilterFunc {
  (target: string): string;
}

export default class Filter {
  filterFunc: IFilterFunc;

  constructor(filterFunc: IFilterFunc ) {
    this.filterFunc = filterFunc;
  }
  filter(target: string) {
    return this.filterFunc(target);
  }
}
