import { test, expect, request } from '@playwright/test';


test('GET /api/productsList - should return list of all products', async ({ request }) => {
  const response = await request.get('/api/productsList');
  const responseBody = await response.json();
  expect(response.status()).toBe(200);
  expect(responseBody).toHaveProperty('products');
  expect(Array.isArray(responseBody.products)).toBe(true);
});