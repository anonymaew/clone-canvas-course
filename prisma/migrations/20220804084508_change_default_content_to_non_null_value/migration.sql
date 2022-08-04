/*
  Warnings:

  - Made the column `content` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "content" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DEFAULT '';
