import Link from "next/link";
import NavStyles from "./styles/NavStyles";

export default function Nav() {
    return <NavStyles>
        <Link href="/tutor-hub">Tutor Hub</Link>
        <Link href="/student-hub">Student Hub</Link>
        <Link href="/resources">Resources</Link>
        <Link href="/products">Products</Link>
        <Link href="/sell">Sell Product</Link>
    </NavStyles>
}