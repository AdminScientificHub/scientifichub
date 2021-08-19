import { Extensions } from '@tiptap/react'

import BulletListExtension from '@tiptap/extension-bullet-list'
import FloatingMenuExtension from '@tiptap/extension-floating-menu'
import HeadingExtension from '@tiptap/extension-heading'
import ImageExtension from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import ListItemExtension from '@tiptap/extension-list-item'
import OrderedListExtension from '@tiptap/extension-ordered-list'
import PlaceholderExtension from '@tiptap/extension-placeholder'
import UnderlineExtension from '@tiptap/extension-underline'

import {
  Indent as IndentExtension,
  MathBlock as MathBlockExtension,
  MathInline as MathInlineExtension,
  MathInlineMark as MathInlineMarkExtension,
} from '@src/components/_common/TextEditor/_extensions'

import StarterKit from '@tiptap/starter-kit'

export const EXTENSIONS: Extensions = [
  MathBlockExtension,
  StarterKit,
  PlaceholderExtension.configure({
    placeholder: 'Write or paste (⌘+V) your text here',
  }),
  LinkExtension.configure({
    HTMLAttributes: {
      target: '_blank',
    },
  }),
  IndentExtension,
  UnderlineExtension,
  FloatingMenuExtension,
  OrderedListExtension,
  BulletListExtension,
  ListItemExtension,
  MathInlineExtension,
  ImageExtension,
  MathInlineMarkExtension,
  HeadingExtension.extend({
    addGlobalAttributes() {
      return [
        {
          types: ['heading'],
          attributes: {
            id: {
              default: null,
            },
          },
        },
      ]
    },
  }),
]
