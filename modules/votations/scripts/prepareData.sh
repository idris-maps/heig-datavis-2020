#!/bin/bash

# un dossier temp et un dossier src
mkdir temp
mkdir src

# télécharger les données de votations
curl https://www.bfs.admin.ch/bfsstatic/dam/assets/11708082/master > temp/votations_2020-02-09.json

# préparer les données de votations

# un fichier meta.json avec les noms et identifiants des objets
node scripts/getVoteMeta > src/meta.json

# un fichier votes_by_district.json
# un tableau où chaque élément ressemble à
# {"6290": 36.71,"6300": 59.36,"districtId": 101}
# 6290 et 6300 sont les identifiants de chaque votation, la valeur est le % de vote OUI
node scripts/getVoteByDistrict > temp/votes_by_district.json

# télécharger les géodonnées
curl https://www.bfs.admin.ch/bfsstatic/dam/assets/5247306/master > temp/geo_ch.zip

# c'est un fichier .zip, "dé-zippons"-le dans temp
unzip temp/geo_ch.zip -d temp

# créer un fichier features.json
# c'est un tableau où chaque élément est un "feature" représentant un district
shp2json temp/ggg_2018-LV95/shp/g1b18.shp \
  | ndjson-split 'd.features' \
  | lv95ToWgs \
  | ndjson-reduce > temp/features.json

# joindre les données géographiques (features.json) et les votations (votes_by_district.json)
node scripts/join > temp/districts.json

# transformer le résultat en topojson
geo2topo temp/districts.json > src/data.json

# effacer le dossier temp
rm -rf temp