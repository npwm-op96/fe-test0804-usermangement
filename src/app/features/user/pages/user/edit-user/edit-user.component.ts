// edit-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { editUser } from '../../../../../core/store/user/user.actions';
import { UserInfo } from '../../../../../core/models/UserInfo';
import { Observable } from 'rxjs';
import { selectAllUsers } from '../../../../../core/store/user/user.selectors';
import { UserService } from '../../../../../core/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  standalone: false

})
export class EditUserComponent implements OnInit {
  userId: string | null = null;
  editUserForm!: FormGroup;
  user$: Observable<UserInfo[] | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private userService : UserService

  ) {
    this.editUserForm = this.fb.group({
      firstname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
    });
    this.user$ = this.store.select(selectAllUsers); // Use selectors to get user details

  }

  ngOnInit(): void {
    // Load user data based on ID from URL
    this.userId = this.route.snapshot.paramMap.get('id');
    // if use api by id
    this.userService.getUserById(String(this.userId)).subscribe((res)=>{
      const user : UserInfo = res.data
      this.editUserForm.patchValue({
        firstname: user.firstname,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      });
    })

    // if use state
    // this.user$.subscribe((users) => {
    //   if (users) {
    //     const acc: UserInfo | undefined = users.filter((user: UserInfo) => user.id === this.userId)[0];

    //     this.editUserForm.patchValue({
    //       firstname: acc.firstname,
    //       email: acc.email,
    //       role: acc.role,
    //       createdAt: acc.createdAt
    //     });
    //   }
    // });
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      const updatedUser = { ...this.editUserForm.value, id: this.userId };
      this.store.dispatch(editUser({ user: updatedUser }));
      this.router.navigate(['/user/list']);
    }
  }
}
