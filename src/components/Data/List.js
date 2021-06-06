// import css from './List.module.scss';

import PropTypes from 'prop-types';

/**
 * List component receives data to be mapped on buttons
 *
 * @param {object} List The text for each button.
 * @param {handleClick} function Lifts the info of clicked button
 * up to the parrent component.
 */
const List = ({ data }) => {
   console.log('::::::', data);
   return (
      <div>
         {data && data.map((item) => <li key={item.id}>{item.city}</li>)}
      </div>
   );
};

List.propTypes = {
   data: PropTypes.array,
};

export default List;
