import gql from 'graphql-tag';

export const register = gql`
mutation($user: UserInput!) {
    createUser(input: $user) {
       name
       id
    }
}
`;