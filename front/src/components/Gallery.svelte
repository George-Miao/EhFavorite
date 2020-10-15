<div class="block" on:click="{(window.location.href = g.href)}">
  <div class="card gallery">
    <div class="card-image">
      <figure class="image">
        <Lazy height="{300}" fadeOption="{{ delay: 100, duration: 400 }}">
          <img src="{g.thumb.toString()}" alt="Placeholder" />
        </Lazy>
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-5">{g.title}</p>
      <p class="subtitle is-6">
        @{g.parsedTags?.['artist']?.[0] ?? 'Unknown artist'}
      </p>
      <div class="tag-lines">
        {#each Object.entries(g.parsedTags) as entrie}
          <div class="tags">
            {#if entrie[0] !== 'defaults'}
              <div class="tag is-primary is-light">{entrie[0]}</div>
            {/if}

            {#each entrie[1] as tag}
              <div class="tag">{tag}</div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<script lang="ts">
  import type { Gallery } from '../type'
  import Lazy from 'svelte-lazy'

  export let g: Gallery
</script>

<style lang="sass">
.block 
  padding: 10px
  word-wrap: break-word
  margin-bottom: 10px
  -webkit-column-break-inside: avoid
  -moz-column-break-inside: avoid
  column-break-inside: avoid
  cursor: pointer
.tags:not(:last-child)
  margin-bottom: 0.1rem !important
</style>
