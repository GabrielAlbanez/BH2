-- CreateTable
CREATE TABLE "Usuario" (
    "cpf" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "tipo" TEXT DEFAULT 'default',
    "telefone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ong" (
    "cnpj" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT,
    "redesSociais" TEXT,
    "aprovado" BOOLEAN DEFAULT false,
    "Logo" TEXT
);

-- CreateTable
CREATE TABLE "Voluntarios" (
    "cpf" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "idOng" TEXT NOT NULL,
    CONSTRAINT "Voluntarios_idOng_fkey" FOREIGN KEY ("idOng") REFERENCES "Ong" ("cnpj") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trabalho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "idOng" TEXT NOT NULL,
    CONSTRAINT "Trabalho_idOng_fkey" FOREIGN KEY ("idOng") REFERENCES "Ong" ("cnpj") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rifa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imgRifa" TEXT,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "descricao" TEXT,
    "CpfUsuario" TEXT,
    "idOng" TEXT,
    "sorteado" BOOLEAN DEFAULT false,
    "ganhador" TEXT,
    "numeroSorteado" TEXT DEFAULT 'null',
    CONSTRAINT "Rifa_CpfUsuario_fkey" FOREIGN KEY ("CpfUsuario") REFERENCES "Usuario" ("cpf") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Rifa_idOng_fkey" FOREIGN KEY ("idOng") REFERENCES "Ong" ("cnpj") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NumeroComprado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "rifaId" INTEGER NOT NULL,
    "usuarioCpf" TEXT NOT NULL,
    CONSTRAINT "NumeroComprado_rifaId_fkey" FOREIGN KEY ("rifaId") REFERENCES "Rifa" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NumeroComprado_usuarioCpf_fkey" FOREIGN KEY ("usuarioCpf") REFERENCES "Usuario" ("cpf") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ong_email_key" ON "Ong"("email");
