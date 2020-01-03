const dummyBlogList = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
];

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes;
    };
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    const favorite = (prev, current) => {
        const favoriteBlog = (prev.likes > current.likes) ? prev : current;
        return {
            title: favoriteBlog.title,
            author: favoriteBlog.author,
            likes: favoriteBlog.likes
        };
    };
    return blogs.length === 0 ? {} : blogs.reduce(favorite, 0);
};

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author).filter((v, i, authors) => authors.indexOf(v) === i);

    const authorsBlogs = [];
    authors.forEach(author => {
        authorsBlogs.push({
            author: author,
            blogs: blogs.filter(blog => blog.author === author).length
        });
    });

    const most = (prev, current) => {
        return (prev.blogs > current.blogs) ? prev : current;
    };
    return authorsBlogs.length === 0 ? {} : authorsBlogs.reduce(most, 0);
};


const mostLikes = (blogs) => {
    const authors = blogs.map(blog => blog.author).filter((v, i, authors) => authors.indexOf(v) === i);

    const authorsBlogs = [];
    authors.forEach(author => {
        authorsBlogs.push({
            author: author,
            likes: totalLikes(blogs.filter(blog => blog.author === author))
        });
    });

    const most = (prev, current) => {
        return (prev.likes > current.likes) ? prev : current;
    };
    return authorsBlogs.length === 0 ? {} : authorsBlogs.reduce(most, 0);
};

module.exports = { dummyBlogList, dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };