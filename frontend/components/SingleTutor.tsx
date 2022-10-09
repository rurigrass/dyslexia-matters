import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import { DisplayError } from "./ErrorMessage";
import styled from 'styled-components';

const SINGLE_USER_QUERY = gql`
    query SINGLE_USER_QUERY($id: ID!) {
    user(where: { id: $id }) {
      userName
      id
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

export default function SingleTutor({ id }) {
    const { data, loading, error } = useQuery(SINGLE_USER_QUERY, {
        variables: {
            id
        },
    });
    if (loading) return <p></p>
    if (error) return <DisplayError error={error} />

    const { user } = data
    console.log(user);

    return (
        <>
            <div>single tutor {user.userName}</div>
            {user.photo ? <img
                src={user.photo.image.publicUrlTransformed}
                alt={user.photo.altText} /> : null}
        </>
    )
}