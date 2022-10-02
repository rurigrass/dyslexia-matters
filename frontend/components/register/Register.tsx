import Form from "../styles/Form";
import useForm from "../../lib/useForm";
import AccountInfo from "./AccountInfo";
import PersonalInfo from "./PersonalInfo";
import ProfileInfo from "./ProfileInfo";
import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import DisplayError from "../ErrorMessage";

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION ($userName: String!, $userType: String!, $email: String!, $password: String!) {
        createUser(data: {
            userName: $userName
            userType: $userType
            email: $email
            password: $password
        }) {
            id
            userName
            userType
            email
        }
    }
`;

export default function Register() {
    const [page, setPage] = useState(0);

    const { inputs, handleChange, resetForm } = useForm({
        userType: "",
        userName: "",
        email: "",
        password: "",
        // firstName: "",
        // lastName: "",
        // description: ""
    });

    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
        //refetch the currently logged in user
        // refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await signup().catch(console.error);
        console.log(res);
        resetForm();
        // Send the email and password to the graphql API
    }

    const formTitles = [["userType", "userName", "email", "password"], ["Personal Information"], ["Profile Information"]];

    let pageDisplay;
    if (page === 0) {
        pageDisplay = <AccountInfo handleChange={handleChange} inputs={inputs} />
    } else if (page === 1) {
        pageDisplay = <PersonalInfo handleChange={handleChange} inputs={inputs} />
    } else {
        pageDisplay = <ProfileInfo handleChange={handleChange} inputs={inputs} />
    }

    // function handleChange(e) {
    //     console.log(e.target.checkValidity());
    //     // handleChanges()

    // }



    // console.log(inputs);
    // console.log(formTitles[page]);

    //function to ensure that all needed inputs are filled in to continue form. use checkvalidity()
    formTitles[page].forEach(e => {
        Object.keys(inputs).forEach(k => {
            if (e === k && inputs[k]) return console.log(e + " the same as " + k);
        })
        // console.log(e);
        // if (inputs.e)

    })

    if (data?.createUser) {
        return (
            <p>Signed up with {data.createUser.email} - Please go ahead and sign in here <button><a href="/signin">Sign In</a></button></p>
        )
    }


    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Up for an Account</h2>
            <DisplayError error={error}></DisplayError>
            <div>{pageDisplay}</div>
            <div>
                <button
                    disabled={page === 0}
                    onClick={(e) => {
                        e.preventDefault()
                        setPage((currPage) => currPage - 1);
                    }}
                >
                    ⬅ Prev
                </button>
                {page === formTitles.length - 1 ?
                    <button type="submit">Sign Up ⬆</button>
                    : <button
                        onClick={(e) => {
                            if (page === formTitles.length - 1) {
                                alert("FORM SUBMITTED");
                            } else {
                                e.preventDefault()
                                setPage((currPage) => currPage + 1);
                            }
                        }}
                    >
                        Next ⮕
                    </button>}
            </div>

        </Form>
    )
}