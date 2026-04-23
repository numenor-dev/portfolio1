import Link from "next/link";

export default function Footer() {

    return (
        <footer className="flex border-t border-zinc-50/20">
            <span className="flex mx-auto h-24 space-x-12 items-center">
                <Link href="https://linkedin.com"
                    className="hover:text-sky-400/80 transition-colors duration-500">
                    LinkedIn
                </Link>
                <Link href="https://github.com"
                    className="hover:text-sky-400/80 transition-colors duration-500">
                    Github
                </Link>
            </span>
        </footer>
    )
}