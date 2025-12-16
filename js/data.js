const rules_us = `
How to Play Tetonor (General Rules):
1. The Grid & Strip: You have a main grid (4x4) with 16 numbers and a strip below with 16 numbers (some might be blank).
2. Pairing: The numbers in the strip must be split into 8 pairs (A, B).
3. Addition and Multiplication: For each pair (A, B), their sum (A+B) and their product (A×B) must both appear as numbers in the main grid.
Example: If a pair in the strip is (3, 6), then 9 (3+6) and 18 (3×6) should be found in the grid. And you may not use (3, 6) again for another pair.
4. Deduction: One must select ont the grid, which numbers and operations correspond for the grid's number. If the pair does not comply with both sum and product, it is invalid.
Example: If you select 3 and 6 with product 18 and sum 9, but on the grid number 9 is missing, then the pair is invalid, and you must try another combination.
5. Constraints: Each number in the strip is used exactly once across all 8 pairs, and the strip numbers are usually in ascending order. 
`;

const reglas_es = `
Cómo jugar a Tetonor (Reglas Generales):
1. La cuadrícula y la tira: Tienes una cuadrícula principal (4x4) con 16 números y una tira debajo con 16 números (algunos pueden estar en blanco).
2. Emparejamiento: Los números en la tira deben dividirse en 8 pares (A, B).
3. Suma y Multiplicación: Para cada par (A, B), su suma (A+B) y su producto (A×B) deben aparecer como números en la cuadrícula principal.
Ejemplo: Si un par en la tira es (3, 6), entonces 9 (3+6) y 18 (3×6) deben encontrarse en la cuadrícula. No puedes usar (3, 6) nuevamente para otro par.
4. Deducción: Debes seleccionar en la cuadrícula qué números y operaciones corresponden al número de la cuadrícula. Si el par no cumple con ambas suma y producto, es inválido.
Ejemplo: Si seleccionas 3 y 6 con producto 18 y suma 9, pero en la cuadrícula falta el número 9, entonces el par es inválido y debes probar otra combinación.
5. Restricciones: Cada número en la tira se usa exactamente una vez en los 8 pares, y los números de la tira suelen estar en orden ascendente.
`;

const comments_es = `
Este juego fue hecho con pasión para llevar lo a más personas. Espero que lo disfruten. El código del juego es abierto y, si tienen comentarios o sugerencias, pueden contactarme en ga.salandra@gmail.com.
`;

const games = [
  {
    id: 1,
    grid: [60, 23, 13, 6, 12, 112, 17, 48, 22, 18, 105, 30, 26, 7, 19, 9],
    strip: [
      null,
      null,
      2,
      3,
      3,
      3,
      null,
      6,
      null,
      8,
      12,
      14,
      null,
      16,
      null,
      21,
    ],
  },
  {
    id: 2,
    grid: [25, 13, 72, 30, 69, 29, 100, 24, 11, 9, 26, 22, 15, 36, 10, 54],
    strip: [
      1,
      2,
      3,
      3,
      3,
      null,
      null,
      null,
      null,
      9,
      10,
      12,
      18,
      20,
      null,
      null,
    ],
  },
  {
    id: 3,
    grid: [
      144, 30, 24, 180, 21, 176, 26, 140, 28, 27, 160, 98, 33, 182, 27, 200,
    ],
    strip: [
      null,
      7,
      8,
      8,
      10,
      null,
      null,
      12,
      null,
      14,
      14,
      null,
      18,
      null,
      null,
      null,
    ],
  },
  {
    id: 4,
    grid: [
      27, 198, 126, 27, 102, 29, 132, 25, 180, 144, 28, 23, 210, 37, 160, 41,
    ],
    strip: [
      null,
      5,
      6,
      6,
      6,
      null,
      9,
      11,
      16,
      null,
      18,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  {
    id: 5,
    grid: [
      29, 220, 61, 32, 38, 31, 116, 280, 204, 180, 29, 261, 228, 33, 192, 38,
    ],
    strip: [
      4,
      null,
      null,
      9,
      9,
      10,
      null,
      12,
      17,
      null,
      null,
      null,
      29,
      29,
      null,
      null,
    ],
  },
  {
    id: 6,
    grid: [
      19, 198, 70, 30, 39, 29, 90, 19, 176, 170, 27, 224, 220, 31, 170, 39,
    ],
    strip: [
      null,
      5,
      null,
      null,
      9,
      10,
      null,
      11,
      11,
      14,
      null,
      null,
      20,
      null,
      null,
      34,
    ],
  },
  {
    id: 7,
    grid: [
      130, 37, 32, 102, 18, 31, 108, 24, 27, 132, 28, 23, 126, 38, 72, 160,
    ],
    strip: [
      null,
      null,
      4,
      5,
      6,
      6,
      6,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  {
    id: 8,
    grid: [60, 18, 19, 66, 144, 30, 81, 25, 17, 128, 80, 24, 66, 21, 189, 90],
    strip: [
      null,
      null,
      null,
      5,
      null,
      null,
      9,
      9,
      10,
      null,
      null,
      null,
      16,
      null,
      null,
      null,
    ],
  },
];
