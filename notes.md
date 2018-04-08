# English translation will come in the future, but at this point it is easier for me to plan in hungarian.

---

# előszűrés N szám prímség vizsgálatához

* (N > 5) nézzük meg az utolsó számjegyet. ha az 0, 2, 4, 5, 6, 8 akkor nem prím, mehetünk is tovább (1-et, 3-at, 7-et és 9-et figyelünk csak)
* minden prim 6k+-1 alakban van, ezért ha a +-1-es alak nem osztható hárommal (számjegyek összege nem osztható hárommal) akkor nem prim, mehetünk tovább
* a páratlan prímekből (N > 2) csak 1 olyan eset van, ahol 3 egymást követi 2 távolságra: 3 5 7. Minden más esetben 1 prím -> 1 lyuk, vagy 2 prím -> 1 lyuk, ahol minden lépés két prím, valamint prím és lyuk között 2 (prím hármasok, melyek legkisebb formája a 2-3-5 és 3-5-7 hármasokon kívül: p, p+2, p+6; p, p+4, p+6)

## extra infók, amik talán használhatóak előszűréshez

* bármilyen n esetén lesz legalább 1 prím n és 2n között
* ha n prím, akkor a következő prím n és 2n között kell, hogy legyen; ha n > 100, akkor n és 1.2n között lesz a következő prím

# oszthatóság vizsgálat

**2**: az utolsó számjegy 0, 2, 4, 6, vagy 8

**3**: számjegyek összege osztható-e 3-al; a szám maga egymást követő 3 szám szorzata (n * (n - 1) * (n + 1));
   számoljuk meg hányszor szerepel a 2-es, 5-ös és 8-as a számban, majd számoljuk meg ugyanígy az 1, 4 és 7 előfordulását. Vonjuk ki a 2-5-8-as összeget az 1-4-7-es összegből. Ha az osztható 3-al, akkor a szám is.

**5**: 0-ra, vagy 5-re végződik a szám

**7**: az első számjegytől az utolsó előttiig tartó számból ki kell vonni az utolsó számjegy kétszeresét. ezt ismételni addig amig egyértelműen ki nem derül, hogy héttel osztható vagy sem.
  pl 211 -> 21-(2x1) -> 19 - tehát nem osztható héttel
     213 -> 21-(2x3) -> 15 - tehát nem oszthetó héttel (de ez korábban kiesett a hárommal oszthatóság miatt)
     215 -> 21-(2x5) -> 11 - tehát nem osztható héttel (de ez korábban kiesett az utolsó számjegy miatt)
     217 -> 21-(2x7) -> 14 - tehát osztható héttel!
     123456789 -> 12345678-18 -> 12345660 -> 1234566-0 -> 123456-12 -> 123444 -> 12344-8 -> 12336 -> 1233-12 -> 1221 -> 122-2 -> 120 -> 12-0 -> 12 -> 1-4 -> -3 // tehát nem osztható héttel
  jegyzet: Itt gondolom el kéne tárolni 0 és 100 között a 7-el osztható számokat, ami segítségével ha 3 számjegyűnél kisebbre redukáltuk a számunkat, akkor itt már csak egy sima lookup-pal le tudjuk ellenőrizni az oszthatóságot.
  jegyzet2: ez az egyesével lépkedés nagyon lassú lenne egy baromi nagy számnál. van esetleg megoldás, ami több számmal is tudná csökkenteni a jelöltet?

**11**: az első számjegytől az utolsó előttiig tartó számból kivonom az utolsó számjegyet, és ha az osztható 11-el akkor az eredeti is
  pl 1234567 -> 123456-7 -> 123449 -> 12344-9 -> 12335 -> 1233-5 -> 1228 -> 122-8 -> 114 -> 11-4 -> 7 // ez kisebb mint 11 ezért nem osztható az eredeti szám sem 11-el
     1234571 -> 123457-1 -> 123456 -> 12345-6 -> 12339 -> 1233-9 -> 1224 -> 122-4 -> 118 -> 11-8 -> 3 // ez kisebb mint 11 ezért nem osztható az eredeti szám sem 11-el
     1234574 -> 123457-4 -> 123453 -> 12345-3 -> 12342 -> 1234-2 -> 1232 -> 123-2 -> 121 -> 12-1 -> 11 // éljen, ez osztható 11-el - de mivel 4-re végződik, már korábban kiesett volna

**13**: első számjegytől az utolsó előttiig tartó számhoz kell adni az utolsó számjegy négyszeresét és az eredmény osztható 13-al

