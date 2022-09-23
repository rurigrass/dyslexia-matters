import { useMutation } from "@apollo/client"
import gql from "graphql-tag"

//1. graphql delete mutation
const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!) {
        deleteProduct(id: $id) {
            id
            name
        }
    }
`;

//2. updates ui instantly
function update(cache, payload) {
    cache.evict(cache.identify(payload.data.deleteProduct))
}

export default function DeleteProduct({ id, children }) {
    const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, { variables: { id }, update });
    return <button type="button" disabled={loading} onClick={() => {
        if (confirm(`Are you sure you want to delete this item?`)) {
            //go ahead and delete it
            deleteProduct().catch(err => alert(err.message))
        }
    }}>
        {children}
    </button>

}