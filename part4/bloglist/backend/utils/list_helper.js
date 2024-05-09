
const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	const reducer = (sum, item) => {
		return sum + item.likes
	}

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return max.likes > item.likes ? max : item
  }

  const favorite = blogs.reduce(reducer, 0)
  const favoriteObj = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
  return favoriteObj
}

const mostBlogs = (blogs) =>{
  const authors = blogs.map(blog => blog.author)

  const counts = {};
  let maxAuthor = authors[0];
  let maxCount = 0;
  
  authors.forEach(author => {
    counts[author] =  (counts[author] || 0) + 1;
    if (counts[author] > maxCount) {
      maxAuthor = author;
      maxCount = counts[author];
    }
  });
  return maxAuthor;
}

module.exports = {
	dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
