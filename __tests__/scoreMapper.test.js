import {
    toHumanReadable
} from "../src/client/js/scoreMapper"

describe(
    "human readable mapping", () => {
        test("test P+", async () => {
            expect(toHumanReadable("P+")).toBe("Strong Postive");
        });
        test("test P", async () => {
            expect(toHumanReadable("P")).toBe("Positive");
        });
        test("test NEU", async () => {
            expect(toHumanReadable("NEU")).toBe("Neutral");
        });
        test("test N", async () => {
            expect(toHumanReadable("N")).toBe("Negative");
        });
        test("test N+", async () => {
            expect(toHumanReadable("N+")).toBe("Strong Negative");
        });
        test("test NONE", async () => {
            expect(toHumanReadable("NONE")).toBe("Without Polarity");
        });
        test("test empty", async () => {
            expect(toHumanReadable("")).toBe("");
        });
        test("test none", async () => {
            expect(toHumanReadable(null)).toBe("N/A");
        });
        test("test unknown", async () => {
            expect(toHumanReadable("something unknown")).toBe("something unknown");
        });

    }
);