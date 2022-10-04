<script lang="ts">
  export let rating: number = 5
</script>

<div class="rating">
  <div class="stars" style={`--percentage: ${rating * 20}%`} />
  {rating}/5
</div>

<style lang="sass">
  .rating
    font-size: 14px
  .stars
    display: inline-block
    font-family: Times
    line-height: 1px

  .stars::before
    content:'★★★★★'
    background: linear-gradient(90deg, #fc0 var(--percentage), #fff var(--percentage))
    // background: linear-gradient(90deg, #fc0 100%, #fff 100%)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
</style>
