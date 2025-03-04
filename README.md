# Oppgave 2: Geografisk IT-utvikling

## Innholdsfortegnelse
- [Demo](https://github.com/Johannestj/Oppgave-2-Geografisk-IT-utvikling#demo)
- [Problemstilling](https://github.com/Johannestj/Oppgave-2-Geografisk-IT-utvikling#problemstilling)
- [Teknologivalg](https://github.com/Johannestj/Oppgave-2-Geografisk-IT-utvikling#teknologivalg)
- [Datasett og tjenester](https://github.com/Johannestj/Oppgave-2-Geografisk-IT-utvikling#datasett-og-tjenester)
- [Løsningen](https://github.com/Johannestj/Oppgave-2-Geografisk-IT-utvikling?tab=readme-ov-file#l%C3%B8sningen)
- [Hvordan kjøre applikasjonen](https://github.com/Johannestj/Oppgave-2-Geografisk-IT-utvikling#hvordan-kj%C3%B8re-applikasjon-selv)
- [Lisens](https://github.com/Johannestj/Oppgave-2-Geografisk-IT-utvikling#lisens)

## Demo
[https://youtu.be/0snKqaEQkG4 ](https://github.com/user-attachments/assets/131df351-6d2e-4d89-be05-939f9672c7d8)

<a href="https://youtu.be/0snKqaEQkG4 ">
  <img src="https://youtu.be/0snKqaEQkG4 " alt="Se videoen på yt" width="600">
</a>

## Problemstilling
Gruppen ville lage et interaktivt kart hvor en kunne se nødetater (sykehus, politistasjon og brannstasjoner) og hvor langt unna disse befinner seg områder hvor det er behov for nødhjelp.

Gruppen fant raskt ut at det ikke fantes noen tilgjengelige datasett på hvor sykehus og politistasjoner ligger, men gruppen fant kart over brannstasjoner så det var det gruppen valgte å gå videre med.

Direktoratet for samfunnsikkerhet og beredskap (DSB) har krav for maksimal utrykknigstid. Brann- og redningsvesentets utrykningstid skal ikke overstige 10 minutter ved brann i:
-  tettbebyggelse med særlig fare for rask og omfattende brannspredning
-  sykehus, sykehjem og lignende institusjoner som krever assistert rømning
-  områder med konsentrert og omfattende næringsdrift eller lignende

Videre skal utrykningstiden ikke overstige 20 minutter ved brann i tettsteder, og 30 minutter utenfor tettsteder.

Som resultat av det, ble problemstillingen å "*lage et interaktivt kart hvor en kan se brannstasjoner og beregne avstanden, samt tid fra dem, og til ønsket sted, noe som er viktig for å analysere innsatstiden til brannvesenet*".

## Teknologivalg

**Leaflet**: Gruppen valgte Leaflet på grunn av at gruppen har mest erfaring med denne kartteknologien og fordi det er en av de enklere bibliotekene å bruke sammenlignet med OL og MapLibre.

**Supabase**: Gruppen valgte å benytte Supabase, "open-source Firebase", fordi det gir gruppen en enkel løsning på hvordan vi skal lagre kartdataen gruppen laster ned og en enkel API-tilgang for å hente ut denne dataen. Supabase er bygget på PostgreSQL som støtter PostGIS som gjør det mulig å lagre og håndtere geografiske data effektivt. Supabase har også en tilstrekkelig gratisplan for små prosjekter som passer bra for denne oppgaven.

**Vite**: Gruppen valgte Vite som build tool for prosjektet. Det gir blant annet en rask utviklingsserver, enkel konfigurasjon og Hot Module Replacement.

**NPM**: "Node Package Manager" Gruppen benyttet NPM for å styre nedlasting og bruk av pakker i prosjektet. Pakker til Leaflet, Supabase og støttefunksjoner ble blant annet brukt.

**proj4**: Et bibliotek som ble benyttet for å utføre konverteringer mellom kartografiske projeksjoner

**Leaflet Routing Machine**: Bibliotek benyttet for å enkelt implementere ruting i Leaflet kartet. 

## Datasett og tjenester

**Topografisk Norgeskart WMS**: For å enkelt legge et norsk grunnkart over OpenStreetmap som Leaflet har som standard. Det gir også applikasjonen et mer beskrivende kart.
- lenke: https://kartkatalog.geonorge.no/metadata/topografisk-norgeskart-wms/f004268c-d4a1-4801-91cb-daa46236fab7

**Brannstasjoner**: For å få punkter over brannstasjoner i Agder ble dette datasettet benyttet.
- lenke: https://kartkatalog.geonorge.no/metadata/brannstasjoner/0ccce81d-a72e-46ca-8bd9-57b362376485


## Løsningen

**Webapplikasjon av kartløsning hvor bruker kan plassere markør for å beregne ruten til næreste brannstasjon.** 

Brannstasjonlokasjondata blir hentet fra Supabase og blir representert som røde punkter grafisk på kartet.
Når bruker plasserer markør på kartet vil en algoritme beregne den korteste ruten til den nærmeste brannstasjonen.

## Hvordan kjøre applikasjon selv

```bash
git clone <repo-url>  
cd <mappenavn>
```


```bash
npm install
```

Opprett en .env fil med Supabase API-nøkler til din database.

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

```bash
npm run dev
```

## Lisens
[MIT](https://choosealicense.com/licenses/mit/)
