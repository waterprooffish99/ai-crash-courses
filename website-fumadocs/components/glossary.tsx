'use client';

import { useId, useState } from 'react';

export type GlossaryItem = { term: string; definition: string };

export function Glossary({ items }: { items: GlossaryItem[] }) {
  const id = useId();
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLocaleLowerCase();
  const visible = items.filter((item) => `${item.term} ${item.definition}`.toLocaleLowerCase().includes(normalized));

  return (
    <div className="learning-glossary">
      <label htmlFor={id} data-validation-ignore="true">Filter glossary terms</label>
      <input id={id} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: token, context, agent…" data-validation-ignore="true" />
      <dl>
        {visible.map((item) => (
          <div className="definition-card" key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!visible.length ? <p data-validation-ignore="true">No matching glossary terms.</p> : null}
    </div>
  );
}
