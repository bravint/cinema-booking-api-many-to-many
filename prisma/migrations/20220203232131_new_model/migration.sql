/*
  Warnings:

  - The primary key for the `SeatInTicket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SeatInTicket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SeatInTicket" DROP CONSTRAINT "SeatInTicket_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SeatInTicket_pkey" PRIMARY KEY ("seatId", "ticketId");
