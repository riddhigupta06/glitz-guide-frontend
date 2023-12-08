import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import * as client from '../client';
import "./index.css"
import { Box, Button, Spinner, Heading, Badge, IconButton } from "@chakra-ui/react";

export default function Profile() {
    const [profile, setProfile] = useState(undefined)
    
    const navigate = useNavigate()

    const fetchAccount = async () => {
        const data = await client.account();
        console.log(data)
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
                <div className="profile-box">
                    <div className="left-column">
                        <div className="avatar-box">
                            avatar
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
                            />
                        </div>  
                        <div className="info-box">
                            <div><strong>Username:</strong> {profile.username}</div>
                            <div><strong>First name:</strong> {profile.firstName}</div>
                            <div><strong>Last name:</strong> {profile.lastName}</div>
                            <div><strong>Email:</strong> {profile.email}</div>
                            <div><strong>Role:</strong> {getUserRole(profile.role)}</div>
                        </div>
                    </div>
                </div>
            )}
        </Box>
    )
}