/**
 * @jest-environment jsdom
 */

import {
    handleSubmit, validateInput
} from "../src/client/js/formHandler"

global.fetch = require('jest-fetch-mock');

function createBody() {
    return '<div id="url"></div>' +
        '<div id="form_results"></div>' +
        '<div id="agreement"></div>' +
        '<div id="confidence"></div>' +
        '<div id="subjectivity"></div>' +
        '<div id="irony"></div>' +
        '<div id="score"></div>';
}

describe(
    "Handle submit", () => {
        beforeEach(() => {
            fetch.resetMocks();
        });

        test("test successful call", async () => {
            document.body.innerHTML = createBody();
            const urlInput = document.getElementById('url');
            urlInput.value = "http://website.com";
            const event = { preventDefault: jest.fn() };
            fetch.mockResponseOnce(JSON.stringify({
                status: {
                    code: "0",
                    msg: "ok"
                },
                agreement: "DISAGREEMENT",
                confidence: "91",
                subjectivity: "SUBJECTIVE",
                irony: "NONIRONIC",
                score_tag: "P"
            }));
            
            await handleSubmit(event);

            expect(fetch).toHaveBeenCalledWith('/process?url=http://website.com');
            expect(document.getElementById('form_results').innerHTML).toBe("OK");
            expect(document.getElementById('agreement').innerHTML).toBe("DISAGREEMENT");
            expect(document.getElementById('confidence').innerHTML).toBe("91");
            expect(document.getElementById('subjectivity').innerHTML).toBe("SUBJECTIVE");
            expect(document.getElementById('irony').innerHTML).toBe("NONIRONIC");
            expect(document.getElementById('score').innerHTML).toBe("Positive");
        });

        test("test failed call", async () => {
            document.body.innerHTML = createBody();

            const urlInput = document.getElementById('url');
            urlInput.value = "http://website.com";
            const event = { preventDefault: jest.fn() };
            fetch.mockResponseOnce(JSON.stringify({
                status: {
                    code: "100",
                    msg: "Failed Data"
                }
            }));
            
            await handleSubmit(event);

            expect(fetch).toHaveBeenCalledWith('/process?url=http://website.com');
            expect(document.getElementById('form_results').innerHTML).toBe("FAILED DATA");
            expect(document.getElementById('agreement').innerHTML).toBe("");
            expect(document.getElementById('confidence').innerHTML).toBe("");
            expect(document.getElementById('subjectivity').innerHTML).toBe("");
            expect(document.getElementById('irony').innerHTML).toBe("");
            expect(document.getElementById('score').innerHTML).toBe("");
            
        });
    }
);

describe(
    "validate url", () => {
        test("test https", async () => {
            expect(validateInput("https://mysite")).toBe(true);
        });
        test("test http", async () => {
            expect(validateInput("http://mysite")).toBe(true);
        });
        test("test null", async () => {
            expect(validateInput(null)).toBe(false);
        });
        test("test with spaces", async () => {
            expect(validateInput("   https://someresource/    ")).toBe(true);
        });
    }
);