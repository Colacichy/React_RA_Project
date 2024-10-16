function MyOwnRow(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>
        <button onClick={props.onButtonClick}>Wciśnij</button>
      </td>
      <td>{props.key2}</td>
    </tr>
  );
}

export default MyOwnRow;
