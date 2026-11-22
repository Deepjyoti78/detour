import { NextRequest } from 'next/server';
import { GET as getFleet } from '../src/app/api/fleet/route';
import { GET as getDepots } from '../src/app/api/depots/route';
import { GET as getProducts, POST as createProduct } from '../src/app/api/products/route';
import { PUT as updateProduct, DELETE as deleteProduct } from '../src/app/api/products/[id]/route';
import prisma from '../src/lib/prisma';

async function runApiTests() {
  console.log('====================================================');
  console.log('🌐 TESTING ROUTE HANDLERS & AUTHORIZATION');
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

  // 1. GET /api/fleet
  try {
    const req = new NextRequest('http://localhost:3000/api/fleet');
    const res = await getFleet(req);
    const body = await res.json();
    assert('GET /api/fleet returns 200 OK', res.status === 200);
    assert('GET /api/fleet returns seeded cars catalog (11 models)', body.count === 11);
  } catch (err) {
    assert('GET /api/fleet', false, err);
  }

  // 2. GET /api/depots
  try {
    const res = await getDepots();
    const body = await res.json();
    assert('GET /api/depots returns 200 OK', res.status === 200);
    assert('GET /api/depots returns 7 regional depots', body.count === 7);
  } catch (err) {
    assert('GET /api/depots', false, err);
  }

  // 3. GET /api/products
  try {
    const req = new NextRequest('http://localhost:3000/api/products?page=1&limit=10');
    const res = await getProducts(req);
    const body = await res.json();
    assert('GET /api/products returns 200 OK', res.status === 200);
    assert('GET /api/products returns products list with pagination metadata', body.products.length <= 10 && body.total_products >= 11);
  } catch (err) {
    assert('GET /api/products', false, err);
  }

  // 4. POST /api/products - Negative Test: Unauthorized (No operator authorization)
  try {
    // In production or when unauthenticated without dev header
    const reqUnauthorized = new NextRequest('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Hacker Car',
        category: 'Classic',
        price: 999,
        description: 'Unauthorized creation attempt',
      }),
    });

    // Temporarily mock NODE_ENV to production to test strict auth check
    const originalEnv = process.env.NODE_ENV;
    (process.env as any).NODE_ENV = 'production';
    const resUnauthorized = await createProduct(reqUnauthorized);
    (process.env as any).NODE_ENV = originalEnv;

    assert(
      'POST /api/products rejects unauthenticated mutation in production (401 Unauthorized)',
      resUnauthorized.status === 401
    );
  } catch (err) {
    assert('POST /api/products unauthorized check', false, err);
  }

  // 5. POST /api/products - Negative Test: Invalid Payload (Zod validation failure)
  try {
    const reqInvalid = new NextRequest('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-detour-operator-dev': 'true',
      },
      body: JSON.stringify({
        name: 'A', // Too short (min 2)
        category: '',
        price: -50, // Negative price invalid
        description: 'short',
      }),
    });

    const resInvalid = await createProduct(reqInvalid);
    assert('POST /api/products rejects invalid payload with 400 Bad Request', resInvalid.status === 400);
  } catch (err) {
    assert('POST /api/products invalid payload check', false, err);
  }

  // 6. POST /api/products - Positive Test: Authorized Operator Creation
  let createdSlug = '';
  try {
    const reqValid = new NextRequest('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-detour-operator-dev': 'true',
      },
      body: JSON.stringify({
        name: 'The Monterey Spider',
        category: 'Classic',
        price: 135,
        description: 'Vintage open-cockpit roadster with tuned dual carburetors and polished spoke rims.',
        photo_url: '/assets/roadster.jpg',
      }),
    });

    const resValid = await createProduct(reqValid);
    const bodyValid = await resValid.json();
    assert('POST /api/products creates product with 201 Created', resValid.status === 201);
    assert('POST /api/products returns newly created product with matching price', bodyValid.product?.price === 135);

    createdSlug = bodyValid.product?.id;
  } catch (err) {
    assert('POST /api/products valid creation', false, err);
  }

  // 7. PUT /api/products/[id] - Update Vehicle
  if (createdSlug) {
    try {
      const reqUpdate = new NextRequest(`http://localhost:3000/api/products/${createdSlug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-detour-operator-dev': 'true',
        },
        body: JSON.stringify({
          price: 149,
          description: 'Updated rate and specifications for the Monterey Spider.',
        }),
      });

      const resUpdate = await updateProduct(reqUpdate, { params: Promise.resolve({ id: createdSlug }) });
      const bodyUpdate = await resUpdate.json();
      assert('PUT /api/products/[id] updates product in PostgreSQL', resUpdate.status === 200 && bodyUpdate.product?.price === 149);
    } catch (err) {
      assert('PUT /api/products/[id]', false, err);
    }

    // 8. DELETE /api/products/[id] - Remove Vehicle
    try {
      const reqDelete = new NextRequest(`http://localhost:3000/api/products/${createdSlug}`, {
        method: 'DELETE',
        headers: {
          'x-detour-operator-dev': 'true',
        },
      });

      const resDelete = await deleteProduct(reqDelete, { params: Promise.resolve({ id: createdSlug }) });
      assert('DELETE /api/products/[id] returns 200 OK', resDelete.status === 200);

      // Verify deletion from DB
      const inDb = await prisma.vehicleModel.findFirst({ where: { slug: createdSlug } });
      assert('Deleted product no longer exists in PostgreSQL', inDb === null);
    } catch (err) {
      assert('DELETE /api/products/[id]', false, err);
    }
  }

  console.log('\n====================================================');
  console.log(`📊 API TEST RESULTS: ${passed} passed, ${failed} failed.`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runApiTests()
  .catch((e) => {
    console.error('API Test Failure:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
