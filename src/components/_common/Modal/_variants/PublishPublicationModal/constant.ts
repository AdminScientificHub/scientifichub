import * as yup from 'yup'

export const schema = yup.object().shape({
  coverUrl: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  tags: yup
    .array(
      yup.object({
        label: yup.string().required(),
        value: yup.string().required(),
      }),
    )
    .required(),
  fields: yup
    .array(
      yup.object({
        label: yup.string().required(),
        value: yup.string().required(),
      }),
    )
    .required(),
})

export interface TSchema {
  coverUrl: string
  title: string
  description: string
  tags: { label: string; value: string }[]
  fields: { label: string; value: string }[]
}
