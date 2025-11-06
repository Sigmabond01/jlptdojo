import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
  >
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface QuestionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const Question: React.FC<QuestionProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-black/20 dark:border-white/20 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left hover:opacity-70 transition-opacity group"
      >
        <h3 className="text-lg font-semibold text-black dark:text-white pr-8 group-hover:translate-x-1 transition-transform">
          {question}
        </h3>
        <div className="flex-shrink-0 text-black dark:text-white">
          <ChevronDownIcon isOpen={isOpen} />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const faqs = [
    {
      question: "What is JLPTDojo?",
      answer: "JLPTDojo is your personal Japanese fluency dojo. It combines structured lessons, interactive exercises, and real-time progress tracking to help you master Japanese efficiently."
    },
    {
      question: "How do I get started?",
      answer: "Sign up for an account, choose your level, and start with beginner-friendly lessons. The platform adapts to your progress and helps you steadily improve."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required."
    },
    {
      question: "Which JLPT levels are covered?",
      answer: "JLPTDojo covers N5 through N1 levels, providing exercises, vocabulary drills, and practice tests for each stage of the Japanese Language Proficiency Test."
    },
    {
      question: "Can I use JLPTDojo on mobile?",
      answer: "Absolutely! JLPTDojo is fully responsive and works seamlessly on smartphones, tablets, and desktop computers."
    },
    {
      question: "How do I track my progress?",
      answer: "Your dashboard shows completed lessons, practice scores, and overall fluency growth, helping you focus on areas that need improvement."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, subscriptions can be canceled at any time from your account settings. Your access will continue until the end of your billing cycle."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-400 dark:bg-black py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about JLPTDojo
          </p>
        </div>


        <div className="relative bg-white/80 dark:bg-neutral-950 backdrop-blur-xl border-2 border-black/10 dark:border-white/10 p-8 md:p-10 rounded-3xl mb-16 shadow-xl">

          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-black/30 dark:border-white/30" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-black/30 dark:border-white/30" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-black/30 dark:border-white/30" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-black/30 dark:border-white/30" />

          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <Question
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We are here to help. Send us a message and we will get back to you soon.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto p-8 md:p-10 bg-white/80 dark:bg-neutral-950 backdrop-blur-xl border-2 border-black/10 dark:border-white/10 rounded-3xl shadow-xl">

          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-black/30 dark:border-white/30" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-black/30 dark:border-white/30" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-black/30 dark:border-white/30" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-black/30 dark:border-white/30" />

          <h3 className="text-center text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-2">
            Contact Us
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 ml-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-black/20 dark:border-white/20 bg-transparent text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-black/20 dark:border-white/20 bg-transparent text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 ml-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
                rows={5}
                className="w-full px-5 py-4 rounded-xl border-2 border-black/20 dark:border-white/20 bg-transparent text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-black dark:focus:border-white transition-all duration-300 resize-none"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="relative w-full py-4 rounded-xl font-bold tracking-wide text-white bg-black dark:bg-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <ArrowRight />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}