**17**: első számjegytől az utolsó előttiig tartó számból kivonjuk az utolsó számjegy ötszörösét és az eredmény osztható 17-el

**19**: első számjegytől az utolsó előttiig tartó számhoz hozzáadjuk az utolsó számjegy kétszeresét és az eredmény osztható 19-el

**23**: elsőtől utolsó előttiig tartó számhoz add az utolsó számjegy 7-szeresét

**29**: elsőtől utolsó előttiig tartó számhoz add az utolsó számjegy 3-szorosát

**31**: elsőtől utolsó előttiig tartó számból vedd el az utolsó számjegy 3-szorosát

**37**: elsőtől utolsó előttiig tartó számból vedd el az utolsó számjegy 11-szeresét

ezt általánosítani is lehet valahogy biztosan

A legtöbb fenti eredmény kiszámítása úgy alakul, hogy egy számot leredukálunk egy kisebbre és annál nézzük meg az oszthatóságot. Erre egy bizonyos számjegy alatti osztókból álló táblázat lehetne a megoldás, amik között megkeressük, hogy tartalmazza-e a mi redukált számunkat. Pl eltárolhatjuk 0 és 100 között n többszöröseit, így ha a számot már sikerült leredukálni 2 számjegyűre, akkor azt már a többel össze tudjuk vetni, hogy megkapjuk az n-el való oszthatóságot.

# lyukas tömb

37 prím-e:
  kezdjük azzal, hogy megnézzük, benne van-e a kiszámolt prímlistában a 37
  persze teljesen felesleges végiggyalogolni a teljes tömbön, mert ha annak végtelen sok eleme van akkor végtelen sokáig fog tartani. ezért sokkal jobb lenne csak az első gyök37-ig lévő elemben keresni; ezért a tömb elejétől megyünk és rögtön kilépünk, amint van találat
    ha igen, akkor prím
    ha nem, akkor meg kell nézni, hogy [2 .. floor(sqrt(37))] között van-e olyan szám, ami osztja azt
      ha van, akkor nem prím
      ha nincs, akkor prím

floor(sqrt(37)) = 6
ezt a számot mindenképp célszerű kiszámolni. ez miatt ez is egy fontos momentum lehet hogy milyen módszerrel történik. gyökvonást az fpu csak korlátos számig tudja megoldani
  a 7-től 36-ig terjedő számok ebben az esetben nem fontosak

37-ig a számegyenes felosztása 3 intervallumba:
  [2..6] [7..36] [37]
  
  első tömb: számításhoz;
  második tömb: irreleváns;
  harmadik tömb: maga a szám;

Általános forma:
  [2 .. floor(sqrt(n))] [floor(sqrt(n)) + 1 .. n - 1] [n]
  
_floor(sqrt(n)) + 1 helyett nem jó a ceil(sqrt(n)), mert négyzetszámoknál(4, 9, 16, 25...) nem lenne jó, hiszen ceil(sqrt(n)) == floor(sqrt(n))_

floor(sqrt(n)) = integer square root, avagy egész gyök

http://www.nuprl.org/MathLibrary/integer_sqrt/

```javascript
const isqrt = x => {
  if(x === 0) return 0
  const tmp = 2 * isqrt(x / 4)
  const tmp2 = tmp + 1
  return x < tmp2 * tmp2 ? tmp : tmp2
}

isqrt(Number.MAX_SAFE_INTEGER) // 94906265
```

# párhuzamos számítás

a 3 részre felosztott számegyenes első intervalluma alapján hány szám prímségét lehet egyszerre ellenőrizni úgy, hogy azok ne akadjanak össze?
máshogy fogalmazva: ha az első intervallum adott, akkor mik lehetnek a 3. intervallumban?

[2 .. x] [x+1 .. x^2-1] [x^2] - ez a max?

2^2      = 4
2.9999^2 = 8.99940001 (~9 = 3^2)

3^2      = 9
3.9999^2 = 15.99920001 (~16 = 4^2)

A fenti példákból nézve floor(sqrt(n))-nél az n:
  minimum n^2
  maximum (n+1)^2-1

A négyzetszámokkal magukkal felesleges foglalkozni, így a minimumot növeljük eggyel (n^2+1)
2 kivételével minden prím szám páratlan, így azoknál n^2+1 mindig páros lesz, ezért mégegyszer növeljük a minimumot (n^2+2)

  n=2: [n^2+1 .. (n+1)^2-1] - emellett biztosan tudjuk, hogy n^2 nem prím
  n>2: [n^2+2 .. (n+1)^2-1] - emellett biztosan tudjuk, hogy n^2 és n^2+1 nem prím

