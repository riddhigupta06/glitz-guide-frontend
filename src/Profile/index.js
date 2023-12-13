import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, Spinner, Heading, Badge, IconButton, Tooltip, useToast, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faLink, faPencil, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import Avatar from "../Avatar";
import * as client from '../client';
import "./index.css"
import UserReviews from "./UserReviews";
import UpdateProfileForm from "./UpdateProfileForm";
import FollowingCard from './FollowingCard';
import UserDiscussions from "./UserDiscussions";

export default function Profile() {
    const [profile, setProfile] = useState(undefined)
    const [isEditing, setIsEditing] = useState(false)
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
    const toast = useToast();
    
    const navigate = useNavigate()

    const handleLogout = async () => {
        await client.logout()
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
        const fetchFollowing = async (username) => {
            const res = await client.getFollowing(username);
            if (res.status === 200) {
                setFollowing(res.data)
            } else {
                toast({
                    title: 'Error in fetching your following',
                    description: 'We ran into an error when trying to fetch your following! Please try again.',
                    status: 'error',
                })
            }
        }

        const fetchFollowers = async (username) => {
            const res = await client.getFollowers(username);
            if (res.status === 200) {
                setFollowers(res.data)
            } else {
                toast({
                    title: 'Error in fetching your followers',
                    description: 'We ran into an error when trying to fetch your followers! Please try again.',
                    status: 'error',
                })
            }
        }

        const fetchAccount = async () => {
            const data = await client.account();
            fetchFollowing(data.username)
            fetchFollowers(data.username)
            setProfile(data)
        }

        fetchAccount()
    
    // eslint-disable-next-line
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
                            </>
                        ) : (
                            <HStack alignSelf={'flex-start'} style={{padding:50, paddingTop:60, width:"100%"}}>
                                <UpdateProfileForm profile={profile} handleUpdate={handleUpdate} handleCancel={() => setIsEditing(false)} />
                            </HStack>
                        )}
                    </div>
                    <div className="reviews-box">
                        {profile.role === "influencer" && (
                            <>
                            <Box marginBottom={5}>
                                <Heading as={'h6'} size={'md'}>My reviews</Heading>
                                <UserReviews username={profile.username} />
                            </Box>
                            <Box marginBottom={5}>
                                <HStack width={'100%'} justifyContent={'space-between'}>
                                    <Heading as={'h6'} size={'md'}>My discussion posts</Heading>
                                    <IconButton
                                        variant='ghost'
                                        colorScheme='gray'
                                        aria-label='connect'
                                        onClick={() => navigate(`/discuss`)}
                                        icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                                    />
                                </HStack>
                                <UserDiscussions username={profile.username} />
                            </Box>
                            
                            <Box marginBottom={5}>
                                <HStack width={'100%'} justifyContent={'space-between'}>
                                    <Heading as={'h6'} size={'md'}>My followers</Heading>
                                </HStack>
                                {followers.length === 0 ? (
                                    <div>
                                        You don't have any followers right now!
                                    </div>
                                ) : (
                                    <div className="p-2 gap-3 row flex-row flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                                        {followers.map((follower, idx) => {
                                            return (
                                                <FollowingCard key={idx} user={follower} />
                                            )
                                        })}
                                    </div>
                                )}
                            </Box>
                            </>
                        )}
                        <Box>
                            <HStack width={'100%'} justifyContent={'space-between'}>
                                <Heading as={'h6'} size={'md'}>My following</Heading>
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='connect'
                                    onClick={() => navigate(`/connect`)}
                                    icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                                />
                            </HStack>
                            {following.length === 0 ? (
                                <div>
                                    You don't follow anyone right now. <Link to={'/connect'} style={{color:'purple', fontWeight:600}}>Connect with other influencers.</Link>
                                </div>
                            ) : (
                                <div className="p-2 gap-3 row flex-row flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                                    {following.map((influencer, idx) => {
                                        return (
                                            <FollowingCard key={idx} user={influencer} />
                                        )
                                    })}
                                </div>
                            )}
                        </Box>
                    </div>
                </div>
            )}
        </Box>
    )
}