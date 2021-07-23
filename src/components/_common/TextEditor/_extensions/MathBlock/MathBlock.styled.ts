import styled from '@emotion/styled'
import { lightenDarkenColor } from '@src/utils/styles/lightenDarkenColor'
import { NodeViewWrapper } from '@tiptap/react'

export const StyledMathBlock = styled(NodeViewWrapper)(() => {
  return {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    fontSize: '1.6rem',
    lineHeight: '2.4rem',
    margin: '.8rem 0',

    '.hidden': {
      display: 'none',
    },

    pre: {
      position: 'absolute',
      display: 'flex',
      padding: '.8rem 1rem',
      borderRadius: '1.2rem',
      backgroundColor: '#fff',
      boxShadow: '0 0.2rem 0.5rem rgb(0 0 0 / 10%)',
      width: '40rem',
      minHeight: '10rem',
      left: 0,
      right: 0,
      margin: 'auto',
      top: '100%',
      zIndex: 1,

      '.content': {
        flex: 1,
      },

      button: {
        alignSelf: 'flex-start',
        padding: '.4rem 1.2rem',
        borderRadius: '.4rem',
        border: 'none',
        color: '#fff',
        backgroundColor: '#3654D1',
        fontSize: '1.4rem',
        fontWeight: 700,
        lineHeight: '1.2',
        transition: 'all .2s ease',
        cursor: 'pointer',
        userSelect: 'none',
        marginLeft: '1.2rem',

        '&:hover': {
          backgroundColor: lightenDarkenColor('#3654D1', -20),
        },
      },
    },

    '.katex-html': {
      display: 'flex !important',
      alignItems: 'baseline',
      flexWrap: 'wrap',

      '.base': {
        margin: '.4rem 0',
      },

      '.newline': {
        width: '100%',
      },
    },

    '.katex-render__empty': {
      display: 'flex',
      alignItems: 'center',

      '&-paragraph': {
        fontSize: '1.4rem !important',
        lineHeight: '2rem !important',
        margin: '0 !important',
        color: '#858CA8',
      },
    },
  }
})

export const StyledRenderBlock = styled('div')<{
  hasContent: boolean
  showEditor: boolean
  isPreviewMode: boolean
}>(({ hasContent, showEditor, isPreviewMode }) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    padding: '1.6rem 2.4rem',
    userSelect: 'none',
    borderRadius: '1.2rem',
    alignItems: 'center',
    backgroundColor: '#fff',
    transition: 'all .2s ease',

    ...(!hasContent &&
      !isPreviewMode && {
        backgroundColor: '#F5F5F5',
      }),

    ...(!showEditor &&
      !isPreviewMode && {
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: lightenDarkenColor('#F5F5F5', -10),
        },
      }),

    svg: {
      height: '2rem',
      fill: '#858CA8',
      marginRight: '.4rem',
    },
  }
})
