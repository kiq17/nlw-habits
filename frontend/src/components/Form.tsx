import { FaCheck } from "react-icons/fa";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import api from "../services/api";
import { ToastComponent } from "./Toast";
const daysName = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
];

const Form = () => {
    const [title, setTitle] = useState("")
    const [weekDays, setWeekDays] = useState<number[]>([]);
    const [error, setError] = useState(false);

    const catchFormValues = async (e: FormEvent) => {
        e.preventDefault();
        if (!title || weekDays.length == 0) {
            setError(true);
            return;
        }

        try {
            await api.post("criar", {
                title,
                weekDays
            });
        } catch (error) {
            console.log(error);
        }

        alert("Hábito criado!");

        setTitle("");
        setWeekDays([]);
    }

    const toggleWeek = (day: number) => {
        if (weekDays.includes(day)) {
            const filteredWeekDays = weekDays.filter(dayInside => dayInside != day);

            setWeekDays(filteredWeekDays);
        } else {
            const arrayPush = [...weekDays, day];

            setWeekDays(arrayPush);
        }
    }

    return (
        <form onSubmit={catchFormValues} className="flex flex-col gap-4">
            <h3 className="text-center font-bold mb-3 text-2xl">
                Criar Hábito
            </h3>
            <label
                htmlFor="title"
                className="text-base font-semibold"
            >
                Qual seu comprometimento?
            </label>
            <input
                type="text"
                name="title"
                className="outline-none w-full border-0 p-3 bg-zinc-600 rounded-md"
                placeholder="Estudar, Beber água..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label
                htmlFor="titulo"
                className="text-base font-semibold"

            >
                Quais dias?
            </label>
            <div className="my-2 grid grid-rows-4 grid-flow-col gap-3">
                {daysName.map((day, index) => {
                    return (
                        <Checkbox.Root
                            key={day}
                            className="flex gap-3 items-center group"
                            checked={weekDays.includes(index)}
                            onCheckedChange={() => toggleWeek(index)}
                        >
                            <div className="h-8 w-8 bg-zinc-700 border-2 border-zinc-600 flex items-center justify-center group-data-[state='checked']:bg-green-500 rounded-md hover:bg-zinc-600 transition duration-300">
                                <Checkbox.Indicator>
                                    <FaCheck />
                                </Checkbox.Indicator>
                            </div>
                            <span
                                className="text-white"
                            >{day}</span>
                        </Checkbox.Root>
                    )
                })}
            </div>

            <button
                type="submit"
                className="w-full p-3 bg-green-600 hover:bg-green-500 rounded-md font-semibold flex gap-3 items-center justify-center transition duration-300"

            >
                <FaCheck />
                Confirmar
            </button>
            {error && <ToastComponent/>}
        </form>
    )
};

export default Form;

