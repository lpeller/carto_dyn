/***************************************************************************/
/************************************************ CREATION DE LA CARTE *****/
/***************************************************************************/

const guerre = [1915,1916,1917,1918,1940,1941,1942,1943,1944,1945,1946,1987]
const width = 800, height = 700;

const map = d3.geoPath();


const projection = d3.geoMercator()
	.center([2.5, 49])
	.scale(1600)
	.translate([width/2, height/2]);

map.projection(projection);

// Ajout d'une image SVG portant l'id svg1 à l'élement HTML qui porte l'id carte1

const svg = d3.select("#carte1")
	.append("svg")
	.attr("id", "svg1")
	.attr("width", width)
	.attr("height", height);

// Pour une carte du monde, on peut changer de projection, de centre et/ou d'échelle
// Pour en savoir plus sur les projections et d3, consulter https://github.com/d3/d3-geo-projection


/***************************************************************************/
/*********************************** AJOUTER DES OBJETS SUR LES CARTES *****/
/***************************************************************************/

// Ajout d'un groupe (pays) au SVG (svg)

/*const pays = svg.append("g");

pays.selectAll("path")
	// La variable geojson_pays est créée dans le fichier JS qui contient le GeoJSON
	.data(geojson_pays.features)
	.enter()
	.append("path")
	.attr("d", map)
	// Sémiologie (par défaut) des objets
	.style("fill", "#f2f0e6")
	.style("stroke-width", 0var myMap = svg.selectAll("path"));*/


// Ajout d'un groupe (fond) au SVG (svg)

const fond = svg.append("g");

fond.selectAll("path")
	// La variable geojson_fond est créée dans le fichier JS qui contient le GeoJSON
	.data(geojson_light.features)
	.enter()
	.append("path")
	.attr("d", map)
	// Sémiologie (par défaut) des objets
	.style("fill", function(d){
		if (d.properties.DN == 0){
			return "#fcfdfd";
		} else if (d.properties.DN == 1){
			return "#fff133";
		}else if (d.properties.DN == 2){
			return "#fff102";
		}else if (d.properties.DN == 3){
			return "#f9e902";
		}else if (d.properties.DN == 4){
			return "#fce904";
		}else if (d.properties.DN == 5){
			return "#fada05";
		}else if (d.properties.DN == 6){
			return "#f6cb0b";
		}else if (d.properties.DN == 7){
			return "#edb318";
		}else if (d.properties.DN == 8){
			return "#e39f24";
		}else if (d.properties.DN == 9){
			return "#d19321";
		}
	})
	.style("stroke", "grey")
	.style("stroke-width", 0);

const border = svg.append("g");

border.selectAll("path")
		// La variable geojson_fond est créée dans le fichier JS qui contient le GeoJSON
		.data(geojson_front.features)
		.enter()
		.append("path")
		.attr("d", map)
		.style("fill", "transparent")
		.style("stroke", "#484848")
		.style("stroke-width", 0.5);


const ville = svg.append("g")

ville.selectAll("circle")
	.data(geojson_ville.features)
	.enter()
	.append("circle")
	.attr("r", "5px")
	.attr("cx", function(f){return projection(f.geometry.coordinates)[0];})
	.attr("cy", function(f){return projection(f.geometry.coordinates)[1];})
	.attr("fill", "#44659b")
	.attr("r", function(f){
		let r = Math.round((5 / 2) * Math.sqrt(f.properties["2022"]));
		return r+"px";
	})

const etape = svg.append("g");

etape.selectAll("path")
	.data(geojson_etape.features)
	.enter()
	.append("path")
	.attr("d", map)
	.style("stroke", "#252525")
	.style("stroke-width", 2)
	.style("fill","transparent");



/*svg.append("line")
	.attr('x1',function(){return projection(15.21)})
	.attr('y1',function(){return projection(40)})
	.attr('x2',function(){return projection(16.11)})
	.attr('y2',function(){return projection(40)})
	.style("stroke", "#252525")
	.style("stroke-width", 5)
	.style("fill","transparent");*/

