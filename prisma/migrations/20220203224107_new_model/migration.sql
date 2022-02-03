/*
  Warnings:

  - You are about to drop the column `seatId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `SeatsAssignedToCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SeatsAssignedToCustomer" DROP CONSTRAINT "SeatsAssignedToCustomer_customerId_fkey";

-- DropForeignKey
ALTER TABLE "SeatsAssignedToCustomer" DROP CONSTRAINT "SeatsAssignedToCustomer_seatId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_seatId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "seatId";

-- DropTable
DROP TABLE "SeatsAssignedToCustomer";

-- CreateTable
CREATE TABLE "SeatInTicket" (
    "id" SERIAL NOT NULL,
    "seatId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeatInTicket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SeatInTicket" ADD CONSTRAINT "SeatInTicket_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatInTicket" ADD CONSTRAINT "SeatInTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
