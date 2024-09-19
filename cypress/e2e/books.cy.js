describe("Тестирование библиотеки. Из лекции", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Тест на регистрацию", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible", true);
  });

  it("Тест на ввод пустого пароля", () => {
    cy.login("test@test.com", null);
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("Тест на ввод пустого email", () => {
    cy.login(null, "test");
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });
});

import { faker } from "@faker-js/faker";
let bookData;

describe("Тестирование библиотеки. ДЗ", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    bookData = {
      title: faker.lorem.sentence(3),
      author: `${faker.person.firstName()} ${faker.person.lastName()}`,
    };
  });

  it("Добавление книги", () => {
    cy.AddingBook(bookData.title, bookData.author);
    cy.get(".card-title").should("contain", bookData.title);
  });

  it("Добавление книги в избранное", () => {
    cy.addingBookToFavorites(bookData.title, bookData.author);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain", bookData.title);
  });

  it("Удаление книги из избранного", () => {
    cy.deletingBookFromFavorites(bookData.title, bookData.author);
    cy.visit("/favorites");
    cy.contains(bookData.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookData.title).should("not.exist");
  });
});
