import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Box, safelySpreadBoxProps} from '@twilio-paste/box';
import type {BoxProps} from '@twilio-paste/box';
import {styled, css} from '@twilio-paste/styling-library';

const AttachedStyled = styled.span(
  css({
    // NOTE: allow hover and focus indication to remain visible on all sides of a button despite
    // sibling elements being rendered immediately adjacent under the attached styles
    '& > button:hover': {
      zIndex: 1,
    },
    '& > button:focus': {
      zIndex: 2,
    },
    '& > button:first-of-type': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    '& > button:not(:first-of-type):not(:last-of-type)': {
      borderRadius: 0,
      marginLeft: '1px',
    },
    '& > button:last-of-type': {
      marginLeft: '1px',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  })
);

const UnattachedStyled = styled.span(
  css({
    '& > button:not(:first-of-type)': {
      marginLeft: 'space40',
    },
    '& > button:first-of-type': {
      marginLeft: 'space0',
    },
  })
);

export interface ButtonGroupProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  element?: BoxProps['element'];
  attached?: boolean;
  children: React.ReactElement[];
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({element = 'BUTTON_GROUP', children, attached = false, ...rest}, ref) => {
    return (
      <Box
        {...safelySpreadBoxProps(rest)}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        as={attached ? AttachedStyled : UnattachedStyled}
        ref={ref}
        element={element}
        display="inline-flex"
        role="group"
      >
        {children}
      </Box>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

ButtonGroup.propTypes = {
  attached: PropTypes.bool,
  element: PropTypes.string,
};