A floor(sqrt(n)) az első intervallum felső határa, így eddig csak 1 számhoz tartozó négyzeteket vizsgáltunk.
Mi a helyzet, ha több számot is kapunk a vizsgálathoz, mik a hozzájuk tartozó négyzetszámok?

2: [5..8]   - 4 db szám
3: [11..15] - 5 db szám
4: nem prím szám, kihagyjuk
5: [27..35] - 9 db szám
6: nem prím szám, kihagyjuk
7: [51..63] - 13 db szám
8: nem prím szám, kihagyjuk
9: nem prím szám, kihagyjuk
10: nem prím szám, kihagyjuk
11: [123..143] - 21 db szám
12: nem prím szám, kihagyjuk
13: [171..195] - 25 db szám

Ha csak 1 számhoz tartozó négyzetszámokat vizsgálunk, ami az első intervallum utolsó eleme ( floor(sqrt(n)) ),
akkor mi fogja kiszámítani az esetleges prímeket a második intervallumban?

Lefedetlen terület illusztrálása: (a harmadik intervallumba visszatettem n^2 és n^2+1 biztos nem prímeket)
[2] [3] [4..8]          - 3-at nem tudjuk kiszámolni
[3] [4..8] [9..15]      - a második intervallum megegyezik a 2 harmadik intervallumával
4: nem prím
[5] [6..24] [25..35]    - a második intervallumból 6..15-ig fedve vagyunk, 16..24-ig nem

És ha nem hagyjuk ki a 4-et, mert akadhat olyan négyzetszáma, ami prím?
[4] [5..15] [16..24]    - a második intervallumból 5..8-ig fedezi 2, 9..15-ig pedig fedezi 3
Akkor megvan a hiányzó intervallum 5-höz

# fragmentált tömb (több, átfedésbe került lyukas tömb)

A prímek tömbje elvileg a kisebb számoktól fog sorfolytonosan feltöltődni, de nagyobb prímeknél már nehezebb kitölteni az [iroot(n)+1 .. n-1] űrt. Útközben jöhetnek újabb számítások, amikhez ugyan megvan a szükséges [2 .. iroot(n)], vagy csak keveset kell számítani, de mégis oda jutunk, hogy lesz több, nem összefüggő intervallumunk a prímek listájában

A valóságban nem úgy tárolnánk el az utolsó kiszámolt prímet, hogy az az n-hez tartozó floor(sqrt(n)), hanem csak mint egy sima számot, ahol a prímek listája megszakad. Ezután viszont jönne egy ismeretlen hosszúságú űr, amit n zárna le. Fontos lenne azt is eltárolni, hogy a gyökvonás után iroot(n)-ig bezárólag minden szám vizsgálatra került, ezeket már többé nem kell vizsgálni. Ugyanígy fontos lenne azt is eltárolni, hogy magát n-t is vizsgáltuk, és ha az prím volt, akkor ezután n-t, n-1-et és n+1-et már nem kell vizsgálni (n volt a prím, előtte és utána csak nem prímek vannak), illetve ha nem volt prím, akkor csak magát n-t nem kell vizsgálni, habár n-1, vagy n+1 még lehet prím.

Sok számítás után egy darab összefüggő lista lesz a prímekkel, amit majd néha felbukkanó 1, vagy 3 számjegyeket lefedő intervallumok fognak követni összefüggéstelen listában. Néha ezek a listák összeérhetnek, amik esetében ezeket jó lenne kombinálni.

Ha a fentiek alapján 3 elemet le tudunk fedni azzal, hogy n prím, akkor célszerű azt eltárolni, hogy kezdődik egy új prímszámokat magába foglaló intervallum, ami n-1-nél kezdődik és n+1-nél végződik, valamint 1 db kiszámolt prímet tartalmaz: n-t. Később, ha ezek az elemek találkoznak, akkor az alábbi módon kerülnének kombinálásra:

```
a: [[n-1 .. n+1], [n]]
b: [[m-1 .. m+1], [m]]
(a+b): [[n-1 .. m+1], [n, m]]
```

# Az ideális séma a prímek és a töredékek tárolására

**Intervallum (interval)**: n és m közötti összes egész szám. Ennek elemei nem fontosak, elég csak azt tudni, honnan kezdődik és hol ér véget.

