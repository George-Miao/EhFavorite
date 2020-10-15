<nav class="level nav-level">
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Count</p>
      <p class="title">{nums}</p>
    </div>
  </div>
  <p class="level-item has-text-centered has-text-weight-semibold xp">
    Pop's Fav
  </p>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Github</p>
      <p class="title" href="">Link</p>
    </div>
  </div>
</nav>

<script lang="ts">
  export let nums: Number
</script>

<style lang="sass">
.xp
  color: #FC4D62
  font:
    family: 'Roboto Condensed', sans-serif
    size: 5rem
.nav-level
  margin: 2rem
  margin-bottom: 3rem !important
</style>
