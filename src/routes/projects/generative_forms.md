---
title: generative organic forms
thumbnail: genNail
role: Design, Development
collaborators: N/A
duration: Ongoing
documentation: https://github.com/dszhusb/generative-morphology
site: https://generative-morphology.vercel.app
categories:
- 'physical'
- 'digital'
- 'exploration'
---

<script>
    import ImageGrid from '$lib/components/article/ImageGrid.svelte'
    import HeroImage from '$lib/components/article/HeroImage.svelte'

    const p = 'generative_morphology/'
    const sketches = [p + 'sketch2', p + 'sketch3', p + '2dVoronoi', p + '3dVoronoi']
    const shells = [p + 'spiralConstruction', p + '3D Shell-3', p + 'organicArtificial', p + 'shellOrg']
    const gifs = [p + 'ShellsEarly1', p + 'ShellsEarly2']

    const genmorphhero = p + 'genmorphsite'
    const buffer = p + 'buffer'
</script>

# Organic Form, Artificial Rules is an ongoing exploration of generative design and making. Initially inspired by the book [Theoretical Morphology](https://cup.columbia.edu/book/theoretical-morphology/9780231106177) by George R. McGhee, I have been iterating on the concept of turning the formulas described in research papers into interactive web experiences.

## 3D Exploration | Generative Morphology Site

My most recent exploration of generative morphology has been a website hosting models based on different formulas to describe forms like shells and branching organisms. Working off formulas found in the book but also more recent papers cited online, I've been creating a interactive web tool with React and React Three Fiber. Users can play around with each parameter to explore the morphospace described by each formula. I am continually updating and improving the site, adding more models and features. The [site](http://generative-morphology.vercel.app) is pictured below:

<HeroImage link={genmorphhero} description="WIP Generative Morphology Website" url="http://generative-morphology.vercel.app"/>

Learning three.js during the course of this project has been a challenging and rewarding experience. For example,  the library wasn't created with the intention to generate a new mesh from a set of points, which seemed like the most straight forward initial option. The approach I ended up taking with the shell models involved creating a cylindrical mesh first and mapping each point to a point along the curvature of the shell.

Similarly, the papers I read online described each form from a purely mathematical standpoint agnostic to coding implementation. It was a little daunting to get started, but this approach ended up being a blessing in disguise. It ended up being a lot of fun to translate each formula into pseudocode and eventually javascript for threejs.

As I expand the site both in terms of models and features, here's a shortlist of things I'd like to explore: materiality (accretionary growth patterns), branch and tree like structures, bivalve shell forms, fibonacci in nature, voronoi patterns.

<HeroImage link={buffer} />

## Form Language Exploration

During my time in college I spent a semester exploring this topic in a more hands on way. Over the course of a semester, I chose to explore this theme through a six stage process: Identifying a pattern of growth in nature, exploring the mathematical principles behind it, investigating the pattern through a series of sketches, exploring its construction through code, generating a 3D model, and finally 3D printing, laser cutting, and or casting a physical model.

Early on, there were two forms that interested me, the sea shell and voronoi pattern. Starting with voronoi patterns, I began with a series of sketches and observations of the form itself. I mostly kept things loose attempting to build a familiarity with each form though a tactile means.

With this in mind, I looked into a model for generating 2D voronoi patterns and created a program in Processing which output patterns i could take and turn into physical artifacts. I started by exporting the images from Processing and creating 3D Printed positives and molds to experiment with. I was also interested in the materiality of casting forms from silicone, concrete, and a combination of the two. After a little exploration, I stopped this process to focus on the next target: the shell.

<ImageGrid links={sketches} description="Voronoi Patterns Exploration" />

Following my exploration with voronoi patterns, I decided to focus on shells. I created another processing program (later converted to P5) that generated 2D shell forms based on random parameters. One aspect where I sought to differ from the traditional modeling approach was in adding an element of randomness to the generation. Elements like segment length, size, and color in each form were varied randomly during generation to add a little more personality to each shell.

<ImageGrid links={shells} description="Shell Form Exploration" />

To create a physical form, I created a 3D model in Blender to print. With this 3D print, I created a series of negatives with silicone to produce moulds for material exploration. To complement the form and origin of the shell, I settled on using concrete to recreate the shell.

<ImageGrid links={gifs} description="Voronoi Patterns Exploration" type="gif"/>

## REFLECTION

This project is important to me personally as both an exploration of a fascinating field but also as a vehicle to explore novel ways of making and thinking. Many projects are constrained by prompts, the needs of users, and a problem to address, which is important for their effectiveness. This project has been a way for me to explore in pursuit of more aesthetic and academic ways.