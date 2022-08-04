/*
  Warnings:

  - You are about to drop the column `courseId` on the `Course` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Course_courseId_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "courseId";
