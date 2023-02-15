import dayjs from "dayjs";
import { z } from "zod";
import prisma from "../database";
import { FastifyRequest } from "fastify";

export const toggleController = async (req: FastifyRequest) => {
    const paramsValidation = z.object({
        id: z.string().uuid()
    });

    const { id } = paramsValidation.parse(req.params);


    const today = dayjs().startOf("day").toDate();


    let day = await prisma.day.findUnique({
        where: {
            date: today
        }
    });

    if (!day) {
        day = await prisma.day.create({
            data: {
                date: today
            }
        });
    }

    const completedHabit = await prisma.dayHabit.findUnique({
        where: {
            day_id_habit_id: {
                day_id: day.id,
                habit_id: id
            }
        }
    });


    if (completedHabit) {
        await prisma.dayHabit.delete({
            where: {
                id: completedHabit.id
            }
        });
    } else {
        await prisma.dayHabit.create({
            data: {
                day_id: day.id,
                habit_id: id,
                created_at: today
            }
        });
    }

};