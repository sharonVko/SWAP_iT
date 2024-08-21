const cats = [
  'Elektronik',
  'Möbel',
  'Kleidung',
  'Bücher',
  'Sportgeräte',
  'Werkzeuge',
  'Spielzeug',
  'Kunst',
  'Musikinstrumente',
  'Haushaltsgeräte',
  'Gartenbedarf',
  'Fahrzeuge',
  'Dekoration',
  'Computer und Zubehör',
  'Handys und Zubehör',
  'Filme und Serien',
  'Videospiele und Konsolen',
  'Schmuck',
  'Beauty und Gesundheit',
  'Bürobedarf',
];
const tags = [
	"Neu",
	"So gut wie neu",
	"Gebrauchsspuren",
	"Defekt",
	"Holz",
	"Metall",
	"Stein",
	"Glas",
	"Porzellan",
	"Kunststoff",
	"Gummi",
	"Bronze",
	"Silber",
	"Gold",
	"Gewebe",
	"Wolle",
	"Synthetik",
	"Leder",
	"schwarz",
	"weiß",
	"beige",
	"grau",
	"braun",
	"blau",
	"grün",
	"gelb",
	"rot",
	"rosa",
	"lila",
	"silber",
	"gold",
	"Klassiker",
	"Rarität",
	"Vintage",
	"Modern",
	"neon",
	"pastell",
	"hell",
	"dunkel",
	"lackiert",
	"unbehandelt",
	"natürlich",
	"leicht",
	"schwer",
	"hart",
	"robust",
	"handgearbeitet",
	"einzigartig",
	"außergewöhnlich",
	"Standard",
	"gemustert",
	"unvollständig",
	"für Bastler",
	"hochwertig"
]
const subcats = [
	"Smartphones",
	"Tablets",
	"Laptops",
	"Fernseher",
	"Audio-Geräte",
	"Kameras",
	"Haushaltsgeräte",
	"Möbel",
	"Sofas",
	"Tische",
	"Stühle",
	"Betten",
	"Schränke",
	"Regale",
	"Damenbekleidung",
	"Herrenbekleidung",
	"Kinderbekleidung",
	"Schuhe",
	"Taschen",
	"Schmuck",
	"Uhren",
	"Bücher",
	"DVDs",
	"CDs",
	"Vinyl-Schallplatten",
	"Hörbücher",
	"Kinderspielzeug",
	"Brettspiele",
	"Videospiele",
	"Puzzles",
	"Sammlerstücke",
	"Sportgeräte",
	"Outdoor-Ausrüstung",
	"Fahrräder",
	"Campingausrüstung",
	"Fitnessgeräte",
	"Gartengeräte",
	"Pflanzen",
	"Heimwerkerbedarf",
	"Küchenutensilien",
	"Deko-Artikel",
	"Babymöbel",
	"Kinderwagen",
	"Babykleidung",
	"Spielzeug für Babys",
	"Sicherheitsausstattung",
	"Autos",
	"Motorräder",
	"Fahrräder",
	"Roller",
	"Ersatzteile und Zubehör",
	"Schmuckstücke",
	"Uhren",
	"Kosmetikprodukte",
	"Parfüms",
	"Haustierbedarf",
	"Zubehör",
	"Futter",
	"Käfige und Aquarien",
	"Bürobedarf",
	"Bürogeräte",
	"Schreibwaren",
	"Büromöbel",
	"Antiquitäten",
	"Münzen",
	"Briefmarken",
	"Kunstwerke",
	"Selbstgefertigtes",
	"Utensilien"
];

const suggestions_cats = cats.map((name, index) => ({
  value: index,
  label: name,
}));

const suggestions_subcats = subcats.map((name, index) => ({
	value: index,
	label: name,
}));

const suggestions_tags = tags.map((name, index) => ({
	value: index,
	label: name,
}));

export { cats, subcats, tags, suggestions_cats, suggestions_subcats, suggestions_tags };
