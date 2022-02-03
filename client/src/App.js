import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [name, setName] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let resJson = await res.json()
      .then((data) => setData(`Hi ${data.name}, response from node server`));
      if (res.status === 200) {
        setName("");
      } else {
        setData("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
                <button type="submit">Send to server</button>
      </form>
      </header>
    </div>
  );
}

export default App;
