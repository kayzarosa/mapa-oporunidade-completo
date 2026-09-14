-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "comment" TEXT,
    "challenge" TEXT,
    "deadline" DATETIME,
    "compensation" TEXT,
    "benefits" TEXT,
    "respondBy" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "processId" TEXT NOT NULL,
    CONSTRAINT "Stage_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stage" ("benefits", "challenge", "comment", "compensation", "createdAt", "date", "deadline", "id", "name", "processId", "respondBy", "status", "type", "updatedAt") SELECT "benefits", "challenge", "comment", "compensation", "createdAt", "date", "deadline", "id", "name", "processId", "respondBy", "status", "type", "updatedAt" FROM "Stage";
DROP TABLE "Stage";
ALTER TABLE "new_Stage" RENAME TO "Stage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
