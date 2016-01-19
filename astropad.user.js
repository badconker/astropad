// ==UserScript==
// @name       AstroPad
// @version    0.26
// @grant      GM_xmlhttpRequest
// @match      http://mush.vg/*
// @match      http://mush.vg/#
// @match      http://mush.twinoid.com/*
// @match      http://mush.twinoid.com/#
// @match      http://mush.twinoid.es/*
// @match      http://mush.twinoid.es/#
// @require    http://code.jquery.com/jquery-latest.js
// @copyright  2012+, Sunsky (inspiration Skildor' scripts), compatibility with Firefox 32+ by badconker
// @downloadURL https://github.com/badconker/astropad/raw/master/astropad.user.js
// ==/UserScript==

var console = unsafeWindow.console;
var localStorage = unsafeWindow.localStorage;
var Main = unsafeWindow.Main;

Main.AstroPad = {};

Main.AstroPad.urlAstro = "http://astropad.sunsky.fr/api.py";
Main.AstroPad.heronames = ['Jin Su', 'Frieda', 'Kuan Ti', 'Janice', 'Roland', 'Hua', 'Paola', 'Chao', 'Finola', 'Stephen', 'Ian', 'Chun', 'Raluca', 'Gioele', 'Eleesha', 'Terrence', 'Derek', 'Andie'];
Main.AstroPad.heronames[-1] = "?";
Main.AstroPad.items = [];
Main.AstroPad.txt = {};


if (window.location.href.indexOf('mush.twinoid.com') != -1) {
	Main.AstroPad.language = 'en';
	Main.AstroPad.lang = 2;
	Main.AstroPad.urlMush = "mush.twinoid.com";
	Main.AstroPad.roomNames = ['Bridge', 'Alpha Bay', 'Bravo Bay', 'Alpha Bay 2', 'Nexus', 'Medlab', 'Laboratory', 'Refectory', 'Hydroponic Garden', 'Engine Room',
		'Front Alpha Turret', 'Centre Alpha Turret', 'Rear Alpha Turret', 'Front Bravo Turret', 'Centre Bravo Turret', 'Rear Bravo Turret',
		'Patrol Ship Tomorrowland', 'Patrol Ship Olive Grove', 'Patrol Ship Yasmin', 'Patrol Ship Wolf', 'Patrol Ship E-Street', 'Patrol Ship Eponine', 'Patrol Ship Carpe Diem', 'Pasiphae',
		'Front Corridor', 'Central Corridor', 'Rear Corridor', 'Planet', 'Icarus Bay', 'Alpha Dorm', 'Bravo Dorm',
		'Front Storage', 'Centre Alpha Storage', 'Rear Alpha Storage', 'Centre Bravo Storage', 'Rear Bravo Storage', 'Outer Space', 'Limbo'];

	Main.AstroPad.txt.desc = "Inventory Manager developed by Sunsky.";
	Main.AstroPad.txt.camera = "Camera";
	Main.AstroPad.txt.drone ="Drone";
	Main.AstroPad.txt.intox = "Food Poisoning";
	Main.AstroPad.txt.broken = "Broken";
	Main.AstroPad.txt.frozen = "Frozen";
	Main.AstroPad.txt.unstable = "Unstable";
	Main.AstroPad.txt.hazardous = "Hazardous";
	Main.AstroPad.txt.decaying = "Decomposing";
	Main.AstroPad.txt.charges = "charge(s)";
	Main.AstroPad.txt.effect = "Effects";
	Main.AstroPad.txt.effect2 = "the effects";
	Main.AstroPad.txt.healsTip = "Cures";
	Main.AstroPad.txt.healsText = "Cures";
	Main.AstroPad.txt.causesTip = "???"; //TODO
	Main.AstroPad.txt.causesText = "???";
	Main.AstroPad.txt.chef = "Chef";
	Main.AstroPad.txt.botanist = "Botaniste"; //TODO: check
	Main.AstroPad.txt.satisfaction = "satisfaction";
	Main.AstroPad.txt.thirsty = "thirsty";
	Main.AstroPad.txt.dry = "dry";
	Main.AstroPad.txt.diseased = "diseased";
	Main.AstroPad.txt.cycles = "cycles";

	Main.AstroPad.txt.by = "by";
	Main.AstroPad.txt.the = "the";
	Main.AstroPad.txt.at = "at";
	Main.AstroPad.txt.empty = "Void";
	Main.AstroPad.txt.inventory = "INVENTORY";
	Main.AstroPad.txt.sumbit = "Synchronize";
	Main.AstroPad.txt.refresh = "Refresh";
	Main.AstroPad.txt.list = "Text Format";
	Main.AstroPad.txt.show = "Show";
	Main.AstroPad.txt.help = "Help";
	Main.AstroPad.txt.new = "New";
	Main.AstroPad.txt.exit = "Exit";


	Main.AstroPad.txt.updateEffect = "Do you want to update the effects ?\n\n(Cancel = update but without the effects)";
	TXT_HELP_1 = "Here is the text that you should send to your teammates in order to share your AstroPad:";
	TXT_HELP_2 = "    **I suggest using AstroPad for inventory tracking**<br/>";
	TXT_HELP_2 += "This is a script that works with Firefox and Chrome:<br/>";
	TXT_HELP_2 += " - for firefox, install GreaseMonkey<br/>";
	TXT_HELP_2 += "//https://addons.mozilla.org/en/firefox/addon/greasemonkey//<br/>";
	TXT_HELP_2 += " - for  Chrome, install TamperMonkey<br/>";
	TXT_HELP_2 += "//https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en//<br/>";
	TXT_HELP_2 += " <br/>";
	TXT_HELP_2 += "Then follow this link to install the script:<br/>";
	TXT_HELP_2 += "//https://github.com/badconker/astropad/raw/master/astropad.user.js//<br/>";
	TXT_HELP_2 += " <br/>";
	TXT_HELP_2 += "Then follow this link to join this game's AstroPad:<br/>";
	TXT_HELP_3 = "Thank you for your attention";
	Main.AstroPad.txt.link = "Do you want to bind Astropad #%1 of which the key is %2 to this game?";
	Main.AstroPad.txt.unlink = "Do you really want to delete the link between AstroPad #%1 and this game?\nIf you lose the Astropad Key, you cannot get it back.";
}
else if (window.location.href.indexOf('mush.twinoid.es') != -1) {
	Main.AstroPad.language = 'es';
	Main.AstroPad.lang = 3;
	Main.AstroPad.urlMush = "mush.twinoid.es";
	Main.AstroPad.roomNames = ['Puente de mando', 'Plataforma Alpha', 'Plataforma Beta', 'Plataforma Alpha 2', 'Nexus', 'Enfermería', 'Laboratorio', 'Comedor', 'Jardín Hidropónico', 'Sala de motores',
		'Cañón Alpha delantero', 'Cañón Alpha central', 'Cañón Alpha trasero', 'Cañón Beta delantero', 'Cañón Beta central', 'Cañón Beta trasero',
		'Patrullero Longane', 'Patrullero Jujube', 'Patrullero Tamarindo', 'Patrullero Sócrates', 'Patrullero Epicuro', 'Patrullero Platón', 'Patrullero Wallis', 'Pasiphae',
		'Pasillo delantero', 'Pasillo central', 'Pasillo trasero', 'Planeta', 'Icarus', 'Dormitorio Alpha', 'Dormitorio Beta',
		'Almacén delantero', 'Almacén Alpha central', 'Almacén Alpha trasero', 'Almacén Beta central', 'Almacén Beta trasero', 'Espacio infinito', 'El limbo'];

	Main.AstroPad.txt.desc = "Gestor de inventario desarrollado por Sunsky. Traducción xxbrut0xx.";
	Main.AstroPad.txt.camera = "Cámara";
	Main.AstroPad.txt.drone = "Dron";
	Main.AstroPad.txt.intox = "Intoxicación Alimentaria";
	Main.AstroPad.txt.broken = "Roto";
	Main.AstroPad.txt.frozen = "Congelado";
	Main.AstroPad.txt.unstable = "Sospechosa";
	Main.AstroPad.txt.hazardous = "Nociva";
	Main.AstroPad.txt.decaying = "Toxica";
	Main.AstroPad.txt.charges = "carga(s)";
	Main.AstroPad.txt.effect = "Efectos";
	Main.AstroPad.txt.effect2 = "los efectos";
	Main.AstroPad.txt.healsTip = "Cura la enfermedad";
	Main.AstroPad.txt.healsText = "Cura";
	Main.AstroPad.txt.causesTip = "???"; //TODO
	Main.AstroPad.txt.causesText = "???";
	Main.AstroPad.txt.chef = "Chef";
	Main.AstroPad.txt.botanist = "Botanista";
	Main.AstroPad.txt.satisfaction = "saciedad";
	Main.AstroPad.txt.thirsty = "sedienta";
	Main.AstroPad.txt.dry = "seca";
	Main.AstroPad.txt.diseased = "enferma";
	Main.AstroPad.txt.cycles = "ciclos";

	Main.AstroPad.txt.by = "por";
	Main.AstroPad.txt.the = "el";
	Main.AstroPad.txt.at = "a las";
	Main.AstroPad.txt.empty = "Vacío";
	Main.AstroPad.txt.inventory = "INVENTARIO";
	Main.AstroPad.txt.submit = "Sincronizar";
	Main.AstroPad.txt.refresh = "Actualizar";
	Main.AstroPad.txt.list = "Formato Texto";
	Main.AstroPad.txt.show = "Visualizar";
	Main.AstroPad.txt.help = "Ayuda";
	Main.AstroPad.txt.new = "Nuevo";
	Main.AstroPad.txt.exit = "Quitar";

	Main.AstroPad.txt.updateEffect = "¿Desea actualizar los efectos? \n\n (Cancelar=actualizadas pero sin los efectos)"
	TXT_HELP_1 = "Aqui está la prueba a ofrecer a vuestros compañeros de equipo para compartir vuestro AstroPad :"
	TXT_HELP_2 = "    **Le sugiero usar AstroPad para el inventario**<br/>";
	TXT_HELP_2 += "Este es un script que funciona con Firefox y Chrome:<br/>";
	TXT_HELP_2 += " - Sobre Firefox, instalar GreaseMonkey<br/>"
	TXT_HELP_2 += "//https://addons.mozilla.org/es/firefox/addon/greasemonkey//<br/>";
	TXT_HELP_2 += " - Sobre Chrome, instalar TamperMonkey<br/>"
	TXT_HELP_2 += "//https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=es//<br/>";
	TXT_HELP_2 += " <br/>";
	TXT_HELP_2 += "A continuación, vaya al siguiente enlace para instalar el script<br/>";
	TXT_HELP_2 += "//https://github.com/badconker/astropad/raw/master/astropad.user.js//<br/>";
	TXT_HELP_2 += " <br/>";
	TXT_HELP_2 += "A continuación, vaya al siguiente enlace para unirse el inventario de esta partida:<br/>";
	TXT_HELP_3 = "Gracias por su atención"
	Main.AstroPad.txt.link = "¿Deseas vincular el AstroPad n°%1 cuya clave es %2 a la partida?";
	Main.AstroPad.txt.unlink = "¿Estás seguro que quieres eliminar el enlace entre el AstroPad n°%1 y la partida ?\nSi pierde la clave relativa a su partida, no será capaz de encontrarla.";
}
else {
	Main.AstroPad.language = '';
	Main.AstroPad.lang = 1;
	Main.AstroPad.urlMush = "mush.vg";
	Main.AstroPad.roomNames = ['Pont', 'Baie Alpha', 'Baie Beta', 'Baie Alpha 2', 'Nexus', 'Infirmerie', 'Laboratoire', 'Réfectoire', 'Jardin Hydroponique', 'Salle des moteurs',
		'Tourelle Alpha avant', 'Tourelle Alpha centre', 'Tourelle Alpha arrière', 'Tourelle Beta avant', 'Tourelle Beta centre', 'Tourelle Beta arrière',
		'Patrouilleur Longane', 'Patrouilleur Jujube', 'Patrouilleur Tamarin', 'Patrouilleur Socrate', 'Patrouilleur Epicure', 'Patrouilleur Planton', 'Patrouilleur Wallis', 'Pasiphae',
		'Couloir avant', 'Couloir central', 'Couloir arrière', 'Planète', 'Baie Icarus', 'Dortoir Alpha', 'Dortoir Beta',
		'Stockage Avant', 'Stockage Alpha centre', 'Stockage Alpha arrière', 'Stockage Beta centre', 'Stockage Beta arrière', 'Espace infini', 'Les Limbes'];

	Main.AstroPad.txt.desc = "Gestionnaire d'inventaire développé par Sunsky.";
	Main.AstroPad.txt.camera = "Caméra";
	Main.AstroPad.txt.drone = "Drone";
	Main.AstroPad.txt.intox = "Intoxication Alimentaire";
	Main.AstroPad.txt.broken = "Cassé(e)";
	Main.AstroPad.txt.frozen = "Congelé";
	Main.AstroPad.txt.unstable = "Instable";
	Main.AstroPad.txt.hazardous = "Avariée";
	Main.AstroPad.txt.decaying = "Décomposée";
	Main.AstroPad.txt.charges = "charge(s)";
	Main.AstroPad.txt.effect = "Effets";
	Main.AstroPad.txt.effect2 = "les effets";
	Main.AstroPad.txt.healsTip = "Guérie la maladie";
	Main.AstroPad.txt.healsText = "Guérit";
	Main.AstroPad.txt.causesTip = "Provoque la maladie";
	Main.AstroPad.txt.causesText = "Provoque";
	Main.AstroPad.txt.chef = "Cuistot";
	Main.AstroPad.txt.botanist = "Botaniste";
	Main.AstroPad.txt.satisfaction = "satiété";
	Main.AstroPad.txt.thirsty = "assoiffé";
	Main.AstroPad.txt.dry = "desseché";
	Main.AstroPad.txt.diseased = "malade";
	Main.AstroPad.txt.cycles = "cycles";

	Main.AstroPad.txt.by = "par";
	Main.AstroPad.txt.the = "le";
	Main.AstroPad.txt.at = "à";
	Main.AstroPad.txt.empty = "Vide";
	Main.AstroPad.txt.inventory = "INVENTAIRE";
	Main.AstroPad.txt.submit = "Synchroniser";
	Main.AstroPad.txt.refresh = "Rafraîchir";
	Main.AstroPad.txt.list = "Format texte";
	Main.AstroPad.txt.show = "Visualiser";
	Main.AstroPad.txt.help = "Aide";
	Main.AstroPad.txt.new = "Nouveau";
	Main.AstroPad.txt.exit = "Quitter";

	Main.AstroPad.txt.updateEffect = "Voulez-vous mettre à jour les effets ?\n\n(Annuler = mise à jour quand même mais sans les effets)";
	TXT_HELP_1 = "Voici le texte à fournir à vos coéquipiers pour partager votre AstroPad :";
	TXT_HELP_2 = "**Je vous propose l'AstroPad pour l'inventaire**<br/>";
	TXT_HELP_2 += "Il s'agit d'un script qui fonctionne avec Firefox et Chrome :<br/>";
	TXT_HELP_2 += " - Sur firefox, installer GreaseMonkey<br/>";
	TXT_HELP_2 += "//https://addons.mozilla.org/fr/firefox/addon/greasemonkey//<br/>";
	TXT_HELP_2 += " - Sur Chrome, installer TamperMonkey<br/>";
	TXT_HELP_2 += "//https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=fr//<br/>";
	TXT_HELP_2 += " <br/>";
	TXT_HELP_2 += "Aller ensuite sur le lien suivant pour installer le script<br/>";
	TXT_HELP_2 += "//https://github.com/badconker/astropad/raw/master/astropad.user.js//<br/>";
	TXT_HELP_2 += " <br/>";
	TXT_HELP_2 += "Aller ensuite sur le lien suivant pour rejoindre l'inventaire de cette partie :<br/>";
	TXT_HELP_3 = "Merci de votre attention";
	Main.AstroPad.txt.link = "Voulez-vous lier l'AstroPad n°%1 dont la clé est %2 à cette partie ?";
	Main.AstroPad.txt.unlink = "Voulez-vous vraiment supprimer le lien entre l'AstroPad n°%1 et cette partie ?\nSi vous perdez la clé relative à votre partie, vous ne serez plus en mesure de la retrouver.";
}

