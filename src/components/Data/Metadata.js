import css from './Metadata.module.css';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Metadata component which offers additional information about the clicked word
 *
 * @param {string} label The topic that has been clicked in the word cloud.
 * @param {number} volume Total number of mentions.
 * @param {object} sentiment Object with sentiment breakdown.
 */
const Metadata = ({ label, volume, sentiment }) => {
   // destructuring does not pass tests
   // const { positive, negative, neutral } = sentiment;

   let positive, negative, neutral;

   // assign 0 if sentiment does not have a property
   if (sentiment) {
      positive = sentiment.positive || 0;
      negative = sentiment.negative || 0;
      neutral = sentiment.neutral || 0;
   }

   return (
      <div className={css.wrapper}>
         <h4 className={css.title}>Topic</h4>
         <h2 className={css.topic} title='topic'>
            {label}
         </h2>
         <h3 className={css.totalMentions} title='mentions'>
            Total Mentions: <span>{volume}</span>
         </h3>
         <ul className={css.detailedMentions}>
            {/*
             * TODO: map sentiment on array of objects inside DataCard
             * such that data can be mapped on li elements
             */}
            <li title='positive'>
               Positive: <span>{positive}</span>
            </li>
            <li title='neutral'>
               Neutral: <span>{neutral}</span>
            </li>
            <li title='negative'>
               Negative: <span>{negative}</span>
            </li>
         </ul>
      </div>
   );
};

Metadata.propTypes = {
   label: PropTypes.string,
   volume: PropTypes.number,
   sentiment: PropTypes.shape({
      positive: PropTypes.number,
      negative: PropTypes.number,
      neutral: PropTypes.number,
   }),
};

export default Metadata;
