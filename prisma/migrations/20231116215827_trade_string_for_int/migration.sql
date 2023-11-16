/*
  Warnings:

  - You are about to alter the column `numeroSorteado` on the `rifa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `rifa` MODIFY `numeroSorteado` INTEGER NULL;
