export function Flashcard({ front, back }: { front: string; back: string }) {
  return (
    <details className="learning-flashcard">
      <summary>{front}</summary>
      <p>{back}</p>
    </details>
  );
}
