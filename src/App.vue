<template>
  <div id="app">
    <nav class="nav has-shadow hero is-primary" id="top">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item" href="#">
            <img src="./assets/icon.png" alt="Description">
            <span> Togo List </span>
          </a>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
  
        <div class="nav-right nav-menu">
          <div class="nav-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-primary is-inverted" href="#/board">
                  <span>My List</span>
                </a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html {
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  height: 100%;
}

#app {
  height: 100% !important;
}

.nav {
  position: fixed !important; top: 0; left: 0; right: 0;
  z-index: 10;
}

/*.nav { position: fixed !important; top: 0; left: 0; right: 0; }*/
</style>
