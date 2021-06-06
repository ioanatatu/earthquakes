import style from './List.module.scss';

import PropTypes from 'prop-types';

/**
 * List component receives data to be mapped on the earthquake list
 *
 * @param {array} data Array of earthquakes.
 */
const List = ({ data }) => {

   return (
      <div className={style.listWrapper}>
         <div className={style.category}>
            <p>location</p>
            <p>magnitude</p>
         </div>
         <ul>
            {data &&
               data.map((item) => (
                  <li key={item.id}>
                     <span className={style.location}>{item.city}</span>
                     <span className={style.magnitude}>{item.value}</span>
                  </li>
               ))}
         </ul>
      </div>
   );
};

List.propTypes = {
   data: PropTypes.array,
};

export default List;
