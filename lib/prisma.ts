import { PrismaClient } from "@prisma/client";

const globalForPrisma = (global as unknown) as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const logCall = async (callData: {
  userId: number;
  phoneNumber: string;
  callStatus: string;
  duration?: number;
  notes?: string;
}) => {
  return await prisma.callLog.create({
    data: callData,
  });
};

export const getCallLogsByUserId = async (userId: number) => {
  return await prisma.callLog.findMany({
    where: { userId },
  });
};
export const updateCallLog = async (
  callId: number,
  updateData: {
    callStatus?: string;
    duration?: number;
    notes?: string;
  }
) => {
  return await prisma.callLog.update({
    where: { id: callId },
    data: updateData,
  });
};
export const deleteCallLog = async (callId: number) => {
  return await prisma.callLog.delete({
    where: { id: callId },
  });
};
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};
export const createUser = async (userData: {
  name: string;
  email: string;
  phoneNumber: string;
}) => {
  return await prisma.user.create({
    data: userData,
  });
};
export const updateUser = async (
  userId: number,
  updateData: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  }
) => {
  return await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
};
export const deleteUser = async (userId: number) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};
