import React, { useEffect, useState } from "react";
import * as client from '../client';
import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [profile, setProfile] = useState(undefined)
    
    const navigate = useNavigate()

    const fetchAccount = async () => {
        const data = await client.account();
        // setProfile(data)
    }

    const handleLogout = async () => {
        const status = await client.logout()
        sessionStorage.clear()
        navigate('/login')
    }

    useEffect(() => {
        fetchAccount()
    }, [])

    return (
        <Box padding={3}>
            <Heading as={'h6'} size={'lg'}>Profile</Heading>

            <Button colorScheme="pink" onClick={async () => await handleLogout()}>
                Logout
            </Button>

            {profile !== undefined && (
                <div>
                    {JSON.parse(profile)}
                </div>
            )}
        </Box>
    )
}