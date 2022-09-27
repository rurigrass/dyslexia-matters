import Form from "../styles/Form";
import useForm from "../../lib/useForm";
import AccountInfo from "./AccountInfo";



export default function Register() {
    const { inputs, handleChange, resetForm } = useForm({
        userType: "",
        email: "",
        password: ""
    });


    console.log(inputs);


    return (
        <Form>
            <div>multi-step form</div>
            <AccountInfo handleChange={handleChange} inputs={inputs} />
        </Form>
    )
}