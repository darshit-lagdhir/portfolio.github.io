import Container from "@/components/layout/Container";

export default function Footer() {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800">
            <Container>
                <div className="py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-neutral-500">
                    <div>
                        <p>Darshit Lagdhir — Systems-Focused Developer</p>
                        <p className="mt-1">© {new Date().getFullYear()}</p>
                    </div>
                    <div className="flex gap-5 text-neutral-400 dark:text-neutral-500">
                        <a
                            href="https://github.com/darshitlagdhir"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/darshitlagdhir"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
