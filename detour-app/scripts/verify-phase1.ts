import prisma from '../src/lib/prisma';
import { BookingStatus, Role, VehicleCategory } from '../src/generated/prisma/client';

async function runPhase1Verification() {
  console.log('====================================================');
  console.log('🧪 DETOUR PHASE 1: FULL VERIFICATION SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(description: string, condition: boolean, extra?: unknown) {
    if (condition) {
      console.log(`✅ PASS: ${description}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${description}`, extra ?? '');
      failed++;
    }
  }

  // 1. Database Connectivity & Extensions
  try {
    const rawResult = await prisma.$queryRaw<Array<{ extname: string }>>`
      SELECT extname FROM pg_extension WHERE extname = 'btree_gist'
    `;
    assert('PostgreSQL connection established and btree_gist extension active', rawResult.length > 0);
  } catch (err) {
    assert('PostgreSQL connection established and btree_gist extension active', false, err);
  }

  // 2. Seeded Inventory Counts
  try {
    const [depotCount, modelCount, vehicleCount, userCount, routeCount] = await Promise.all([
      prisma.depot.count(),
      prisma.vehicleModel.count(),
      prisma.vehicle.count(),
      prisma.user.count(),
      prisma.scenicRoute.count(),
    ]);

    assert('Depots count matches seeded regional hubs (7)', depotCount === 7, `Found: ${depotCount}`);
    assert('Vehicle models count matches catalog (>= 11)', modelCount >= 11, `Found: ${modelCount}`);
    assert('Physical vehicles count matches seeded fleet (>= 11)', vehicleCount >= 11, `Found: ${vehicleCount}`);
    assert('Users count matches seeded accounts (>= 3)', userCount >= 3, `Found: ${userCount}`);
    assert('Scenic routes count matches seeded packages (>= 2)', routeCount >= 2, `Found: ${routeCount}`);
  } catch (err) {
    assert('Inventory counts query', false, err);
  }

  // 3. Database-Level Concurrency & Half-Open Range Overlap Protection (Negative Test)
  try {
    const testVehicle = await prisma.vehicle.findFirst({ where: { status: 'AVAILABLE' } });
    const testDepot = await prisma.depot.findFirst();
    const testModel = await prisma.vehicleModel.findFirst();

    if (!testVehicle || !testDepot || !testModel) {
      throw new Error('Missing prerequisite test data');
    }

    const start1 = new Date('2026-12-01T10:00:00Z');
    const end1 = new Date('2026-12-05T10:00:00Z');

    // Insert first booking
    const b1 = await prisma.booking.create({
      data: {
        referenceNumber: `TEST-OVERLAP-${Date.now()}-A`,
        modelId: testModel.id,
        vehicleId: testVehicle.id,
        pickupDepotId: testDepot.id,
        returnDepotId: testDepot.id,
        pickupDate: start1,
        returnDate: end1,
        status: BookingStatus.CONFIRMED,
        totalDays: 4,
        dailyRate: 100,
        totalAmount: 400,
        driverName: 'Tester A',
        driverEmail: 'tester.a@test.com',
        driverPhone: '1234567890',
      },
    });

    // Attempt overlapping booking on the exact same vehicle [2026-12-03, 2026-12-07)
    let overlapBlocked = false;
    try {
      await prisma.booking.create({
        data: {
          referenceNumber: `TEST-OVERLAP-${Date.now()}-B`,
          modelId: testModel.id,
          vehicleId: testVehicle.id,
          pickupDepotId: testDepot.id,
          returnDepotId: testDepot.id,
          pickupDate: new Date('2026-12-03T10:00:00Z'),
          returnDate: new Date('2026-12-07T10:00:00Z'),
          status: BookingStatus.CONFIRMED,
          totalDays: 4,
          dailyRate: 100,
          totalAmount: 400,
          driverName: 'Tester B',
          driverEmail: 'tester.b@test.com',
          driverPhone: '0987654321',
        },
      });
    } catch (overlapErr: unknown) {
      // Expect PostgreSQL exclusion constraint violation: 23P01
      const msg = String(overlapErr);
      if (msg.includes('no_overlapping_vehicle_bookings') || msg.includes('exclusion') || msg.includes('23P01')) {
        overlapBlocked = true;
      }
    }

    assert(
      'PostgreSQL exclusion constraint blocks overlapping booking intervals on same physical car',
      overlapBlocked
    );

    // Clean up test booking
    await prisma.booking.delete({ where: { id: b1.id } });
  } catch (err) {
    assert('Booking overlap exclusion check', false, err);
  }

  // 4. API Simulation: Verification of Query / Logic
  try {
    // Fleet catalog query
    const catalog = await prisma.vehicleModel.findMany({
      where: { isAvailable: true },
      include: { vehicles: true },
    });
    assert('Consumer Fleet Query returns all active models', catalog.length >= 11);

    const classicModel = catalog.find((c) => c.slug === 'classic');
    assert('Slug preservation: The Classic is found at slug "classic"', !!classicModel);
    assert('Daily rate matches expected $89', Number(classicModel?.baseDailyRate) === 89);

    // Depot query with live inventory relation
    const mumbaiDepot = await prisma.depot.findUnique({
      where: { code: 'BOM-01' },
      include: { vehicles: true },
    });
    assert('Depot BOM-01 (Mumbai) has physical vehicles mapped', (mumbaiDepot?.vehicles.length ?? 0) > 0);
  } catch (err) {
    assert('Catalog query verification', false, err);
  }

  // 5. Inventory Persistence & Mutation Verification
  try {
    const testSlug = `test-phantom-${Date.now().toString(36)}`;
    const createdModel = await prisma.vehicleModel.create({
      data: {
        slug: testSlug,
        name: 'The Phantom Test Roadster',
        category: VehicleCategory.CLASSIC,
        headline: 'Automated verification test roadster',
        shortDescription: 'Test asset',
        description: 'Temporary verification record to test database mutation persistence',
        baseDailyRate: 145,
        depositAmount: 600,
        heroImage: '/assets/sunset.jpg',
        isAvailable: true,
      },
    });

    // Read back to confirm persistence
    const reloaded = await prisma.vehicleModel.findUnique({ where: { slug: testSlug } });
    assert(
      'Inventory mutation persistence: newly inserted model persists and reloads accurately',
      reloaded?.name === 'The Phantom Test Roadster' && Number(reloaded.baseDailyRate) === 145
    );

    // Clean up
    await prisma.vehicleModel.delete({ where: { id: createdModel.id } });
    const afterDelete = await prisma.vehicleModel.findUnique({ where: { slug: testSlug } });
    assert('Inventory deletion removes model cleanly', afterDelete === null);
  } catch (err) {
    assert('Inventory persistence test', false, err);
  }

  console.log('\n====================================================');
  console.log(`📊 RESULTS: ${passed} passed, ${failed} failed.`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase1Verification()
  .catch((e) => {
    console.error('Test runner failure:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
