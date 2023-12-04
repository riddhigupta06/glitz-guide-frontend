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
                            
                        </div>
                    </div>
                </Box>
            )}
        </Box>
    )
}

/**
 * api_featured_image
: 
"//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/047/original/open-uri20180708-4-e7idod?1531087336"
brand
: 
"colourpop"
category
: 
"lipstick"
created_at
: 
"2018-07-08T22:01:20.178Z"
currency
: 
"CAD"
description
: 
"Blotted Lip Sheer matte lipstick that creates the perfect popsicle pout! Formula is lightweight, matte and buildable for light to medium coverage."
id
: 
1047
image_link
: 
"https://cdn.shopify.com/s/files/1/1338/0845/products/brain-freeze_a_800x1200.jpg?v=1502255076"
name
: 
"Blotted Lip"
price
: 
"5.5"
price_sign
: 
"$"
product_api_url
: 
"http://makeup-api.herokuapp.com/api/v1/products/1047.json"
product_colors
: 
(7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
product_link
: 
"https://colourpop.com/collections/lippie-stix?filter=blotted-lip"
product_type
: 
"lipstick"
rating
: 
null
tag_list
: 
(2) ['cruelty free', 'Vegan']
updated_at
: 
"2018-07-09T00:53:23.287Z"
website_link
: 
"https://colourpop.com"
 */