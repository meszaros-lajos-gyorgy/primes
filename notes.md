## 2 intervallum egyesítése

## Bázis jellemzői és a bővítése

// az alábbi minden intervallumra érvényes
A kiszámolt prímeknél figyelembe kell azt is venni, amit a prímhármasok előszűrése megkövetel: nem lehet 1-nél több 2 távolságra levő prím egymás után. Páratlan prímeket nézve az alábbi módon alakulnak a további páratlan számok: 1 prím -> 1 lyuk, vagy 2 prím -> 1 lyuk, ahol minden lépés 2 prím, valamint prím és lyuk között 2. Ezt úgy tudjuk figyelembe venni, hogy egy számlálóban külön nyílván tartjuk, a lista végén álló prímek visszafele nézve hány db 2 távra levő prímpárral rendelkeznek, amit természetesen elég csak addig tárolni, amíg ez a távolság nem lesz több, mint 2. Mivel ezek a 2 távra levő prímpárok(ikerprímek) 2-3-5 és 3-5-7 esetén kívül maximum 1-szer szerepelnek egymás után, így az utolsó távolság vagy ikerprím volt, vagy nem. Ha az utolsó 2 prím ikerprímet alkotott - esetleg még az előtte levő is, ha a legutolsó prímszám 7 volt -, akkor mindenképp a következő prím már legalább 4 távolságra lesz. Erre a célra egy boolean tökéletesen elegendő.

TODO: esetleg az egészet prioritás döntse el és lehessen egyes számokra nagyobb prioritást adni valamilyen admin felületről?
TODO: hogyan lehetne jól széttörni a kiszámolt prímek tömbjét, hogy ne egy monolitikus tömbbe legyen eltárolva?
TODO: pl 10000 kiszámolt prímenként eltároljuk az eredményeket fájlba és mindig csak egy adott fájl van nyitva, ami tartalmazza a szükséges infókat a további kereséshez. Esetleg van olyan DB, ami ezt könnyen lekezeli?
TODO: Ha egy fájl van, akkor azt iduláskor beolvassa a szerver, majd időközönként ment. Esetleg egy watcher-t is lehetne rá beállítani chokidarral, hiszen a fájl változhat

---

# Random dolgok

* A sima számokhoz tartozó limit mellett a prímeknek is kellene egy limit, hogy ne csak azt lehessen mondani, hogy 1000-ig kéretik megkeresni a prímeket, hanem azt is, hogy az 1000-ik prímig kellene elmenni.
* A számításokhoz a gépigény nőni fog, így jó lenne felmérni, mikor kell a throttle-be megfogalmazott értéket automatikusan csökkenteni.
* A throttle-t lehessen kikapcsolni is
* A félprímek osztóinak kiszámolása ugyanúgy fontos cél lenne a projektben, mint maguk a prímek kiszámítása. Volna-e értelme annak, ha a azokat is gyüjtenénk a prímekkel párhuzamosan? (bár akkor már bármelyik számot eltárolhatnánk, hogy bármikor lekérdezhető legyen annak prímtényezős felbontása)

Struktúra: fájl -> master -> slaves -> clients, ahol a master-slaves a szerveroldal, és a socket kapcsolatok elosztásáról gondoskodnak
Lehet, hogy fájlbaírás helyett a tárolást egy DB-re kéne bízni, pl mongo

## Félprímek

Az ötletemhez a koordinátákat az alábbi kód kombinálja ki a megadott prímekből (ramda függvények)

```javascript
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

const sortByFirstItem = sortBy(prop(0))

const getSemiprimes = addIndex(reduce)((acc, q, i) => {
  return concat(acc, compose(
    map(p => [p*q, i]),
    slice(0, i + 1)
  )(primes))
}, [])

const replaceFirstItemWithIndex = addIndex(map)((element, i) => {
  return update(0, i, element)
})

compose(
  replaceFirstItemWithIndex,
  sortByFirstItem,
  getSemiprimes
)(primes)
```