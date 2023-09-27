# D3 Assessment

# Setup the project
Ensure you have Node.js installed in your machine <br> 

To start using the project, open the project in VS Code, to install all the packages run the command: **npm install**

# Project Structure

**Environment Variables** <br>
The project is configured with environment variables placed in the .env file <br>
Create a new file as **.env** <br>
You can use the same variables as we have in the **.env.example** file


**Pages:** <br>
The project is structured in the Page Object model, so in the **cypress/e2e/ui/pages** folder is where you are going to find all the elements located in their respective pages.


**Tests:** <br>
The Tests will be under the **e2e/ui/specs** folder <br> 
To execute all the tests you can run command: **npm run uiTests:chrome** <br>
If you want to execute an specific test file, you can also run the cypress command **npx cypress run --spec path_to_test_file** <br>
**E.g.: npx cypress run --spec cypress/e2e/ui/specs/addToCartFeature.cy.ts**


**Report:** <br>
After you execute the tests, the reports/mochawesome-report folder will be created <br>
Then you should run the command : **npm run generateReport** <br>
The report file **output.html** will be created under the report/mochawesome-report folder and the report will be opened automatically <br>
To open the latest report you should run the command: **npm run openReport** <br>
Please, before you run the **npm run openReport** command, get certified you have already generated a report first.


**Videos:** <br>
After you run the tests, the **video** folder will be created <br>
The videos of the test execution will be in the **cypress/videos** folder

**CI/CD:** <br>
To run the pipeline, you should go to **Actions** in the Github project tabs. Then click on **Run workflow** button in the right side of the screen and then click on 
**Run workflow** green button<br>

The jobs will be run in every push to the master branch also. <br>

After the workflow finishes, if you scroll down, you will see the **Artifacts** block. <br>


In the Artifacts block you will be able to see the **test-report** zip file, when you download this file, you will see the report generated for the execution.<br>
You will also see the **videos** zip file, that contains the videos of the execution of all the scenarios.
