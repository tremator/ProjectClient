import gql from 'graphql-tag';

export const register = gql`
query($user: UserInputType!) {
    createUser(input: $user) {
       name
       id
    }
}
`;