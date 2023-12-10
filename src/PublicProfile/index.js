import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Heading, Spinner, Badge, Tooltip, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCamera } from "@fortawesome/free-solid-svg-icons";
import "./index.css"
import * as client from "../client";
import Avatar from "../Avatar";


export default function PublicProfile() {
    const [profile, setProfile] = useState(undefined)
    const { userID } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await client.getPublicUserProfile(userID);
            if (res.status === 200) {
                setProfile(res.data)
            } else {
                navigate('/error')
            }
        }

        fetchProfile()

    }, [])

    const getUserRole = (role) => {
        if (role === "follower") {
            return <Badge variant='solid' colorScheme='purple'>Follower</Badge>
        } else {
            return <Badge variant='solid' colorScheme='blue'>Influencer</Badge>
        }
    }

    if (profile) {
        return (
            <Box padding={3}>
                <div className="main-box">
                    <div className="profile-box">
                    <div className="left-column">
                        <div className="avatar-box">
                            <Avatar title={profile.avatar} />
                        </div>
                    </div>
                    <div className="right-column">
                        <div style={{marginTop: 20, display:"flex", flexDirection: "row", justifyContent: "space-between", width:"100%", alignContent:"center", alignItems: "center"}}>
                            <Heading as={'h6'} size={'lg'}>{profile.firstName + ' ' + profile.lastName}'s profile</Heading>
                        </div> 
                        <div className="info-box">
                            <div><strong>Username:</strong> {profile.username}</div>
                            <div><strong>Role:</strong> {getUserRole(profile.role)}</div>
                            {profile.role === "influencer" && (
                                <>
                                    <div><strong>Bio:</strong> {profile.bio}</div>
                                    <div><strong>Social media:</strong></div>
                                    <div style={{display: 'flex', flexDirection: 'row', gap:5}}>
                                        <a href={"https://www.instagram.com/"+profile.instagram} rel="noreferrer" target="_blank">
                                            <Tooltip label="Instagram">
                                                <IconButton
                                                    colorScheme='pink'
                                                    aria-label='instagram'
                                                    size='md'
                                                    icon={<FontAwesomeIcon icon={faCamera} />}
                                                />
                                            </Tooltip>
                                        </a>
                                        <a href={"https://" + profile.website} rel="noreferrer" target="_blank">
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
                    </div>
                </div>
            </Box>
        )
    } else {
        return (
            <Box padding={3}>
                <Heading as={'h6'} size={'lg'}>{'Profile' }</Heading>
                <div className="w-100 d-flex justify-content-center align-content-center" style={{paddingTop:100}}>
                    Loading <Spinner marginLeft={5} />
                </div>
            </Box>
        )
    }
}