import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link"
import { DisplayError } from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

export const PAGINATION_QUERY = gql`
    query {
        _allProductsMeta {
            count
        }
    }
`

export default function Pagination({ page }) {
    const { data, loading, error } = useQuery(PAGINATION_QUERY);
    // console.log(data.count);

    if (loading) return <p>'Loading...'</p>;
    if (error) return <DisplayError error={error} />
    const { count } = data._allProductsMeta;
    const pageCount = Math.ceil(count / perPage)
    return (
        <PaginationStyles>
            <Head>Dyslexia Matters - Page {page} of ___</Head>
            <Link href={`/products/${page - 1}`} ><a aria-disabled={page <= 1}>⬅ Prev</a></Link>
            <p> Page {page} of {pageCount}</p>
            <p> {count} Items Total</p>
            <Link href={`/products/${page + 1}`}><a aria-disabled={page >= pageCount}>Next ⮕</a></Link>
        </PaginationStyles >
    )
}

// 1. Render the actual links
// 2. Allow for dynamic routing
// 3. Filter the products for the current page
// 4. Deal with Cache invalidation