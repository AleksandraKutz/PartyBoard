// PartyBoard - Would You Rather Questions Database
console.log('Loading questions.js...');

const QUESTIONS_DB = {
    survival: [
        {
            id: 'surv_1',
            optionA: 'Live in the Sahara Desert for a year with unlimited water',
            optionB: 'Live in Antarctica for a year with unlimited food',
            typePoints: { desert: 2, arctic: 0, jungle: 0, urban: 0 }
        },
        {
            id: 'surv_2',
            optionA: 'Fight one horse-sized duck',
            optionB: 'Fight 100 duck-sized horses',
            typePoints: { desert: 0, arctic: 0, jungle: 1, urban: 1 }
        },
        {
            id: 'surv_3',
            optionA: 'Be stranded on a deserted island alone',
            optionB: 'Be stranded in a crowded city where you don\'t speak the language',
            typePoints: { desert: 1, arctic: 0, jungle: 1, urban: -1 }
        },
        {
            id: 'surv_4',
            optionA: 'Have to hunt for all your food',
            optionB: 'Have to grow all your food',
            typePoints: { desert: 0, arctic: 1, jungle: 1, urban: -1 }
        },
        {
            id: 'surv_5',
            optionA: 'Live in a treehouse in the rainforest',
            optionB: 'Live in an underground bunker in the city',
            typePoints: { desert: 0, arctic: 0, jungle: 2, urban: -1 }
        },
        {
            id: 'surv_6',
            optionA: 'Navigate by the stars with no technology',
            optionB: 'Have GPS but no other modern tools',
            typePoints: { desert: 1, arctic: 1, jungle: 0, urban: -1 }
        },
        {
            id: 'surv_7',
            optionA: 'Survive a zombie apocalypse in a rural area',
            optionB: 'Survive a zombie apocalypse in a metropolitan area',
            typePoints: { desert: 0, arctic: 0, jungle: 0, urban: 2 }
        },
        {
            id: 'surv_8',
            optionA: 'Live without electricity for a year',
            optionB: 'Live without running water for a year',
            typePoints: { desert: 1, arctic: 0, jungle: 1, urban: -2 }
        },
        {
            id: 'surv_9',
            optionA: 'Be an expert at finding water in any environment',
            optionB: 'Be an expert at building shelter in any environment',
            typePoints: { desert: 2, arctic: -1, jungle: 0, urban: 0 }
        },
        {
            id: 'surv_10',
            optionA: 'Face extreme heat every day',
            optionB: 'Face extreme cold every day',
            typePoints: { desert: 2, arctic: -2, jungle: 0, urban: 0 }
        }
    ],
    
    social: [
        {
            id: 'soc_1',
            optionA: 'Always be the life of the party',
            optionB: 'Always be the mysterious guest',
            typePoints: { party_animal: 2, introvert: -2, butterfly: 1, lone_wolf: 0 }
        },
        {
            id: 'soc_2',
            optionA: 'Host a party for 100 strangers',
            optionB: 'Have a deep conversation with one interesting person',
            typePoints: { party_animal: 1, introvert: -2, butterfly: 1, lone_wolf: 0 }
        },
        {
            id: 'soc_3',
            optionA: 'Never be able to attend parties',
            optionB: 'Have to attend a party every single day',
            typePoints: { party_animal: -2, introvert: 2, butterfly: -1, lone_wolf: 1 }
        },
        {
            id: 'soc_4',
            optionA: 'Be famous on social media',
            optionB: 'Be completely anonymous online',
            typePoints: { party_animal: 1, introvert: -1, butterfly: 2, lone_wolf: -2 }
        },
        {
            id: 'soc_5',
            optionA: 'Work in a busy open office',
            optionB: 'Work from home forever',
            typePoints: { party_animal: 1, introvert: -2, butterfly: 1, lone_wolf: -1 }
        },
        {
            id: 'soc_6',
            optionA: 'Live in a commune with 50 people',
            optionB: 'Live alone on a mountain',
            typePoints: { party_animal: 1, introvert: -2, butterfly: 1, lone_wolf: -2 }
        },
        {
            id: 'soc_7',
            optionA: 'Always say exactly what you think',
            optionB: 'Never be able to speak your mind',
            typePoints: { party_animal: 1, introvert: 0, butterfly: 0, lone_wolf: 1 }
        },
        {
            id: 'soc_8',
            optionA: 'Be the best dancer but terrible singer',
            optionB: 'Be the best singer but terrible dancer',
            typePoints: { party_animal: 1, introvert: 0, butterfly: 1, lone_wolf: 0 }
        },
        {
            id: 'soc_9',
            optionA: 'Have 100 acquaintances',
            optionB: 'Have 3 best friends',
            typePoints: { party_animal: 0, introvert: -1, butterfly: 2, lone_wolf: -2 }
        },
        {
            id: 'soc_10',
            optionA: 'Be the organizer of every social event',
            optionB: 'Never have to plan anything social',
            typePoints: { party_animal: 1, introvert: -1, butterfly: 2, lone_wolf: -1 }
        }
    ],
    
    food: [
        {
            id: 'food_1',
            optionA: 'Eat only pizza for the rest of your life',
            optionB: 'Never eat pizza again',
            typePoints: { gourmet: -2, comfort: 2, adventurous: -1, healthy: -1 }
        },
        {
            id: 'food_2',
            optionA: 'Have a personal chef',
            optionB: 'Be an amazing cook yourself',
            typePoints: { gourmet: 1, comfort: 0, adventurous: 0, healthy: 0 }
        },
        {
            id: 'food_3',
            optionA: 'Only eat at Michelin star restaurants',
            optionB: 'Only eat street food',
            typePoints: { gourmet: 2, comfort: -1, adventurous: -1, healthy: 0 }
        },
        {
            id: 'food_4',
            optionA: 'Give up chocolate forever',
            optionB: 'Give up cheese forever',
            typePoints: { gourmet: 0, comfort: 0, adventurous: 0, healthy: 1 }
        },
        {
            id: 'food_5',
            optionA: 'Eat breakfast for every meal',
            optionB: 'Never eat breakfast again',
            typePoints: { gourmet: -1, comfort: 1, adventurous: -1, healthy: 0 }
        },
        {
            id: 'food_6',
            optionA: 'Try every weird food in the world',
            optionB: 'Stick to familiar foods forever',
            typePoints: { gourmet: 0, comfort: -2, adventurous: 2, healthy: 0 }
        },
        {
            id: 'food_7',
            optionA: 'Live in a mansion with no kitchen',
            optionB: 'Live in a tiny house with a dream kitchen',
            typePoints: { gourmet: -1, comfort: 0, adventurous: 0, healthy: 0 }
        },
        {
            id: 'food_8',
            optionA: 'Only eat organic, locally-sourced food',
            optionB: 'Eat whatever you want with no health consequences',
            typePoints: { gourmet: 0, comfort: -1, adventurous: 0, healthy: 2 }
        },
        {
            id: 'food_9',
            optionA: 'Have every meal be a surprise',
            optionB: 'Plan every meal for the rest of your life',
            typePoints: { gourmet: 0, comfort: -1, adventurous: 2, healthy: -1 }
        },
        {
            id: 'food_10',
            optionA: 'Only eat spicy food',
            optionB: 'Never taste spice again',
            typePoints: { gourmet: 0, comfort: -1, adventurous: 1, healthy: 0 }
        }
    ],
    
    travel: [
        {
            id: 'trav_1',
            optionA: 'Travel to 100 countries but never revisit any',
            optionB: 'Only visit 10 countries but go as often as you want',
            typePoints: { explorer: 2, comfort_traveler: -2, luxury: 0, backpacker: 1 }
        },
        {
            id: 'trav_2',
            optionA: 'Always travel first class but only once a year',
            optionB: 'Travel economy but go anywhere anytime',
            typePoints: { explorer: -1, comfort_traveler: 0, luxury: 2, backpacker: -2 }
        },
        {
            id: 'trav_3',
            optionA: 'Sleep in a different place every night for a year',
            optionB: 'Never leave your hometown again',
            typePoints: { explorer: 2, comfort_traveler: -2, luxury: -1, backpacker: 2 }
        },
        {
            id: 'trav_4',
            optionA: 'Travel only by boat',
            optionB: 'Never see the ocean again',
            typePoints: { explorer: 1, comfort_traveler: -1, luxury: 0, backpacker: 0 }
        },
        {
            id: 'trav_5',
            optionA: 'Have unlimited money for travel but only 2 weeks vacation per year',
            optionB: 'Have unlimited time but a tight budget',
            typePoints: { explorer: -1, comfort_traveler: 0, luxury: 1, backpacker: -1 }
        },
        {
            id: 'trav_6',
            optionA: 'Always travel solo',
            optionB: 'Always travel in a group of 10+',
            typePoints: { explorer: 1, comfort_traveler: -1, luxury: 0, backpacker: 1 }
        },
        {
            id: 'trav_7',
            optionA: 'Visit every museum in the world',
            optionB: 'Visit every beach in the world',
            typePoints: { explorer: 0, comfort_traveler: 0, luxury: 0, backpacker: 0 }
        },
        {
            id: 'trav_8',
            optionA: 'Stay in 5-star hotels with terrible locations',
            optionB: 'Camp in the most beautiful places on Earth',
            typePoints: { explorer: -1, comfort_traveler: 1, luxury: 2, backpacker: -2 }
        },
        {
            id: 'trav_9',
            optionA: 'Speak every language but never travel',
            optionB: 'Travel everywhere but only speak your native language',
            typePoints: { explorer: -1, comfort_traveler: 0, luxury: 0, backpacker: 0 }
        },
        {
            id: 'trav_10',
            optionA: 'Have a year-long road trip',
            optionB: 'Have 52 weekend trips',
            typePoints: { explorer: 1, comfort_traveler: -1, luxury: -1, backpacker: 2 }
        }
    ],
    
    tech: [
        {
            id: 'tech_1',
            optionA: 'Live in a fully automated smart home',
            optionB: 'Live completely off-grid',
            typePoints: { futurist: 2, traditionalist: -2, balanced: 0, minimalist: -1 }
        },
        {
            id: 'tech_2',
            optionA: 'Have a phone with infinite battery',
            optionB: 'Have wifi everywhere you go',
            typePoints: { futurist: 1, traditionalist: -1, balanced: 1, minimalist: 0 }
        },
        {
            id: 'tech_3',
            optionA: 'Be able to control technology with your mind',
            optionB: 'Have technology that reads your emotions',
            typePoints: { futurist: 2, traditionalist: -2, balanced: 0, minimalist: -1 }
        },
        {
            id: 'tech_4',
            optionA: 'Live in a virtual reality world',
            optionB: 'Never use VR/AR technology',
            typePoints: { futurist: 2, traditionalist: -2, balanced: -1, minimalist: -1 }
        },
        {
            id: 'tech_5',
            optionA: 'Have a robot assistant',
            optionB: 'Have a human assistant',
            typePoints: { futurist: 2, traditionalist: -2, balanced: 0, minimalist: -1 }
        },
        {
            id: 'tech_6',
            optionA: 'Time travel to the past',
            optionB: 'Time travel to the future',
            typePoints: { futurist: -1, traditionalist: 1, balanced: 0, minimalist: 0 }
        },
        {
            id: 'tech_7',
            optionA: 'Have all your memories stored digitally',
            optionB: 'Keep memories only in your mind',
            typePoints: { futurist: 2, traditionalist: -2, balanced: -1, minimalist: -1 }
        },
        {
            id: 'tech_8',
            optionA: 'Work in the metaverse',
            optionB: 'Only work in physical offices',
            typePoints: { futurist: 2, traditionalist: -2, balanced: -1, minimalist: -1 }
        },
        {
            id: 'tech_9',
            optionA: 'Have the latest tech but it breaks often',
            optionB: 'Have old reliable tech that always works',
            typePoints: { futurist: 1, traditionalist: -1, balanced: -1, minimalist: 1 }
        },
        {
            id: 'tech_10',
            optionA: 'Live without social media',
            optionB: 'Live without email',
            typePoints: { futurist: -1, traditionalist: 1, balanced: 0, minimalist: 2 }
        }
    ],
    
    random: [
        {
            id: 'rand_1',
            optionA: 'Have a rewind button for life',
            optionB: 'Have a pause button for life',
            typePoints: { philosopher: 1, comedian: -1, dreamer: 0, realist: 0 }
        },
        {
            id: 'rand_2',
            optionA: 'Be able to fly but only 2 feet off the ground',
            optionB: 'Be able to teleport but only to places you\'ve been',
            typePoints: { philosopher: 0, comedian: 1, dreamer: 1, realist: -1 }
        },
        {
            id: 'rand_3',
            optionA: 'Have a pet dragon',
            optionB: 'Have a pet unicorn',
            typePoints: { philosopher: -1, comedian: 0, dreamer: 2, realist: -2 }
        },
        {
            id: 'rand_4',
            optionA: 'Always know when someone is lying',
            optionB: 'Always get away with lying',
            typePoints: { philosopher: 2, comedian: -1, dreamer: -1, realist: 1 }
        },
        {
            id: 'rand_5',
            optionA: 'Have fingers as long as legs',
            optionB: 'Have legs as short as fingers',
            typePoints: { philosopher: -1, comedian: 2, dreamer: 0, realist: -1 }
        },
        {
            id: 'rand_6',
            optionA: 'Sneeze glitter',
            optionB: 'Cry chocolate tears',
            typePoints: { philosopher: -1, comedian: 1, dreamer: 2, realist: -2 }
        },
        {
            id: 'rand_7',
            optionA: 'Have your thoughts appear above your head',
            optionB: 'Have theme music play based on your mood',
            typePoints: { philosopher: 1, comedian: 1, dreamer: 0, realist: -2 }
        },
        {
            id: 'rand_8',
            optionA: 'Be the funniest person alive but no one gets your jokes',
            optionB: 'Think everyone is hilarious but never laugh',
            typePoints: { philosopher: 1, comedian: -2, dreamer: 0, realist: 0 }
        },
        {
            id: 'rand_9',
            optionA: 'Live in a world made of candy',
            optionB: 'Live in a world made of LEGO',
            typePoints: { philosopher: -1, comedian: 0, dreamer: 2, realist: -2 }
        },
        {
            id: 'rand_10',
            optionA: 'Have a tail that shows your emotions',
            optionB: 'Change color based on your mood',
            typePoints: { philosopher: 0, comedian: 1, dreamer: 1, realist: -2 }
        }
    ]
};

