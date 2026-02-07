import React, { useState } from 'react';
import { X, ChevronRight, Heart, Share2 } from 'lucide-react';
import { healthTips, offers } from '../data/mockData';

const HealthStories = () => {
    const [activeStory, setActiveStory] = useState(null);

    // Combine tips and offers into "stories"
    const stories = [
        ...offers.map(offer => ({
            id: `offer-${offer.id}`,
            type: 'offer',
            title: 'Special Offer',
            content: offer.title,
            sub: `Code: ${offer.code}`,
            color: 'from-amber-400 to-orange-500',
            image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=200&h=200', // Generic gift/offer img
            viewed: false
        })),
        ...healthTips.map(tip => ({
            id: `tip-${tip.id}`,
            type: 'tip',
            title: tip.category,
            content: tip.title,
            sub: 'Read more',
            color: 'from-sky-400 to-blue-500',
            image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=200&h=200', // Generic health img
            viewed: false
        }))
    ];

    const handleStoryClick = (story) => {
        setActiveStory(story);
    };

    const closeStory = () => {
        setActiveStory(null);
    };

    return (
        <div className="mb-6">
            <div className="flex gap-4 overflow-x-auto pb-4 px-1 scrollbar-hide">
                {/* Your Story - static for now */}
                <div className="flex flex-col items-center gap-1 min-w-[72px]">
                    <div className="w-[68px] h-[68px] rounded-full p-[2px] border-2 border-gray-200 border-dashed">
                        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
                            <span className="text-2xl">+</span>
                        </div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">Add Story</span>
                </div>

                {stories.map((story) => (
                    <div
                        key={story.id}
                        className="flex flex-col items-center gap-1 min-w-[72px] cursor-pointer"
                        onClick={() => handleStoryClick(story)}
                    >
                        <div className={`w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr ${story.color}`}>
                            <div className="w-full h-full rounded-full bg-white p-[2px]">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                        <span className="text-xs text-gray-700 font-medium truncate w-16 text-center">
                            {story.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Full Screen Story Modal */}
            {activeStory && (
                <div className="fixed inset-0 z-50 bg-black flex items-center justify-center animate-in fade-in duration-200">
                    {/* Story Progress Bar (static for now) */}
                    <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
                        <div className="h-1 bg-white/30 flex-1 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-full animate-[progress_5s_linear_forwards]" />
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={closeStory}
                        className="absolute top-8 right-4 text-white p-2 z-10"
                    >
                        <X size={24} />
                    </button>

                    {/* Story Content */}
                    <div className={`w-full h-full max-w-lg bg-gradient-to-br ${activeStory.color} relative flex flex-col items-center justify-center p-8 text-center text-white`}>

                        <div className="w-full flex-1 flex flex-col items-center justify-center">
                            <h2 className="text-xl font-bold uppercase tracking-wider mb-2 opacity-90">{activeStory.title}</h2>
                            <h1 className="text-3xl font-bold mb-6 leading-tight">{activeStory.content}</h1>
                            <p className="text-lg font-medium opacity-90 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                                {activeStory.sub}
                            </p>
                        </div>

                        {/* Bottom Actions */}
                        <div className="w-full pb-8 flex items-center justify-between px-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Send message..."
                                    className="bg-transparent border border-white/40 rounded-full px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-white w-48"
                                />
                            </div>
                            <div className="flex gap-4">
                                <Heart className="w-7 h-7" />
                                <Share2 className="w-7 h-7" />
                            </div>
                        </div>

                    </div>

                    <style>{`
             @keyframes progress {
               0% { width: 0% }
               100% { width: 100% }
             }
           `}</style>
                </div>
            )}
        </div>
    );
};

export default HealthStories;
