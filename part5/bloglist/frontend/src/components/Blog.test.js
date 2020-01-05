import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const blogObject = {
    id: "5df7d986d663721008ed952c",
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: { name: "Matti Luukkainen", username: "mluukkai", id: "5df66c726fc9672bf8b6bdc7" }
};

describe('<Blog/>', () => {
    let component;
    const mockDeleteHandler = jest.fn();
    const mockLikeHandler = jest.fn();
    beforeEach(() => {
        component = render(
            <Blog blog={blogObject} likeBlog={mockLikeHandler} currentUserName={blogObject.user.username} deleteBlog={mockDeleteHandler} />
        );
    });

    test('renders title and author', () => {
        //component.debug();

        const titleContainer = component.container.querySelector('.blog__title');
        expect(titleContainer).toHaveTextContent(blogObject.title);

        const authorContainer = component.container.querySelector('.blog__author');
        expect(authorContainer).toHaveTextContent(`by ${blogObject.author}`);
    });

    test('at start blog info are not displayed', () => {
        const div = component.container.querySelector('.blog__info');
        expect(div).toHaveStyle('display: none');
    });

    test('after clicking the title, blog info if displayed', () => {
        const titleButton = component.container.querySelector('.blog__title');
        fireEvent.click(titleButton);

        const div = component.container.querySelector('.blog__info');
        expect(div).not.toHaveStyle('display: none');

    });

    test('after clicking the title, delete button is displayed only if the logged in user is the user of the blog', () => {
        const titleButton = component.container.querySelector('.blog__title');
        fireEvent.click(titleButton);

        const deleteButton = component.getByText('delete');
        expect(deleteButton).not.toHaveStyle('display: none');
    });
});

test('after clicking the title delete button is not displayed when the logged in user is not the user of the blog', () => {
    const dummyusername = "dummyUser";
    const mockDeleteHandler = jest.fn();
    const mockLikeHandler = jest.fn();
    const component = render(
        <Blog blog={blogObject} likeBlog={mockLikeHandler} currentUserName={dummyusername} deleteBlog={mockDeleteHandler} />
    );

    const titleButton = component.container.querySelector('.blog__title');
    fireEvent.click(titleButton);
    const deleteButton = component.getByText('delete');
    expect(deleteButton).toHaveStyle('display: none');
});