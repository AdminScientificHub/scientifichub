import { Flex, Heading, Paragraph } from '@src/components/core'
import { Modal, TModalProps } from '@src/components/_common'
import {
  StyledPublishContainer,
  StyledLoadingSpinner,
  StyledPublishedSuccessfull,
  StyledCopyKeyboardContainer,
  StyledCopiedToKeyboard,
} from './Modal.styled'
import React, { FunctionComponent, useState } from 'react'
import { FirestoreMutation } from '@react-firebase/firestore'
import { useTextEditorContext } from '@src/contextes'

import LoadingIcon from '@src/assets/icons/loading.svg'
import PublishIllustration from '@src/assets/illustrations/publish-publication.svg'
import { ShareableLinks } from '@src/components/_common/TextEditor/Editor/ShareableLinks'
import { useRouter } from 'next/dist/client/router'

type TProps = {} & TModalProps

export const PublishPublicationModal: FunctionComponent<TProps> = ({ closeModal, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [publicationId, setPublicationId] = useState('')
  const [isCopiedToKeyboard, setIsCopiedToKeyboard] = useState(false)

  const { title, authors, editor } = useTextEditorContext()
  const router = useRouter()

  const copyToKeyboard = () => {
    navigator.clipboard.writeText(`app.scientifichub.io/publication/${publicationId}`).then(() => {
      setIsCopiedToKeyboard(true)

      setTimeout(() => {
        setIsCopiedToKeyboard(false)
      }, 3000)
    })
  }

  const goToPublication = () => {
    router.push(`/publication/${publicationId}`)
    closeModal()
  }

  return (
    <Modal closeModal={closeModal} {...props}>
      {publicationId ? (
        <StyledPublishedSuccessfull direction="column">
          <Heading as="h2">Your publication has been posted 🎉</Heading>
          <Paragraph color="text-light">
            Very nice work! Your publication is now available with the link above, we have also
            generated links for you to share on social medias. Let's bring science to the world
            together.
          </Paragraph>
          <Heading as="h3">Click to copy it to your keyboard</Heading>
          <Flex direction="row" align="center">
            <StyledCopyKeyboardContainer onClick={copyToKeyboard}>
              <input
                disabled={true}
                placeholder={`app.scientifichub.io/publication/${publicationId}`}
              />
            </StyledCopyKeyboardContainer>

            <StyledCopiedToKeyboard size="small" color="text-light" active={isCopiedToKeyboard}>
              Copied !
            </StyledCopiedToKeyboard>
          </Flex>
          <ShareableLinks place="right" />
          <button onClick={goToPublication}>Go to the publication</button>
        </StyledPublishedSuccessfull>
      ) : (
        <StyledPublishContainer direction="column">
          <PublishIllustration />
          <Heading as="h2">Are you ready to publish ?</Heading>
          <Paragraph color="text-light">
            Once you have posted your publication, we will give you a link to share with your
            contacts. They will see the same thing you do when you preview your publication.
          </Paragraph>
          <Flex justify="end">
            <FirestoreMutation type="add" path="/publications">
              {({ runMutation }) => {
                return (
                  <button
                    onClick={() => {
                      setIsLoading(true)
                      runMutation({ title, content: editor?.getHTML(), authors }).then(data => {
                        setIsLoading(false)
                        data.key && setPublicationId(data.key)
                      })
                    }}
                  >
                    {isLoading ? (
                      <StyledLoadingSpinner>
                        <LoadingIcon />
                      </StyledLoadingSpinner>
                    ) : (
                      'Publish'
                    )}
                  </button>
                )
              }}
            </FirestoreMutation>
          </Flex>
        </StyledPublishContainer>
      )}
    </Modal>
  )
}

export type TPublishPublicationModalProps = TProps
