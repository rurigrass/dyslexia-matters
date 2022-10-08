import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import useForm from "../lib/useForm"
import Form from "./styles/Form"
import { DisplayError } from "./ErrorMessage"
import { ALL_PRODUCTS_QUERY } from "./Products"
import Router from "next/router"

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
        # which variables are getting passed in? And what types are they
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload
    ) {
        createProduct(
            data: {
            name: $name,
            description: $description,
            price: $price,
            status: "AVAILABLE"
            photo: {
                create: {
                    image: $image,
                    altText: $name
                }
            }
        }) {
            id
            name
            description
            price
        }
}
`

export default function CreateProduct() {
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        image: null,
        name: '',
        price: 0,
        description: ''
    })
    const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: ALL_PRODUCTS_QUERY }]
    });

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            // submit the inpit fields to the backend
            const res = await createProduct();
            clearForm();
            //Go to that product's page
            Router.push({
                pathname: `/product/${res.data.createProduct.id}`
            })
        }}>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="image">
                    Image
                    <input
                        required
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </label>
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
                <button type="submit">+ Add Product</button>
                {/* <button type="button" onClick={clearForm}>Clear Form</button>
            <button type="button" onClick={resetForm}>Reset Form</button> */}
            </fieldset>
        </Form>
    )
}