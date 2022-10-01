import { useQuery } from "@apollo/client";
import gql from "graphql-tag"

//TODO add userType and use it 
export const CURRENT_USER_QUERY = gql`
    query {
        authenticatedItem {
            ... on User {
                id
                userName
                email
                userType
                # query the cart once we have it
            }
        }
    }
`;

export function useUser() {
    const { data } = useQuery(CURRENT_USER_QUERY)

    return data?.authenticatedItem;
}

