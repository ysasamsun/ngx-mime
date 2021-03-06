import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { Dimensions } from '../core/models/dimensions';

@Injectable()
export class MimeResizeServiceStub {
  private resizeSubject: ReplaySubject<Dimensions> = new ReplaySubject();

  get onResize(): Observable<Dimensions> {
    return this.resizeSubject.asObservable();
  }
  markForCheck(): void {
    this.triggerResize();
  }
  triggerResize(dimensions?: Dimensions): void {
    if (dimensions) {
      this.resizeSubject.next(dimensions);
    } else {
      this.resizeSubject.next(new Dimensions());
    }
  }
}
