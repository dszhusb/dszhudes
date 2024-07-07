<script lang="ts">
    // import P5 from "p5-svelte";
    import p5 from 'p5'
    import init, { p5SVG } from 'p5.js-svg'
    import { Shell } from '$lib/components/shell/shell'

    init(p5)

    //Variables
    let sWidth: number, sHeight: number;
    let b: number, d: number, l: number;
    let name = "";

    //Change Color
    let sameColor = false;
    let prevSameColor = false;

    let submit = false
    let submitted = false

    function handleColor() {
        sameColor = !prevSameColor;
    }

    function handleSubmit() {
        submit = !submit
    }

    const sketch = (p: p5SVG) => {
        //Initializing Variables
        let shell: Shell,
            position,
            a: number,
            c: number,
            bg: any,
            sd: any,
            bc: any,
            fc: any;

        sWidth = 200;
        sHeight = 200; //p5.windowHeight;
        randomizeColor();

        p.setup = () => {
            //Setting up the Sketch
            // p.colorMode("RGB", 255);
            p.createCanvas(sWidth, sHeight, p.SVG);
            p.frameRate(20);

            //Finding shells
            a = 1.5;
            b = p.random(0.15, 0.2);
            c = 1.2;
            d = p.random(0.4, 2);
            l = p.int(p.map(b, 0.15, 0.3, 90, 85));

            prevSameColor = sameColor;

            shell = new Shell(a, b, c, d, l);
            position = p.createVector(0.5 * sWidth, 0.5 * sHeight, 0);

            bg = p.color("#17110D");
            sd = p.color("#493121");
        };

        p.draw = () => {
            if (prevSameColor != sameColor) {
                randomizeColor();
            }
            prevSameColor = sameColor;

            if (submit != submitted) {
                submitShell()
                submitted = submit
            }

            //Shifting Position
            position = p.createVector(0.5 * sWidth, 0.5 * sHeight, 0);

            p.background(bg);
            let sSize = 0;

            p.push();
            p.translate(position.x, position.y);

            p.push();
            p.rotate(l / 30);
            renderShell(shell, 0, 0, sSize, true);
            renderShell(shell, 0, 0, sSize, false);
            p.pop();

            p.push();
            p.translate(-p.textWidth(name) / 2, 10 + l * 1.2);
            p.noStroke();
            p.fill(255);
            p.text(name, 0, 0);
            p.pop();

            p.pop();

            renderBorder();
        };

        function randomizeColor() {
            bc = p.color(
                p.int(p.random(200, 255)),
                p.int(p.random(200, 255)),
                255,
            );
            fc = p.color(
                p.int(p.random(75, 200)),
                p.int(p.random(75, 200)),
                p.int(p.random(75, 200)),
            );
        }

        function submitShell() {
            p.save()
            //Processing Shell Data
            // shell.d = d;
            // shell.b = b;
            // shell.updateGen();
            // let subShell = JSON.parse(JSON.stringify(shell));
            // subShell.name = name;
            // subShell.bc = bc.levels;
            // subShell.fc = fc.levels;
            // subShell.growth = subShell.growth.slice(0, l);
            // subShell.l = l;
        }

        function renderShell(
            s: Shell,
            sx: number,
            sy: number,
            sSize: number,
            isShadow: boolean,
        ) {
            let pts = s.retPoints();
            let mx = sx + sSize / 2;
            let my = sy + sSize / 2;
            let wm = d;

            p.push();
            if (isShadow) {
                p.translate(5, 5, -5);
            }

            p.translate(mx, my);
            for (let i = l - 1; i >= 0; i--) {
                //Size + Position
                let theta = pts[i].theta;
                let p = pts[i].disp;
                let mc = pts[i].mc;
                let x = Math.cos(theta) * p;
                let y = Math.sin(theta) * p;

                //Visual
                let col = p.lerpColor(bc, fc, mc);
                p.fill(col);
                if (isShadow) {
                    p.fill(sd);
                }
                p.noStroke();

                //Draw Section
                p.push();
                p.translate(x, y);
                p.rotate(-p.atan2(x, y));
                p.ellipse(0, 0, p * wm, 2 * p);
                p.pop();
            }
            p.pop();
        }

        function renderBorder() {
            p.stroke(0);
            p.strokeWeight(2);
            p.noFill();
            p.rect(0, 0, sWidth, sHeight);
        }

        p.windowResized = () => {
            p.resizeCanvas(sWidth, sHeight);
        };

        return { randomizeColor };
    };

    new p5(sketch, document.body)
</script>

<div class="TakeShell" style="width: 100%; height: 100%">
    <!-- bind:clientWidth={sWidth} -->
    <!-- <P5 {sketch} /> -->

    <div
        class="handleBar"
        style="border:0.5px black solid; background-color: white"
    >
        <label>
            Name: <input type="text" bind:value={name} />
        </label>
        <label class="sliderContainerContainer">
            Length: <input
                class="sliderContainer"
                type="range"
                bind:value={l}
                min="100"
                max="120"
                step="1"
            />
        </label>
        <label class="sliderContainerContainer">
            Roundness: <input
                class="sliderContainer"
                type="range"
                bind:value={d}
                min="0.4"
                max="2"
                step="0.01"
            />
        </label>
        <label>
            <button on:click={handleColor}>Color</button>
        </label>
        <label>
            <button on:click={handleSubmit}>Submit</button>
        </label>
    </div>
</div>

<style>
    label {
        display: inline-block;
        padding-left: 20px;
    }
    input {
        margin: 0;
    }
    .handleBar {
        width: 100%;
        min-height: 100px;
        position: fixed;
        bottom: 0;

        display: flex;
        align-items: center;
        flex-direction: row;
    }
    .sliderContainerContainer {
        display: flex;
        flex-direction: row;
    }
    .sliderContainer {
        display: flex;
        height: auto;
        align-items: center;
        justify-content: center;
    }
</style>
