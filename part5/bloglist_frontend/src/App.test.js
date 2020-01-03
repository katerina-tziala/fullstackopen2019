import React from 'react'
import { render, waitForElement } from '@testing-library/react';
import App from './App';
import UserApp from './components/UserApp';
jest.mock('./services/blogsService');

describe('<App />', () => {
    test('if no user logged in login form is displayed', async () => {
        const component = render(<App />);
        component.rerender(<App />);
        let loginForm;
        await waitForElement(() => loginForm = component.getByText('Login To BlogList'));
        const form = component.container.querySelector('form');
        const usernameInput = component.container.querySelector('input[name="username"]');
        const passwordInput = component.container.querySelector('input[name="password"]');
        expect(loginForm).toBeDefined();
        expect(form).toBeDefined();
        expect(usernameInput).toBeDefined();
        expect(passwordInput).toBeDefined();
    });
});
describe('<App />', () => {
    test('when the user is logged in, the blog posts are rendered to the page', async () => {
        const user = {
            name: "Matti Luukkainen",
            username: "mluukkai",
            id: "5df66c726fc9672bf8b6bdc7",
            blogs: []
        };
        const mockLogoutUser = jest.fn();
        const component = render(<UserApp user={user} loggOutUser={mockLogoutUser} />);
        component.rerender(<UserApp user={user} loggOutUser={mockLogoutUser} />);
        await waitForElement(() => component.container.querySelector('.blog'));

        const blogs = component.container.querySelectorAll('.blog');
        expect(blogs.length).toBe(1);

    });
});
