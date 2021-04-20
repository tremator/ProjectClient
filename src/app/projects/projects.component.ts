import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetProjects } from './Query';
import { CREATE_Project, ADD_USER } from './Mutation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: any
  userId: any
  newProjectId: any
  addusers: any
  form: any = {
    name: null,
    description: null,
  };
  constructor(private apollo: Apollo, private router: Router) { 
    this.projects = []
    this.newProjectId = Number;
  }

  ngOnInit(): void {
    this.getProjects();
    this.userId = localStorage.getItem("id");
  }


  createProject(){
    const { name,description } = this.form;
    this.apollo.mutate({
      mutation: CREATE_Project,
      variables: {
        project:{
          "name": name,
          "description": description
        }
      }
    }).subscribe(result =>{

      this.newProjectId = result.data["createProject"].id;
      this.addUser();
    })
  }

  getProjects(){
    this.apollo.watchQuery({
      query: GetProjects,
      fetchPolicy: 'network-only',
      variables: {
        id: localStorage.getItem("id")
      }
    }).valueChanges.subscribe(result => {
      this.projects = result.data["users"][0].projects;
      console.log(result.data["users"][0].projects);
    })

  }

  addUser(){
    
    var userid = localStorage.getItem("id");
    this.apollo.mutate({
      mutation: ADD_USER,
      variables: {
        projectUser: {
          "usersid": userid,
          "projectsid": this.newProjectId
        }
      }
    }).subscribe(()=>{

      this.getProjects();
    })
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['']);
  }

}