Ezen belül vannak a **prímek (primes)**, amelyek az intervallumban található összes prímet foglalják magukba.

Nem szükséges, hogy egy intervallum tartalmazzon prímeket.

Több intervallum is lehet definiálva, amelyeket egymással való érintkezés, vagy átfedés esetén kombinálni kell egy közös intervallumba.

Létezik egy olyan intervallum, amelyik mindig 0-tól kezdődik, ez a **bázis (base)**. Ez a legfontosabb intervallum, mert ez adja meg, meddig tudunk prímeket ellenőrizni újabb prímek számolása nélkül.

Az intervallumok közötti nem ellenőrzött számok halmaza a **rés (gap)**.

Az intervallumokon belül garantálni kell, hogy ne legyen rés és minden prímje fel legyen fedezve.

Az intervallumok közötti rések feltöltéséhez a prioritást mindig a bázis és az utána levő első intervallum közti rés kapja, így garantált, hogy
  
  * a bázis növekszik és
  * a lehetséges kiszámolandó prímek közül mindig a legegyszerűbbek kerülnek kiszámításra

## Intervallumok létrehozása 1db szám segítségével

Az előszűrési feltételek segítségével számítás nélkül tudjuk kijjebb tolni egy intervallum határát.

Egy új intervallumhoz 1 szám is elég, ami 3 fajta lehet:

* prím
* nem prím, páratlan
* nem prím, páros

### Páros/Páratlan vizsgálat

* Ha N prím és N > 3, akkor [N-1 .. N+1]
* Ha N nem prím, páratlan és N > 3, akkor [N-1 .. N+1]
* Ha N nem prím, páros és N > 2, akkor [N]

Összegezve a lefedett számok mennyisége szerint növekvő sorrendben:

* [N] - 1 hosszú - N páros
* [N-1..N+1] - 3 hosszú - N páratlan

### 1-3-7-9 vizsgálat

* Ha N prím, akkor: N=...1 -> [N-1..N+1] | N=...3 -> [N-1..N+3] | N=...7 -> [N-3..N+1] | N=...9 -> [N-1..N+1]
* Ha N nem prím és páratlan, akkor: N=...5 -> [N-1..N+1]
* Ha N nem prím és páros, akkor: N=...0 -> [N] | N=...2 -> [N] | N=...4 -> [N..N+2] | N=...6 -> [N-2..N] | N=...8 -> [N]

Összegezve a lefedett számok mennyisége szerint növekvő sorrendben:

* [N] - 1 hosszú - N={...0, ...2, ...8}
* [N-1..N+1] - 3 hosszú - N={...1, ...5, ...9}
* [N..N+2] - 3 hosszú - N={...4}
* [N-2..N] - 3 hosszú - N={...6}
* [N-1..N+3] - 5 hosszú - N={...3}
* [N-3..N+1] - 5 hosszú - N={...7}

### Prím hármasok

Itt már nem tudunk csak 1 számmal dolgozni, ehhez 2 prím kell, ez intervallumok kombinálásánál lehetne hasznos.

## 2 intervallum egyesítése

## Bázis jellemzői és a bővítése

A prímek pozitív egész számok, ezért a bázis alsó határa mindig 0.

Annak érdekében, hogy az előszűrési feltételek kivételeit ne kelljen minden egyes újabb prímnél vizsgálni, a bázisba bele van égetve az első pár prím. Ezek a **beégetett prímek**. Pl ha N 1-3-7-9-re végződik akkor esélyes, hogy prím, de csak akkor, ha N>5. Ennek érdekében az 5 és azalatti prímeket érdemes előre felvenni a kiszámolt prímek közé, hiszen a kivétel csak 3 db prímet érintene a lista elejéről.

A beégetett prímek mennyisége attól függ, hogy hány előszűrési feltételt veszünk figyelembe a kódban. A prímhármasok figyelembe vétele miatt a beégetett prímekkel lefedjük az egymáshoz legközelebb álló prímhármasok 2 esetét, így a beégetett prímeket minimum 7-ig kell felvenni. További előszűrések kivételei feljebb tornászhatják ezt a minimumot.

