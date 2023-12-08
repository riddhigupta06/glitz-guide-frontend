import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Box, Button, Spinner, Heading, Badge, IconButton, Tooltip, HStack, FormControl, FormLabel, RadioGroup, Radio, Stack, Input, Textarea } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faLink, faPencil, faInfo } from '@fortawesome/free-solid-svg-icons'
import Avatar from "../Avatar";
import * as client from '../client';
import "./index.css"
import UserReviews from "./UserReviews";

export default function Profile() {
    const [profile, setProfile] = useState(undefined)
    const [isEditing, setIsEditing] = useState(false)
    
    const navigate = useNavigate()

    const fetchAccount = async () => {
        const data = await client.account();
        setProfile(data)
    }

    const handleLogout = async () => {
        const status = await client.logout()
        sessionStorage.clear()
        navigate('/login')
    }

    const getUserRole = (role) => {
        if (role === "follower") {
            return <Badge variant='solid' colorScheme='purple'>Follower</Badge>
        } else {
            return <Badge variant='solid' colorScheme='blue'>Influencer</Badge>
        }
    }

    const handleEditButtonClicked = () => {
        setIsEditing(!isEditing)
    }

    const handleUpdate = async (values, actions) => {
        const data = await client.updateUser(values)
        setProfile(data)
        setIsEditing(false)
    }

    useEffect(() => {
        fetchAccount()
    }, [])

    return (
        <Box padding={3}>
            <Heading as={'h6'} size={'lg'}>Profile</Heading>

            {profile === undefined ? (
                <div className="w-100 d-flex justify-content-center align-content-center" style={{paddingTop:100}}>
                    Loading <Spinner marginLeft={5} />
                </div>
            ) : (
                <div className="main-box">
                    <div className="profile-box">
                        <div className="left-column">
                            <div className="avatar-box">
                                <Avatar title="influencer-2" />
                            </div>
                            <div className="logout-button">
                                <Button colorScheme="pink" width={"100%"} onClick={async () => await handleLogout()}>
                                    Logout
                                </Button>
                            </div>
                        </div>
                        <div className="right-column">
                            <div style={{marginTop: 20, display:"flex", flexDirection: "row", justifyContent: "space-between", width:"100%", alignContent:"center", alignItems: "center"}}>
                                <Heading as={'h6'} size={'lg'}>My info</Heading>
                                <IconButton
                                    colorScheme='black'
                                    variant={'outline'}
                                    aria-label='edit profile'
                                    size='md'
                                    icon={<FontAwesomeIcon icon={faPencil} />}
                                    onClick={handleEditButtonClicked}
                                />
                            </div> 
                            <div className="info-box">
                                {isEditing ? (
                                    <>
                                        <Formik
                                            initialValues={{ username: profile.username, role: profile.role, firstName: profile.firstName, lastName: profile.lastName, email: profile.email, password: profile.password, instagram: profile.instagram, website: profile.website, bio: profile.bio }}
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
                                                        onClick={() => setIsEditing(false)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </HStack>
                                            </Form>
                                        )}
                                        </Formik>
                                    </>
                                ) : (
                                    <>
                                        <div><strong>Username:</strong> {profile.username}</div>
                                        <div><strong>Name:</strong> {profile.firstName} {profile.lastName}</div>
                                        <div><strong>Email:</strong> {profile.email}</div>
                                        <div><strong>Role:</strong> {getUserRole(profile.role)}</div>
                                        {profile.role === "influencer" && (
                                            <>
                                                <div><strong>Bio:</strong> {profile.bio}</div>
                                                <div style={{display: 'flex', flexDirection: 'row', gap:5}}>
                                                    <a href={"https://www.instagram.com/"+profile.instagram} target="_blank">
                                                        <Tooltip label="Instagram">
                                                            <IconButton
                                                                colorScheme='pink'
                                                                aria-label='instagram'
                                                                size='md'
                                                                icon={<FontAwesomeIcon icon={faCamera} />}
                                                            />
                                                        </Tooltip>
                                                    </a>
                                                    <a href={"https://" + profile.website} target="_blank">
                                                        <Tooltip label="Website">
                                                            <IconButton
                                                                colorScheme='pink'
                                                                aria-label='website'
                                                                size='md'
                                                                icon={<FontAwesomeIcon icon={faLink} />}
                                                            />
                                                        </Tooltip>
                                                    </a>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {profile.role === "influencer" && (
                        <div className="reviews-box">
                            <Heading as={'h6'} size={'md'}>My Reviews</Heading>
                            <UserReviews username={profile.username} />
                        </div>
                    )}
                </div>
            )}
        </Box>
    )
}