<main>
  <Layout bind:galleries />
</main>

<script lang="ts">
  import { onMount } from 'svelte'
  import type { Gallery } from './type'
  import { APItoGallery } from './util'

  import Layout from './components/Layout.svelte'

  export let galleries: Array<Gallery> = []

  onMount(async () => {
    galleries = await loadGalleries()
    console.log(galleries)
  })

  async function loadGalleries(): Promise<Array<Gallery>> {
    const galleries: Response = await fetch('https://api.miao.dev/eh')
    if (!galleries.ok) alert('Unable to load data from API, try later')
    else {
      const rawGalleries = await galleries.json()
      rawGalleries.map(APItoGallery)
      return rawGalleries
    }
  }
</script>

<style lang="sass">
  html body 
    width: 100%
    height: 100%
    margin: 0
    padding: 0
</style>
