-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_galeryImagesLogoUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "LogoDoacaoId" INTEGER,
    "CpfUser" TEXT,
    CONSTRAINT "galeryImagesLogoUser_CpfUser_fkey" FOREIGN KEY ("CpfUser") REFERENCES "Usuario" ("cpf") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "galeryImagesLogoUser_LogoDoacaoId_fkey" FOREIGN KEY ("LogoDoacaoId") REFERENCES "imagensDoacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_galeryImagesLogoUser" ("CpfUser", "LogoDoacaoId", "id") SELECT "CpfUser", "LogoDoacaoId", "id" FROM "galeryImagesLogoUser";
DROP TABLE "galeryImagesLogoUser";
ALTER TABLE "new_galeryImagesLogoUser" RENAME TO "galeryImagesLogoUser";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
