import styled from '@emotion/styled'
import { Flex } from '@src/components/core'
import { rgba } from 'emotion-rgba'
import { TInputProps } from '.'

export const StyledContainer = styled(Flex)(() => {
  return {
    label: {
      marginBottom: '.8rem',
      fontSize: '1.4rem',
      lineHeight: '1',
      fontWeight: 700,
    },
  }
})

export const StyledInput = styled(Flex)<{ isInputFocus: boolean; type: TInputProps['type'] }>(
  ({ isInputFocus, type }) => {
    return {
      width: '100%',
      cursor: 'pointer',

      input: {
        borderRadius: '1.2rem',
        border: `.1rem solid ${rgba('#000', 0.1)}`,
        height: '4.8rem',
        padding: '0 5.6rem',
        fontSize: '1.6rem',
        lineHeight: '1.2',
        transition: 'all .2s ease',
        width: '100%',

        '&:focus': {
          outline: 'none',
          border: `.1rem solid ${rgba('#000', 0.3)}`,
        },
      },

      '& > *': {
        '&:first-child': {
          position: 'absolute',
          margin: 0,
          marginLeft: '2.4rem',
          pointerEvents: 'none',
          fill: isInputFocus ? rgba('#000', 0.3) : rgba('#000', 0.1),
          transition: 'all .2s ease',
        },
        ...(type === 'password' && {
          '&:last-child': {
            position: 'absolute',
            right: 0,
            marginRight: '1.2rem',
            padding: '1.2rem',

            '&:hover': {
              svg: {
                fill: rgba('#000', 0.3),
              },
            },

            svg: {
              fill: isInputFocus ? rgba('#000', 0.3) : rgba('#000', 0.1),
              transition: 'all .2s ease',
              margin: 0,
            },
          },
        }),
      },
    }
  },
)
