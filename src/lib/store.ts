import { writable, derived } from 'svelte/store';
import cloverCupImage from "$lib/assets/ceramics/cloverCup.webp"
import flowerCupImage from '$lib/assets/ceramics/flowerCup.webp'
import peaPotImage from "$lib/assets/ceramics/peaPot.webp"

export const cIndex = writable(0);
export const ceramicInfo = [
    { img: cloverCupImage, blurb: "This is a tea cup I received as a gift. \nI'm not sure exactly what the type and origin of the glaze is. It appears to be related to Jian Zhan or Tenmoku Glaze types. \nI love the flower like shape and the delicate almost brain-like patterns on the surface." },
    { img: flowerCupImage, blurb: "This is a tea cup I received as a gift. \nI'm not sure exactly what the type and origin of the glaze is. It appears to be related to Jian Zhan or Tenmoku Glaze types. \nThis is one my favorite cups that I own due to its coloration and how the profile of the inside curves away from the outside profile." },
    { img: peaPotImage, blurb: "This is a single person teapot I received as a gift. \nWhile I am not particularly fond of white clay, I love the delicate brushwork on the peacock and the way it pours." }
]

//Color Variables
export const hIcon = writable(0);
export const hColors = derived(hIcon, $hIcon => shells[$hIcon]);

//Shell Values
export const shells = [
    { f1: "#53A8BA", f2: "#A6C6E1", f3: "#EDCDFE", text: "#248399" },
    { f1: "#8FAB82", f2: "#F3C2D2", f3: "#FFE0FF", text: "#3A7D1D" },
    { f1: "#9965B8", f2: "#BEBBF3", f3: "#E2F4FD", text: "#8345A8" },
    { f1: "#BEB15A", f2: "#DEC789", f3: "#FAE1FD", text: "#827000" },
    { f1: "#55AAC3", f2: "#A0D1EF", f3: "#E6DAFF", text: "#007193" },
    { f1: "#8D93AC", f2: "#BBC3D6", f3: "#DAE5FC", text: "#586AA7" },
    { f1: "#6DD1B4", f2: "#B5E4FD", f3: "#F3E3FF", text: "#0A8460" },
    { f1: "#B86F85", f2: "#CFBAC5", f3: "#E4FAFE", text: "#891739" },
    { f1: "#B17281", f2: "#F0C2DC", f3: "#F8E3FA", text: "#960023" },
    { f1: "#C55E7C", f2: "#E4B7CF", f3: "#E4FBFE", text: "#AC1B43" },
    { f1: "#AA9C5B", f2: "#C2DBB3", f3: "#C8F2ED", text: "#826E0F" },
    { f1: "#86C595", f2: "#C3D6E4", f3: "#FAE8FF", text: "#04781E" },
    { f1: "#7FC56F", f2: "#AFDFBE", f3: "#CCEFF3", text: "#3B8225" },
    { f1: "#7A5995", f2: "#9C8DB7", f3: "#DCE9FC", text: "#7F56A1" },
    { f1: "#4C83BB", f2: "#BDB2E7", f3: "#ECC5F9", text: "#336BA3" },
    { f1: "#D78387", f2: "#C4A0AD", f3: "#D0D6FF", text: "#A0585A" },
    { f1: "#7DC178", f2: "#C0C9BE", f3: "#F3D0F4", text: "#1A8114" },
    { f1: "#86B071", f2: "#BCDCCD", f3: "#D5F7FF", text: "#537C3E" },
    { f1: "#A0C098", f2: "#B5BDD9", f3: "#E5D9FF", text: "#4D7B41" },
    { f1: "#6E8F77", f2: "#ABB8B3", f3: "#F9EBFF", text: "#4C7E5A" },
    { f1: "#657386", f2: "#C0B9D4", f3: "#F2E1FF", text: "#536988" },
    { f1: "#77A36A", f2: "#ADC3A3", f3: "#E5C4E4", text: "#387127" },
    { f1: "#7C7B79", f2: "#ABB6BB", f3: "#D6ECF9", text: "#6B665C" },
    { f1: "#C1C56E", f2: "#EBD6C1", f3: "#F3E2FF", text: "#747736" }
];

//Easing Handle Positions
export interface Coord { x: number, y: number };
export const chart_size = writable(500);
export const handle_one = writable(<Coord>({ x: 150, y: 350 }));
export const handle_two = writable(<Coord>({ x: 350, y: 150 }));
export const scaled_handle_one = derived([handle_one, chart_size], ([$handle_one, $chart_size]) => <Coord>({ x: $handle_one.x / $chart_size, y: $handle_one.y / $chart_size }));
export const scaled_handle_two = derived([handle_two, chart_size], ([$handle_two, $chart_size]) => <Coord>({ x: $handle_two.x / $chart_size, y: $handle_two.y / $chart_size }));
