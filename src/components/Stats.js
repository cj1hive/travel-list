export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>start adding some Items</em>
      </p>
    );
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const persantage = Math.round((packedItems / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {persantage === 100
          ? "you got everything ready to go"
          : `have ${numItems} item on your list, and you are already
          ${packedItems}, (${persantage}%) `}
      </em>
    </footer>
  );
}
