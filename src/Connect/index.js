import React, { useEffect, useState } from "react";
import { Box, Text, Heading, Spinner, useToast } from "@chakra-ui/react";
import * as client from "../client";
import InlfuencerCard from "./InfluencerCard";

export default function Connect() {
    const [influencers, setInfluencers] = useState(undefined)
    const [following, setFollowing] = useState([])
    const toast = useToast();

    const user = sessionStorage.getItem('user')

    useEffect(() => {
        const fetchInfluencers = async () => {
            const data = await client.getAllInfluencers();
            setInfluencers(data)
        }

        const fetchFollowing = async () => {
            const res = await client.getFollowing(user);
            if (res.status === 200) {
                console.log(res.data)
                setFollowing(res.data)
            } else {
                toast({
                    title: 'Error in fetching your following',
                    description: 'We ran into an error when trying to fetch your following! Please try again.',
                    status: 'error',
                })
            }
        }

        fetchInfluencers();
        fetchFollowing()

    }, [])
    
    const handleFollowClicked = async (influencerUsername) => {
        const status = await client.followInfluencer(influencerUsername);
        setFollowing([...following, influencerUsername])
    }

    const handleUnfollowClicked = async (influencerUsername) => {
        const status = await client.unfollowInfluencer(influencerUsername);
        setFollowing(following.filter((f) => f !== influencerUsername))
    }

    if (influencers) {
        return (
            <Box padding={3}>
                <Heading as={'h6'} size={'lg'}>Connect with influencers</Heading>
                {influencers.length === 0 ? (
                    <Text>Oops! There are no registered influencers for you to follow!</Text>
                ) : (
                    <div className="p-2 gap-3 row flex-row flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        {influencers.map((influencer, idx) => {
                            return (
                                <InlfuencerCard key={idx} influencer={influencer} handleFollowClicked={handleFollowClicked} handleUnfollowClicked={handleUnfollowClicked} following={following} />
                            )
                        })}
                    </div>
                )}
            </Box>
        )
    } else {
        return (
            <Box padding={3}>
                <div className="w-100 d-flex justify-content-center align-content-center" style={{paddingTop:100}}>
                    Loading <Spinner marginLeft={5} />
                </div>
            </Box>
        )
    }

};