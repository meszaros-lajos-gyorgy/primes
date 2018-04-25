# English translation will come in the future, but at this point it is easier for me to plan in hungarian.

---

# Kiszámolt vs lehetséges prímek

A számegyenes alsó vége nálunk 2, hiszen az a legkisebb prím, 0 és 1 sose szerepel egyik műveletben sem.

A számegyenest 3 részre osztjuk, amelyek az alábbiak:

1. osztók, avagy a kiszámolt prímek
2. irreleváns
3. többszörösök, melyek között lehetséges új prímek vannak

## 1 többszörös(N) adott, mik a lehetséges osztók?

A 2 és N közötti szakaszt 3 részre tudjuk felosztani: `[2..isqrt(N)] [isqrt(N)+1..N-1] [N]`

## Kiszámolt prímek adottak, mely N-ek a többszörösei?

Vegyük első körben csak a legnagyobb kiszámolt prímet(P). Az ahhoz tartozó N-ek az alábbi módon alakulnak:

* ha `P=2`, akkor `[P] [P+1..P^2] [P^2+1..(P+1)^2-1]` = `[P] [P+1..P^2] [P^2+1..P^2+2P]` = `[2] [3..4] [5..8]`
* ha `P>2`, akkor `[P] [P+1..P^2+1] [P^2+2..(P+1)^2-1]` = `[P] [P+1..P^2+1] [P^2+2..P^2+2P]`

**Ez a párhuzamos számítás egyik kulcsa**, hiszen ha adott az első rész, akkor tudjuk egyszerre ellenőrizni a 3. részben szereplő összes számot anélkül, hogy azok ellenőrzése során kétszer ugyanazokat a számításokat végeznénk.

A fenti példában a második részt kitölti az, ha a fenti műveletet végigzongorázzuk a P alatti összes N-re (nem csak prím):

Példa:

`[2] [3] [4..8]` - `3`-at nem tudjuk kiszámolni

`[3] [4..8] [9..15]` - a második rész megegyezik a `P=2` harmadik részével

`[4] [5..15] [16..24]` - a második résznél `5..8`-ig fedezi `P=2`, `9..15`-ig pedig fedezi `P=3`

`[5] [6..24] [25..35]` - a második résznél `6..15`-ig fedve vagyunk, `16..24`-ig pedig fedezi `P=4`

---

# fragmentált tömb (több, átfedésbe került lyukas tömb)

A prímek tömbje elvileg a kisebb számoktól fog sorfolytonosan feltöltődni, de nagyobb prímeknél már nehezebb kitölteni az [iroot(n)+1 .. n-1] űrt. Útközben jöhetnek újabb számítások, amikhez ugyan megvan a szükséges [2 .. iroot(n)], vagy csak keveset kell számítani, de mégis oda jutunk, hogy lesz több, nem összefüggő intervallumunk a prímek listájában

A valóságban nem úgy tárolnánk el az utolsó kiszámolt prímet, hogy az az n-hez tartozó isqrt(n), hanem csak mint egy sima számot, ahol a prímek listája megszakad. Ezután viszont jönne egy ismeretlen hosszúságú űr, amit n zárna le. Fontos lenne azt is eltárolni, hogy a gyökvonás után iroot(n)-ig bezárólag minden szám vizsgálatra került, ezeket már többé nem kell vizsgálni. Ugyanígy fontos lenne azt is eltárolni, hogy magát n-t is vizsgáltuk, és ha az prím volt, akkor ezután n-t, n-1-et és n+1-et már nem kell vizsgálni (n volt a prím, előtte és utána csak nem prímek vannak), illetve ha nem volt prím, akkor csak magát n-t nem kell vizsgálni, habár n-1, vagy n+1 még lehet prím.

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

## Nagyon nagy számok

### Számítás félbeszakítása

Egy idő után a számok prímség ellenőrzése a korábbi prímek segítségével még akkor is érezhetően hosszú és processzorigényes lesz, ha az összes eddigi és jövőbeli optimalizálást alkalmazzuk. Ha már egy nagy szám kiszámítása elkezdődött, de az adott kliens nem tud a végére érni, akkor se kellene az addig elért eredményeket kidobni a kukába, el kéne tárolni, hogy X-et vizsgálta a kliens és Y-ig jutott (ameddig is bizton tudja állítani, hogy <=Y prímek nem osztják X-et).

Az adott szám félbehagyott kiszámítása kell, hogy nagyobb prioritást kapjon az új számok ellenőrzésével szemben. Az adott számítás folytatását fogja megkapni a legelső szabad kliens.

TODO: ennek az információnak a tárolásához jó lenne kitalálni valami formátumot, avagy hogyan lehetne bővíteni az eddigi sémánkat

### 1 prím számíttatása több klienssel

