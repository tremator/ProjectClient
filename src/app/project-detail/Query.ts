import gql from 'graphql-tag';

export const GetProjects = gql`
query($id: Int) {
    projects(id: $id) {
        id
       name
       description
       users{
           id
           name
       }
       reports{
           id
           hours
           date
       }
    }
}
`;
export const GetUsers = gql`
query($id: Int) {
    users(id: $id) {
       name
       token
       id
       }
    
}
`;
export const PROJECTEXCEL = gql`
query($id: Int!, $initialDate: String, $endDate: String) {
    projectReport(id: $id, initialDate:$initialDate, endDate: $endDate)
}
`;

