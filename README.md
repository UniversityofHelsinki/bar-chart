Asennus
- Luo uusi kansio johon haluat upotettavan sivun
- Pura tiedosto kansioon
- Aja kansiossa “bower install”, (jos et ole kuullut bowerista, lue lisätietoja bower.io)
- Palvele hakemiston sisältö HTTP-palvelimella

Konfiguraatio
- Line-chartia ei tarvitse konfiguroida annettuun use caseen
	- app.js ylimmällä rivillä määritelty viivojen värit ja luettava tiedosto ranking.csv. Nämä muuttamalla graafi reagoi sen mukaisesti

- Pie-chartista on annetussa use casessa useampi instanssi eri tiedoilla. Minulle on epäselvää onko järkevää tehdä joka piirakkadiagrammille oma embed-atomi
	- funktio “pie” piirtää yhden piirakkadiagrammin. Sille tulee syöttää:
		- Selektori div-elementille, johon piirakka syötetään
		- Lista title-value pareja
		- arvojen yksikkö: esim “prosenttia”, “opiskeiljoita”, “MEUR”

Kysykää epäselvistä kohdista!
- Ian
