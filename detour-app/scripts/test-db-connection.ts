import prisma from '../src/lib/prisma';

async function main() {
  const result = await prisma.$queryRaw<Array<{ now: Date }>>`SELECT NOW() as now`;
  const count = await prisma.vehicleModel.count();
  console.log('DB_SUCCESS: Connected at', result[0]?.now, '| VehicleModel count:', count);
}

main()
  .catch((e) => {
    console.error('DB_ERROR:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
