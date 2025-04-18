// user-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllUsers, selectTotalElements } from '../../../../../core/store/user/user.selectors';
import { deleteUser, loadUsers } from '../../../../../core/store/user/user.actions';
import { Router } from '@angular/router';
import { User } from '../../../../../core/models/user';
import { UserInfo } from '../../../../../core/models/UserInfo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: false
})
export class UserListComponent implements OnInit {
  users$: Observable<any>;
  totalElements$: Observable<any>;
  displayedColumns: string[] = ['name', 'email','role','createdAt','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  totalElements: number = 0;  
  size: number = 5;
  page: number = 0;

  constructor(private store: Store, private router: Router) {
    this.users$ = this.store.select(selectAllUsers);
    this.totalElements$ = this.store.select(selectTotalElements);
    this.users$.subscribe((users)=>{

      console.log('users',users)
      this.dataSource = new MatTableDataSource(users);
      console.log('users',this.dataSource)

    })
    this.totalElements$.subscribe((total)=>{
      this.totalElements = total
    })

  }

  ngOnInit(): void {
    const size: number = 5;
    const page: number = 0;
    this.store.dispatch(loadUsers({size,page})); // Fetch users from state/store

  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;  // Assign paginator to data source
    }
  }


  editUser(user: any): void {
    this.router.navigate(['/edit', user.id]);  // Programmatically navigate
  }

  deleteUser(user: any): void {
    this.store.dispatch(deleteUser({ id: user.id }));
    const size: number = 5;
    const page: number = 0;
    this.store.dispatch(loadUsers({size,page})); // Fetch users from state/store

  }
  
  onPageChange(event: any): void {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.store.dispatch(loadUsers({ page, size })); // Dispatch loadUsers with page and size
  }
  
}
