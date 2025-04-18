import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from '../../../../core/store/auth/auth.actions';
import { selectError, selectUser } from '../../../../core/store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthState } from '../../../../core/models/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  // error$: Observable<String>;
  user$: Observable<AuthState>;


  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: Router
  ) {
    // Initialize the login form with default values
    this.loginForm = this.fb.group({
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });

    // Directly assign the observables without using undefined
    // this.error$ = this.store.select(selectError);
    this.user$ = this.store.select(selectUser);
  }

  // Use a simpler method for form submission
  onSubmit() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value; // Extract user from form value
      this.store.dispatch(login({ user }));
      this.user$.subscribe((res) => {
        console.log('res', res)
        if (res.token) {
          this.route.navigateByUrl("user");
        }
      })

    }
  }
}
