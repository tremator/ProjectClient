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
           user{
               name
           }
       }
    }
}
`;
export const PROJECTEXCEL = gql`
query($id: Int!, $initialDate: String, $endDate: String) {
    projectReport(id: $id, initialDate:$initialDate, endDate: $endDate)
}
`;
