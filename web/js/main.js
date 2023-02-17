/***************************************************************************/
/************************************************ CREATION DE LA CARTE *****/
/***************************************************************************/

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

const pays = svg.append("g");

pays.selectAll("path")
	// La variable geojson_pays est créée dans le fichier JS qui contient le GeoJSON
	.data(geojson_pays.features)
	.enter()
	.append("path")
	.attr("d", map)
	// Sémiologie (par défaut) des objets
	.style("fill", "#f2f0e6")
	.style("stroke-width", 0);


// Ajout d'un groupe (fond) au SVG (svg)

const fond = svg.append("g");

fond.selectAll("path")
	// La variable geojson_fond est créée dans le fichier JS qui contient le GeoJSON
	.data(geojson_pays.features)
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


// Ajout d'un groupe (lgv) au SVG (svg)

const lgv = svg.append("g");

lgv.selectAll("path")
	// La variable geojson_lgv est créée dans le fichier JS qui contient le GeoJSON
	.data(geojson_lgv.features)
	.enter()
	.append("path")
	.attr("d", map)
	.style("fill-opacity", 0)
	.style("stroke", "black")
	.style("stroke-width", 2)
	.style("stroke-dasharray", [2, 2])
	.style("stroke-opacity", 0);

// Ajout d'un groupe (pts) au SVG (svg)

const pts = svg.append("g");

const prefectures = [
	[0.340784, 46.580421],
	[-0.46482, 46.323867],
	[0.156153, 45.648655],
	[-1.15195, 46.159821]
];

pts.selectAll("circle")
	.data(prefectures)
	.enter()
	.append("circle")
	.attr("cx", function (d){return projection(d)[0];})
	.attr("cy", function (d){return projection(d)[1];})
	.attr("r", "5px")
	.attr("fill", "#44659b")
	.style("stroke", "white")
	.style("stroke-width", 2);

/***************************************************************************/
/***************************************** CHANGER LE STYLE DES OBJETS *****/
/***************************************************************************/

fond.selectAll("path")
	.filter(d => d.properties.CODE_REG == "11")
	.style("fill", "orange");

/***************************************************************************/
/****************** CHANGER LE STYLE DES OBJETS AU SURVOL DE LA SOURIS *****/
/***************************************************************************/

// Sans aucune transition

fond.selectAll("path")
	.filter(d => d.properties.CODE_DEPT == "86")
	.on("mouseover", function(d) {
		d3.select(this)
			.style("fill", "orange");
	})
	.on("mouseout", function(d) {
		d3.select(this)
			.style("fill", "#f2ebcb");
	});

// Avec une transition

fond.selectAll("path")
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
	});

/***************************************************************************/
/***************************** PREVOIR UNE ACTION AU CLIC SUR UN OBJET *****/
/***************************************************************************/

fond.selectAll("path")
	.filter(d => d.properties.CODE_DEPT == "79")
	.on("mouseover", function(e) {
		d3.select(this).style("cursor", "pointer");
	})
	.on("click", function(e, dept) {
		alert("Je suis le département " + dept.properties.NOM_DEPT + " !")
	});

/***************************************************************************/
/************************************************* AJOUTER UNE TOOLTIP *****/
/***************************************************************************/

const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

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
	});

/***************************************************************************/
/**************************** PREVOIR UNE ACTION AU CLIC SUR UN BOUTON *****/
/***************************************************************************/

$("#action1").click(function(){
	alert("Il y a " + pays.selectAll("path").data().length + " pays");
});

$("#action2").click(function(){
	window.setTimeout(function(){
		alert("Vous avez attendu 3 secondes, mais ça valait le coup ! Il y a " + fond.selectAll("path").data().length + " départements");
	}, 3000); // 3000 millisecondes
});

$("#action3").click(function(){
	$("#legende").html("<ul><li><span></span>Hey ! J'ai été modifié par un bouton !</li></ul>");
});

$("#action4").click(function(){
	pays.selectAll("path")
		.filter(d => d.properties.SOV_A3 == "ITA" || d.properties.SOV_A3 == "ESP")
		.style("visibility", "hidden");
});

$("#action5").click(function(){
	lgv.selectAll("path").style("stroke-opacity", 1);
});

$("#action6").click(function(){
	// Modifier l'échelle afin de zoomer
	projection.scale(5000);
	// Modifier le centre (sur Paris)
	projection.center([2.3474, 48.8547]);
	// Appliquer la nouvelle projection à tous les objets path du SVG
	svg.selectAll("path")
		.transition()
		.duration(0)
		.attr("d", map);
	// Appliquer la nouvelle projection à tous les objets circle du groupe pts
	pts.selectAll("circle")
		.transition()
		.duration(0)
		.attr("cx", function (d){return projection(d)[0];})
		.attr("cy", function (d){return projection(d)[1];});
});

$("#action7").click(function(){
	fond.selectAll("path")
		.style("fill", function(d){
			if (parseInt(d.properties.CODE_DEPT) < 50) {
				return "#fbedff";
			} else {
				return "#eeffeb";
			}
		});
});

$("#myRange").change(function(){
	let value = $('#myRange').val()
	ville.selectAll("circle")
		.attr("r", function(f){
			if (f.properties[String(value)] == "NaN"){
				return "0px";
			}else{
				let r = Math.round((5 / 2) * Math.sqrt(f.properties[String(value)]));
				return r+"px";
			}
			
		})
})
