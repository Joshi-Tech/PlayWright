# PlayWright

### What is Playwright?
Playwright is a one of the popular automation tool. I would say it is an one stop shop which provides which provides almost everything as an **automation tester** required. Best of Playwright I liked are as followings
* **It is an open source**
* **Configuration is simple**
* **It provides cross browser testing e.g. Chromium, WebKit, and Firefox.**
* **It is compatible with all modern languages e.g. TypeScript, JavaScript, Python, .NET, Java.**
* **It provides cross-platform testing.**
* **In the same platform you can do testing either for Desktop or mobile.**
* **Playwright has Powerful Tooling like Codegen. Generate tests by recording your actions. Save them into any language.**
* **Playwright inspector. Inspect page, generate selectors, step through the test execution, see click points, explore execution logs.**
* **Playwright Trace Viewer. Capture all the information to investigate the test failure. Playwright trace contains test execution screencast, live DOM snapshots, action explorer, test source, and many more.**

### Playwright.config.ts
* **Playwright.config.ts** is the file where you will find all the configuration for project. You can change configuration according to your need e.g. if you wish to test chrome instead chromium or you want to test in mobile or you want to run your tests in parallel/serial mode or you want to increase or decrease wrokers and so on. This functionality of Playwright makes standout to its peers. Because don't need to do much on configuration side. It is already done for you by Playwright. As user one has to just focus on a quality code.

### How to run tests?
* Open up IDE terminal.
* If you wish to run all test then give following command
   **npx playwright test <directory name>** e.g. `npx playwright test tests`
* If you wish to run tests under a particular file. Then
   **npx playwright test <directory name>/<file name>** e.g. `npx playwright test tests/home.spec.ts`
* If you wish to run tests with limiting workers, you can do so by following command
   **npx playwright test --workers <number of workers>** e.g. `npx playwright test --workers 2`

### How to view test report?
* Playwright provides very clear and nice report in HTML form. Which can be seen by giving below command in the terminal
   **npx playwright show-report**
