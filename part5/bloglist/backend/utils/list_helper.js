const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	const reducer = (sum, item) => {
		return sum + item.likes
	}

	return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
	const reducer = (max, item) => {
		return max.likes > item.likes ? max : item
	}

	const favorite = blogs.reduce(reducer, 0)
	const favoriteObj = {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes,
	}
	return favoriteObj
}

const mostBlogs = blogs => {
	const authors = blogs.map(blog => blog.author)

	const counts = {}
	let maxAuthor = authors[0]
	let maxCount = 0

	authors.forEach(author => {
		counts[author] = (counts[author] || 0) + 1
		if (counts[author] > maxCount) {
			maxAuthor = author
			maxCount = counts[author]
		}
	})
	return maxAuthor
}

const mostLikes = blogs => {
	const authors = []

	blogs.map(blog => {
		const author = blog.author
		const likes = blog.likes
		const personObj = { [author]: likes }
		authors.push(personObj)
	})

	const keys = authors.map(author => Object.values(author)[0])

	const result = keys.reduce((a, b) => {
		return a > b ? a : b
	})
	return result
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
  mostLikes,
}