Lehet-e egy adott számot több klienssel is egyszerre számoltatni, illetve érdemes-e?

Úgy képzelem el, hogy 2 kliens feliratkozik ugyanarra a számra és megkapják az instrukciót, miszerint kliens1 minden páros(2, 5, 11, 17...), kliens2 minden páratlanadik prímet(3, 7, 13, 19...) kellene ellenőriznie. Ha az egyik visszajelez, hogy megvan, akkor a szerver broadcast-olja az összes ezzel foglalkozó kliensnek, hogy hagyja abba a számítást, akik erre új számot kérnének.

 * hány prím kiszámolása után kell több részbe tördelni egy prím ellenőrzését?
 * milyen állomások után kelljen 2-be, 3-ba, 4-be, stb törni a számítást?
 * esetleg az egészet prioritás döntse el és lehessen egyes számokra nagyobb prioritást adni valamilyen admin felületről?

TODO2: valahova külön helyre összesíteni a formátumot, ahogyan eltároljuk az adatokat.
TODO3: hogyan lehetne jól széttörni a kiszámolt prímek tömbjét, hogy ne egy monolitikus tömbbe legyen eltárolva?
TODO4: pl 10000 kiszámolt prímenként eltároljuk az eredményeket fájlba és mindig csak egy adott fájl van nyitva, ami tartalmazza a szükséges infókat a további kereséshez. Esetleg van olyan DB, ami ezt könnyen lekezeli?

### Mennyit is kell számolnunk

TODO: Pár példa arra, hogy a prímek ellenőrzéséhez mennyit kell számolnunk és erre esetleg képlet

# méretbeli célok

js Number.MAX_SAFE_INTEGER                  9007199254740991 - 2^53-1
max uint64                              18446744073709551615 = 2^64-1
windows 7 calc.exe          99999999999999999999999999999999 = 10^32-1 ~= 2^106.301

Jön a [BigInt](https://github.com/tc39/proposal-bigint) a JS-be, amivel 2^64-1-et el tudjuk érni. Ha a JS támogatja majd a BigInt-et, akkor nem szabad megelégednünk majd a 64 bittel, az mindenki számára elérhető lesz. Jó lenne akkor már kapásból 128 bitre felkészülni.

Az ArrayBuffer segítségével össze lehetne ragasztani több uint-et is, mint ahogy assemblyben az AX-hez össze lehetett rakni az AL-t és AH-t. Jó lenne, ha a kód le tudná körözni a windows számológépet és gond nélkül kezelne 128 bites számokat is.

Az ArrayBufferrel tömören egymás mellé lehet tenni a számokat és azok binárisan tárolódnának, viszont valami olyan megoldás kellene, ahol változó méretűek lennének a számokra lefoglalt byte-ok. Ugyanis nem dolgoznánk mindig 128 bites számokkal. Erre tökéletes lenne a string, de egy kicsit pazarlónak tűnik az, hogy 1 számjegyre 16 bitet használunk.

Az ArrayBuffer-el képzett számokkal akkor érdemes foglalkozni, ha már az összes fenti kérdés meg van válaszolva és a számításokhoz szükséges összes művelet ismeretes. Az majd ad egy átfogó képet arról, hogy milyen műveleteket kell tudnunk elvégezni a nagy számokkal. **Addig jó lesz a sima javascript-es int.**

# mit lehet csinálni ezzel az egésszel, mire tudná használni ezt a felhasználó?

* meg tudjuk mondani, hogy az adott szám prím-e
* ha prím, akkor
  * meg tudjuk mondani, hogy hanyadik
  * meg tudjuk mondani, melyek az előző és következő prímek és hogy azok milyen távra vannak
  * tudunk róla jellemzőket, pl az adott prím mersenne prím-e (ez opcionális)
* ha nem prím, akkor
  * meg tudjuk mondani, melyek a legközelebbi prímszámok a szám előtt és után és hogy azok milyen távra vannak
  * ki tudjuk számolni a prímtényezős felbontást
  * ki tudjuk számolni a legkisebb osztót
* meg tudjuk adni egy adott szám előtti utolsó és utáni első prímet
* meg tudjuk mondani, hogy egy szám alatt hány db prím található

# Formátum

## Az example-ben található változók jelentése

### Globális adatok

working - számolunk-e éppen
speed - interval sebesség ms-ben
throttle - egy intervalra mennyi számítást végezzünk?

### Bázis

lastCheckedNumber - mi az eddigi legnagyobb szám, amit ellenőriztünk
limit - a rendszer meddig menjen el a prímek kiszámolásával
primes - a prímek listája

### Intervallum

nem kezeljük le az indirekt módon kiszámolt prímeket

# Konkurencia

https://primes.utm.edu/primes/search.php
