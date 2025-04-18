// delete-user.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteUser } from '../../../../../core/store/user/user.actions';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  standalone:false

})
export class DeleteUserComponent implements OnInit {
  userId: string | null = null;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  onDelete(): void {
    if (this.userId) {
      this.store.dispatch(deleteUser({ id: this.userId }));
      this.router.navigate(['/user/list']);
    }
  }
}
