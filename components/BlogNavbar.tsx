import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function BlogNavbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900">
            <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo / Home Link */}
                <Link 
                    href="/" 
                    className="text-lg font-bold tracking-tight text-white hover:text-purple-400 transition-colors"
                >
                    Bimlesh.
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
                    <Link href="/blog" className="hover:text-purple-400 transition-colors">
                        Blog
                    </Link>
                    <Link href="/#projects" className="hover:text-purple-400 transition-colors">
                        Projects
                    </Link>
                    
                    <div className="w-px h-4 bg-neutral-800 mx-2 hidden sm:block"></div>
                    
                    <div className="hidden sm:flex items-center gap-4">
                        <a href="https://github.com/bimlesharma" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <FaGithub className="text-lg" />
                        </a>
                        <a href="https://twitter.com/bimlesharma" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                            <FaXTwitter className="text-lg" />
                        </a>
                        <a href="https://www.linkedin.com/in/bimlesharma/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                            <FaLinkedin className="text-lg" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
