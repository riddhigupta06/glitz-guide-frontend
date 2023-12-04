import { Box, Heading, Text, Spinner, Image, Badge, Stack, Button } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import * as client from "../client";

export default function Details() {
    const { detailID } = useParams()
    const [product, setProduct] = useState(undefined)

    const fetchProduct = async () => {
        const productData = await client.details(detailID);
        console.log(productData)
        setProduct(productData)
    }

    const colors = ['green', 'yellow', 'blue', 'purple', 'pink', 'red']

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <Box padding={3}>
            {product === undefined ? (
                <div className="w-100 d-flex justify-content-center align-content-center" style={{paddingTop:100}}>
                    Loading <Spinner marginLeft={5} />
                </div>
            ) : (
                <Box width={'100%'}>
                    <Heading as={'h6'} size={'lg'}>{product.name}</Heading>
                    <Box marginBottom={1} style={{display:'flex', flexDirection:'row', gap:5}}>
                        <Text fontSize='lg'>
                            by
                        </Text>
                        <Text color='blue.600' fontSize='lg'>
                            {product.brand}
                        </Text>
                    </Box>

                    <div className="row mt-3">
                        <div className="col-4">
                            <Image
                                src={`https:${product.api_featured_image}`}
                                alt={product.name}
                                borderRadius='lg'
                                width={'400px'}
                            />
                        </div>
                        <div className="col-8">
                            <Text fontSize='lg' margin={0}>
                                <strong>Description</strong>
                            </Text>
                            <Text fontSize='lg'>
                                {product.description}
                            </Text>
                            <div style={{display: 'flex', flexDirection: 'row', width:'100%', gap:'50px', marginTop:'40px' }}>
                                <Stack>
                                    <Text fontSize='lg' margin={0}>
                                        <strong>Product Type</strong>
                                    </Text>
                                    <Text fontSize='lg'>
                                        {product.product_type}
                                    </Text>
                                </Stack>
                                <Stack>
                                    <Text fontSize='lg' margin={0}>
                                        <strong>Product Category</strong>
                                    </Text>
                                    <Text fontSize='lg'>
                                        {product.category}
                                    </Text>
                                </Stack>
                                {product.tag_list.length > 0 && (
                                    <Stack>
                                        <Text fontSize='lg' margin={0}>
                                            <strong>Tags</strong>
                                        </Text>
                                        <div>
                                            {product.tag_list.map((tag, idx) => <Badge ml='1' key={idx} fontSize='0.8em' colorScheme={colors[idx%colors.length]}>{tag}</Badge>)}
                                        </div>
                                    </Stack>
                                )}
                            </div>
                            <Text fontSize='lg' margin={0} marginTop={'20px'}>
                                <strong>Price</strong>
                            </Text>
                            <Text fontSize='lg' margin={0}>
                                ${(Math.round(product.price * 100) / 100).toFixed(2)}
                            </Text>
                            {product.product_link && (
                                <a href={product.product_link} target="_blank">
                                    <Button variant='solid' colorScheme='pink' marginTop={'20px'}>
                                        View product page
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>
                </Box>
            )}
        </Box>
    )
}
