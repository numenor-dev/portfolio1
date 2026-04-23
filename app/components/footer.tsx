import Link from "next/link";

export default function Footer() {

    return (
        <footer className="flex border-t border-zinc-50/20">
            <span className="flex mx-auto h-24 space-x-12 items-center">
                <Link href="https://linkedin.com"
                    className="border-b-2 border-transparent hover:border-b-sky-400/70 transition-colors duration-300">
                    LinkedIn
                </Link>
                <Link href="https://github.com"
                    className="border-b-2 border-transparent hover:border-b-sky-400/70 transition-colors duration-300">
                    Github
                </Link>
            </span>
        </footer>
    )
}