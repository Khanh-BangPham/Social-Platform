import { Observable as ObservableR } from 'rxjs';

export interface EmitOpts {
  inverse?: boolean;
}

export interface SubcribeOpts {
  last?: boolean;
}

export type Handler = (...args: any[]) => void | boolean;
export class Observable<T> {
  private handlers: Handler[] = [];
  private always: Handler[] = [];
  private lasts: Handler[] = [];
  private isStopPropgation = false;
  constructor(private readonly ob?: ObservableR<T>, opts?: EmitOpts) {
    this.ob?.subscribe((...args) => {
      this.emit(args, opts);
    });
  }

  subscribe(handler: Handler, opts?: SubcribeOpts) {
    if (opts?.last) {
      this.lasts.push(handler);

      return () => {
        this.lasts = this.lasts.filter((e) => e !== handler);
      };
    }

    this.handlers.push(handler);

    return () => {
      this.handlers = this.handlers.filter((e) => e !== handler);
    };
  }

  alway(handler: Handler) {
    this.always.push(handler);

    return () => {
      this.always = this.always.filter((e) => e !== handler);
    };
  }

  emit(args: any[], opts?: EmitOpts): void {
    try {
      if (this.isStopPropgation) return;

      let handlers = [
        ...(opts?.inverse ? this.handlers.reverse() : this.handlers),
        ...this.lasts,
      ];

      for (let i = 0; i < handlers.length; i++) {
        let check = handlers[i](...args);
        if (check === false) {
          break;
        }
      }

      for (let i = 0; i < this.always.length; i++) {
        this.always[i](...args);
      }
    } finally {
      this.isStopPropgation = false;
    }
  }

  stopPropagation() {
    this.isStopPropgation = true;
  }
}
