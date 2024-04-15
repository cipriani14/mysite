new TypeIt('#type', {
  speed: 60
})
  .type('Hi! Welcome to Sips &amp; Pies.<br><br>')
  .pause(300)
  .options({speed: 45})
  .type('We\'re opening in spring 2025. Until then, please follow our journey on <a href="https://www.instagram.com/sipsandpies">Instagram</a>, <a href="https://www.facebook.com/sipsandpies">Facebook</a>, and <a href="https://www.tiktok.com/@sipsandpies">TikTok</a>. Or <a href="mailto:jason@sipsandpies.com">email us</a>.  <br><br>', {delay: 400})
  .go();
