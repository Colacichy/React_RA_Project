import './Task01.css';
import cards from "../posts.json"
import Card from './Card';
import { useState } from "react";



function Cards() {


    const [quantity, setQuantity] = useState();
    const changeQuantity = (e) => {
        setQuantity(e.target.value);
      };
    
    return (
        <div>
            <div class="slidecontainer">
                <input type="range" min="1" max="100" id="myRange" onChange={changeQuantity}></input>
            </div>
            <div className='cards'>
                {cards && cards.slice(0, quantity).map(({userId,id,title,body}) => (
                    <Card id={id} userId = {userId} title = {title} body = {body} />
                ))}
            </div>
        </div>
    );
  }
  
  export default Cards;
  

//   {
//     "userId": 1,
//     "id": 3,
//     "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//     "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
//   },