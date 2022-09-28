import Form from "../styles/Form";
import useForm from "../../lib/useForm";
import AccountInfo from "./AccountInfo";
import PersonalInfo from "./PersonalInfo";
import { useState } from "react";



export default function Register() {
    const [page, setPage] = useState(0);

    const { inputs, handleChange, resetForm } = useForm({
        userType: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const formTitles = ["Account Information", "Personal Information", "Other"];

    let pageDisplay;
    if (page === 0) {
        pageDisplay = <AccountInfo handleChange={handleChange} inputs={inputs} />
    } else if (page === 1) {
        pageDisplay = <PersonalInfo handleChange={handleChange} inputs={inputs} />
    }

    console.log(inputs);
    console.log(page);


    return (
        <Form>
            <div>multi-step form</div>
            <div>{pageDisplay}</div>
            <div>
                <button
                    disabled={page == 0}
                    onClick={() => {
                        setPage((currPage) => currPage - 1);
                    }}
                >
                    Prev
                </button>
                <button
                    onClick={() => {
                        if (page === formTitles.length - 1) {
                            alert("FORM SUBMITTED");
                        } else {
                            setPage((currPage) => currPage + 1);
                        }
                    }}
                >
                    {page === formTitles.length - 1 ? "Submit" : "Next"}
                </button>
            </div>

        </Form>
    )
}