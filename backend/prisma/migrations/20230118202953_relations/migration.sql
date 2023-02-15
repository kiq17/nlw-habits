-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dayHabits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "dayHabits_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "dayHabits_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_dayHabits" ("created_at", "day_id", "habit_id", "id") SELECT "created_at", "day_id", "habit_id", "id" FROM "dayHabits";
DROP TABLE "dayHabits";
ALTER TABLE "new_dayHabits" RENAME TO "dayHabits";
CREATE UNIQUE INDEX "dayHabits_day_id_habit_id_key" ON "dayHabits"("day_id", "habit_id");
CREATE TABLE "new_habitDaysWeek" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habbit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    CONSTRAINT "habitDaysWeek_habbit_id_fkey" FOREIGN KEY ("habbit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habitDaysWeek" ("habbit_id", "id", "week_day") SELECT "habbit_id", "id", "week_day" FROM "habitDaysWeek";
DROP TABLE "habitDaysWeek";
ALTER TABLE "new_habitDaysWeek" RENAME TO "habitDaysWeek";
CREATE UNIQUE INDEX "habitDaysWeek_habbit_id_week_day_key" ON "habitDaysWeek"("habbit_id", "week_day");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
