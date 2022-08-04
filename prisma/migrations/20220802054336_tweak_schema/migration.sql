/*
  Warnings:

  - You are about to drop the column `lessonId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `approved` on the `Payment` table. All the data in the column will be lost.
  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `announceAt` on the `Announcement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `courseId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `expires` on the `VerificationToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropIndex
DROP INDEX "Lesson_lessonId_key";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "announceAt",
ADD COLUMN     "announceAt" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "lessonId",
ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "approved",
ADD COLUMN     "courseId" TEXT NOT NULL,
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "approvedUserId" DROP NOT NULL,
ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BIGINT;

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "expires",
ADD COLUMN     "expires" BIGINT NOT NULL;
