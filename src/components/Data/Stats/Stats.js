import style from './Stats.module.scss';

import PropTypes from 'prop-types';

/**
 * Stats component receives total and magnitude and maps it on UI
 *
 * @param {number} total Total number of earthquakes in a chosen interval.
 * @param {number} maxMag The highest magnitude in a chosen interval.
 */
const Stats = ({ total, maxMag }) => {
   return (
      <div className={style.stats}>
         <div className={style.total}>
            Total<span>{total}</span>
         </div>
         <div className={style.mag}>
            Maximum Magnitude<span>{maxMag}</span>
         </div>
      </div>
   );
};

Stats.propTypes = {
   total: PropTypes.number,
   maxMag: PropTypes.number,
};

export default Stats;
