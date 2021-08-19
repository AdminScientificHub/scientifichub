import { TUser } from '@src/contextes/Auth/context'
import firebase from 'firebase'

export const updateUser = ({
  userId,
  user,
  callback,
}: {
  userId: string
  user: Partial<TUser>
  callback?: () => void
}): void => {
  const db = firebase.firestore()

  db.collection('users')
    .doc(userId)
    .update({
      ...user,
    })
    .then(callback)
}

export const createUser = ({
  user,
}: {
  user: Pick<Partial<TUser>, 'uid' | 'firstName' | 'lastName' | 'email'>
}): void => {
  const db = firebase.firestore()

  db.collection('users').add({
    ...user,
    isOnboardingFinished: false,
    fieldOfStudies: [],
    publications: [],
    title: '',
  })
}
