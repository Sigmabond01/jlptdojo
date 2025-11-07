import { ArrowRight } from "lucide-react";
import YinYangBackground from "../ui/Background";

const courses = [
    {
        title: 'Basics',
        level: 'basics',
        description: 'Learn the alphabets of the Japanese language'
    },
    {
        title: 'Vocabulary',
        level: 'vocabulary',
        description: 'Master essential words and expressions for JLPT N5 and N4'
    },
    {
        title: 'Grammar',
        level: 'grammar',
        description: 'Learn fundamental grammar patterns and sentence structures'
    },
    {
        title: 'Kanji',
        level: 'kanji',
        description: 'Study Japanese characters with readings and meanings'
    },
]

export default function Courses() {
    return(
        <div id="courses" className="relative z-10 pt-24 pb-4 bg-gray-400 dark:bg-black text-black dark:text-white">
            <YinYangBackground />
            <div className="container mx-auto px-4 md:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
                        Available Courses
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Browse through our courses for all JLPT levels and begin your path to Japanese mastery
                    </p>
                </div>


``                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    {courses.map((item) => (
                        <a
                            key={item.level}
                            href={`/${item.level}`}
                            className="group relative backdrop-blur-sm bg-white/80 dark:bg-black/80 border-2 border-black/10 dark:border-white/10 rounded-3xl p-8 hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
                        >
                           <div className="relative z-10">
                                <h2 className="text-4xl font-bold mb-4 group-hover:translate-x-1 transition-transform">
                                    {item.title}
                                </h2>
                                
                                <p className="text-gray-600 dark:text-gray-400 mb-6 text-base leading-relaxed min-h-[3rem]">
                                    {item.description}
                                </p>

                                <div className="h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent mb-6" />

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold uppercase tracking-wider">
                                        Explore Course
                                    </span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Bottom CTA 
                <div className="mt-16 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Not sure where to start?
                    </p>
                    <Link href="/dashboard" className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-105 transition-transform duration-200 uppercase tracking-wider">
                        View Dashboard
                    </Link>
                </div> */}
            </div>
        </div>
    )
}