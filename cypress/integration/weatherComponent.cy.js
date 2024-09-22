describe('WeatherComponent', () => {
    it('deve carregar e buscar o clima para uma cidade', () => {

        cy.visit('http://localhost:8080');


        cy.get('#input-search').should('exist');


        cy.get('#input-search').type('São Paulo');


        cy.get('img[alt="Icone de Pesquisa"]').click();


        cy.contains('São Paulo').should('exist');
        cy.contains('Clima:').should('exist');
    });

    it('deve mostrar um alerta se a cidade não for digitada', () => {

        cy.visit('http://localhost:8080');


        cy.get('img[alt="Icone de Pesquisa"]').click();


        cy.on('window:alert', (str) => {
            expect(str).to.equal('Por favor, digite o nome de uma cidade.');
        });
    });
});

