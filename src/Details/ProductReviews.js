import React, { useEffect, useState } from "react"
import { Flex, ListItem, UnorderedList, Heading, Box, Button, Textarea } from "@chakra-ui/react";
import * as client from "../client"

const ProductReviews = ({ productID }) => {
    const [reviews, setReviews] = useState(undefined);
    const [newReview, setNewReview] = useState('')
    const username = sessionStorage.getItem("user")
    const role = sessionStorage.getItem("role")

    useEffect(() => {
        const fetchReviews = async () => {
            const data = await client.getProductReviews(productID)
            setReviews(data)
        }

        fetchReviews()
    }, [])

    const isInfluencer = () => {
        return username !== null && username !== 'null' && username !== undefined && role === 'influencer'
    }

    const addReview = async () => {
        if (newReview !== '') {
            const review = {pid: productID, username: username, review: newReview}
            const res = await client.createReview(review)
            setReviews([review, ...reviews])
            setNewReview('')
        }
    }

    return (
        <Box marginTop={3}>
            <Heading as={'h6'} size={'md'}>Reviews</Heading>
            {isInfluencer() && (
                <Flex direction={'column'} gap={5} marginTop={5}>
                    <Box flex={1}>
                        <Textarea resize={'vertical'} placeholder="Write your review here..." value={newReview} onChange={(e) => setNewReview(e.target.value)} />
                    </Box>
                    <Box>
                        <Button onClick={async () => await addReview()}>Comment</Button>
                    </Box>
                </Flex>
            )}
            {reviews !== undefined && (
                <UnorderedList>
                    {reviews.map((review, idx) => {
                        return (
                            <ListItem key={idx}>{review.review} | {review.username} | {review.pid} </ListItem>
                        )
                    })}
                </UnorderedList>
            )}
        </Box>
    )
}

export default ProductReviews;