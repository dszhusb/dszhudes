import { error } from '@sveltejs/kit'

export type Post = { 
    metadata: {
        title: string,
        thumbnail: string
        role: string,
        collaborators: string,
        duration: string,
        documentation: string,
        site: string,
        categories: string[]
    }
    default: any
}

export async function load({ params }) {
    const post: Post = await import(`../${params.slug}.md`)//.catch(error(404, 'Not Found'))
    const { title, thumbnail, role, collaborators, duration, documentation, site, categories } = post.metadata
    const Content = post.default

    return {
        title,
        thumbnail,
        role,
        collaborators,
        duration,
        documentation,
        site,
        categories,
        Content
    }

    // error(404, 'Not found')
}