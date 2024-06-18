const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
	beforeEach(async ({ page, request }) => {
		await page.goto('http://localhost:5173')
		await request.post('http://localhost:5173/api/testing/reset')
		await request.post('http://localhost:5173/api/users', {
			data: {
				username: 'root1',
				name: 'root2',
				password: 'root3',
			},
		})
	})

	test('Login form is shown', async ({ page }) => {
		await expect(page.getByText('Log in to application')).toBeVisible()
		await expect(page.getByText('username')).toBeVisible()
		await expect(page.getByText('password')).toBeVisible()
	})

	test('Login succeeds with correct credentials', async ({ page }) => {
		await page.getByRole('textbox').first().fill('root1')
		await page.getByRole('textbox').last().fill('root3')
		await page.getByRole('button', { name: 'login' }).click()
		await expect(page.getByText('root2 logged-in')).toBeVisible()
	})

	test('Login fails with wrong credentials', async ({ page }) => {
		await page.getByRole('textbox').first().fill('root')
		await page.getByRole('textbox').last().fill('wrong')
		await page.getByRole('button', { name: 'login' }).click()
		await expect(page.getByText('wrong username or password')).toBeVisible()
	})
	describe('When logged in', () => {
		beforeEach(async ({ page }) => {
			await page.getByRole('textbox').first().fill('root1')
			await page.getByRole('textbox').last().fill('root3')
			await page.getByRole('button', { name: 'login' }).click()
		})

		test('a new blog can be created', async ({ page }) => {
			// await page.getByRole('button', { name: 'new blog' }).click()
			// await page.getByRole('textbox').first().fill('Test blog')
			// await page.getByRole('textbox').nth(1).fill('Test author')
			// await page.getByRole('textbox').last().fill('http://test.com')
			// await page.getByRole('button', { name: 'create' }).click()
			// await expect(page.getByText('Test blog Test author')).toBeVisible()
		})
	})
})
