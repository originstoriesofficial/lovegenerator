/*
  Warnings:

  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Route` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Route` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `artistId` column on the `Route` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `routes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `routes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[routeId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `questionId` on the `Option` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `routeId` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_routeId_fkey";

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_artistId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "questionId",
ADD COLUMN     "questionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "routeId",
ADD COLUMN     "routeId" INTEGER NOT NULL,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Route" DROP CONSTRAINT "Route_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "artistId",
ADD COLUMN     "artistId" INTEGER,
ADD CONSTRAINT "Route_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "routes" DROP CONSTRAINT "routes_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "routes_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Question_routeId_key" ON "Question"("routeId");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "routes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
