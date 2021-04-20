import gql from 'graphql-tag';
export const CREATE_Project = gql`
mutation($project: ProjectInput!){
    createProject(input: $project){
        id
        description
    }
  }
`;
export const ADD_USER = gql`
mutation($projectUser: ProjectUserInput!){
  addUser(input: $projectUser){
    id
    description
    users{
        name
        id
      }
  }
}
`;
export const DELETE_PROJECT = gql`
mutation($id: Int!){
  deleteProject(input: $id){
    id
    description
    
  }
}
`;