import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Heading, Spinner } from "@chakra-ui/react";
import * as client from "../client";
import InlfuencerCard from "./InfluencerCard";

export default function Connect() {
    const [influencers, setInfluencers] = useState(undefined)

    useEffect(() => {
        const fetchInfluencers = async () => {
            const data = await client.getAllInfluencers();
            console.log(data)
            setInfluencers(data)
        }

        fetchInfluencers();

    }, [])

    if (influencers) {
        return (
            <Box padding={3}>
                <Heading as={'h6'} size={'lg'}>Connect with influencers</Heading>
                {influencers.length === 0 ? (
                    <Text>Oops! There are no registered influencers for you to follow!</Text>
                ) : (
                    <VStack marginTop={10} alignItems={'flex-start'} justifyContent={'center'}>
                        {influencers.map((influencer, idx) => {
                            return (
                                <InlfuencerCard key={idx} influencer={influencer} />
                            )
                        })}
                    </VStack>
                )}
            </Box>
        )
    } else {
        return (
            <Box padding={3}>
                <div className="w-100 d-flex justify-content-center align-content-center" style={{paddingTop:100}}>
                    Loading <Spinner marginLeft={5} />
                </div>
            </Box>
        )
    }

};