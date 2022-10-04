export default function PersonalInfo({ handleChange, inputs }) {

    return (
        <fieldset>
            <label htmlFor="name">
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
            {/* <label htmlFor="name">
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
        </fieldset>
    )
}