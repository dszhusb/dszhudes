---
title: pilot trucking simulator
thumbnail: pilotNail
role: Design, Hardware Development, Production
collaborators: Landing Gear
duration: 6 weeks
priority: 0
documentation: https://github.com/landing-gear-production
site:
categories:
- 'physical'
- 'digital'
---

<script>
    import ImageGrid from '$lib/components/article/ImageGrid.svelte'
    import YoutubeEmbed from '$lib/components/article/YoutubeEmbed.svelte'

    const p = 'pilot/'
    const demo = "4FG9xUcryY8"
</script>

# The Pilot Semi-Truck Simulator – an immersive experience built for the 2024 Berkshire Hathaway Shareholder Conference. We converted a real semi-truck into a realistic trucking simulator game.

<YoutubeEmbed url={demo} />

## PROJECT OVERVIEW

I worked as a creative technologist on this project with [Nishanth Samala](https://outlandnish.com/) a car enthusiast who had developed a similar system for his car. There were three major components. First a microcontroller decoding the truck's communication through the diagnostic port through the [J1939](https://www.csselectronics.com/pages/j1939-explained-simple-intro-tutorial) protocol, a microcontroller reading dashboard information like engine speed and road speed to send back to the truck, and a separate GPS system implemented mostly by [Bryce Li](https://designbybryce.com/). You can find the code linked under "process documentation" above.

Although I will be talking mostly about the technology for this project, I quickly found my role expanding beyond just developing hardware to production, event planning, and more.

## SIMULATOR PERIPHERALS

Before we figured out how to communicate with the truck, I first needed to figure out how to bring the game into the trucks interior. Starting with exploration on alternatives like projection mapping, AR, and transparent LED screens, the client eventually settled on a more traditional LED screen solution. I measured the window dimensions and presented a number of sizing options to fabricators who would build the monitors to blend it seamlessly into the truck interior. I selected the largest sizes possible with QLED TVs across the windshield and custom square TVs covering the side windows. With this setup the driver would have a full view of the road around them, as if they were in the real truck.

To complement the visuals, we selected speakers and a subwoofer for a full sound and combined it with a "Buttkicker" haptic feedback system under the driver's seat to convey the rumble of the engine and the feel of the road. We also made plans to install a motor along the steering column to provide steering wheel feedback but unfortunately time and budget caused us to cut that conversation short.

## DECODING TRUCK SIGNALS

The core of this project revolved around decoding the following from the truck: steering wheel input, acceleration pedal position, brake pedal position, air horn, and gear shifter position. Our initial approach revolved around decoding all of this information from the diagnostic port which communicates via the CAN protocol, a standardized format for sending messages in vehicles.

Although the CAN protocol delineates a standard method of communication, the actual contents and ids for various messages actually vary from vehicle to vehicle. This meant we would need to stream and capture raw data as we modulated the brakes, steering, etc and watch for patterns of change to decode what data was being communicated under specific ids and specific bytes within the message content. Luckily I was able to find a more specific standard, the J1939 standard, which describes common ids and message contents for heavy transportation and industrial vehicles. Because these types of vehicles are more standardized for safety reasons, these more detailed specifications gave us a head start on decoding the messages we needed.

Nevertheless, matching up the properties described in the J1939 guide with what we actually wanted still took some work. For example, was the speed displayed on the dashboard "land-based vehicle speed" or "speed (tachometer)" or "speed (GPS)" or one of the half-dozen other speed and velocity properties reported by various ecus? To decode this problem we essentially reverted to our initial approach but with a much narrower set of ecu ids and properties to monitor. To check I learned how to use bitwise operators to extract the specific bytes the data was assigned to in their respective PIDs (data from each ecu is lumped under the same PID). We set up a ESP32 board with a CAN transciever. Monitoring this much narrower dataset sped up the process dramatically.

As we were decoding these issues, however, we were afflicted by inconsistent readings in our outputs. All our readings had occasional spikes that made the game difficult to play. As we were debugging this issue, I started working on a backup solution, tapping directly into inputs or setting up our own sensors to capture data.

## CAN DECODING ALTERNATIVES

Adding to the CAN transceiver, the transmission and the accelerator each had power, ground, and signal wires that we could tap into. By tapping into the signal and ground wires for reference we were able to take a clean, direct reading straight from the sensor without muddling from the ecu. One interesting quirk that we found was that because semi-trucks are so highly regulated, if our spliced wire was too long, it would prevent the truck from starting, due to the ecu detecting too much resistance. This was ok for us as we would be running the truck in ignition mode to collect data without the engine on. However, I needed to design these add-ons to be easily detached for when we moved the truck.

The brake sensor was a little more complex, instead of tapping in to the wires, I 3D printed a custom enclosure for a time of flight sensor that I attached with magnets to a bracket behind the brake. I then printed a custom fin to fit around the brake pedal, providing a consistent point of reference for sensor. Similarly, I detached the original air horn, which would be too loud for the venue, with a custom sensor mount. Originally, we had ordered a lamp ball and chain switch, however, this proved too flimsy and often snapped as user testers tried to pull on it. I replaced this with a rolling lever switch that I designed a 3D printed enclosure around to interface with a leather braided cord.

To add to the immersion we also bought our own ignition key switch, I wired up the switch to detect whether it was in the accessory, off, ignition, or start states and designed 3D printed key fobs for the key.

By this time we had figured out why our inital approach with the CAN system was giving us inconsistent data. The overall voltage of the truck need to be kept above around 13-14 V to keep the readings consistent. To this end I sourced and bought a battery tender that we could plug into wall power to keep the truck's system charged.

While we were able to continue using the CAN system for steering input, steering provided another issue. The steering wheel was physically attached to the steering column, which in turn was attached to the wheels. With the engine started the pneumatic system helps you turn the wheel, but in ignition mode the steering wheel's turning is limited by being linked to the front wheels. With the help of a mechanic, I identified a place we could remove a link from that chain. We used a impact driver to detached the pitman arm from the pneumatic steering system in a way that it could be put back on for later driving.

## DASHBOARD SHENANIGANS

Aside from truck input, we also wanted to ensure the truck's dashboard would match what was happening in game to complete immersion. To this end we designed a separate system to intercept messages to the dashboard ECU eventually settling on a "man in the middle attack". We started by extracting the necessary data from the game. I wrote a node.js script that interfaced with the game API to extract speed, engine speed, and oil level from the truck. This node.js script then sent data to a separate ESP32 and CAN transceiver attached to the dashboard ECU.

Our initial approach was to completely detach the ECU and replace it with our ESP32 but we quickly found that there were too many systems co-dependent on that ECU. We then tried flooding the ECU with the messages our own speed messages, but every second or so a the dials would twitch back to 0, following the original data. After some experimentation, we tried a new approach, whenever a packet with the information we wanted to modify passed through the ESP32, it would modify only the bytes we wanted with the game data.

During this process, we decided to address the numerous warning lights that had popped up on. Although it might have been possible to identify them and intercept them as we had done with the speed and engine speed, I decided to simply take the dashboard apart and tape black electrical tape over the relevant LEDs.

## GPS

An extra feature we added to the truck was a GPS, more for ambient mood than for use as we would have an instructor sitting alongside the driver. The code was primarily written by Bryce Li who was working remotely for this project. During integration, I rewrote chunks of the coordinate tracking code to align it with input from the game API. I also set up a reverse proxy with Nishanth to make the web app available to the iPad we were running the GPS from. This solved CORS errors we were getting trying to connect to the API directly. I then worked with Bryce to add further features like turn by turn navigation, visual refinements and more. While most visitors ultimately did not notice or use the GPS it added to the ambiance of the truck in a meaningful way.

## FABRICATION

To modify the truck interior, Landing Gear hired car fabricators to build a mounting system for the monitors and a veneer to hide the seams as well as detail the interior, replace carpet, add LED backlight, etc. During this process, I worked closely with the fabricators to determine where to route cables, how we would position the speakers, and so on.

We did not want to rely on wireless connections because of the unknown environment of the venue so I sourced extra long cables so we could connect everything to the PC which would be housed on a flatbed behind the truck cab. This process involved routing cables under carpet, drilling holes the back of the cab and more.

My main role during the fabrication process involved designing and 3D printing mounts for sensors, housings for microcontrollers and so on. I needed to create a robust and flexible set of 3D printed parts with backups and interchangeable pieces to ensure the sensors would be unharmed during transport and the event itself.

## USER TESTING AND FINE TUNING

Before the event we needed to conduct intensive user testing to fine tune our system for the best experience. I helped the team detail our UX journey, providing input for how long the experience should be to maximize the time for the most amount of visitors (5 minutes), as well as how the instructor who would be sitting alongside vistors would guide them.

Aside from this planning, we needed to grapple with an issue that simulators and VR experiences often deal with, motion sickness. Motion sickness typically occurs when our perceived motion from visuals doesn't match up with what we feel in our inner ears, which regulate our sense of orientation. To minimize motion sickness we worked to fine tune the sensitivity of the wheel, balancing a higher sensitivity, which feels more responsive, with a lower sensitivity, which prevents the scenery from moving too violently when spinning the wheel. I also helped the software team work through framerate maximization, field of view in the monitors and more.

While it would be difficult to say we completely neutralized motion sickness, we were able to get to a point where only the most sensitive visitors would even mention it.

## THE BERKSHIRE HATHAWAY CONFERENCE

During the event, in addition to monitoring the tech, I became involved in all aspects of production as well as actually being in the truck guiding visitors through the experience. Fortunately we had done enough user testing that our system had become robust. We had ordered back up parts for each of the critical pieces in our system and I designed, printed, and soldered together PCBs for each of our ESP32 boards to be mounted to.

Nishanth wrote a quick web app running on the game input microcontroller monitoring the inputs it sent out. I made this interface friendly for mobile with tailwind css and together we worked out a system for adjust parameters like what range the brake sensor should be mapped to and so on. This way if anything was disrupted, we would know from the outside and be able to make changes without disrupting the experience.

Instead of hiring brand ambassadors to guide visitors in the truck, we made the decision to take shifts being in the truck. We quickly developed tips and tricks around the guidance that helped visitors the most. While we each went through the experience dozens of times, I found each person brought something that made the experience unique and engaging.

## REFLECTION

On a technical experience, I learned so much from the project, especially in terms of creating hardware for live experiences. Nishanth taught me a lot regarding coding practices, especially with microcontrollers and backend web practices. I also had a chance to polish my skills with 3D printing, PCB design, etc.

More importantly I had my first experience working in the immersive experience space from start to end. I learned how to communicate with the agency and clients, how to make judgements between technical solutions, and what it's like to run the tech at the actual event. The soft skills I was able to work on boosted my confidence in my ability to thrive in the chaotic and sometimes stressful immersive experience space.