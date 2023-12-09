import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Spinner, Heading, Badge, IconButton, Tooltip } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faLink, faPencil } from '@fortawesome/free-solid-svg-icons'
import Avatar from "../Avatar";
import * as client from '../client';
import "./index.css"
import UserReviews from "./UserReviews";
import UpdateProfileForm from "./UpdateProfileForm";

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
                    <div className="profile-box" style={{position:"relative"}}>
                        <IconButton
                            colorScheme='black'
                            variant={'outline'}
                            aria-label='edit profile'
                            size='md'
                            icon={<FontAwesomeIcon icon={faPencil} />}
                            onClick={handleEditButtonClicked}
                            style={{position:'absolute', top:10, right:10}}
                        />
                        {!isEditing ? (
                            <>
                                <div className="left-column">
                                    <div className="avatar-box">
                                        <Avatar title={profile.avatar} />
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
                                    </div> 
                                    <div className="info-box">
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
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{padding:50, paddingTop:60, width:"100%"}}>
                                <UpdateProfileForm profile={profile} handleUpdate={handleUpdate} handleCancel={() => setIsEditing(false)} />
                            </div>
                        )}
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