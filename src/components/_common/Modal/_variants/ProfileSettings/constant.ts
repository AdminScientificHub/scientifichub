import { TUser } from '@src/contextes/Auth/context'
import * as yup from 'yup'

export const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  title: yup.string().required(),
  fieldOfStudies: yup
    .array(
      yup.object({
        label: yup.string().required(),
        value: yup.string().required(),
      }),
    )
    .required(),
})

export interface TSchema {
  firstName: TUser['firstName']
  lastName: TUser['lastName']
  title: TUser['title']
  fieldOfStudies: TUser['fieldOfStudies']
}
