import React from "react";
import { Formik, Form, Field } from "formik";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
} from '@chakra-ui/react'
import * as client from '../client';
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate()

    const handleLogin = async (values, actions) => {
        const status = await client.login(values)
        actions.setSubmitting(false)
        navigate('/profile')
    }

    return (
        <div className="w-100">
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, actions) => handleLogin(values, actions)}
            >
            {(props) => (
                <Form style={{display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center', gap:'10px'}}>
                    <Field name='username'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.username && form.touched.username}>
                                <FormLabel>Username</FormLabel>
                                <Input {...field} placeholder='adalovelace' />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name='password'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" {...field} placeholder='...' />
                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Button
                        mt={4}
                        colorScheme='pink'
                        isLoading={props.isSubmitting}
                        type='submit'
                    >
                        Login
                    </Button>
                </Form>
            )}
            </Formik>
        </div>
    )
}