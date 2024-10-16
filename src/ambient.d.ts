declare global {
    type Palette = {
        f1: string,
        f2: string,
        f3: string,
        text: string
    };

    type Vector = {
        x: number,
        y: number
    }

    type Book = {
        title: string,
        author: string,
        link: string,
        image: string,
        blurb: string
    }

    type MusicBlurb = {
        name: string,
        id: string,
        blurb: string
    }

    type SpotifySong = {
        added_at: string,
        added_by: {
            external_urls: ExternalUrls,
            href: string,
            id: string,
            type: string,
            uri: string
        },
        is_local: boolean,
        track: {
            album: {
                album_type: string,
                total_tracks: number,
                available_markets: string[],
                external_urls: ExternalUrls,
                href: string,
                id: string,
                images: SpotifyImage[],
                name: string,
                release_date: string,
                release_date_precision: string,
                type: string,
                uri: string,
                artists: SpotifyArtist[],
            },
            artists: SpotifyArtist[],
            available_markets: string[],
            disc_number: number,
            duration_ms: number,
            explicit: boolean,
            external_ids: {
                isrc: string,
                ean?: string,
                upc?: string
            },
            external_urls: ExternalUrls,
            href: string,
            id: string,
            name: string,
            popularity: number,
            preview_url: string | null,
            track_number: number,
            type: string,
            uri: string,
            is_local: boolean,
            episode: boolean,
            track: boolean
        },
        primary_color: string | null,
        video_thumbnail: {
            url: string | null,
        }
    }

    type ExternalUrls = {
        spotify: string
    }

    type SpotifyImage = {
        url: string,
        height: number | null,
        width: number | null
    }

    type SpotifyArtist = {
        external_urls: ExternalUrls,
        href: string,
        id: string,
        name: string,
        type: string,
        uri: string
    }
}

export { };