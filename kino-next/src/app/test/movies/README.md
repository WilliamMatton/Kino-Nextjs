## Testning

Projektet använder Jest för unit testning.

Testet `fetchMovies.test.ts` testar funktionen `fetchMovies()` i `cmsAdapter.ts`.  
Testet kontrollerar att rätt API endpoint anropas och att filmdata returneras korrekt.

Fetch anropet är mockat med `jest.fn()`, vilket innebär att testet använder fejkad testdata istället för att göra ett riktigt API-anrop.

### Kör testet

terminalen: npm run test



