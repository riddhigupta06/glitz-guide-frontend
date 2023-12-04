import React from "react";
import { Card, CardBody, Stack, Text, Image, Heading, Button, CardFooter } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
    id,
    brand,
    name,
    image_link,
    product_type,
    price
}) => {

    const navigate = useNavigate();

    const handleViewProduct = async () => {
        navigate(`/details/${id}`)
    }

    return (
        <Card maxW='sm' width={325}>
            <CardBody padding={1}>
                <Image
                    src={`https:${image_link}`}
                    alt={name}
                    borderRadius='lg'
                    width={'100%'}
                    height={200}
                    objectFit={'contain'}
                />
                <Stack alignContent={'start'} justifyContent={'between'} marginBottom={0} paddingTop={5}>
                    <Text color='blue.600' fontSize='lg' marginBottom={1}>
                        {product_type}
                    </Text>
                    <Heading size='md'>{brand}</Heading>
                    <Text padding={0} margin={0} style={{fontWeight:700}}>
                        ${(Math.round(price * 100) / 100).toFixed(2)}
                    </Text>
                    <Text padding={0}>
                        {name}
                    </Text>
                </Stack>
            </CardBody>
            <CardFooter padding={1} paddingBottom={5}>
                <Button onClick={handleViewProduct} variant='solid' colorScheme='pink' width={'100%'}>
                    View Product
                </Button>
            </CardFooter>
        </Card>
    )
};

export default ProductCard;