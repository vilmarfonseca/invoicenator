'use client'

import { emailRegExp, passwordRegExp } from '@/helpers/validation'
import useFirebaseAuth from '@/lib/useFirebaseAuth'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const SignUpForm = () => {
  const { signup } = useFirebaseAuth()

  const router = useRouter()

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    register,
    watch,
  } = useForm()

  const handleRegister: SubmitHandler<FieldValues> = async ({
    email,
    password,
  }) => {
    try {
      await signup(email, password)
      router.push('/dashboard')
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleRegister)}
      className="space-y-5"
    >
      <div>
        <label className="font-medium">Email</label>
        <input
          type="email"
          required
          {...register('email', {
            required: 'Email is Required',
            pattern: {
              value: emailRegExp,
              message: 'Invalid email address',
            },
          })}
          onKeyUp={() => {
            trigger('email')
          }}
          className={clsx(
            errors.email ? 'focus:border-red-600' : 'focus:border-indigo-600',
            'w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg',
          )}
        />
      </div>
      {errors.email?.message && (
        <span className="text-red-500 text-xs">
          {errors.email.message.toString()}
        </span>
      )}

      <div>
        <label className="font-medium">Password</label>
        <input
          type="password"
          required
          className={clsx(
            errors.email ? 'focus:border-red-600' : 'focus:border-indigo-600',
            'w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg',
          )}
          {...register('password', {
            required: 'You must specify a password',
            pattern: {
              value: passwordRegExp,
              message:
                'Password should contain at least one uppercase letter, one lowercase letter, one number and one special character.',
            },
            minLength: {
              value: 8,
              message: 'Password must be more than 8 characters',
            },
            maxLength: {
              value: 20,
              message: 'Password must be less than 12 characters',
            },
          })}
          onKeyUp={() => {
            trigger('password')
          }}
        />
      </div>
      {errors.password?.message && (
        <span className="text-red-500 text-xs">
          {errors.password.message.toString()}
        </span>
      )}

      <div>
        <label className="font-medium">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          required
          className={clsx(
            errors.email ? 'focus:border-red-600' : 'focus:border-indigo-600',
            'w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg',
          )}
          {...register('confirmPassword', {
            required: 'This field is required',
            validate: (value) =>
              value === watch('password', '') || 'The passwords do not match',
          })}
          onPaste={(e) => {
            e.preventDefault()
            return false
          }}
          onKeyUp={() => {
            trigger('confirmPassword')
          }}
        />
      </div>
      {errors.confirmPassword?.message && (
        <span className="text-red-500 text-xs">
          {errors.confirmPassword.message.toString()}
        </span>
      )}

      <button className="w-full flex justify-center px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
        {isSubmitting ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        ) : (
          <span>Register</span>
        )}
      </button>
    </form>
  )
}

export default SignUpForm