// az alábbi minden intervallumra érvényes
A kiszámolt prímeknél figyelembe kell azt is venni, amit a prímhármasok előszűrése megkövetel: nem lehet 1-nél több 2 távolságra levő prím egymás után. Páratlan prímeket nézve az alábbi módon alakulnak a további páratlan számok: 1 prím -> 1 lyuk, vagy 2 prím -> 1 lyuk, ahol minden lépés 2 prím, valamint prím és lyuk között 2. Ezt úgy tudjuk figyelembe venni, hogy egy számlálóban külön nyílván tartjuk, a lista végén álló prímek visszafele nézve hány db 2 távra levő prímpárral rendelkeznek, amit természetesen elég csak addig tárolni, amíg ez a távolság nem lesz több, mint 2. Mivel ezek a 2 távra levő prímpárok(ikerprímek) 2-3-5 és 3-5-7 esetén kívül maximum 1-szer szerepelnek egymás után, így az utolsó távolság vagy ikerprím volt, vagy nem. Ha az utolsó 2 prím ikerprímet alkotott - esetleg még az előtte levő is, ha a legutolsó prímszám 7 volt -, akkor mindenképp a következő prím már legalább 4 távolságra lesz. Erre a célra egy boolean tökéletesen elegendő.

## Bázis és intervallum egyesítése

# méretbeli célok

js Number.MAX_SAFE_INTEGER                  9007199254740991 - 2^53-1
max uint64                              18446744073709551615 = 2^64-1
windows 7 calc.exe          99999999999999999999999999999999 = 10^32-1 ~= 2^106.301

Mi lenne, ha egymás mellé tennénk 2db uint64-et, mint ahogy a 16 bites AX-et is össze lehet rakni 2 db 8 bites AL és AH regiszterekből?
Azzal 128 bitet kapnánk -> 2^128-1 lenne a legnagyobb szám (uint128)

Ha sikerülne a fenti 2*uint64 összeragasztása, akkor igazából már akármennyit össze lehetne rakni.
Viszont valahogy dinamikusra kellene csinálni az egészet, hiszen nem számolunk mindig 128 bites számokkal, lehetne ezt valahogy dinamikusan növekvőre csinálni.

Példa, hogy hogyan lehetne két i32-ből i64-et emulálni: https://developer.mozilla.org/en-US/docs/Mozilla/js-ctypes/js-ctypes_reference/UInt64

! Ha a JS támogatja majd a BigInt-et, akkor nem szabad megelégednünk majd a 64 bittel, az mindenki számára elérhető lesz. Jó lenne akkor már kapásból 128 bitre felkészülni.

A bitcoin már csinált 256 bites uint emulációt is: https://github.com/bitcoin/bitcoin/blob/master/src/uint256.h - operator overloaddal egész elegáns a megoldás
Íme, az uint1024 se jelent gondot: https://github.com/bajtos/knapsack-crypto/blob/master/uint1024.c

Jön a BigInt a JS-be: https://github.com/tc39/proposal-bigint

Egyelőre az i64 az nem szökhet ki a webassembly világából: https://github.com/WebAssembly/design/pull/923
Viszont tervezik, hogy ha a futtató platform támogatja a BigInt-et, akkor ott menni fog a típuskonvertálás: https://github.com/WebAssembly/design/issues/1172

# távlati célok

Éppen a fent említett dolgok olyan korlátok jelenleg, amik meggátolják hogy belátható időn belül rendes számként tekintsünk a nagyon nagy számokra, és mivel egyik megvalósitás sem ad lehetőséget végtelen méretű számok feldolgozására ezért érdemesebb egyedi - fenti korlátok nélküli - megoldást fejleszteni. És ezért is fontos a jelenlegi rendszerek korlátainak ismerete.

# mit lehet csinálni ezzel az egésszel, mire tudná használni ezt a felhasználó?

* meg tudjuk mondani, hogy az adott szám prím-e
* ha prím, akkor
  * meg tudjuk mondani, hogy hanyadik
  * meg tudjuk mondani, melyek az előző és következő prímek és hogy azok milyen távra vannak
  * tudunk róla jellemzőket, pl az adott prím mersenne prím (ez opcionális)
* ha nem prím, akkor
  * meg tudjuk mondani, melyek a legközelebbi prímszámok a szám előtt és után és hogy azok milyen távra vannak
  * tudunk adni prímtényezős bontást
  * meg tudjuk adni a legkisebb osztót
* meg tudjuk adni egy adott szám előtti utolsó és utáni első prímet
* meg tudjuk mondani, hogy egy szám alatt hány db prím található
* meg tudjuk keresni 2 szám legkisebb közös többszörösét és legnagyobb közös osztóját (prímtényezős bontás eredményeit tudjuk összesíteni, de erre van más megoldás is)
* meg tudjuk mondani, hogy 2 számból képzett arány egyszerűsíthető-e (legnagyobb közös osztó > 1)
