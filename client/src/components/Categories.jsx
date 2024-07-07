const categories = [
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

const suggestions = categories.map((name, index) => ({
  value: index,
  label: name,
}));

export { categories, suggestions };
