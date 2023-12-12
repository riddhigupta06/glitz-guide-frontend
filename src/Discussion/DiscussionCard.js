import { Card, CardBody, CardHeader, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as client from "../client";
import Avatar from "../Avatar";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IconButton, Textarea } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faReply,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { Center, Box, Heading, HStack } from "@chakra-ui/react";
import EditDiscussion from "./EditDiscussion";
import { replace } from "formik";
const DiscussionCard = ({ post, handleRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currPost, setPost] = useState(post);
  const [reply, setReply] = useState("");
  const [allReps, setAllReps] = useState([]);

  const handleEditButtonClicked = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteReply = async (id) => {
    const res = await client.deleteReply(id);
    const fetched = await client.getReplies(post._id);
    setAllReps(fetched.data);
  }
  const username = sessionStorage.getItem("user");
  const addReply = async () => {
    if (reply != "") {
      const replyObj = {
        username: username,
        reply: reply,
        discussionId: post._id,
      };
      const res = await client.writeReply(post._id, replyObj);
      const fetched = await client.getReplies(post._id);
      setAllReps(fetched.data);
      setReply("");
    }
  };
  const handleDelete = async () => {
    const res = await client.deletePost(post._id);
    handleRefresh();
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
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
  useEffect(() => {
    const fetchReplies = async () => {
      const fetchedReplies = await client.getReplies(post._id);
      console.log(fetchedReplies.data);
      setAllReps(fetchedReplies.data);
    };
    fetchReplies();
  }, []);
  return (
    <Card marginBottom={10}>
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
                  <HStack></HStack>
                </CardBody>
              </VStack>
            </Box>
          </>
        ) : (
          <div style={{ width: "80%" }}>
            <EditDiscussion
              post={currPost}
              handleCancel={handleCancel}
              handleUpdate={handleUpdate}
            />
          </div>
        )}

        {username == post.username ? (
          <HStack gap={5}>
            <Box>
              <IconButton
                colorScheme="red"
                variant={"outline"}
                aria-label="edit profile"
                size="md"
                icon={<FontAwesomeIcon icon={faTrashCan} />}
                onClick={handleDelete}
                style={{ position: "absolute", top: 10, right: 70 }}
              />
            </Box>
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
          </HStack>
        ) : (
          <></>
        )}
      </HStack>
      <div>
        <Text marginLeft={5}>
          <strong>Replies: </strong>
        </Text>
        {allReps.length === 0 ? (
          <></>
        ) : (
          allReps.map((reply) => (
            <HStack>
              <Text marginLeft={5} color={"#D53F8C"}>
                <NavLink to={`/profile/${post.username}`}>
                  <HStack>
                    <Text><strong>{reply.firstName} {reply.lastName} </strong> : {reply.reply}{" "}
                    </Text>
                  </HStack>
                </NavLink>
              </Text>
              {username == reply.username ? (
                <>
                  <IconButton
                    colorScheme="red"
                    variant={"outline"}
                    aria-label="edit profile"
                    size="md"
                    icon={<FontAwesomeIcon icon={faTrashCan} />}
                    onClick={async () => {
                        const res = await client.deleteReply(reply._id);
                        const fetched = await client.getReplies(post._id);
                        setAllReps(fetched.data);
                      }}
                    style={{ position: "absolute", right: 10 }}
                  />
                </>
              ) : (
                <></>
              )}
            </HStack>
          ))
        )}
      </div>
      <HStack margin={5} marginTop={0}>
        <Box flex={1}>
          <Textarea
            placeholder="Write your reply here"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </Box>
        <Box>
          <IconButton
            colorScheme="black"
            variant={"outline"}
            aria-label="reply"
            size="md"
            icon={<FontAwesomeIcon icon={faReply} />}
            onClick={addReply}
            margin={4}
          />
        </Box>
      </HStack>
    </Card>
  );
};
export default DiscussionCard;
