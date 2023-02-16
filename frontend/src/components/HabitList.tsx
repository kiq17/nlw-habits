import { FaCheck } from "react-icons/fa";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import api from "../services/api";
import dayjs from "dayjs";

interface IHabitsList {
    data: Date,
    onChangeCompleted: (completed: number) => void
}

interface habitsType {
    habitPerDay: Array<{
        id: string,
        title: string,
        created_at: string
    }>,
    completedDays: string[]
}

const HabitList = ({ data, onChangeCompleted }: IHabitsList) => {
    const [habits, setHabits] = useState<habitsType>()


    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const response = await api.get("day", {
                    params: {
                        data: data.toISOString()
                    }
                })
                setHabits(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchHabits();
    }, [])

    const isDatePast = dayjs(data).endOf("day").isBefore(new Date())

    const handleToggleHabit = async (habitId: string) => {
        try {
            await api.patch(`habit/${habitId}/toggle`);
        } catch (error) {
            console.log(error)
        }

        let filteredHabits: string[] = [];
        const isHabitCompleted = habits!.completedDays.includes(habitId);

        if (isHabitCompleted) {
            filteredHabits = habits!.completedDays.filter(id => id != habitId);
        } else {
            filteredHabits = [...habits!.completedDays, habitId];
        }

        setHabits({
            habitPerDay: habits!.habitPerDay,
            completedDays: filteredHabits
        })

        onChangeCompleted(filteredHabits.length)
    };

    return (
        <div className="mt-6 flex flex-col gap-3">
            {habits?.habitPerDay.map(habit => (
                <Checkbox.Root
                    key={habit.id}
                    onCheckedChange={() => handleToggleHabit(habit.id)}
                    checked={habits.completedDays.includes(habit.id)}
                    disabled={isDatePast}
                    className="flex gap-3 items-center group outline-none disabled:cursor-not-allowed">
                    <div className="h-8 w-8 bg-zinc-700 border-2 border-zinc-600 flex items-center justify-center group-data-[state='checked']:bg-green-500 rounded-md group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-gray-900">
                        <Checkbox.Indicator>
                            <FaCheck />
                        </Checkbox.Indicator>
                    </div>
                    <span
                        className="font-semibold text-lg group-data-[state='checked']:line-through group-data-[state='checked']:text-zinc-500"
                    >
                        {habit.title}
                    </span>
                </Checkbox.Root>
            ))}
        </div>
    )
};

export default HabitList;