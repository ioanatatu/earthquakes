import { render } from '@testing-library/react';

import Metadata from './Metadata';

// test if component has been rendered
test('checkMetadataRender', () => {
   const { queryByTitle } = render(<Metadata />);

   const topic = queryByTitle('topic');
   const mentions = queryByTitle('mentions');
   const positive = queryByTitle('positive');
   const negative = queryByTitle('negative');

   expect(topic).toBeTruthy();
   expect(mentions).toBeTruthy();
   expect(positive).toBeTruthy();
   expect(negative).toBeTruthy();
});
