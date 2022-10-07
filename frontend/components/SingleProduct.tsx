import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import { DisplayError } from "./ErrorMessage";
import styled from 'styled-components';
import { useProductQuery } from "../types/generated-queries";

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
        products(
            where: {id: {equals: $id}}
        ) {
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
    // const { data, loading, error } = useProductQuery({ variables: { id } });
    const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: {
            id
        },
    });
    if (loading) return <p></p>
    if (error) return <DisplayError error={error} />

    const product = data.products[0]
    // console.log(products);

    return (
        <ProductStyles>
            <Head>
                <title>Dyslexia Matters | {product.name}</title>
            </Head>
            <img
                src={product.photo.image.publicUrlTransformed}
                alt={product.photo.altText} />
            <div className="details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
            </div>
        </ProductStyles>
    )

}