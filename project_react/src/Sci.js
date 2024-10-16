import { useEffect, useRef, useState } from "react";
import "./Sci.css";

function Sci() {
  const [name, setName] = useState("nazwa");

  useEffect(() => {
    console.log("UseEffect was called");
  }, [name]);

  const myStyle = { color: "red", fontSize: "20px" };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const clickMe = () => {
    console.log(name);
    setName((name) => (name = "MP"));
    console.log(name);
  };

  //stary kod powyzej

  const myBorder = {
    border: "1px black solid",
    borderBottom: "1px black dotted",
  };

  const [color1, setColor1] = useState();
  const [wynik, setWynik] = useState();
  const text1 = useRef();
  const text2 = useRef();
  const component = useRef();
  useEffect(() => {}, [color1, text1, text2, component]);
  const changeText1 = (e) => {
    text1.current = e.target.value;
  };
  const changeText2 = (e) => {
    text2.current = e.target.value;
  };
  const changeComponent = (e) => {
    component.current = e.target.value;
  };

  const changeColor = (e) => {
    setColor1(e.target.value);

    console.log(color1);
  };

  const saveAll = () => {
    document.getElementById("divThree").style.backgroundColor = color1;
    setWynik(
      `Text 1 to ${text1.current}, Twoj text 2  to ${text2.current}, Twoj component to ${component.current}, a kolor to ${color1}`
    );
    console.log(color1);
  };

  const clearAll = () => {
    text1.current = "";
    text2.current = "";
    component.current = "";
    setWynik("");
    setColor1("");
  };

  return (
    <>
      <div style={myBorder}>
        <h1>Testowy Div</h1>
        <input onChange={changeName} value={name}></input>
        <button onClick={clickMe}>Click me!</button>
        <p className="magicP">{name}</p>
        <p style={myStyle}>Tekst nr2</p>
      </div>

      <div className="divTwo">
        <input id="text1" type="text" onChange={changeText1}></input>
        <input id="text2" type="text" onChange={changeText2}></input>
        <select id="selectComponent" onChange={changeComponent}>
          <option>CPU</option>
          <option>GPU</option>
          <option>RAM</option>
          <option>ELSE</option>
        </select>
        <input
          type="radio"
          id="colorRed"
          name="color1"
          value="red"
          onChange={changeColor}
        />
        <label for="colorRed">red</label>

        <input
          type="radio"
          id="colorBlue"
          name="color1"
          value="blue"
          onChange={changeColor}
        />
        <label for="colorBlue">blue</label>

        <input
          type="radio"
          id="colorGreen"
          name="color1"
          value="green"
          onChange={changeColor}
        />
        <label for="colorGreen">green</label>
        <div className="divButton">
          <button onClick={saveAll}>Save</button>
          <button onClick={clearAll}>Clear</button>
        </div>
      </div>
      <div id="divThree" className="divThree">
        <p>{wynik}</p>
      </div>
    </>
  );
}

export default Sci;
