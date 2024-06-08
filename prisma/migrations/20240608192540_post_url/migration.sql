/*
  Warnings:

  - You are about to drop the column `elements` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `publisehed` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `url` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "elements",
DROP COLUMN "note",
DROP COLUMN "publisehed",
ADD COLUMN     "tags" TEXT,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
