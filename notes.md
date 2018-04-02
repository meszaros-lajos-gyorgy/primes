# előszűrés

* nézzük meg az utolsó pár számjegyet. ha az 0, 2, 4, 5, 6, 8 akkor nem prím, mehetünk is tovább (1-et, 3-at, 7-et és 9-et figyelünk csak)
* minden prim 6k+-1 alakban van, ezért ha a +-1-es alak nem osztható hárommal (számjegyek összege nem osztható hárommal) akkor nem prim, mehetünk tovább
* a páratlan prímekből(>2) csak 1 olyan eset van, ahol 3 egymást követi: 3 5 7. Minden más esetben 1 prím -> 1 lyuk, vagy 2 prím -> 1 lyuk

# oszthatóság vizsgálat

**2**: az utolsó számjegy 0, 2, 4, 6, vagy 8

**3**: számjegyek összege osztható-e 3-al; a szám maga egymást követő 3 szám szorzata (n * n - 1 * n + 1);
   számoljuk meg hányszor szerepel a 2-es, 5-ös és 8-as a számban, majd számoljuk meg ugyanígy az 1, 4 és 7 előfordulását. Vonjuk ki a 2-5-8-as összeget az 1-4-7-es összegből. Ha az osztható 3-al, akkor a szám is.

**5**: 0-ra, vagy 5-re végződik a szám

**7**: az első számjegytől az utolsó előttiig tartó számból ki kell vonni az utolsó számjegy kétszeresét. ezt ismételni addig amig egyértelműen ki nem derül, hogy héttel osztható vagy sem.
  pl 211 -> 21-(2x1) -> 19 - tehát nem osztható héttel
     213 -> 21-(2x3) -> 15 - tehát nem oszthetó héttel (de ez korábban kiesett a hárommal oszthatóság miatt)
     215 -> 21-(2x5) -> 11 - tehát nem osztható héttel (de ez korábban kiesett az utolsó számjegy miatt)
     217 -> 21-(2x7) -> 14 - tehát osztható héttel!
     123456789 -> 12345678-18 -> 12345660 -> 1234566-0 -> 123456-12 -> 123444 -> 12344-8 -> 12336 -> 1233-12 -> 1221 -> 122-2 -> 120 -> 12-0 -> 12 -> 1-4 -> -3 // tehát nem osztható héttel

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

37-ig a számegyenes felosztása 3 szakaszba:
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

a 3 részre felosztott számegyenes első szakasza alapján hány szám prímségét lehet egyszerre ellenőrizni úgy, hogy azok ne akadjanak össze?
máshogy fogalmazva: ha az első szakasz adott, akkor mik lehetnek a 3. szakaszban?

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

A floor(sqrt(n)) az első szakasz felső határa, így eddig csak 1 számhoz tartozó négyzeteket vizsgáltunk.
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

Ha csak 1 számhoz tartozó négyzetszámokat vizsgálunk, ami az első szakasz utolsó eleme ( floor(sqrt(n)) ),
akkor mi fogja kiszámítani az esetleges prímeket a második szakaszban?

Lefedetlen terület illusztrálása: (a harmadik szakaszba visszatettem n^2 és n^2+1 biztos nem prímeket)
[2] [3] [4..8]          - 3-at nem tudjuk kiszámolni
[3] [4..8] [9..15]      - a második szakasz megegyezik a 2 harmadik szakaszával
4: nem prím
[5] [6..24] [25..35]    - a második szakaszból 6..15-ig fedve vagyunk, 16..24-ig nem

És ha nem hagyjuk ki a 4-et, mert akadhat olyan négyzetszáma, ami prím?
[4] [5..15] [16..24]    - a második szakaszból 5..8-ig fedezi 2, 9..15-ig pedig fedezi 3
Akkor megvan a hiányzó szakasz 5-höz

# méretbeli célok

js Number.MAX_SAFE_INTEGER                  9007199254740991 - 2^53-1
max uint64                              18446744073709551615 = 2^64-1
windows 7 calc.exe          99999999999999999999999999999999 = 10^32-1 ~= 2^106.301

Mi lenne, ha egymás mellé tennénk 2db uint64-et, mint ahogy a 16 bites AX-et is össze lehet rakni 2 db 8 bites AL és AH regiszterekből?
Azzal 128 bitet kapnánk -> 2^128-1 lenne a legnagyobb szám (uint128)

Ha sikerülne a fenti 2*uint64 összeragasztása, akkor igazából már akármennyit össze lehetne rakni.
Viszont valahogy dinamikusra kellene csinálni az egészet, hiszen nem számolunk mindig 128 bites számokkal, lehetne ezt valahogy dinamikusan növekvőre csinálni.