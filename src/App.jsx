import { createStore } from "solid-js/store";
import styles from "./App.module.css";

const getId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const createItems = (row, column) => {
  return {
    key: getId(),
    items: Array.from({ length: column }, (_, i) => ({
      key: getId(),
      text: "item" + row + "-" + i,
    })),
  };
};

function App() {
  const [store, setStore] = createStore([
    createItems(0, 2),
    createItems(1, 1),
    createItems(2, 3),
  ]);

  const stretch = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = e.target.clientHeight;

    // 四周拉伸
    const doDrag = (e) => {
      const newHeight = startHeight + e.clientY - startY;
      const newWidth = startHeight + e.clientY - startY;
      e.target.style.height = newHeight + "px";
      e.target.style.width = newWidth + "px";
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);

  return (
    <div class={styles.App}>
      <button
        style={{
          cursor: "pointer",
        }}
        onClick={() => setStore([...store, { key: getId(), items: [] }])}
      >
        add
      </button>
      <div class={styles.container}>
        {store.map((item, rowIndex) => {
          return (
            <ul class={styles.row} key={item.key}>
              <li onMouseDown={stretch}>
                {rowIndex}
                <button
                  onClick={() =>
                    setStore(rowIndex, "items", [
                      ...item.items,
                      {
                        key: getId(),
                        text: "item" + rowIndex + "-" + item.items.length,
                      },
                    ])
                  }
                >
                  add column
                </button>
              </li>
              {item.items.map((subItem) => {
                return (
                  <li key={subItem.key}>
                    <input
                      type="text"
                      value={subItem.text}
                      onInput={(e) =>
                        setStore(
                          rowIndex,
                          "items",
                          subItem.key,
                          "text",
                          e.target.value
                        )
                      }
                    />
                    <button
                      onClick={() =>
                        setStore(
                          rowIndex,
                          "items",
                          item.items.filter((i) => i.key !== subItem.key)
                        )
                      }
                    >
                      delete item
                    </button>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default App;
