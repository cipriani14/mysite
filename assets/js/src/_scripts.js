new TypeIt('#type', {
  speed: 60
})
  .type('I\'m Jason Cipriani')
  .pause(300)
  .options({speed: 45})
  .type(', a writer for ZDNET, IGN, CNN Underscored, The Arena Group, InsideHook, and Tom\'s Guide.<br><br>', { delay: 400})
  .pause(200)
  .type('Find me on <a href="https://twitter.com/MrCippy">twitter</a>, <a href="https://instagram.com/mrcippy">instagram</a>, and <a href="https://acebook.com/mrcippy">facebook</a>.', { delay: 400})
  .go();
