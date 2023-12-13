import React, { useEffect } from "react";
import { useState } from "react";
import * as client from "../client";
import {
  Box,
  Text,
  Heading,
  Button,
  Input,
  Textarea,
  Divider,
  VStack,
} from "@chakra-ui/react";
import "./index.css";
import DiscussionCard from "./DiscussionCard";

export default function Discussion() {
  const [newTitle, setNewTitle] = useState("");
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([]);

  const username = sessionStorage.getItem("user");
  const handleRefresh = async () => {
    const fetched = await client.getPosts();
    setPosts(fetched.data);
  };


  const addPost = async () => {
    if (newPost !== "") {
      const post = { username: username, title: newTitle, body: newPost };
      const res = await client.writePost(username, post);
      const fetched = await client.getPosts();
      setPosts(fetched.data);
      setNewPost("");
      setNewTitle("");
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const fetched = await client.getPosts();
      setPosts(fetched.data);
    };
    fetchPosts();
  }, []);
  return (
    <Box padding={3}>
      <Heading as={"h6"} size={"lg"}>
        Influencer Discussion Board
      </Heading>
      <Divider />
      <Heading as={"h6"} size={"md"}>
        Start a new discussion...
      </Heading>
      <VStack marginTop={5} alignItems={'flex-start'}>
        <Input
            placeholder="Write discussion post title here"
            value={newTitle}
            type={'text'}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        <Box width={'100%'} flex={1}>
          <Textarea
            resize={"vertical"}
            placeholder="Write your discussion post here..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </Box>
        <Box>
        <Button marginTop={3} colorScheme="pink" onClick={async () => await addPost()}>
          Create New Post
        </Button>
      </Box>
      </VStack>
      <Divider marginTop={5} marginBottom={10} />
      <Heading as={"h6"} size={"md"}>Read other discussions...</Heading>
        <VStack style={{marginTop:30}}>
          {posts.length === 0 ? (
            <Text>Oops! There are no discussion posts right now!</Text>
          ) : (
            posts.map((post) => (
              <DiscussionCard post={post} handleRefresh={handleRefresh} />
            ))
          )}
        </VStack>
    </Box>
  );
}
