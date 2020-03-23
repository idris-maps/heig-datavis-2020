#!/bin/bash

# Créer un dossier "temp"
mkdir temp

# Télécharger les fichiers xlsx
curl https://raw.githubusercontent.com/Gapminder-Indicators/lex/master/lex-by-gapminder.xlsx \
> temp/esperance_de_vie.xlsx

curl https://raw.githubusercontent.com/Gapminder-Indicators/gdppc_cppp/master/gdppc_cppp-by-gapminder.xlsx \
> temp/pnb_p_habitant.xlsx

curl https://docs.google.com/spreadsheets/d/18Ep3s1S0cvlT1ovQG9KdipLEoQ1Ktz5LtTTQpDcWbX0/export?format=xlsx \
> temp/population.xlsx

curl https://docs.google.com/spreadsheets/d/1qHalit8sXC0R8oVXibc2wa2gY7bkwGzOybEMTWp-08o/export?format=xlsx \
> temp/regions.xlsx

# Convertir les fichiers xlsx en csv
node xlsxToCsv esperance_de_vie countries_and_territories \
> temp/esperance_de_vie.csv

node xlsxToCsv pnb_p_habitant countries_and_territories \
> temp/pnb_p_habitant.csv

node xlsxToCsv population data-countries-etc-by-year \
> temp/population.csv

node xlsxToCsv regions list-of-countries-etc \
> temp/regions.csv

# Convertir les fichiers csv en json
node toJSON_year_columns esperance_de_vie > temp/esperance_de_vie.json

node toJSON_year_columns pnb_p_habitant > temp/pnb_p_habitant.json

node toJSON_population > temp/population.json

node toJSON_regions > temp/regions.json

# Créer data.json
node joinData > data.json

# Effacer le dossier temporaire
rm -rf temp