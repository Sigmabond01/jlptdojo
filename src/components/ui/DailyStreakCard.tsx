"use client"
import {  ChevronLeftIcon, ChevronRightIcon } from "lucide-react"; // Import Chevrons
import { useState, useMemo } from "react";

type Streak = {
    [date: string] : number;
};

interface Props {
    streakData: Streak; // FIX: Renamed prop from 'streak' to 'streakData'
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DailyStreakCard({ streakData }: Props) { // FIX: Destructure 'streakData'
    const [currentDate, setCurrentDate] = useState(new Date());

    const {currentMonth, currentYear, daysMonth, firstDay }= useMemo(() => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        return {
            currentMonth: date.getMonth(),
            currentYear: date.getFullYear(),
            daysMonth: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
            firstDay: date.getDay(),
        };
    }, [currentDate]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const changeMonth = (offset: number) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    const getDayStyle = (day: number) => {
        const dayDate = new Date(currentYear, currentMonth, day);
        dayDate.setHours(0, 0, 0, 0);

        const isoDate = dayDate.toISOString().split('T')[0];
        const count = streakData[isoDate] ?? 0; // FIX: Use 'streakData'

        const isToday = dayDate.getTime() === today.getTime();
        const isPast = dayDate < today;

        let styles = 'flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium';

        if(count >= 5) {
            styles += ' bg-green-500/20 text-green-300 border border-green-500';
        } else if (isPast && count < 5) {
            //spacing beofre classes here
            styles += ' bg-red-500/20 text-red-300 border border-red-500'
        } else if (isToday) {
            styles += ' bg-blue-500/20 text-blue-300 border border-blue-500 font-bold';
        } else {
            styles += ' text-gray-400'
        }
        return styles;
    };

    return (
        <div className="p-4 bg-gray-200 dark:bg-black border-2 border-black/10 dark:border-white/10 rounded-2xl relative">
            <h3 className="text-center text-md mb-2">Daily streak (5 words)</h3>

            <div className="flex items-center justify-between mb-3 px-2">
                <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-white/10">
                    <ChevronLeftIcon className="w-5 h-5" /> {/* FIX: Use imported Chevrons */}
                </button>
                <div className="font-semibold text-gray-600 text-sm">
                    {new Date(currentYear, currentMonth).toLocaleString('default', {month: 'long', year: 'numeric'})}
                </div>
                <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-white/10">
                    <ChevronRightIcon className="w-5 h-5" /> {/* FIX: Use imported Chevrons */}
                </button>
            </div>

            <div className="grid grid-cols-7">
                {days.map(day => (
                    <div key={day} className="text-xs font-bold text-center text-gray-500 dark:text-gray-400 pb-2">
                        {day}
                    </div>
                ))}

                {Array.from({length: firstDay}).map((_, i) => (
                    <div key={`empty-${i}`}></div>
                ))}

                {Array.from({ length: daysMonth }).map((_, i) => {
                    const day = i + 1;
                    return (
                        <div key={day} className={getDayStyle(day)}> {day} </div>
                    );
                })}
            </div>
        </div>
    )
}