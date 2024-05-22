import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {CustomModalComponent} from "../custom-modal/custom-modal.component";
import {ResponsiveService} from "../../services/responsive.service";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    AsyncPipe,
    NgForOf,
    CustomModalComponent,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLoggedIn = this.authService.isLoggedIn();
  username$ = this.authService.getUsername();
  protected readonly RouterLink = RouterLink;
  showModal = false;
  isMobile!: boolean;

  constructor(private router: Router, private authService: AuthService, private responsiveService: ResponsiveService) {

  }

  ngOnInit() {

    this.responsiveService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
      if (isMobile) {
        console.log("Mode mobile détecté");
      } else {
        console.log("Mode desktop détecté");
      }
    });



    localStorage.getItem('username')
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      console.log('Is logged in:', isLoggedIn);
    });
    this.authService.getUsername().subscribe(username => {
      console.log('Current username:', username);
    });

  }

  goHome() {
    this.router.navigateByUrl("/")
  }

  goLogin() {
    this.router.navigateByUrl("/login")
  }
  goLogout() {

    this.authService.logout();
  }

  handleConfirmation(result: boolean) {
    this.showModal = false;
    if (result) {
      console.log('User clicked OK');
      this.goLogout()
    } else {
      console.log('User clicked Cancel');
    }

  }

}
