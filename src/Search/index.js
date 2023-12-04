import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Heading, Box, HStack, Select, Button, Spinner, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from "@chakra-ui/react";
import { brands, productTypes } from "./data";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Search() {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [pageIndex, setPageIndex] = useState(1);
    const [loadMoreDisabled, setLoadMoreDisabled] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [brand, setBrand] = useState(searchParams.get("brand"))
    const [productType, setProductType] = useState(searchParams.get("productType"))
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice"))
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice"))

    const getSearchQuery = () => {
        let searchQuery = "?" 
        if (brand !== null && brand !== "" && brand !== "null") {
            searchQuery += `brand=${brand.replaceAll(' ', '+')}`
        }
        if (productType !== null && productType !== "" && productType !== "null") {
            searchQuery += `&productType=${productType}`
        }
        if (minPrice !== null && minPrice !== "" && minPrice !== "null") {
            searchQuery += `&minPrice=${minPrice}`
        }
        if (maxPrice !== null && maxPrice !== "" && maxPrice !== "null") {
            searchQuery += `&maxPrice=${maxPrice}`
        }

        if (searchQuery === "?") {
            return undefined
        } else {
            return searchQuery
        }
    }

    const fetchProducts = async () => {
        const searchQuery = getSearchQuery()
        const API_URL = `https://glitz-guide-server.onrender.com/search/${pageIndex}${searchQuery === undefined ? '' : searchQuery}`
        console.log('API', API_URL)
        const response = await axios.get(API_URL)
        setProducts([...products, ...response.data.data])
        setTotalProducts(response.data.total)
        setIsLoading(false)
        setLoadMoreDisabled(false)
    }

    const handleLoadMore = async () => {
        setLoadMoreDisabled(true)
        setPageIndex(pageIndex+1)
    }
 
    const handleFilter = () => {
        setSearchParams({ brand, productType, minPrice, maxPrice })
        setIsLoading(true)
        setPageIndex(1)
        setProducts([])
    }

    useEffect(() => {
        fetchProducts()
    }, [pageIndex, searchParams])

    return (
        <Box padding={3}>
            <Heading as={'h6'} size={'lg'}>Explore beauty products</Heading>

            <HStack paddingTop={5} paddingBottom={5} gap={5}>
                <Select id='brandFilter' placeholder='Brand' defaultValue={brand} onChange={(e) => setBrand(e.target.value)}>
                    {brands.map((brand, idx) => <option key={idx} value={brand.name}>{brand.title}</option>)}
                </Select>

                <Select id='productTypeFilter' placeholder='Product Type' defaultValue={productType} onChange={(e) => setProductType(e.target.value)}>
                    {productTypes.map((type, idx) => <option key={idx} value={type.name}>{type.title}</option>)}
                </Select>

                <RangeSlider
                    aria-label={['min', 'max']}
                    colorScheme='pink'
                    min={0}
                    max={100}
                    defaultValue={[0, 100]}
                    step={10}
                    onChange={(values => {
                        setMinPrice(values[0])
                        setMaxPrice(values[1])
                    })}
                    width={800}
                    marginLeft={5}
                    marginRight={5}
                >
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={10} index={0}>
                        {minPrice}
                    </RangeSliderThumb>
                    <RangeSliderThumb boxSize={10} index={1}>
                        {maxPrice}
                    </RangeSliderThumb>
                </RangeSlider>

                <Button onClick={handleFilter} variant='outline' colorScheme='pink' width={200}>
                    Filter
                </Button>
            </HStack>

            {isLoading ? (
                <div className="w-100 d-flex justify-content-center align-content-center" style={{paddingTop:100}}>
                    Loading <Spinner marginLeft={5} />
                </div>
            ) : (
                <div className="w-100 d-flex flex-column align-content-center">
                    <div className="p-2 gap-3 row flex-row flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        {products.map((product, idx) => <ProductCard key={idx} id={product.id} name={product.name} price={product.price} image_link={product.image} brand={product.brand} product_type={product.type} />)}
                    </div>
                    {products.length < totalProducts && (
                        <div className="d-flex flex-row justify-content-center align-content-center" style={{paddingTop:30}}>
                            <Button onClick={handleLoadMore} variant='outline' colorScheme='pink' width={400} isLoading={loadMoreDisabled}>
                                Load More
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </Box>
    )
}