

const guerre = [1915,1916,1917,1918,1940,1941,1942,1943,1944,1945,1946,1987]
const width = 800, height = 700;

const map = d3.geoPath();


const projection = d3.geoMercator()
	.center([2.5, 49])
	.scale(1600)
	.translate([width/2, height/2]);

map.projection(projection);

const svg = d3.select("#carte1")
	.append("svg")
	.attr("id", "svg1")
	.attr("width", width)
	.attr("height", height);

const fond = svg.append("g");

fond.selectAll("path")
	.data(geojson_light.features)
	.enter()
	.append("path")
	.attr("d", map)
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


const echelle_eu = svg.append("g");

const echelle_fr = svg.append("g");

echelle_eu.selectAll("path")
	.data(scale_eu.features)
	.enter()
	.append("path")
	.attr("d", map)
	.style("stroke", "#252525")
	.style("stroke-width", 5);

echelle_eu.append('text')
	.text("200 km")
	.attr("x", 690)
	.attr("y", 688);

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
let button_play = document.getElementById("button_play")
button_play.addEventListener('click',click,false)
let button_stop = document.getElementById("button_stop")
button_stop.addEventListener('click',clickstop,false)
let button_clear = document.getElementById("button_clear")
button_clear.addEventListener('click',clickclear,false)

let width_legend = $("#legende").width()
let height_legend = $("#legende").height()
const svg2 = d3.select("#legende")
	.append("svg")
	.attr("id", "svg1")
	.attr("width", width_legend)
	.attr("height", height_legend);

const circle1 = svg2.append('circle')
					.attr('cx', 30)
					.attr('cy', 30)
					.attr('r', "26px")
					.attr('fill', 'transparent')
					.style("stroke", "#252525")
					.style("stroke-width", 1)


const text1 = svg2.append('text')
					.attr('x', 70)
					.attr('y', 35)
					.style("font-size", 15)
					.text("108 : Nombre de passage maximum")

svg2.append('circle')
	.attr('cx', 30)
	.attr('cy', 70)
	.attr('r', "3px")
	.attr('fill', 'transparent')
	.style("stroke", "#252525")
	.style("stroke-width", 1)

svg2.append('text')
	.attr('x', 70)
	.attr('y', 75)
	.style("font-size", 15)
	.text("1 : Nombre de passage minimum")

svg2.append('circle')
	.attr('cx', 30)
	.attr('cy', 100)
	.attr('r', "10px")
	.attr('fill', '#f9020b');

svg2.append('text')
	.attr('x', 70)
	.attr('y', 105)
	.style("font-size", 15)
	.text("Ville étape de l'année courante")

svg2.append('circle')
	.attr('cx', 30)
	.attr('cy', 130	)
	.attr('r', "10px")
	.attr('fill', '#029bf4')
	.style('opacity',0.4)

svg2.append('text')
	.attr('x', 70)
	.attr('y', 135)
	.style("font-size", 15)
	.text("Ville non-étape de l'année courante")

svg2.append('line')
	.attr('x1', 4)
	.attr('y1', 170)
	.attr('x2', 56)
	.attr('y2', 170)
	.style("stroke", "#252525")
	.style("stroke-width", 2)


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

	echelle_fr.selectAll("path")
		.data(scale_fr.features)
		.enter()
		.append("path")
		.attr("d", map)
		.style("stroke", "#252525")
		.style("stroke-width", 3);

	echelle_fr.append('text')
		.text("200 km")
		.attr("x", 497)
		.attr("y", 618);

	echelle_eu.selectAll("text").remove();
	echelle_eu.selectAll("path").remove();
}


function clickeu(){

	document.getElementById('bt_fr').disabled=false;
	bt_eu.disabled=true;
	let zoom = d3.zoom()
		.scaleExtent([0.25, 10])
		.on('zoom', handleZoom);
	var transform = d3.zoomIdentity;
	d3.select('#carte1')
		.transition()
		.call(zoom.transform, transform);

	echelle_eu.selectAll("path")
		.data(scale_eu.features)
		.enter()
		.append("path")
		.attr("d", map)
		.style("stroke", "#252525")
		.style("stroke-width", 5);

	echelle_eu.append('text')
		.text("200 km")
		.attr("x", 690)
		.attr("y", 688);

	echelle_fr.selectAll("text").remove();
	echelle_fr.selectAll("path").remove();
}

svg2.append('text')
	.attr('x', 70)
	.attr('y', 175)
	.style("font-size", 15)
	.text("Étape de l'année courante")


function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
	if (guerre.includes(parseInt(sliderOne.value))){
		$("#guerre").html("Pas de données cette année")
		$("#annee_info").html("")
		etape.selectAll("path")
		.style("opacity", 0)
	}else{
		slideTwo()
		$("#guerre").html("")
	}
	let max = 0
	ville.selectAll("circle")
	.attr("r", function(f){
		let valeur = f.properties[String(sliderTwo.value)]-f.properties[String(sliderOne.value)]

		if (valeur == NaN){
			return "0px";
		}else{
			let r = Math.round((5 / 2) * Math.sqrt(valeur));
			max = Math.max(r, max);
			return r+"px";
		}
	})
	circle1.attr('r', max)
	$("#map_title").html("Les étapes du Tour de France "+sliderTwo.value+" et les villes étapes de "+sliderOne.value+" à "+sliderTwo.value+"")
    fillColor();
}


function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
	$("#annee_info").html(sliderTwo.value)
	if (guerre.includes(parseInt(sliderTwo.value))){
		$("#guerre").html("Pas de données cette année")
		etape.selectAll("path")
		.style("opacity", 0)
	}else{
		$("#guerre").html("")
	}
	let max = 0
	let max2 = 0
	ville.selectAll("circle")
	.attr("r", function(f){
		let valeur = f.properties[String(sliderTwo.value)]-f.properties[String(sliderOne.value)]
		if (valeur == NaN){
			return "0px";
		}else{
			let r = Math.round((5 / 2) * Math.sqrt(valeur));
			max = Math.max(r, max);
			max2 = Math.max(parseInt(valeur), max2);
			return r+"px";
		}
	})
	.style("opacity", function(f){
		if (f.properties[String(sliderTwo.value)]-f.properties[String(sliderTwo.value-1)]){
			return 1
		}else{
			return 0.4
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
	text1.text(max2+" : Nombre de passage maximum")
	circle1.attr('r', max)
	$("#map_title").html("Les étapes du Tour de France "+sliderTwo.value+" et les villes étapes de "+sliderOne.value+" à "+sliderTwo.value+"")
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
	let div = document.getElementById(event.target.parentElement.id)
	if(event.target.parentElement.id != "liste"){
		div.style.border = "solid 2px"
		div.style.borderRadius = "2px"
		let etapeid = event.target.parentElement.id.slice(5)
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
}


function click(){
	console.log("true")
	let annee = 1903
	if(parseInt(sliderTwo.value) == 2022){
		annee = 1903
	}else{
		annee = parseInt(sliderTwo.value)
	}
	let liste = document.getElementById("liste")
	liste.innerHTML = ""

	button_play.removeEventListener('click',click)
	intervalle = setInterval(function(){
		annee+=1
		if(annee == 2022){
			clearInterval(intervalle)
		}

		$("#slider-2").val(annee)
		slideTwo()
	},200)
}


function clickstop(){
	clearInterval(intervalle)
	button_play.addEventListener('click',click,false)
	slideTwo()
	addEtape()
}


function clickclear(){
	clearInterval(intervalle)
	$("#slider-2").val(2022)
	button_play.addEventListener('click',click,false)
	slideTwo()
	addEtape()
}
