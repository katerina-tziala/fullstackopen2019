const testHelper = require('../../utils/list_helper');

describe('most blogs', () => {
    const blogs = testHelper.dummyBlogList;

    test('when list has only one blog most blogs is the author of the blog', () => {
        expect(testHelper.mostBlogs([blogs[0]])).toEqual({
            author: 'Michael Chan',
            blogs: 1,
        });
    });

    test('most blogs of many blogs is calculated right', () => {
        expect(testHelper.mostBlogs(blogs)).toEqual({
            author: 'Robert C. Martin',
            blogs: 3,
        });
    });

    test('most blogs of empty list is empty object', () => {
        expect(testHelper.mostBlogs([])).toEqual({});
    });

});