import React, { FunctionComponent } from 'react'
import emotionReset from 'emotion-reset'
import { css, Global } from '@emotion/react'
import { FONT_FAMILY } from './tokens'

type TProps = {}

export const GlobalStyles: FunctionComponent<TProps> = () => {
  return (
    <Global
      styles={css`
        ${emotionReset}
        *, *::after, *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
        }

        html {
          font-size: 62.5%;
          font-family: ${FONT_FAMILY};
        }

        .tooltip {
          color: #fff;
          background-color: #000;
          padding: 0.4rem 0.8rem;
          border-radius: 0.4rem;
        }

        body {
          overflow: hidden;
        }
      `}
    />
  )
}

export type TThemeProps = TProps
