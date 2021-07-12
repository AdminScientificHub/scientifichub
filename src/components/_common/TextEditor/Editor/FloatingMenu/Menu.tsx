import React, { FunctionComponent, useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'

import { FloatingMenu } from '@tiptap/react'

import BulletListIcon from '@src/assets/icons/bullet-list.svg'
import HeadingOneIcon from '@src/assets/icons/heading-1.svg'
import HeadingTwoIcon from '@src/assets/icons/heading-2.svg'
import HeadingThreeIcon from '@src/assets/icons/heading-3.svg'
import MarkerIcon from '@src/assets/icons/marker.svg'
import OrderedListIcon from '@src/assets/icons/ordered-list.svg'
import PictureIcon from '@src/assets/icons/picture.svg'
import PlusIcon from '@src/assets/icons/plus.svg'
import { UploadImageModal } from '@src/components/_common'
import { useGlobalContext, useTextEditorContext } from '@src/contextes'

import { StyledFloatingMenu, StyledFloatingMenuItem } from './Menu.styled'

type TProps = {}

export const EditorFloatingMenu: FunctionComponent<TProps> = () => {
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const { editor } = useTextEditorContext()
  const { isPreviewMode, isMobile } = useGlobalContext()

  useEffect(() => {
    editor?.on('transaction', () => {
      setIsFloatingMenuOpen(false)
    })
  }, [editor])

  if (!editor) {
    return <></>
  }

  const handleImageFromMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setIsImageModalOpen(true)
    setIsFloatingMenuOpen(false)
  }

  return (
    <FloatingMenu tippyOptions={{ offset: [0, isMobile ? -25 : -50] }} editor={editor}>
      <UploadImageModal
        closeModal={() => setIsImageModalOpen(false)}
        isModalOpen={isImageModalOpen}
      />
      {!isPreviewMode && !isImageModalOpen && (
        <StyledFloatingMenu direction="row">
          <StyledFloatingMenuItem
            align="center"
            isMain
            justify="center"
            onClick={e => {
              e.stopPropagation()
              setIsFloatingMenuOpen(!isFloatingMenuOpen)
            }}
          >
            <PlusIcon />
          </StyledFloatingMenuItem>
          {isFloatingMenuOpen && (
            <>
              <ReactTooltip place="bottom" className="tooltip" id="floating-menu" />
              <StyledFloatingMenuItem
                align="center"
                justify="center"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                data-tip="Heading 1"
                data-for="floating-menu"
                active={editor.isActive('heading', { level: 1 })}
              >
                <HeadingOneIcon />
              </StyledFloatingMenuItem>
              <StyledFloatingMenuItem
                align="center"
                justify="center"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                data-tip="Heading 2"
                data-for="floating-menu"
                active={editor.isActive('heading', { level: 2 })}
              >
                <HeadingTwoIcon />
              </StyledFloatingMenuItem>
              <StyledFloatingMenuItem
                align="center"
                justify="center"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                data-tip="Heading 3"
                data-for="floating-menu"
                active={editor.isActive('heading', { level: 3 })}
              >
                <HeadingThreeIcon />
              </StyledFloatingMenuItem>
              <StyledFloatingMenuItem
                align="center"
                justify="center"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                data-tip="Bullet List"
                data-for="floating-menu"
                active={editor.isActive('bulletList')}
              >
                <BulletListIcon />
              </StyledFloatingMenuItem>
              <StyledFloatingMenuItem
                align="center"
                justify="center"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                data-tip="Ordered List"
                data-for="floating-menu"
                active={editor.isActive('orderedList')}
              >
                <OrderedListIcon />
              </StyledFloatingMenuItem>
              <StyledFloatingMenuItem
                align="center"
                justify="center"
                data-tip="Picture"
                data-for="floating-menu"
                onClick={handleImageFromMenu}
                active={editor.isActive('image')}
              >
                <PictureIcon />
              </StyledFloatingMenuItem>
              <StyledFloatingMenuItem
                align="center"
                justify="center"
                data-tip="Highlight"
                data-for="floating-menu"
                onClick={() => editor.chain().focus().setBlockquote().run()}
                active={editor.isActive('blockquote')}
              >
                <MarkerIcon />
              </StyledFloatingMenuItem>
            </>
          )}
        </StyledFloatingMenu>
      )}
    </FloatingMenu>
  )
}

export type TMenuProps = TProps
