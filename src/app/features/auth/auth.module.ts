import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from '../../core/interceptors/auth.interceptor';
import { AuthLayoutComponent } from '../../layout/auth-layout/auth-layout.component';
import { RouterOutlet } from '@angular/router';


@NgModule({
    declarations: [LoginComponent,AuthLayoutComponent],
    imports: [
        CommonModule,
        MatCardModule,
        RouterOutlet,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true, 
        },
      ],
    exports: []
})
export class AuthModule { }
