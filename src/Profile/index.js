import React, { useEffect, useState } from "react";
import * as client from '../client';

export default function Profile() {
    const [profile, setProfile] = useState(undefined)

    const fetchAccount = async () => {
        const data = await client.account();
        // setProfile(data)
    }

    useEffect(() => {
        fetchAccount()
    }, [])

    return (
        <div>
            Profile
            {profile !== undefined && (
                <div>
                    {JSON.parse(profile)}
                </div>
            )}
        </div>
    )
}