import Link from "next/link";

export default function Footer() {

    const links = [
        { href: "/", label: "Home" },
        { href: "https://github.com/numenor-dev", label: "Github" },
        { href: "https://www.linkedin.com/in/nick-ahlers/", label: "LinkedIn" },
        { href: "https://drive.google.com/file/d/1kkW8Q4aUNFRU5HiaUEXNGrLURhW1DR4R/view?usp=sharing", label: "Resume" },
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="flex border-t border-zinc-50/20">
            <span className="flex mx-auto h-24 space-x-12 items-center">
                <ul className="flex items-center space-x-12">
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            {href === "/" ?
                                <Link
                                    href={href}
                                    onClick={scrollToTop}
                                    className="border-b-2 border-transparent hover:border-b-teal-400/70 transition-colors duration-300"
                                >
                                    {label}
                                </Link> :
                                <Link
                                    href={href}
                                    target="_blank"
                                    rel="noopener referrer"
                                    className="border-b-2 border-transparent hover:border-b-teal-400/70 transition-colors duration-300"
                                >
                                    {label}
                                </Link>}
                        </li>
                    ))}
                </ul>
            </span>
        </footer>
    )
}