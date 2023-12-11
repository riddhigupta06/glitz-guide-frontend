import React from "react";
import { Card, CardHeader, Flex, Box, IconButton, Text, Heading } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import { useNavigate } from "react-router-dom";

const AnonymousInlfuencerCard = ({
    influencer
}) => {

    const navigate = useNavigate()

    return (
        <Card width='xs'>
            <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box width={'80px'} height={'80px'}>
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
        </Card>
    )
}

export default AnonymousInlfuencerCard;