import gql from 'graphql-tag';

export const UpdateProject = gql`
mutation($id: Int!, $project: ProjectInput!) {
    updateProject(id: $id, input: $project) {
        id
       name
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
export const DELETE_USER = gql`
mutation($projectUser: ProjectUserInput!){
    deleteUserFromProject(input: $projectUser){
    id
    description
    users{
        name
        id
      }
  }
}
`;
export const CREATE_REPORT = gql`
mutation($timeReport: TimeReportInput!){
    createTimeReport(input: $timeReport){
    id
    hours
    date
  }
}
`;