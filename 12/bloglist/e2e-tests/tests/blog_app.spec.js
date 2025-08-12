import { beforeEach, describe, expect, test } from '@playwright/test';

import { createBlog, loginWith } from './helper';

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        username: 'root',
        name: 'Superuser',
        password: 'supersecret'
      }
    });
    await page.goto('');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'supersecret');
      await expect(page.getByText('Superuser logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'frontend');
      await expect(page.getByText('wrong username or password')).toBeVisible();
    });

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'root', 'supersecret');
      });

      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click();
        await page.getByRole('textbox', { name: 'title:' }).fill('Things to do in Stockholm');
        await page.getByRole('textbox', { name: 'author:' }).fill('Stockholm Stad');
        await page.getByRole('textbox', { name: 'url:' }).fill('jättebra.se');
        await page.getByRole('button', { name: 'create' }).click();
        await expect(page.getByText('a new blog Things to do in Stockholm by Stockholm Stad added')).toBeVisible();
        await expect(page.getByText('Things to do in Stockholm Stockholm Stad')).toBeVisible();
      });

      describe('and several blogs from different users exist', () => {
        beforeEach(async ({ page, request }) => {
          await request.post('/api/users', {
            data: {
              username: 'oskuH',
              name: 'Osku',
              password: 'fullstack'
            }
          });

          await createBlog(page, 'first super blog', 'FS', 'first.com');
          await expect(page.getByText('a new blog first super blog by FS added')).toBeVisible();
          await createBlog(page, 'second super blog', 'SS', 'second.com');
          await expect(page.getByText('a new blog second super blog by SS added')).toBeVisible();
          await page.getByRole('button', { name: 'logout' }).click();

          await loginWith(page, 'oskuH', 'fullstack');
          await createBlog(page, 'first normal blog', 'FN', 'first.org');
          await expect(page.getByText('a new blog first normal blog by FN added')).toBeVisible();
        });

        test('user can like any blog', async ({ page }) => {
          await page.getByRole('listitem').filter({ hasText: 'first super blog' }).getByRole('button', { name: 'view' }).click();
          await expect(page.getByRole('listitem').filter({ hasText: 'first super blog' }).getByText('likes 0')).toBeVisible();
          await page.getByRole('listitem').filter({ hasText: 'first super blog' }).getByRole('button', { name: 'like' }).click();
          await expect(page.getByRole('listitem').filter({ hasText: 'first super blog' }).getByText('likes 1')).toBeVisible();

          await page.getByRole('listitem').filter({ hasText: 'first normal blog' }).getByRole('button', { name: 'view' }).click();
          await expect(page.getByRole('listitem').filter({ hasText: 'first normal blog' }).getByText('likes 0')).toBeVisible();
          await page.getByRole('listitem').filter({ hasText: 'first normal blog' }).getByRole('button', { name: 'like' }).click();
          await expect(page.getByRole('listitem').filter({ hasText: 'first normal blog' }).getByText('likes 1')).toBeVisible();
        });

        test('only the user who created a blog can see and use its "remove" button', async ({ page }) => {
          await page.getByRole('listitem').filter({ hasText: 'first super blog' }).getByRole('button', { name: 'view' }).click();
          await expect(page.getByRole('listitem').filter({ hasText: 'first super blog' }).getByRole('button', { name: 'remove' })).toBeHidden();

          await page.getByRole('listitem').filter({ hasText: 'first normal blog' }).getByRole('button', { name: 'view' }).click();
          page.on('dialog', dialog => dialog.accept());
          await page.getByRole('listitem').filter({ hasText: 'first normal blog' }).getByRole('button', { name: 'remove' }).click();
          await expect(page.getByText('first normal blog FN')).toBeHidden();
        });

        test('blogs are ordered according to likes (most likes first)', async ({ page }) => {
          await page.getByRole('listitem').filter({ hasText: 'first normal blog' }).getByRole('button', { name: 'view' }).click();
          await page.getByRole('listitem').filter({ hasText: 'first normal blog' }).getByRole('button', { name: 'like' }).click();
          await expect(page.getByRole('listitem').filter({ hasText: 'first normal blog' }).getByText('likes 1')).toBeVisible();

          await expect(page.getByRole('listitem').first()).toContainText('first normal blog');

          await page.getByRole('listitem').filter({ hasText: 'first super blog' }).getByRole('button', { name: 'view' }).click();
          await page.getByRole('listitem').filter({ hasText: 'first super blog' }).getByRole('button', { name: 'like' }).click();
          await expect(page.getByRole('listitem').filter({ hasText: 'first super blog' }).getByText('likes 1')).toBeVisible();
          await page.getByRole('listitem').filter({ hasText: 'first super blog' }).getByRole('button', { name: 'like' }).click();
          await expect(page.getByRole('listitem').filter({ hasText: 'first super blog' }).getByText('likes 2')).toBeVisible();

          await expect(page.getByRole('listitem').first()).toContainText('first super blog');
        });
      });
    });
  });
});