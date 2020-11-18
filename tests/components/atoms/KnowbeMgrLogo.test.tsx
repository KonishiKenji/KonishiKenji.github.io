
import KnowbeMgrLogo from '@components/atoms/KnowbeMgrLogo';
import * as React from 'react';
import { create } from 'react-test-renderer';

test('KnowbeMgrLogo changes the class when hovered', () => {
  const component = create(
    <KnowbeMgrLogo />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
