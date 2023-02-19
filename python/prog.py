# -*- coding: utf-8 -*-
"""
Created on Wed Feb 15 23:34:53 2023

@author: mimic
"""

import os
import json
import csv

liste_path =  [os.getcwd()+"\\output\\"+el for el in os.listdir(os.getcwd()+"\output")]
csv_ville = os.getcwd()+"\\villes_localisee.csv"
ville_coord = {}
with open(csv_ville ,encoding = 'utf-8') as f:
        villes = csv.DictReader(f)
        for el in villes:
            ville_coord[el['nom']] = {}
            ville_coord[el['nom']]['x'] = el['x']
            ville_coord[el['nom']]['y'] = el['y']
print(ville_coord)
        
data_dict = {}
liste_ville = {}
data_somme = {}
annee = []
ville = []


for file in liste_path: 
    with open(file ,encoding = 'utf-8') as f:
        csv_reader = csv.DictReader(f)
        dico1 = {}
        for rows in csv_reader:
            liste_col = ['annee','depart','arrivee','winner']
            
            if rows['depart'] not in liste_ville:
                liste_ville[rows['depart']] = {}
                liste_ville[rows['depart']][file[-8:-4]] = 1
            else:
                liste_ville[rows['depart']][file[-8:-4]] = 1
                
            if rows['arrivee'] not in liste_ville:
                liste_ville[rows['arrivee']] = {}
                liste_ville[rows['arrivee']][file[-8:-4]] = 1
            else:
                liste_ville[rows['arrivee']][file[-8:-4]] = 1
                
            if rows['arrivee'] not in ville:
                ville.append(rows['arrivee'])
            if rows['depart'] not in ville:
                ville.append(rows['depart'])
            
            dico2 = {}
            for col in liste_col:
                dico2[col] = rows[col]
            dico2["geometry"] = {}
            dep_x = float(ville_coord[rows['depart']]['x'])
            dep_y = float(ville_coord[rows['depart']]['y'])
            arr_x = float(ville_coord[rows['arrivee']]['x'])
            arr_y = float(ville_coord[rows['arrivee']]['y'])
            dico2["geometry"]["coordinates"] = [[dep_x,dep_y],
                                                [arr_x,arr_y]]
            dico2["geometry"]["type"] = "LineString"
            dico1[rows['id']] = dico2
        annee.append(file[-8:-4])
        data_dict[file[-8:-4]] = dico1

villeJson = {"type": "FeatureCollection","features":[]}
#print(liste_ville)
for el in liste_ville:
    feature = {"type": "Feature",
               "properties": {},
               "geometry": {"coordinates": [],"type": "Point"}}
    feature["properties"]["nom"] = el
    feature["geometry"]["coordinates"].append(float(ville_coord[el]['x']))
    feature["geometry"]["coordinates"].append(float(ville_coord[el]['y']))
    i=0
    for a in annee:
        if a in liste_ville[el]:
            i+=1
            feature["properties"][a] = i
        else:
            feature["properties"][a] = i
    villeJson["features"].append(feature)
        
etapeJson = {"type": "FeatureCollection","features":[]}
for year in data_dict:
    for etape in data_dict[year]:
        feature = {"type": "Feature",
                   "properties": {},
                   "geometry": {"coordinates": [],"type": "LineString"}}
        feature["properties"]["annee"] = year
        feature["properties"]["date"] = data_dict[year][etape]["annee"]
        feature["properties"]["etape"] = etape
        feature["properties"]["depart"] = data_dict[year][etape]["depart"]
        feature["properties"]["arrivee"] = data_dict[year][etape]["arrivee"]
        feature["properties"]["winner"] = data_dict[year][etape]["winner"]
        feature["geometry"]["coordinates"] = data_dict[year][etape]["geometry"]["coordinates"]
        etapeJson["features"].append(feature)
    
export_path = os.getcwd()+"\\etape.geojson"
with open(export_path, 'w') as json_file_handler:
    json_file_handler.write(json.dumps(etapeJson, indent = 4))

export_path = os.getcwd()+"\\ville.geojson"
with open(export_path, 'w') as json_file_handler:
    json_file_handler.write(json.dumps(villeJson, indent = 4))
    
#print(liste_ville)