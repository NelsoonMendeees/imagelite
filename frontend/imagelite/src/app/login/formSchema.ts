import * as Yup from 'yup'

export interface LoginForm {
    name?: string;
    email: string;
    password: string;
    passwordMatch?: string
}

export const validationSchema = Yup.object().shape({
    // name: Yup.string().trim().required('Name is required'),
    email: Yup.string().trim().required('Email is required!').email('Invalid Email!'),
    password: Yup.string().required('Password is required!').min(6, 'Password must have at least 6 characters!'),
    passwordMatch: Yup.string().oneOf([Yup.ref('password')], 'Password must match!')
})

export const formSchema: LoginForm = { email: '', name: '', password: '', passwordMatch: '' }