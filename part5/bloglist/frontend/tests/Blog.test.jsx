import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'

test('renders title and author', () => {
	const blog = {
		title: 'testing bloglist app',
		author: 'Mikko',
		url: 'https://www.example.com',
		likes: 10,
		user: {
			username: 'mikko',
		},
	}

	const { container } = render(<Blog blog={blog} />)

	const div = container.querySelector('.blog')
	expect(div).toHaveTextContent('testing bloglist app')
})
