-- CreateTable
CREATE TABLE "galeryImagesLogoUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "LogoDoacaoId" INTEGER,
    "CpfUser" TEXT,
    CONSTRAINT "galeryImagesLogoUser_LogoDoacaoId_fkey" FOREIGN KEY ("LogoDoacaoId") REFERENCES "imagensDoacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
