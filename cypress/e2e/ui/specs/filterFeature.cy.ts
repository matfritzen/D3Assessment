import PolygonCollectionPage from "../pages/PolygonCollectionPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";

describe('Filter Feature', () => {

    const polygonCollectionPage = new PolygonCollectionPage();

    beforeEach(() => {
        // Handling uncaught:exception error
        cy.on('uncaught:exception', (e) => {
            return false
        })

        cy.visit(Cypress.env("home") + "/collections/polygon/0xa9a6a3626993d487d2dbda3173cf58ca1a9d9e9f");
        cy.wait(5000);
    })

    it('Validating filter list dropdown is displayed', () => {
        // Assert that the filter is visible and the default value is Low to High
        polygonCollectionPage.dropdownFilterList()
            .should('be.visible')
            .should('have.value', 'Low to High');
    });


    it('Verify Low to High filter sort products', () => {

        polygonCollectionPage.dropdownFilterList()
            .should('be.visible')
            .should('have.value', 'Low to High');

        polygonCollectionPage.productsValue().eq(0).scrollIntoView();
        polygonCollectionPage.verifyProductsAreSortedWithFilter('Low to High')

    });

    it('Verify High to Low filter sort products', () => {

        polygonCollectionPage.dropdownFilterList()
            .should('be.visible')
            .should('have.value', 'Low to High');

        polygonCollectionPage.selectTheFilterInTheDropdownList('High to Low');

        polygonCollectionPage.productsValue().eq(0).scrollIntoView();


        polygonCollectionPage.verifyProductsAreSortedWithFilter('High to Low')

    });
    
    it('Verify Category filter sort products', () => {

        const productDetailsPage = new ProductDetailsPage();

        polygonCollectionPage.expandedFilters()
            .eq(0)
            .should('be.visible')
            .should('have.text', 'Category');

        polygonCollectionPage.selectExpandedFilter('Category');
        polygonCollectionPage.selectCategoryFilterOption('100k Club');

        polygonCollectionPage.clickOnDetailsButton(0)

        productDetailsPage.assertProductAttributeValue('Category','100k Club')


    });

    it('Verify Character Set filter sort products', () => {

        const productDetailsPage = new ProductDetailsPage();

        polygonCollectionPage.expandedFilters()
            .eq(0)
            .should('be.visible')
            .should('have.text', 'Category');

        polygonCollectionPage.selectExpandedFilter('Character Set');
        polygonCollectionPage.selectCharacterSetFilterOption('letter');

        polygonCollectionPage.clickOnDetailsButton(0)

        productDetailsPage.assertProductAttributeValue('Character Set','letter')


    });

    it('Verify Ending filter sort products', () => {

        const productDetailsPage = new ProductDetailsPage();

        polygonCollectionPage.expandedFilters()
            .eq(0)
            .should('be.visible')
            .should('have.text', 'Category');

        polygonCollectionPage.selectExpandedFilter('Ending');
        polygonCollectionPage.selectEndingFilterOption('nft');

        polygonCollectionPage.clickOnDetailsButton(0)

        productDetailsPage.assertProductAttributeValue('Ending','nft')


    });

    it('Verify Picture filter sort products', () => {

        const productDetailsPage = new ProductDetailsPage();

        polygonCollectionPage.expandedFilters()
            .eq(0)
            .should('be.visible')
            .should('have.text', 'Category');

        polygonCollectionPage.selectExpandedFilter('Picture');
        polygonCollectionPage.selectPictureFilterOption('verified nft');

        polygonCollectionPage.clickOnDetailsButton(0)

        productDetailsPage.assertProductAttributeValue('Picture','verified nft')


    });

    it('Verify Type filter sort products', () => {

        const productDetailsPage = new ProductDetailsPage();

        polygonCollectionPage.expandedFilters()
            .eq(0)
            .should('be.visible')
            .should('have.text', 'Category');

        polygonCollectionPage.selectExpandedFilter('Type');
        polygonCollectionPage.selectTypeFilterOption('standard');

        polygonCollectionPage.clickOnDetailsButton(0)

        productDetailsPage.assertProductAttributeValue('Type', 'standard')


    });
    
    

});