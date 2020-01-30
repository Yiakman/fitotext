import Tokenizer from './Tokenizer';
import Filter from './Filter';

type CascadeProcessTypeSingle = 'single';
type CascadeProcessTypeMulti = 'multi';
interface ICascadeOutput<T extends CascadeProcessTypeSingle | CascadeProcessTypeMulti> {
  processType: T,
  result: T extends CascadeProcessTypeSingle ? string[] : string[][],
  residual: string,
}

interface IFitoProcess {
  process: string,
  resultFilter?: string,
}
export default class Cascade {
  protected processQueue: IFitoProcess[];
  protected processType: CascadeProcessTypeMulti | CascadeProcessTypeSingle;
  constructor(processQeue: IFitoProcess[] | IFitoProcess) {
    if (!Array.isArray(processQeue)) {
      this.processQueue = [processQeue];
      this.processType = 'single';
      return;
    } else if (!processQeue.length) throw 'Empty process queue';
    this.processQueue = processQeue;
    this.processType = (processQeue.length === 1) ? 'single' : 'multi';
    return;
  }
  protected singleProcess(target: string) {
    const output: ICascadeOutput<'single'> = {
      processType: 'single',
      result: [],
      residual: '',
    } 
  }
  protected multiProcess(target: string) {
    const output: ICascadeOutput<'single'> = {
      processType: 'single',
      result: [],
      residual: '',
    } 
  }
  public process(target: string) {
    if (this.processType === 'single') return this.singleProcess(target);
    else if (this.processType === 'multi') return this.multiProcess(target); 
  }
}
