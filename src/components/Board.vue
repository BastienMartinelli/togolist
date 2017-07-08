<template>
  <div class="board">
    <div class="section full-height">
      <div class="columns">
  
        <aside class="column is-grad is-3 hero">
  
          <div class='wrapper'>
            <div class="head">
              <div class="options">
                <a @click="promptAddCountry">
                  <i class="fa fa-plus-circle" aria-hidden="true"></i>
                </a>
              </div>
              <br>
            </div>
            <br>
  
            <b-tabs type="is-toggle" expanded>
              <b-tab-item v-bind:label="togoLabel" >
  
                <b-field>
                  <p class="control">
                    <b-input v-model="togoFilter" placeholder="Search..." type="search" icon="search">
                    </b-input>
                  </p>
                </b-field>
  
                <div class="togo-container">
                  <div class="card togo-card" v-for="item in togoList">
                    <div class="card-content">
                      <div class="content">
                        <a v-on:click="centerToItem(item)">{{item.destination.address}}</a>
                        <br>
                        <small>Added on {{item.creationDate}}</small>
                      </div>
                    </div>
                    <footer class="card-footer">
                      <a class="card-footer-item" v-on:click="deleteTogo(item)">Delete</a>
                      <a class="card-footer-item" v-on:click="toGone(item)">Done</a>
                      <a class="card-footer-item" v-on:click="showDetail(item)">Detail</a>
                    </footer>
                  </div>
                </div>
  
              </b-tab-item>
  
              <b-tab-item v-bind:label="goneLabel">
                <b-field>
                  <p class="control">
                    <b-input v-model="goneFilter" placeholder="Search..." type="search" icon="search">
                    </b-input>
                  </p>
                </b-field>
  
                <div class="togo-container">
  
                  <div class="card togo-card" v-for="item in goneList">
                    <div class="card-content">
                      <div class="content"> 
                        <a v-on:click="centerToItem(item)">{{item.destination.address}}</a>
                        <br>
                        <small>Added on {{item.creationDate}}</small>
                      </div>
                    </div>
                    <footer class="card-footer">
                      <a class="card-footer-item" v-on:click="showDetail(item)">Detail</a>
                    </footer>
                  </div>
  
                </div>
              </b-tab-item>
            </b-tabs>
          </div>
        </aside>
  
        <div class="column map">
          <div id="map"></div>
        </div>
  
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import $map from '../modules/MapModule.js'
import $db from '../modules/DatabaseModule.js'

export default {
  name: 'board',
  data() {
    return {
      itemList: [],
      togoFilter: '',
      goneFilter: ''
    }
  },

  methods: {
    /**
     * App init
     */
    initApp: function () {
      var that = this
      // Init the map element
      $map.initMap()
      // Fetching togo
      $db.getData('togo').then(snapshot => {
        snapshot.forEach(element => {
          var item = element.val()
          item.key = element.key
          that.itemList.push(item)
          $map.createMarker(item.destination.latlng, item.done)
        })
      })
    },

    /**
     * Show the detail of the given destination
     */
    showDetail: function(item) {
      window.open('http://google.com/search?q=' + item.destination.address)
    },

    /**
     * Function that delete a togo card
     */
    deleteTogo: function (item) {
      this.$dialog.confirm({
        message: 'Delete ' + item.destination.address + ' ?',
        onConfirm: () => {
          $db.deleteTogo(item.key)
          $map.deleteMarker(item.destination.latlng)
          this.itemList = this.itemList.filter(el =>
            el.key !== item.key)
          this.$toast.open(item.destination.address + ' deleted of your list.')
        }
      })
    },

    /**
     * Change a togo card to gone
     */
    toGone: function (item) {
      item.done = true
      $map.deleteMarker(item.destination.latlng)
      $map.createMarker(item.destination.latlng, true)
      $db.majToGo(item)
    },

    /**
     * Center the map to the given item
     */
    centerToItem: function (item) {
      $map.centerElement(item.destination.latlng)
    },

    /**
     * Promp a pop-up to add a country to the
     * togo list
     */
    promptAddCountry: function () {
      this.$dialog.prompt({
        message: `Choose a country to explore next...`,
        inputPlaceholder: 'e.g. France',
        onConfirm: (value) => {
          this.addTogo(value)
        }
      })
    },

    /**
     * Create a new togo entry, add it to the
     * list end save it into the database
     */
    addTogo: function (dest) {
      var that = this
      var url = 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1?&limit=5&country=' + dest
      axios.get(url).then(response => {
        if (response.data.length) {
          var data = response.data[0]
          // get lat + lon from first match
          var latlng = { lat: data.lat, lng: data.lon }
          // Create marker
          $map.createMarker(latlng)
          // Add the country to the togo list
          var date = new Date()
          var togo = {
            destination: {
              address: data.address.country,
              country_code: data.address.country_code,
              latlng: latlng
            },
            creationDate: date.toUTCString().slice(0, 16),
            done: false
          }

          $db.addToGo(togo).then(element => {
            togo.key = element.key
            that.itemList.push(togo)
          })

          this.$toast.open({
            message: togo.destination.address + ' added to your list.',
            type: 'is-success'
          })
        } else {
          this.$toast.open({
            message: 'Unknown destination...',
            type: 'is-danger'
          })
          this.promptAddCountry(dest)
        }
      }, response => {
      })
    }
  },

  /**
   * Computed properties
   */
  computed: {
    togoList: function () {
      return this.itemList.filter(item => item.done === false &&
        item.destination.address.toUpperCase()
          .indexOf(this.togoFilter.toUpperCase()) !== -1)
    },

    goneList: function () {
      return this.itemList.filter(item => item.done === true &&
        item.destination.address.toUpperCase()
          .indexOf(this.goneFilter.toUpperCase()) !== -1)
    },

    togoLabel: function () {
      return 'Togo (' + this.togoList.length + ')'
    },

    goneLabel: function () {
      return 'Done (' + this.goneList.length + ')'
    }
  },

  /**
   * Launched when the view is mounted
   */
  mounted: function () {
    this.initApp()
  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.column {
  margin: 0px;
}

.full-height {
  height: 100%;
  padding: 0px;
}

.column.map {
  padding-left: 0px;
  padding-right: 0px;
}

.togo-container {
  height: 485px;
  overflow-y: scroll;
}

.wrapper {
  margin: 30px;
}

aside {
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
  padding: 0px;
  z-index: 1;
}

.is-grad .head .options {
  display: inline-block;
  float: right;
  padding-top: 7px;
  color: lightgrey;
}

.togo-card {
  margin: 15px;
}

/**
 * Leaflet Map
 */

#map {
  height: 100%;
  z-index: 0;
  background-color: #73B6E6;
}
</style>
