const locations = [
  {
    id: 1,
    name: "MAURITANIA",
    type: "state",
    location: { x: 148.5, y: 97.5 },
    conections: [2, 5, 7],
  },
  {
    id: 2,
    name: "HISPANIA ULTERIOR",
    type: "state",
    location: { x: 197.5, y: 73.5 },
    conections: [1, 3],
  },
  {
    id: 3,
    name: "HISPANIA CITERIOR",
    type: "state",
    location: { x: 259.5, y: 43.5 },
    conections: [2, 4],
  },
  {
    id: 4,
    name: "GALLIA",
    type: "state",
    location: { x: 337.5, y: 111.5 },
    conections: [3, 5, 6],
  },
  {
    id: 5,
    name: "SARDINIA",
    type: "state",
    location: { x: 233.5, y: 141.5 },
    conections: [1, 4, 8, 9],
  },
  {
    id: 6,
    name: "GALLIA CISALPINA",
    type: "state",
    location: { x: 337.5, y: 186.5 },
    conections: [4, 9, 10],
  },
  {
    id: 7,
    name: "NUMIDIA",
    type: "state",
    location: { x: 100.5, y: 186.5 },
    type: "state",
    conections: [1, 8, 13],
  },
  {
    id: 8,
    name: "SICILIA",
    type: "state",
    location: { x: 171.5, y: 221.5 },
    conections: [5, 7, 9, 13],
  },
  {
    id: 9,
    name: "ITALIA",
    type: "state",
    location: { x: 252.5, y: 249.5 },
    conections: [5, 6, 8, 10, 11, 12],
  },
  {
    id: 10,
    name: "DALMATIA",
    type: "state",
    location: { x: 337.5, y: 261.5 },
    conections: [6, 9, 11],
  },
  {
    id: 11,
    name: "MACEDONIA",
    type: "state",
    location: { x: 278.5, y: 344.5 },
    conections: [9, 10, 12],
  },
  {
    id: 12,
    name: "ACHAIA",
    type: "state",
    location: { x: 192.5, y: 305.5 },
    conections: [9, 11, 13, 15],
  },
  {
    id: 13,
    name: "AFRICA",
    type: "state",
    location: { x: 91.5, y: 266.5 },
    conections: [7, 8, 12, 14],
  },
  {
    id: 14,
    name: "CYRENE",
    type: "state",
    location: { x: 59.5, y: 333.5 },
    conections: [13, 15, 16],
  },
  {
    id: 15,
    name: "CRETA",
    type: "state",
    location: { x: 155.5, y: 359.5 },
    conections: [12, 14, 16, 17],
  },
  {
    id: 16,
    name: "AEGYPTUS",
    type: "state",
    location: { x: 95.5, y: 420.5 },
    conections: [14, 15, 17, 18],
  },
  {
    id: 17,
    name: "ASIA",
    type: "state",
    location: { x: 236.5, y: 463.5 },
    conections: [15, 16, 18],
  },
  {
    id: 18,
    name: "SYRIA",
    type: "state",
    location: { x: 75.5, y: 492.5 },
    conections: [16, 17],
  },
  {
    id: 101,
    type: "border",
    unit: "sea",
    conections: [1, 2],
    rotation: 255,
    location: { x: 172.5, y: 52 },
  },
  {
    id: 102,
    type: "border",
    unit: "sea",
    conections: [1, 5],
    rotation: 265,
    location: { x: 188, y: 134 },
  },
  {
    id: 103,
    type: "border",
    unit: "land",
    conections: [1, 7],
    rotation: 51,
    location: { x: 134.5, y: 162 },
  },
  {
    id: 104,
    type: "border",
    unit: "shield",
    conections: [2, 3],
    rotation: 223,
    location: { x: 226, y: 62 },
  },
  {
    id: 105,
    type: "border",
    unit: "land",
    conections: [3, 4],
    rotation: 330,
    location: { x: 315, y: 81 },
  },
  {
    id: 106,
    type: "border",
    unit: "shield",
    conections: [4, 5],
    rotation: 73,
    location: { x: 292, y: 131 },
  },
  {
    id: 107,
    type: "border",
    unit: "land",
    conections: [4, 6],
    rotation: 341,
    location: { x: 354.5, y: 160 },
  },
  {
    id: 108,
    type: "border",
    unit: "sea",
    conections: [5, 8],
    rotation: 38,
    location: { x: 212.5, y: 195 },
  },
  {
    id: 109,
    type: "border",
    unit: "shield",
    conections: [5, 9],
    rotation: 329,
    location: { x: 260, y: 204 },
  },
  {
    id: 110,
    type: "border",
    unit: "land",
    conections: [6, 9],
    rotation: 28,
    location: { x: 302, y: 203 },
  },
  {
    id: 111,
    type: "border",
    unit: "sea",
    conections: [7, 8],
    rotation: 303,
    location: { x: 135, y: 207 },
  },
  {
    id: 112,
    type: "border",
    unit: "land",
    conections: [8, 9],
    rotation: 307,
    location: { x: 220, y: 240 },
  },
  {
    id: 113,
    type: "border",
    unit: "shield",
    conections: [10, 6],
    rotation: 5,
    location: { x: 360, y: 221 },
  },
  {
    id: 114,
    type: "border",
    unit: "sea",
    conections: [10, 9],
    rotation: 130,
    location: { x: 304, y: 245 },
  },
  {
    id: 115,
    type: "border",
    unit: "land",
    conections: [10, 11],
    rotation: 10,
    location: { x: 343, y: 309 },
  },
  {
    id: 116,
    type: "border",
    unit: "shield",
    conections: [11, 9],
    rotation: 152,
    location: { x: 273, y: 312 },
  },
  {
    id: 117,
    type: "border",
    unit: "land",
    conections: [11, 12],
    rotation: 95,
    location: { x: 246, y: 357 },
  },
  {
    id: 118,
    type: "border",
    unit: "sea",
    conections: [12, 9],
    rotation: 231,
    location: { x: 224, y: 294 },
  },
  {
    id: 119,
    type: "border",
    unit: "sea",
    conections: [12, 13],
    rotation: 115,
    location: { x: 163, y: 288 },
  },
  {
    id: 120,
    type: "border",
    unit: "shield",
    conections: [12, 15],
    rotation: 40,
    location: { x: 177, y: 335 },
  },
  {
    id: 121,
    type: "border",
    unit: "land",
    conections: [13, 7],
    rotation: 179,
    location: { x: 74, y: 240 },
  },
  {
    id: 122,
    type: "border",
    unit: "sea",
    conections: [13, 8],
    rotation: 200,
    location: { x: 145, y: 251 },
  },
  {
    id: 123,
    type: "border",
    unit: "shield",
    conections: [13, 14],
    rotation: 352,
    location: { x: 44, y: 299 },
  },
  {
    id: 124,
    type: "border",
    unit: "shield",
    conections: [14, 15],
    rotation: 287,
    location: { x: 118, y: 342 },
  },
  {
    id: 125,
    type: "border",
    unit: "land",
    conections: [14, 16],
    rotation: 351,
    location: { x: 42, y: 374 },
  },
  {
    id: 126,
    type: "border",
    unit: "sea",
    conections: [15, 16],
    rotation: 30,
    location: { x: 143, y: 397 },
  },
  {
    id: 127,
    type: "border",
    unit: "shield",
    conections: [15, 17],
    rotation: 300,
    location: { x: 197, y: 400 },
  },
  {
    id: 128,
    type: "border",
    unit: "sea",
    conections: [16, 17],
    rotation: 264,
    location: { x: 188, y: 451 },
  },
  {
    id: 129,
    type: "border",
    unit: "land",
    conections: [16, 18],
    rotation: 358,
    location: { x: 63, y: 461 },
  },
  {
    id: 130,
    type: "border",
    unit: "shield",
    conections: [17, 18],
    rotation: 98,
    location: { x: 155, y: 508 },
  },
];

const gamePieces = [
  [0, 6, "land", 0],
  [0, 6, "sea", 1],
  [0, 6, "shield", 2],
  [1, 5, "land", 3],
  [1, 5, "sea", 4],
  [1, 5, "shield", 5],
  [2, 4, "land", 6],
  [2, 4, "sea", 7],
  [2, 4, "shield", 8],
  [3, 3, "land", 9],
  [3, 3, "sea", 10],
  [3, 3, "shield", 11],
  [0, 4, "wild", 12],
  [1, 3, "wild", 13],
  [2, 2, "wild", 14],
  [2, 2, "wild", 14],
];
