// TODO: Do all error
// https://firebase.google.com/docs/auth/admin/errors
export const getErrorContent = (reason: string): { title: string; subtitle: string } => {
  switch (reason) {
    case 'auth/user-not-found':
      return {
        title: 'User not found',
        subtitle: 'Have you already created an account?',
      }
    case 'auth/session-cookie-expired':
      return {
        title: 'Session expired',
        subtitle: 'You must log-in again',
      }
    case 'auth/wrong-password':
      return {
        title: 'Wrong password',
        subtitle: 'Please try another one',
      }
    case 'auth/email-already-in-use':
      return {
        title: 'Email already in use',
        subtitle: 'You may redirect to login page',
      }
    default:
      return {
        title: 'An error has occurred',
        subtitle: 'Try again later...',
      }
  }
}
