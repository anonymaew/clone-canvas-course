/*
  Warnings:

  - A unique constraint covering the columns `[blogHeaderId]` on the table `Announcement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[blogHeaderId]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Announcement_blogHeaderId_key" ON "Announcement"("blogHeaderId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_blogHeaderId_key" ON "Lesson"("blogHeaderId");
