<script lang="ts">
  import type { Gallery } from '../type'
  import type TimeAgo from 'javascript-time-ago'
  import Lazy from 'svelte-lazy'

  import { getContext } from 'svelte'

  import Rating from './Rating.svelte'

  const t = getContext<TimeAgo>('timeAgo')
  export let g: Gallery
  if (g.added === null) {
    console.error(g)
  }
  $: added = t.format(g.added)
</script>

<div class="block">
  <div class="card gallery">
    <div class="card-image">
      <figure class="image">
        <Lazy height={300} fadeOption={{ delay: 100, duration: 400 }}>
          <img src={g.thumb.toString()} alt="Placeholder" />
        </Lazy>
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-5">{g.title}</p>
      <div class="subtitle">
        <p>
          By @{g.parsedTags?.['artist']?.[0] ?? 'Unknown artist'}
        </p>
        <Rating rating={g.rating} />
      </div>
      <div class="tag-lines">
        {#each Object.entries(g.parsedTags) as entrie}
          <div class="tags">
            {#if entrie[0] !== 'defaults'}
              <a
                class="tag is-primary is-light tag-category"
                href={`https://ehwiki.org/wiki/${entrie[0].replaceAll(
                  ' ',
                  '_'
                )}`}>{entrie[0]}</a
              >
            {/if}

            {#each entrie[1] as tag}
              <a
                class="tag"
                href={`https://ehwiki.org/wiki/${tag.replaceAll(' ', '_')}`}
                >{tag}</a
              >
            {/each}
          </div>
        {/each}
      </div>
      <p class="added">Added {added}</p>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" href={g.eh_href.toString()}>E-hentai</a>
      <a class="card-footer-item" href={g.ex_href.toString()}>Exhentai</a>
    </footer>
  </div>
</div>

<style lang="sass">
.block
  display: block
  padding: 0.6rem
  word-wrap: break-word
  margin-bottom: 0.6rem
  -webkit-column-break-inside: avoid
  -moz-column-break-inside: avoid
  column-break-inside: avoid
  break-inside: avoid

.subtitle
  color: #777
  display: flex
  justify-content: space-between

  p
    font-size: 1rem

.tags
  text-decoration: none

  .tag-category
    text-transform: capitalize

  &:not(:last-child)
    margin-bottom: 0.1rem !important

.added
  font-size: 0.7rem
  color: #999
  margin: 1rem 0.2rem 0

.card-footer-item
  font-size: 0.8rem
  color: #999
  &:hover
    color: #444
    background: #f5f5f5

</style>
