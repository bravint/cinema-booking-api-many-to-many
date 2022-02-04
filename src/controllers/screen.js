const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getScreenById = async (req, res) => {
    let { id } = req.params;
    id = parseInt(id, 10);
    const response = await prisma.screen.findUnique({
        where: {
            id: id,
        },
    });
    res.json(response);
};

module.exports = {
    getScreenById
};
