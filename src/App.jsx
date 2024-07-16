import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [range, setRange] = useState(12);
  const [numberAllowed, setNumerAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) str += "!@$%^&*/~++{}()";

    for (let i = 1; i <= range; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      //console.log(char, str.charAt(char))
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [range, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [range, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipBoard = (pwd) => {
    window.navigator.clipboard.writeText(pwd);

    passwordRef.current?.select();
   // passwordRef.current.setSelectionRange(0, 3);
  };

  return (
    <>
      <div className="bg-gray-700 max-w-lg  p-2 my-12  mx-auto rounded-lg">
        <h1 className="text-sky-400  mb-2 text-xl  font-bold">
          Password Generator
        </h1>
        <div className="d-flex flex-wrap">
          <input
            type="text"
            value={password}
            className="rounded-lg w-96 p-2"
            placeholder="password"
            ref={passwordRef}
          ></input>
          <button
            className="bg-sky-400 text-white p-2 rounded-lg w-24 ms-3 hover:bg-sky-600"
            onClick={() => copyPasswordToClipBoard(password)}
          >
            copy
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <input
            type="range"
            min="0"
            max="100"
            className="text-sky-400"
            value={range}
            onChange={(event) => setRange(event.target.value)}
          />
          <label className="text-sky-400">Range</label>

          <input
            type="checkbox"
            value={numberAllowed}
            onChange={() => setNumerAllowed((prev) => !prev)}
          />
          <label className="text-sky-400">Numbers</label>

          <input
            type="checkbox"
            value={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label className="text-sky-400">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
