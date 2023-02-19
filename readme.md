# Cartographie dynamique :Le tour de France de 1903 à 2022
*Projet réalisé dans le cadre du cours de cartographie dynamique du M2 Carthageo, par Aymeric Dutremble et Louis Peller*

## Description rapide de la carte :
Cette carte permet de visualiser, pour une année donnée, les étapes du tour de france, ainsi que le nombre de passage du tour dans chaque ville pour une période sélectionnée.

## Réalisation technique :
Les données des étapes ont été collectées sur le site https://www.letour.fr/fr/histoire via un processus de webscraping, réalisée en langage R via la bibliothèque rvest.

Elles ont ensuite été mises en forme et géoréférencées dans des fichiers geojson via un script python.

Le fond de carte est un fichier geojson provenant d’un MNT vectorisé et simplifié via QGIS et mapshaper.

La page web a été codée en langage HTML, CSS et JavaScript, et appelle la bibliothèque D3JS. La charte graphique de la page est fortement inspirée du site web https://www.letour.fr/fr/histoire.

Afin de permettre un travail en équipe efficace et le développement de plusieurs fonctionnalités en parallèle, l’ensemble de la réalisation a été stockée dans un dépôt GitHub.

## Présentation de l’interface :
![Alt text](images/site01.png?raw=true "Title")
