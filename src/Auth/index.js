import React from "react";
import { Box, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react';
import Login from "./Login";
import Register from "./Register";

export default function Auth() {

    return (
        <Box padding={3} width={'100%'} display={'flex'} justifyContent={'center'} alignContent={'center'}>
            <Tabs colorScheme="pink" isFitted variant='soft-rounded' style={{width:'50%', borderRadius:'5px'}}>
                <TabList>
                    <Tab><strong>Login</strong></Tab>
                    <Tab><strong>Register</strong></Tab>
                </TabList>
                <TabPanels marginTop={'20px'}>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Register />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
};