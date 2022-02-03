new TypeIt('#type', {
  speed: 60
})
  .type('I\'m Jason Cipriani')
  .pause(300)
  .options({speed: 45})
  .type(', a writer for yadda yadda yadda.<br><br>', { delay: 400})
  .pause(200)
  .type('Find me on <a href="#">twitter</a>, <a href="#">instagram</a>, and <s style="color: #c6c5c2;">facebook</s>.', { delay: 400})
  .go();
