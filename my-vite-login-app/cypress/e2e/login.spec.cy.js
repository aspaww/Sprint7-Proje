describe("Login Form Tests", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("a) Başarılı form doldurulduğunda submit edebiliyorum ve success sayfasına yönlendiriliyorum", () => {
      // Doğru email, güçlü şifre ve şartlar kabul edildiğinde
      cy.get('[data-testid="email-input"]').type("test@example.com");
      cy.get('[data-testid="password-input"]').type("StrongP@ss1");
      cy.get('[data-testid="terms-checkbox"]').check();
  
      // Submit butonunun aktif olduğunu kontrol et
      cy.get('[data-testid="submit-button"]').should("not.be.disabled").click();
  
      // Başarılı giriş sonrası success sayfası kontrolü
      cy.url().should("include", "/success");
      cy.contains("Başarıyla Giriş Yaptınız!");
    });
  
    it("b) Hatalı durumlarda beklenen hata mesajları görünüyor ve buton disabled kalıyor", () => {
      // 1. Senaryo: Yanlış email
      cy.get('[data-testid="email-input"]').type("yanlisemail");
      cy.get('[data-testid="password-input"]').type("StrongP@ss1");
      cy.get('[data-testid="terms-checkbox"]').check();
  
      cy.get('[data-testid="error-messages"]').children().should("have.length", 1);
      cy.contains("Lütfen geçerli bir email adresi giriniz.");
      cy.get('[data-testid="submit-button"]').should("be.disabled");
  
      // Temizle
      cy.reload();
  
      // 2. Senaryo: Email ve password yanlış
      cy.get('[data-testid="email-input"]').type("yanlisemail");
      cy.get('[data-testid="password-input"]').type("zayıf");
      cy.get('[data-testid="terms-checkbox"]').check();
  
      cy.get('[data-testid="error-messages"]').children().should("have.length", 2);
      cy.contains("Lütfen geçerli bir email adresi giriniz.");
      cy.contains("Lütfen güçlü bir şifre giriniz (en az 8 karakter, büyük/küçük harf, rakam, özel karakter).");
      cy.get('[data-testid="submit-button"]').should("be.disabled");
  
      // Temizle
      cy.reload();
  
      // 3. Senaryo: Email ve password doğru ama şartlar kabul edilmemiş
      cy.get('[data-testid="email-input"]').type("test@example.com");
      cy.get('[data-testid="password-input"]').type("StrongP@ss1");
      // Şartları kabul etmiyoruz
  
      cy.get('[data-testid="error-messages"]').children().should("have.length", 1);
      cy.contains("Devam edebilmek için şartları kabul etmelisiniz.");
      cy.get('[data-testid="submit-button"]').should("be.disabled");
    });
  });
  