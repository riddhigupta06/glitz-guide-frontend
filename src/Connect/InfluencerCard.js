import React from "react";
import { Box, HStack, Text, VStack, Heading, Card, CardBody, CardHeader, Flex, IconButton, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faCamera, faLink, faPlus } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import { useNavigate, Link } from "react-router-dom";

const InlfuencerCard = ({ influencer }) => {

    const navigate = useNavigate();

    return (
        <Card width='md'>
            <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box width={'100px'}>
                        <Avatar title={influencer.avatar} />
                    </Box>
                    <Box>
                        <Heading size='sm'>{influencer.firstName} {influencer.lastName}</Heading>
                        <Text>{influencer.username}</Text>
                    </Box>
                </Flex>
                <IconButton
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='view profile'
                    onClick={() => navigate(`/profile/${influencer.username}`)}
                    icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                />
                </Flex>
            </CardHeader>
            <CardBody height={'100%'}>
                <VStack height={'100%'} justifyContent={'space-between'}>
                    <Text>{influencer.bio}</Text>
                    <VStack width={'100%'}>
                        <Button width={'100%'} colorScheme="pink" variant='solid' leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                            Follow
                        </Button>
                        <HStack width={'100%'}>
                            <Link style={{width:'50%'}} to={`https://www.instagram.com/${influencer.instagram}`} target="_blank">
                                <IconButton
                                    width={'100%'}
                                    variant='solid'
                                    colorScheme='purple'
                                    aria-label='instagram'
                                    icon={<FontAwesomeIcon icon={faCamera} />}
                                />
                            </Link>
                            <Link style={{width:'50%'}} to={'https://'+influencer.website} target="_blank">
                                <IconButton
                                    width={'100%'}
                                    variant='solid'
                                    colorScheme='purple'
                                    aria-label='website'
                                    icon={<FontAwesomeIcon icon={faLink} />}
                                />
                            </Link>
                        </HStack>
                    </VStack>
                </VStack>
            </CardBody>
        </Card>
    )
}

export default InlfuencerCard;