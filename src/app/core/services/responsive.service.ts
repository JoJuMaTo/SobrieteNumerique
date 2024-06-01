import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  private isMobileSubject = new BehaviorSubject<boolean>(false);
  isMobile$ = this.isMobileSubject.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        if (state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.XSmall]) {
          this.isMobileSubject.next(true);
        } else {
          this.isMobileSubject.next(false);
        }
      }
    });
  }
}
