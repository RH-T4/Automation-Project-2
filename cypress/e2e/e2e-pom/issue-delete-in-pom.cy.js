/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //open issue detail modal with title from line 16  
      cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it.only('Assignment Bonus TASK1 - Should delete issue successfully', () => {
    //add steps to delete issue
    getIssueDetailsModal()
    cy.get(this.issueDetailModal)
      .find('[data-testid="icon:trash"]')
      .click();
    clickDeleteButton()
    cy.get(this.deleteButton).click();
    cy.get(this.confirmationPopup).should('be.visible');
    confirmDeletion()
    cy.get(this.confirmationPopup).within(() => {
      cy.contains(this.deleteButtonName).click();
    });
    cy.get(this.confirmationPopup).should('not.exist');
    cy.get(this.backlogList).should('be.visible');

  });

  it('Should cancel deletion process successfully', () => {
    //add steps to start deletion proces but cancel it

  });
});
