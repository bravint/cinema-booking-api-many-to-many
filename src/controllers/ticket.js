const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createNewTicket = async (req, res) => {
    // EXAMPLE REQUEST

    // {
    //     "customerId":1,
    //     "screeningId":1,
    //     "seatId":[1, 2, 3, 4, 5]
    // }

    const { customerId, screeningId, seatId } = req.body;

    let seatArray = [];

    seatId.forEach((element) => {
        obj = {
            seat: {
                connect: {
                    id: element,
                },
            },
        };
        seatArray.push(obj);
    });

    const createdTicket = await prisma.ticket.create({
        data: {
            customer: {
                connect: {
                    id: customerId,
                },
            },
            screening: {
                connect: {
                    id: screeningId,
                },
            },
            seats: {
                create: seatArray,
            },
        },
        include: {
            customer: true,
            screening: true,
            seats: true,
        },
    });

    console.log(`createdTicket`, createdTicket);

    return res.json(createdTicket);
};

module.exports = {
    createNewTicket,
};
