import { useMutation } from "@apollo/client"
import gql from "graphql-tag"

//1. graphql delete mutation
const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!) {
        deleteProduct(where: {id: $id}) {
            id
            name
        }
    }
`;

//2. updates ui instantly (doesnt really work)
function update(cache, payload) {
    console.log(payload);
    console.log(cache);

    console.log('running the update function after delete');
    cache.evict(cache.identify(payload.data.deleteProduct));
}



//Maybe push the user to a new page after an item is deleted. createProduct.tsx has something for this  
// Router.push({pathname: `/products`})

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