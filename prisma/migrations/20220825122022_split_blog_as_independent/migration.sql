/*
  Warnings:

  - You are about to drop the column `announceAt` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `announceId` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Lesson` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[blogHeaderId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blogHeaderId` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remindAt` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogHeaderId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogHeaderId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Announcement_announceId_key";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "announceAt",
DROP COLUMN "announceId",
DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "blogHeaderId" TEXT NOT NULL,
ADD COLUMN     "remindAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "content",
DROP COLUMN "created",
DROP COLUMN "title",
DROP COLUMN "updated",
ADD COLUMN     "blogHeaderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "content",
DROP COLUMN "created",
DROP COLUMN "published",
DROP COLUMN "title",
DROP COLUMN "updated",
ADD COLUMN     "blogHeaderId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BlogHeader" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "blogContentId" TEXT NOT NULL,

    CONSTRAINT "BlogHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogContent" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "BlogContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogHeader_blogContentId_key" ON "BlogHeader"("blogContentId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_blogHeaderId_key" ON "Course"("blogHeaderId");

-- AddForeignKey
ALTER TABLE "BlogHeader" ADD CONSTRAINT "BlogHeader_blogContentId_fkey" FOREIGN KEY ("blogContentId") REFERENCES "BlogContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_blogHeaderId_fkey" FOREIGN KEY ("blogHeaderId") REFERENCES "BlogHeader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_blogHeaderId_fkey" FOREIGN KEY ("blogHeaderId") REFERENCES "BlogHeader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_blogHeaderId_fkey" FOREIGN KEY ("blogHeaderId") REFERENCES "BlogHeader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
