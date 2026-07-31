import Link from 'next/link';

export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-purple-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <h1 className="gradient-text text-2xl font-bold">Eventra</h1>
        </div>

        <ul className="hidden md:flex gap-8 items-center">
          <li>
            <Link href="#features" className="hover:text-purple-400 transition duration-300">
              Features
            </Link>
          </li>
          <li>
            <Link href="#events" className="hover:text-purple-400 transition duration-300">
              Events
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-purple-400 transition duration-300">
              Contact
            </Link>
          </li>
        </ul>

        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 rounded-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl">
          Get Started
        </button>
      </nav>
    </header>
  );
}
