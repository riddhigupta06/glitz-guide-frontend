import React, { useEffect, useState } from "react"
import { Flex, Heading, Box, Button, Textarea, Text } from "@chakra-ui/react";
import * as client from "../client"
import { Navigate } from "react-router-dom";

const ProductReviews = ({ productID }) => {
    const [reviews, setReviews] = useState(undefined);
    const [newReview, setNewReview] = useState('');

    const [isEditing, setIsEditing] = useState(false)
    const [editedReview, setEditedReview] = useState({})

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

    const handleDeleteReview = async (reviewID) => {
        const res = await client.deleteReview(reviewID)
        setReviews(reviews.filter(r => r._id !== reviewID))
    }

    const handleEditReview = (review) => {
        setIsEditing(true)
        setEditedReview(review)
    }

    const handleCancelUpdateReview = () => {
        setIsEditing(false)
        setEditedReview({})
    } 

    const updateReview = async (review) => {
        const res = await client.updateReview(review._id, review)
        setReviews(reviews.map((r) => r._id === review._id ? review : r))
        setIsEditing(false)
        setEditedReview({})
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
                <Flex direction={'column'} gap={2} marginTop={5}>
                    {reviews.map((review, idx) => {

                        const isAuthor = review.username === username;

                        return (
                            <Flex flexDirection={'column'} key={idx} style={{backgroundColor: "#F2F2F2", width:"100%", padding:10, borderRadius:10}}>
                                <Text style={{paddingLeft:20}}><a href={`/profile/${review.username}`}><strong>{review.username}</strong></a></Text>
                                {isAuthor && isEditing && review._id === editedReview._id ? (
                                    <Flex direction={'column'} gap={5} marginTop={5}>
                                        <Box flex={1}>
                                            <Textarea resize={'vertical'} placeholder="Write your review here..." value={editedReview.review} onChange={(e) => setEditedReview({...editedReview, review:e.target.value})} />
                                        </Box>
                                        <Box>
                                            <Button onClick={async () => await updateReview(editedReview)}>Update</Button>
                                            <Button variant={'outline'} onClick={handleCancelUpdateReview}>Cancel</Button>
                                        </Box>
                                    </Flex>
                                ) : (
                                    <Text style={{paddingLeft:20}}>{review.review}</Text>
                                )}
                                {isAuthor && (
                                    <Box>
                                        <Button isDisabled={isEditing} colorScheme="yellow" onClick={() => handleEditReview(review)}>Edit</Button>
                                        <Button colorScheme="red" onClick={async () => await handleDeleteReview(review._id)}>Delete</Button>
                                    </Box>
                                )}
                            </Flex>
                        )
                    })}
                </Flex>
            )}
        </Box>
    )
}

export default ProductReviews;