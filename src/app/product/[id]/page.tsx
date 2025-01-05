'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Products {
    name: string
    title: string
    description: string
    price: number
    image: string
    rating: Rating
    category: string
}

interface Rating {
    rate: number
    count: number
}

const ProductDetailPage = ({ params }: { params: { id: number } }) => {
    const [data, setData] = useState<Products>({} as Products);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
                const parsedResponse = await response.json();
                setData(parsedResponse);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className=' pt-10 lg:mx-[200px] items-center justify-center text-2xl text-center animate-bounce'>
                Loading...
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="relative h-[400px] w-full">
                    <Image
                        src={data.image}
                        alt={data.title}
                        fill
                        className="object-contain rounded-lg"
                        priority
                    />
                </div>

                {/* Product Details Section */}
                <div className="flex flex-col space-y-4">
                    <h1 className="text-3xl font-bold">{data.title}</h1>
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">${data.price}</span>
                        <div className="text-sm text-gray-600">
                            ★ {data.rating.rate} ({data.rating.count} reviews)
                        </div>
                    </div>
                    <p className="text-gray-600">{data.description}</p>
                    <div className="pt-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer" >
                            {data.category}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage