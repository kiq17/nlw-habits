import dayjs from "dayjs";
import { z } from "zod";
import prisma from "../database";
import { FastifyRequest } from "fastify";


export const dayController = async (req: FastifyRequest) => {
    const dayValidation = z.object({
        data: z.coerce.date()
    });

    const { data } = dayValidation.parse(req.query);

    const weekDay = dayjs(data).get("day");

    const habitPerDay = await prisma.habit.findMany({
        where: {
            created_at: {
                lte: data
            },
            habitDayWeek: {
                some: {
                    week_day: weekDay
                }
            }
        }
    });

    const day = await prisma.day.findFirst({
        where: {
            date: new Date(data)
        },
        include: {
            dayHabits: true
        }
    });

    const completedDays = day?.dayHabits.map(dayHabit => {
        return dayHabit.habit_id;
    }) ?? [];

    return {
        habitPerDay,
        completedDays
    };
};