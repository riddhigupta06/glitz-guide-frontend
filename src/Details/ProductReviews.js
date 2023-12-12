import React, { useEffect, useState } from "react"
import { Flex, Heading, Box, Button, Textarea, Text, HStack, VStack, Center, Divider } from "@chakra-ui/react";
import * as client from "../client"
import Avatar from "../Avatar";
import { NavLink } from "react-router-dom";

const ProductReviews = ({ productID }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');

    const [isEditing, setIsEditing] = useState(false)
    const [editedReview, setEditedReview] = useState({})

    const username = sessionStorage.getItem("user")
    const role = sessionStorage.getItem("role")

    const fetchReviews = async () => {
        const data = await client.getProductReviews(productID)
        setReviews(data)
    }

    useEffect(() => {
        fetchReviews()
    
    // eslint-disable-next-line
    }, [])

    const isInfluencer = () => {
        return username !== null && username !== 'null' && username !== undefined && role === 'influencer'
    }

    const addReview = async () => {
        if (newReview !== '') {
            const review = {pid: productID, username: username, review: newReview}
            await client.createReview(review)
            // setReviews([review, ...reviews])
            await fetchReviews()
            setNewReview('')
        }
    }

    const handleDeleteReview = async (reviewID) => {
        await client.deleteReview(reviewID)
        setReviews(reviews.filter(r => r._id !== reviewID))
    }

    const handleEditReview = (review) => {
        setIsEditing(true)
        console.log(review, review._id)
        setEditedReview(review)
    }

    const handleCancelUpdateReview = () => {
        setIsEditing(false)
        setEditedReview({})
    } 

    const updateReview = async (review) => {
        await client.updateReview(review._id, review)
        // setReviews(reviews.map((r) => r._id === review._id ? review : r))
        await fetchReviews()
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
                        <Button colorScheme="pink" onClick={async () => await addReview()}>Comment</Button>
                    </Box>
                </Flex>
            )}
            {reviews !== undefined && (
                <>
                    <Divider />
                    <Flex direction={'column'} gap={4} marginTop={7}>
                        {reviews.map((review, idx) => {

                            const isAuthor = review.username === username;

                            return (
                                <HStack key={idx} gap={5}>
                                    <VStack>
                                        <Center width={'50px'}>
                                            <Avatar title={review.avatar} />
                                        </Center>
                                        <Text color={'darkblue'}><NavLink to={`/profile/${review.username}`}><strong>{review.username}</strong></NavLink></Text>
                                    </VStack>
                                    <VStack gap={0} width={'100%'} justifyContent={'flex-start'} alignItems={'flex-start'} padding={5} style={{minHeight:'100px', backgroundColor: "#F2F2F2", borderRadius:10 }}>
                                        <Text margin={0} style={{ fontWeight:700 }}>{review.firstName} {review.lastName}</Text>
                                        <HStack paddingTop={5} flex={1} style={{justifyContent:'space-between', alignItems:'flex-start', width:'100%'}}>
                                            {isAuthor && isEditing && review._id === editedReview._id ? (
                                                <Flex width={'100%'} direction={'column'} gap={5}>
                                                    <Box flex={1}>
                                                        <Textarea backgroundColor={'white'} resize={'vertical'} placeholder="Write your review here..." value={editedReview.review} onChange={(e) => setEditedReview({...editedReview, review:e.target.value})} />
                                                    </Box>
                                                    <HStack padding={1}>
                                                        <Button colorScheme="pink" onClick={async () => await updateReview(editedReview)}>Update</Button>
                                                        <Button colorScheme="pink" variant={'outline'} onClick={handleCancelUpdateReview}>Cancel</Button>
                                                    </HStack>
                                                </Flex>
                                            ) : (
                                                <Text paddingTop={5}>{review.review}</Text>
                                            )}
                                            {isAuthor && (
                                                <HStack paddingTop={5}>
                                                    <Button isDisabled={isEditing} colorScheme="yellow" onClick={() => handleEditReview(review)}>Edit</Button>
                                                    <Button isDisabled={isEditing} colorScheme="red" onClick={async () => await handleDeleteReview(review._id)}>Delete</Button>
                                                </HStack>
                                            )}
                                        </HStack>
                                    </VStack>
                                    
                                </HStack>
                            )
                        })}
                    </Flex>
                </>
            )}
        </Box>
    )
}

export default ProductReviews;