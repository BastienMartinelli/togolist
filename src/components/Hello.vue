<template>
  <div class="hello">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
  
        <div class="container has-text-centered">
          <h1 class="title">
            Togo List
          </h1>
          <h2 class="subtitle">
            A travel oriented todo list.
          </h2>
          <h3>For all the explorers, adventurers, dreamers, procrastinators...</h3>
          <br>
          <img src="../assets/map_img.png" alt="Description">
        </div>
      </div>
    </section>
  
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Togolist</strong> by
            <a href="https://github.com/BastienMartinelli">Bastien Martinelli</a>.
          </p>
          <p>
            <a class="icon" href="https://github.com/BastienMartinelli/togolist">
              <i class="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.icon-block {
  padding: 30px 0;
  font-size: 5em;
}
</style>
