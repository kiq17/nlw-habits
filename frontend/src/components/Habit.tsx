import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import ProgressBar from "./ProgressBar";
import dayjs from "dayjs";
import HabitList from "./HabitList";
import { useState } from "react";

interface IHabitsProp {
    date: Date
    defaultCompleted?: number
    amount?: number
}

const Habit = ({ defaultCompleted = 0, amount = 0, date }: IHabitsProp) => {
    const [completed, setCompleted] = useState(defaultCompleted);

    const completPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;


    const dateFormat = date.toLocaleDateString().slice(0, 5);
    const dayOfWeek = dayjs(date).format("dddd")

    const handleComplted = (completed: number) => {
        setCompleted(completed);
    }

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx("w-10 h-10 rounded-lg border-2 m-1 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900", {
                "bg-zinc-800 border-zinc-700": completPercentage == 0,
                "bg-violet-900 border-violet-700": completPercentage > 0 && completPercentage < 20,
                "bg-violet-800 border-violet-600": completPercentage >= 20 && completPercentage < 40,
                "bg-violet-700 border-violet-600": completPercentage >= 40 && completPercentage < 60,
                "bg-violet-600 border-violet-500": completPercentage >= 60 && completPercentage < 80,
                "bg-violet-500 border-violet-400": completPercentage >= 80

            })} />

            <Popover.Portal>
                <Popover.Content className="w-72 p-6 rounded-lg bg-zinc-800 flex flex-col focus:outline-none">
                    <span className="text-zinc-400 text-sm first-letter:uppercase">{dayOfWeek}</span>
                    <span className="font-extrabold text-3xl tracking-wide">{dateFormat}</span>

                    <ProgressBar progress={completPercentage} />

                    <HabitList
                        data={date}
                        onChangeCompleted={handleComplted}
                    />

                    <Popover.Arrow height={8} width={16} className="fill-zinc-800" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default Habit;