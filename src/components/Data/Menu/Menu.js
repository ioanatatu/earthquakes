import style from './Menu.module.scss';

import PropTypes from 'prop-types';

/**
 * Menu component receives data to be mapped on buttons
 *
 * @param {object} menu The text for each button.
 * @param {handleClick} function Lifts the info of clicked button
 * to parrent component.
 */
const Menu = ({ menu, handleClick }) => {
   return (
      <div className={style.buttons}>
         {menu &&
            Object.keys(menu).map((item) => (
               <button
                  className={style.btn}
                  key={item}
                  onClick={() => handleClick(menu[item])}>
                  last {item}
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
   }),
   handleClick: PropTypes.func,
};

export default Menu;
