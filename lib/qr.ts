import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

// ─── QR Codes ─────────────────────────────────────────────────────────────────

export async function createQRCode(
  userId: string,
  originalUrl: string,
  isDynamic = false
) {
  const shortCode = nanoid(8);
  return prisma.qRCode.create({
    data: { userId, originalUrl, shortCode, isDynamic },
  });
}

export async function getQRCodesByUser(userId: string) {
  return prisma.qRCode.findMany({
    where: { userId },
    include: { _count: { select: { scans: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getQRCodeByShortCode(shortCode: string) {
  return prisma.qRCode.findUnique({ where: { shortCode } });
}

export async function deleteQRCode(id: string, userId: string) {
  return prisma.qRCode.deleteMany({ where: { id, userId } });
}

// ─── Scans ────────────────────────────────────────────────────────────────────

export async function recordScan(
  qrId: string,
  location?: string,
  device?: string
) {
  return prisma.scan.create({ data: { qrId, location, device } });
}

export async function getScansByQRCode(qrId: string) {
  return prisma.scan.findMany({
    where: { qrId },
    orderBy: { timestamp: "desc" },
  });
}
