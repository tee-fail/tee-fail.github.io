const text1 = document.getElementById('marquee-text-1');
const text2 = document.getElementById('marquee-text-2');

const characters = "01";

// Function to generate a random string of a given length
function generateRandomString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to update the marquee text
function updateMarqueeText() {
    const randomString = generateRandomString(200);
    text1.textContent = randomString;
    text2.textContent = randomString; // Keep the two spans synchronized
}

// Update the text initially
updateMarqueeText();

// Based on code from:
// https://github.com/tholman/cursor-effects

(function snowflakeCursor() {
  var possibleEmoji = ["0", "1"]
  var width = window.innerWidth;
  var height = window.innerHeight;
  var cursor = {x: width/2, y: width/2};
  var particles = [];

  var animationFrame = null;

  // Bind events that are needed
  function bindEvents() {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchstart', onTouchMove);

    window.addEventListener('resize', onWindowResize);
  }
  
  function unbindEvents() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchstart', onTouchMove);

    window.removeEventListener('resize', onWindowResize);
  }
  
  function onWindowResize(e) {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  function onTouchMove(e) {
    if( e.touches.length > 0 ) {
      for( var i = 0; i < e.touches.length; i++ ) {
        addParticle( e.touches[i].clientX, e.touches[i].clientY, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
      }
    }
  }

  function onMouseMove(e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    addParticle( cursor.x, cursor.y, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
  }

  function addParticle(x, y, character) {
    var particle = new Particle();
    particle.init(x, y, character);
    particles.push(particle);
  }

  function updateParticles(time) {
    // Updated
    for( var i = 0; i < particles.length; i++ ) {
      particles[i].update(time);
    }

    // Remove dead particles
    for( var i = particles.length -1; i >= 0; i-- ) {
      if( particles[i].lifeSpan < 0 ) {
        particles[i].die();
        particles.splice(i, 1);
      }
    }
  }

  var previous = null;

  function loop(timestamp) {
    if (previous == null) {
      previous = timestamp;
    }
    updateParticles(timestamp - previous);
    previous = timestamp;
    animationFrame = requestAnimationFrame(loop);
  }

  /**
   * Particles
   */

  function Particle() {
    // Init, and set properties
    this.init = function(x, y, character) {

      this.velocity = {
        x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: (1 + Math.random())
      };

      this.lifeSpan = 2000 + Math.floor(Math.random() * 1000); //ms

      this.position = {x: x - 20, y: y - 20};

      this.element = document.createElement('span');
      this.element.innerHTML = character;
      this.element.classList.add('cursor-bit');
      this.update(0);

      document.body.appendChild(this.element);
    };

    this.update = function(time) {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 2 / 75;
      this.velocity.y -= Math.random() / 400;

      this.lifeSpan -= time;

      this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 3000) + ") rotate("
+ (this.lifeSpan / 8) + "deg)";
    }


    this.die = function() {
      this.element.parentNode.removeChild(this.element);
    }
  }

  bindEvents();
  requestAnimationFrame(loop);
})();
