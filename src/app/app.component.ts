import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthState } from './core/models/auth';
import { Store } from '@ngrx/store';
import { selectUser } from './core/store/auth/auth.selectors';
import { User } from './core/models/user';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-fe0804';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSmallScreen = false;
  user$: Observable<AuthState>;
  accountInfo!: AuthState;

  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { name: 'Users', icon: 'people', route: '/users' },
    { name: 'Settings', icon: 'settings', route: '/settings' }
  ];

  constructor(private router: Router, private store: Store) {

    this.user$ = this.store.select(selectUser);
    this.user$.subscribe((res) => {
      this.accountInfo = res
      console.log(this.accountInfo)

      if (this.accountInfo.token) {
        this.router.navigateByUrl("/user")
      }
      else{
        this.router.navigateByUrl("/auth")
      }
    })
  }

}
