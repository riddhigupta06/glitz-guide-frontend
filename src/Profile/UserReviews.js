import React, { useEffect, useState } from "react";
import { Center, Spinner, Flex, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import * as client from "../client";

const UserReviews = ({ username }) => {
    const [reviews, setReviews] = useState(undefined)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchReviews = async () => {
            const data = await client.getUserReviews(username)
            setReviews(data)
        }

        fetchReviews()

    // eslint-disable-next-line
    }, [])

    if (reviews === undefined) {
        return (
            <Center>
                Loading... <Spinner />
            </Center>
        )
    } else {
        return (
            <Flex direction={'column'} gap={2}>
                {reviews.length === 0 ? (
                    <div>You haven't written any reviews! Review products <Link style={{color:'purple', fontWeight:600}} to={'/search'}>here.</Link></div>
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