/***************************************************************************/
/*****************************var svg = d3.select("#dataviz_basicZoom")
  .append("svg")
    .attr("width",  460)
    .attr("height",  460)
    .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))
  .append("g")
************ CHANGER LE STYLE DES OBJETS *****/
/***************************************************************************/

/*fond.selectAll("path")
	.filter(d => d.properties.CODE_REG == "11")
	.style("fill", "orange");*/

/******************************var svg = d3.select("#dataviz_basicZoom")
  .append("svg")
    .attr("width",  460)
    .attr("height",  460)
    .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))
  .append("g")
*********************************************/
/****************** CHANGER LE STYLE DES OBJETS AU SURVOL DE LA SOURIS *****/
/***************************************************************************/

// Sans aucune transition

/*fond.selectAll("path")
	.filter(d => d.properties.CODE_DEPT == "86")
	.on("mouseover", function(d) {var svg = d3.select("#dataviz_basicZoom")
  .append("svg")
    .attr("width",  460)
    .attr("height",  460)
    .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))
  .append("g")

		d3.select(this)
			.style("fill", "orange");
	})
	.on("mouseout", function(d) {
		d3.select(this)
			.style("fill", "#f2ebcb");
	});
*/
// Avec une transition

/*fond.selectAll("path")
	.filter(d => d.properties.CODE_DEPT == "16")
	.on("mouseover", function(d) {
		d3.select(this)
			.transition()
			.duration(1000) // 1000 millisecondes
			.style("fill", "orange");
	})
	.on("mouseout", function(d) {
		d3.select(this)
			.transition()
			.duration(1000) // 1000 millisecondes
			.style("fill", "#f2ebcb");
	});*/

/***************************************************************************/
/***************************** PREVOIR UNE ACTION AU CLIC SUR UN OBJET *****/
/***************************************************************************/

/*fond.selectAll("path")
	.filter(d => d.properties.CODE_DEPT == "79")
	.on("mouseover", function(e) {
		d3.select(this).style("cursor", "pointer");
	})
	.on("click", function(e, dept) {
		alert("Je suis le département " + dept.properties.NOM_DEPT + " !")
	});*/

/***************************************************************************/
/************************************************* AJOUTER UNE TOOLTIP *****/
/***************************************************************************/

/*const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

pts.selectAll("circle")
	.on("mouseover", function(e){
		tooltip
			.style("display", "block");
		tooltip
			.transition().duration(200).style("opacity", 0.9);
		tooltip
			.html("Je suis une préfecture !")
			.style("left", (e.pageX + 10) + "px")
			.style("top", (e.pageY - 10) + "px");
	})
	.on("mouseout", function(d){
		tooltip.style("left", "-500px").style("top", "-500px");
	});*/


window.onload = function(){
    slideOne();
    slideTwo();
	addEtape();
}
let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("start_range");
let displayValTwo = document.getElementById("end_range");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;
let sliderMinValue = document.getElementById("slider-1").min;

let bt_fr = document.getElementById("bt_fr");
let bt_eu = document.getElementById("bt_eu");


function handleZoom(e) {
	d3.selectAll('g')
		.attr('transform', e.transform);
}


function clickfr(){
	document.getElementById('bt_eu').disabled=false;
	bt_fr.disabled=true;

	let zoom = d3.zoom()
		.scaleExtent([0.1, 10])
		.on('zoom', handleZoom);

	var transform = d3.zoomIdentity.translate(-300, -430).scale(1.8);


	d3.select('#carte1')
		.transition()
		.call(zoom.transform, transform);

}


