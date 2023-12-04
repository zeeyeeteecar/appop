import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
//import { prisma } from "../prisma";

const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  //const prisma = new PrismaClient();
  //await prisma.$connect();
  const {
    searchUserNo,
    searchUserFName,
    searchUserLName,
    searchDateStart,
    searchDateEnd,
    searchProcessing,
    searchCompleted,
    searchDonationOnly,
    searchPermitType_Permanent,
    searchPermitType_Temporary,
    searchRequestType_New,
    searchRequestType_RENEWAL,
    searchRequestType_REPLACEMENT,
  } = req.body;

  //const DonationOnly: boolean = searchDonationOnly;

  const array_status = [];
  if (searchProcessing) {
    array_status.push(searchProcessing);
  }

  if (searchCompleted) {
    array_status.push(searchCompleted);
  }

  const result = await prisma.application.findMany({
    //==========applicationProcessing=========
    where: {
      AND: [
        {
          OR: [
            { permitType: { equals: searchPermitType_Permanent || undefined } },
            { permitType: { equals: searchPermitType_Temporary || undefined } },
          ],
        },
        {
          OR: [
            { type: { equals: searchRequestType_New || undefined } },
            { type: { equals: searchRequestType_RENEWAL || undefined } },
            { type: { equals: searchRequestType_REPLACEMENT || undefined } },
          ],
        },
      ],
      //type:{ in:[searchRequestType_New,"",""]},

      //applicantId: { equals: Number(searchUserNo) || undefined },
      //applicantId:"3",
      firstName: { contains: searchUserFName.trim() || undefined },
      lastName: { contains: searchUserLName.trim() || undefined },
      createdAt: {
        gte: new Date(searchDateStart),
        lte: new Date(searchDateEnd),
      },

      applicationProcessing: {
        status: {
          in: array_status,
        },
      },

      donationAmount: {
        gte: searchDonationOnly ? 1 : 0,
      },
    },

    select: {
      // id: true,
      // status: true,
      // applicationInvoice: true,
      //application: true,
      id: true,
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
      shopifyOrderNumber: true,
      shippingAddressSameAsHomeAddress: true,
      shippingFullName: true,
      shippingAddressLine1: true,
      shippingAddressLine2: true,
      shippingCity: true,
      shippingProvince: true,
      shippingCountry: true,
      shippingPostalCode: true,
      billingAddressSameAsHomeAddress: true,
      billingFullName: true,
      billingAddressLine1: true,
      billingCity: true,
      billingProvince: true,
      billingCountry: true,
      billingPostalCode: true,
      type: true,
      notes: true,
      applicantId: true,
      createdAt: true,

      permit: {
        select: {
          rcdPermitId: true,
          expiryDate: true,
          active: true,
        },
      },
      applicant: {
        select: {
          dateOfBirth: true,
          id: true,
          permits: {
            select: {
              rcdPermitId: true,
              expiryDate: true,
              active: true,
            },
          },
          medicalInformation: {
            select: {
              id: true,
              disability: true,
              disabilityCertificationDate: true,
              patientCondition: true,
            },
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

  const result_1 = await result.filter(
    (item) =>
      item.applicantId && item.applicantId.toString().includes(searchUserNo)
  );

  await prisma.$disconnect();
  res.json(result_1);
}
