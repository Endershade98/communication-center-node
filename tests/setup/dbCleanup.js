// tests/setup/dbCleanup.js

export async function truncateAll(prisma) {

  await prisma.notification.deleteMany();

}