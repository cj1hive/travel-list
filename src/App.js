import { useState } from "react";
import { flushSync } from "react-dom";
export default function App() {
  const [items, setItem] = useState([]);
  function handelItme(item) {
    setItem((items) => [...items, item]);
  }
  function handelDelete(id) {
    console.log(id);
    setItem((items) => items.filter((item) => item.id !== id));
  }
  function handelToggleItme(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }
  function handelClearList() {
    const confirm = window.confirm("are you sure you want to delete all items");
    setItem([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handelItme} />
      <PackingList
        items={items}
        onDeleteItem={handelDelete}
        onToggleItem={handelToggleItme}
        onClearList={handelClearList}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>6️⃣ Far Away 7️⃣</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);

  function handeSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, id: Date.now(), packed: false };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handeSubmit}>
      <h3>what do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("packed");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>💔</button>
    </li>
  );
}
function Stats({ items }) {
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
