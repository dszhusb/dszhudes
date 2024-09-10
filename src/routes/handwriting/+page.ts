import type { PageLoad } from './$types';
import writing from './handwriting_content.json'

export const load: PageLoad = () => {
    return writing
};