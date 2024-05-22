import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{

  isMobile = true;

constructor(private _router: Router, private responsive: BreakpointObserver) { }

ngOnInit() {
  this.responsive.observe(Breakpoints.Small)
    .subscribe(result => {

      if (result.matches) {
        console.log("passage en mobile OK");
        this.isMobile = true;
        if (!result.matches) {
          console.log("surtie du mode mobile");
          this.isMobile = false;
        }
      }

    });
  this.responsive.observe(Breakpoints.Large)
    .subscribe(result => {

      if (result.matches) {
        console.log("sortie du mode mobile");
        this.isMobile = false;
             }

    });
}



}
