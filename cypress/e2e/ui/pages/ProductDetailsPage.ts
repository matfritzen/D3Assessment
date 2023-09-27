import { categoryFilterOptions } from "../../../support/typings/categoryFilter";
import { characterSetFilterOptions } from "../../../support/typings/characterSetFilter";
import { endingFilterOptions } from "../../../support/typings/endingFilter";
import { expandedFilters } from "../../../support/typings/expandedFilters";
import { pictureFilterOptions } from "../../../support/typings/pictureFilter";
import { typeFilterOptions } from "../../../support/typings/typeFilter";

export default class ProductDetailsPage {

    productAttributes() {
        return cy.get('div.attributes-main');
    }



    assertProductAttributeValue(attributeTitle: expandedFilters, attributeValue: categoryFilterOptions | characterSetFilterOptions | endingFilterOptions | pictureFilterOptions | typeFilterOptions){


        let attributesTitleArray = [];
        let attributesValueArray = [];


        this.productAttributes().should('be.visible').each((el, index, list) => {

            // Verifying if the Filter exists in the Product Attributes
            cy.wrap(el).find('div > span').each((elTitle, index, list) => {
                attributesTitleArray.push(elTitle.text());
            })

            cy.wrap(el).find('span').each((elValue, index, list) => {
                attributesValueArray.push(elValue.text());
            })

        })
        .then(() => {
            let attributeTitleAssertion : boolean = attributesTitleArray.includes(attributeTitle);
            let attributeValueAssertion : boolean = attributesValueArray.includes(attributeValue);

            expect(attributeTitleAssertion).to.be.true
            expect(attributeValueAssertion).to.be.true
        })

    }

}