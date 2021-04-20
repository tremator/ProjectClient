import gql from 'graphql-tag';

export const LOGIN = gql`
query($name: String!, $password: String!) {
    login(name: $name, password: $password) {
    
       name
       token
       id
    }
}
`;