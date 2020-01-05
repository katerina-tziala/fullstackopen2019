const testHelper = require('../../utils/list_helper');

describe('most blogs', () => {
    const blogs = testHelper.dummyBlogList;

    test('when list has only one blog most blogs is the author of the blog', () => {
        expect(testHelper.mostLikes([blogs[0]])).toEqual({
            author: 'Michael Chan',
            likes: 7,
        });
    });

    test('most blogs of many blogs is calculated right', () => {
        expect(testHelper.mostLikes(blogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17,
        });
    });

    test('most blogs of empty list is empty object', () => {
        expect(testHelper.mostLikes([])).toEqual({});
    });

});