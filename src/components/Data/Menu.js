// import css from './Menu.module.scss';

import PropTypes from 'prop-types';

/**
 * Menu component receives data to be mapped on buttons
 *
 * @param {object} menu The text for each button.
 * @param {handleClick} function Lifts the info of clicked button
 * up to the parrent component.
 */
const Menu = ({ menu, handleClick }) => {
   return (
      <div>
         {menu &&
            Object.keys(menu).map((item) => (
               <button key={item} onClick={() => handleClick(menu[item])}>
                  {item}
               </button>
            ))}
      </div>
   );
};

Menu.propTypes = {
   menu: PropTypes.shape({
      hour: PropTypes.string,
      day: PropTypes.string,
      week: PropTypes.string,
      month: PropTypes.string,
   }),
   handleClick: PropTypes.func,
};

export default Menu;
