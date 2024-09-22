describe('WeatherComponent', () => {
    it('deve carregar e buscar o clima para uma cidade', () => {

        cy.visit('http://localhost:8080');


        cy.get('#weather-search input').should('exist');


        cy.get('#weather-search input').type('São Paulo');


        cy.get('img[alt="Icone de Pesquisa"]').click();


        cy.contains('São Paulo').should('exist');
        cy.contains('Clima:').should('exist');

        cy.get('#weather-first-info-container').should('exist');
        cy.get('#weather-basic-advanced-info').should('exist');
    });

    it('deve mostrar um alerta se a cidade não for digitada', () => {

        cy.visit('http://localhost:8080');


        cy.get('img[alt="Icone de Pesquisa"]').click();


        cy.on('window:alert', (str) => {
            expect(str).to.equal('Por favor, digite o nome de uma cidade.');
        });
    });
});

