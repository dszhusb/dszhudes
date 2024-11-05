import type { PageLoad } from './$types';
import paragraphs from './paragraphs.json'

export const load: PageLoad = () => {
    return paragraphs
};