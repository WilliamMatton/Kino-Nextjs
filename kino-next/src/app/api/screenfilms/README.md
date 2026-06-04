## Teststrateg

Testet `upcomingscreen.test.ts` 
Koden testar en Next.js App Router-endpoint (GET) som hämtar filmvisningar, filtrerar dem baserat på ett tidsfönster (5 dagar från dagens datum), samt hanterar fel.

Övergripande testmetod:
. Enhetstestning (Unit Testing): Isolera funktionen GET() helt från externa servrar genom att hårdmocka global.fetch.
. Deterministisk tid (Fake Timers): Fixera systemklockan (jest.useFakeTimers) för att garantera att tidskänslig filtrering inte går sönder när testerna körs i framtiden.
. Fokusområden: Filtreringslogik (tid), framgångsrika svar (200 OK), samt felhantering (404 och 500).

Identifierade testfall (Testfallsspecifikation)

1. Filtrering och tidsfönster (Success Paths)
.Inkludering gränsvärde (Idag): Verifiera att visningar som sker exakt idag inkluderas.
. Inkludering gränsvärde (Dag 5): Verifiera att visningar som sker på den femte dagen inkluderas.
. Exkludering gränsvärde (Dag 6): Verifiera att visningar som sker efter 5 hela dagar filtreras bort korrekt.
. Historiska data: Verifiera att visningar som har varit (t.ex. igår) filtreras bort.

2. Felhantering (Error Handling)
. Externt API-fel (404/500): Verifiera att om det externa API:et returnerar ok: false, skickar route vidare rätt felmeddelande och   statuskod (t.ex. 404).
. Nätverkskrasch / Kastade undantag: Verifiera att funktionen fångar upp krascher (mockRejectedValue) och returnerar 500 Internal Server Error istället för att krascha hela applikationen.
. Kontrollera att routen inte kraschar om det externa API:et returnerar tom data (data: []) eller korrupt struktur.


### Kör testet

terminalen: npm run test eller npm test