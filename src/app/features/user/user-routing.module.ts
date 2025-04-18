import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layout/admin-layout/admin-layout.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { DeleteUserComponent } from './pages/user/delete-user/delete-user.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'list', component: UserListComponent },   // User List Page
      { path: 'create', component: CreateUserComponent }, // Create User Page
      { path: 'edit/:id', component: EditUserComponent },  // Edit User Page (with dynamic ID)
      { path: 'delete/:id', component: DeleteUserComponent }, // Delete User Page (with dynamic ID)
      { path: '', redirectTo: '/user/list', pathMatch: 'full' },  // Default route
      { path: '**', redirectTo: '/user/list' }  // Wildcard route for invalid paths    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Use `forChild` for feature module routing
  exports: [RouterModule]
})
export class UserRoutingModule { }
