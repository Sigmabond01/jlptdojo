import Link from "next/link";
import { FaXTwitter, FaGithub, FaEnvelope } from "react-icons/fa6";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t dark:bg-neutral-950 bg-gray-400 border-white/10 backdrop-blur-lg text-sm">
      <div className="max-w-7xl mx-auto px-6 py-22 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
            <div className="pr-12">
          <Logo />
          </div>
          <p className="mt-2 text-white/50 text-sm leading-relaxed">
          JLPTDojo is your Japanese fluency dojo, combining structured lessons, interactive exercises, and real-time progress tracking to sharpen your language skills and build lasting mastery.
          </p>
        </div>

        <div>
          <h3 className="text-lg text-white mb-4">Content</h3>
          <ul className="space-y-3 text-white/40 text-sm">
            <li>
              <Link href="/" className="hover:text-gray-400 transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/vocabulary" className="hover:text-gray-400 transition-colors duration-200">
                Vocabulary
              </Link>
            </li>
            <li>
              <Link href="/grammar" className="hover:text-gray-400 transition-colors duration-200">
                Grammar
              </Link>
            </li>
            <li>
              <Link href="/kanji" className="hover:text-gray-400 transition-colors duration-200">
                Kanji
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-red-400 transition-colors duration-200">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg text-white mb-4">Support</h3>
          <ul className="space-y-3 text-white/40 text-sm">
            <li>
              <a
                href="https://kotonami.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Kotonami
              </a>
            </li>
            <li>
              <a
                href="https://kiban-one.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Kiban
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Sigmabond01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hray-400 transition-colors duration-200"
              >
                Send Feedback
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Sigmabond01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Report Bug
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg text-white mb-4 ml-28">Connect</h3>
          <div className="flex space-x-4 mb-6 pl-18">
            <a
              href="https://x.com/Sigmabond01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gray-400 transition-colors duration-200 text-xl p-2 rounded-lg hover:bg-white/5"
              aria-label="Follow us on X (Twitter)"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://github.com/Sigmabond01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gray-400 transition-colors duration-200 text-xl p-2 rounded-lg hover:bg-white/5"
              aria-label="View our GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:smdnoor4966@gmail.com"
              className="text-white/70 hover:text-gray-400 transition-colors duration-200 text-xl p-2 rounded-lg hover:bg-white/5"
              aria-label="Email us"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/50 text-xs text-center md:text-left">
            © {new Date().getFullYear()} JLPTDojo. All rights reserved.
          </div>
          <div className="flex space-x-2 text-white/50 text-xs items-center">
            Made by @Sigmabond01 on X(Twitter).
          </div>
        </div>
      </div>
    </footer>
  );
}
