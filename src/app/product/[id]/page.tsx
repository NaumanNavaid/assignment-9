'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

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

const product = ({ params }: { params: { id: number } }) => {
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
            <div className="flex items-center justify-center h-screen ">
              <div className="w-12 h-12 border-4 border-gray-300 border-b-blue-500 rounded-full animate-spin"></div>
            </div>

        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen mt-10">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="relative  sm:h-64 md:h-[400px] w-full">
                    <Image
                        src={data.image}
                        alt={data.title}
                        fill
                        className="object-contain rounded-lg"
                        priority
                    />
                </div>


                <div className="flex flex-col space-y-4 sm:mx-10">
                    <h1 className="md:text-3xl sm:text-2xl  font-bold">{data.title}</h1>
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
                    <Button className='md:w-64'>Add to Cart</Button>
                </div>
            </div>
        </div>
    )
}

export default product