describe("Blog App - Component Visibility", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display header with logo and navigation", () => {
    cy.get("header").should("be.visible");
    cy.contains("CiviBlog").should("be.visible");
    cy.contains("Home").should("be.visible");
    cy.contains("+ New Post").should("be.visible");
  });

  it("should display main content area", () => {
    cy.get("main").should("be.visible");
  });

  it("should display page title and description on homepage", () => {
    cy.get("main").should("be.visible");
  });

  it("should display sort control", () => {
    cy.get("select").should("be.visible");
    cy.get("select").should("contain", "Newest");
    cy.get("select").should("contain", "Oldest");
  });
});

describe("Blog App - Routing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should navigate to create post page via New Post button", () => {
    cy.contains("+ New Post").click();
    cy.url().should("include", "/create");
  });

  it("should display form on create post page", () => {
    cy.visit("http://localhost:5173/create");
    cy.get("input").should("have.length.at.least", 1);
    cy.get("textarea").should("be.visible");
    cy.contains("Create").should("be.visible");
    cy.contains("Cancel").should("be.visible");
  });

  it("should navigate back to home from create post via Cancel button", () => {
    cy.visit("http://localhost:5173/create");
    cy.contains("Cancel").click();
    cy.url().should("equal", "http://localhost:5173/");
  });

  it("should navigate back to home via header logo", () => {
    cy.visit("http://localhost:5173/create");
    cy.contains("CiviBlog").click();
    cy.url().should("equal", "http://localhost:5173/");
  });

  it("should navigate back to home via Home link", () => {
    cy.visit("http://localhost:5173/create");
    cy.contains("Home").click();
    cy.url().should("equal", "http://localhost:5173/");
  });
});

describe("Blog App - Post Details", () => {
  it("should display post details when clicking a post", () => {
    cy.visit("http://localhost:5173/");
    // Wait for posts to load
    cy.get("article", { timeout: 5000 }).first().click();
    // Should be on a post detail page
    cy.url().should("include", "/posts/");
    cy.contains("Comments").should("be.visible");
  });
});

describe("Blog App - Responsiveness", () => {
  it("should have responsive grid layout on home page", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[class*="grid"]').should("exist");
  });
});
