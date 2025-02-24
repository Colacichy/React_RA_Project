import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const DataRow = ({ data, id }) => {
  return (
    <div className="col">
      <div className="card" style={{ width: '18rem' }}>
        <img src={`/sci_images/${data.filename}.png`} className="card-img-top" alt={data.filename}></img>
        <div className="card-body">
          <p className="card-text">{data.text}</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [backData, setBackData] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [checkValues, setCheckValues] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [columns, setColumns] = useState(5);


  useEffect(() => {
    axios.get('http://localhost:8080/employees')
      .then((res) => {
        setBackData(res.data);

        const newCheckValues = res.data.reduce((acc, data) => {
          const filename = data.filename.split("_")[0];
          if (!acc.includes(filename)) {
            acc.push(filename);
          }
          return acc;
        }, []);

        setCheckValues(newCheckValues);
      })
      .catch((error) => {
        console.error("Error:  ", error);
      });
  }, []);

  const handleCheckboxChange = (filename) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [filename]: !prevState[filename]
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            type="text"
            className="form-control"
            onChange={(e) => { setSearchPhrase(e.target.value) }}
            placeholder="Search..."
          />
          <input type="range" id="columnSlider" min="1" max="5" value={columns} onChange={(e) => { setColumns(e.target.value) }}
          />
          <div>
          {checkValues.map((value, index) => (
            <div key={index} className="form-check form-switch row">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={`flexSwitchCheck${value}`}
                checked={checkedItems[value] || false}
                onChange={() => handleCheckboxChange(value)}
              />
              <label className="form-check-label" htmlFor={`flexSwitchCheck${value}`}>
                {value}
              </label>
            </div>
            ))}
          </div>
        </div>
        <div className="container text-center">
          <div className={`row row-cols-${columns}`}>
            {backData.map((data, dataId) => {
              if (!data.text.toLowerCase().includes(searchPhrase.toLowerCase())) return null;

              const shouldDisplay = checkedItems[data.filename.split("_")[0]];
              if (!shouldDisplay) return null;

              return (
                <DataRow key={dataId} data={data} id={dataId}></DataRow>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
