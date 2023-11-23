/*
  Warnings:

  - You are about to drop the column `CpfUser` on the `galeryImagesLogoUser` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_galeryImagesLogoUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "LogoDoacaoId" INTEGER,
    "emaillUser" TEXT,
    CONSTRAINT "galeryImagesLogoUser_emaillUser_fkey" FOREIGN KEY ("emaillUser") REFERENCES "Usuario" ("email") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "galeryImagesLogoUser_LogoDoacaoId_fkey" FOREIGN KEY ("LogoDoacaoId") REFERENCES "imagensDoacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_galeryImagesLogoUser" ("LogoDoacaoId", "id") SELECT "LogoDoacaoId", "id" FROM "galeryImagesLogoUser";
DROP TABLE "galeryImagesLogoUser";
ALTER TABLE "new_galeryImagesLogoUser" RENAME TO "galeryImagesLogoUser";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
