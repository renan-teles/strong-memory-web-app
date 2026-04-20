import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top-btn',
  imports: [],
  templateUrl: './back-to-top-btn.component.html',
  styleUrl: './back-to-top-btn.component.css',
})
export class BackToTopBtnComponent {
  showButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
