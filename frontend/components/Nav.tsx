import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";

export default function Nav() {
    //check who the user is
    //TODO add userType 'tutor' 'student' etc
    const user = useUser()
    console.log(user);

    //show all the links in the header
    return <NavStyles>
        <Link href="/student-hub">Student Hub</Link>
        <Link href="/resources">Resources</Link>
        <Link href="/products">Products</Link>
        {!user && (
            <>
                <Link href="/signin">Sign In</Link>
            </>
        )
        }
        {
            user && (
                <>
                    <Link href="/tutor-hub">Tutor Hub</Link>
                    <Link href="/sell">Sell Product</Link>
                    <Link href="/account">Account</Link>
                </>
            )
        }
    </NavStyles>
}