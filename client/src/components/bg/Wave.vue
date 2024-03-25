<script setup>
import {onMounted} from "vue";
onMounted(() => {
  initWave()
})

const initWave = () => {
  var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
  var container;
  var camera, scene, renderer;
  var particles, particle, count = 0;
  var TRANSFORM_Y = 200;
  init();
  animate();
  function init() {
    container = document.querySelector('#wave-box')
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    scene = new THREE.Scene();
    particles = new Array();
    var PI2 = Math.PI * 2;
    var material = new THREE.ParticleCanvasMaterial( {
      color: 0xffeeee,
      program: function ( context ) {
        context.beginPath();
        context.arc( 0, 0, 1, 0, PI2, true );
        context.fill();
      }
    } );
    var i = 0;
    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
      for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
        particle = particles[ i ++ ] = new THREE.Particle( material );
        particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
        particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
        scene.add( particle );
      }
    }
    renderer = new THREE.CanvasRenderer();
    renderer.setSize( 1920, 1000 );
    container.appendChild( renderer.domElement );
  }
  function animate() {
    requestAnimationFrame( animate );
    render();
  }
  function render() {
    camera.position.x += ( 200 - camera.position.x ) * .05;
    camera.position.y += ( 100 - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    var i = 0;
    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
      for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
        particle = particles[ i++ ];
        particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 ) - TRANSFORM_Y;
        particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;
      }
    }
    renderer.render( scene, camera );
    count += 0.2;
  }
}
</script>

<template>
  <div id="wave-box"></div>
</template>

<style lang="scss" scoped>
#wave-box {
  width: 1920px;
  height: 1080px;
}
</style>