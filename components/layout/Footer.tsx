export default function Footer() {
    return (
        <footer className="border-t border-neutral-800 dark:border-neutral-700 mt-20">
            <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-500">
                <p>Darshit Lagdhir — Systems-Focused Developer</p>
                <p className="mt-2">© {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}