function clickeu(){
	document.getElementById('bt_fr').disabled=false;
	bt_eu.disabled=true;
	console.log("eu");

	let zoom = d3.zoom()
		.scaleExtent([0.25, 10])
		.on('zoom', handleZoom);

	var transform = d3.zoomIdentity;

	d3.select('#carte1')
		.transition()
		.call(zoom.transform, transform);



}
/*$("#myRange").change(function(){
	let value = sliderOne.value
	ville.selectAll("circle")
		.attr("r", function(f){
			if (f.properties[String(value)] == "NaN"){
				return "0px";
			}else{
				let r = Math.round((5 / 2) * Math.sqrt(f.properties[String(value)]));
				return r+"px";
			}

		})
})*/

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
	console.log("toto")
    displayValOne.textContent = sliderOne.value;
	if (guerre.includes(sliderOne.value)){

	}
	ville.selectAll("circle")
	.attr("r", function(f){
		let valeur = f.properties[String(sliderTwo.value)]-f.properties[String(sliderOne.value)]
		if (valeur == NaN){
			return "0px";
		}else{
			let r = Math.round((5 / 2) * Math.sqrt(valeur));
			return r+"px";
		}

	})
    fillColor();
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
	ville.selectAll("circle")
	.attr("r", function(f){
		let valeur = f.properties[String(sliderTwo.value)]-f.properties[String(sliderOne.value)]
		if (valeur == NaN){
			return "0px";
		}else{
			let r = Math.round((5 / 2) * Math.sqrt(valeur));
			return r+"px";
		}
	})
	.style("opacity", function(f){
		if (f.properties[String(sliderTwo.value)]-f.properties[String(sliderTwo.value-1)]){
			return 1
		}else{
			return 0.3
		}
	})
	.style("fill", function(f){
		if(f.properties[String(sliderTwo.value)]-f.properties[String(sliderTwo.value-1)]){
			return "#f9020b"
		}else{
			return "#029bf4"
		}
	})
	etape.selectAll("path")
	.style("opacity", function(f){
		if(f.properties.annee == sliderTwo.value){
			return 1
		}else{
			return 0
		}
	}).style("stroke-width", function(f){
		if (f.properties.annee == parseInt(sliderTwo.value)){
			return 2
		}
		else{
			return 0
		}
	});
    fillColor();
}
function fillColor(){
    percent2 = ((sliderOne.value-sliderMaxValue) / (sliderMinValue-sliderMaxValue)) * 100;
    percent1 = ((sliderTwo.value-sliderMaxValue) / (sliderMinValue-sliderMaxValue)) * 100;
    sliderTrack.style.background = `linear-gradient(to left, #dadae5 ${percent1}% , #ffff00 ${percent1}% , #ffff00 ${percent2}%, #dadae5 ${percent2}%)`;
}

function addEtape(){
	if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    let value = sliderTwo.value;
	let liste = document.getElementById("liste")
	liste.innerHTML = ""
	for(el in geojson_etape.features){
		let proper = geojson_etape.features[el].properties
		if (proper.annee == parseInt(value)){
			var div = document.createElement("div");
			div.setAttribute('class', 'liste_etape')
			div.setAttribute('id','etape'+proper.etape)
			div.addEventListener('mouseover',hoverEtape,false)
			div.addEventListener('mouseout',outEtape,false)
			div.innerHTML = "<h1>Etape "+proper.etape+"</h1><h2>"+proper.depart+" - "+proper.arrivee+"</h2><h3>Vainqueur : "+proper.winner+"</h3>"
			liste.appendChild(div)
		}
	}
}

function hoverEtape(event){
	console.log(event.target.parentElement.id)
	let div = document.getElementById(event.target.parentElement.id)
	if(event.target.parentElement.id != "liste"){
		div.style.border = "solid 2px"
		div.style.borderRadius = "2px"
		let etapeid = event.target.parentElement.id.slice(5)
		console.log(etapeid)
		etape.selectAll("path")
			.style("opacity", function(f){
				if (f.properties.annee == parseInt(sliderTwo.value)){
					if(etapeid == f.properties.etape){
						return 1
					}
					else{return 0.5}}
				else{return 0}
			})
			.style("stroke-width", function(f){
				if (f.properties.annee == parseInt(sliderTwo.value)){
					if(etapeid == f.properties.etape){return 3}
					else{return 2}}
				else{return 0}
			})
	}
}

function outEtape(event){
	let div = document.getElementById(event.target.parentElement.id)
	div.style.border = "none"
	slideTwo()
	/*etape.selectAll("path")
	.style("opacity", function(f){
		if(f.properties.annee == sliderTwo.value){
			return 1
		}else{
			return 0
		}
	})
	.style("stroke-width", function(f){
		if (f.properties.annee == parseInt(sliderTwo.value)){return 2}
		else{return 0}
	})*/
}
