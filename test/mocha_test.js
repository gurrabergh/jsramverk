const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
const By = webdriver.By;

let browser;

test.describe("Me-frontend", function() {
    this.timeout(0);

    beforeEach(function(done) {
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser('firefox')
            .build();

        browser.get("https://me.gustavbergh.me/");
        done();
    });

    afterEach(function(done) {
        browser.quit();
        done();
    });

    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }
    
    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }
    
    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    test.it("Test go to Report 2", function(done) {
        // try use nav link
        goToNavLink("Report 2");

        assertH1("me-api");
        matchUrl("reports/week/2");

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
