import { rgba } from 'emotion-rgba'
import Modal from 'react-modal'

export const modalStyle = ({
  maxWidth,
  padding,
}: {
  maxWidth: string
  padding: string
}): Modal.Styles => ({
  overlay: {
    backgroundColor: rgba('#000000', 0.2),
    zIndex: 11,
  },
  content: {
    maxWidth,
    padding,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '70rem',
    borderRadius: '1.2rem',
    overflow: 'visible',
  },
})

export const mobileModalStyle = ({
  maxWidth,
  padding,
}: {
  maxWidth: string
  padding: string
}): Modal.Styles => ({
  ...modalStyle({ maxWidth, padding }),
  content: {
    ...modalStyle({ maxWidth, padding }).content,
    minWidth: '30rem',
    maxWidth: '80%',
  },
})
