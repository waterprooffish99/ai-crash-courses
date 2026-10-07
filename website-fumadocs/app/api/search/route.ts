import { flexsearchFromSource } from 'fumadocs-core/search/flexsearch';
import { source } from '@/lib/source';

export const dynamic = 'force-static';
export const revalidate = false;
export const { staticGET: GET } = flexsearchFromSource(source, {
  // Forward tokenization keeps the fully static index useful for prefix search
  // without the much larger substring index produced by the default mode.
  document: { tokenize: 'forward' },
});
