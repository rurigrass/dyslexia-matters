import Link from "next/link";

export default function Nav() {
    return <nav>
        <Link href="/tutor-hub">Tutor Hub</Link>
        <Link href="/student-hub">Student Hub</Link>
        <Link href="/resources">Resources</Link>
    </nav>
}