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
  
  output_name = paste("output/stages_",year,".csv", sep = "")
  
  write.csv(table_stage, output_name)
  
  print(paste("Finished year",year))
  Sys.sleep(1)
  
  e = e+1
  
  
}
