import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";

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

export default function SignUp() {
    const { inputs, handleChange, resetForm } = useForm({
        userName: "",
        userType: "",
        email: "",
        password: ""
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

    if (data?.createUser) {
        return (
            <p>Signed up with {data.createUser.email} - Please go ahead and sign in here <button><a href="/signin">Sign In</a></button></p>
        )
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Up for an Account</h2>
            <DisplayError error={error}></DisplayError>
            <fieldset>
                {/* <label htmlFor="name">
                    First Name
                    <input
                        // required
                        type="text"
                        name="firstName"
                        placeholder="Your First Name"
                        autoComplete="given-name"
                        value={inputs.firstName}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    Last Name
                    <input
                        // required
                        type="text"
                        name="lastName"
                        placeholder="Your Last Name"
                        autoComplete="family-name"
                        value={inputs.lastName}
                        onChange={handleChange}
                    />
                </label> */}
                <label htmlFor="userName">
                    User Name
                    <input
                        required
                        type="text"
                        name="userName"
                        placeholder="Your User Name"
                        autoComplete="userName"
                        value={inputs.userName}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="userType">
                    Signing up as a
                    <select
                        required
                        name="userType"
                        value={inputs.userType}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>Select Account Type</option>
                        <option value="Student">Student</option>
                        <option value="Tutor">Tutor</option>
                    </select>
                </label>
                <label htmlFor="email">
                    Email
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign Up</button>
            </fieldset>
        </Form>
    );
}