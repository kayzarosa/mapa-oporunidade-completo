/*
  Warnings:

  - Made the column `date` on table `Process` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Process" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "jobUrl" TEXT,
    "expectation" TEXT,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Process" ("company", "createdAt", "date", "expectation", "id", "jobUrl", "note", "role", "updatedAt") SELECT "company", "createdAt", "date", "expectation", "id", "jobUrl", "note", "role", "updatedAt" FROM "Process";
DROP TABLE "Process";
ALTER TABLE "new_Process" RENAME TO "Process";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
