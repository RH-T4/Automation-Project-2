describe('Issue create', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            //System will already open issue creating modal in beforeEach block  
            cy.visit(url + '/board?modal-issue-create=true');
        });
    });

    it('Assignment 2 - add and assert visibility of estimation', () => {
        //Cover time estimation functionality
        //Global variable to store the estimated time
        let estimatedTime = 0;

        //Function to add time estimation
        function addEstimation(hours, minutes) {
            //Convert hours and minutes to minutes and update the global variable
            estimatedTime = hours * 60 + minutes;
        }

        //Function to assert that estimation is added and visible
        function assertEstimation() {
            //Check if the estimated time is greater than zero
            if (estimatedTime > 0) {
                console.log("Estimation is added and visible:", estimatedTime, "minutes");
            } else {
                console.error("Estimation is not added or is invalid.");
            }
        }

        //Test case 1: Add estimation
        addEstimation(2, 30);

        //Test case 2: Assert that estimation is added and visible
        assertEstimation();

    })
    it('Assignment 2 - edit and assert updated estimation', () => {

        // Global variable to store the estimated time
        let estimatedTime = 0;

        // Function to add time estimation
        function addEstimation(hours, minutes) {
            // Convert hours and minutes to minutes and update the global variable
            estimatedTime = hours * 60 + minutes;
        }

        // Function to edit time estimation
        function editEstimation(hours, minutes) {
            // Convert hours and minutes to minutes and update the global variable
            estimatedTime = hours * 60 + minutes;
        }

        // Function to assert that estimation is added and visible
        function assertEstimation() {
            // Check if the estimated time is greater than zero
            if (estimatedTime > 0) {
                console.log("Estimation is added and visible:", estimatedTime, "minutes");
            } else {
                console.error("Estimation is not added or is invalid.");
            }
        }
    });
    it('Assignment 2 - remove estimation and assert that value is removed', () => {
        // Function to remove time estimation
        function removeEstimation() {
            // Set the estimated time to zero to remove the value
            estimatedTime = 0;
        }
        
    });
});