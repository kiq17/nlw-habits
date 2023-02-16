import Habit from "./Habit";
import firstOfYear from "../services/firstOfYear";
import api from "../services/api";
import { useEffect, useState } from "react";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const arraysDaysOfMonth = firstOfYear();


type summaryType = Array<{
    id: string,
    date: string,
    completed: number,
    amount: number
}>

const Days = () => {

    const [summary, setSummary] = useState<summaryType>([]);

    useEffect(() => {
        const fecthApi = async () => {
            try {
                const response = await api.get("summary");
                setSummary(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error)   
            }
        }
        fecthApi();
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3 items-center">
                {weekDays.map((day, index) => {
                    return (
                        <div
                            key={index}
                            className="text-zinc-500 h-10 w-10 flex items-center font-bold"
                        >
                            {day}
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-rows-7 grid-flow-col">
                {summary.length > 0 && arraysDaysOfMonth.map(dayMonth => {
                    const findDay = summary.find(item=> item.date == dayMonth.toISOString());

                    return <Habit
                        key={dayMonth.toString()}
                        date={dayMonth}
                        defaultCompleted={findDay?.completed}
                        amount={findDay?.amount}
                    />
                })}
            </div>
        </div>
    )
}

export default Days;