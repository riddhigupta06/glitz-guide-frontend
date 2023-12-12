import React, { useEffect } from "react";
import { useState } from "react";
import * as client from "../client";
import {
  Box,
  Spinner,
  Text,
  Heading,
  Button,
  Badge,
  IconButton,
  Tooltip,
  Textarea,
} from "@chakra-ui/react";
import "./index.css";
import DiscussionCard from "./DiscussionCard";

export default function Discussion() {
  const [newTitle, setNewTitle] = useState("");
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);

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
      console.log(fetched);
      setPosts(fetched.data);
      console.log(posts);
    };
    fetchPosts();
  }, []);
  return (
    <Box padding={3}>
      <Heading as={"h6"} size={"lg"}>
        Influencer Discussion Board
      </Heading>
      <Textarea
        placeholder="Write discussion post title here"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <Box flex={1}>
        <Textarea
          resize={"vertical"}
          placeholder="Write your discussion post here..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
      </Box>
      <br />
      <Box>
        <Button colorScheme="pink" onClick={async () => await addPost()}>
          Create New Post
        </Button>
      </Box>
      <br />
      <div>
        {posts.length === 0 ? (
          <Text>Oops! There are no discussion posts right now!</Text>
        ) : (
          posts.map((post) => (
            <DiscussionCard post={post} handleRefresh={handleRefresh} />
          ))
        )}
      </div>
    </Box>
  );
}
