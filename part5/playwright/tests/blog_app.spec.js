const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
	beforeEach(async ({ page, request }) => {
		await page.goto('http://localhost:5173')
		await request.post('http://localhost:5173/api/testing/reset')
		await request.post('http://localhost:5173/api/users', {
			username: 'root',
			name: 'Superuser',
			password: 'sekret',
		})
	})

	test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('Log in to application')).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
	})

	test('Login succeeds with correct credentials', async ({ page }) => {
		await page.getByRole('textbox').first().fill('root')
		await page.getByRole('textbox').last().fill('sekret')
		await page.getByRole('button', { name: 'login' }).click()
		await expect(page.getByText('blogs')).toBeVisible()
	})

	test('Login fails with wrong credentials', async ({ page }) => {
		await page.getByRole('textbox').first().fill('root')
		await page.getByRole('textbox').last().fill('wrong')
		await page.getByRole('button', { name: 'login' }).click()
		await expect(page.getByText('wrong username or password')).toBeVisible()
	})
})
