---
title: Soma
thumbnail: somaNail
role: UI/UX Design, Front/Backend Development, Prototyping
collaborators: Alison Hu, Richard Zhou
duration: 6 weeks
documentation: https://www.notion.so/366560df767742cbbdadbdb9188bebc8
site:
categories:
- 'physical'
- 'exploration'
---

<script>
    import ImageGrid from '$lib/components/article/ImageGrid.svelte'
    import HeroImage from '$lib/components/article/HeroImage.svelte'
    import YoutubeEmbed from '$lib/components/article/YoutubeEmbed.svelte'

    const p = "soma/"
    const gestures = [p + 'gestures', p + 'chart']

    const process = p + "proto"
    const chart = p + "chart"
</script>

# SOMA is a inflatable puppet that motions and gestures based on speech. As you talk to SOMA, it manifests the cadence and emotion of your speech in real time. SOMA is an exploration into how gestures and body language communicate.

## PROJECT OVERVIEW

Nonverbal communication factors like body language, gestures, and facial expressions have been shown to carry as much, if not more meaning than the semantic meaning of the words we speak. However, they often go unnoticed as they’re processed by our subconscious minds. While we typically use nonverbal forms of communication to contextualize our words, we wanted to ask: can we reconstruct gestures and body language from speech alone?

As for the vessel of these gestures, we settled on an inflatable puppet that could stretch and bend and bounce across a full range of expression. To pilot this inflatable, we created a system of pulleys and strings controlled by an Arduino which is fed data from an audio processing js site.

<HeroImage link={process} description="SOMA Puppet Process" />

## PROCESS OVERVIEW

Along with concept development, my primary role in this project was to develop the Arduino controllers and half of the backend JS that derived cadence, emotion, and intensity from the raw data.

Aside from the technical experienced I gained with Arduino, assembling physical prototypes, and backend development, I learned most about abstracting human gestures and poses. To recreate the range of gestures SOMA would need to express, I studied gestures and body language both in research and in the people around me. With these references in mind, we created a range of behaviors adapted for SOMA that could work across the continuous spectrum of inputs.

<HeroImage link={chart} description="Journey Map" />

## REFLECTION

SOMA was intended to be a thought provoking experiment. However, I believe what we learned about producing body language and gesture from speech, even in the limited way SOMA achieved it, can be applicable in a broad variety of situations. The same techniques could be applied to creating more expressive digital avatars for online communication and so much more!