<main>
  <Layout bind:galleries bind:loading />
</main>

<script lang="ts">
  import { onMount } from 'svelte'
  import type { Gallery } from './type'
  import { APItoGallery } from './util'

  import Layout from './components/Layout.svelte'

  // export let galleries: Array<Gallery> = (new Array(100) as Array<Gallery>).fill(getFakeGallery())
  export let galleries: Array<Gallery> = []
  export let loading: boolean = true

  const move = function <T>(a: Array<T>, b: Array<T>) {
    const push = (i: number) => {
      b.push(a[i])
      if (++i == a.length) return
      setTimeout(() => push(i + 1), 50)
    }
  }

  onMount(() => {
    loading = true

    loadGalleries().then((e) => {
      if (!e) return
      galleries = e
      loading = false
    })
  })

  const loadGalleries = async () => {
    return await fetch('https://api.miao.dev/eh')
      .then((e) => {
        if (!e.ok) {
          throw new Error()
        } else return e
      })
      .then((e) => e.json())
      .then((e) => e.map(APItoGallery) as Gallery[])
      .catch(() => alert('Unable to load data from API, try later'))
  }
</script>

<style lang="sass">
  html body 
    width: 100%
    height: 100%
    margin: 0
    padding: 0
</style>
