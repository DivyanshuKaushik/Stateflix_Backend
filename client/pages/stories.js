import React from 'react'
import Basic from '../components/layouts/Basic'
import StoryCard from '../components/cards/StoryCard'

const Stories = () => {
  return (
    <Basic>
        <div className="grid place-items-center place-content-center grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-10 mt-4">
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
        </div>
    </Basic>
  )
}

export default Stories