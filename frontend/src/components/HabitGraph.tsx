import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Area,

} from "recharts"
import api from "../services/api";

const HabitGraph = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("graph");
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <ResponsiveContainer width={"100%"} height={350}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#5b21b6" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#5b21b6" stopOpacity={0.03} />
                        </linearGradient>
                    </defs>

                    <Area dataKey={"completed"} stroke={"#5b21b6"} fill="url(#color)" />
                    <XAxis
                        dataKey={"month"}
                        tickLine={false}
                    />
                    <YAxis
                        dataKey={"completed"}
                        tickLine={false}
                        tickCount={3}
                        tickFormatter={number => number > 0 ? `${number} Hbts` : `${number} Hbt`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active) {
        return (
            <div className="w-full p-3 h-full bg-violet-800 shadow-2xl border-2 border-violet-600 rounded-md flex flex-col gap-2">
                <p className="font-semibold">{label}</p>
                <p className="text-zinc-400">Hábitos completados <span className="font-semibold text-white">{payload[0].value}</span></p>
            </div>
        );
    }

    return null;
}
export default HabitGraph;