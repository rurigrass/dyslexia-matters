import UpdateProduct from "../components/UpdateProduct";

export default function UpdatePage({ query }) {
    console.log(query);

    return <div>I am the update page
        <UpdateProduct id={query.id} />
    </div>
}