import Link from "next/link";

export default function Tutor({ tutor }) {
    console.log(tutor);

    return (<div>
        <Link href={`/tutor/${tutor.id}`}>{tutor.userName}</Link>

    </div>)
}