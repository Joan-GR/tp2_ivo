import { test, expect } from '@playwright/test';

const TEST_EMAIL = process.env.TEST_EMAIL || '';
const TEST_PASSWORD = process.env.TEST_PASSWORD || '';

test.describe('Flujo principal de autenticación', () => {
  test('redirige a /register cuando el usuario no está autenticado', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/register/);
  });

  test('la página de login muestra el formulario correctamente', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('login exitoso redirige a la lista de compras', async ({ page }) => {
    test.skip(!TEST_EMAIL || !TEST_PASSWORD, 'Requiere TEST_EMAIL y TEST_PASSWORD');

    await page.goto('/login');
    await page.fill('input[name="email"]', TEST_EMAIL);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/');
    await expect(page.locator('#btn-agregar')).toBeVisible();
  });
});