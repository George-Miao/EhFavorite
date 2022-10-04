<script lang="ts">
  import type { Gallery, Setting } from '../type'
  import Control from './Control.svelte'
  import GalleryItem from './Gallery.svelte'
  import Level from './Level.svelte'

  export let galleries: Array<Gallery> = []
  export let loading: boolean = false

  let setting: Setting = { reverse: false, sort_by: 'AddDate' }

  let sorted = galleries

  $: {
    sorted = galleries

    sorted.sort((a, b) => {
      if (setting.sort_by === 'PubDate') {
        return +b.posted - +a.posted
      } else if (setting.sort_by === 'Rating') {
        return b.rating - a.rating
      } else if (setting.sort_by === 'AddDate') {
        return b.added - a.added
      }
    })

    if (setting.reverse) {
      sorted.reverse()
    }

    sorted = sorted
  }
</script>

<div class="container">
  <Level nums={sorted.length} />

  {#if !loading}
    <Control bind:setting />
    <div class="grid">
      {#each sorted as g}
        <GalleryItem bind:g />
      {/each}
    </div>
  {/if}
  {#if loading}
    <div class="has-text-centered has-text-weight-semibold loading">
      Loading...
    </div>
  {/if}
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

.loading
  // color: #FC4D62
  font:
    family: 'Roboto Condensed', sans-serif
    size: 2.5rem
  margin: 8rem
</style>
