import Link from "next/link";
import Nav from "@/app/ui/nav/nav";
import Logo from "@/app/ui/nav/logo";

export default function Header() {
    return (
        <header>
            <Logo />
            <Nav />
        </header>
    )
}