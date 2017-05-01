function init() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  let app = new App(canvas, ctx);
  app.reset();
}
