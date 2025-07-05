// PartyBoard - Would You Rather Questions Database
console.log('Loading questions.js...');

const QUESTIONS_DB = {
    survival_mode: [
        {
            id: 'surv_1',
            optionA: 'Save yourself with 100% certainty?',
            optionB: 'Risk 50/50 chance to save yourself and others?',
            typePoints: { cactus_hugger: 1, polar_bear_mode: 0, jungle_vip: -1, concrete_survivor: 2 }
        },
        {
            id: 'surv_2',
            optionA: 'Survive with people you don\'t trust?',
            optionB: 'Survive alone with helpful hallucinations?',
            typePoints: { cactus_hugger: -1, polar_bear_mode: 1, jungle_vip: -1, concrete_survivor: 1 }
        },
        {
            id: 'surv_3',
            optionA: 'Have a radio that only receives messages?',
            optionB: 'Have one that only sends but never know if anyone hears?',
            typePoints: { cactus_hugger: 0, polar_bear_mode: -1, jungle_vip: 1, concrete_survivor: 0 }
        },
        {
            id: 'surv_4',
            optionA: 'Be the leader everyone blames when things go wrong?',
            optionB: 'Be the follower who knows better but can\'t speak up?',
            typePoints: { cactus_hugger: 0, polar_bear_mode: 0, jungle_vip: 2, concrete_survivor: -1 }
        },
        {
            id: 'surv_5',
            optionA: 'Know which of your group won\'t make it?',
            optionB: 'Believe everyone has equal chances?',
            typePoints: { cactus_hugger: 2, polar_bear_mode: -1, jungle_vip: 0, concrete_survivor: 1 }
        },
        {
            id: 'surv_6',
            optionA: 'Trust a stranger who claims to know the way out?',
            optionB: 'Stay in familiar danger?',
            typePoints: { cactus_hugger: -1, polar_bear_mode: 0, jungle_vip: 2, concrete_survivor: -1 }
        },
        {
            id: 'surv_7',
            optionA: 'Tell a seriously injured person the truth about their chances?',
            optionB: 'Let them hope until the end?',
            typePoints: { cactus_hugger: 1, polar_bear_mode: 0, jungle_vip: -1, concrete_survivor: 1 }
        },
        {
            id: 'surv_8',
            optionA: 'Hear the thoughts of your survival group?',
            optionB: 'Have them hear yours?',
            typePoints: { cactus_hugger: 0, polar_bear_mode: 1, jungle_vip: -1, concrete_survivor: 0 }
        },
        {
            id: 'surv_9',
            optionA: 'Endure constant 40°C heat with shade?',
            optionB: 'Endure -20°C cold with shelter materials?',
            typePoints: { cactus_hugger: 2, polar_bear_mode: -2, jungle_vip: 1, concrete_survivor: 0 }
        },
        {
            id: 'surv_10',
            optionA: 'Live where edible plants are abundant but all animals are predators?',
            optionB: 'Live where animals are harmless but vegetation is 90% toxic?',
            typePoints: { cactus_hugger: 0, polar_bear_mode: 0, jungle_vip: 1, concrete_survivor: -1 }
        },
        {
            id: 'surv_11',
            optionA: 'Live where rain falls when you\'re sad and sun shines when happy?',
            optionB: 'Live where your energy level controls the temperature around you?',
            typePoints: { cactus_hugger: 0, polar_bear_mode: 1, jungle_vip: 0, concrete_survivor: 0 }
        },
        {
            id: 'surv_12',
            optionA: 'Face nature that warns you 10 minutes before disasters but they\'re 3x stronger?',
            optionB: 'Face normal disasters with no warning?',
            typePoints: { cactus_hugger: 1, polar_bear_mode: 0, jungle_vip: -1, concrete_survivor: 1 }
        },
        {
            id: 'surv_13',
            optionA: 'Survive where storms last 5 minutes but happen hourly?',
            optionB: 'Survive where they last a week but come once a month?',
            typePoints: { cactus_hugger: -1, polar_bear_mode: 1, jungle_vip: 1, concrete_survivor: 0 }
        },
        {
            id: 'surv_14',
            optionA: 'Survive solo with all supplies you need?',
            optionB: 'Survive with a group but constant resource shortage?',
            typePoints: { cactus_hugger: 2, polar_bear_mode: -1, jungle_vip: -2, concrete_survivor: 1 }
        },
        {
            id: 'surv_15',
            optionA: 'Survive a toxic disaster where you\'re immune but a carrier?',
            optionB: 'Be vulnerable but can\'t spread it?',
            typePoints: { cactus_hugger: 0, polar_bear_mode: 0, jungle_vip: -1, concrete_survivor: 1 }
        },
        {
            id: 'surv_16',
            optionA: 'Share your only map with the group?',
            optionB: 'Memorize it and destroy so no one can take it?',
            typePoints: { cactus_hugger: -1, polar_bear_mode: 0, jungle_vip: 1, concrete_survivor: 0 }
        },
        {
            id: 'surv_17',
            optionA: 'Recover from any injury overnight but feel intense pain?',
            optionB: 'Heal slowly but feel no pain warnings?',
            typePoints: { cactus_hugger: 1, polar_bear_mode: 0, jungle_vip: 0, concrete_survivor: -1 }
        },
        {
            id: 'surv_18',
            optionA: 'Maintain perfect health but age twice as fast?',
            optionB: 'Age normally but get sick easily?',
            typePoints: { cactus_hugger: 1, polar_bear_mode: -1, jungle_vip: 0, concrete_survivor: 0 }
        },
        {
            id: 'surv_19',
            optionA: 'Remember survival skills perfectly but forget your past?',
            optionB: 'Keep memories but skills fade daily?',
            typePoints: { cactus_hugger: 2, polar_bear_mode: 0, jungle_vip: -1, concrete_survivor: 0 }
        },
        {
            id: 'surv_20',
            optionA: 'Master any one survival skill perfectly but forget all others?',
            optionB: 'Be moderately good at all survival skills?',
            typePoints: { cactus_hugger: 0, polar_bear_mode: 0, jungle_vip: -1, concrete_survivor: 2 }
        },
        {
            id: 'surv_21',
            optionA: 'Face predictable natural disasters monthly?',
            optionB: 'Face random accidents weekly?',
            typePoints: { cactus_hugger: 1, polar_bear_mode: 0, jungle_vip: -1, concrete_survivor: 1 }
        },
        {
            id: 'surv_22',
            optionA: 'Know medicine for any illness but ingredients are always 100 miles away?',
            optionB: 'Have remedies nearby but guess how to use them?',
            typePoints: { cactus_hugger: 0, polar_bear_mode: -1, jungle_vip: 1, concrete_survivor: 0 }
        },
        {
            id: 'surv_23',
            optionA: 'Have your presence calm wild animals but attract insects?',
            optionB: 'Repel all bugs but make animals aggressive?',
            typePoints: { cactus_hugger: 0, polar_bear_mode: 0, jungle_vip: 2, concrete_survivor: -1 }
        },
        {
            id: 'surv_24',
            optionA: 'Burn irreplaceable shelter for warmth in deadly cold?',
            optionB: 'Risk hypothermia to keep it?',
            typePoints: { cactus_hugger: -1, polar_bear_mode: 2, jungle_vip: 0, concrete_survivor: 0 }
        },
        {
            id: 'surv_25',
            optionA: 'Eat questionable food now while strong?',
            optionB: 'Save it for when you\'re desperate but weaker?',
            typePoints: { cactus_hugger: 0, polar_bear_mode: 1, jungle_vip: 1, concrete_survivor: -1 }
        }
    ],
    
    social_life: [
        {
            id: 'soc_1',
            optionA: 'Master the art of ending conversations gracefully?',
            optionB: 'Never feel awkward silence in any situation?',
            typePoints: { disco_disaster: 1, blanket_burrito: -1, social_gps: 2, ghost_protocol: 0 }
        },
        {
            id: 'soc_2',
            optionA: 'Make everyone\'s day 10% better but never get credit?',
            optionB: 'Be thanked constantly for things you didn\'t actually do?',
            typePoints: { disco_disaster: -1, blanket_burrito: 1, social_gps: 0, ghost_protocol: 2 }
        },
        {
            id: 'soc_3',
            optionA: 'Have all your jokes land perfectly but no one remembers you told them?',
            optionB: 'Be known as hilarious but never actually make anyone laugh?',
            typePoints: { disco_disaster: 2, blanket_burrito: -1, social_gps: 1, ghost_protocol: -1 }
        },
        {
            id: 'soc_4',
            optionA: 'Feel everyone\'s emotions as your own for one hour each day?',
            optionB: 'Be emotionally numb except for one random hour daily?',
            typePoints: { disco_disaster: -1, blanket_burrito: 1, social_gps: 2, ghost_protocol: -2 }
        },
        {
            id: 'soc_5',
            optionA: 'Be everyone\'s first choice for fun but last choice for serious talks?',
            optionB: 'Be sought for wisdom but never invited to celebrations?',
            typePoints: { disco_disaster: 2, blanket_burrito: -2, social_gps: 1, ghost_protocol: 0 }
        },
        {
            id: 'soc_6',
            optionA: 'Have your advice always work but only for others, never for you?',
            optionB: 'Solve your own problems easily but can\'t help anyone else?',
            typePoints: { disco_disaster: 0, blanket_burrito: 0, social_gps: 2, ghost_protocol: -1 }
        },
        {
            id: 'soc_7',
            optionA: 'Have every group photo you\'re in become iconic but you always look terrible?',
            optionB: 'Look amazing in every photo but they all get deleted or lost?',
            typePoints: { disco_disaster: 1, blanket_burrito: -1, social_gps: 2, ghost_protocol: -2 }
        },
        {
            id: 'soc_8',
            optionA: 'Have a magnetic personality that attracts people you don\'t like?',
            optionB: 'Repel everyone initially but form incredible bonds with those who stay?',
            typePoints: { disco_disaster: 1, blanket_burrito: -2, social_gps: 0, ghost_protocol: 2 }
        },
        {
            id: 'soc_9',
            optionA: 'Always say things that make people think deeply but kill the mood?',
            optionB: 'Keep conversations light and fun but never have meaningful exchanges?',
            typePoints: { disco_disaster: -2, blanket_burrito: 1, social_gps: 0, ghost_protocol: 1 }
        },
        {
            id: 'soc_10',
            optionA: 'Be famous for someone else\'s greatest achievement?',
            optionB: 'Never get recognition for your own life-changing work?',
            typePoints: { disco_disaster: 1, blanket_burrito: 0, social_gps: 2, ghost_protocol: -2 }
        },
        {
            id: 'soc_11',
            optionA: 'Be the person everyone confides in during crisis but ghosts after?',
            optionB: 'Only hear from people during their best moments but miss their struggles?',
            typePoints: { disco_disaster: -1, blanket_burrito: 0, social_gps: 2, ghost_protocol: 1 }
        },
        {
            id: 'soc_12',
            optionA: 'Have your mistakes become everyone\'s favorite funny stories?',
            optionB: 'Be remembered as perfect but incredibly boring?',
            typePoints: { disco_disaster: 2, blanket_burrito: -1, social_gps: 1, ghost_protocol: -1 }
        },
        {
            id: 'soc_13',
            optionA: 'Have your sarcasm always taken seriously by everyone?',
            optionB: 'Have your genuine sincerity always sound sarcastic?',
            typePoints: { disco_disaster: 0, blanket_burrito: 1, social_gps: -1, ghost_protocol: 2 }
        },
        {
            id: 'soc_14',
            optionA: 'Be the tech wizard who kills every social situation?',
            optionB: 'Navigate any social moment perfectly but technology dies at your touch?',
            typePoints: { disco_disaster: -2, blanket_burrito: 2, social_gps: -1, ghost_protocol: 1 }
        },
        {
            id: 'soc_15',
            optionA: 'Remember every conversation in perfect detail but others forget?',
            optionB: 'Have amnesia after each chat but leave unforgettable impressions?',
            typePoints: { disco_disaster: -1, blanket_burrito: 1, social_gps: 0, ghost_protocol: 2 }
        },
        {
            id: 'soc_16',
            optionA: 'Be everyone\'s plus-one but never the main invite?',
            optionB: 'Always be invited directly but have no one to bring?',
            typePoints: { disco_disaster: 0, blanket_burrito: 1, social_gps: 2, ghost_protocol: -2 }
        },
        {
            id: 'soc_17',
            optionA: 'Have your presence make shy people confident but confident people nervous?',
            optionB: 'Bring out everyone\'s worst qualities but they still enjoy your company?',
            typePoints: { disco_disaster: 1, blanket_burrito: -1, social_gps: 2, ghost_protocol: 0 }
        },
        {
            id: 'soc_18',
            optionA: 'Have every goodbye feel final even when it\'s not?',
            optionB: 'Never properly say goodbye to anyone who matters?',
            typePoints: { disco_disaster: -1, blanket_burrito: 0, social_gps: -1, ghost_protocol: 2 }
        },
        {
            id: 'soc_19',
            optionA: 'Have your friends only exist in separate, non-overlapping groups?',
            optionB: 'Have all your friends know each other but you\'re the least favorite?',
            typePoints: { disco_disaster: -1, blanket_burrito: 1, social_gps: -2, ghost_protocol: 2 }
        },
        {
            id: 'soc_20',
            optionA: 'Create best friendships between others then lose touch with both?',
            optionB: 'Break up every friend group you join but keep individual friendships?',
            typePoints: { disco_disaster: 0, blanket_burrito: -1, social_gps: 2, ghost_protocol: 1 }
        },
        {
            id: 'soc_21',
            optionA: 'Have your presence make every event better but you never enjoy them?',
            optionB: 'Have the time of your life everywhere but kill the vibe for others?',
            typePoints: { disco_disaster: -2, blanket_burrito: 1, social_gps: 2, ghost_protocol: 0 }
        },
        {
            id: 'soc_22',
            optionA: 'Form instant deep connections that last exactly one year?',
            optionB: 'Take five years to make friends but they last forever?',
            typePoints: { disco_disaster: 2, blanket_burrito: -2, social_gps: 1, ghost_protocol: 0 }
        },
        {
            id: 'soc_23',
            optionA: 'Know exactly what makes people happy but it never works when you try?',
            optionB: 'Accidentally make people happy without understanding how?',
            typePoints: { disco_disaster: -1, blanket_burrito: 0, social_gps: 1, ghost_protocol: 2 }
        },
        {
            id: 'soc_24',
            optionA: 'Have everyone trust you with secrets you wish you didn\'t know?',
            optionB: 'Be completely trustworthy but no one believes it?',
            typePoints: { disco_disaster: 0, blanket_burrito: 1, social_gps: 2, ghost_protocol: -1 }
        },
        {
            id: 'soc_25',
            optionA: 'Be everyone\'s favorite person to complain to about others?',
            optionB: 'Never hear complaints but know you\'re being complained about?',
            typePoints: { disco_disaster: -1, blanket_burrito: 2, social_gps: 1, ghost_protocol: -2 }
        }
    ],
    
    food_fight: [
        {
            id: 'food_1',
            optionA: 'Eat cereal with orange juice forever?',
            optionB: 'Put milk on pizza forever?',
            typePoints: { fancy_pants: -1, couch_potato_pro: 0, spice_warrior: 1, kale_knight: -2 }
        },
        {
            id: 'food_2',
            optionA: 'Dip everything in chocolate?',
            optionB: 'Put hot sauce on everything?',
            typePoints: { fancy_pants: -1, couch_potato_pro: 1, spice_warrior: 2, kale_knight: -1 }
        },
        {
            id: 'food_3',
            optionA: 'Eat only foods from TV commercials?',
            optionB: 'Avoid all advertised foods forever?',
            typePoints: { fancy_pants: -2, couch_potato_pro: 2, spice_warrior: 0, kale_knight: 1 }
        },
        {
            id: 'food_4',
            optionA: 'Only eat foods you\'ve never tried before?',
            optionB: 'Eat the same 5 meals forever?',
            typePoints: { fancy_pants: 1, couch_potato_pro: -2, spice_warrior: 2, kale_knight: 0 }
        },
        {
            id: 'food_5',
            optionA: 'Share every meal with a stranger?',
            optionB: 'Always eat completely alone?',
            typePoints: { fancy_pants: 1, couch_potato_pro: -1, spice_warrior: 0, kale_knight: 0 }
        },
        {
            id: 'food_6',
            optionA: 'Only eat at sketchy food trucks?',
            optionB: 'Only cook with sale ingredients?',
            typePoints: { fancy_pants: -2, couch_potato_pro: 0, spice_warrior: 2, kale_knight: -1 }
        },
        {
            id: 'food_7',
            optionA: 'Give up cheese forever?',
            optionB: 'Give up bread forever?',
            typePoints: { fancy_pants: 0, couch_potato_pro: -1, spice_warrior: 0, kale_knight: 1 }
        },
        {
            id: 'food_8',
            optionA: 'Have your favorite food lose all flavor?',
            optionB: 'Never be able to eat it again?',
            typePoints: { fancy_pants: 1, couch_potato_pro: -1, spice_warrior: 0, kale_knight: 0 }
        },
        {
            id: 'food_9',
            optionA: 'Have all your food be 10% too salty?',
            optionB: 'Have all your food be 10% too sweet?',
            typePoints: { fancy_pants: 0, couch_potato_pro: 0, spice_warrior: 1, kale_knight: -1 }
        },
        {
            id: 'food_10',
            optionA: 'Eat your least favorite food once a week?',
            optionB: 'Never eat your favorite food again?',
            typePoints: { fancy_pants: 0, couch_potato_pro: -1, spice_warrior: 1, kale_knight: 1 }
        },
        {
            id: 'food_11',
            optionA: 'Always be the one who cooks?',
            optionB: 'Always be the one who cleans?',
            typePoints: { fancy_pants: 1, couch_potato_pro: -2, spice_warrior: 0, kale_knight: 1 }
        },
        {
            id: 'food_12',
            optionA: 'Eat before everyone else is served?',
            optionB: 'Eat after everyone else is finished?',
            typePoints: { fancy_pants: -1, couch_potato_pro: 1, spice_warrior: 0, kale_knight: 0 }
        },
        {
            id: 'food_13',
            optionA: 'Always get the wrong order delivered?',
            optionB: 'Always have missing items?',
            typePoints: { fancy_pants: -1, couch_potato_pro: 0, spice_warrior: 1, kale_knight: 0 }
        },
        {
            id: 'food_14',
            optionA: 'Always be hungry an hour after eating?',
            optionB: 'Always feel too full?',
            typePoints: { fancy_pants: 0, couch_potato_pro: -1, spice_warrior: 0, kale_knight: 2 }
        },
        {
            id: 'food_15',
            optionA: 'Have your food come out wrong but fast?',
            optionB: 'Have it perfect but an hour late?',
            typePoints: { fancy_pants: -2, couch_potato_pro: 2, spice_warrior: 0, kale_knight: 0 }
        },
        {
            id: 'food_16',
            optionA: 'Eat at a place with rude staff but delicious food?',
            optionB: 'Eat at a place with friendly staff but terrible food?',
            typePoints: { fancy_pants: 2, couch_potato_pro: 0, spice_warrior: 1, kale_knight: -1 }
        },
        {
            id: 'food_17',
            optionA: 'Eat spaghetti with no sauce?',
            optionB: 'Eat sauce with no spaghetti?',
            typePoints: { fancy_pants: -1, couch_potato_pro: 0, spice_warrior: 0, kale_knight: 1 }
        },
        {
            id: 'food_18',
            optionA: 'Drink flat soda?',
            optionB: 'Drink watered-down juice?',
            typePoints: { fancy_pants: -1, couch_potato_pro: 1, spice_warrior: 0, kale_knight: 0 }
        },
        {
            id: 'food_19',
            optionA: 'Eat only dark chocolate?',
            optionB: 'Eat only white chocolate?',
            typePoints: { fancy_pants: 2, couch_potato_pro: -1, spice_warrior: 0, kale_knight: 1 }
        },
        {
            id: 'food_20',
            optionA: 'Eat food that\'s always one day past its best?',
            optionB: 'Eat food that needs one more day to ripen?',
            typePoints: { fancy_pants: -1, couch_potato_pro: 1, spice_warrior: 1, kale_knight: -1 }
        },
        {
            id: 'food_21',
            optionA: 'Have all drinks taste like your last meal?',
            optionB: 'Have all foods taste like your last drink?',
            typePoints: { fancy_pants: 0, couch_potato_pro: 0, spice_warrior: 2, kale_knight: -1 }
        },
        {
            id: 'food_22',
            optionA: 'Give up your favorite food forever?',
            optionB: 'Eat only that food for a year?',
            typePoints: { fancy_pants: 1, couch_potato_pro: -2, spice_warrior: 0, kale_knight: 1 }
        },
        {
            id: 'food_23',
            optionA: 'Eat with clean hands from a dirty plate?',
            optionB: 'Eat with dirty hands from a clean plate?',
            typePoints: { fancy_pants: -2, couch_potato_pro: 0, spice_warrior: 1, kale_knight: 0 }
        },
        {
            id: 'food_24',
            optionA: 'Eat your daily meals in random order?',
            optionB: 'Eat all courses mixed together?',
            typePoints: { fancy_pants: -1, couch_potato_pro: 1, spice_warrior: 1, kale_knight: -1 }
        },
        {
            id: 'food_25',
            optionA: 'Forget the taste of everything you\'ve eaten?',
            optionB: 'Remember the taste but never eat it again?',
            typePoints: { fancy_pants: 0, couch_potato_pro: -1, spice_warrior: 0, kale_knight: 2 }
        }
    ],
    
    jet_set: [
        {
            id: 'trav_1',
            optionA: 'Have a pet that travels with you everywhere?',
            optionB: 'Make a new friend in each place?',
            typePoints: { wrong_way_wanderer: 0, resort_royalty: -1, champagne_checkpoint: 1, couch_surfing_ceo: 2 }
        },
        {
            id: 'trav_2',
            optionA: 'Get lost in a Moroccan souk without GPS?',
            optionB: 'Get lost in Tokyo subway without GPS?',
            typePoints: { wrong_way_wanderer: 2, resort_royalty: -2, champagne_checkpoint: -1, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_3',
            optionA: 'Sleep in a tent on a cliff edge?',
            optionB: 'Sleep in a haunted castle?',
            typePoints: { wrong_way_wanderer: 2, resort_royalty: -2, champagne_checkpoint: 0, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_4',
            optionA: 'Be a travel blogger with no home base?',
            optionB: 'Settle in your dream country but never leave?',
            typePoints: { wrong_way_wanderer: 2, resort_royalty: 0, champagne_checkpoint: -1, couch_surfing_ceo: 2 }
        },
        {
            id: 'trav_5',
            optionA: 'Travel only during rainy seasons?',
            optionB: 'Travel only during major holidays?',
            typePoints: { wrong_way_wanderer: 1, resort_royalty: -1, champagne_checkpoint: -2, couch_surfing_ceo: 2 }
        },
        {
            id: 'trav_6',
            optionA: 'Carry a 20kg backpack everywhere?',
            optionB: 'Push a suitcase with a squeaky wheel?',
            typePoints: { wrong_way_wanderer: 1, resort_royalty: -2, champagne_checkpoint: 0, couch_surfing_ceo: 2 }
        },
        {
            id: 'trav_7',
            optionA: 'Swim with jellyfish in Thailand?',
            optionB: 'Hike near volcanoes in Iceland?',
            typePoints: { wrong_way_wanderer: 1, resort_royalty: 0, champagne_checkpoint: 0, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_8',
            optionA: 'Visit a new country nightly but forget where you are?',
            optionB: 'Stay in one place but dream vividly of travel?',
            typePoints: { wrong_way_wanderer: 2, resort_royalty: -2, champagne_checkpoint: -1, couch_surfing_ceo: 0 }
        },
        {
            id: 'trav_9',
            optionA: 'Live one year in airports?',
            optionB: 'Live one year in roadside motels?',
            typePoints: { wrong_way_wanderer: 0, resort_royalty: -1, champagne_checkpoint: 1, couch_surfing_ceo: 2 }
        },
        {
            id: 'trav_10',
            optionA: 'Travel with a talking parrot?',
            optionB: 'Travel with a silent psychic cat?',
            typePoints: { wrong_way_wanderer: 2, resort_royalty: 0, champagne_checkpoint: 1, couch_surfing_ceo: 0 }
        },
        {
            id: 'trav_11',
            optionA: 'Travel with unlimited batteries?',
            optionB: 'Travel with unlimited snacks?',
            typePoints: { wrong_way_wanderer: -1, resort_royalty: 0, champagne_checkpoint: 2, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_12',
            optionA: 'Always get upgraded to first class?',
            optionB: 'Always have a private airport lounge?',
            typePoints: { wrong_way_wanderer: -1, resort_royalty: 1, champagne_checkpoint: 2, couch_surfing_ceo: -2 }
        },
        {
            id: 'trav_13',
            optionA: 'Lose your camera on the last day?',
            optionB: 'Lose your passport on the last day?',
            typePoints: { wrong_way_wanderer: 1, resort_royalty: -2, champagne_checkpoint: 0, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_14',
            optionA: 'Visit a country that feels instantly like home?',
            optionB: 'Visit one that constantly challenges your views?',
            typePoints: { wrong_way_wanderer: -1, resort_royalty: 2, champagne_checkpoint: 1, couch_surfing_ceo: -1 }
        },
        {
            id: 'trav_15',
            optionA: 'Explore a place that doesn\'t exist on any map?',
            optionB: 'Revisit a place that exists only in your memory?',
            typePoints: { wrong_way_wanderer: 2, resort_royalty: -1, champagne_checkpoint: -1, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_16',
            optionA: 'Travel where no one knows your name?',
            optionB: 'Travel where everyone knows your story?',
            typePoints: { wrong_way_wanderer: 1, resort_royalty: -1, champagne_checkpoint: 0, couch_surfing_ceo: 2 }
        },
        {
            id: 'trav_17',
            optionA: 'Visit a country where you don\'t speak the language?',
            optionB: 'Visit where you speak fluently but don\'t understand the culture?',
            typePoints: { wrong_way_wanderer: 2, resort_royalty: -2, champagne_checkpoint: -1, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_18',
            optionA: 'Take a detour to a hidden village?',
            optionB: 'Take a detour to a secret beach?',
            typePoints: { wrong_way_wanderer: 1, resort_royalty: 0, champagne_checkpoint: 0, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_19',
            optionA: 'Have amazing conversations with strangers abroad?',
            optionB: 'Get perfect travel photos without trying?',
            typePoints: { wrong_way_wanderer: 0, resort_royalty: -1, champagne_checkpoint: 1, couch_surfing_ceo: 2 }
        },
        {
            id: 'trav_20',
            optionA: 'Sleep under northern lights in the cold?',
            optionB: 'Sleep under desert stars in the heat?',
            typePoints: { wrong_way_wanderer: 1, resort_royalty: -1, champagne_checkpoint: 0, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_21',
            optionA: 'Plan every detail of your trip?',
            optionB: 'Travel without any reservations?',
            typePoints: { wrong_way_wanderer: -2, resort_royalty: 1, champagne_checkpoint: 2, couch_surfing_ceo: -1 }
        },
        {
            id: 'trav_22',
            optionA: 'Find a 100-year-old letter in your hotel?',
            optionB: 'Leave a letter for someone in 100 years?',
            typePoints: { wrong_way_wanderer: 0, resort_royalty: 0, champagne_checkpoint: 1, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_23',
            optionA: 'Discover a place that changes your values?',
            optionB: 'Find one that confirms all your beliefs?',
            typePoints: { wrong_way_wanderer: 2, resort_royalty: -1, champagne_checkpoint: -1, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_24',
            optionA: 'Get lost and meet someone life-changing?',
            optionB: 'Follow the map and see everything planned?',
            typePoints: { wrong_way_wanderer: 2, resort_royalty: -1, champagne_checkpoint: -2, couch_surfing_ceo: 1 }
        },
        {
            id: 'trav_25',
            optionA: 'Get a free ticket to an unknown country?',
            optionB: 'Get a free ticket to your favorite place?',
            typePoints: { wrong_way_wanderer: 2, resort_royalty: 1, champagne_checkpoint: -1, couch_surfing_ceo: 0 }
        }
    ],
    
    future_talk: [
        {
            id: 'tech_1',
            optionA: 'Have dinner with your future self?',
            optionB: 'Have dinner with your great-great-grandchild?',
            typePoints: { wifi_whisperer: 0, analog_angel: 0, update_dodger: 1, digital_detox_guru: -1 }
        },
        {
            id: 'tech_2',
            optionA: 'Work on Mars as a colony architect?',
            optionB: 'Stay on Earth reversing climate change?',
            typePoints: { wifi_whisperer: 2, analog_angel: -2, update_dodger: 0, digital_detox_guru: 1 }
        },
        {
            id: 'tech_3',
            optionA: 'Use time travel once to fix a regret?',
            optionB: 'Use it once to relive a perfect moment?',
            typePoints: { wifi_whisperer: -1, analog_angel: 1, update_dodger: 0, digital_detox_guru: 0 }
        },
        {
            id: 'tech_4',
            optionA: 'Live where dreams can be recorded?',
            optionB: 'Live where memories can be erased at will?',
            typePoints: { wifi_whisperer: 2, analog_angel: -2, update_dodger: -1, digital_detox_guru: -1 }
        },
        {
            id: 'tech_5',
            optionA: 'Let algorithms find your friends?',
            optionB: 'Let algorithms choose your career?',
            typePoints: { wifi_whisperer: 2, analog_angel: -2, update_dodger: 0, digital_detox_guru: -2 }
        },
        {
            id: 'tech_6',
            optionA: 'Have a brain chip for instant learning?',
            optionB: 'Have eyes that record everything?',
            typePoints: { wifi_whisperer: 2, analog_angel: -2, update_dodger: -1, digital_detox_guru: -1 }
        },
        {
            id: 'tech_7',
            optionA: 'Have a robot that always tells harsh truths?',
            optionB: 'Have one that lies to keep you happy?',
            typePoints: { wifi_whisperer: 1, analog_angel: -1, update_dodger: 0, digital_detox_guru: 0 }
        },
        {
            id: 'tech_8',
            optionA: 'Live on a space station orbiting Earth?',
            optionB: 'Live in a biodome on Mars?',
            typePoints: { wifi_whisperer: 1, analog_angel: -1, update_dodger: 0, digital_detox_guru: -1 }
        },
        {
            id: 'tech_9',
            optionA: 'Live forever in a simulation?',
            optionB: 'Have one real lifetime?',
            typePoints: { wifi_whisperer: 2, analog_angel: -2, update_dodger: -2, digital_detox_guru: 1 }
        },
        {
            id: 'tech_10',
            optionA: 'Explore a planet with hostile AI?',
            optionB: 'Explore one with deadly creatures?',
            typePoints: { wifi_whisperer: 1, analog_angel: -1, update_dodger: 0, digital_detox_guru: 0 }
        },
        {
            id: 'tech_11',
            optionA: 'Discover a wormhole to parallel universes?',
            optionB: 'Find a portal to your own future?',
            typePoints: { wifi_whisperer: 0, analog_angel: 0, update_dodger: 1, digital_detox_guru: 0 }
        },
        {
            id: 'tech_12',
            optionA: 'Explore an abandoned alien ship?',
            optionB: 'Decrypt signals from a dying galaxy?',
            typePoints: { wifi_whisperer: 1, analog_angel: 0, update_dodger: 0, digital_detox_guru: -1 }
        },
        {
            id: 'tech_13',
            optionA: 'Colonize a planet with strangers?',
            optionB: 'Colonize with digital copies of old friends?',
            typePoints: { wifi_whisperer: -1, analog_angel: 1, update_dodger: 0, digital_detox_guru: 2 }
        },
        {
            id: 'tech_14',
            optionA: 'Let AI govern your country with perfect data precision?',
            optionB: 'Keep flawed but democratically elected human leaders?',
            typePoints: { wifi_whisperer: 2, analog_angel: -2, update_dodger: -1, digital_detox_guru: 0 }
        },
        {
            id: 'tech_15',
            optionA: 'Have tech-regulated perfect emotions?',
            optionB: 'Keep unpredictable human moods?',
            typePoints: { wifi_whisperer: 2, analog_angel: -2, update_dodger: -1, digital_detox_guru: -1 }
        },
        {
            id: 'tech_16',
            optionA: 'Speak every human language fluently?',
            optionB: 'Communicate with any machine?',
            typePoints: { wifi_whisperer: -1, analog_angel: 1, update_dodger: 0, digital_detox_guru: 1 }
        },
        {
            id: 'tech_17',
            optionA: 'Trust a machine to raise your child?',
            optionB: 'Trust one to care for you when old?',
            typePoints: { wifi_whisperer: 2, analog_angel: -2, update_dodger: 0, digital_detox_guru: -2 }
        },
        {
            id: 'tech_18',
            optionA: 'Have AI that predicts your decisions with 90% accuracy?',
            optionB: 'Experience one day from any future year annually?',
            typePoints: { wifi_whisperer: 2, analog_angel: -1, update_dodger: -1, digital_detox_guru: -1 }
        },
        {
            id: 'tech_19',
            optionA: 'Change your appearance instantly like changing clothes?',
            optionB: 'Live half your waking hours in virtual reality?',
            typePoints: { wifi_whisperer: 1, analog_angel: -2, update_dodger: 0, digital_detox_guru: -2 }
        },
        {
            id: 'tech_20',
            optionA: 'Master any skill daily but risk forgetting old ones?',
            optionB: 'Visit your ancestors\' memories as a silent observer?',
            typePoints: { wifi_whisperer: 1, analog_angel: 0, update_dodger: -1, digital_detox_guru: 0 }
        },
        {
            id: 'tech_21',
            optionA: 'Have a permanent AI companion that evolves with you?',
            optionB: 'Replace your AI companion with newer models every 5 years?',
            typePoints: { wifi_whisperer: 1, analog_angel: -2, update_dodger: 1, digital_detox_guru: -1 }
        },
        {
            id: 'tech_22',
            optionA: 'Control gravity in a small area around you?',
            optionB: 'Talk to your younger self for 5 minutes yearly?',
            typePoints: { wifi_whisperer: 0, analog_angel: 0, update_dodger: 1, digital_detox_guru: 1 }
        },
        {
            id: 'tech_23',
            optionA: 'Build a self-sustaining moon city?',
            optionB: 'Create instant skill-sharing technology?',
            typePoints: { wifi_whisperer: 1, analog_angel: -1, update_dodger: 0, digital_detox_guru: -1 }
        },
        {
            id: 'tech_24',
            optionA: 'Detect lies perfectly but only in one chosen person?',
            optionB: 'Experience one day from any future century as visitor?',
            typePoints: { wifi_whisperer: 0, analog_angel: 0, update_dodger: 1, digital_detox_guru: 0 }
        },
        {
            id: 'tech_25',
            optionA: 'Instantly grow any plant anywhere for food or resources?',
            optionB: 'Access all possible inventions but build only one yearly?',
            typePoints: { wifi_whisperer: -1, analog_angel: 1, update_dodger: 0, digital_detox_guru: 2 }
        }
    ],
    
    grab_bag: [
        {
            id: 'rand_1',
            optionA: 'Have a rewind button for life',
            optionB: 'Have a pause button for life',
            typePoints: { shower_philosopher: 1, meme_machine: -1, main_character_energy: 0, reality_check_champion: 0 }
        },
        {
            id: 'rand_2',
            optionA: 'Be able to fly but only 2 feet off the ground',
            optionB: 'Be able to teleport but only to places you\'ve been',
            typePoints: { shower_philosopher: 0, meme_machine: 1, main_character_energy: 1, reality_check_champion: -1 }
        },
        {
            id: 'rand_3',
            optionA: 'Have a pet dragon',
            optionB: 'Have a pet unicorn',
            typePoints: { shower_philosopher: -1, meme_machine: 0, main_character_energy: 2, reality_check_champion: -2 }
        },
        {
            id: 'rand_4',
            optionA: 'Always know when someone is lying',
            optionB: 'Always get away with lying',
            typePoints: { shower_philosopher: 2, meme_machine: -1, main_character_energy: -1, reality_check_champion: 1 }
        },
        {
            id: 'rand_5',
            optionA: 'Have fingers as long as legs',
            optionB: 'Have legs as short as fingers',
            typePoints: { shower_philosopher: -1, meme_machine: 2, main_character_energy: 0, reality_check_champion: -1 }
        },
        {
            id: 'rand_6',
            optionA: 'Sneeze glitter',
            optionB: 'Cry chocolate tears',
            typePoints: { shower_philosopher: -1, meme_machine: 1, main_character_energy: 2, reality_check_champion: -2 }
        },
        {
            id: 'rand_7',
            optionA: 'Have your thoughts appear above your head',
            optionB: 'Have theme music play based on your mood',
            typePoints: { shower_philosopher: 1, meme_machine: 1, main_character_energy: 0, reality_check_champion: -2 }
        },
        {
            id: 'rand_8',
            optionA: 'Be the funniest person alive but no one gets your jokes',
            optionB: 'Think everyone is hilarious but never laugh',
            typePoints: { shower_philosopher: 1, meme_machine: -2, main_character_energy: 0, reality_check_champion: 0 }
        },
        {
            id: 'rand_9',
            optionA: 'Live in a world made of candy',
            optionB: 'Live in a world made of LEGO',
            typePoints: { shower_philosopher: -1, meme_machine: 0, main_character_energy: 2, reality_check_champion: -2 }
        },
        {
            id: 'rand_10',
            optionA: 'Have a tail that shows your emotions',
            optionB: 'Change color based on your mood',
            typePoints: { shower_philosopher: 0, meme_machine: 1, main_character_energy: 1, reality_check_champion: -2 }
        }
    ]
};

// Personality Types Database
const PERSONALITY_TYPES = {
    survival_mode: {
        cactus_hugger: {
            name: 'Cactus Hugger',
            icon: '🌵',
            description: 'You\'re the friend who brings 47 water bottles on a 2-hour trip. Your survival strategy? Overprepare for everything, including scenarios that only exist in movies. You\'ve definitely googled \'how to survive quicksand\' at 3 AM.'
        },
        polar_bear_mode: {
            name: 'Polar Bear Mode',
            icon: '❄️',
            description: 'You wear shorts in winter and claim \'it\'s not that cold.\' Your ideal vacation involves igloos and frostbite warnings. Friends suspect you\'re secretly training for the next Ice Age, and honestly? They might be right.'
        },
        jungle_vip: {
            name: 'Jungle VIP',
            icon: '🌴',
            description: 'You\'re the one who befriends mosquitoes and names the spiders in your tent. While others scream at bugs, you\'re conducting interviews with them. Your motto: \'If Bear Grylls can eat it, so can I!\''
        },
        concrete_survivor: {
            name: 'Concrete Survivor',
            icon: '🏙️',
            description: 'You know every 24/7 store in a 10-mile radius and have mapped all the WiFi passwords. Your bug-out bag contains phone chargers and coffee shop loyalty cards. The apocalypse better have good cell service.'
        }
    },
    
    social_life: {
        disco_disaster: {
            name: 'Disco Disaster',
            icon: '🎉',
            description: 'You\'re why parties have a \'one friend maximum\' rule. Your energy could power a small city, and your dance moves have been classified as natural disasters in 3 states. We love you, but please stop suggesting karaoke at funerals.'
        },
        blanket_burrito: {
            name: 'Blanket Burrito',
            icon: '🕯️',
            description: 'Your ideal party involves exactly 0 people and 17 blankets. You\'ve mastered the art of looking busy on your phone, and your spirit animal is a \'Do Not Disturb\' sign. Netflix asks if YOU\'RE still watching.'
        },
        social_gps: {
            name: 'Social GPS',
            icon: '🦋',
            description: 'You know everyone\'s birthday, their dog\'s name, and their coffee order. You\'re simultaneously invited to 7 events and somehow attend all of them. Scientists study your ability to remember names after meeting someone once.'
        },
        ghost_protocol: {
            name: 'Ghost Protocol',
            icon: '🐺',
            description: 'You\'re the Houdini of social events - there one second, vanished the next. Your superpower is leaving parties without anyone noticing. Friends have started taking attendance just to track you.'
        }
    },
    
    food_fight: {
        fancy_pants: {
            name: 'Fancy Pants',
            icon: '👨‍🍳',
            description: 'You pronounce \'croissant\' so French that actual French people get confused. Your Instagram is 98% food pics with perfect lighting. You\'ve definitely corrected someone\'s pronunciation of \'quinoa\' at least twice today.'
        },
        couch_potato_pro: {
            name: 'Couch Potato Pro',
            icon: '🍕',
            description: 'Your food pyramid is just a triangle of pizza. You have strong opinions about the correct way to eat Oreos and consider cereal a viable dinner option. Gordon Ramsay would cry, but you\'re living your best life.'
        },
        spice_warrior: {
            name: 'Spice Warrior',
            icon: '🌶️',
            description: 'You\'re the friend who orders \'extra spicy\' and makes the waiter nervous. Your taste buds went on vacation in 2015 and never came back. You\'ve definitely eaten something on a dare and asked for seconds.'
        },
        kale_knight: {
            name: 'Kale Knight',
            icon: '🥗',
            description: 'Your smoothies have more ingredients than a chemistry set. You know what spirulina is AND how to pronounce it. Friends hide their snacks when you visit, fearing your judgment and unsolicited nutrition facts.'
        }
    },
    
    jet_set: {
        wrong_way_wanderer: {
            name: 'Wrong Way Wanderer',
            icon: '🧭',
            description: 'You\'re the person who gets lost with GPS AND a map. Your travel stories all start with \'So I took a wrong turn...\' but somehow end up being the best adventures. Google Maps has given up on you.'
        },
        resort_royalty: {
            name: 'Resort Royalty',
            icon: '🏖️',
            description: 'Your idea of \'roughing it\' is a 4-star hotel. You\'ve never met a pool you didn\'t Instagram. Your passport is basically a collection of resort stamps, and you know every spa treatment by its Sanskrit name.'
        },
        champagne_checkpoint: {
            name: 'Champagne Checkpoint',
            icon: '✈️',
            description: 'You judge airports by their lounge quality and know flight attendants by name. Your luggage has better insurance than most cars. You\'ve definitely complained about \'only\' having champagne in business class.'
        },
        couch_surfing_ceo: {
            name: 'Couch Surfing CEO',
            icon: '🎒',
            description: 'You can survive on $3 a day and somehow still have the best stories. Your backpack is basically a portable home. You\'ve definitely slept in an airport and rated it on TripAdvisor.'
        }
    },
    
    future_talk: {
        wifi_whisperer: {
            name: 'WiFi Whisperer',
            icon: '🚀',
            description: 'You named your firstborn \'Alexa\' and your router has its own Instagram. You\'ve tried to swipe right on your refrigerator and honestly believe that turning it off and on again solves 97% of life\'s problems. Including relationships.'
        },
        analog_angel: {
            name: 'Analog Angel',
            icon: '📻',
            description: 'You still have a flip phone and it\'s not ironic. Your VCR is \'perfectly functional\' and you know what a floppy disk is. Friends call you for tech support, but only for devices made before 2005.'
        },
        update_dodger: {
            name: 'Update Dodger',
            icon: '⚖️',
            description: 'You have exactly 47 unread app updates and that red notification badge doesn\'t bother you at all (it does). You use technology like a normal person, which makes you the weird one in 2024.'
        },
        digital_detox_guru: {
            name: 'Digital Detox Guru',
            icon: '🌱',
            description: 'Your screen time report is so low, Apple sends you concerned emails. You\'ve definitely told someone about the benefits of a \'digital detox\' while they were mid-Instagram story. Your phone is basically a very expensive clock.'
        }
    },
    
    grab_bag: {
        shower_philosopher: {
            name: 'Shower Philosopher',
            icon: '🤔',
            description: 'You\'ve solved world peace in your head but forgot it by the time you grabbed a towel. Your 3 AM thoughts could fuel a Netflix series. Friends come to you for life advice but you can\'t even match your socks.'
        },
        meme_machine: {
            name: 'Meme Machine',
            icon: '😂',
            description: 'Your entire personality is pop culture references and vine quotes. You communicate primarily in GIFs and have a meme for every life situation. Your search history is 90% \'that one meme where the guy...\''
        },
        main_character_energy: {
            name: 'Main Character Energy',
            icon: '🌟',
            description: 'You\'re living in a movie and everyone else is just an extra. Your life soundtrack plays in your head 24/7. You\'ve definitely practiced your Oscar speech in the shower. Multiple times. Today.'
        },
        reality_check_champion: {
            name: 'Reality Check Champion',
            icon: '🌍',
            description: 'You\'re the friend who reads the terms and conditions. Your superpower is ruining fun facts with actual facts. While others dream of unicorns, you\'re calculating their food costs and stable requirements.'
        }
    }
};

// Export for use in game
window.WouldYouRatherData = {
    questions: QUESTIONS_DB,
    personalityTypes: PERSONALITY_TYPES
};