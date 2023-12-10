import React, { useEffect, useState } from "react";
import { Box, Button, Center, HStack, Heading, IconButton, VStack, Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import * as client from "../client";
import ProductCard from "./ProductCard";

const SearchSnippet = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await client.search(1, '')
            setProducts(data.data.slice(0, 4))
        }

        fetchProducts()

    }, [])

    if (products.length === 0) {
        return (
            <VStack padding={3}>
            <HStack alignSelf={'flex-start'}>
                <Heading as={'h6'} size={'lg'}>Explore beauty products</Heading>
                <IconButton
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='search page'
                    onClick={() => navigate(`/search`)}
                    icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                />
            </HStack>

            <div className="w-100 d-flex justify-content-center align-content-center" style={{paddingTop:100}}>
                Loading <Spinner marginLeft={5} />
            </div>
        </VStack>
        )
    } else {
        return (
            <VStack padding={3}>
                <HStack alignSelf={'flex-start'}>
                    <Heading as={'h6'} size={'lg'}>Explore beauty products</Heading>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='search page'
                        onClick={() => navigate(`/search`)}
                        icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                    />
                </HStack>
    
                <div className="w-100 d-flex flex-column align-content-center">
                    <div className="p-2 gap-3 row flex-row flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        {products.map((product, idx) => <ProductCard size={'xs'} key={idx} id={product.id} name={product.name} price={product.price} image_link={product.image} brand={product.brand} product_type={product.type} />)}
                    </div>
                </div>
    
                <Button width={'300px'} variant={'outline'} colorScheme="pink" onClick={() => navigate('/search')}>View More</Button>
            </VStack>
        )
    }
}

export default SearchSnippet;