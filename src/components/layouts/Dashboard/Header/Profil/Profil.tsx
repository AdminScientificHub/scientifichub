import { Paragraph } from '@src/components/core'
import { AlertContent, DropDown, ProfileSettingsModal, Thumbnail } from '@src/components/_common'
import { useAuthContext } from '@src/contextes'
import React, { FunctionComponent, useMemo, useState } from 'react'
import { StyledContainer, StyledList, StyledListItem } from './Profil.styled'
import firebase from 'firebase'

import UserIcon from '@src/assets/icons/user.svg'
import LogOutIcon from '@src/assets/icons/log-out.svg'
import { useAlert } from 'react-alert'
import { useRouter } from 'next/dist/client/router'

type TProps = {}

export const HeaderProfil: FunctionComponent<TProps> = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileSettingsModalOpen, setIsProfileSettingsModalOpen] = useState(false)

  const { user } = useAuthContext()
  const alert = useAlert()

  const router = useRouter()

  const isOnboarding = useMemo(() => router.pathname === '/user/onboarding', [router])

  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert.info(
          <AlertContent
            title="Disconnected successfully"
            subtitle="All your work has been saved"
            type="info"
          />,
        )
      })

    setIsOpen(false)
  }

  return (
    <StyledContainer isClickable={!isOnboarding}>
      <ProfileSettingsModal
        isModalOpen={isProfileSettingsModalOpen}
        closeModal={() => setIsProfileSettingsModalOpen(false)}
      />
      <DropDown
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        header={<Thumbnail size="medium" username={user?.firstName} />}
        dropAlign={{ top: 'bottom', right: 'right' }}
        withChevron
      >
        <StyledList direction="column">
          <StyledListItem notClickable>
            <Thumbnail username={user?.firstName} />
            <Paragraph size="xsmall" color="text-white">
              {user?.email}
            </Paragraph>
          </StyledListItem>
          <StyledListItem
            onClick={() => {
              setIsProfileSettingsModalOpen(true)
              setIsOpen(false)
            }}
          >
            <UserIcon />
            <Paragraph size="xsmall" color="text-white">
              Profile settings
            </Paragraph>
          </StyledListItem>
          <StyledListItem onClick={signOutUser}>
            <LogOutIcon />
            <Paragraph size="xsmall" color="text-white">
              Log out
            </Paragraph>
          </StyledListItem>
        </StyledList>
      </DropDown>
    </StyledContainer>
  )
}

export type THeaderProfilProps = TProps
