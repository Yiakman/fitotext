"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Filter {
    constructor(filterFunc) {
        this.filterFunc = filterFunc;
    }
    filter(target) {
        return this.filterFunc(target);
    }
}
exports.default = Filter;
exports.filterFuncFactory = (...args) => (target) => {
    const filterRegex = new RegExp(args.join('|'), 'g');
    return target.replace(filterRegex, '');
};
