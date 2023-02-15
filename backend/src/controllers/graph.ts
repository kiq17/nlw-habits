import dayjs from "dayjs";
import prisma from "../database";

export const graphController = async () => {
    const daysHabitCompleted: Array<{ date: Date, completed: number }> = await prisma.$queryRaw`
        SELECT D.date,
        (
            SELECT 
                cast(count(*) as float)
            FROM dayHabits DH 
            WHERE DH.day_id = D.id   
        ) as completed
        FROM 
        days D
        INNER JOIN 
        dayHabits DH
        ON D.id = DH.day_id
    `;

    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    const countItems: Record<string, number> = {};
    let graphOptions: Array<{ month: string, completed: number }> = [];

    daysHabitCompleted?.forEach((item) => {
        const numberOfMonth = dayjs(item.date).month();
        { countItems[numberOfMonth] = (countItems[numberOfMonth] || 0) + 1; }
    });

    for (const i of Object.keys(countItems)) {
        graphOptions = [...graphOptions, { month: months[parseInt(i)], completed: countItems[i] }];
    }

    return graphOptions;
};