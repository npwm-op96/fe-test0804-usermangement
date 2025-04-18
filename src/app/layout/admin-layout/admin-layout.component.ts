import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthState } from '../../core/models/auth';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { selectUser } from '../../core/store/auth/auth.selectors';
import { Location } from '@angular/common';  // Import Location service


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  standalone: false
})
export class AdminLayoutComponent implements OnInit {


  ngOnInit() {
  }
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSmallScreen = false;
  user$: Observable<AuthState>;
  accountInfo!: AuthState;
  menuItems = [
    {
      name: 'Users',
      route: '/users',
      icon: 'group',
      children: [
        { name: 'User List', route: 'list', icon: 'list' },
        { name: 'Create User', route: 'create', icon: 'person_add' },
      ]
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver, private store: Store, private location: Location) {

    this.user$ = this.store.select(selectUser);
    this.user$.subscribe((res) => {
      this.accountInfo = res
    })

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
      if (this.isSmallScreen && this.sidenav) {
        this.sidenav.close();
      } else if (this.sidenav) {
        this.sidenav.open();
      }
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  goBack(): void {
    this.location.back(); // Navigate to the previous page in the browser's history
  }

}
