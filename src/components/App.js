import { useState } from "react";
import Form from "./form";
import Logo from "./logo";
import PackingList from "./packingList";
import Stats from "./Stats";
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
