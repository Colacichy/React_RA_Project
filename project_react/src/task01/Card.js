import "./Task01.css"

function Card(props) {

    const moduloResult = props.id % 40 + 1
    let icon = ""
    if (moduloResult < 10){
        icon = `./icons/Icon14_0${moduloResult}.png`
    }
    else{
        icon = `./icons/Icon14_${moduloResult}.png`
    }

    return (
        <div className="card" key={props.userId}>
            <div className="title">{props.title}</div>
            <div><img src={icon} alt="obrazek"></img></div>   
            <div className="body">{props.body}</div>
        </div>
    );
  }
  
  export default Card;
  