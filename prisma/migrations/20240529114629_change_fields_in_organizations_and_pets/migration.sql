/*
  Warnings:

  - You are about to drop the column `photos` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `pets` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "photos",
DROP COLUMN "requirements";
