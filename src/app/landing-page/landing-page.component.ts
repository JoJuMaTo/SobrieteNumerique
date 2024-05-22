import {Component, OnInit} from '@angular/core';
import {ResponsiveService} from "../core/services/responsive.service";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  isMobile!: boolean;

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit() {
    this.responsiveService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
      if (isMobile) {
        console.log("Mode mobile détecté");
      } else {
        console.log("Mode desktop détecté");
      }
    });
  }
}
