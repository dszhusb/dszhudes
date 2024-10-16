import type { PageLoad } from './$types';
import media from './media.json'

export const load: PageLoad = () => {
    return media
};