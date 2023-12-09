import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, IconButton, Tooltip, HStack, FormControl, FormLabel, RadioGroup, Radio, Stack, Input, Textarea } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import Avatar from "../Avatar"

const UpdateProfileForm = ({ 
    profile,
    handleUpdate,
    handleCancel 
}) => {
    return (
        <Formik
            initialValues={{ avatar: profile.avatar, username: profile.username, role: profile.role, firstName: profile.firstName, lastName: profile.lastName, email: profile.email, password: profile.password, instagram: profile.instagram, website: profile.website, bio: profile.bio }}
            onSubmit={async (values, actions) => await handleUpdate(values, actions)}
        >
        {(props) => (
            <Form style={{display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center', gap:'20px', backgroundColor: "white", padding:20, borderRadius:10, width:'100%'}}>
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
                <HStack>
                    <Field name='email'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                <FormLabel>Email</FormLabel>
                                <Input {...field} placeholder='ada@gmail.com' />
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
                </HStack>
                <HStack>
                    <Field name='username'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.username && form.touched.username} isDisabled={true}>
                                <FormLabel>Username</FormLabel>
                                <Input {...field} placeholder='adalovelace' />
                            </FormControl>
                        )}
                    </Field>
                    <Field name='role'>
                        {({ field, form }) => (
                            <FormControl id={'role'} isInvalid={!!form.errors['role'] && !!form.touched['role']} isDisabled={true}>
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
                </HStack>
                <Field name='avatar'>
                        {({ field, form }) => (
                            <FormControl id={'avatar'} isInvalid={!!form.errors['avatar'] && !!form.touched['avatar']}>
                                <FormLabel htmlFor={'avatar'}>Avatar</FormLabel>
                                <RadioGroup {...field} id={'avatar'}>
                                    <Stack spacing={5} direction='row'>
                                        <Radio {...field} colorScheme='purple' value={props.values.role+'-1'}>
                                            <Box width={100}>
                                                <Avatar title={`${props.values.role}-1`} />
                                            </Box>
                                        </Radio>
                                        <Radio {...field} colorScheme='purple' value={props.values.role+'-2'}>
                                            <Box width={100}>
                                                <Avatar title={`${props.values.role}-2`} />
                                            </Box>
                                        </Radio>
                                        <Radio {...field} colorScheme='purple' value={props.values.role+'-3'}>
                                            <Box width={100}>
                                                <Avatar title={`${props.values.role}-3`} />
                                            </Box>
                                        </Radio>
                                        <Radio {...field} colorScheme='purple' value={props.values.role+'-4'}>
                                            <Box width={100}>
                                                <Avatar title={`${props.values.role}-4`} />
                                            </Box>
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        )}
                    </Field>
                {props.values.role === "influencer" && (
                    <>
                        <HStack>
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
                                        <HStack marginBottom={2} justifyContent={'flex-start'} alignItems={'flex-start'}>
                                            <FormLabel>Website</FormLabel>
                                            <Tooltip label='Your website' fontSize='md'>
                                                <IconButton variant={'outline'} color="black" size={'xs'} icon={<FontAwesomeIcon icon={faInfo} />} />
                                            </Tooltip>
                                        </HStack>
                                        <Input {...field} placeholder='www.adabeauty.com' />
                                    </FormControl>
                                )}
                            </Field>
                        </HStack>
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
                <HStack width={'100%'}>
                    <Button
                        width={'100%'}
                        colorScheme='pink'
                        isLoading={props.isSubmitting}
                        type='submit'
                    >
                        Update
                    </Button>
                    <Button
                        width={'100%'}
                        variant={'outline'}
                        colorScheme='pink'
                        isLoading={props.isSubmitting}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </HStack>
            </Form>
        )}
        </Formik>
    )
}

export default UpdateProfileForm;