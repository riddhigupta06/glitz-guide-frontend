import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Center, HStack, Text, Heading, VStack, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SearchSnippet from "../Search/SearchSnippet";
import ConnectSnippet from "../Connect/ConnectSnippet";
import UserDiscussions from "../Profile/UserDiscussions";
import UserReviews from "../Profile/UserReviews";
import AnonymousInlfuencerCard from "../Connect/AnonymousInfluencerCard";
import * as client from "../client";

export default function Home() {
    const user = sessionStorage.getItem("user")
    const role = sessionStorage.getItem("role")
    
    const [following, setFollowing] = useState([]);
    
    useEffect(() => {
        const fetchFollowing = async () => {
            if (user !== null && user !== 'null' && user !== undefined && role === 'follower') {
                const res = await client.getFollowing(user)
                if (res.status === 200) {
                    setFollowing(res.data);
                }
            }
        }

        fetchFollowing();
    })

    const navigate = useNavigate();

    const getHeading = () => {
        if (user === null || user === 'null' || user === undefined) {
            return 'Glitz Guide 💄'
        } else {
            return  `Welcome ${user}!`
        }
    }

    const getSubheading = () => {
        if (user === null || user === 'null' || user === undefined) {
            return 'Your beauty journey begins here.'
        } else {
            return  ''
        }
    }

    return (
        <Box>
            <Center marginBottom={7} height={'400px'} width={'100%'} backgroundImage={require('./images/makeupbg.png')} backgroundRepeat={'repeat'} backgroundColor={'pink'}>
                <VStack  padding={10} backgroundColor={'black'}>
                <Heading color={'#D58AB0'} as={'h1'} size={'4xl'}>{getHeading()}</Heading>
                    <Heading color={'#D58AB0'} as={'h6'} size={'xl'} fontWeight={300}>{getSubheading()}</Heading>
                </VStack>
            </Center>
            <HStack>
                <Box width={'50%'} alignSelf={'flex-start'}>
                    <SearchSnippet />
                </Box>
                <Box width={'50%'} alignSelf={'flex-start'}>
                    {user === null || user === undefined || user === 'null' ? (
                        <ConnectSnippet />
                    ) : role === 'influencer' ? (
                        <Box padding={3} width={'100%'} alignItems={'flex-start'}>
                            <Box marginBottom={5}>
                                <HStack width={'100%'}>
                                    <Heading as={'h6'} size={'md'}>My discussion posts</Heading>
                                    <IconButton
                                        variant='ghost'
                                        colorScheme='gray'
                                        aria-label='connect'
                                        onClick={() => navigate(`/discuss`)}
                                        icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                                    />
                                </HStack>
                                <UserDiscussions username={user} />
                            </Box>

                            <Box marginBottom={5}>
                                <Heading as={'h6'} size={'md'}>My reviews</Heading>
                                <UserReviews username={user} />
                            </Box>
                        </Box>
                    ) : (
                        <Box padding={3}>
                            <HStack width={'100%'}>
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
                                <Text>
                                    You don't follow anyone right now!
                                </Text>
                            ) : (
                                <div className="p-2 gap-3 row flex-row flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                                    {following.map((influencer, idx) => {
                                        return (
                                            <AnonymousInlfuencerCard key={idx} influencer={influencer} />
                                        )
                                    })}
                                </div>
                            )}
                            
                        </Box>
                    )}
                </Box>
            </HStack>
            <Center height={'100px'} />
        </Box>
    )
}