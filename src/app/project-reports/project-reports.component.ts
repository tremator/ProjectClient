import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GetProjects, PROJECTEXCEL } from './Query';
import {saveAs} from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-reports',
  templateUrl: './project-reports.component.html',
  styleUrls: ['./project-reports.component.css']
})
export class ProjectReportsComponent implements OnInit {

  id: any
  project: any
  reports: any
  constructor(private ActivatedRoute: ActivatedRoute, private apollo: Apollo, private router: Router,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.checkJwt();
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
      console.log(this.project);
      this.reports = this.project.reports;
      console.log(this.reports)
    })
  }
  checkJwt(){
    var token = localStorage.getItem("token");
    if(token == null){
      this.router.navigate(['']);
    }
  }
  transform() {
    this.apollo.watchQuery({
      query: PROJECTEXCEL,
      variables: {
        id: this.id
      }
    }).valueChanges.subscribe(result => {
      console.log(result.data);
      saveAs(result.data["projectReport"], `Reporte.xls`)
    })
    
  }

}
