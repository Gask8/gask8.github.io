window.onload = init;

let model;
let view;
let controller;

function init() {
    model = new Model();
    view = new View();
    controller = new Controller(model, view);

    controller.startGame();
}