import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GetProjects, GetUsers, PROJECTEXCEL } from './Query';
import { UpdateProject, ADD_USER, DELETE_USER, CREATE_REPORT } from './Mutation';
import { DomSanitizer } from '@angular/platform-browser';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  id: number
  project: any
  currentUsers: any
  users: any
  form: any = {
    name: null,
    description: null,
  };
  formReport: any = {
    hours: null
  };
  constructor(private ActivatedRoute: ActivatedRoute, private apollo: Apollo, private router: Router,private sanitizer: DomSanitizer) {   

  }

  ngOnInit(): void {
    this.checkJwt();
    this.getProductId();
    this.getProject();
    this.getusers();
  }

  getProject(){
    this.apollo.watchQuery({
      query: GetProjects,
      variables: {
        id: this.id
      }
    }).valueChanges.subscribe(result => {
      
      this.project = result.data["projects"][0];
      this.currentUsers = this.project.users;
      console.log(this.currentUsers);
      this.form = {
        name : this.project.name,
        description: this.project.description
      }
    })
  }

  getProductId() {
    this.ActivatedRoute.paramMap.subscribe(param => {
      this.id = parseInt(param.get('id'));
      console.log(this.id);
    });
  }

  update(){
    const { name,description } = this.form;
    this.apollo.mutate({
      mutation: UpdateProject,
      variables: {
        id: this.id,
        project: {
          id: this.id,
          name: name,
          description: description
        }
      }
    }).subscribe( result =>{
      console.log(result.data)
      this.getProject();
    })
  }

  getusers(){
    this.apollo.watchQuery({
      query:GetUsers,
    }).valueChanges.subscribe(result => {
      
    
      this.users = result.data["users"];
      console.log(this.users);

    })
  
  }

  addUser(id: number){
    this.apollo.mutate({
      mutation: ADD_USER,
      variables: {
        projectUser: {
          "usersid": id,
          "projectsid": this.id
        }
      }
    }).subscribe(()=>{
      this.getProject();
    })
  }
  deleteUser(id: number){
    this.apollo.mutate({
      mutation: DELETE_USER,
      variables: {
        projectUser: {
          "usersid": id,
          "projectsid": this.id
        }
      }
    }).subscribe(()=>{
      this.getProject();
    })
  }

  createReport(){
    const { hours } = this.formReport;
    var idUser = localStorage.getItem("id");


    this.apollo.mutate({
      mutation: CREATE_REPORT,
      variables: {
        timeReport: {
          "userId": idUser,
          "proyectId": this.id,
          "hours": hours
        }
      }
    }).subscribe(result => {
      console.log(result.data);
    })
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['']);
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
    })
    //saveAs(this.base64data, `filename.xls`)
  }
}
