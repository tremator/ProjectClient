import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GetUser } from './Query';

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.css']
})
export class UserReportsComponent implements OnInit {

  id : any
  user: any
  reports: any
  constructor(private ActivatedRoute: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit(): void {
    this.getProductId();
    this.getUser();
  }
  getProductId() {
    this.ActivatedRoute.paramMap.subscribe(param => {
      this.id = parseInt(param.get('id'));
      console.log(this.id);
    });
  }
  getUser(){
    this.apollo.watchQuery({
      query: GetUser,
      variables: {
        id: this.id
      }
    }).valueChanges.subscribe(result => {
      
      this.user = result.data["users"][0];
      this.reports = this.user.reports;
      console.log(this.reports)
    })
  }

}
