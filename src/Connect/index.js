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
                    <div className="p-2 gap-3 row flex-row flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        {influencers.map((influencer, idx) => {
                            return (
                                <InlfuencerCard key={idx} influencer={influencer} />
                            )
                        })}
                    </div>
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