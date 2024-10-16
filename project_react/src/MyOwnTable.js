import { useState } from "react";
import MyOwnRow from "./MyOwnRow";

function MyOwnTable() {
  const [flag, setFlag] = useState(false);

  const data = ["Tekst1", "Tekst2", "Tekst3", "Tekst4", "Tekst5"];

  const data2 = [
    {
      id: "05ad9859-70fd-4234-b442-fec167007a63",
      key1: "Text1",
      key2: "Text2",
    },
    {
      id: "1636d180-1593-4442-aa68-5bfeffa1bcfb",
      key1: "Text3",
      key2: "Text4",
    },
    {
      id: "eb6db52d-40f1-4b28-b2a8-5b47f2b75ede",
      key1: "Text5",
      key2: "Text6",
    },
  ];

  const switchFlag = () => {
    setFlag(!flag);
  };

  return (
    <div>
      {/* {flag ? <p>Dziala</p> : <p>Nie dziala</p>} */}
      {flag ? <p>Dziala</p> : null}
      <button onClick={switchFlag}>Change flag value</button>
      <table
        style={{
          border: "1px black solid",
          textAlign: "center",
          marginLeft: "25%",
          width: "40%",
          marginTop: "10px",
        }}
      >
        <thead>
          <th>Header1</th>
          <th>Header2</th>
          <th>Header3</th>
        </thead>
        <tbody>
          {data.map((el, id, arr) => {
            return (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{el}</td>
              </tr>
            );
          })}
          {/* {data2.map((el,id,arr) => {return (<tr key={el.id}><td>{id + data.length + 1}</td><td>{el.key1}</td><td>{el.key2}</td></tr>)})} */}
          {data2.map((el, id, arr) => (
            <MyOwnRow id={id + data.length + 1} key1={el.key1} key2={el.key2} onButtonClick = {switchFlag} flag = {flag} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyOwnTable;
