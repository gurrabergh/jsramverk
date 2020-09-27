const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;


test.describe("Me-frontend", function() {

    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("https://me.gustavbergh.me/#/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    test.it("Test go to Report 2", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Report 2")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "me-api");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("reports/week/2"));
        });

        done();
    });

    test.it("Test go to Login", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Logga in")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Logga in");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("login"));
        });

        done();
    });

    test.it("Test go to Register", function(done) {
        // Use nav link to go to home page
        browser.findElement(By.linkText("Logga in")).then(function(element) {
            element.click();
        })
        .then(function() {
            browser.findElement(By.linkText("Registrera ny användare här")).then(function(element) {
                element.click();
            });
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Registrera en ny användare");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("register"));
        });

        done();
    });
});
