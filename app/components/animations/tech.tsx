import { motion } from "motion/react"

const exampleTech = [
    { key: "REACT" },
    { key: "NEXT.JS" },
    { key: "TAILWIND" },
    { key: "TYPESCRIPT" }
]

const listVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }
    }
}

const techVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 50,
        opacity: 1,
        transition: {
            x: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
            duration: 0.2
        }
    }
}

export default function TechAnimation() {
    return (
        <motion.ul
            className="flex flex-col mx-auto mb-20"
            initial="hidden"
            animate="visible"
            variants={listVariants}
        >
            {exampleTech.map((tech) => (
                <motion.li
                className="text-sm"
                    key={tech.key}
                    variants={techVariants}
                >
                    {tech.key}
                </motion.li>
            ))}
        </motion.ul>
    )
}