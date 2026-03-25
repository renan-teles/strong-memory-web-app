import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { BackToTopBtnComponent } from '../../../shared/components/back-to-top-btn/back-to-top-btn.component';
import { ToastComponent } from '../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-main-page-layout',
  imports: [NavbarComponent, RouterOutlet, BackToTopBtnComponent, ToastComponent],
  templateUrl: './main-page-layout.component.html',
  styleUrl: './main-page-layout.component.css',
})
export class MainPageLayoutComponent {}
