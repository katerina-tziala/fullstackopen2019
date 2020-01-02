const testHelper = require('../../utils/list_helper');

test('dummy returns one', () => {
    const blogs = testHelper.dummyBlogList;
    const result = testHelper.dummy(blogs);
    expect(result).toBe(1);
});