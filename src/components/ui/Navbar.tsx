"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

interface NavLink {
  name: string;
  to: string;
}

const links: NavLink[] = [
  { name: "Vocabulary", to: "/vocabulary" },
  { name: "Grammar", to: "/grammar" },
  { name: "Kanji", to: "/kanji" },
  { name: "Resources", to: "/resources" },
];

//@ts-expect-error it works man (will change this)
export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const foundLink = links.find((link) => pathname?.startsWith(link.to));
    if (foundLink) setActiveLink(foundLink.name);
  }, [pathname]);

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-20 py-4">
      <div className="max-w-9xl mx-auto flex items-center backdrop-blur-md dark:bg-neutral-950 bg-gray-200 border border-white/30 rounded-4xl justify-between px-6">
        <div className="flex flex-col items-start justify-center flex-shrink-0">
          <Logo />
        </div>

        <ul className="hidden md:flex items-right pl-44 space-x-10">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.to}
                onClick={() => handleLinkClick(link.name)}
                className={`relative font-medium transition-all duration-300 hover:text-gray-400 group ${
                  activeLink === link.name ? "text-gray-400" : "text-black dark:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gray-400 transform transition-transform duration-300 ${
                    activeLink === link.name
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Buttons on the right */}
        <div className="hidden md:flex items-center space-x-4 font-extrabold">
          <Link
            href="/register"
            className="dark:text-black text-white hover:text-gray-600 transition duration-300 p-2 rounded-xl hover:bg-white/10 bg-black dark:bg-white/80 px-6 py-2"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="dark:text-black text-white hover:text-gray-600 transition duration-300 p-2 rounded-xl hover:bg-white/10 bg-black dark:bg-white/80 px-6 py-2"
          >
            Login
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden bg-black ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 px-6 py-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.to}
                onClick={() => handleLinkClick(link.name)}
                className={`block font-medium py-2 px-4 rounded-lg transition hover:bg-white/10 ${
                  activeLink === link.name ? "text-blue-400" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-center space-x-6 mt-4 pt-4 border-t border-white/10 px-6">
          <Link
            href="/login"
            className="text-white/80 hover:text-white transition p-3 rounded-full hover:bg-white/10"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-white/80 hover:text-white transition p-3 rounded-full hover:bg-white/10"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
