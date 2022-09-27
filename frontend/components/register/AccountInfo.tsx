export default function AccountInfo({ handleChange, inputs }) {

    return (
        <>
            <label htmlFor="userType">
                I am a
                <select
                    required
                    name="userType"
                    placeholder="Your Name"
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
        </>
    )
}