import AlphabetChart from "@/components/ui/AlphabetChart";
import Header from "../ui/Header";
import Footer from "../sections/Footer";
import FloatingNavbar from "../ui/FloatingNav";

export default function BasicsPage() {
    return (
        <div className="min-h-screen relative bg-gray-400 dark:bg-black text-black dark:text-white">
            <Header /> 
            <div className="pt-18 space-y-4">
            <h1 className="text-center text-5xl font-bold">Hiragana and Katakana</h1>
            <p className="text-center dark:text-gray-400 font-semibold">If you are completely new to Japanese, start by learning the alphabets</p>
            </div>
            <AlphabetChart />
            <Footer />
            <FloatingNavbar />
        </div>
    )
}