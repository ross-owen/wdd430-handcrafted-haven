import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <Link href="/">
            <div>
                <Image src="/images/handcrafted_haven_small.webp" width={50} height={50} alt="Handcrafted Haven Logo"/>
            </div>
        </Link>
    );
}