const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const customer = await createCustomer();
    const movies = await createMovies();
    const screens = await createScreens();
    await createScreenings(screens, movies);
    await createSeats(screens);
    await createTickets(customer);
    //await seatInTicket();
    process.exit(0);
}

async function createCustomer() {
    const customer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    email: 'alice@boolean.co.uk',
                    phone: '1234567890',
                },
            },
        },
        include: {
            contact: true,
        },
    });

    console.log('Customer created', customer);

    return customer;
}

async function createMovies() {
    const rawMovies = [
        { title: 'The Matrix', runtimeMins: 120 },
        { title: 'Dodgeball', runtimeMins: 154 },
    ];

    const movies = [];

    for (const rawMovie of rawMovies) {
        const movie = await prisma.movie.create({ data: rawMovie });
        movies.push(movie);
    }

    console.log('Movies created', movies);

    return movies;
}

async function createScreens() {
    const rawScreens = [{ number: 1 }, { number: 2 }];

    const screens = [];

    for (const rawScreen of rawScreens) {
        const screen = await prisma.screen.create({
            data: rawScreen,
        });

        console.log('Screen created', screen);

        screens.push(screen);
    }

    return screens;
}

async function createScreenings(screens, movies) {
    const screeningDate = new Date();

    for (const screen of screens) {
        for (let i = 0; i < movies.length; i++) {
            screeningDate.setDate(screeningDate.getDate() + i);

            const screening = await prisma.screening.create({
                data: {
                    startsAt: screeningDate,
                    movie: {
                        connect: {
                            id: movies[i].id,
                        },
                    },
                    screen: {
                        connect: {
                            id: screen.id,
                        },
                    },
                },
            });

            console.log('Screening created', screening);
        }
    }
}

async function createTickets(customer) {
    const createdTicket = await prisma.ticket.create({
        data: {
            customer: {
                connect: {
                    id: customer.id,
                },
            },
            screening: {
                connect: {
                    id: 1,
                },
            },
        },
    });
    console.log('Ticket created', createdTicket);

    return createdTicket;
}

async function createSeats(screens) {
    const numberOfSeats = 5;

    const availableSeats = Array.from(Array(numberOfSeats).keys());

    for (let i = 0; i < screens.length; i++) {
        for (let j = 0; j < availableSeats.length; j++) {
            const createdSeat = await prisma.seat.create({
                data: {
                    number: availableSeats[j] + 1,
                    screen: {
                        connect: {
                            id: screens[i].id,
                        },
                    },
                },
            });

            console.log('Seat created', createdSeat);
        }
    }
}

// async function seatInTicket() {
//     const assignedSeat = await prisma.seatInTicket.update({
//         data: {
//             ticket: {
//                 connect: {
//                     id: 1,
//                 },
//             },
//             seat: {
//                 connect: {
//                     id: 1,
//                 },
//             },
//         },
//     });
// }

seed()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));
