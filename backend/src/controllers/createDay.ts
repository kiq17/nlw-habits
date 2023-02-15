import dayjs from "dayjs";
import { z } from "zod";
import prisma from "../database";
import { FastifyRequest } from "fastify";

export const createDayController = async (req: FastifyRequest) => {
    const habbitValidaiton = z.object({
        title: z.string(),
        weekDays: z.array(
            z.number().min(0).max(6)
        )
    });

    const { title, weekDays } = habbitValidaiton.parse(req.body);

    const data = dayjs().startOf("day").toDate();

    const habitCreated = await prisma.habit.create({
        data: {
            title,
            created_at: data,
            habitDayWeek: {
                create: weekDays.map(weekDay => {
                    return {
                        week_day: weekDay
                    };
                })
            }
        }
    });

    return habitCreated;
};