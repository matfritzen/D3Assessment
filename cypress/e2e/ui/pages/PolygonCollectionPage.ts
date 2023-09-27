import { categoryFilterOptions } from "../../../support/typings/categoryFilter";
import { characterSetFilterOptions } from "../../../support/typings/characterSetFilter";
import { endingFilterOptions } from "../../../support/typings/endingFilter";
import { expandedFilters } from "../../../support/typings/expandedFilters";
import { filterDropdown } from "../../../support/typings/filter";
import { pictureFilterOptions } from "../../../support/typings/pictureFilter";
import { typeFilterOptions } from "../../../support/typings/typeFilter";

export default class PolygonCollectionPage {


    searchBar() {
        return cy.get('[placeholder="Search token id"]').eq(1);
    }

    productsName() {
        return cy.get('h6');
    }

    productsValue() {
        return cy.get('span.tw-truncate > span');
    }

    emptyListedTitle() {
        return cy.get('h3');
    }

    emptyListedMessage() {
        return cy.get('p.mt-8px');
    }

    dropdownFilterList() {
        return cy.get("input[type=search]");
    }

    dropdownFilterOptions() {
        return cy.get("div[role='option']");
    }

    expandedFilters() {
        return cy.get('div.tw-border-t > div.tw-flex-1.tw-text-white-2');
    }

    expandedFilterOptions() {
        return cy.get('button.tw-border-gray-300 > span');
    }

    detailsButton() {
        return cy.get('div.tw-w-fit > a');
    }

    cartEmptyMessage() {
        return cy.get('span.tw-mx-auto');
    }

    totalPriceLabel() {
        return cy.get('div.tw-mb-2 > div');
    }

    totalPriceValue() {
        return cy.get('div.tw-mb-2 p');
    }

    productsImage() {
        return cy.get('img.tw-w-full')
    }


    verifyProductsAreSortedWithFilter(filter: filterDropdown): void {

        let previousValue: number;

        this.productsValue().should('be.visible').each((el, index, list) => {

            let currentValue: number = Number(el.text());

            if (index === 0) {
                previousValue = Number(el.text());
            }
            else {

                if (filter === "Low to High") {

                    // The test is failing currently because the list was not correct
                    // The second item of the list is with a value greater than the third item

                    expect(previousValue).is.lte(currentValue);
                }

                else if ("High to Low") {

                    expect(previousValue).is.gte(currentValue);
                }

                previousValue = currentValue;
            }

        })

    }


    selectTheFilterInTheDropdownList(filter: filterDropdown): void {


        this.dropdownFilterList().click();
        cy.wait(2000);

        cy.get('div[role="listbox"] > div').then((el) => {
            el.removeAttr('style');
        })

        this.dropdownFilterOptions().each((el, index, list) => {
            if (el.text() === filter) {
                cy.wrap(el).click({ force: true });
            }
        })
    }

    selectExpandedFilter(expandedFilter: expandedFilters): void {

        this.expandedFilters().each((el, index, list) => {
            if (el.text() === expandedFilter && index < 6) {
                cy.wrap(el).click();
            }
        })

    }

    selectExpandedFilterOptions(filterOption: categoryFilterOptions | characterSetFilterOptions | endingFilterOptions | pictureFilterOptions | typeFilterOptions, indexLessThan: number): void {
        this.expandedFilterOptions().each((el, index, list) => {
            if (el.text() === filterOption && index < indexLessThan) {
                cy.wrap(el).click();
            }
        })
    }

    selectCategoryFilterOption(filterOption: categoryFilterOptions): void {

        this.selectExpandedFilterOptions(filterOption, 3)

    }

    selectCharacterSetFilterOption(filterOption: characterSetFilterOptions): void {
        this.selectExpandedFilterOptions(filterOption, 3)
    }

    selectEndingFilterOption(filterOption: endingFilterOptions): void {

        this.selectExpandedFilterOptions(filterOption, 143)

    }

    selectPictureFilterOption(filterOption: pictureFilterOptions): void {

        this.selectExpandedFilterOptions(filterOption, 1)

    }

    selectTypeFilterOption(filterOption: typeFilterOptions): void {

        this.selectExpandedFilterOptions(filterOption, 4)

    }

    clickOnDetailsButton(indexOfProductInTheList: number): void {
        this.detailsButton().eq(indexOfProductInTheList).scrollIntoView().click();
    }

    addProductToCartAndValidateProductInformation(indexOfProductInTheList: number): void {

        //Accessing the Details screen of the product to get the Token ID
        this.clickOnDetailsButton(indexOfProductInTheList);

        // Assertion of Product Image, Token ID, and Total Price in the Cart
        cy.get('div.details-key').each((el, index, list) => {
            if (el.text() === "Token ID") {
                cy.wrap(el).find("+ div span").eq(0).invoke('attr', 'title').then(tokenId => {

                    // Returning to the Collection screen
                    cy.go('back');

                    // Getting the current Total Price value in the cart
                    this.totalPriceValue().should('be.visible').then($element => {
                        let sum: number
                        let price: number
                        let totalAmount: number
                        sum = Number($element.text());


                        // Clicking in the image to add the product to the Cart
                        this.productsImage().eq(indexOfProductInTheList).scrollIntoView().click();


                        this.productsName().eq(indexOfProductInTheList).then((element) => {
                            let productName = element.text();

                            //Getting the image of the product in the Cart and validating if the src attribute contains the product name
                            cy.get('img.tw-rounded').should('be.visible').invoke('attr', 'src').should('contain', productName);

                            // Asserting the TokenId of the Product Details screen is the same in the Cart
                            cy.get('a.tw-leading-none').should('have.text', tokenId)

                        })

                        //Getting the price of the product
                        this.productsValue().eq(indexOfProductInTheList).then($price => {
                            price = Number($price.text());

                            totalAmount = sum + price;

                            // Asserting that the Total Price of the cart was updated
                            this.totalPriceValue().should('have.text', totalAmount)

                        })


                    })

                })
            }
        })
    }



    addSameProductTwice(indexOfProductInTheList: number) {
        this.addProductToCartAndValidateProductInformation(indexOfProductInTheList);

        this.productsImage().eq(indexOfProductInTheList).scrollIntoView().click();
        
        this.cartEmptyMessage().should('be.visible').should('have.text', '(Cart is empty)')
        this.totalPriceLabel().should('be.visible');
        this.totalPriceValue().should('be.visible').should('have.text', '0')
    }





}