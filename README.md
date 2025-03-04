# Oppgave 2: Geografisk IT-utvikling

## Innholdsfortegnelse
- Demo
- Problemstilling
- Valg av teknologi
- Datasett benyttet
- Løsningen
- Hvordan kjøre applikasjonen
- Lisens

## Demo (bilder eller video/gif)
demo here
![sio bibble](https://static.wikia.nocookie.net/starwars/images/3/39/SioBibble-SWE.png/revision/latest?cb=20211214011231)

## Problemstilling
Gruppen ville lage et interaktivt kart hvor en kunne se nødetater (sykehus, politistasjon og brannstasjoner) og hvor langt unna disse befinner seg områder hvor det er behov for nødhjelp.

Gruppen fant raskt ut at det ikke fantes noen tilgjengelige datasett på hvor sykehus og politistasjoner ligger, men gruppen fant kart over brannstasjoner så det var det gruppen valgte å gå videre med.

Som resultat av det, ble problemstillingen å "*lage et interaktivt kart hvor en kan se brannstasjoner og brannsmitteområder og se avstanden mellom disse som er viktig i analyse av innsatstiden til brannvesenet*".

## Valg av teknologi

**Leaflet**: Gruppen valgte Leaflet på grunn av at gruppen har mest erfaring med denne kartteknologien og fordi det er en av de enklere biblotekene å bruke sammenlignet med OL og MapLibre.

**Supabase**: Gruppen valgte å benytte Supabase, "open-source Firebase", fordi det gir gruppen en enkel løsning på hvordan vi skal lagre kartdataen gruppen laster ned og en enkel API-løsning for å hente ut denne dataen.

**Vite**: Gruppen benyttet Vite for å kunne

**NPM**: Gruppen benyttet NPM for å laste ned pakker til Supabase og Leaflet enkelt.

**proj4**: Et bibliotek som ble benyttet for å utføre konverteringer mellom kartografiske projeksjoner.

## Datasett benyttet

**Topografisk Norgeskart WMS**: For å enkelt legge et norsk grunnkart over OpenStreetmap som Leaflet har som standard. Det gir også applikasjonen et mer beskrivende kart.
- lenke: https://kartkatalog.geonorge.no/metadata/topografisk-norgeskart-wms/f004268c-d4a1-4801-91cb-daa46236fab7

**Brannstasjoner**: For å få punkter over brannstasjoner i Agder ble dette datasettet benyttet.
- lenke: https://kartkatalog.geonorge.no/metadata/brannstasjoner/0ccce81d-a72e-46ca-8bd9-57b362376485

**Brannsmitteområder**: For å få oversikt over områder i Agder som har spesielt stor fare for at brann i en bygning skal spre seg videre.
- Lenke: https://kartkatalog.geonorge.no/metadata/kulturminner-brannsmitteomraader/73f863ba-628f-48af-b7fa-30d3ab331b8d?search=brannsmitte


## Løsningen

Beskrivelse av løsningen.

## Hvordan kjøre applikasjon selv
```bash
npm install
```

Lag en .env fil med Supabase API-nøkler til din database.

VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

```bash
npm run dev
```

## Lisens
[MIT](https://choosealicense.com/licenses/mit/)
