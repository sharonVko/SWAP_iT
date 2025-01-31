//tags to use for creating an ad
const tags = [

  //condition tag (required!)
  { tag_id: 1, name: "Zustand", parent: 0 },
  { tag_id: 2, name: "Neu", parent: 1 },
  { tag_id: 3, name: "So gut wie neu", parent: 1 },
  { tag_id: 4, name: "Gebrauchsspuren", parent: 1 },
  { tag_id: 5, name: "Defekt", parent: 1 },

  //material tag
  { tag_id: 9, name: "Material", parent: 0 },
  { tag_id: 10, name: "Holz", parent: 9 },
  { tag_id: 11, name: "Metall", parent: 9 },
  { tag_id: 12, name: "Stein", parent: 9 },
  { tag_id: 13, name: "Glas", parent: 9 },
  { tag_id: 14, name: "Porzellan", parent: 9 },
  { tag_id: 15, name: "Kunststoff", parent: 9 },
  { tag_id: 16, name: "Gummi", parent: 9 },
  { tag_id: 17, name: "Bronze", parent: 9 },
  { tag_id: 18, name: "Silber", parent: 9 },
  { tag_id: 19, name: "Gold", parent: 9 },
  { tag_id: 20, name: "Gewebe", parent: 9 },
  { tag_id: 21, name: "Wolle", parent: 9 },
  { tag_id: 22, name: "Synthetik", parent: 9 },
  { tag_id: 23, name: "Leder", parent: 9 },

  //color tag
  { tag_id: 25, name: "Farbe", parent: 0 },
  { tag_id: 26, name: "schwarz", parent: 25 },
  { tag_id: 27, name: "weiß", parent: 25 },
  { tag_id: 28, name: "beige", parent: 25 },
  { tag_id: 29, name: "grau", parent: 25 },
  { tag_id: 30, name: "braun", parent: 25 },
  { tag_id: 31, name: "blau", parent: 25 },
  { tag_id: 32, name: "grün", parent: 25 },
  { tag_id: 33, name: "gelb", parent: 25 },
  { tag_id: 34, name: "rot", parent: 25 },
  { tag_id: 35, name: "rosa", parent: 25 },
  { tag_id: 36, name: "lila", parent: 25 },
  { tag_id: 37, name: "silber", parent: 25 },
  { tag_id: 38, name: "gold", parent: 25 },
	{ tag_id: 381, name: "orange", parent: 25 },

  //random description tags (not usable for description field)
  { tag_id: 39, name: "Diverse", parent: 0 },
  { tag_id: 40, name: "Klassiker", parent: 39 },
  { tag_id: 41, name: "Rarität", parent: 39 },
  { tag_id: 42, name: "Vintage", parent: 39 },
  { tag_id: 43, name: "Modern", parent: 39 },
  { tag_id: 44, name: "neon", parent: 39 },
  { tag_id: 45, name: "pastell", parent: 39 },
  { tag_id: 46, name: "hell", parent: 39 },
  { tag_id: 47, name: "dunkel", parent: 39 },
  { tag_id: 48, name: "lackiert", parent: 39 },
  { tag_id: 49, name: "unbehandelt", parent: 39 },
  { tag_id: 50, name: "natürlich", parent: 39 },
  { tag_id: 51, name: "leicht", parent: 39 },
  { tag_id: 52, name: "schwer", parent: 39 },
  { tag_id: 53, name: "hart", parent: 39 },
  { tag_id: 54, name: "robust", parent: 39 },
  { tag_id: 55, name: "handgearbeitet", parent: 39 },
  { tag_id: 56, name: "einzigartig", parent: 39 },
  { tag_id: 57, name: "außergewöhnlich", parent: 39 },
  { tag_id: 58, name: "Standard", parent: 39 },
  { tag_id: 59, name: "gemustert", parent: 39 },
  { tag_id: 60, name: "unvollständig", parent: 39 },
  { tag_id: 61, name: "für Bastler", parent: 39 },
  { tag_id: 62, name: "hochwertig", parent: 39 },
];

const suggestions_tags = tags.filter(item => item.parent !== 0).map(itm => ({
	value: itm.tag_id,
  label: itm.name,
}));


export { tags, suggestions_tags };
