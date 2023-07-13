describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.get('[data-testid="board-list:backlog"]')
            .children()
            .first()
            .click();
      cy.get('[data-testid="modal:issue-details"]')
        .should('be.visible');
      });
    });
  
    let issueTitle = 'This is an issue of type: Task.'
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    
    it('Assignment 3 TASK 1 deleting issue and successful removal ', () => {
        getIssueDetailsModal()
            .find ('[data-testid="icon:trash"]')
            .click();
        cy.get('[data-testid="modal:confirm"]')
            .should('be.visible');
        cy.get ('[data-testid="modal:confirm"]')
            .contains('button', 'Delete issue')
            .click()
            .should('not.exist');

        cy.reload();

        cy.get('[data-testid="board-list:backlog')
            .should('be.visible')
            .and('have.length', '1')
        // First issue from the list is deleted
            .children()
            .should('have.length', '3')
            .first()
            .should('not.contain', issueTitle);
        
    });
    
    it.only('Assignment 3 TASK 2 ', () => {
        getIssueDetailsModal()
          .find('[data-testid="icon:trash"]')
          .click();
        cy.get('[data-testid="modal:confirm"]')
          .should('be.visible');
        cy.get('[data-testid="modal:confirm"]')
          .contains('button', 'Cancel')
          .click()
          .should('not.exist');
        cy.get('[data-testid="icon:close"]')
          .first()
          .click();
    
        cy.reload();
    
        cy.get('[data-testid="board-list:backlog')
          .should('be.visible')
          .and('have.length', '1')
        // Assert the presence of the issue in the list
          .children()
          .should('have.length', '4')
          .first()
          .contains(issueTitle);
        });
    });
