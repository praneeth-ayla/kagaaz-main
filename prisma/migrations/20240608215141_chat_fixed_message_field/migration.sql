/*
  Warnings:

  - Added the required column `message` to the `Chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chats" ADD COLUMN     "message" TEXT NOT NULL;
