 import Product from "../src/models/productModel"
 import {Request, Response} from 'express';

 export const addProductsToDB = async (req: Request, res: Response) => {
    try{
        const response = await fetch('https://www2.hm.com/hmwebservices/service/products/plp/hm-poland/Online/pl?q=:stock:category:ladies_dresses:sale:false:oldSale:false:isNew:false&currentPage=1&pageSize=36&skipStockCheck=false', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch data from API');
        }
        const data = await response.json();

        if (!data) {
            throw new Error('Empty JSON data received from API');
        }
        // const productsFromAPI: Product[] = data.results

        //add to db
        for(const productFromAPI of data.results){
            const sizes = productFromAPI.variantSizes.map((variantSize: { filterCode: string; }) => variantSize.filterCode);
            const galleryImages = productFromAPI.galleryImages.map((image:  { url: string; }) => image.url)
            const product = new Product({
                name: productFromAPI.name,
                code: productFromAPI.code,
                price: productFromAPI.price.formattedValue,
                sizes,
                galleryImages: galleryImages,
                category: "Sukienki",
                colorNames: productFromAPI.articleColorNames,
                colorsHex: productFromAPI.rgbColors,
                articleCodes: productFromAPI.articleCodes
            })
            await product.save()
            console.log(`Product added to DB: ${product.name}`)
        }
        res.status(200).send('SUCCESS');
    } catch(error){
        console.error("Error adding data do db: ", error)
    }
 }