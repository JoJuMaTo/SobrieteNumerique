import {Component, OnInit} from '@angular/core';
import {ResponsiveService} from "../core/services/responsive.service";
import {MatButton} from '@angular/material/button';
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatButton,
    NgIf
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  isMobile!: boolean;

  constructor(private responsiveService: ResponsiveService, private router: Router) {}

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

  onGoToQuiz(){
    this.router.navigateByUrl('questionnaire')
  }
}
