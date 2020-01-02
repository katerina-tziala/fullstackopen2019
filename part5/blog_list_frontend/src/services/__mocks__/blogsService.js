const blogs = [
    {
        id: "5df7d986d663721008ed952c",
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        user: { name: "Matti Luukkainen", username: "mluukkai", id: "5df66c726fc9672bf8b6bdc7" }
    }
]

const getAll = () => {
    return Promise.resolve(blogs);
}

export default { getAll }