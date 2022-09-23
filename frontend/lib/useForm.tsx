import { useEffect, useState } from "react";

type ProductInputs = {
    name?: string;
    price?: number;
    description?: string;
    image?: File;
};

type UserInputs = {
    name?: string;
    email?: string;
    password?: string;
    token?: string;
};

type Inputs = ProductInputs & UserInputs;

export default function useForm(initial: Inputs = {}) {
    //create a state object for our inputs
    const [inputs, setInputs] = useState(initial);
    const initialValues = Object.values(initial).join("");

    //This function runs when the things we are watching change
    useEffect(() => {
        setInputs(initial);
    }, [initialValues]);

    // {
    //     name: 'wes',
    //     description: 'nice shoes',
    //     price: 1000
    // }

    function handleChange(e) {
        let { type, name, value } = e.target
        //fixes strings turning into numbers issue
        if (type === 'number') {
            value = parseInt(value)
        }
        if (type === 'file') {
            [value] = e.target.files;
        }
        //changes the state
        setInputs({
            //copy the existing state
            ...inputs,
            [name]: value
        })
    }

    //reset form to initial state
    function resetForm() {
        setInputs(initial)
    }

    //clear form
    function clearForm() {
        const blackState = Object.fromEntries(
            Object.entries(inputs).map(([key, value]) => [key, ""])
        )
        setInputs(blackState)
    }

    //return the things we want to surface from this custom hook
    return {
        inputs,
        handleChange,
        resetForm,
        clearForm
    }
}