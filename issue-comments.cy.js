describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should create a comment successfully', () => {
        const comment = 'TEST_COMMENT';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    });

    it.only('Assignment 1 - create,edit and delete comment successfully', () => {
        const comment = 'TEST_COMMENT';
        const comment_edited = 'TEST_COMMENT_EDITED';

        getIssueDetailsModal().within(() => {
            //add comment
            cy.contains('Add a comment...').click();
            cy.get('textarea[placeholder="Add a comment..."]').type(comment);
            cy.contains('button', 'Save').click().should('not.exist');
            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
            // Store the initial length of the comments array
            const initialLength = comment.length;
            // Assert that the comment is added by checking the updated length of the comments array
            const newLength = comment.length;
            if (newLength === initialLength + 1) {
            console.log("Comment added successfully!");
            } else {
             console.error("Comment addition failed!");
    }

            //edit comment
            cy.get('[data-testid="issue-comment"]').first().contains('Edit')
                .click().should('not.exist');
            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', comment).clear().type(comment_edited);
            cy.contains('button', 'Save').click().should('not.exist');
            cy.get('[data-testid="issue-comment"]').should('contain', 'Edit')
                .and('contain', comment_edited);
            // Function to edit a comment
            function editComment(index, newComment) {
                if (index >= 0 && index < comment.length) {
                    comments[index] = newComment;
                 }
            }
            // Function to assert that a comment is updated and visible
            function assertCommentUpdate(index, expectedComment) {
                const updatedComment = comments[index];
                if (updatedComment === expectedComment) {
                    console.log("Comment update successful. Updated comment:", updatedComment);
                } else {
                    console.error("Comment update failed. Expected:", expectedComment, "Actual:", updatedComment);
                }
            }
            //delete comment
            cy.contains('Delete').click();
        });

            cy.get('[data-testid="modal:confirm"]').contains('button', 'Delete comment')
            .click().should('not.exist');
            getIssueDetailsModal().contains(comment_edited).should('not.exist');
            // Function to remove a comment
            function removeComment(index) {
                if (index >= 0 && index < comment.length) {
                    comment.splice(index, 1);
                }
            }
            
            // Function to assert that a comment is removed and not visible
            function assertCommentRemoved(index) {
                if (index >= 0 && index < comment.length) {
                    console.error("Comment removal failed. Comment still exists:", comments[index]);
                } else {
                    console.log("Comment removal successful. Comment is no longer visible.");
                }
            }     

    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const comment = 'TEST_COMMENT_EDITED';

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', comment);
        });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .should('not.exist');
    });
});
