import React, { useEffect, useState } from "react";
import { Center, Spinner, Flex, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import * as client from "../client";

const UserDiscussions = ({ username }) => {
    const [discussions, setDiscussions] = useState(undefined)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDiscussions = async () => {
            const data = await client.getUserPosts(username)
            setDiscussions(data)
        }

        fetchDiscussions()

    // eslint-disable-next-line
    }, [])

    if (discussions === undefined) {
        return (
            <Center>
                Loading... <Spinner />
            </Center>
        )
    } else {
        return (
            <Flex direction={'column'} gap={2}>
                {discussions.length === 0 ? (
                    <div>You haven't written any discussion posts! Write some posts <Link style={{color:'purple', fontWeight:600}} to={'/discuss'}>here.</Link></div>
                ) : (
                    discussions.map((discussion, idx) => {
                        return (
                            <Flex key={idx} direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
                                <IconButton onClick={() => navigate(`/discuss`)} icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}>Open</IconButton>
                                {discussion.title}
                            </Flex>
                        )
                    })
                )}
            </Flex>
        )
    }
}

export default UserDiscussions;