import PolygonCollectionPage from "../pages/PolygonCollectionPage";

describe('Add to Cart Feature', () => {

    const polygonCollectionPage = new PolygonCollectionPage();

    beforeEach(() => {
        // Handling uncaught:exception error
        cy.on('uncaught:exception', (e) => {
            return false
        })

        cy.visit(Cypress.env("home") + "/collections/polygon/0xa9a6a3626993d487d2dbda3173cf58ca1a9d9e9f");
        cy.wait(5000);
    })

    it('Verifiy the Cart is being displayed', () => {

        polygonCollectionPage.cartEmptyMessage().should('be.visible').should('have.text', '(Cart is empty)')
        polygonCollectionPage.totalPriceLabel().should('be.visible');
        polygonCollectionPage.totalPriceValue().should('be.visible').should('have.text', '0')
    });
    
    it('Verifiy the product is being added to the cart', () => {

        polygonCollectionPage.cartEmptyMessage().should('be.visible').should('have.text', '(Cart is empty)')
        polygonCollectionPage.addProductToCartAndValidateProductInformation(0);
    });

    it('Verifiy adding the same product twice in the cart', () => {

        polygonCollectionPage.cartEmptyMessage().should('be.visible').should('have.text', '(Cart is empty)')
        polygonCollectionPage.addSameProductTwice(0);
    });


    
});