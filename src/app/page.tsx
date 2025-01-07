"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Products {
  name: string
  title: string
  description: string
  price: number
  image: string
  rating: Rating
  category: string
  id: number
}

interface Rating {
  rate: number
  count: number
}

const Page = () => {
  const [data, setData] = useState<Products[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const products: Products[] = await response.json()
        setData(products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        // Use setTimeout to show loading state for 5 seconds
        setLoading(false);
      }
    }

    fetchProducts()
  }, [])

  if (error) {
    return (
      <div className="mt-10 text-center">
        <h1 className="text-red-600 font-bold text-2xl">Error: {error}</h1>
      </div>
    )
  }
if (loading) {
  return (
    <div className="flex items-center justify-center h-screen ">
    <div className="w-12 h-12 border-4 border-gray-300 border-b-blue-500 rounded-full animate-spin"></div>
  </div>
     ) 
     }
  return (
    
 
    <div className="min-h-screen bg-white">
        <div className=' pt-10 lg:mx-[100px] mx-10'>
          <h1 className="font-bold text-4xl text-center text-black mb-10">
            Product List
          </h1>

          <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6'>
            {data.map((product) => (
              <Link
                key={product.id}
                className='group flex flex-col border border-gray-200 rounded-xl shadow-2xl hover:shadow-xl transition-all duration-300 md:p-6 sm:p-4 bg-white backdrop-blur-sm gap-3 hover:scale-[1.02]'
                href={`product/${product.id}`}
              >
                <div className='lg:w-full h-48 relative mb-5'>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="rounded-lg bg-transparent object-contain group-hover:scale-105 transition-transform duration-300"
                    priority={product.id <= 3} // Prioritize loading for first 3 images
                  />
                </div>

                <p className='capitalize text-gray-600'>{product.category}</p>
                <h2 className='font-bold md:text-xl mb-3 text-black line-clamp-2'>
                  {product.title}
                </h2>
                <p className='text-gray-600 line-clamp-3'>{product.description}</p>
                <p className='font-bold text-xl'>${product.price.toFixed(2)}</p>

                <div className='flex gap-3 text-lg items-center'>
                  <span className='text-yellow-500'>★ {product.rating.rate}</span>
                  <span className='text-gray-600'>
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      
    </div>
  )
}

export default Page