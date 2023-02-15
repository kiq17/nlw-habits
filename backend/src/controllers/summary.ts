import prisma from "../database";

export const summaryController = async () => {
    const summary = await prisma.$queryRaw`

        SELECT 
        D.id, D.date,
        (
        SELECT 
            cast(count(*) as float)
        FROM dayHabits DH 
        WHERE DH.day_id = D.id   
        ) as completed,
        (
        SELECT 
            cast(count(*) as float)
        FROM habitDaysWeek HDW 
        JOIN habits H
        ON H.id = HDW.habbit_id
        WHERE HDW.week_day = cast(strftime("%w", D.date/1000.0, "unixepoch") as int)
        AND H.created_at <= D.date
        ) as amount
        FROM days D
    `;

    return summary;
};