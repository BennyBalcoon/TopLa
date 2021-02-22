<template>
  <div id="map">
  </div>
</template>

<script>
  import Map from 'ol/Map.js';
  import View from 'ol/View.js';
  import TileLayer from 'ol/layer/Tile.js'  
  import OSM from "ol/source/OSM"
  import {fromLonLat} from 'ol/proj';

  export default {
    data() {
      return {
        map: null
      }
    },
    props: {
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    mounted() {
      const { latitude, longitude } = this.$props.coordinates
      const coordinates = [longitude, latitude];
      const coordinatesWebMercator = fromLonLat(coordinates);

      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({source: new OSM()})
        ],
        view: new View({
          center: coordinatesWebMercator,
          zoom: 15
        })
      })
    },
    // updated() {
    //   this.map.render()
    // }
  }
</script>

<style>
@import "~ol/ol.css";
#map {
  height: 300px;
}

</style>