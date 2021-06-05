// import css from './NewEarthquakeAlert.module.scss';

import PropTypes from 'prop-types';

/**
 * Stats component receives data and maps it for WordCloud and Metadata props
 *
 * @param {number} title The title given to the DataCard.
 * @param {number} data Array of topics.
 */
const Stats = ({ total, maxMag }) => {
   return (
      <div>
         <div>
            Total<span>{total}</span>
         </div>
         <div>
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
