import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
    await prisma.habit.deleteMany();
    await prisma.day.deleteMany();
}

run()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    });