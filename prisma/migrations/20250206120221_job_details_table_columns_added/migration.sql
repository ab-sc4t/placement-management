/*
  Warnings:

  - You are about to drop the column `ctc` on the `JobDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobDetails" DROP COLUMN "ctc",
ADD COLUMN     "eligibility" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "jobTitle" TEXT NOT NULL DEFAULT 'Not specified',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'TBD',
ADD COLUMN     "package" TEXT NOT NULL DEFAULT '0 LPA',
ADD COLUMN     "round1" TEXT NOT NULL DEFAULT 'Not available',
ADD COLUMN     "round2" TEXT NOT NULL DEFAULT 'Not available',
ADD COLUMN     "round3" TEXT NOT NULL DEFAULT 'Not available';
