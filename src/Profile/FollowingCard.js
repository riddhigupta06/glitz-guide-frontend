import React from "react";
import { Box, Text, Heading, Card, CardHeader, Flex, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import { useNavigate } from "react-router-dom";

const FollowingCard = ({ user }) => {

    const navigate = useNavigate();
    
    return (
        <Card width='sm'>
            <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box width={'100px'} height={'100px'}>
                        <Avatar title={user.avatar} />
                    </Box>
                    <Box>
                        <Heading size='sm'>{user.firstName} {user.lastName}</Heading>
                        <Text>{user.username}</Text>
                    </Box>
                </Flex>
                <IconButton
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='view profile'
                    onClick={() => navigate(`/profile/${user.username}`)}
                    icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                />
                </Flex>
            </CardHeader>
        </Card>
    )
}

export default FollowingCard;