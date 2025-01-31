const categories = [
  { cat_id: 1, name: "Elektronik", parent: 0 },
  { cat_id: 2, name: "Smartphones", parent: 1 },
  { cat_id: 3, name: "Tablets", parent: 1 },
  { cat_id: 4, name: "Laptops", parent: 1 },
  { cat_id: 5, name: "Fernseher", parent: 1 },
  { cat_id: 6, name: "Audio-Geräte", parent: 1 },
  { cat_id: 7, name: "Kameras", parent: 1 },
  { cat_id: 8, name: "Haushaltsgeräte", parent: 1 },
  { cat_id: 9, name: "Möbel", parent: 0 },
  { cat_id: 10, name: "Sofas", parent: 9 },
  { cat_id: 11, name: "Tische", parent: 9 },
  { cat_id: 12, name: "Stühle", parent: 9 },
  { cat_id: 13, name: "Betten", parent: 9 },
  { cat_id: 14, name: "Schränke", parent: 9 },
  { cat_id: 15, name: "Regale", parent: 9 },
  { cat_id: 16, name: "Kleidung und Accessoires", parent: 0 },
  { cat_id: 17, name: "Damenbekleidung", parent: 16 },
  { cat_id: 18, name: "Herrenbekleidung", parent: 16 },
  { cat_id: 19, name: "Kinderbekleidung", parent: 16 },
  { cat_id: 20, name: "Schuhe", parent: 16 },
  { cat_id: 21, name: "Taschen", parent: 16 },
  { cat_id: 22, name: "Schmuck", parent: 16 },
  { cat_id: 23, name: "Uhren", parent: 16 },
  { cat_id: 24, name: "Bücher, Filme und Musik", parent: 0 },
  { cat_id: 25, name: "Bücher", parent: 24 },
  { cat_id: 26, name: "DVDs", parent: 24 },
  { cat_id: 27, name: "CDs", parent: 24 },
  { cat_id: 28, name: "Vinyl-Schallplatten", parent: 24 },
  { cat_id: 29, name: "Hörbücher", parent: 24 },
  { cat_id: 30, name: "Spielzeug und Spiele", parent: 0 },
  { cat_id: 31, name: "Kinderspielzeug", parent: 30 },
  { cat_id: 32, name: "Brettspiele", parent: 30 },
  { cat_id: 33, name: "Videospiele", parent: 30 },
  { cat_id: 34, name: "Puzzles", parent: 30 },
  { cat_id: 35, name: "Sammlerstücke", parent: 30 },
  { cat_id: 36, name: "Sport und Freizeit", parent: 0 },
  { cat_id: 37, name: "Sportgeräte", parent: 36 },
  { cat_id: 38, name: "Outdoor-Ausrüstung", parent: 36 },
  { cat_id: 39, name: "Fahrräder", parent: 36 },
  { cat_id: 40, name: "Campingausrüstung", parent: 36 },
  { cat_id: 41, name: "Fitnessgeräte", parent: 36 },
  { cat_id: 42, name: "Haus und Garten", parent: 0 },
  { cat_id: 43, name: "Gartengeräte", parent: 42 },
  { cat_id: 44, name: "Pflanzen", parent: 42 },
  { cat_id: 45, name: "Heimwerkerbedarf", parent: 42 },
  { cat_id: 46, name: "Küchenutensilien", parent: 42 },
  { cat_id: 47, name: "Deko-Artikel", parent: 42 },
  { cat_id: 48, name: "Baby und Kind", parent: 0 },
  { cat_id: 49, name: "Babymöbel", parent: 48 },
  { cat_id: 50, name: "Kinderwagen", parent: 48 },
  { cat_id: 51, name: "Babykleidung", parent: 48 },
  { cat_id: 52, name: "Spielzeug für Babys", parent: 48 },
  { cat_id: 53, name: "Sicherheitsausstattung", parent: 48 },
  { cat_id: 54, name: "Fahrzeuge", parent: 0 },
  { cat_id: 55, name: "Autos", parent: 54 },
  { cat_id: 56, name: "Motorräder", parent: 54 },
  { cat_id: 57, name: "Fahrräder", parent: 54 },
  { cat_id: 58, name: "Roller", parent: 54 },
  { cat_id: 59, name: "Ersatzteile und Zubehör", parent: 54 },
  { cat_id: 60, name: "Schmuck und Kosmetik", parent: 0 },
  { cat_id: 61, name: "Schmuckstücke", parent: 60 },
  { cat_id: 62, name: "Uhren", parent: 60 },
  { cat_id: 63, name: "Kosmetikprodukte", parent: 60 },
  { cat_id: 64, name: "Parfüms", parent: 60 },
  { cat_id: 65, name: "Haustiere", parent: 0 },
  { cat_id: 66, name: "Haustierbedarf", parent: 65 },
  { cat_id: 67, name: "Zubehör", parent: 65 },
  { cat_id: 68, name: "Futter", parent: 65 },
  { cat_id: 69, name: "Käfige und Aquarien", parent: 65 },
  { cat_id: 70, name: "Bürobedarf", parent: 0 },
  { cat_id: 71, name: "Bürogeräte", parent: 70 },
  { cat_id: 72, name: "Schreibwaren", parent: 70 },
  { cat_id: 73, name: "Büromöbel", parent: 70 },
  { cat_id: 74, name: "Sammlerstücke", parent: 0 },
  { cat_id: 75, name: "Antiquitäten", parent: 74 },
  { cat_id: 76, name: "Münzen", parent: 74 },
  { cat_id: 77, name: "Briefmarken", parent: 74 },
  { cat_id: 78, name: "Kunstwerke", parent: 74 },
  { cat_id: 79, name: "Modelle", parent: 74 },
  { cat_id: 80, name: "Sonstiges", parent: 1 }, // Elektronik > Sonstiges
  { cat_id: 81, name: "Sonstiges", parent: 9 }, // Möbel > Sonstiges
  { cat_id: 82, name: "Sonstiges", parent: 16 }, // Kleidung und Accessoires > Sonstiges
  { cat_id: 83, name: "Sonstiges", parent: 24 }, // Bücher, Filme und Musik > Sonstiges
  { cat_id: 84, name: "Sonstiges", parent: 30 }, // Spielzeug und Spiele > Sonstiges
  { cat_id: 85, name: "Sonstiges", parent: 36 }, // Sport und Freizeit > Sonstiges
  { cat_id: 86, name: "Sonstiges", parent: 42 }, // Haus und Garten > Sonstiges
  { cat_id: 87, name: "Sonstiges", parent: 48 }, // Baby und Kind > Sonstiges
  { cat_id: 88, name: "Sonstiges", parent: 54 }, // Fahrzeuge > Sonstiges
  { cat_id: 89, name: "Sonstiges", parent: 60 }, // Schmuck und Kosmetik > Sonstiges
  { cat_id: 90, name: "Sonstiges", parent: 65 }, // Haustiere > Sonstiges
  { cat_id: 91, name: "Sonstiges", parent: 70 }, // Bürobedarf > Sonstiges
  { cat_id: 92, name: "Sonstiges", parent: 74 }, // Sammlerstücke > Sonstiges
  { cat_id: 93, name: "Kunst & Basteln", parent: 0 },
  { cat_id: 94, name: "Selbstgefertigtes", parent: 93 },
  { cat_id: 95, name: "Utensilien", parent: 93 },
];

const suggestions_cats = categories.filter(item => item.parent === 0).map(itm => ({
	value: itm.cat_id,
	label: itm.name,
}));

const suggestions_subcats = categories.filter(item => item.parent !== 0).map(itm => ({
	value: itm.cat_id,
	label: itm.name,
}));

export { categories, suggestions_cats, suggestions_subcats };
