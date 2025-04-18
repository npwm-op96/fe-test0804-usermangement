// create-user.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createUser } from '../../../../../core/store/user/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  standalone: false
})
export class CreateUserComponent {
  createUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private router: Router
  ) {
    this.createUserForm = this.fb.group({
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [1]
    });
  }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      const user = this.createUserForm.value;
      this.store.dispatch(createUser({ user }));
      this.router.navigate(['/user/list']);

    }
  }
}
