import React, { useEffect, useState } from "react";
import { Card, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { IconButton, Textarea } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faReply,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Heading, HStack } from "@chakra-ui/react";
import EditDiscussion from "./EditDiscussion";
import * as client from "../client";
import Avatar from "../Avatar";

const DiscussionCard = ({ post, handleRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currPost, setPost] = useState(post);
  const [reply, setReply] = useState("");
  const [allReps, setAllReps] = useState([]);

  const handleEditButtonClicked = () => {
    setIsEditing(!isEditing);
  };

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
      setAllReps(fetchedReplies.data);
    };
    fetchReplies();
  }, []);

  return (
    <Card width="100%" marginBottom={5}>
      <HStack alignItems="start" gap={5}>
        <Box padding={5} width={"200px"}>
          <VStack alignItems={'center'} justifyContent={'center'}>
              <Box width={'100px'} height={'100px'}>
                <Avatar title={post.avatar} />
              </Box>
              <Text textAlign={'center'} width={'100%'} color={"darkblue"}>
                <NavLink to={`/profile/${post.username}`}>
                    <strong>{post.firstName} {post.lastName}</strong>
                </NavLink>
              </Text>
          </VStack>
        </Box>
        {!isEditing ? (
          <Box padding={5} paddingTop={10}>
            <VStack alignItems={'flex-start'}>
                <Heading size="md">{currPost.title}</Heading>
                <Text>{currPost.body}</Text>
            </VStack>
          </Box>
        ) : (
          <Box width="100%" padding={5} paddingTop={'50px'}>
            <EditDiscussion
              post={currPost}
              handleCancel={handleCancel}
              handleUpdate={handleUpdate}
            />
          </Box>
        )}

        {username === post.username ? (
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
      <VStack alignItems={'flex-start'} width={'100%'}>
        <Heading as={'h5'} size={'sm'} marginLeft={5}>
          Replies ({allReps.length})
        </Heading>
        {allReps.length === 0 ? (
          <Box marginLeft={5}>
            There are no replies right now. Add one!
          </Box>
        ) : (
          <VStack width={'100%'} alignItems={'flex-start'} paddingTop={3} paddingRight={10}>
            {allReps.map((reply, idx) => (
            <HStack width={'100%'} key={idx} justifyContent={'space-between'}>
              <HStack width={'100%'}>
                <Text width={'10%'} marginLeft={5} color={"#D53F8C"}>
                  <NavLink to={`/profile/${reply.username}`}><strong>{reply.firstName} {reply.lastName}</strong></NavLink>
                </Text>
                <Text marginLeft={5}>
                  {reply.reply}{" "}
                </Text>
              </HStack>
              {username == reply.username && (
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
                />
              )}
            </HStack>
          ))}
          </VStack>
        )}
      </VStack>
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
