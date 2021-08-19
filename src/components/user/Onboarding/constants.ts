import * as yup from 'yup'

export const STEPS = [
  {
    header: 'Basic informations',
    title: 'What’s your full name ?',
    subtitle:
      'This will be the name displayed as the author of your papers - we recommend that you use your real name.',
  },
  {
    header: 'Expertise areas',
    title: 'What are your areas of expertise ?',
    subtitle:
      'This information will be displayed on your profile - your papers can be from differents fields. ',
  },
  {
    header: 'Profile title',
    title: 'Tell us about yourself in a few words',
    subtitle:
      'This information will be displayed just below your name and allows you to see at a glance who you are',
  },
]

export const schema = yup.object().shape({
  step: yup.number().required(),
  onBoardingOne: yup.object().when('step', {
    is: 1,
    then: yup.object().shape({
      firstName: yup.string().required('A first name is required'),
      lastName: yup.string().required('A last name is required'),
    }),
  }),
})

export interface TSchema {
  step: number
  onBoardingOne: {
    firstName: string
    lastName: string
  }
  onBoardingTwo: {
    fieldOfStudies: { label: string; value: string }[]
  }

  onBoardingThree: {
    title: string
  }
}
