import { test, expect, request } from '@playwright/test';

test('GET /api/productsList - should return list of all products', async ({ request }) => {
    const response = await request.get('/api/productsList');
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBe(true);
});

test('POST /api/productsList - should return that method is not supported', async ({ request }) => {
    const response = await request.post('/api/productsList');
    const text = await response.text();
    expect(response.status()).toBe(200);
    expect(text).toContain('This request method is not supported.');
});

test('GET /api/brandList - should return all brands list', async ({ request }) => {
    const response = await request.get('/api/brandsList');
    const data = await response.json();
    expect(response.status()).toBe(200);
    expect(data).toHaveProperty('brands');
    expect(Array.isArray(data.brands)).toBe(true);

});