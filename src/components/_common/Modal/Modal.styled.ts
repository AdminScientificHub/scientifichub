import { rgba } from 'emotion-rgba'
import Modal from 'react-modal'

export const modalStyle: Modal.Styles = {
  overlay: {
    backgroundColor: rgba('#000000', 0.2),
    zIndex: 11,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '70rem',
    borderRadius: '1.2rem',
    maxWidth: '50%',
  },
}

export const mobileModalStyle: Modal.Styles = {
  ...modalStyle,
  content: {
    ...modalStyle.content,
    minWidth: '30rem',
    maxWidth: '80%',
  },
}
