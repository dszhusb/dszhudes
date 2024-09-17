---
title: TOBI
thumbnail: tobiNail
role: Design, Hardware Development
collaborators: N/A
duration: 12 weeks
priority: 3
documentation: https://dandy-catcher-a71.notion.site/TOBI-Data-Visualization-and-Tangible-Surfaces-34da0f7d414643f98b11546d170e0695
site:
categories:
- 'physical'
- 'exploration'
---

<script>
    import ImageGrid from '$lib/components/article/ImageGrid.svelte'
    import HeroImage from '$lib/components/article/HeroImage.svelte'
    import YoutubeEmbed from '$lib/components/article/YoutubeEmbed.svelte'

    const p = 'tobi/'
    const process = [p + 'ches', p + 'bioRef', p + 'process', p + 'journeyMap']
    const gifs = [p + 'demo', p + 'flagella', p + 'lungs', p + 'ampullae']

    const hero = p + 'sket'

    const demo = "oXNYHTHYJD8"
</script>

# TOBI – a electronic organism that lives and breathes the electronic signals in the environment around it. The movement of TOBI's 3 “organs” each represent a type of electronic data: WiFi strength, bluetooth connections, and electromagnetic noise.

<YoutubeEmbed url={demo} />

## PROJECT OVERVIEW

Built for shared spaces, TOBI was designed as a colony of organisms spread throughout a building's rooms and hallways. Individually, each member reveals the electronic signals in the immediate area around it. This gives users insight into specific metrics like the Wifi strength in a particular room or local electrical activity. As a colony, however, TOBI provides a picture of the state of a building as a whole, one that's experienced by observing the changes in data from room to room, highlighting the highly spacial nature of the data.

Why organic forms? Although we might think of the electronic world as being precise and exacting, it is also invisible and alien to our biological senses in many ways. For example, representing electromagnetic noise on a graph provides an precise depiction of the data. However, to someone without the proper context or data literacy skills that graph doesn't mean much. Some meaning is implied when the data is high or low, however, there is no emotional weight attached to number or real world connection.

When I chose to represent these electronics data with organic movement, I hoped to sacrifice the precision of a graph for our intuitive sense for how a living organ, or organism should move. Indeed, while TOBI might not be as immediately useful as a data analytics tool, I hope it will make data more tangible, evocative, and relatable. TOBI’s long term value as a tool increases over time as a user develops a closer relationship with the organs and what their movements represent. However, its immediate value comes from the striking contrast it poses between artificial input and organic representation, forcing users to ask questions about how we think about and interact the invisible electronic environment around us.

<ImageGrid links={process} description="Form Exploration" />

## PROCESS OVERVIEW

TOBI's organs were inspired by work in the soft robotics field. Each organ is a hollow silicone structure with multiple chambers that are pneumatically actuated by air pumps and valves controlled via Arduino. Designing the form and movement of each organ, I drew from various forms I saw in the real world, particularly in sea creatures and microbiology as well as normal human organs. I looked for a range of forms and actuation that could accommodate discrete and continuous data with a consistent aesthetic while also maintaining a certain degree of relatability.

With the forms mapped out, I moulded and casted each organ dozens of times to nail the process and create the visceral effects I wanted. I also needed assemble the electronics and physical housings complete TOBI's physical form.

<ImageGrid links={gifs} description="TOBI Organs" type=".gif"/>

## REFLECTION

This project was an opportunity to push my knowledge and technical skills with technologies like Arduino and soft robotics manufacturing, but also softer skills like communicating an abstract concept in a intriguing way and designing a unique visceral experience. While I am happy with the result as a whole, there is still so much potential in further developing both TOBI’s organs and everything surrounding them, making TOBI more communicative as a data visualization tool and a thought provoking as an installation.

<HeroImage link={hero} />