<script lang="ts">
  export let rating: number = 5
</script>

<div class="rating">
  <div class="stars" style={`--percentage: ${rating * 20}%`} />
  <p>{rating}/5</p>
</div>

<style lang="sass">
  .rating
    font-size: 1rem
    display: flex
    flex-direction: row
    align-items: center
    flex-wrap: nowrap
    justify-content: space-between
    position: relative

    p
      word-break: keep-all
      font-size: .8rem
      margin-left: .4rem

  .stars
    font-family: Times
    line-height: 1px

  .stars::before
    content:'★★★★★'
    background: linear-gradient(90deg, #fc0 var(--percentage), #fff var(--percentage))
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
</style>
