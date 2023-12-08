import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    HStack,
    Stack,
    RadioGroup,
    Radio,
    Textarea,
    useToast,
    Tooltip,
    IconButton
} from '@chakra-ui/react'
import * as client from '../client'
import * as Yup from 'yup'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    role: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    instagram: Yup.string(),
    website: Yup.string(),
    bio: Yup.string().max(200)
});

export default function Register() {

    const navigate = useNavigate()
    const toast = useToast();

    const handleRegister = async (values, actions) => {
        const res = await client.register(values)
        if (res['status'] === 200) {
            sessionStorage.setItem("user", res.data.username)
            sessionStorage.setItem("role", res.data.username)
            actions.setSubmitting(false)
            navigate('/profile')

        } else if (res['status'] === 400) {
            toast({
                description: "The username already exists. Please choose a different one and try again!",
                title: "Username already taken",
                status: "info"
            })
            actions.setSubmitting(false)
        }
    }

    return (
        <div className="w-100">
            <Formik
                initialValues={{ firstName: '', lastName:'', role: 'follower', email:'', username: '', password: '', instagram: '', website: '', bio: '' }}
                onSubmit={async (values, actions) => await handleRegister(values, actions)}
                validationSchema={SignupSchema}
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
                    {props.values.role === "influencer" && (
                        <>
                            <Field name='instagram'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.instagram && form.touched.instagram}>
                                        <HStack marginBottom={2} justifyContent={'flex-start'} alignItems={'flex-start'}>
                                            <FormLabel>Instagram</FormLabel>
                                            <Tooltip label='Your instagram handle' fontSize='md'>
                                                <IconButton variant={'outline'} color="black" size={'xs'} icon={<FontAwesomeIcon icon={faInfo} />} />
                                            </Tooltip>
                                        </HStack>
                                        <Input {...field} placeholder='adafinsta' />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='website'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.website && form.touched.website}>
                                        <FormLabel>Website</FormLabel>
                                        <Input {...field} placeholder='www.adabeauty.com' />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='bio'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.bio && form.touched.bio}>
                                        <FormLabel>Bio</FormLabel>
                                        <Textarea  {...field} placeholder='You short bio goes here!' />
                                    </FormControl>
                                )}
                            </Field>
                        </>
                    )}
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