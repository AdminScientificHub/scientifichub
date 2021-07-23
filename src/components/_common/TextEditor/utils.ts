import { TextSelection } from 'prosemirror-state'

/**
 * Helper functions for MathBlock keymaps, kindly taken from:
 * bitbucket.org/atlassian/.../editor/editor-core/src/plugins/code-block/
 */

const SPACE = { token: ' ', size: 2, regex: /[^ ]/ }
const TAB = { token: '\t', size: 1, regex: /[^\t]/ }

export const lineIndent = (state: any, dispatch: any, view: any): any => {
  if (!isSelectionEntirelyInsideMathBlock(state)) return false
  return indent(state, dispatch)
}

export const lineUndent = (state: any, dispatch: any, view: any): any => {
  if (!isSelectionEntirelyInsideMathBlock(state)) return false
  return undent(state, dispatch)
}

export const newlineIndent = (state: any, dispatch: any, view: any): any => {
  if (isSelectionEntirelyInsideMathBlock(state)) return false
  return insertNewlineWithIndent(state, dispatch)
}

export const deleteMathBlock = (state: any, dispatch: any, view: any): any => {
  if (!isSelectionEntirelyInsideMathBlock(state)) return false

  if (
    !state.selection.$cursor ||
    (state.selection.$cursor && state.selection.$cursor.node().textContent)
  )
    return false
  const { tr, selection } = state
  tr.deleteRange(
    selection.$cursor.before(selection.$cursor.depth),
    selection.$cursor.end(selection.$cursor.depth) + 1,
  )
  dispatch(tr)
  return true
}

/**
 * Return the current indentation level
 * @param indentText - Text in the math block that represent an indentation
 * @param indentSize - Size of the indentation token in a string
 */

function indent(state: any, dispatch: any) {
  const { text, start } = getLinesFromSelection(state)
  const { tr, selection } = state
  forEachLine(text, (line: any, offset: any) => {
    const { indentText, indentToken } = getLineInfo(line)

    const indentToAdd = indentToken.token.repeat(
      indentToken.size - (indentText.length % indentToken.size) || indentToken.size,
    )
    tr.insertText(indentToAdd, tr.mapping.map(start + offset, -1))

    if (!selection.empty) {
      tr.setSelection(
        TextSelection.create(tr.doc, tr.mapping.map(selection.from, -1), tr.selection.to),
      )
    }
  })
  if (dispatch) {
    dispatch(tr)
  }
  return true
}

function undent(state: any, dispatch: any) {
  const { text, start } = getLinesFromSelection(state)
  const { tr } = state
  forEachLine(text, (line: any, offset: any) => {
    const { indentText, indentToken } = getLineInfo(line)
    if (indentText) {
      const undentLength = indentText.length % indentToken.size || indentToken.size
      tr.delete(tr.mapping.map(start + offset), tr.mapping.map(start + offset + undentLength))
    }
  })
  if (dispatch) {
    dispatch(tr)
  }
  return true
}

function insertNewlineWithIndent(state: any, dispatch: any) {
  const { text: textAtStartOfLine } = getStartOfCurrentLine(state)
  const { indentText } = getLineInfo(textAtStartOfLine)
  if (indentText && dispatch) {
    dispatch(state.tr.insertText('\n' + indentText))
    return true
  }
  return false
}

function isSelectionEntirelyInsideMathBlock(state: any) {
  return (
    state.selection.$from.sameParent(state.selection.$to) &&
    state.selection.$from.parent.type === state.schema.nodes.mathblock
  )
}

export function getStartOfCurrentLine(state: any) {
  const { $from } = state.selection
  if ($from.nodeBefore && $from.nodeBefore.isText) {
    const prevNewLineIndex = $from.nodeBefore.text.lastIndexOf('\n')
    return {
      text: $from.nodeBefore.text.substring(prevNewLineIndex + 1),
      pos: $from.start() + prevNewLineIndex + 1,
    }
  }
  return { text: '', pos: $from.pos }
}

export function getEndOfCurrentLine(state: any) {
  const { $to } = state.selection
  if ($to.nodeAfter && $to.nodeAfter.isText) {
    const nextNewLineIndex = $to.nodeAfter.text.indexOf('\n')
    return {
      text: $to.nodeAfter.text.substring(0, nextNewLineIndex >= 0 ? nextNewLineIndex : undefined),
      pos: nextNewLineIndex >= 0 ? $to.pos + nextNewLineIndex : $to.end(),
    }
  }
  return { text: '', pos: $to.pos }
}

export function getLinesFromSelection(state: any) {
  const { pos: start } = getStartOfCurrentLine(state)
  const { pos: end } = getEndOfCurrentLine(state)
  const text = state.doc.textBetween(start, end)
  return { text, start, end }
}

function forEachLine(text: any, callback: any) {
  let offset = 0
  text.split('\n').forEach((line: any) => {
    callback(line, offset)
    offset += line.length + 1
  })
}

export function getLineInfo(line: any) {
  const indentToken = line.startsWith('\t') ? TAB : SPACE
  const indentLength = line.search(indentToken.regex)
  const indentText = line.substring(0, indentLength >= 0 ? indentLength : line.length)
  return { indentToken, indentText }
}
