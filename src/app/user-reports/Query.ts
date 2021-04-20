import gql from 'graphql-tag';

export const GetUser = gql`
query($id: Int) {
    users(id: $id) {
        id
       name
       reports{
           id
           hours
           date
           project{
               name
           }
       }
    }
}
`;