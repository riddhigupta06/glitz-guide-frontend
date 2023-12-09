import React, { useEffect, useState } from "react";
import { Center, Spinner, Flex, IconButton } from "@chakra-ui/react";
import * as client from "../client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const UserReviews = ({ username }) => {
    const [reviews, setReviews] = useState(undefined)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchReviews = async () => {
            const data = await client.getUserReviews(username)
            setReviews(data)
        }

        fetchReviews()

    }, [])

    if (reviews === undefined) {
        return (
            <Center>
                Loading... <Spinner />
            </Center>
        )
    } else {
        return (
            <Flex direction={'column'} gap={2} marginTop={5}>
                {reviews.length === 0 ? (
                    <div>You haven't written any reviews!</div>
                ) : (
                    reviews.map((review, idx) => {
                        return (
                            <Flex key={idx} direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
                                <IconButton onClick={() => navigate(`/details/${review.pid}`)} icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}>Open</IconButton>
                                {review.review}
                            </Flex>
                        )
                    })
                )}
            </Flex>
        )
    }
}

export default UserReviews;