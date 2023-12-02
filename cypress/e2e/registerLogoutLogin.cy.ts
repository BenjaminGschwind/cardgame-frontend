describe('Test register, logout and login', () => {
    it('registers a new user then logout and login with same user', () => {
        // start on the homepage
        cy.visit('localhost:3000')
        // register new User
        cy.get('.registerButton').click()
        cy.url().should('include', '/register')
        cy.get('#username').type('TestUsername')
        cy.get('#username').should('have.value', 'TestUsername')
        cy.get('#password').type('VerySecurePassword')
        cy.get('#password').should('have.value', 'VerySecurePassword')
        cy.get('.MuiButton-root').click()
        cy.url().should('eq', 'http://localhost:3000/')
        // logout
        cy.get('.login-register-button-wrapper > .MuiButtonBase-root').click()
        cy.url().should('eq', 'http://localhost:3000/')
        // login with same user
        cy.get('.loginButton').click()
        cy.url().should('include', '/login')
        cy.get('#username').type('TestUsername')
        cy.get('#username').should('have.value', 'TestUsername')
        cy.get('#password').type('VerySecurePassword')
        cy.get('#password').should('have.value', 'VerySecurePassword')
        cy.get('.MuiButton-root').click()
        cy.url().should('eq', 'http://localhost:3000/')

        /*
        To run this test again, must delete user from database
        or change username you enter because can't register same user twice
        */
    })
})
