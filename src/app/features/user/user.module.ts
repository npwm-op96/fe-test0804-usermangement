import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminLayoutComponent } from '../../layout/admin-layout/admin-layout.component';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { DeleteUserComponent } from './pages/user/delete-user/delete-user.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations:[AdminLayoutComponent, UserListComponent, CreateUserComponent, EditUserComponent, DeleteUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    HttpClientModule,
    SharedModule
  ],
})
export class UserModule {}
