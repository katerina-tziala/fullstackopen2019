describe('Bloglist App - User Is NOT Logged In', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.visit('http://localhost:3000');
    });

    it('Login form can be opened', function () {
        cy.contains('Login').click();
    });

    it('User can login', function () {
        cy.contains('Login').click();
        cy.get('#username').type('mluukkai');
        cy.get('#password').type('salainen');
        cy.contains('login').click();
        cy.contains('Matti Luukkainen');
    });
});

describe('Bloglist App - User Is Logged In', function () {
    before(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.visit('http://localhost:3000');
        cy.contains('Login').click();
        cy.get('#username').type('mluukkai');
        cy.get('#password').type('salainen');
        cy.contains('login').click();
    });

    it('Blogs can be visited', function () {
        cy.contains('blogs').click();
        cy.contains('Blogs');
    });

    it('Users can be visited', function () {
        cy.contains('users').click();
        cy.contains('Users');
    });

    it('Specific user can be viewed', function () {
        cy.contains('users').click();
        cy.contains('Users');
        cy.get('a').contains('Matti Luukkainen').click();
        cy.contains('Added Blogs');
    });

    it('Create blog form can be opened', function () {
        cy.contains('blogs').click();
        cy.contains('new blog').click();
        cy.contains('Create Blog');
    });

    it('User can create blog', function () {
        cy.get('#title').type('Test BlogList App with Cypress');
        cy.get('#author').type('Katerina Tziala');
        cy.get('#url').type('http://localhost:3000/blogs');
        cy.contains('create').click();
        cy.contains('Test BlogList App with Cypress');
    });

    it('Created blog can be opened', function () {
        cy.get('a').contains('Test BlogList App with Cypress').click();
        cy.contains('Test BlogList App with Cypress');
    });

    
    it('User can like a blog', function () {
        cy.contains('Likes').click();
        cy.get('a').contains('1');
    });

    it('User can add comments for a blog', function () {
        cy.get('#comment').type('Nice blog!');
        cy.contains('add comment').click();
        cy.get('.list').find('.item').contains('Nice blog!');
    });

    it('User can delete a blog', function () {
        cy.get('.deleteButtonWrapper').find('button').click();
        cy.get('a').contains('Test BlogList App with Cypress').should('not.exist');
    });

});