import { createStore } from "solid-js/store";
import styles from "./App.module.css";

const getId = () => {
  return Math.random().toString(36).substr(2, 9);
};

function App() {
  const [store, setStore] = createStore([
    { key: getId(), name: "name0" },
    { key: getId(), name: "name1" },
  ]);
  return (
    <div class={styles.App}>
      <button
        style={{
          cursor: "pointer",
        }}
        onClick={() =>
          setStore([...store, { key: getId(), name: "name" + store.length }])
        }
      >
        add
      </button>
      <ul class={styles.container}>
        {store.map((item, index) => (
          <li key={item.key}>
            <input
              type="text"
              value={item.name}
              onInput={(e) => setStore(index, "name", e.target.value)}
            />
            <button
              onClick={() => setStore(store.filter((_, i) => i !== index))}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
