import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LOGIN } from './Query';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    name: null,
    password: null
  };

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  auth(){
    const { name, password } = this.form;
    this.apollo.watchQuery({
      query: LOGIN,
      fetchPolicy: 'network-only',
      variables: {
        name: name,
        password: password
      }
    }).valueChanges.subscribe(result => {
      localStorage.setItem("id", result.data['login'].id);
      localStorage.setItem("name", result.data['login'].name);
      localStorage.setItem("token", result.data['login'].token);
      this.router.navigate(['/home']);
    })

  }

}
