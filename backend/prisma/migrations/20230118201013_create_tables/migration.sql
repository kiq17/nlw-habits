-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "habitDaysWeek" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habbit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "dayHabits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "habitDaysWeek_habbit_id_week_day_key" ON "habitDaysWeek"("habbit_id", "week_day");

-- CreateIndex
CREATE UNIQUE INDEX "dayHabits_day_id_habit_id_key" ON "dayHabits"("day_id", "habit_id");
