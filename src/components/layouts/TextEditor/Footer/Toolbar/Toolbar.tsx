import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { Editor } from '@tiptap/react'
import { Flex } from '@src/components/core'
import { useClickOutside } from '@src/utils/hooks/useClickOutside'

import BoldIcon from '@src/assets/icons/bold.svg'
import HeadingOneIcon from '@src/assets/icons/heading-1.svg'
import HeadingTwoIcon from '@src/assets/icons/heading-2.svg'
import HeadingThreeIcon from '@src/assets/icons/heading-3.svg'
import ItalicIcon from '@src/assets/icons/italic.svg'
import LinkIcon from '@src/assets/icons/link.svg'
import MarkerIcon from '@src/assets/icons/marker.svg'
import NoStylesIcon from '@src/assets/icons/no-styles.svg'
import UnderlineIcon from '@src/assets/icons/underline.svg'
import EquationIcon from '@src/assets/icons/equation.svg'

import {
  StyledLinkModalContainer,
  StyledSeparator,
  StyledTextEditItem,
  StyledTextEditList,
} from './Toolbar.styled'

type TProps = {
  editor: Editor
}

export const FooterToolbar: FunctionComponent<TProps> = ({ editor }) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)

  const ref = useRef(null)

  const { clickedOutside } = useClickOutside(ref)

  useEffect(() => {
    setIsLinkModalOpen(false)
  }, [clickedOutside])

  const handleLinkBtn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault()

      const { value } = e.target as HTMLInputElement
      editor.chain().focus().setLink({ href: value }).run()
      setIsLinkModalOpen(false)
    }
  }

  return (
    <>
      <ReactTooltip place="top" className="tooltip" id="footer" />
      <StyledTextEditList direction="row">
        <StyledTextEditItem
          align="center"
          justify="center"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          data-tip="Bold"
          data-for="footer"
        >
          <BoldIcon />
        </StyledTextEditItem>
        <StyledTextEditItem
          align="center"
          justify="center"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          data-tip="Italic"
          data-for="footer"
        >
          <ItalicIcon />
        </StyledTextEditItem>
        <StyledTextEditItem
          align="center"
          justify="center"
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          data-tip="Underline"
          data-for="footer"
        >
          <UnderlineIcon />
        </StyledTextEditItem>
        <StyledSeparator />
        <StyledTextEditItem
          align="center"
          justify="center"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          data-tip="Heading 1"
          data-for="footer"
        >
          <HeadingOneIcon />
        </StyledTextEditItem>
        <StyledTextEditItem
          align="center"
          justify="center"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          data-tip="Heading 2"
          data-for="footer"
        >
          <HeadingTwoIcon />
        </StyledTextEditItem>
        <StyledTextEditItem
          align="center"
          justify="center"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          data-tip="Heading 3"
          data-for="footer"
        >
          <HeadingThreeIcon />
        </StyledTextEditItem>
        <StyledSeparator />
        <Flex position="relative" justify="center">
          <StyledTextEditItem
            align="center"
            justify="center"
            active={editor.isActive('link') || isLinkModalOpen}
            onClick={() => setIsLinkModalOpen(!isLinkModalOpen)}
            data-tip="Link"
            data-for="footer"
          >
            <LinkIcon />
          </StyledTextEditItem>
          {isLinkModalOpen && (
            <StyledLinkModalContainer forwardRef={ref}>
              <input autoFocus placeholder="https://wwww.google.fr" onKeyDown={handleLinkBtn} />
            </StyledLinkModalContainer>
          )}
        </Flex>

        <StyledTextEditItem
          align="center"
          justify="center"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          data-tip="Highlight"
          data-for="footer"
        >
          <MarkerIcon />
        </StyledTextEditItem>
        {/* <StyledTextEditItem
          align="center"
          justify="center"
          onClick={() => editor.chain().focus().toggleMathInlineMark().run()}
          active={editor.isActive('mathInlineMark')}
          data-tip="Equation"
          data-for="footer"
        >
          <EquationIcon />
        </StyledTextEditItem> */}
        <StyledSeparator />
        <StyledTextEditItem
          align="center"
          justify="center"
          active={false}
          data-tip="Remove styles"
          data-for="footer"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <NoStylesIcon />
        </StyledTextEditItem>
      </StyledTextEditList>
    </>
  )
}

export type TFooterToolbarProps = TProps
