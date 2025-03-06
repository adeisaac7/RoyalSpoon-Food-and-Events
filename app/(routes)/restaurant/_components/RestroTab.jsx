import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuSection from './MenuSection'
import ReviewSection from './ReviewSection'
import AboutSection from '@/app/_components/AboutSection'



function RestroTab({restaurant}) {
  return (
<Tabs defaultValue="category" className="w-full mt-10">
  <TabsList>
    <TabsTrigger value="category">Categories </TabsTrigger>
    <TabsTrigger value="about">About</TabsTrigger>
    <TabsTrigger value="review">Reviews</TabsTrigger>
  </TabsList>

  <TabsContent value="category">
    <MenuSection restaurant={restaurant}/>
  </TabsContent>

  <TabsContent value="about">
    <AboutSection restaurant={restaurant}/>
  </TabsContent>

  <TabsContent value="review">
    <ReviewSection restaurant={restaurant}/>
  </TabsContent>
  
</Tabs>
  )
}

export default RestroTab