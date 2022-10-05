import Form from "../styles/Form";
import useForm from "../../lib/useForm";
import AccountInfo from "./AccountInfo";
import PersonalInfo from "./PersonalInfo";
import ProfileInfo from "./ProfileInfo";
import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { DisplayError, MissingInputs } from "../ErrorMessage";

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
    const [missingInputs, setMissingInputs] = useState(false)

    //these have to be in order of appearance
    const { inputs, handleChange, resetForm, validations } = useForm({
        userType: "",
        userName: "",
        email: "",
        password: "",
        firstName: "",
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
        // const res = 
        await signup().catch(console.error);
        // resetForm();
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


    //CHECK WHAT VALUES ARE NOT FILLED IN YET AND RETURN ERROR
    //returns numbers to slice necessary formTitles e.g. returns 0,4 to slice out formTitles from page 0
    // let cunning
    function getSliceValues(page) {
        let [prevCounter, counter] = [0, 0]
        for (let i = 0; i <= page; i++) {
            // cunning = counter + formTitles[i].length
            counter = counter + formTitles[i].length
            prevCounter = counter - formTitles[i].length
        }
        return [prevCounter, counter]
    }

    //log below the result from above
    // console.log(getSliceValues(page));
    const inputsInPage = Object.values(validations).slice(getSliceValues(page)[0], getSliceValues(page)[1])
    const inputsValid = inputsInPage.every(value => value);
    const inputsMissing = Object.keys(validations).slice(getSliceValues(page)[0], getSliceValues(page)[1]).filter(key => !validations[key])
    // console.log(validations);
    // console.log(inputsValid);
    // console.log(inputsMissing);

    if (data?.createUser) {
        return (
            <p>Signed up with {data.createUser.email} - Please go ahead and sign in here <button><a href="/signin">Sign In</a></button></p>
        )
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Up for an Account</h2>
            <DisplayError error={error} />
            {missingInputs === true ? <MissingInputs inputsMissing={inputsMissing} /> : null}
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
                            if (inputsValid === true) {
                                e.preventDefault()
                                setMissingInputs(false)
                                setPage((currPage) => currPage + 1);
                            } else {
                                setMissingInputs(true)
                            }
                        }}
                    >
                        Next ⮕
                    </button>}
            </div>

        </Form>
    )
}