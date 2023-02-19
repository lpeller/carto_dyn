library(rvest)
library(stringr)
library(plyr)
library(xml2)
library(httr)
library(dplyr)

require(httr)

#INITIALISATION
url_main = "https://www.letour.fr/fr/histoire"
url_base = "https://www.letour.fr"

html_main = read_html(url_main)

e = 109



#BOUCLE

while(e <= 109){

  #lecture pour une année donnée :
  url_year = paste(url_base, xml_attrs(xml_child(xml_child(xml_child(xml_child(xml_child(xml_child(xml_child(xml_child(xml_child(xml_child(xml_child(xml_child(html_main, 2), 2), 3), 1), 3), 1), 1), 1), 2), 1), e), 1))[["data-tabs-ajax"]], sep = "")
  html_year = read_html(url_year)

  url_stage = (html_year %>%
    html_node(xpath = '//*[@data-tabs-target="stages"]') %>%
    xml_attrs())[3]
  url_stage = paste(url_base, url_stage, sep  ="")
  html_stage = read_html(url_stage)

  url_win = (html_year %>%
               html_node(xpath = '//*[@data-tabs-target="winners"]') %>%
               xml_attrs())[3]
  url_win = paste(url_base, url_win, sep = "")

  html_win = read_html(url_win)

  table_stage = html_stage %>%
    html_node(xpath = "/html/body/div/div/table/tbody") %>%
    html_table()

  colnames(table_stage) <- c("n","annee","depart","arrivee")
  table_win = html_win %>%
    html_node(xpath = "/html/body/div/div/table/tbody") %>%
    html_table()

  table_stage$id <- str_extract_all(table_stage$n,"\\(?[0-9,.]+\\)?")
  table_stage$id <- as.integer(table_stage$id)
  #table_stage <- table_stage %>% dplyr::mutate(id = as.integer(str_extract_all(n,"\\(?[0-9,.]+\\)?")[[1]]))

  table_stage <- merge(x = table_stage, y = table_win, by.x = "id", by.y = "X1", all.x = TRUE)

  table_stage$winner = str_extract(table_stage$X3, "[^\n]+")
  print("5")


  table_stage <- table_stage[,!names(table_stage) %in% c("X2", "X3")]

  year = substr(table_stage$annee[1],nchar(table_stage$annee[1])-3, nchar(table_stage$annee[1]))

  table_stage$depart <- case_when(
    table_stage$depart == "Aime (La Plagne)" ~ "Aime",
    table_stage$depart == "Andorre" ~ "Andorre-la-Vieille",
    table_stage$depart == "Anvers Brasschaat" ~ "Anvers",
    table_stage$depart == "Argelès-Gazost" ~ "Argelès",
    table_stage$depart == "Arras Citadelle" ~ "Arras",
    table_stage$depart == "Arras Communauté Urbaine" ~ "Arras",
    table_stage$depart == "Ax 3 Domaines" ~ "Ax-les-Thermes",
    table_stage$depart == "Besse-en-Ch." ~ "Besse",
    table_stage$depart == "Bourgoin" ~ "Bourgoin-Jallieu",
    table_stage$depart == "Bourg-Saint-Maurice Les Arcs" ~ "Les Arcs",
    table_stage$depart == "Brussel" ~ "Bruxelles",
    table_stage$depart == "Brussel Atomium" ~ "Bruxelles",
    table_stage$depart == "Bruxelles Palais Royal" ~ "Bruxelles",
    table_stage$depart == "Champs-Elysées" ~ "Paris",
    table_stage$depart == "Chateauroux" ~ "Châteauroux",
    table_stage$depart == "Châtel Les Portes du Soleil" ~ "Châtel",
    table_stage$depart == "gourette_col_d_aubisque" ~ "Col d'Aubisque",
    table_stage$depart == "Col du Granon Serre Chevalier" ~ "Col du Granon",
    table_stage$depart == "Tourmalet Barèges" ~ "Col du Tourmalet",
    table_stage$depart == "Foix Prat d'Albis" ~ "Prat d'Albis",
    table_stage$depart == "Galibier Serre-Chevalier" ~ "Serre-Chevalier",
    table_stage$depart == "Île d'Oléron Le Château-d'Oléron" ~ "Ile d'Oléron",
    table_stage$depart == "La Défense" ~ "Nanterre",
    table_stage$depart == "La Super Planche des Belles Filles" ~ "La Planche des Belles Filles",
    table_stage$depart == "La Tour-du-Pin" ~ "La Tour du Pin",
    table_stage$depart == "Laval Espace Mayenne" ~ "Laval",
    table_stage$depart == "Le Cap d'Agde" ~ "Cap d'Agde",
    table_stage$depart == "Le Puy-en-Velay" ~ "Le Puy en Velay",
    table_stage$depart == "le_grand_bornand" ~ "Le Grand-Bornand",
    table_stage$depart == "Lille Métropole" ~ "Lille",
    table_stage$depart == "loudenvielle_le_louron" ~ "Loudenvielle",
    table_stage$depart == "Bagnères-de-Luchon" ~ "Luchon",
    table_stage$depart == "Luz-Ardiden" ~ "Luz Ardiden",
    table_stage$depart == "Macon" ~ "Mâcon",
    table_stage$depart == "Malo" ~ "Dunkerque",
    table_stage$depart == "Méribel Col de la Loze" ~ "Méribel",
    table_stage$depart == "Morzine Les Portes du Soleil" ~ "Morzine",
    table_stage$depart == "Nice Haut Pays" ~ "Nice",
    table_stage$depart == "Nice Moyen Pays" ~ "Nice",
    table_stage$depart == "Nimes" ~ "Nîmes",
    table_stage$depart == "Paris Champs-Élysées" ~ "Paris",
    table_stage$depart == "Paris La Défense Arena" ~ "Nanterre",
    table_stage$depart == "plateau_de_beille" ~ "Plateau de Beille",
    table_stage$depart == "porto_vecchio" ~ "Porto Vecchio",
    table_stage$depart == "Saint-Étienne" ~ "Saint-Etienne",
    table_stage$depart == "Saint-Gervais Mont-Blanc" ~ "Saint-Gervais",
    table_stage$depart == "Saint-Paul -Trois-Châteaux" ~ "Saint-Paul-Trois-Châteaux",
    table_stage$depart == "Sarran Corrèze" ~ "Sarran",
    table_stage$depart == "semur_en_auxois" ~ "Semur en Auxois",
    table_stage$depart == "s-Hertogenbosch" ~ "Hertogenbosch",
    table_stage$depart == "St-Quentin" ~ "Saint-Quentin",
    table_stage$depart == "Superbesse" ~ "Besse",
    table_stage$depart == "Super-Besse" ~ "Besse",
    table_stage$depart == "Super-Besse Sancy" ~ "Besse",
    table_stage$depart == "val_d_isere" ~ "Val d'Isère",
    table_stage$depart == "Val d'Aran - Pla-de-Beret" ~ "Val d'Aran",
    table_stage$depart == "Vielha Val d'Aran" ~ "Val d'Aran",
    table_stage$depart == "Villars-les-Dombes Parc des Oiseaux" ~ "Villars-les-Dombes",
    table_stage$depart == "villers_cotterets" ~ "Villers Cotterets",
    table_stage$depart == "Alpe d'Huez" ~ "L'Alpe d'Huez",
    TRUE ~ table_stage$depart
  )

  table_stage$arrivee <- case_when(
    table_stage$arrivee == "Aime (La Plagne)" ~ "Aime",
    table_stage$arrivee == "Andorre" ~ "Andorre-la-Vieille",
    table_stage$arrivee == "Anvers Brasschaat" ~ "Anvers",
    table_stage$arrivee == "Argelès-Gazost" ~ "Argelès",
    table_stage$arrivee == "Arras Citadelle" ~ "Arras",
    table_stage$arrivee == "Arras Communauté Urbaine" ~ "Arras",
    table_stage$arrivee == "Ax 3 Domaines" ~ "Ax-les-Thermes",
    table_stage$arrivee == "Besse-en-Ch." ~ "Besse",
    table_stage$arrivee == "Bourgoin" ~ "Bourgoin-Jallieu",
    table_stage$arrivee == "Bourg-Saint-Maurice Les Arcs" ~ "Les Arcs",
    table_stage$arrivee == "Brussel" ~ "Bruxelles",
    table_stage$arrivee == "Brussel Atomium" ~ "Bruxelles",
    table_stage$arrivee == "Bruxelles Palais Royal" ~ "Bruxelles",
    table_stage$arrivee == "Champs-Elysées" ~ "Paris",
    table_stage$arrivee == "Chateauroux" ~ "Châteauroux",
    table_stage$arrivee == "Châtel Les Portes du Soleil" ~ "Châtel",
    table_stage$arrivee == "gourette_col_d_aubisque" ~ "Col d'Aubisque",
    table_stage$arrivee == "Col du Granon Serre Chevalier" ~ "Col du Granon",
    table_stage$arrivee == "Tourmalet Barèges" ~ "Col du Tourmalet",
    table_stage$arrivee == "Foix Prat d'Albis" ~ "Prat d'Albis",
    table_stage$arrivee == "Galibier Serre-Chevalier" ~ "Serre-Chevalier",
    table_stage$arrivee == "Île d'Oléron Le Château-d'Oléron" ~ "Ile d'Oléron",
    table_stage$arrivee == "La Défense" ~ "Nanterre",
    table_stage$arrivee == "La Super Planche des Belles Filles" ~ "La Planche des Belles Filles",
    table_stage$arrivee == "La Tour-du-Pin" ~ "La Tour du Pin",
    table_stage$arrivee == "Laval Espace Mayenne" ~ "Laval",
    table_stage$arrivee == "Le Cap d'Agde" ~ "Cap d'Agde",
    table_stage$arrivee == "Le Puy-en-Velay" ~ "Le Puy en Velay",
    table_stage$arrivee == "le_grand_bornand" ~ "Le Grand-Bornand",
    table_stage$arrivee == "Lille Métropole" ~ "Lille",
    table_stage$arrivee == "loudenvielle_le_louron" ~ "Loudenvielle",
    table_stage$arrivee == "Bagnères-de-Luchon" ~ "Luchon",
    table_stage$arrivee == "Luz-Ardiden" ~ "Luz Ardiden",
    table_stage$arrivee == "Macon" ~ "Mâcon",
    table_stage$arrivee == "Malo" ~ "Dunkerque",
    table_stage$arrivee == "Méribel Col de la Loze" ~ "Méribel",
    table_stage$arrivee == "Morzine Les Portes du Soleil" ~ "Morzine",
    table_stage$arrivee == "Nice Haut Pays" ~ "Nice",
    table_stage$arrivee == "Nice Moyen Pays" ~ "Nice",
    table_stage$arrivee == "Nimes" ~ "Nîmes",
    table_stage$arrivee == "Paris Champs-Élysées" ~ "Paris",
    table_stage$arrivee == "Paris La Défense Arena" ~ "Nanterre",
    table_stage$arrivee == "plateau_de_beille" ~ "Plateau de Beille",
    table_stage$arrivee == "porto_vecchio" ~ "Porto Vecchio",
    table_stage$arrivee == "Saint-Étienne" ~ "Saint-Etienne",
    table_stage$arrivee == "Saint-Gervais Mont-Blanc" ~ "Saint-Gervais",
    table_stage$arrivee == "Saint-Paul -Trois-Châteaux" ~ "Saint-Paul-Trois-Châteaux",
    table_stage$arrivee == "Sarran Corrèze" ~ "Sarran",
    table_stage$arrivee == "semur_en_auxois" ~ "Semur en Auxois",
    table_stage$arrivee == "s-Hertogenbosch" ~ "Hertogenbosch",
    table_stage$arrivee == "St-Quentin" ~ "Saint-Quentin",
    table_stage$arrivee == "Superbesse" ~ "Besse",
    table_stage$arrivee == "Super-Besse" ~ "Besse",
    table_stage$arrivee == "Super-Besse Sancy" ~ "Besse",
    table_stage$arrivee == "val_d_isere" ~ "Val d'Isère",
    table_stage$arrivee == "Val d'Aran - Pla-de-Beret" ~ "Val d'Aran",
    table_stage$arrivee == "Vielha Val d'Aran" ~ "Val d'Aran",
    table_stage$arrivee == "Villars-les-Dombes Parc des Oiseaux" ~ "Villars-les-Dombes",
    table_stage$arrivee == "villers_cotterets" ~ "Villers Cotterets",
    table_stage$arrivee == "Alpe d'Huez" ~ "L'Alpe d'Huez",
    table_stage$arrivee == "L'Alpe-d'Huez" ~ "L'Alpe d'Huez",
    TRUE ~ table_stage$arrivee
  )

  output_name = paste("output/stages_",year,".csv", sep = "")

  write.csv(table_stage, output_name)

  print(paste("Finished year",year))
  Sys.sleep(1)

  e = e+1


}
