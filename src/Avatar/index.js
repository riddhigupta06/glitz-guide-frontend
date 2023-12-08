import { Image, Box, } from "@chakra-ui/react";
import React from "react";

export const influencerAvatars = ['influencer-1', 'influencer-2', 'influencer3', 'influencer-4']
export const followerAvatars = ['follower-1', 'follower-2', 'follower-3', 'follower-4']
export const avatarTitles = ['influencer-1', 'influencer-2', 'influencer3', 'influencer-4', 'follower-1', 'follower-2', 'follower-3', 'follower-4']

const Avatar = ({ title }) => {
    return (
        <Image
            src={require(`./avatars/${title}.jpg`)}
            backgroundColor={'white'}
            alt={title}
            borderRadius='full'
            height={'100%'}
            aspectRatio={1/1}
        />
    )
}

export default Avatar;