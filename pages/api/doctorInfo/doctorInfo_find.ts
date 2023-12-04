import { prisma } from "../prisma";
//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  //const prisma = new PrismaClient();
  //await prisma.$connect();
  const { mspNo, fName, lName, phone } = req.body;

  const result = await prisma.physician.findMany({
    where: {
      mspNumber: {
        contains: mspNo ? mspNo : "",

      },
      firstName: {
        contains: fName ? fName : "",

      },
      lastName: {
        contains: lName ? lName : "",

      },
      phone: {
        contains: phone ? phone : "",

      },

    },
    orderBy: [
      {
        mspNumber: "asc",
      },

    ],
    //take: 20,
    // include: {
    //   permits: true,
    // },
  });

  // await prisma.$disconnect();
  // res.json(result);

  // const result = await prisma.performers.findMany({
  //   include: {
  //     donors: true,
  //   },
  //   orderBy: { Performer_id: "asc" },
  // });

  await prisma.$disconnect();
  res.json(result);
}
