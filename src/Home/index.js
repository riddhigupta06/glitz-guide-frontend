import React from "react";
import { Box, Center, HStack, Heading, VStack } from "@chakra-ui/react";
import SearchSnippet from "../Search/SearchSnippet";
import ConnectSnippet from "../Connect/ConnectSnippet";

export default function Home() {

    const user = sessionStorage.getItem("user")

    const getHeading = () => {
        if (user === null || user === 'null' || user === undefined) {
            return 'Glitz Guide 💄'
        } else {
            return  `Welcome ${user}!`
        }
    }

    const getSubheading = () => {
        if (user === null || user === 'null' || user === undefined) {
            return 'Your beauty journey begins here.'
        } else {
            return  ''
        }
    }

    return (
        <Box>
            <Center marginBottom={7} height={'400px'} width={'100%'} backgroundImage={require('./images/makeupbg.png')} backgroundRepeat={'repeat'} backgroundColor={'pink'}>
                <VStack  padding={10} backgroundColor={'black'}>
                <Heading color={'#D58AB0'} as={'h1'} size={'4xl'}>{getHeading()}</Heading>
                    <Heading color={'#D58AB0'} as={'h6'} size={'xl'} fontWeight={300}>{getSubheading()}</Heading>
                </VStack>
            </Center>
            <HStack>
                <Box width={'50%'} alignSelf={'flex-start'}>
                    <SearchSnippet />
                </Box>
                <Box width={'50%'} alignSelf={'flex-start'}>
                    <ConnectSnippet />
                </Box>
            </HStack>
            <Center height={'100px'} />
        </Box>
    )
}