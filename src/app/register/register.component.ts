import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { register } from './Mutation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    name: null,
    password: null
  };

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }


  auth(){
    const { name, password } = this.form;
    this.apollo.mutate({
      mutation: register,
      variables: {
        user:{
          "name": name,
          "password": password
        }
      }
    }).subscribe(result => {
      this.router.navigate(['/home']);
      console.log(result.data);
    })
  }
}
