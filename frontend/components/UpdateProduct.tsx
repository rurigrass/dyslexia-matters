import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Form from "./styles/Form"
import DisplayError from "./ErrorMessage"
import useForm from "../lib/useForm"

//1. We need to get the exiting product
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

//2. we need to get the mutation to update the product
const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name:String
        $description: String
        $price: Int
    ) {
        updateProduct(
            id: $id
            data: {
                name: $name,
                description: $description,
                price: $price
            }
        ) {
            id
            name
            description
            price
        }
    }
`

export default function UpdateProduct({ id }) {
    //1. We need to get the exiting product
    const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, { variables: { id } });

    //2. we need to get the mutation to update the product
    const [updateProduct, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_PRODUCT_MUTATION)

    //2.5create a state for the form inputs
    const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product)
    if (loading) return <p>loading...</p>

    //3. We need the form to handle the updates
    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            // submit the inpit fields to the backend
            //tODO: handle submit
            const res = await updateProduct({
                variables: {
                    id,
                    name: inputs.name,
                    description: inputs.description,
                    price: inputs.price
                }
            });
            // clearForm();
            // //Go to that product's page
            // Router.push({
            //     pathname: `/product/${res.data.createProduct.id}`
            // })
        }}>
            <DisplayError error={error || updateError} />
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>
                <label htmlFor="name">
                    Name
                    <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="price">
                    Price
                    <input
                        required
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        value={inputs.price}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">+ Update Product</button>
                {/* <button type="button" onClick={clearForm}>Clear Form</button>
            <button type="button" onClick={resetForm}>Reset Form</button> */}
            </fieldset>
        </Form>
    )
}