import Blog from '../src/components/Blog'
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent } from '@testing-library/react'


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

	const div = container.querySelector('.blog-title')
	expect(div).toHaveTextContent('testing bloglist app')

	const div2 = container.querySelector('.blog-author')
	expect(div2).toHaveTextContent('Mikko')

	const element = screen.getByText('show more info')
	expect(element).toHaveStyle('display: inline-block')

	const div3 = container.querySelector('.blog-url')

	expect(div3.parentElement).toHaveStyle('display: none')
})

test('renders url and likes when show more info is clicked', async () => {
	const blog = {
		title: 'testing bloglist app',
		author: 'Mikko',
		url: 'https://www.example.com',
		likes: 10,
		user: {
		  username: 'mikko',
		},
	  }
	
	 render(<Blog blog={blog} />)

	 
	 const user = userEvent.setup()
	 const button = screen.getByText('show more info')
	 await user.click(button)

	  const divUrl = screen.getByText('url: https://www.example.com')
	  expect(divUrl.parentElement).toHaveStyle('display: block')

	  const divLikes = screen.getByText('likes :10')
	  expect(divLikes).toBeInTheDocument()
})