import { render } from '@testing-library/react';

import WordCloud from './WordCloud';

// test if component has been rendered
it('checkWordCloudRender', () => {
   const { queryByTitle } = render(<WordCloud />);
   const wordcloud = queryByTitle('wordcloud');
   expect(wordcloud).toBeTruthy();
});
