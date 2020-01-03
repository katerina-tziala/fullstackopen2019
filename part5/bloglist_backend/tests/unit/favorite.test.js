const testHelper = require('../../utils/list_helper');

describe('favorite blog', () => {
    const blogs = testHelper.dummyBlogList;

    test('when list has only one blog favorite blog is that', () => {
        expect(testHelper.favoriteBlog([blogs[0]])).toEqual({
            title: 'React patterns',
            author: 'Michael Chan',
            likes: 7,
        });
    });

    test('favorite blog of many blogs found correctly', () => {
        expect(testHelper.favoriteBlog(blogs)).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        });
    });

    test('favorite blog of empty list is empty object', () => {
        expect(testHelper.favoriteBlog([])).toEqual({});
    });

});