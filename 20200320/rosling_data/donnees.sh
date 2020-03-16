# Télécharger les fichiers XLSX

curl https://raw.githubusercontent.com/Gapminder-Indicators/lex/master/lex-by-gapminder.xlsx \
> data/temp/esperance_de_vie.xlsx

curl https://raw.githubusercontent.com/Gapminder-Indicators/gdppc_cppp/master/gdppc_cppp-by-gapminder.xlsx \
> data/temp/pnb_p_habitant.xlsx

curl https://docs.google.com/spreadsheets/d/18Ep3s1S0cvlT1ovQG9KdipLEoQ1Ktz5LtTTQpDcWbX0/export?format=xlsx \
> data/temp/population.xlsx

curl https://docs.google.com/spreadsheets/d/1qHalit8sXC0R8oVXibc2wa2gY7bkwGzOybEMTWp-08o/export?format=xlsx \
> data/temp/regions.xlsx

# Convertir les fichiers XLSX en CSV

node data/xlsxToCsv esperance_de_vie countries_and_territories > data/temp/esperance_de_vie.csv

node data/xlsxToCsv pnb_p_habitant countries_and_territories > data/temp/pnb_p_habitant.csv

node data/xlsxToCsv population data-countries-etc-by-year > data/temp/population.csv

node data/xlsxToCsv regions list-of-countries-etc > data/temp/regions.csv

# Convertir les fichiers CSV en JSON

node data/toJSON_esperance_de_vie > data/temp/esperance_de_vie.json

node data/toJSON_pnb_p_habitant > data/temp/pnb_p_habitant.json

node data/toJSON_population > data/temp/population.json

node data/toJSON_regions > data/temp/regions.json

# Joinder les 4 fichiers JSON

node data/joinData > src/data.js





