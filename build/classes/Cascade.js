"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
class Cascade {
    constructor(processQeue) {
        if (!Array.isArray(processQeue)) {
            this.processQueue = [processQeue];
            this.processType = 'single';
            return;
        }
        else if (!processQeue.length)
            throw 'Empty process queue';
        this.processQueue = processQeue;
        this.processType = (processQeue.length === 1) ? 'single' : 'multi';
        return;
    }
    singleProcess(target) {
        const result = [];
        const output = {
            processType: 'single',
            result,
            residual: '',
        };
    }
    multiProcess(target) {
        const result = [];
        const output = {
            processType: 'multi',
            result,
            residual: '',
        };
    }
    process(target) {
        if (this.processType === 'single')
            return this.singleProcess(target);
        else if (this.processType === 'multi')
            return this.multiProcess(target);
    }
}
exports.default = Cascade;
