fetch('assets/js/text.json')
  .then(response => response.json())
  .then(data => {
    new TypeIt('#type', {
      speed: 60
    })
      .type(data.heading)
      .pause(300)
      .options({speed: 45})
      .type(data.text, {delay: 400})
      .go();
  });
