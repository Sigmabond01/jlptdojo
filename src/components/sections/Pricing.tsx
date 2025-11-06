import { useState } from "react";
import YinYangBackground from "../ui/Background";
import { features } from "process";
import { ArrowRight, Check } from "lucide-react";


const CheckIcon = () => (
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black dark:text-white">
<path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);


const plans = [
{
name: "Free",
kanji: "白",
price: "$0",
period: "forever",
description: "Start your JLPT journey with basic lessons and vocab drills.",
features: [
"Access to N5 study materials",
"Daily vocab quizzes",
"Basic kanji tracker",
"Community support",
],
cta: "Start for Free",
highlight: false,
},
{
name: "Pro",
kanji: "黒",
price: "$5",
period: "/month",
description: "Level up your training with structured courses and analytics.",
features: [
"Full access up to N3",
"Smart progress analytics",
"Personalized study paths",
"Offline mode",
"Priority support",
"Ad-free experience",
],
cta: "Join the Dojo",
highlight: true,
},
{
name: "Sensei",
kanji: "師",
price: "$10",
period: "/month",
description: "Master the language with everything Pro + advanced tools.",
features: [
"Full N5–N1 access",
"AI-powered grammar correction",
"Custom kanji decks",
"One-on-one mock tests",
"Exclusive sensei resources",
"Lifetime updates",
],
cta: "Become Sensei",
highlight: false,
},
];

export default function Pricing() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <section className="relative py-20 bg-gray-400 dark:bg-black text-black dark:text-white overflow-hidden">
            <YinYangBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-7xl font-bold mb-4 tracking-tight">Choose Your Path</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Whether you are just starting out or aiming for N1 mastery, there is a path for every learner.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 scale-95">
                    {plans.map((plan, i) => (
                        <div key={plan.name}
                        className={`relative group transition-all duration-700 ${
                            plan.highlight ? 'md:-transalte-y-4' : ''
                        }`}
                        onMouseEnter={() => setHovered(plan.name)}
                        onMouseLeave={() => setHovered(null)}>
                            <div className={`relative p-8 rounded-2xl border-2 transition-all duration-700 ${
                                plan.highlight
                                ? "border-black dark:border-white bg-black/5 dark:bg-white/5 shadow-2xl"
                                : "border-black/20 dark:border-white/20 bg-white dark:bg-black hover:border-black/40 dark:hover:border-white/40"
                            } ${hovered === plan.name ? 'scale-105 shadow-2xl' : " "}`}>
<div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-black/30 dark:border-white/30" />
<div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-black/30 dark:border-white/30" />
<div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-black/30 dark:border-white/30" />
<div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-black/30 dark:border-white/30" />

                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-4 py1 text-sm font-bold rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="text-8xl font-bold text-center mb-4 opacity-10 dark:opacity-20 transition-all duration-500 group-hover:opacity-20 dark:group-hover:opacity-30 group-hover:scale-110">
                                {plan.kanji}
                            </div>

                            <div className="text-center mb-6">
                                <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                            </div>

                            <div className="text-center mb-6">
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-5xl font-extrabold">{plan.price} </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">{plan.period}</span>
                                </div>
                            </div>

                            <p className="text-center mb-8 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {plan.description}
                            </p>

                            <div className="h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent mb-8" />

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((features) => (
                                    <li key={features} className="flex items-start gap-3">
                                        <div className="mt-0.5 flex-shrink-0">
                                            <Check />
                                        </div>
                                        <span className="text-sm">{features}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                            className={`relative w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-500 overflow-hidden group/btn ${
                                plan.highlight
                                ? "bg-black dark:text-black text-white dark:bg-white hover:scale-105"
                                : "bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 border-2 border-black/20 dark:border-white/20"
                            }`}>
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {plan.cta} <ArrowRight />
                                </span>
                                {plan.highlight && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                                )}
                            </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        All plans include a 14-day money-back guarantee. Cancel anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}