<script lang="ts">
  import { SortBy, type Setting } from '../type'

  let sorts = Object.keys(SortBy)

  const setSort = (sort: String, rev: boolean) => {
    setting.sort_by = sort as keyof typeof SortBy
    setting.reverse = rev
  }

  export let setting: Setting
</script>

<div class="control">
  <div class="dropdown is-hoverable">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>Sort</span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        {#each sorts as sort}
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            class={`dropdown-item ${
              sort === setting.sort_by && setting.reverse ? 'is-active' : ''
            }`}
            on:click={() => setSort(sort, true)}
          >
            {`↑ ${SortBy[sort]}`}
          </a>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            class={`dropdown-item ${
              sort === setting.sort_by && !setting.reverse ? 'is-active' : ''
            }`}
            on:click={() => setSort(sort, false)}
          >
            {`↓ ${SortBy[sort]}`}
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="sass">
  .control
    padding: .8rem
</style>
