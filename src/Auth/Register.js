import React from "react";
import { Formik, Form, Field } from "formik";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    HStack,
    Stack,
    RadioGroup,
    Radio
} from '@chakra-ui/react'

export default function Register() {
    return (
        <div className="w-100">
            <Formik
                initialValues={{ firstName: '', lastName:'', role: 'follower', email:'', username: '', password: '' }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    actions.setSubmitting(false)
                    }, 1000)
                }}
            >
            {(props) => (
                <Form style={{display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center', gap:'20px'}}>
                    <HStack>
                        <Field name='firstName'>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                                    <FormLabel>First name</FormLabel>
                                    <Input {...field} placeholder='Ada' />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='lastName'>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                                    <FormLabel>Last name</FormLabel>
                                    <Input {...field} placeholder='Lovelace' />
                                </FormControl>
                            )}
                        </Field>
                    </HStack>
                    <Field name='email'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                <FormLabel>Email</FormLabel>
                                <Input {...field} placeholder='ada@gmail.com' />
                            </FormControl>
                        )}
                    </Field>
                    <Field name='username'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.username && form.touched.username}>
                                <FormLabel>Username</FormLabel>
                                <Input {...field} placeholder='adalovelace' />
                            </FormControl>
                        )}
                    </Field>
                    <Field name='password'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" {...field} placeholder='...' />
                            </FormControl>
                        )}
                    </Field>
                    <Field name='role'>
                        {({ field, form }) => (
                            <FormControl id={'role'} isInvalid={!!form.errors['role'] && !!form.touched['role']}>
                                <FormLabel htmlFor={'role'}>I am a...</FormLabel>
                                <RadioGroup {...field} id={'role'}>
                                    <Stack spacing={5} direction='row'>
                                        <Radio {...field} colorScheme='purple' value='follower'>
                                            Follower
                                        </Radio>
                                        <Radio {...field} colorScheme='purple' value='influencer'>
                                            Influencer
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        )}
                    </Field>
                    {/* <Field name='role'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.role && form.touched.role}>
                                <FormLabel>Role</FormLabel>
                                <RadioGroup {...field}>
                                    <Stack spacing={5} direction='row'>
                                        <Radio colorScheme='purple' value='follower'>
                                            Follower
                                        </Radio>
                                        <Radio colorScheme='purple' value='influencer'>
                                            Influencer
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        )}
                    </Field> */}
                    <Button
                        mt={4}
                        colorScheme='pink'
                        isLoading={props.isSubmitting}
                        type='submit'
                    >
                        Register
                    </Button>
                </Form>
            )}
            </Formik>
        </div>
    )
}