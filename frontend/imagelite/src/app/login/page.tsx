'use client'

import { Template, RenderIf, InputText, Button, FieldError, useNotification } from "@/components"
import { useState } from "react"
import { LoginForm, formSchema, validationSchema } from "./formSchema"
import { useFormik } from "formik"
import { useAuth } from '@/resources'
import { useRouter } from "next/navigation"
import { AccessToken, Credentials, User } from "@/resources/user/users.resources"

export default function Login() {
    const [loading, setLoading] = useState<boolean>(false)
    const [newUserState, setNewUserState] = useState<boolean>(false)

    const auth = useAuth()
    const notification = useNotification()
    const router = useRouter()

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
        initialValues: formSchema,
        validationSchema: validationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit(values: LoginForm) {
        if (!newUserState) {
            const credentials: Credentials = { email: values.email, password: values.password }
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials)
                auth.initSession(accessToken)
                auth.isSessionValid()
                router.push("/galeria")
                
            } catch (error: any) {
                const message = error?.message
                notification.notify(message, "error")
            }
        } else {
            const user: User = { email: values.email, password: values.password, name: values.name }

            try {
                await auth.save(user)
                notification.notify('Success on saving user!', "success")
                resetForm()
                setNewUserState(false)

            } catch (error: any) {
                const message = error?.message
                notification.notify(message, "error")
            }
        }
    }

    return (
        <Template loading={loading}>
            <div className="flex min-h-full flex-1  flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-1x1 font-bold leading-9 tracking-tight text-gray-900">
                        {newUserState ? 'Create New User' : 'Login to your account'}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" onSubmit={handleSubmit}>
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name: </label>
                            </div>
                            <div className="mt-3">
                                <InputText style="w-full" id="name" dataId="inputUserName" value={values.name} onChange={handleChange} />
                                <FieldError error={errors.name} />
                            </div>
                        </RenderIf>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email: </label>
                        </div>
                        <div className="mt-3">
                            <InputText type="email" style="w-full" id="email" dataId="inputUserEmail" value={values.email} onChange={handleChange} />
                            <FieldError error={errors.email} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password: </label>
                        </div>
                        <div className="mt-3">
                            <InputText type="password" style="w-full" id="password" dataId="inputUserPassword" value={values.password} onChange={handleChange} />
                            <FieldError error={errors.password} />
                        </div>

                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Repeat Password: </label>
                            </div>
                            <div className="mt-3">
                                <InputText type="password" style="w-full" id="passwordMatch" dataId="inputUserConfirmPassword" value={values.passwordMatch} onChange={handleChange} />
                                <FieldError error={errors.passwordMatch} />
                            </div>
                        </RenderIf>

                        <div>
                            <RenderIf condition={newUserState}>
                                <div>
                                    <Button type="submit" style="bg-indigo-800 hover:bg-indigo-500" label="Save" dataId="btnSaveUser" />

                                    <Button type="submit" style="bg-red-800 hover:bg-red-500 mx-2" label="Cancel" dataId="btnCancelUser" onClick={event => setNewUserState(false)} />
                                </div>
                            </RenderIf>

                            <RenderIf condition={!newUserState}>
                                <div>
                                    <Button type="submit" style="bg-indigo-800 hover:bg-indigo-500" label="Login" dataId="btnLogin" />

                                    <Button type="submit" style="bg-yellow-800 hover:bg-yellow-500 mx-2" label="Sign Up" dataId="btnCreateUser" onClick={event => setNewUserState(true)} />
                                </div>
                            </RenderIf>
                        </div>

                    </form>
                </div>

            </div>
        </Template>
    )
}