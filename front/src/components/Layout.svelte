<div class="container">
  <Level nums="{galleries.length}" />
  <div class="grid">
    {#each galleries as g}
      <GalleryItem bind:g />
    {/each}
  </div>
</div>
<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>EhFav</strong>
      built with ❤ by
      <a href="https://miao.dev">Pop</a>. Powered by
      <a href="https://svelte.dev">Svelte</a>
      and
      <a href="https://bulma.io/">Bulma</a>.
      <br />
      The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
    </p>
  </div>
</footer>

<script lang="ts">
  import type { Gallery } from '../type'
  import GalleryItem from './Gallery.svelte'
  import Level from './Level.svelte'

  export let galleries: Array<Gallery> = []
</script>

<style lang="sass">
@mixin col($count, $gap)
  count: $count
  gap: $gap

@mixin cols($count, $gap)
  .grid
    -webkit-column:
      @include col($count, $gap)
    -moz-column:
      @include col($count, $gap)
    column:
      @include col($count, $gap)

@media (min-width: 1405px)
  @include cols(4, 12px)

@media (min-width: 960px) and (max-width: 1405px)
  @include cols(3, 12px)

@media (min-width: 600px) and (max-width: 960px)
  @include cols(2, 7px)

.container
  padding: 12px
</style>
