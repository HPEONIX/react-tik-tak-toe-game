//import PropTypes from 'prop-types'
import Cross from "./cross";
import Circle from "./circle";
import  "./cell.css"

const Cell = ({ value, id, onCellClick }) => {
  return (
    <div className="cell" id={id} onClick={() => onCellClick(id)}>
      {value === 0 ? "" : value === 1 ? <Cross/> : <Circle/>}
    </div>
  );
};

export default Cell;
