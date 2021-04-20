import gql from 'graphql-tag';

export const GetProjects = gql`
query($id: Int) {
    users(id: $id) {
       name
       token
       id
       projects{
           id
           name
           description
           reports{
               id
               hours
           }
       }
    }
}
`;