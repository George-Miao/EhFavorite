<script lang="ts">
  import { onMount } from 'svelte'
  import TimeAgo from 'javascript-time-ago'
  import en from 'javascript-time-ago/locale/en'

  import type { Gallery } from './type'
  import { APItoGallery } from './util'
  import Layout from './components/Layout.svelte'
  import { setContext } from 'svelte'

  TimeAgo.addDefaultLocale(en)

  setContext('timeAgo', new TimeAgo('en-US'))

  // export let galleries: Array<Gallery> = (new Array(100) as Array<Gallery>).fill(getFakeGallery())
  export let galleries: Array<Gallery> = []
  export let loading: boolean = true

  onMount(() => {
    loading = true

    loadGalleries().then(e => {
      loading = false
      galleries = e || []
    })
  })

  const loadGalleries = async () =>
    await fetch('https://api.miao.dev/eh')
      .then(e => {
        if (!e.ok) {
          throw new Error(e.statusText)
        } else return e
      })
      .then(r => r.json())
      .then(r => r.map(APItoGallery) as Gallery[])
      .catch(e => alert(`Unable to load data from API, try later. ${e}`))
</script>

<main>
  <Layout bind:galleries bind:loading />
</main>
