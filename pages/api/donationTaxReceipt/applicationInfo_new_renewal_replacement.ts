import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
//import { prisma } from "../prisma";

const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  //const prisma = new PrismaClient();
  //await prisma.$connect();
  const { applicationId: applicationId } = req.body;

  //const DonationOnly: boolean = searchDonationOnly;

  const result = await prisma.application.findMany({
    //==========applicationProcessing=========
    where: {
      AND: [
        {
          id: Number(applicationId),
          OR: [
            { renewalApplication: { applicationId: Number(applicationId) } },
            { newApplication: { applicationId: Number(applicationId) } },
            {
              replacementApplication: { applicationId: Number(applicationId) },
            },
          ],
        },
      ],
    },

    select: {
      id: true,
      //status: true,
      //applicationInvoice: true,
      //application: true,

      firstName: true,
      middleName: true,
      lastName: true,
      phone: true,
      email: true,
      receiveEmailUpdates: true,
      addressLine1: true,
      addressLine2: true,
      city: true,
      province: true,
      country: true,
      postalCode: true,
      permitType: true,
      paymentMethod: true,
      processingFee: true,
      donationAmount: true,
      type: true,
      notes: true,
      applicantId: true,
      createdAt: true,

      permit: {
        select: { rcdPermitId: true, expiryDate: true },
      },

      applicant: {
        select: {
          dateOfBirth: true,
          id: true,
          gender: true,
          medicalInformation: {
            select: { disability: true, patientCondition: true },
          },
        },
      },

      applicationProcessing: { select: { status: true } },

      newApplication: {},
      renewalApplication: {},
      replacementApplication: {},
    },
    orderBy: {
      // applicationProcessing: {
      //   status: "desc",
      // },
      applicantId: "desc",
    },
    //take:100,
  });

  await prisma.$disconnect();
  res.json(result);
}
