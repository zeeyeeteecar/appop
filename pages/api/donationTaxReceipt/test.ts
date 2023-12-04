import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
//import { prisma } from "../prisma";

const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  //const prisma = new PrismaClient();
  //await prisma.$connect();
  const { applicationId } = req.body;

  //const DonationOnly: boolean = searchDonationOnly;

  const result = await prisma.application.findUnique({
    //==========applicationProcessing=========
    where: {
      id: Number(applicationId),
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
          type: true,
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
      applicationProcessing: {
        select: {
          status: true,
          applicationInvoice: {
            select: {
              invoiceNumber: true,
              createdAt: true,
            },
          },
        },
      },
      newApplication: {},
      renewalApplication: {},
      replacementApplication: {},
    },

    //take:100,
  });

  await prisma.$disconnect();
  res.json(result);
}
