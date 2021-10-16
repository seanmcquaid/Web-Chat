const checkAuth = require("./checkAuth")
// @ponicode
describe("checkAuth", () => {
    test("0", async () => {
        await checkAuth({ headers: { authorization: false }, token: ")" }, { status: () => 500 }, () => " ")
    })

    test("1", async () => {
        await checkAuth({ headers: { authorization: 0 }, token: ")" }, { status: () => 500 }, () => " ")
    })

    test("2", async () => {
        await checkAuth({ headers: { authorization: false }, token: "):" }, { status: () => 404 }, () => " ")
    })

    test("3", async () => {
        await checkAuth({ headers: { authorization: false }, token: "," }, { status: () => 200 }, () => " ")
    })

    test("4", async () => {
        await checkAuth({ headers: { authorization: false }, token: "</s>" }, { status: () => 400 }, () => " ")
    })

    test("5", async () => {
        await checkAuth({ headers: {}, token: "" }, { status: () => -Infinity }, undefined)
    })
})
