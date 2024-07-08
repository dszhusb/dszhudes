---
title: DAISY
thumbnail: daisyNail
role: Design, Hardware Development
collaborators: Joseph Kim
duration: 12 weeks
priority: 0
documentation:
site:
categories:
- 'physical'
- 'exploration'
---

<script>
    import ImageGrid from '$lib/components/article/ImageGrid.svelte'
    import HeroImage from '$lib/components/article/HeroImage.svelte'
    import YoutubeEmbed from '$lib/components/article/YoutubeEmbed.svelte'

    const p = 'daisy/'
    const product = [p + 'gal1', p + 'gal2', p + 'gal3', p + 'gal4', p + 'gal5', p + 'gal6']
    const process = [p + 'construction', p + 'logo', p + 'pcb', p + 'render']

    const hero = p + 'interaction'
    const footer = p + 'Hero2'

    const demo = "mW48x7GRV78"
    const render = "UxG64x8rIbk"
</script>

# DAISY – The guitar pedal for casual listening. Filling the niche between a listening device and a full electronic instrument, Daisy allows listeners to personalize their music listening in an interactive way.

<YoutubeEmbed url={demo} />

## PROJECT OVERVIEW

Through interactions that evoke analog nostalgia, listeners add effects to augment their listening experience. Pulling the flower-knob raises the volume while adding a twist applies an effect, giving the music an underwater ambiance with rain and thunder, shifting its pitch octaves higher, or even simulating a vinyl record for a lofi feel.

The audio gadget landscape is dominated by products for experts, audiophiles and instruments for musicians. We wanted to ask, is there a space for the casual listener to enhance their listening experience in a fun and playful way? As the final effect might suggest, a major inspiration for Daisy were “lofi” mixes popular on youtube. These mixes frequently feature rehashes of old songs with accompanying animated gifs and edits. Listeners find a sense of community in the shared appreciation of this curated aesthetic.

With Daisy, we aimed to go a step beyond, encouraging listeners to craft their own aesthetic, tuning the mood of their music for the moment, rather than consuming a ready-made experience.

<HeroImage link={hero} description="Daisy in Context" />

## PROCESS OVERVIEW

From a project perspective, we wanted to create a fully functioning product that moved past grayscale models and breadboard prototypes. In the past, we'd created fleshed out concepts with beautiful renders that were purely eye candy and functional prototypes that were never refined past bubble gum and cardboard. Our goal was to achieve a refined form that had no ifs ands or buts about its functionality.

<ImageGrid links={product} description="Daisy Product Photos" />

To achieve this level of refinement, we decided to stick to a simple concept and limited interaction to pursue an aggressive timeline, front-loading the brunt of the work. We knew that we would need to push ourselves out of our comfort zones into areas with a lot of questions and unknown variables. For example, creating frames for mounting electronic pieces with haptics in mind, programming with experimental software and microcontrollers and so much more. Fortunately, due to our planning, we were able to produce an minimum viable product in time to add a few bonus features as well.

<ImageGrid links={process} description="Renders, Branding, and Transparent Views" />

After settling on our general concept, I immediately began research on the tools we would need to bring it to life. The first and most important component was the microcontroller that would be doing all the audio processing.Electrosmith's Daisy Board, a microcontroller that can run MAX MSP patches quickly became the most obvious choice. At this time, MAX MSP was an attractive option to shore up my limited C, it uses a visual programming system that I could use to quickly mock up effects. Choosing MAX MSP to create the effects was key to being able to iterate quickly and loosely with a smaller margin for error during this project. If we are to do a second iteration, I would love to try using C to create the effects from scratch and to also save some of the logic headache that comes with adding additional parameters to MSP patches.

<YoutubeEmbed url={render} />

As I was exploring the software side in MSP, I was also working on the hardware in parallel. We quickly settled on a set of inputs and outputs both in terms of controls but also with aux in/out power options and so on. We decided on a set of inputs that balanced the modern trend toward bluetooth and traditional aux in/out. Users can stream music through aux or bluetooth and use the internal speakers or an aux out port. With this base, I prototyped with basic components on a breadboard but as the project progressed, I worked with Joseph to find components with the most satisfying haptic feedback that would fit the frame we would be mounting them into. I also worked with him to decide the mechanical interfaces and electronic components.

Now with a functioning prototype, I turned my attention to making that prototype into a production ready product. I designed and ordered a PCB for the microcontroller and began to research the types of connectors that would be used in a real product. I settled on JST connectors that I crimped and soldered into the PCB. This would ensure not just more standardized design but a more reliable and durable circuit that would be able to withstand daily use and the passage of time.

With the physical product complete, we hope to explore a digital marketplace supporting a community of makers and listeners in the future. In addition to traditional musical artists, this platform would afford a new type of “artist,” one that creates filters and effects. We hope this additional layer spawns new discussions, blurring the lines between what defines an artist and a consumer. This would position Daisy as more than just a one off device, allowing users to actively contribute to a kind of “performance” of the music specific to their experience effects and the music in that moment.

<HeroImage link={footer} description="Daisy on a home console" />

## REFLECTION

I loved exploring the dizzying field of electronic music and sound synthesis and puzzling at implementing theoretical effects in code. Thanks to the open prompt, we were able to dive into the technical guts of the project in the third week, allowing us to reach our first working prototype with weeks left to add extra features, refine any rough edges, and even design our own pcb! Functionality aside, my favorite aspect of this project by far was working with Joseph. From the chaotic stage of concept generation to seeing his beautiful renders in the final few weeks, each step of the process has been a joy to experience. The combination of our skill sets and personalities resulted in something I am so proud of and is hopefully just the beginning for a future of collaboration!