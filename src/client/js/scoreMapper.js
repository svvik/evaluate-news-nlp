function toHumanReadable(score) {
    if (score === "P+") return "Strong Postive";
    if (score === "P") return "Positive";
    if (score === "NEU") return "Neutral";
    if (score === "N") return "Negative";
    if (score === "N+") return "Strong Negative";
    if (score === "NONE") return "Without Polarity";
    if (score || score === "") {
        return score;
    }
    return "N/A";
}

export { toHumanReadable }
