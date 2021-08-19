import { yupResolver } from '@hookform/resolvers/yup'

import { OnboardingSteps } from '@src/components/user/_common/OnboardingSteps/Steps'
import { useAuthContext } from '@src/contextes'
import React, { FunctionComponent, useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { TSchema, schema, STEPS } from './constants'
import { OnBoardingStepOneForm } from './StepOne'
import { StyledForm } from './View.styled'
import { OnBoardingStepTwoForm } from './StepTwo/Form'
import { useRouter } from 'next/dist/client/router'
import { OnBoardingStepThreeForm } from './StepThree'
import { updateUser } from '@src/services'

type TProps = {}

export const UserOnboardingView: FunctionComponent<TProps> = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)

  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!user?.firstName || !user.lastName) {
      setCurrentStep(1)
      return
    }

    if (!user.fieldOfStudies.length) {
      setCurrentStep(2)
      return
    }

    if (!user.title) {
      setCurrentStep(3)
      return
    }

    router.push('/')
  }, [user, router])

  const {
    handleSubmit,
    control,
    clearErrors,
    register,
    setValue,
    formState: { errors },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
  })

  useEffect(() => setValue('step', currentStep), [setValue, currentStep])

  const onSubmit = (data: TSchema) => {
    if (!user?.id) {
      return
    }

    switch (currentStep) {
      case 1:
        updateUser({
          userId: user.id,
          user: {
            firstName: data.onBoardingOne.firstName,
            lastName: data.onBoardingOne.lastName,
          },
        })
        return
      case 2:
        updateUser({
          userId: user.id,
          user: {
            fieldOfStudies: data.onBoardingTwo.fieldOfStudies,
          },
        })
        return
      case 3:
        updateUser({
          userId: user.id,
          user: {
            title: data.onBoardingThree.title,
            isOnboardingFinished: true,
          },
        })
        return
    }
  }

  return (
    <OnboardingSteps
      {...STEPS[currentStep - 1]}
      stepsLength={STEPS.length}
      step={currentStep}
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('step')} />
        {currentStep === 1 && (
          <OnBoardingStepOneForm errors={errors} control={control} clearErrors={clearErrors} />
        )}
        {currentStep === 2 && <OnBoardingStepTwoForm control={control} />}
        {currentStep === 3 && <OnBoardingStepThreeForm control={control} errors={errors} />}
      </StyledForm>
    </OnboardingSteps>
  )
}

export type TUserOnboardingViewProps = TProps
