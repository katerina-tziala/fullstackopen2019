const testHelper = require('../../utils/list_helper');

describe('total likes', () => {
    const blogs = testHelper.dummyBlogList;

    test('when list has only one blog total likes equals the likes of that', () => {
        expect(testHelper.totalLikes([blogs[0]])).toBe(7);
    });

    test('total likes of many blogs is calculated right', () => {
        expect(testHelper.totalLikes(blogs)).toBe(36);
    });

    test('total likes of empty list is zero', () => {
        expect(testHelper.totalLikes([])).toBe(0);
    });

});