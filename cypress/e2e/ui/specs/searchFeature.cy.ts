import PolygonCollectionPage from "../pages/PolygonCollectionPage";


describe('Search Feature', () => {

    const polygonCollectionPage = new PolygonCollectionPage();

    beforeEach(() => {
        
        // Handling uncaught:exception error
        cy.on('uncaught:exception', (e) => {
            return false
        })
        
        cy.visit(Cypress.env("home") + "/collections/polygon/0xa9a6a3626993d487d2dbda3173cf58ca1a9d9e9f");
        cy.wait(5000);
    })

    it('Verify Search bar is displayed', () => {
        
        //Validating if the Search bar is being displayed
        polygonCollectionPage.searchBar()
        .should('be.visible');
        
    });

    it('Search by a valid token Id', () => {

        // Getting the tokenId of the first element of the products list 
        polygonCollectionPage.productsName().eq(1).should('be.visible').then(($el) => {
            let tokenId : string = $el.text();

            // Searching by the token Id
            polygonCollectionPage.searchBar()
            .should('be.visible').type(tokenId);
            
            cy.wait(2000);

            // Assert that all elements displayed contains the token Id
            polygonCollectionPage.productsName().each((el,index,list) => {
                expect(el.text()).to.include(tokenId);
            })
        })

    })

    it('Search by an invalid token Id', () => {

        let invalidTokenId : string = 'test12345'

        // Searching by the token Id
        polygonCollectionPage.searchBar()
        .should('be.visible')
        .type(invalidTokenId);

        //Asserting the Empty Listed Title
        polygonCollectionPage.emptyListedTitle()
        .should('have.text', 'Oops!')

        //Asserting the Empty Listed Message
        polygonCollectionPage.emptyListedMessage()
        .should('have.text', 'It seems there’s no item you’re looking for. Give it another shot!')

    })

});