// Personality Types Database
const PERSONALITY_TYPES = {
    survival: {
        desert: {
            name: 'Desert Wanderer',
            icon: '🏜️',
            description: 'You\'re a true survivor who thrives in challenging conditions. Your independent spirit and resourcefulness make you the perfect companion for any adventure. While others panic, you stay cool as a cactus!'
        },
        arctic: {
            name: 'Arctic Explorer',
            icon: '❄️',
            description: 'You have ice in your veins and adventure in your heart. Extreme conditions don\'t phase you - you embrace the cold and find beauty in the harshest environments. You\'re the person everyone wants on their expedition team!'
        },
        jungle: {
            name: 'Jungle Survivor',
            icon: '🌴',
            description: 'You\'re adaptable, resourceful, and thrive in chaotic environments. The wild calls to you, and you answer with confidence. Your ability to navigate complex situations makes you a natural leader in any adventure!'
        },
        urban: {
            name: 'Urban Prepper',
            icon: '🏙️',
            description: 'You\'re street-smart and always prepared. While others dream of wilderness, you know the real survival game is in the concrete jungle. Your practical mindset and city savvy make you unstoppable!'
        }
    },
    
    social: {
        party_animal: {
            name: 'Party Animal',
            icon: '🎉',
            description: 'You\'re the life of every party and the spark that lights up any room! Your energy is contagious, and people gravitate toward your fun-loving spirit. When you\'re around, boring is simply not an option!'
        },
        introvert: {
            name: 'Cozy Introvert',
            icon: '🕯️',
            description: 'You\'re a master of meaningful connections and deep conversations. While others seek the spotlight, you create magic in quiet moments. Your thoughtful nature and genuine presence make you unforgettable!'
        },
        butterfly: {
            name: 'Social Butterfly',
            icon: '🦋',
            description: 'You flutter gracefully between different social circles, making everyone feel special. Your natural charm and adaptability help you connect with anyone. You\'re the glue that holds friend groups together!'
        },
        lone_wolf: {
            name: 'Lone Wolf',
            icon: '🐺',
            description: 'You march to the beat of your own drum and wouldn\'t have it any other way. Your independence is your strength, and you choose quality over quantity in relationships. Mysterious and intriguing, you\'re unforgettable!'
        }
    },
    
    food: {
        gourmet: {
            name: 'Gourmet Guru',
            icon: '👨‍🍳',
            description: 'You have a refined palate and appreciate the finer things in life. Food isn\'t just sustenance for you - it\'s an art form. Your sophisticated taste and culinary knowledge make every meal an experience!'
        },
        comfort: {
            name: 'Comfort Food Champion',
            icon: '🍕',
            description: 'You know that the best meals are the ones that warm your soul. Simple pleasures and familiar flavors are your love language. Your down-to-earth approach to food brings joy and comfort to everyone around you!'
        },
        adventurous: {
            name: 'Adventurous Eater',
            icon: '🌶️',
            description: 'You\'ll try anything once and probably love it! Your culinary courage knows no bounds, and you\'re always seeking the next flavor adventure. Your fearless approach to food makes every meal exciting!'
        },
        healthy: {
            name: 'Health Conscious Hero',
            icon: '🥗',
            description: 'You treat your body like a temple and food as fuel for greatness. Your balanced approach to eating inspires others to make better choices. You prove that healthy can be delicious and satisfying!'
        }
    },
    
    travel: {
        explorer: {
            name: 'Intrepid Explorer',
            icon: '🧭',
            description: 'You\'re driven by an insatiable curiosity about the world. No destination is too remote, no journey too challenging. Your adventurous spirit and open mind make you a true citizen of the world!'
        },
        comfort_traveler: {
            name: 'Comfort Traveler',
            icon: '🏖️',
            description: 'You believe travel should be relaxing and rejuvenating. You\'ve mastered the art of vacation, finding the perfect balance between adventure and comfort. Your travel style is all about making memories without the stress!'
        },
        luxury: {
            name: 'Luxury Wanderer',
            icon: '✈️',
            description: 'You travel in style and believe that the journey is just as important as the destination. Your impeccable taste and attention to detail turn every trip into a five-star experience. You know how to travel like royalty!'
        },
        backpacker: {
            name: 'Budget Backpacker',
            icon: '🎒',
            description: 'You can travel the world on pocket change and have more fun than anyone else doing it. Your resourcefulness and adventurous spirit open doors that money can\'t buy. You collect experiences, not things!'
        }
    },
    
    tech: {
        futurist: {
            name: 'Tech Futurist',
            icon: '🚀',
            description: 'You\'re living in tomorrow while others are stuck in yesterday. Your embrace of technology and innovation puts you at the cutting edge. You see possibilities where others see science fiction!'
        },
        traditionalist: {
            name: 'Digital Traditionalist',
            icon: '📻',
            description: 'You appreciate the reliability and simplicity of tried-and-true technology. While others chase the latest gadget, you value what actually works. Your practical approach to tech makes you the voice of reason!'
        },
        balanced: {
            name: 'Tech Balanced',
            icon: '⚖️',
            description: 'You\'ve found the perfect equilibrium between digital and analog life. You use technology as a tool, not a crutch. Your balanced approach makes you adaptable and grounded in any situation!'
        },
        minimalist: {
            name: 'Digital Minimalist',
            icon: '🌱',
            description: 'You\'ve mastered the art of using less to achieve more. Your selective approach to technology keeps you focused on what truly matters. You prove that sometimes the best app is no app at all!'
        }
    },
    
    random: {
        philosopher: {
            name: 'Whimsical Philosopher',
            icon: '🤔',
            description: 'You find deep meaning in the absurd and wisdom in the silly. Your unique perspective on life\'s weird questions makes you endlessly fascinating. You\'re the friend everyone turns to for mind-bending conversations!'
        },
        comedian: {
            name: 'Cosmic Comedian',
            icon: '😂',
            description: 'You see the humor in everything, especially the bizarre and unexpected. Your ability to laugh at life\'s absurdities is contagious. You remind everyone that sometimes the best answer is the funniest one!'
        },
        dreamer: {
            name: 'Fantastical Dreamer',
            icon: '🌟',
            description: 'Your imagination knows no bounds and reality is just a suggestion. You live in a world of infinite possibilities and magical thinking. Your creative spirit inspires others to dream bigger and weirder!'
        },
        realist: {
            name: 'Grounded Realist',
            icon: '🌍',
            description: 'Even when faced with the impossible, you keep your feet on the ground. Your practical approach to even the wildest scenarios is refreshing. You\'re the anchor that keeps everyone from floating away!'
        }
    }
};

// Export for use in game
window.WouldYouRatherData = {
    questions: QUESTIONS_DB,
    personalityTypes: PERSONALITY_TYPES
};