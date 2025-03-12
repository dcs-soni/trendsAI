export default function Footer() {
    return (
        <>
            <footer className="bg-foreground mt-auto py-6 text-center text-sm text-gray-400 border-t border-white/10">
            <div className="container mx-auto px-4">
              <p>
                Built by {" "}
                <a
                  href="https://divyanshusoni.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue/70 hover:text-blue/80 transition-colors cursor-pointer"
                >
                  Divyanshu Soni
                </a>
              </p>
              <p className="mt-1">
                © {new Date().getFullYear()} • Open source project
              </p>
            </div>
          </footer>
        </>
    )
}