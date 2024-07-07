---
title: Pictogem
thumbnail: pictoNail
role: Design, Development
collaborators: N/A
duration: 1 week
documentation: https://github.com/dszhusb/photo-three-album
site: https://photo-three-album.vercel.app/
categories:
- 'digital'
- 'exploration'
---

<script>
    import ImageGrid from '$lib/components/article/ImageGrid.svelte'
    import HeroImage from '$lib/components/article/HeroImage.svelte'
    import YoutubeEmbed from '$lib/components/article/YoutubeEmbed.svelte'

    const p = 'pictogem/'
    const screenshots = [p + 'gal1', p + 'gal2', p + 'gal3', p + 'gal4']
    const hero = p + 'sket'

    const demo = "oXNYHTHYJD8"
</script>

# Pictogem is a gacha style photo album experienve. Each day, presenting a new photo rewards you with time capsules from the past, previous pictures mapped onto the shapes of flickering cubes, jelly-like droplets, and more!

<ImageGrid links={screenshots} description="Pictogem Screencaps" />

## PROJECT OVERVIEW

Wrapping an image around a 3D form can distort the image in strange and unintended wways. But instead of viewing resulting bulges and seams as a mistake, the distortions can be a source of delight! Pictogem ignores a lesson in UV mapping, casting a common mistake as the central source of novelty. The challenge becomes manipulating shape and material in ways that refresh old memories with new life instead of reading as a mistake.

This project is built with React, three.js, React Three Fiber, and more. It is a first foray into developing 3D experiences for web, shaders, as well as an exercise in my graphic design and UI skills. I hope you enjoy the prototype!

