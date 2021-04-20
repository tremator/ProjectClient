import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { ChartsModule } from 'ng2-charts';
import { PiechartComponent } from './piechart/piechart.component';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectReportsComponent } from './project-reports/project-reports.component';
import { UserReportsComponent } from './user-reports/user-reports.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PiechartComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectReportsComponent,
    UserReportsComponent,
    RegisterComponent,
    
  ],  
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'home', component: ProjectsComponent},
      { path: 'project/:id', component: ProjectDetailComponent },
      { path: 'projectReports/:id', component: ProjectReportsComponent },
      { path: 'userReports/:id', component: UserReportsComponent },
      { path: 'register', component: RegisterComponent },
    ])
  ],
  providers: [
    HttpClient,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            headers: new HttpHeaders({
              Authorization: localStorage.getItem("token") ?? ''
            }),
            uri: 'https://localhost:5001/graphql',
          }),
        };
      },
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
