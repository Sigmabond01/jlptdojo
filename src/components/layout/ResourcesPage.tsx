import Footer from "@/components/sections/Footer";
import YinYangBackground from "@/components/ui/Background";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";

const SUPABASE_STORAGE_URL =
  "https://yndshakxnqaszyssvqla.supabase.co/storage/v1/object/public/jlpt-public";

const resourceCategories = [
  {
    level: "JLPT N5",
    links: [
      {
        title: "JLPT N5 - 1992",
        href: `${SUPABASE_STORAGE_URL}/N5-1992.pdf`,
        icon: "pdf" as const,
        download: true,
      },
      {
        title: "JLPT N5 - 2010/11",
        href: `${SUPABASE_STORAGE_URL}/N5-2010-11.pdf`,
        icon: "pdf" as const,
        download: true,
      },
      {
        title: "JLPT N5 - 2012",
        href: `${SUPABASE_STORAGE_URL}/N5-2012.pdf`,
        icon: "pdf" as const,
        download: true,
      },
      {
        title: "JLPT N5 - 2013",
        href: `${SUPABASE_STORAGE_URL}/N5-2013.pdf`,
        icon: "pdf" as const,
        download: true,
      },
      {
        title: "JLPT N5 - 2017",
        href: `${SUPABASE_STORAGE_URL}/N5-2017.pdf`,
        icon: "pdf" as const,
        download: true,
      },
      {
        title: "JLPT N5 - 2018",
        href: `${SUPABASE_STORAGE_URL}/N5-2018.pdf`,
        icon: "pdf" as const,
        download: true,
      },
    ],
  },
  {
    level: "JLPT N4",
    links: [
      {
        title: "JLPT N4 - Paper-1",
        href: `${SUPABASE_STORAGE_URL}/N4-Paper-1.pdf`,
        icon: "pdf" as const,
        download: true,
      },
      {
        title: "JLPT N4 - Paper-2",
        href: `${SUPABASE_STORAGE_URL}/N4-Paper-2.pdf`,
        icon: "pdf" as const,
        download: true,
      },
      {
        title: "JLPT N4 - Paper-3",
        href: `${SUPABASE_STORAGE_URL}/N4-Paper-3.pdf`,
        icon: "pdf" as const,
        download: true,
      },
      {
        title: "JLPT N4 - Paper-4",
        href: `${SUPABASE_STORAGE_URL}/N4-Paper-4.pdf`,
        icon: "pdf" as const,
        download: true,
      },
      {
        title: "JLPT N4 - Paper-5",
        href: `${SUPABASE_STORAGE_URL}/N4-Paper-5.pdf`,
        icon: "pdf" as const,
        download: true,
      },
    ],
  },
  {
    level: "General Tools",
    links: [
      {
        title: "N5 Official Guide",
        description: "The best online Japanese-English dictionary.",
        href: `${SUPABASE_STORAGE_URL}/N5-Official-Guide.pdf`,
        icon: "pdf" as const,
        download: true,
      },
      {
        title: "Jisho.org",
        description: "The best online Japanese-English dictionary.",
        href: "https://jisho.org",
        icon: "external" as const,
        download: false,
      },
      {
        title: "Tae Kim's Guide to Japanese",
        description: "A popular, free online grammar guide.",
        href: "http://www.guidetojapanese.org/learn/grammar",
        icon: "external" as const,
        download: false,
      },
      { title: "Anki", 
        description: "The best spaced repetition system for flashcards.", 
        href: "https://apps.ankiweb.net/", 
        icon: "external" as const, download: false, 
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-400 dark:bg-black text-black dark:text-white flex flex-col">
        <YinYangBackground />
      <div className="text-center pt-12 space-y-4 mb-16">
        <h1 className="text-6xl font-semibold pt-8">Resources</h1>
        <p className="text-gray-600 dark:text-gray-400 text-xl font-semibold">
          Previous year papers and general websites
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 mb-12">
        {resourceCategories.map((category) => (
          <section key={category.level} className="space-y-6 pb-12">
            <h2 className="text-4xl font-semibold">{category.level}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.links.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={link.download}
                  className="group relative flex items-center gap-3 bg-neutral-100 dark:bg-neutral-900 border border-white/10 rounded-2xl hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-300 p-4"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    {link.icon === "pdf" ? (
                      <FileText className="w-5 h-5 text-red-400" />
                    ) : (
                      <ExternalLink className="w-5 h-5 text-blue-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-black dark:text-white font-semibold truncate">
                      {link.title}
                    </h3>
                  </div>

                  <ArrowRight className="w-4 h-4 text-gray-500 transform transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="pt-12">
      <Footer />
      </div>
    </div>
  );
}

