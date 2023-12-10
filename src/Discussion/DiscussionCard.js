import { Card, CardBody, CardHeader, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import * as client from "../client";
import Avatar from "../Avatar";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Center, Box, Heading, HStack } from "@chakra-ui/react";
import EditDiscussion from "./EditDiscussion";
const DiscussionCard = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currPost, setPost] = useState(post);
  const handleEditButtonClicked = () => {
    setIsEditing(!isEditing);
  };
  const username = sessionStorage.getItem("user");
  const handleUpdate = async (values, actions) => {
    console.log(values);
    const p = {
      username: post.username,
      title: values.title,
      body: values.body,
    };
    const data = await client.updatePost(currPost._id, p);
    setPost(p);
    setIsEditing(false);
  };
  return (
    <Card>
      <HStack alignItems="start" gap={5}>
        <Box>
          <CardHeader>
            <Box width={"100px"}>
              <VStack paddingLeft={9}>
                <Center width={"150px"}>
                  <Avatar title={post.avatar} />
                </Center>
                <Center>
                  <Text color={"darkblue"}>
                    <NavLink to={`/profile/${post.username}`}>
                      <HStack>
                        <strong>{post.firstName}</strong>
                        <strong>{post.lastName}</strong>
                      </HStack>
                    </NavLink>
                  </Text>
                </Center>
              </VStack>
            </Box>
            <br />
          </CardHeader>
        </Box>
        {!isEditing ? (
          <>
            <Box>
              <VStack>
                <CardBody>
                  <Heading size="md">{currPost.title}</Heading>
                  <Text>{currPost.body}</Text>
                </CardBody>
              </VStack>
            </Box>
          </>
        ) : (
          <div style={{ width: "80%" }}>
            <EditDiscussion post={currPost} handleUpdate={handleUpdate} />
          </div>
        )}
        
        {username == post.username ? (
        <Box>
          <IconButton
            colorScheme="black"
            variant={"outline"}
            aria-label="edit profile"
            size="md"
            icon={<FontAwesomeIcon icon={faPencil} />}
            onClick={handleEditButtonClicked}
            style={{ position: "absolute", top: 10, right: 10 }}
          />
        </Box>
        ) : (<></>)}
      </HStack>
    </Card>
  );
};
export default DiscussionCard;
