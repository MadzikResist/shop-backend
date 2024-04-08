import cron from "node-cron";

const cronFunctions = async (): Promise<void> => {
    cron.schedule(
        '*/5 * * * *',
        async () => {
            console.log('Sending new products', Math.random())
            try {
                const response = await fetch(
                    "https://shop-backend-uedl.onrender.com/api/products/popularProducts",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                const popularProductsData = await response.json();
                console.log(popularProductsData.length)
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        },
        {
            scheduled: true,
        }
    );
}

export default cronFunctions;
