import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AnonymousInlfuencerCard from './AnonymousInfluencerCard';
import * as client from '../client'

const ConnectSnippet = () => {
    const [influencers, setInfluencers] = useState([]);

    useEffect(() => {
        const fetchInfluencers = async () => {
            const data = await client.getAllInfluencers();
            setInfluencers(data)
        }

        fetchInfluencers();
        
    }, [])

    if (influencers.length === 0) {
        return (
            <Box></Box>
        )
    } else {
        return (
            <Box padding={3}>
                <Heading as={'h6'} size={'lg'}>Connect with influencers</Heading>
                <div className="p-2 gap-3 row flex-row flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                    {influencers.map((influencer, idx) => {
                        return (
                            <AnonymousInlfuencerCard key={idx} influencer={influencer} />
                        )
                    })}
                </div>
            </Box>
        )
    }
}

export default ConnectSnippet;