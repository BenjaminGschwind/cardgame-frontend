describe('Test start game', () => {
    it('join a lobby as a guest, add bot, click ready and start the game', () => {
        // start on the homepage
        cy.visit('localhost:3000')
        // create lobby
        cy.get(
            ':nth-child(1) > .MuiCardActions-root > .MuiButtonBase-root'
        ).click()
        // enter guest username
        cy.get('#usernameEntry').type('GuestUser')
        cy.get('.MuiDialogActions-root > :nth-child(2)').click()
        cy.url().should('include', '/lobby')
        // add bot
        cy.get(
            '.MuiChip-colorSuccess > .MuiChip-label > .MuiButtonBase-root'
        ).click()
        // click ready button
        cy.get('.ready-start-button-wrapper > .MuiButton-contained').click()
        // start game
        cy.get('.ready-start-button-wrapper > .MuiButton-outlined').click()
        cy.url().should('include', '/game')

        /*
        To run this test again, must delete guest user from database
        or change guest username you enter because can't register same guest user twice
        */
    })
})
