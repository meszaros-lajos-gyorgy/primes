# Az ideális séma a prímek és a töredékek tárolására

## 2 intervallum egyesítése

## Bázis jellemzői és a bővítése

// az alábbi minden intervallumra érvényes
A kiszámolt prímeknél figyelembe kell azt is venni, amit a prímhármasok előszűrése megkövetel: nem lehet 1-nél több 2 távolságra levő prím egymás után. Páratlan prímeket nézve az alábbi módon alakulnak a további páratlan számok: 1 prím -> 1 lyuk, vagy 2 prím -> 1 lyuk, ahol minden lépés 2 prím, valamint prím és lyuk között 2. Ezt úgy tudjuk figyelembe venni, hogy egy számlálóban külön nyílván tartjuk, a lista végén álló prímek visszafele nézve hány db 2 távra levő prímpárral rendelkeznek, amit természetesen elég csak addig tárolni, amíg ez a távolság nem lesz több, mint 2. Mivel ezek a 2 távra levő prímpárok(ikerprímek) 2-3-5 és 3-5-7 esetén kívül maximum 1-szer szerepelnek egymás után, így az utolsó távolság vagy ikerprím volt, vagy nem. Ha az utolsó 2 prím ikerprímet alkotott - esetleg még az előtte levő is, ha a legutolsó prímszám 7 volt -, akkor mindenképp a következő prím már legalább 4 távolságra lesz. Erre a célra egy boolean tökéletesen elegendő.

## Bázis és intervallum egyesítése

## Nagyon nagy számok

### Számítás félbeszakítása

Egy idő után a számok prímség ellenőrzése a korábbi prímek segítségével még akkor is érezhetően hosszú és processzorigényes lesz, ha az összes eddigi és jövőbeli optimalizálást alkalmazzuk. Ha már egy nagy szám kiszámítása elkezdődött, de az adott kliens nem tud a végére érni, akkor se kellene az addig elért eredményeket kidobni a kukába, el kéne tárolni, hogy X-et vizsgálta a kliens és Y-ig jutott (ameddig is bizton tudja állítani, hogy <=Y prímek nem osztják X-et).

Az adott szám félbehagyott kiszámítása kell, hogy nagyobb prioritást kapjon az új számok ellenőrzésével szemben. Az adott számítás folytatását fogja megkapni a legelső szabad kliens.

TODO: ennek az információnak a tárolásához jó lenne kitalálni valami formátumot, avagy hogyan lehetne bővíteni az eddigi sémánkat

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

------------

TODO: esetleg az egészet prioritás döntse el és lehessen egyes számokra nagyobb prioritást adni valamilyen admin felületről?
TODO: hogyan lehetne jól széttörni a kiszámolt prímek tömbjét, hogy ne egy monolitikus tömbbe legyen eltárolva?
TODO: pl 10000 kiszámolt prímenként eltároljuk az eredményeket fájlba és mindig csak egy adott fájl van nyitva, ami tartalmazza a szükséges infókat a további kereséshez. Esetleg van olyan DB, ami ezt könnyen lekezeli?
TODO: Ha egy fájl van, akkor azt iduláskor beolvassa a szerver, majd időközönként ment. Esetleg egy watcher-t is lehetne rá beállítani chokidarral, hiszen a fájl változhat