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
    default:
      return {
        title: 'An error has occurred',
        subtitle: 'Try again later...',
      }
  }
}
