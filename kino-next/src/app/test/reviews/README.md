## Teststrategi
Samtliga test för recensionerna testar `cmsAdapter` för att validera dess roll som 'interface' mellan vår Kino-sida och Richards externa API
Testningen av recensioner isolerar funktionerna i cmsAdapter genom att mocka `globalThis.fetch()` för att undvika riktiga HTTP anrop.
Testningen syftar till att verifiera korrekt 'översättning' app-requests till färdiga API-anrop, då detta är den kritiska delen i logiken

Varje test är isolerat till en enskild funktion ur cmsAdapter

**Requests**
- Båda testfilerna verifierar att rätt API-endpoint har anropats med rätt parametrar
- `fetchReviews` kollar specifikt att parametrar för film-ID och paginering finns med i fetch URL:en
- `postReview` håller reda på att HTTP-metoden POST har använts, och att Content-Type headern är specificerad

**Responser**
- Testfilerna gör enklel validering av responsen från samtliga API-endpoints

**Paginering**
- Eftersom att pagineringen är en stor del av funktionaliteten hos GET-endpointen för recensioner fokuserar testerna lite extra på just detta
- Testerna validerar parametrar för sidnummer och storleken på sidorna, som båda är två kritiska delar som krävs för att frontend ska fungera
- Testerna verifierar att anrop till GET-endpointen med olika sidnummer reflekteras i fetch-anropen

**Isolering**
- Testerna använder `beforeEach()` för att rensa all mock-data från tidigare tester, detta för att försäkra att varje test börjar från ett rent 'state'

## Kör testet
terminalen: npm run test