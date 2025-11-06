"use client"

import YinYangBackground from "@/components/ui/Background";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import Footer from "../sections/Footer";

export default function AnkiPage() {
  const steps = [
    {
      number: "01",
      title: "Install Anki",
      description: "Download and install Anki on your computer. Anki is a free, open-source flashcard program that uses spaced repetition.",
      details: [
        "Visit ankiweb.net and download Anki",
        "Install Anki for your operating system (Windows, Mac, or Linux)",
        "Create an AnkiWeb account (optional but recommended for syncing)",
        "Launch Anki to make sure it's working properly"
      ],
      link: {
        text: "Download Anki",
        url: "https://apps.ankiweb.net/"
      }
    },
    {
      number: "02",
      title: "Install AnkiConnect Add-on",
      description: "AnkiConnect allows JLPTDojo to communicate with Anki and automatically create flashcards.",
      details: [
        "Open Anki and go to Tools → Add-ons → Get Add-ons",
        "Enter the code: 2055492159",
        "Click OK and wait for the installation to complete",
        "Restart Anki to activate AnkiConnect",
        "The add-on will run silently in the background"
      ],
      link: {
        text: "AnkiConnect Documentation",
        url: "https://ankiweb.net/shared/info/2055492159"
      },
      code: "2055492159"
    },
    {
      number: "03",
      title: "Keep Anki Running",
      description: "For JLPTDojo to export cards, Anki must be open in the background while you're studying.",
      details: [
        "Launch Anki before using JLPTDojo",
        "Keep Anki running in the background (minimize the window)",
        "Don't close Anki while exporting vocabulary",
        "The export process only takes a few seconds per card"
      ],
    },
    {
      number: "04",
      kanji: "出",
      title: "Export & Review Cards",
      description: "Export your vocabulary from JLPTDojo directly to Anki with a single click.",
      details: [
        "Select the vocabulary words you want to export",
        "Click the 'Export to Anki' button",
        "Cards will be added to your 'Default' deck in Anki",
        "Open Anki to review and customize your new cards",
        "Study your cards using Anki's spaced repetition algorithm"
      ],
    }
  ];

  return (
    <div className="min-h-screen relative bg-gray-400 dark:bg-black text-black dark:text-white">
        <YinYangBackground />

        <div className="relative z-10 container mx-auto p-4 md:p-8">
            <div className="text-center mb-16 pt-8">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Anki Integration Guide</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Export your vocabulary from JLPTDojo directly to Anki
                </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
                {steps.map((step) => (
                    <div key={step.number}
                    className="relative backdrop-blur-xl bg-white/80 dark:bg-black/80 border-2 border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-500 group">
                        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-black/30 dark:border-white/30" />
                        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-black/30 dark:border-white/30" />
                        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-black/30 dark:border-white/30" />
                        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-black/30 dark:border-white/30" />

                        <div className="relative z-10">
                            <div className="flex items-start gap-6 mb-6">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-2xl font-bold">
                                        {step.number}
                                    </div>
                                </div> 

                                <div className="flex-1">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-3">{step.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {step.details.map((detail, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <ArrowRight />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            {step.code && (
                                <div className="mb-6 p-4 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Add-on Code: </p>
                                            <code className="text-2xl font-bold tracking-widest">{step.code}</code>
                                        </div>

                                        <button onClick={() => navigator.clipboard.writeText(step.code)}
                                            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:scale-105 transition-transform text-sm">
                                            Copy Code
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step.link && (
                                <a href={step.link.url} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-black dark:text-white font-semibold hover:underline underline-offset-4">
                                    {step.link.text} <ClipboardCheck />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
    </div>
  );
}