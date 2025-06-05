import Link from "next/link";
import Image from "next/image";

export default function Logo({size}: {size: string}) {
    if (!size) {
        size = "small"
    }
    const src = `/images/handcrafted_haven_${size}.webp`;
    let width = 50;
    let height = 50;

    if (size === "large") {
        width = 600;
        height = 600;
    } else if (size === "medium") {
        width = 300;
        height = 300;
    }

    return (
        <Link href="/">
            <div>
                <Image src={src} width={width} height={height}
                       alt="Handcrafted Haven Logo"/>
            </div>
        </Link>
    );
}