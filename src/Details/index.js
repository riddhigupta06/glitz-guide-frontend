import { Box, Heading, Text, Spinner, Image } from "@chakra-ui/react";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

export default function Details() {
    const { detailID } = useParams()
    const [product, setProduct] = useState(undefined)

    const fetchProduct = async () => {
        const response = await axios.get(`https://glitz-guide-server.onrender.com/product/${detailID}`)
        console.log(response.data)
        setProduct(response.data)
    }

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
                            Info
                        </div>
                    </div>
                </Box>
            )}
        </Box>
    )
}
