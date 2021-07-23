import { Node } from 'prosemirror-model'
import { TextSelection, AllSelection, Transaction } from 'prosemirror-state'

export function clamp(val: number, min: number, max: number): number {
  if (val < min) {
    return min
  }
  if (val > max) {
    return max
  }
  return val
}

export enum IndentProps {
  min = 0,
  max = 210,

  more = 12,
  less = -12,
}

export function isBulletListNode(node: Node): boolean {
  return node.type.name === 'bullet_list'
}

export function isOrderedListNode(node: Node): boolean {
  return node.type.name === 'order_list'
}

export function isTodoListNode(node: Node): boolean {
  return node.type.name === 'todo_list'
}

export function isListNode(node: Node): boolean {
  return isBulletListNode(node) || isOrderedListNode(node) || isTodoListNode(node)
}

export function setNodeIndentMarkup(tr: Transaction, pos: number, delta: number): Transaction {
  if (!tr.doc) return tr

  const node = tr.doc.nodeAt(pos)
  if (!node) return tr

  const minIndent = IndentProps.min
  const maxIndent = IndentProps.max

  const indent = clamp((node.attrs.indent || 0) + delta, minIndent, maxIndent)

  if (indent === node.attrs.indent) return tr

  const nodeAttrs = {
    ...node.attrs,
    indent,
  }

  return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks)
}

export function updateIndentLevel(tr: Transaction, delta: number): Transaction {
  const { doc, selection } = tr

  if (!doc || !selection) return tr

  if (!(selection instanceof TextSelection || selection instanceof AllSelection)) {
    return tr
  }

  const { from, to } = selection

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type

    if (nodeType.name === 'paragraph' || nodeType.name === 'heading') {
      tr = setNodeIndentMarkup(tr, pos, delta)
      return false
    }
    if (isListNode(node)) {
      return false
    }
    return true
  })

  return tr
}
