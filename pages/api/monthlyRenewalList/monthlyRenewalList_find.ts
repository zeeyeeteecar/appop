import { prisma } from "../prisma";
//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  //const prisma = new PrismaClient();
  //await prisma.$connect();
  const { dateStart, dateEnd } = req.body;

  const result = await prisma.applicant.findMany({
    where: {
      permits: {
        some: {
          expiryDate: {
            gte: new Date(dateStart),
            lte: new Date(dateEnd),
          },
        },
      },
    },
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      permits: true,
    },
   take: 200,
  });

  await prisma.$disconnect();
  res.json(result);
}
