import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';
const blogObject = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
};

test('renders content', () => {
    const component = render(
        <SimpleBlog blog={blogObject} />
    );

    //component.debug();

    const headerContainer = component.container.querySelector('.simpleBlog__header');
    expect(headerContainer).toHaveTextContent(blogObject.title + ' ' + blogObject.author);

    const likesContainer = component.container.querySelector('.simpleBlog__likes');
    expect(likesContainer).toHaveTextContent(`blog has ${blogObject.likes} likeslike`);
});

test('clicking the button twice calls event handler twice', () => {
    const mockHandler = jest.fn();

    const { getByText } = render(
        <SimpleBlog blog={blogObject} onClick={mockHandler} />
    );

    const button = getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
});