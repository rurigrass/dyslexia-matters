import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const ALL_USERS_QUERY = gql`
 query ALL_USERS_QUERY {
  users
   (where: {userType: {equals: "Tutor"}} )
  {
    userName
    email
    userType
    photo {
      id
      image {
        publicUrlTransformed
      }
    }
  }
}`;

const TutorListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`

export default function Users() {
  const { data, error, loading } = useQuery(ALL_USERS_QUERY);
  console.log(data, error, loading);
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return <div>
    <TutorListStyles>
      {data.users.map((user, key) =>
        <div key={key}>
          <p>{user.userName}</p>
        </div>)}
    </TutorListStyles>
  </div>
}