describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("allows users to subscribe to the email list", () => {
    const email = "email@email.com"

    cy.getByData("email-input").type(email)
    cy.getByData("submit-button").click()

    cy.getByData("success-message").should("exist").contains(email)
  })

  it("does NOT allow a invalid email address", () => {
    const email = "email.com"

    cy.getByData("email-input").type(email)
    cy.getByData("submit-button").click()

    cy.getByData("success-message").should("not.exist")
  })

  it("does NOT allow already subscribed email addresses", () => {
    const email = "john@example.com"

    cy.getByData("email-input").type(email)
    cy.getByData("submit-button").click()

    cy.getByData("server-error-message")
      .should("exist")
      .contains("already exists. Please use a different email address.")
  })
})
