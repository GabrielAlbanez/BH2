-- CreateTable
CREATE TABLE "imagensDoacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "img" TEXT,
    "ongId" TEXT,
    "preco" REAL,
    "Cpfusuario" TEXT,
    CONSTRAINT "imagensDoacao_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "Ong" ("cnpj") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "imagensDoacao_Cpfusuario_fkey" FOREIGN KEY ("Cpfusuario") REFERENCES "Usuario" ("cpf") ON DELETE CASCADE ON UPDATE CASCADE
);