Main.AstroPad.allItems = {
	super_map: ["alien", "Morceau de carte stellaire", "Starmap Fragment", "Trozo de Mapa Estelar"], alien_holographic_tv: ["alien", "Télé Holographique alien", "Alien Holographic TV", "Televisión Alien"], alien_oil: ["alien", "Lubrifiant Alien", "Jar of Alien Oil", "Lubricante Alien"], computer_jelly: ["alien", "Gelée à Circuits Imprimés", "Printed Circuit Jelly", "Pomada Refrescante"], insectoid_shell: ["alien", "Cartouche Invertébré", "Invertebrate Shell", "Proyectil Invertebrado"], magellan_liquid_map: ["alien", "Carte Liquide de Magellan", "Magellan Liquid Map", "Mapa Líquido de Magallanes"], water_stick: ["alien", "Batonnet Aqueux", "Water Stick", "Barrilla acuosa"], 

	document: ["documents", "Document", "Document", "Documento"], postit: ["documents", "Pense-Bête", "Post-it", "Taco de post-it"], postit_bloc: ["documents", "Bloc de Pense-Bête", "Block of Post-it Notes", "Bloc de Notas"], blueprint_0: ["documents", "Plan du Casque de Visée", "Blueprint: Sniper Helmet", "Plano: Casco de tiro"], blueprint_1: ["documents", "Plan du Drapeau Blanc", "Blueprint: White Flag", "Plano: Bandera blanca"], blueprint_2: ["documents", "Plan du Drone de Soutien", "Blueprint: Support Drone", "Plano: Dron de apoyo"], blueprint_3: ["documents", "Plan de l'EchoLocateur", "Blueprint: EchoLocator", "Plano: Eco-Localizador"], blueprint_4: ["documents", "Plan de l'Extincteur", "Blueprint: Extinguisher", "Plano: Extintor"], blueprint_5: ["documents", "Plan de la Grenade", "Blueprint: Grenade", "Plano: Granada"], blueprint_6: ["documents", "Plan du Lance-Roquette", "Blueprint: Rocket Launcher", "Plano: Lanza-misiles"], blueprint_7: ["documents", "Plan du Lizaro Jungle", "Blueprint: Lizaro Jungle", "Plano: Lizaro Jungle"], blueprint_8: ["documents", "Plan du Module Babel", "Blueprint: Babel Module", "Plano: Módulo Babel"], blueprint_9: ["documents", "Plan du Sofa Suédois", "Blueprint: Swedish Sofa", "Plano: Sofá sueco"], blueprint_10: ["documents", "Plan de la Sulfateuse", "Blueprint: Old Faithful", "Plano: Sulfatosa"], blueprint_11: ["documents", "Plan du ThermoSenseur", "Blueprint: Thermosensor", "Plano: TermoSensor"], blueprint_12: ["documents", "Plan du Vaguoscope", "Blueprint: Oscilloscope", "Plano: Olascopio"], book_0: ["documents", "Apprentron : Astrophysicien", "Astrophysicist Mage Book", "Librotron : Astrofísico"], book_1: ["documents", "Apprentron : Biologiste", "Biologist Mage Book", "Librotron : Biólogo"], book_2: ["documents", "Apprentron : Botaniste", "Botanist Mage Book", "Librotron : Botánico"], book_3: ["documents", "Apprentron : Cuistot", "Chef Mage Book", "Librotron : Chef"], book_4: ["documents", "Apprentron : Diplomatie", "Diplomat Mage Book", "Librotron : Diplomático"], book_5: ["documents", "Apprentron : Expert radio", "Radio Expert Mage Book", "Librotron : Experto en comunicaciones"], book_6: ["documents", "Apprentron : Informaticien", "IT Expert Mage Book", "Librotron : Informático"], book_7: ["documents", "Apprentron : Logistique", "Logistics Expert Mage Book", "Librotron : Logística"], book_8: ["documents", "Apprentron : Médecin", "Medic Mage Book", "Librotron : Médico"], book_9: ["documents", "Apprentron : Pilote", "Pilot Mage Book", "Librotron : Piloto"], book_10: ["documents", "Apprentron : Pompier", "Firefighter Mage Book", "Librotron : Bombero"], book_11: ["documents", "Apprentron : Psy", "Shrink Mage Book", "Librotron : Psicólogo"], book_12: ["documents", "Apprentron : Robotiques", "Robotics Expert Mage Book", "Librotron : Ing. Robótico"], book_13: ["documents", "Apprentron : Sprinter", "Sprinter Mage Book", "Librotron : Velocista"], book_14: ["documents", "Apprentron : Technicien", "Technician Mage Book", "Librotron : Técnico"], book_15: ["documents", "Apprentron : Tireur", "Shooter Mage Book", "Librotron : Artillero"], book_16: ["documents", "De la Recherche sur le Mush.", "Mush Research Review", "Estudio sobre los Mush."], book_17: ["documents", "Manuel du commandant", "Commander's Manual", "Manual del Comandante"], 

	space_suit: ["expedition", "Combinaison", "Spacesuit", "Traje espacial"], driller: ["expedition", "Foreuse", "Drill", "Taladro"], quad_compass: ["expedition", "Boussole quadrimetric", "Quadrimetric Compass", "Brújula Cuadrimétrica"], rope: ["expedition", "Corde", "Rope", "Cuerda"], echo_sounder: ["expedition", "EchoLocateur", "EchoLocator", "Eco-Localizador"], heat_seeker: ["expedition", "ThermoSenseur", "Thermosensor", "TermoSensor"], trad_module: ["expedition", "Module Babel", "Babel Module", "Módulo Babel"], white_flag: ["expedition", "Drapeau blanc", "White Flag", "Bandera blanca"], 

	ration_5: ["food", "Steack alien", "Alien Steak", "Bistec Alien", { foodProperties: [{ type: 'pa', value: 4 }, { type: 'moral', value: -1 }, { type: 'satisfaction', value: 4 }, { type: 'provokes', value: ["", "Reflux Gastriques", "Acid Reflux", "Reflujos gástricos"][Main.AstroPad.lang], chances: 50, delay: '4-8' }, { type: 'provokes', value: ["", "Vers Solitaire", "Tapeworm", "Solitaria"][Main.AstroPad.lang], chances: 25, delay: '4-8' }] }], ration_0: ["food", "Ration standard", "Standard Ration", "Ración Estándar", { foodProperties: [{ type: 'pa', value: 4 }, { type: 'moral', value: -1 }, { type: 'satisfaction', value: 4 }] }], ration_1: ["food", "Ration cuisinée", "Cooked Ration", "Ración Cocinada", { foodProperties: [{ type: 'pa', value: 4 }, { type: 'satisfaction', value: 4 }] }], ration_7: ["food", "Café", "Coffee", "Café", { foodProperties: [{ type: 'pa', value: 2 }] }], ration_2: ["food", "Riz soufflé proactif", "Proactive Puffed Rice", "Cereal Proactivo", { foodProperties: [{ type: 'pa', value: 10 }, { type: 'satisfaction', value: 5 }] }], ration_3: ["food", "Patate spatiale", "Space Potato", "Patata Espacial", { foodProperties: [{ type: 'pa', value: 8 }, { type: 'satisfaction', value: 8 }] }], ration_4: ["food", "Barre de Lombrics", "Lombrick Bar", "Barra de Lombrices", { foodProperties: [{ type: 'pa', value: 6 }, { type: 'moral', value: 2 }, { type: 'satisfaction', value: 8 }] }], ration_8: ["food", "Barre Supravitaminée", "SuperVitamin Bar", "Barra Supervitaminada", { foodProperties: [{ type: 'pa', value: 8 }, { type: 'pm', value: 4 }, { type: 'satisfaction', value: 6 }, { type: 'provokes', value: ["Nausée légère", "Slight Nausea", "Náusea Ligera"][Main.AstroPad.lang], chances: 55 }] }], coffee_thermos: ["food", "Thermos de Café", "Thermos of Coffee", "Termo con Café", { charges:4 }], lunchbox: ["food", "Panier Repas", "Lunchbox", "Canasta de comida", { charges:3 }], ration_9: ["food", "Déchets Organiques", "Organic Waste", "Desechos orgánicos", { foodProperties: [{ type: 'pa', value: 6 }, { type: 'moral', value: -4 }, { type: 'satisfaction', value: 16 }] }], 

	bandage: ["health", "Bandage", "Bandage", "Vendaje"], medikit: ["health", "Médikit", "Medikit", "Medikit"], pill_box: ["health", "Kit de survie", "Survival Kit", "Kit de supervivencia", { charges:3 }], drug_0: ["health", "Twïnoid", "Twinoid", "Twinoid"], drug_1: ["health", "Xenox", "Xenox", "Xenox"], drug_2: ["health", "Rixolam", "Puuquf", "Risolam"], drug_3: ["health", "Eufurysant", "Eufurylate", "Euforidyl"], drug_4: ["health", "Soma", "Soma", "Macamaca"], drug_5: ["health", "Epice", "Spyce", "Nuke"], drug_6: ["health", "Nuke", "Newke", "Japiyú"], drug_7: ["health", "Ponay", "Pinq", "Ñapepa"], drug_8: ["health", "Bacta", "Bacta", "Betapropyl"], drug_9: ["health", "Betapropyl", "Betapropyl", "Pimp"], drug_10: ["health", "Pimp", "Pymp", "Ontoy"], drug_11: ["health", "Rosebud", "Rosebud", "Ming"], ration_6: ["health", "Anabolisant", "Anabolic", "Anabólicos", { foodProperties: [{ type: 'pm', value: 8 }] }], 

	spore_extractor: ["misc", "Suceur de Spore", "Spore Sucker", "Extractor de Esporas"], anti_mush_serum: ["misc", "Sérum Rétro-Fongique", "Retro-Fungal Serum", "Antídoto Retrofúngico"], apron: ["misc", "Tablier intachable", "Stainproof Apron", "Mandil anti-manchas"], mush_floppy_disk: ["misc", "Disquette du Génome Mush", "Mush Genome Disk", "Diskette Del Genoma Mush"], mush_sample: ["misc", "Souche de test Mush", "Mush Sample", "Muestra De Raíz Mush"], myco_alarm: ["misc", "Myco-Alarme", "Myco-Alarm", "MycoAlarma"], body_cat: ["misc", "Schrödinger", "Schrödinger", "Schrödinger"], help_drone: ["misc", "Drone de Soutien", "Support Drone", "Dron"], freezer: ["misc", "Supergélateur", "Superfreezer", "Supergelador"], microwave: ["misc", "Micro-onde", "Microwave", "Microondas", { charges:4 }], sofa: ["misc", "Sofa Suédois", "Swedish Sofa", "Sofá Sueco"], plastenite_armor: ["misc", "Armure de plastenite", "Plastenite Armor", "Armadura De Plastenita"], soap: ["misc", "Savon", "Soap", "Jabón"], super_soap: ["misc", "Super Savon", "Super Soaper", "Jabón mushicida"], metal_scraps: ["misc", "Débris métallique", "Scrap Metal", "Pieza metálica"], plastic_scraps: ["misc", "Débris plastique", "Plastic Scraps", "Pieza plástica"], space_capsule: ["misc", "Capsule Spatiale", "Space Capsule", "Cápsula Espacial"], fuel_capsule: ["misc", "Capsule de Fuel", "Fuel Capsule", "Cápsula De Combustible"], oxy_capsule: ["misc", "Capsule d'Oxygène", "Oxygen Capsule", "Cápsula De Oxígeno"], thick_tube: ["misc", "Tube épais", "Thick Tube", "Tubo grueso"], duck_tape: ["misc", "Ruban Adhésif", "Duct Tape", "Cinta adhesiva"], mad_kube: ["misc", "MAD Kube", "MAD Kube", "MAD Kube"], old_shirt: ["misc", "Vieux T-Shirt", "Old T-Shirt", "Vieja camiseta"], printer: ["misc", "Tabulatrice", "Tabulatrix", "Tabuladora"], 

	tree_pot: ["plants", "HydroPot", "HydroPot", "Hydromaceta"], fruit_tree00: ["plants", "Bananier", "Banana Tree", "Árbol plátano"], young_fruit_tree00: ["plants", "Jeune Bananier", "Young Banana Tree", "Joven Árbol plátano"], fruit_tree01: ["plants", "Lianiste", "Creepist", "Lianesto"], young_fruit_tree01: ["plants", "Jeune Lianiste", "Young Creepist", "Joven Lianesto"], fruit_tree02: ["plants", "Cactuor", "Cactax", "Cactour"], young_fruit_tree02: ["plants", "Jeune Cactuor", "Young Cactax", "Joven Cactour"], fruit_tree03: ["plants", "Bifalon", "Bifflon", "Desconocido"], young_fruit_tree03: ["plants", "Jeune Bifalon", "Young Bifflon", "Joven Desconocido"], fruit_tree04: ["plants", "Poulmino", "Pulminagro", "Desconocido"], young_fruit_tree04: ["plants", "Jeune Poulmino", "Young Pulminagro", "Joven Desconocido"], fruit_tree05: ["plants", "Precatus", "Precatus", "Precatia"], young_fruit_tree05: ["plants", "Jeune Precatus", "Young Precatus", "Joven Precatia"], fruit_tree06: ["plants", "Buitalien", "Buttalien", "Buitalien"], young_fruit_tree06: ["plants", "Jeune Buitalien", "Young Buttalien", "Joven Buitalien"], fruit_tree07: ["plants", "Platacia", "Platacia", "Platacia"], young_fruit_tree07: ["plants", "Jeune Platacia", "Young Platacia", "Joven Platacia"], fruit_tree08: ["plants", "Tubiliscus", "Tubiliscus", "Tubiliscus"], young_fruit_tree08: ["plants", "Jeune Tubiliscus", "Young Tubiliscus", "Joven Tubiliscus"], fruit_tree09: ["plants", "Peuplimoune", "Graapshoot", "Poplimuno"], young_fruit_tree09: ["plants", "Jeune Peuplimoune", "Young Graapshoot", "Joven Poplimuno"], fruit_tree10: ["plants", "Fiboniccus", "Fiboniccus", "Fibonicio"], young_fruit_tree10: ["plants", "Jeune Fiboniccus", "Young Fiboniccus", "Joven Fibonicio"], fruit_tree11: ["plants", "Mycopia", "Mycopia", "Mycopia"], young_fruit_tree11: ["plants", "Jeune Mycopia", "Young Mycopia", "Joven Mycopia"], fruit_tree12: ["plants", "Aspergilnuk", "Asperagunk", "Desconocido"], young_fruit_tree12: ["plants", "Jeune Aspergilnuk", "Young Asperagunk", "Joven Desconocido"], fruit_tree13: ["plants", "Cucurbitatrouille", "Bumpjunkin", "Cucurbitacia"], young_fruit_tree13: ["plants", "Jeune Cucurbitatrouille", "Young Bumpjunkin", "Joven Cucurbitacia"], fruit00: ["plants", "Banane", "Banana", "Plátano", { foodProperties: [{ type: 'pa', value: 1 }, { type: 'moral', value: 1 }, { type: 'hp', value: 1 }, { type: 'satisfaction', value: 1 }] }], fruit01: ["plants", "Lianube", "Creepnut", "Lianuba", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit02: ["plants", "Balargine", "Meztine", "Balargina", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit03: ["plants", "Goustiflon", "Guntiflop", "Gustiflón", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit04: ["plants", "Toupimino", "Ploshmina", "Tupimino", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit05: ["plants", "Precati", "Precati", "Precatia", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit06: ["plants", "Bottine", "Bottine", "Botino", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit07: ["plants", "Fragilane", "Fragilane", "Fragilana", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit08: ["plants", "Anémole", "Anemole", "Anémola", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit09: ["plants", "Pénicule", "Peniraft", "Peniclo", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit10: ["plants", "Kubinus", "Kubinus", "Kubinus", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit11: ["plants", "Calebotte", "Caleboot", "Calebota", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit12: ["plants", "Filandru", "Filandra", "Filandru", { foodProperties: [{ type: 'satisfaction', value: 1 }] }], fruit13: ["plants", "Citrouïd", "Jumpkin", "Citroida", { foodProperties: [{ type: 'pa', value: 3 }, { type: 'moral', value: 1 }, { type: 'hp', value: 1 }] }], 

	camera: ["tools", "Caméra", "Camera", "Cámara"], extinguisher: ["tools", "Extincteur", "Extinguisher", "Extintor"], hacker_kit: ["tools", "Bidouilleur", "Hacker Kit", "Kit de Hackeo"], aiming_helmet: ["tools", "Casque de Visée", "Sniper's Helmet", "Casco de tiro"], ncc_lens: ["tools", "Lentille NCC", "Lenses", "Lentilla NCC"], antigrav_scooter: ["tools", "Trottinette Anti-Grav.", "Anti-Grav Scooter", "Patinete Anti-Gravedad", { charges:8 }], rolling_boulder: ["tools", "Monture Rocheuse", "Rolling Boulder", "Montura Rocosa"], wavoscope: ["tools", "Vaguoscope", "Oscilloscope", "Olascopio"], wrench: ["tools", "Clé à molette", "Adjustable Wrench", "Llave inglesa"], alien_can_opener: ["tools", "Décapsuleur Alien", "Alien Bottle Opener", "Abrebotellas Alien"], protection_gloves: ["tools", "Gants de protection", "Protective Gloves", "Guantes de protección"], 

	blaster: ["weaponry", "Blaster", "Blaster", "Blaster", { charges:3 }], grenade: ["weaponry", "Grenade", "Grenade", "Granada"], knife: ["weaponry", "Couteau", "Knife", "Cuchillo"], machine_gun: ["weaponry", "Sulfateuse", "Old Faithful", "Sulfatosa", { charges:12 }], missile_launcher: ["weaponry", "Lance-Roquette", "Rocket Launcher", "Lanza-misiles", { charges:1 }], natamy_riffle: ["weaponry", "Natamy", "Natamy Rifle", "Fusil Natamy", { charges:3 }], sniper_riffle: ["weaponry", "Lizaro Jungle", "Lizaro Jungle", "Lizaro Jungle", { charges:1 }]
};

Main.AstroPad.capitalize = function(str) {
	if (str == undefined) {
		return "";
	}
	return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

Main.AstroPad.getRoomId = function() {
	return Main.AstroPad.roomNames.indexOf($("#input").attr('d_name'));
};

Main.AstroPad.getCheck = function() {
	var $it0 = Main.heroes.iterator();
	var chk = "";
	while ($it0.hasNext()) {
		var st1 = $it0.next();
		chk += "0123456789abcdefghijklMNOPQRSTUVWXYZ"[parseInt(st1.id)];
	}
	return chk;
};

Main.AstroPad.getHname = function() {
	return $('.who').html().trim();
};

Main.AstroPad.getMushStatus = function() {
	var $it0 = Main.heroes.iterator();
	while ($it0.hasNext()) {
		var st1 = $it0.next();
		if (st1.skills == null) {
			continue;
		}
		if (!st1.me) {
			continue;
		}
		var $it1 = st1.statuses.iterator();
		while ($it1.hasNext()) {
			if ($it1.next().img == "mush") {
				return true;
			}
		}
	}
	return false;
};

Main.AstroPad.canReadMedic = function() { //Can read pills effects
	var $it0 = Main.heroes.iterator();
	while ($it0.hasNext()) {
		var st1 = $it0.next();
		if (st1.skills == null) {
			continue;
		}
		if (!st1.me) {
			continue;
		}
		var $it1 = st1.skills.iterator();
		while ($it1.hasNext()) {
			if (["biologist", "first_aid", "medic", "skilful"].indexOf($it1.next().img) != -1) {
				return true;
			}
		}
	}
	return false;
};

Main.AstroPad.canReadFood = function() { //Can read fruits and food effects
	var $it0 = Main.heroes.iterator();
	while ($it0.hasNext()) {
		var st1 = $it0.next();
		if (st1.skills == null) {
			continue;
		}
		if (!st1.me) {
			continue;
		}
		var $it1 = st1.skills.iterator();
		while ($it1.hasNext()) {
			if ($it1.next().img == "cook") {
				return true;
			}
		}
	}
	return false;
};

Main.AstroPad.canReadFruit = function() { //Can read fruits effects
	var $it0 = Main.heroes.iterator();
	while ($it0.hasNext()) {
		var st1 = $it0.next();
		if (st1.skills == null) {
			continue;
		}
		if (!st1.me) {
			continue;
		}
		var $it1 = st1.skills.iterator();
		while ($it1.hasNext()) {
			if (["botanic", "skilful"].indexOf($it1.next().img) != -1) {
				return true;
			}
		}
	}
	return false;
};

Main.AstroPad.getUserInfo = function() {
	return 'tid=' + $('#tid_openRight').attr('href').match(/[0-9]+/)[0] + '&hid=' + Main.AstroPad.heronames.indexOf(Main.AstroPad.getHname());
};

Main.AstroPad.getData = function() {
	var chk = Main.AstroPad.getCheck();
	var data = Main.AstroPad.getUserInfo();
	var gid = localStorage['ASTROPAD_' + Main.AstroPad.language + 'gid'];
	var gkey = localStorage['ASTROPAD_' + Main.AstroPad.language + 'gkey'];
	return data + '&gid=' + gid + '&gkey=' + gkey + '&chk=' + chk;
};

Main.AstroPad.selectTab = function(el) {
	if (el.getAttribute('data-tab') != undefined) {
		$("#astrotab").removeClass("tabon").addClass("taboff");
		$("#astrotab_content").css("display", "none");
		Main.AstroPad.fill("");
		return Main.selChat(el.getAttribute('data-tab'));
	}
	// Select tab
	$("#cdTabsChat li").removeClass("tabon").addClass("taboff");
	$("#astrotab").removeClass("taboff").addClass("tabon");

	// Display content
	$("#localChannel").css("display", "none");
	$("#mushChannel").css("display", "none");
	$(".objective").css("display", "none");
	$("#cdStdWall").css("display", "none");
	$("#cdFavWall").css("display", "none");
	$('#chatBlock > *').css('display', 'none');
	$("#privateform").css("display", "none");
	$("#wall").css("display", "none");
	$("#astrotab_content").css("display", "block");
	Main.AstroPad.getInventory();
};

Main.AstroPad.buildAstrotab = function() {
	if ($("#astrotab").length > 0) return;
	//astrotab
	var rbg = $("#chatBlock");
	$("<div>").addClass("cdAstroTab").attr("id", "astrotab_content").appendTo(rbg);
	$("#astrotab").attr("_title", "AstroPad").attr("_desc", "Affiche l'inventaire."); //TODO: langue

	var tabschat = $("#cdTabsChat");
	var tabs = $("<li>").addClass("tab taboff").attr("id", "astrotab").appendTo(tabschat);
	$("<img>").attr("src", "/img/icons/ui/pa_comp.png").appendTo(tabs);
	Main.AstroPad.fill("");
	$("#astrotab_content").css("display", "none");
	$("#astrotab_content").parent().css('height', '500px');
	$("#astrotab").on("mouseover", function() {
		Main.showTip((e || event).target, "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'> <h1>AstroPad</h1> <p>" + Main.AstroPad.txt.desc + "</p> </div></div></div></div>");
	});
	$("#astrotab").on("mouseout", function() { Main.hideTip(); });
	$("#cdTabsChat li").on("click", function() { Main.AstroPad.selectTab(this); });
};

Main.AstroPad.propertiesToText = function(idetail) {
	var attrs = '';
	var iname = '';
	var isConso = false; //Share properties to var conso?
	
	if (idetail.charges != null) {
		attrs += idetail.charges + ' ' + Main.AstroPad.txt.charges;
	}
	
	if (idetail.broken) {
		iname += ' ' + Main.AstroPad.txt.broken;
	}
	
	if (idetail.foodState != null) {
		switch (idetail.foodState) {
			case 'unstable':
				iname += ' ' + Main.AstroPad.txt.unstable;
				break;
			case 'hazardous':
				iname += ' ' + Main.AstroPad.txt.hazardous;
				break;
			case 'decaying':
				iname += ' ' + Main.AstroPad.txt.decaying;
				break;
		}
	}
	
	if (idetail.frozen) {
		iname += ' ' + Main.AstroPad.txt.frozen;
	}
	
	if (idetail.plantThirst != null) {
		switch (idetail.plantThirst) {
			case 'thirsty':
				iname += ' ' + Main.AstroPad.txt.thirsty;
				break;
			case 'dry':
				iname += ' ' + Main.AstroPad.txt.dry;
				break;
		}
	}
	
	if (idetail.plantIll) {
		iname += ' ' + Main.AstroPad.txt.diseased;
	}
	
	var props = idetail.foodProperties;
	if (props.length > 0) {
		isConso = true;
		for (var j = 0; j < props.length; j++) {
			if (attrs) {
				attrs += ", ";
			}
			var prop = props[j];

			function sign(n) {
				if (n > 0) {
					n = "+" + n;
				}
				return n;
			};
			
			if (prop.chances != undefined && prop.chances) {
				attrs += prop.chances + "% : ";
			}

			switch (prop.type) {
				case 'pa':
					attrs += sign(prop.value) + ":pa:";
					break;
				case 'pm':
					attrs += sign(prop.value) + ":pm:";
					break;
				case 'hp':
					attrs += sign(prop.value) + ":hp:";
					break;
				case 'moral':
					attrs += sign(prop.value) + ":moral:";
					break;
				case 'satisfaction':
					attrs += sign(prop.value) + ":pa_cook:";
					break;
				case 'cures':
					attrs += Main.AstroPad.txt.healsText + " " + prop.value;
					break;
				case 'provokes':
					break;
			}

			if (prop.delay != undefined && prop.delay) {
				attrs += ' (' + prop.delay + ' ' + Main.AstroPad.txt.cycles + ')';
			}
		}
	}

	return [iname, attrs, isConso];
};

Main.AstroPad.sendData = function() {
	var astromod = $('#astromod-popup');
	if (astromod.length) {
		astromod.css('display', 'none');
	}

	var data = Main.AstroPad.getData() + '&data=';
	var url = Main.AstroPad.urlAstro + "/addItems";
	var conso = '';
	if (Main.AstroPad.items.length) {
		for (var i = 0; i < Main.AstroPad.items.length; i++) {
			var item = Main.AstroPad.items[i];
			var iname = item.name;
			var idetail = item.attributes;
			var attrs = '';
			if (idetail) {
				var text = Main.AstroPad.propertiesToText(idetail);
				iname += text[0];
				attrs += text[1];
				if (text[2]) {
					conso += item.id + '|' + attrs + '§';
				}
			}
			data += encodeURIComponent(item.roomId + '|' + iname + '|' + item.id + '|' + item.amount + '|' + attrs + '|' + item.day + '§');
		}
		data = data.slice(0, -1); //Remove the last §
	}
	else {
		data += Main.AstroPad.getRoomId() + "||empty|0||";
	}

	data += "&conso=" + conso;
	console.log(url + '?' + data);

	GM_xmlhttpRequest({
		method: 'POST', url: url, data: data, headers: {'Content-type': 'application/x-www-form-urlencoded'},
		onload: function(responseDetails) {
			//console.log(responseDetails.responseText);
			Main.AstroPad.getInventory();
		}
	});
};

Main.AstroPad.addItem = function() {
	var popup = $('#astromod-popup');
	if (!popup.length) {
		popup = $('<div>').attr('id', 'astromod-popup').css({
			maxHeight: '400px', zIndex: '500', overflow: 'auto', padding: '10px',
			position: 'fixed', top: '50px',
			backgroundColor: 'navy', border: '2px solid black'
		}).appendTo(document.body);
	}
	popup.css('display', 'block');
	popup.html('');
	$('<h3>').css('text-align', 'center').text("Choix d'item :").appendTo(popup); //TODO: langue

	var list = $('<div>').css({ width: '100%' }).appendTo(popup);
	var cats = { //TODO: langue
		misc: ['talkie', 'Vrac'], tools: ['pa_eng', 'Outils'], weaponry: ['pa_shoot', 'Armes'], documents: ['book', 'Documents'],
		food: ['pa_cook', 'Nourriture'], plants: ['pa_garden', 'Plantes'], health: ['drugs', 'Santé'],
		expedition: ['planet', 'Expédition'], alien: ['artefact', 'Artefacts']
	};
	for (cat in cats) {
		//Icône
		var img = cats[cat][0];
		$('<div>').attr('data-astromod-cat', cat).css({
			display: 'inline-block', borderRight: '2px solid navy'
		}).html("<img src='http://" + Main.AstroPad.urlMush + "/img/icons/ui/" + img + ".png' />").appendTo(list).bind('click', function() {
			var c = $(this).attr('data-astromod-cat');
			$('#astromod-cat-name').text(cats[c][1]);
			$("#astromod-popup table").css('display', 'none');
			$('#astromod-table-' + c).css('display', 'table');
		});

		//Items
		var table = $('<table>').attr('id', 'astromod-table-' + cat).appendTo(popup);
		var tr = $('<tr>').appendTo(table);
		var p = 0;
		for (item in Main.AstroPad.allItems) {
			if (Main.AstroPad.allItems[item][0] != cat) { continue; }
			if (p % 2 == 0) {
				tr = $('<tr>').appendTo(table);
			}
			var code = item.replace('young_fruit_tree', 'fruit_tree');
			if (/blueprint/.test(code)) { code = 'blueprint'; }
			if (/book/.test(code)) { code = 'book'; }
			var td = $('<td>').css({ height: '50px', padding: '0', borderSpacing: '0' }).appendTo(tr);
			$('<img>').attr({
				src: "http://" + Main.AstroPad.urlMush + "/img/icons/items/" + code + ".jpg",
				'data-astromod-itemcode': item
			}).bind('click', function() {
				var code = $(this).attr('data-astromod-itemcode');
				var name = Main.AstroPad.allItems[code][Main.AstroPad.lang];
				if (/blueprint/.test(code)) { code = 'blueprint'; }
				if (/book/.test(code)) { code = 'book'; }
				code = code.replace('young_fruit_tree', 'fruit_tree');
				if (!name) { name = "Item"; } //TODO: langue
				Main.AstroPad.items.push({
					roomId: Main.AstroPad.getRoomId(),
					name: name,
					id: code,
					amount: 1,
					attributes: { charges: null, broken: false, foodState: null, frozen: false, plantThirst: null, plantIll: false, foodProperties: [] },
					day: 0
				});
				$('#astromod-popup').remove();
				Main.AstroPad.buildAstromod();
			}).appendTo(td);
			$('<td>').css({ borderSpacing: '0', padding: '0' }).text(Main.AstroPad.allItems[item][Main.AstroPad.lang]).appendTo(tr);
			p += 1;
		}
	}
	$('<span>').attr('id', 'astromod-cat-name').css('margin-left', '20px').text("Vrac").appendTo(list); //TODO: langue

	$("#astromod-popup table").css('display', 'none');
	$('#astromod-table-misc').css('display', 'table');
};

Main.AstroPad.changeItemProperties = function(id) {
	//
	Main.AstroPad.buildAstromod();
};

Main.AstroPad.buildAstromod = function() {
	var popup = $('#astromod-popup');
	if (!popup.length) {
		popup = $('<div>').attr('id', 'astromod-popup').css({
			maxHeight: '400px', zIndex: '500', overflow: 'auto', padding: '10px',
			position: 'fixed', top: '50px',
			backgroundColor: 'navy', border: '2px solid black'
		}).appendTo(document.body);
	}
	popup.css('display', 'block');
	popup.html('');

	var table = $('<table>').attr('id', 'astromod-table').appendTo(popup);
	if (Main.AstroPad.items.length) {
		//All items in Main.AstroPad.items
		for (var i = 0; i < Main.AstroPad.items.length; i++) {
			var item = Main.AstroPad.items[i];
			var properties = ['', ''];
			var name = item.name;
			if (item.attributes) {
				properties = Main.AstroPad.propertiesToText(item.attributes);
				name += properties[0];
				var attrs = properties[1];

				function toImg(text, exp, img, alt) {
					return text.replace(exp, "<img src='/img/icons/ui/" + img + ".png' alt='" + alt + "' title='" + alt + "' />");
				}

				name = toImg(name, Main.AstroPad.txt.thirsty, "plant_thirsty", Main.AstroPad.txt.thirsty);
				name = toImg(name, Main.AstroPad.txt.dry, "plant_dry", Main.AstroPad.txt.dry);
				name = toImg(name, Main.AstroPad.txt.diseased, "plant_diseased", Main.AstroPad.txt.diseased);
				name = toImg(name, Main.AstroPad.txt.broken, "broken", Main.AstroPad.txt.broken);
				name = toImg(name, Main.AstroPad.txt.frozen, "food_frozen", Main.AstroPad.txt.frozen);
				if (attrs) {
					attrs = toImg(attrs, /:pa:/g, 'pa_slot1', 'pa');
					attrs = toImg(attrs, /:moral:/g, 'moral', 'moral');
					attrs = toImg(attrs, /:pm:/g, 'pa_slot2', 'pm');
					attrs = toImg(attrs, /:hp:/g, 'lp', 'hp');
					attrs = toImg(attrs, Main.AstroPad.txt.satisfaction, 'pa_cook', Main.AstroPad.txt.satisfaction);
					attrs = toImg(attrs, /:pa_cook:/g, 'pa_cook', Main.AstroPad.txt.satisfaction);
					attrs = toImg(attrs, ' ' + Main.AstroPad.txt.charges, 'charge', Main.AstroPad.txt.charges);
					attrs = toImg(attrs, new RegExp(Main.AstroPad.txt.healsText, "g"), "pa_heal", 'heal');
				}
			}
			var tr = $('<tr>').attr('data-astromod-id', i).appendTo(table);
			//Image
			$('<img>').attr({
				src: "http://" + Main.AstroPad.urlMush + "/img/icons/items/" + item.id + ".jpg"
			}).appendTo($('<td>').css({
				width: '35px', height: '35px', borderSpacing: '0', padding: '0'
			}).appendTo(tr));
			//Name
			$('<b>').html(name).appendTo($('<td>').css({ textAlign: 'left', borderSpacing: '0', padding: '0' }).appendTo(tr));
			//Attributes
			$('<span>').html(attrs).bind('click', function() {
				Main.AstroPad.changeItemProperties($(this).closest('tr').attr('data-astromod-id'));
			}).appendTo($('<td>').css({ textAlign: 'left', borderSpacing: '0', padding: '0' }).appendTo(tr));
			//Amount
			$('<input>').attr({ type: 'number', value: item.amount, min: '1' }).css('color', 'black').bind('change', function() {
				Main.AstroPad.items[parseInt($(this).closest('tr').attr('data-astromod-id'))].amount = $(this).val();
			}).appendTo($('<td>').appendTo(tr));
			//Delete
			$('<div>').text("X").css({ fontSize: '20px', backgroundColor: 'red' }).bind('click', function() {
				Main.AstroPad.items.splice(parseInt($(this).closest('tr').attr('data-astromod-id')), 1);
				Main.AstroPad.buildAstromod();
			}).appendTo($('<td>').appendTo(tr));
		}
	}

	$('<div>').addClass('but').html("<div class='butright'><div class='butbg'>Ajouter un item</div></div>").css('margin-bottom', '10px').appendTo(popup).bind('click', function() { //TODO: langue
		Main.AstroPad.addItem();
	});

	$('<div>').addClass('but').html("<div class='butright'><div class='butbg'>Envoyer</div></div>").css('margin-bottom', '10px').appendTo(popup).bind('click', function() { //TODO: langue
		Main.AstroPad.sendData();
	});

	$('<div>').addClass('but').html("<div class='butright'><div class='butbg'>Annuler</div></div>").appendTo(popup).bind('click', function() { //TODO: langue
		$('#astromod-popup').css('display', 'none');
	});
};

Main.AstroPad.updateInventory = function() {
	var rid = Main.AstroPad.getRoomId();
	var conso = "";
	Main.AstroPad.items = [];

	var readMedicEffect = Main.AstroPad.canReadMedic();
	var readFoodEffect = Main.AstroPad.canReadFood();
	var readFruitEffect = Main.AstroPad.canReadFruit();
	var $it1 = Main.items.iterator();
	var inb_cam = 0;
	var inb_drone = 0;
	while ($it1.hasNext()) {
		$it = $it1.next();
		if ($it.iid == "CAMERA" && !document.querySelector('[serial="' + $it.serial + '"]')) { //S'il y a une caméra et que ce n'est pas un item
			inb_cam++;
		}
		if ($it.iid == "HELP_DRONE") {
			inb_drone++;
		}
	}
	if (inb_drone > 0) {
		Main.AstroPad.items.push({
			roomId: rid,
			name: Main.AstroPad.txt.drone,
			id: 'help_drone',
			amount: inb_drone,
			attributes: { charges: null, broken: false, foodState: null, frozen: false, plantThirst: null, plantIll: false, foodProperties: [] },
			day: 0
		});
	}
	if (inb_cam > 0) {
		Main.AstroPad.items.push({
			roomId: rid,
			name: Main.AstroPad.txt.camera,
			id: 'camera',
			amount: inb_cam,
			attributes: { charges: null, broken: false, foodState: null, frozen: false, plantThirst: null, plantIll: false, foodProperties: [] },
			day: 0
		});
	}
	var $it2 = Main.npc.iterator();
	var inb_cat = 0
	if ($it2.hasNext()) {
		Main.AstroPad.items.push({
			roomId: rid,
			name: "Schrödinger",
			id: 'body_cat',
			amount: 1,
			attributes: { charges: null, broken: false, foodState: null, frozen: false, plantThirst: null, plantIll: false, foodProperties: [] },
			day: 0
		});
	}

	var childs = $("#room").children(':not(.cdEmptySlot)');
	if (childs.size() > 0) {
		ok = 0;
		childs.each(function() {
			var li = $(this);
			var dataId = li.attr('data-id');
			var dataTip = li.attr('data-tip');
			var dataName = li.attr('data-name');
			var iimg = li.find("td").css('background-image').replace('url(', '').replace(/[)"]/g, '');
			var iid = iimg.replace('.jpg', '').replace(/\\/g, '/').replace(/.*\//, '');
			var iname = 'item';
			var idetail = { charges: null, broken: false, foodState: null, frozen: false, plantThirst: null, plantIll: false, foodProperties: [] };
			var desc = li.attr("data-desc");

			//Variable 'ok': 2 = peut lire et a confirmé le partage ; 1 = peut lire ; 0 = peut pas lire ; -1 = ? ; -2 = peut lire mais pas de partage
			if (desc.indexOf(Main.AstroPad.txt.effect) != -1 || desc.indexOf(Main.AstroPad.txt.effect2) != -1 ) {
				//TODO: À RÉÉCRIRE
				if (ok == 2 || ok == -2) {
				}
				if (desc.indexOf(Main.AstroPad.txt.chef) != -1 && readFoodEffect) {
					ok = 1;
				}
				if (desc.indexOf(Main.AstroPad.txt.chef) == -1 && readMedicEffect) {
					ok = 1;
				}
				if (desc.indexOf(Main.AstroPad.txt.botanist) != -1 && readFruitEffect) {
					ok = 1;
				}

				if (ok)
					if (confirm(Main.AstroPad.txt.updateEffect))
						ok = 2;
					else
						ok = -2;
				}
				if (ok > 0) {
					var lines = desc.split('<\p>');
					for (var i = 0; i < lines.length; i++) {
						var line = lines[i];
						var chances = null;
						var delay = null;
						if (/%/.exec(line)) { //Chances of the effect happening (if any)
							chances = parseInt(/[0-9]+\s*%/.exec(line)[0]);
							//TODO: enlever le "de chances :" (enlever tout ce qui est avant un : suivi d'une espace)
						}
						//TODO: delay
							
						if (/lp\.png/.exec(line)) {
							idetail.foodProperties.push({
								type: 'hp', chances: chances, delay: delay,
								value: parseInt(/(\+|-)[0-9]+/.exec(line)[0])
							});
						}
						else if (/moral\.png/.exec(line)) {
							idetail.foodProperties.push({
								type: 'moral', chances: chances, delay: delay,
								value: parseInt(/(\+|-)[0-9]+/.exec(line)[0])
							});
						}
						else if (/pa_slot1\.png/.exec(line)) {
							idetail.foodProperties.push({
								type: 'pa', chances: chances, delay: delay,
								value: parseInt(/(\+|-)[0-9]+/.exec(line)[0])
							});
						}
						else if (/pa_slot2\.png/.exec(line)) {
							idetail.foodProperties.push({
								type: 'pm', chances: chances, delay: delay,
								value: parseInt(/(\+|-)[0-9]+/.exec(line)[0])
							});
						}
						else if (new RegExp(Main.AstroPad.txt.satisfaction).exec(line)) {
							idetail.foodProperties.push({
								type: 'satisfaction', chances: chances, delay: delay,
								value: parseInt(/(\+|-)[0-9]+/.exec(line)[0])
							});
						}
						else if (new RegExp(Main.AstroPad.txt.healsTip).exec(line)) {
							idetail.foodProperties.push({
								type: 'cures', chances: chances, delay: delay,
								value: line.replace(/<\\?p>/g, '').replace(Main.AstroPad.txt.healsTip, '').trim()
							});
						}
						//TODO: MALADIE PROVOQUÉE
					}
				}

			if (dataName.indexOf('hidden.png') == -1) {
				var qte = li.children('.qty:first');
				
				iname = decodeURIComponent(/namey[0-9]+:(.+)g$/.exec(dataTip)[1]); //Pour avoir la compétence de l'apprenton

				var iserial = li.attr('serial');
				var inb;

				if (dataName.indexOf('food_frozen') != -1) {
					idetail.frozen = true;
				}
				if (readFoodEffect) {
					if (dataName.indexOf('food_unstable') != -1) {
						idetail.foodState = 'unstable';
					}
					if (dataName.indexOf('food_hazardous') != -1) {
						idetail.foodState = 'hazardous';
					}
					if (desc.indexOf('food_decaying') != -1) {
						idetail.foodState = 'decaying';
					}
				}
				if (dataName.indexOf('broken.png') != -1) {
					idetail.broken = true;
				}
				var icharge = />x([0-9]+)/.exec(dataName);
				if (icharge) {
					idetail.charges = parseInt(icharge[1]);
				}
				var n = parseInt(qte.text().trim());
				if (n) {
					inb = n;
				}
				else {
					inb = 1;
				}
				if (dataName.indexOf("thirsty") != -1) {
					idetail.plantThirst = 'thirsty';
				}
				else if (dataName.indexOf("dry") != -1) {
					idetail.plantThirst = 'dry';
				}
				if (dataName.indexOf("diseased") != -1) {
					idetail.plantIll = true;
				}

				Main.AstroPad.items.push({ roomId: rid, name: iname, id: iid, amount: inb, attributes: idetail, day: 0 });
			}
		});
	}

	if (confirm("Modifier les données ?")) { //TODO: langue
		Main.AstroPad.buildAstromod();
	}
	else {
		Main.AstroPad.sendData();
	}
};

Main.AstroPad.reset = function() {
	if (confirm(Main.AstroPad.txt.unlink.replace('%1', localStorage['ASTROPAD_' + Main.AstroPad.language + 'gid']))) {
		localStorage.removeItem('ASTROPAD_' + Main.AstroPad.language + 'gid');
		localStorage.removeItem('ASTROPAD_' + Main.AstroPad.language + 'gkey');
		Main.AstroPad.fill("");
	}
};

Main.AstroPad.configuration = function() {
	var gid = localStorage['ASTROPAD_' + Main.AstroPad.language + 'gid'];
	var gkey = localStorage['ASTROPAD_' + Main.AstroPad.language + 'gkey'];

	var url = "http://" + Main.AstroPad.urlMush + "/?astroId=" + gid + "&astroKey=" + gkey;
	var contenttxt = "<div class='cdMushLog  cdChatLine'>";
	contenttxt += "    <div class='bubble bubble2 tid_editorContent tid_parsed'>";
	contenttxt += "        <img src='/img/design/pixel.gif' class='char' style='background: url(http://imgup.motion-twin.com/twinoid/0/1/d9869944_14716.jpg) !important; height: 42px;'>";
	contenttxt += "        <div class='talks'>";
	contenttxt += "            <div class='triangleright'></div>";
	contenttxt += "            <span class='buddy'> Sunsky :</span>";
	contenttxt += "            <p>" + TXT_HELP_1 + "</p>";
	contenttxt += "            <div class='clear'></div>";
	contenttxt += "        </div>";
	contenttxt += "    </div>";
	contenttxt += "</div>";

	contenttxt += "<div class='cdMushLog  cdChatLine' style='max-width: 373px;'>";
	contenttxt += "    <div class='bubble  tid_editorContent tid_parsed'>";
	contenttxt += "        <img src='/img/design/pixel.gif' class='char' style='background: url(http://imgup.motion-twin.com/twinoid/6/7/4f22b23f_14716.jpg) !important; height: 42px;'>";
	contenttxt += "        <div class='talks'>";
	contenttxt += "            <div class='triangleleft'></div>";
	contenttxt += "            <span class='buddy'> Sunsky :</span>";
	contenttxt += "            <p style='font-size:10px'>";
	contenttxt += TXT_HELP_2;
	contenttxt += "//<a href='" + url + "'>" + url + "</a>//<br/> <br/>" + TXT_HELP_3 + ".";
	contenttxt += "            </p><div class='clear'></div>";
	contenttxt += "        </div>";
	contenttxt += "    </div>";
	contenttxt += "</div>";

	Main.AstroPad.fill(contenttxt);
};

Main.AstroPad.viewInventory = function() {
	var gid = localStorage['ASTROPAD_' + Main.AstroPad.language + 'gid'];
	var gkey = localStorage['ASTROPAD_' + Main.AstroPad.language + 'gkey'];
	var rkey = localStorage['ASTROPAD_' + Main.AstroPad.language + 'rkey'];
	if (!rkey) rkey = gkey;

	window.open("http://astropad.sunsky.fr/?gid=" + gid + "&rkey=" + rkey + "&language=" + Main.AstroPad.language, '_blank');
};

Main.AstroPad.new = function() {
	var url = Main.AstroPad.urlAstro + "/newInv";
	var data = "api=1";
	console.log(url + '?' + data);
	GM_xmlhttpRequest({
		method: 'GET',
		url: url + "?" + data,
		onload: function(responseDetails) {
			var res = responseDetails.responseText.replace(/\n/g, '').replace(/\r/g, '').split('|');
			if (res.length != 2) {
				return;
			}
			var gid = res[0];
			var gkey = res[1];
			if (confirm(Main.AstroPad.txt.link.replace('%1', gid).replace('%2', gkey))) {
				localStorage['ASTROPAD_' + Main.AstroPad.language + 'gid'] = gid;
				localStorage['ASTROPAD_' + Main.AstroPad.language + 'gkey'] = gkey;
				Main.AstroPad.getInventory();
			}
		}
	});
};

Main.AstroPad.getInventory = function() {
	if (!localStorage['ASTROPAD_' + Main.AstroPad.language + 'gid'] || !localStorage['ASTROPAD_' + Main.AstroPad.language + 'gkey']) {
		return;
	}
	var url = Main.AstroPad.urlAstro + "/getItems";
	var text = "";
	var data = Main.AstroPad.getData();

	console.log(url + '?' + data);
	GM_xmlhttpRequest({
		method: 'GET',
		url: url + "?" + data,
		onload: function(responseDetails) {
			var res = responseDetails.responseText;
			//console.log(res);
			var contenttxt = "";
			var rooms = res.split('#');
			var infos = rooms[0].split('|');

			localStorage['ASTROPAD_' + Main.AstroPad.language + 'rkey'] = infos[0];
			for (var j = 1; j < rooms.length; j++) {
				var its = rooms[j].split('\n');
				var roomid = parseInt(its[0]);
				contenttxt += "<div class='astro_rid_" + roomid + "' id='astro_rid_" + roomid + "'><b>" + Main.AstroPad.roomNames[roomid] + "</b></div>";
				if (its.length > 2)
					contenttxt += "<div class='what_happened'><table class='table' >";
				for(var i = 1; i < its.length - 1; i++) {
					try{
					var parts = its[i].split('|');
					var iname = parts[0];
					var iid = parts[1];
					var date = parts[6];
					var heroid = parts[7];
					if (heroid == -1) {
						heroid = Main.AstroPad.heronames.length - 1;
					}
					iname = Main.AstroPad.capitalize(iname);
					var footer = Main.AstroPad.txt.by + " " + Main.AstroPad.heronames[heroid] + "<br>" + Main.AstroPad.txt.the + " " + date.substring(6, 8) + " " + Main.AstroPad.txt.at + " " + date.substring(8, 10) + ":" + date.substring(10, 12);
					if (iid == "empty") {
						contenttxt += "<tr><td style='width: 35px; height: 35px; border-spacing: 0; padding: 0;'>" + Main.AstroPad.txt.empty + "</td><td style='text-align: left; border-spacing: 0; padding: 0;'></td>";
						contenttxt += "<td style='font-size: 10px; text-align: right; vertical-align: bottom; width: 75px;'>" + footer + '</td></tr>';
						continue;
					}
					var iimg = "<img src='http://" + Main.AstroPad.urlMush + "/img/icons/items/" + iid + ".jpg' style='height: 35px; width: 35px;' />";

					var inb = parts[2];
					if (parts[4]) {
						var idetail = parts[4];
					}
					else {
						var idetail = parts[3];
					}

					function toImg(text, exp, img, alt) {
						return text.replace(exp, "<img src='/img/icons/ui/" + img + ".png' alt='" + alt + "' title='" + alt + "' />");
					}

					iname = toImg(iname, Main.AstroPad.capitalize(Main.AstroPad.txt.thirsty), "plant_thirsty", Main.AstroPad.txt.thirsty);
					iname = toImg(iname, Main.AstroPad.capitalize(Main.AstroPad.txt.dry), "plant_dry", Main.AstroPad.txt.dry);
					iname = toImg(iname, Main.AstroPad.capitalize(Main.AstroPad.txt.diseased), "plant_diseased", Main.AstroPad.txt.diseased);
					iname = toImg(iname, Main.AstroPad.capitalize(Main.AstroPad.txt.broken), "broken", Main.AstroPad.txt.broken);
					iname = toImg(iname, Main.AstroPad.txt.frozen, "food_frozen", Main.AstroPad.txt.frozen);
					if (idetail) {
						idetail = toImg(idetail, /:pa:/g, 'pa_slot1', 'pa');
						idetail = toImg(idetail, /:moral:/g, 'moral', 'moral');
						idetail = toImg(idetail, /:pm:/g, 'pa_slot2', 'pm');
						idetail = toImg(idetail, /:hp:/g, 'lp', 'hp');
						idetail = toImg(idetail, Main.AstroPad.txt.satisfaction, 'pa_cook', Main.AstroPad.txt.satisfaction);
						idetail = toImg(idetail, /:pa_cook:/g, 'pa_cook', Main.AstroPad.txt.satisfaction);
						idetail = toImg(idetail, ' ' + Main.AstroPad.txt.charges, 'charge', Main.AstroPad.txt.charges);
						idetail = toImg(idetail, new RegExp(Main.AstroPad.txt.healsText, "g"), "pa_heal", 'heal');
						idetail = " : <i>" + idetail + "</i>";
					}
					if (inb != "1") {
						inb = " (x" + inb + ")";
					}
					else {
						inb="";
					}

					contenttxt += "<tr><td style='width: 35px; height: 35px; border-spacing: 0; padding: 0;'>" + iimg + "</td><td style='text-align: left; border-spacing: 0; padding: 0;'><b>" + iname + inb + "</b>" + idetail + "</td>";
					contenttxt += "<td style='font-size: 10px; text-align: right; vertical-align: bottom; width: 75px;'>" + footer + '</td></tr>';
					}catch(e){console.log(e);}
				}
				contenttxt += "</table></div>";
			}
			Main.AstroPad.fill(contenttxt, "#astro_rid_" + Main.AstroPad.getRoomId());
		}
	});
};

Main.AstroPad.getInventoryTxt = function() {
	if (!localStorage['ASTROPAD_' + Main.AstroPad.language + 'gid'] || !localStorage['ASTROPAD_' + Main.AstroPad.language + 'gkey']) {
		return;
	}
	var url = Main.AstroPad.urlAstro + "/getItems";
	var text = "";
	var data = Main.AstroPad.getData();

	console.log(url + '?' + data);
	GM_xmlhttpRequest({
		method: 'GET',
		url: url + "?" + data,
		onload: function(responseDetails) {
			try{
			var res = responseDetails.responseText;
			var contenttxt = "**//" + Main.AstroPad.txt.inventory + "//**\n";
			var rooms = res.split('#');
			var rkey = rooms[0];
			localStorage['ASTROPAD_' + Main.AstroPad.language + 'rkey'] = rkey;
			for (var j = 1; j < rooms.length; j++) {
				var its = rooms[j].split('\n');
				var roomid = parseInt(its[0]);
				contenttxt += "- **" + Main.AstroPad.roomNames[roomid] + "**";
				for (var i = 1; i < its.length - 1; i++) {
					var parts = its[i].split('|');
					var iname = parts[0];
					var iid = parts[1];
					var date = parts[6];
					var heroid = parts[7];
					var iname = Main.AstroPad.capitalize(iname);
					if (i == 1) {
						contenttxt += " [" + Main.AstroPad.heronames[heroid] + ", " + date.substring(6, 8) + "." + date.substring(4, 6) + " " + date.substring(8, 10) + ":" + date.substring(10, 12) + "] : ";
					}
					if (iid == "empty") {
						contenttxt += Main.AstroPad.txt.empty + ".\n";
						continue;
					}
					var inb = parts[2];
					var idetail = parts[4];

					if (idetail) {
						idetail = idetail.replace(Main.AstroPad.txt.satisfaction, ":pa_cook:");
						idetail = idetail.replace(new RegExp(Main.AstroPad.txt.healsText, "g"), ":pa_heal:");
					}
					if (inb != "1") {
						inb = " (x" + inb + ")";
					}
					else {
						inb = "";
					}
					contenttxt += iname + inb;
					if (idetail) {
						contenttxt += " //" + idetail + " //";
					}
					contenttxt += ", ";
				}
				contenttxt = contenttxt.slice(0, -2) + ".\n";
			}
			Main.AstroPad.fill("<textarea style='font-size: 8pt; color: black; width: 100%; height: 100%;'>" + contenttxt + "</textarea>");
			}catch(e){console.log(e);}
		}
	});
};

Main.AstroPad.fill = function(content, gotoelemid) {
	var gid = localStorage['ASTROPAD_' + Main.AstroPad.language + 'gid'];
	var tab = $("#astrotab_content").empty();

	if (localStorage['ASTROPAD_' + Main.AstroPad.language + 'gid'] && localStorage['ASTROPAD_' + Main.AstroPad.language + 'gkey']) {
		var header = "<div class='objtitle'><img src='/img/icons/ui/pa_comp.png'> AstroPad (n°" + gid + ") <img src='/img/icons/ui/pa_comp.png'></div> &nbsp;<div class='replybuttons'>";
		header += " <a class='butmini' href='#' id='astro_maj_inventaire' ><img src='/img/icons/ui/projects_done.png'>" + Main.AstroPad.txt.submit + "</a>";
		header += " <a class='butmini' href='#' id='astro_get_inventaire' ><img src='http://twinoid.com/img/icons/refresh.png' title='" + Main.AstroPad.txt.refresh + "'></a>";
		header += " <a class='butmini' href='#' id='astro_get_inventaire_txt' ><img src='http://www.twinpedia.com/_media/hordes/objets/item_rp_manual.gif' title='" + Main.AstroPad.txt.list + "'></a>";
		header += " <a class='butmini' href='#' id='astro_view_inventaire' ><img src='http://www.hordes.fr/gfx/forum/smiley/h_exploration.gif'>" + Main.AstroPad.txt.show + "</a>";
		header += " <a class='butmini' href='#' id='astro_configuration' ><img src='/img/icons/ui/guide.png'>" + Main.AstroPad.txt.help + "</a>";
		header += " <a class='butmini' href='#' id='astro_new' ><img src='/img/icons/ui/recent.png'>" + Main.AstroPad.txt.new + "</a>";
		header += " <a class='butmini' href='#' id='astro_reset' ><img src='/img/icons/ui/close.png' title='" + Main.AstroPad.txt.exit + "'></a>";
	} else {
		var header = "<div class='objtitle'><img src='/img/icons/ui/pa_comp.png'> AstroPad<img src='/img/icons/ui/pa_comp.png'></div> &nbsp;<div class='replybuttons'>";
		header += " <a class='butmini' href='#' id='astro_new' ><img src='/img/icons/ui/recent.png'>" + Main.AstroPad.txt.new + "</a>";
	}
	header += "</div>";
	$("<div>").html(header + "<br><div id='astro_scrollpanel' class='astro_scrollpanel' style='height: 400px;'>" + content + "</div>").css("color", "rgb(9, 10, 97)").appendTo(tab);
	$('#astro_get_inventaire').bind('click', Main.AstroPad.getInventory);
	$('#astro_get_inventaire_txt').bind('click', Main.AstroPad.getInventoryTxt);
	$('#astro_view_inventaire').bind('click', Main.AstroPad.viewInventory);
	$('#astro_maj_inventaire').bind('click', Main.AstroPad.updateInventory);
	$('#astro_configuration').bind('click', Main.AstroPad.configuration);
	$('#astro_reset').bind('click', Main.AstroPad.reset);
	$('#astro_new').bind('click', Main.AstroPad.new);
	$('#astrotab_content').find('.replybuttons a').each(function(){
		$(this).on('click',function(e){
			e.preventDefault();
		});
	});

	if (gotoelemid){
		var scroll = $("#astro_scrollpanel");
		var room = $(gotoelemid);
		//room=$("#astro_maj_inventaire");
		room.css("display", "block");
		if (room.offset()) {
			scroll.scrollTop(scroll.scrollTop() + room.offset().top-scroll.offset().top);
		}
	}
};

Main.AstroPad.startScript = function() {
	var gid = /astroId=([0123456789]*)/g.exec(window.location.href);
	var gkey = /astroKey=([0123456789abcdef]*)/g.exec(window.location.href);

	if (gid && gkey) {
		gid = gid[1];
		gkey = gkey[1];
		if (confirm(Main.AstroPad.txt.link.replace('%1', gid).replace('%2', gkey))) {
			localStorage['ASTROPAD_' + Main.AstroPad.language + 'gid'] = gid;
			localStorage['ASTROPAD_' + Main.AstroPad.language + 'gkey'] = gkey;
		}
	}

	if($("#input").length == 0) {
		return;
	}
	console.log('Start AstroPad');

	var currentDate = new Date();

	Main.AstroPad.buildAstrotab();
	var now = $("#input").attr('now');
	setInterval(function() {
		var gameNow = $("#input").attr('now');
		if(gameNow != now) {
			now = gameNow;
		}
		Main.AstroPad.buildAstrotab();
	}, 1000);

	/*$('.talks p').each(function() {
		text = replaceURLWithHTMLLinks($(this).text())
		$(this).html(text);
	});
	 $('.bubble p').each(function() {
		text = replaceURLWithHTMLLinks($(this).html())
		$(this).html(text);
	});*/
};

Main.AstroPad.startScript();