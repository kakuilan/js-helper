module.exports = {
    verbose: true,
    testMatch: ["**/test/**/*.test.[jt]s?(x)"],
    testEnvironment: "node",
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    }
};
