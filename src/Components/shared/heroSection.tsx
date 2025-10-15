import React from 'react'
import heroBanner from "@/assets/hero-banner-Dp2PdW-i.jpg"
import Image from 'next/image'
import { Badge, Button } from '../ui'
import { ArrowRight, ShoppingBag } from 'lucide-react'

export default function heroSection() {
  return (
    <section className='relative h-[70vh] flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0'>
            <Image 
                src={heroBanner}
                alt="Hero Banner"
                fill
                priority
                className="object-cover object-center"
            />
            <div className='absolute inset-0 bg-[#000000]/40'></div>
        </div>

        <div className='relative z-10 text-center text-[#ffffff] px-4 max-w-4xl mx-auto'>
            <Badge  variant="secondary" className='mb-4 bg-[#ffffff]/20 text-[#fffff] border-[#ffffff]/30' >✨ New Collection Available</Badge>
            <h1 className='text-5xl md:text-6xl font-bold mb-6 animate-fade-in'>
                Discover Premium
                <span className='bg-gradient-to-r from-primary to-accent-blue bg-clip-text text-transparent'>
                    Quailty
                </span>
            </h1>
            <p className='text-xl mb-8 text-[#ffffff]/90 max-w-2xl mx-auto animate-slide-up'> Explore our curated collection of premium products designed for the modern lifestyle. 
            Quality, style, and innovation in every purchase.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center animate-scale-in'>
                <Button size="lg" className='btn-hero' >
                    <ShoppingBag className='w-5 h-5 mr-2' />
                    Shop Now
                </Button>
                <Button  size="lg" variant="outline" className='bg-[#ffffff]/10 border-[#ffffff]/30 text-[#ffffff] hover:bg-[#ffffff]20' > 
                    Explore Categories
                    <ArrowRight className='w-5 h-5 ml-2' />
                 </Button>
            </div>
        </div>
    </section>
  )
}
