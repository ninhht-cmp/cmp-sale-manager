import type { ReactElement } from 'react';
import React from 'react';

import type { IconProps } from '~/components/Icon';
import Icon from '~/components/Icon';

import FilledIcon from './filled.svg';
import OutlinedIcon from './outlined.svg';

export const CoinIcon = (props: IconProps): ReactElement => (
  <Icon {...props} IconPrimary={OutlinedIcon} IconSecondary={FilledIcon} />
);
