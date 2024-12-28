it('should show error message for invalid password with special characters', () => {
  cy.get('input[type="email"]').type('test@domain.com');
  cy.get('input[type="password"]').type('Password@123'); // Geçersiz şifre
  cy.get('input[type="checkbox"]').check();
  cy.get('span').contains('Şifreniz en az 8 karakter olmalı, büyük harf, küçük harf ve rakam içermelidir. Özel karakterler kullanılamaz.');
  cy.get('button[type="submit"]').should('be.disabled');
});

it('should show error message for invalid email format', () => {
  cy.get('input[type="email"]').type('invalid-email');
  cy.get('input[type="password"]').type('Password123');
  cy.get('input[type="checkbox"]').check();
  cy.get('span').contains('Geçerli bir email adresi girin.');
  cy.get('button[type="submit"]').should('be.disabled');
});