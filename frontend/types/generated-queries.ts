import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
const defaultOptions = {};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export const ProductDocument = gql`
  query Product($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      description
      photo {
        image {
          publicUrlTransformed
        }
        altText
      }
      price
    }
  }
`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */

export type ProductQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ProductQuery = {
  __typename?: "Query";
  product?:
  | {
    __typename?: "Product";
    id: string;
    name?: string | null | undefined;
    description?: string | null | undefined;
    price?: number | null | undefined;
    photo?:
    | {
      __typename?: "ProductImage";
      altText?: string | null | undefined;
      image?:
      | { __typename?: "CloudinaryImage_File"; publicUrlTransformed?: string | null | undefined }
      | null
      | undefined;
    }
    | null
    | undefined;
  }
  | null
  | undefined;
};

export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
}