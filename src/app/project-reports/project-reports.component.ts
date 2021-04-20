import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GetProjects } from './Query';

@Component({
  selector: 'app-project-reports',
  templateUrl: './project-reports.component.html',
  styleUrls: ['./project-reports.component.css']
})
export class ProjectReportsComponent implements OnInit {

  id: any
  project: any
  reports: any
  constructor(private ActivatedRoute: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit(): void {
    this.getProductId()
    this.getProject();
  }

  getProductId() {
    this.ActivatedRoute.paramMap.subscribe(param => {
      this.id = parseInt(param.get('id'));
      console.log(this.id);
    });
  }
  getProject(){
    this.apollo.watchQuery({
      query: GetProjects,
      variables: {
        id: this.id
      }
    }).valueChanges.subscribe(result => {
      
      this.project = result.data["projects"][0];
      this.reports = this.project.reports;
      console.log(this.reports)
    })
  }

}
