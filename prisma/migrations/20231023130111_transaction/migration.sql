/*
  Warnings:

  - You are about to drop the column `quantity` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `quantityInAction` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityInStock` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `quantity`,
    ADD COLUMN `quantityInAction` INTEGER NOT NULL,
    ADD COLUMN `quantityInStock` INTEGER NOT NULL;
