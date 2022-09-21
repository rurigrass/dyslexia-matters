import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import DisplayError from "./ErrorMessage";
import styled from 'styled-components';

const ProductStyles = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    align-items: center;
    gap: 2rem;
    img {
        width: 100%;
        object-fit: contain;
    }
`

const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!) {
        Product(where: {
            id: $id
        }) {
    name
    price
    description
    id
    photo {
            altText
        image {
            publicUrlTransformed
        }
    }
  }
}
`

export default function SingleProduct({ id }) {
    const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, { variables: { id } });
    if (loading) return <p></p>
    if (error) return <DisplayError error={error} />
    const { Product } = data
    return (
        <ProductStyles>
            <Head>
                <title>Dyslexia Matters | {Product.name}</title>
            </Head>
            <img
                src={Product.photo.image.publicUrlTransformed}
                alt={Product.photo.altText} />
            <div className="details">
                <h2>{Product.name}</h2>
                <p>{Product.description}</p>
            </div>
        </ProductStyles>
    )

}