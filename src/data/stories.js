// Storybook Clone Database: 8 complete interactive digital stories

export const CATEGORIES = [
  { id: 'all', name: 'All Stories', icon: '🌟', count: 8, color: '#fef08a' },
  { id: 'fantasy', name: 'Fantasy', icon: '🦄', count: 1, color: '#fbcfe8' },
  { id: 'adventure', name: 'Adventure', icon: '🗺️', count: 1, color: '#fed7aa' },
  { id: 'moral', name: 'Moral Stories', icon: '🦉', count: 2, color: '#bbf7d0' },
  { id: 'fairytales', name: 'Fairy Tales', icon: '👑', count: 1, color: '#ddd6fe' },
  { id: 'educational', name: 'Educational Stories', icon: '🚀', count: 2, color: '#bae6fd' },
  { id: 'bedtime', name: 'Bedtime Stories', icon: '🌙', count: 1, color: '#c7d2fe' },
];

export const STORIES = [
  {
    id: 'story-1',
    title: 'The Dragon Who Loved Strawberries',
    slug: 'the-dragon-who-loved-strawberries',
    category: 'fantasy',
    categoryName: 'Fantasy',
    ageRange: '4-7 yrs',
    readingTime: '4 min',
    stars: 5,
    coverColor: '#dcfce7',
    accentColor: '#10b981',
    tagline: 'A gentle dragon trades fiery blazes for delicious berry tarts!',
    synopsis: 'Deep in the Whispering Crags lived Barnaby, a bright emerald dragon with rose-tinted horns. While the other dragons practiced scaring knights and roaring at thunderstorms, Barnaby spent his mornings sniffing wild strawberry blossoms and baking fluffy tarts for the whole kingdom.',
    badge: 'Staff Favorite',
    mascot: '🐉',
    pages: [
      {
        pageNumber: 1,
        title: 'Barnaby’s Secret Passion',
        text: 'High up in the Whispering Crags, where storm clouds rolled and jagged rocks kissed the sky, the dragon elders practiced their mighty fire-breathing. "Whoosh! Roar!" they shook the pine needles off the trees. But little Barnaby sat happily in a sunlit meadow, gently holding a tiny wooden basket. Barnaby did not want to burn castles or roar at passing eagles. Barnaby had a top-secret passion: he wanted to be the finest pastry chef in all of Cloverdale!',
        prompt: 'Look at the wild berries! Can you tap Barnaby’s basket?',
        interactiveTarget: 'dragon-basket',
        lesson: 'It takes courage to follow what brings you joy, even if you are different from others.',
        svgScene: 'dragon-meadow'
      },
      {
        pageNumber: 2,
        title: 'The Lost Berry Stash',
        text: 'One crisp autumn morning, Barnaby heard soft sniffling beneath a sprawling huckleberry bush. There sat Pip, a tiny chipmunk with acorns stacked precariously in his paws. "Oh dear, oh dear!" Pip squeaked. "A sudden mountain gale blew away my entire family’s winter berry cache! Without sweet berries, our winter porridge will taste like dry moss!" Barnaby smiled warmly, puffing a harmless heart-shaped wisp of lavender smoke. "Don’t worry, little Pip. My wings can reach the highest sun-drenched sun-terraces where the ripest berries grow!"',
        prompt: 'Tap Pip the chipmunk to cheer him up with sparkles!',
        interactiveTarget: 'pip-chipmunk',
        lesson: 'A true hero uses their special talents to lift others up.',
        svgScene: 'chipmunk-bush'
      },
      {
        pageNumber: 3,
        title: 'Gentle Fire, Perfect Crust',
        text: 'Down by the babbling Crystal Brook, Barnaby and Pip laid out their treasures: three bushels of plump red berries, creamy goat butter from kind Farmer Giles, and golden wildflower honey. Barnaby rolled the pastry dough with a smooth cedar pin, shaping delicate star-shaped crusts. When it was time for the oven, Barnaby didn’t roar wild infernos. Instead, he whistled a soft lullaby and blew a gentle, cozy golden puff of warmth—exactly 350 degrees! The aroma of caramelized sugar and warm cinnamon floated across the entire valley.',
        prompt: 'Tap the magical baking pot to see sweet aromatic steam swirls!',
        interactiveTarget: 'baking-pot',
        lesson: 'Patience and gentle care create the sweetest results.',
        svgScene: 'baking-stream'
      },
      {
        pageNumber: 4,
        title: 'The Great Village Surprise',
        text: 'Hearing the sweetest melody of sizzling tarts, curious villagers cautiously peeked over the stone bridge. In the town square, Queen Cordelia’s guards lowered their shields in utter astonishment. There stood a giant green dragon, proudly wearing a snowy white chef’s hat! Barnaby carefully handed warm, glazed strawberry pastries to every child, elder, and baker in Cloverdale. The first bite made the Queen herself let out a delighted gasp: "This is the most heavenly dessert in three kingdoms!"',
        prompt: 'Tap the Queen’s crown to make it shimmer with celebration!',
        interactiveTarget: 'queen-crown',
        lesson: 'Sharing good food and kind deeds melts away prejudice and fear.',
        svgScene: 'village-square'
      },
      {
        pageNumber: 5,
        title: 'The Royal Master Baker',
        text: 'From that bright morning forward, Barnaby was named Cloverdale’s official Royal Master of Sweet Delights. The elder dragons even flew down from the rocky crags every Saturday evening, happily tucking linen napkins under their scaly chins to enjoy Barnaby’s warm berry crumbles. Barnaby beamed with pride. He proved that warmth shared from the heart is a million times more powerful than any blast of fiery smoke.',
        prompt: 'Tap Barnaby’s chef hat to shower the valley in golden celebration stars!',
        interactiveTarget: 'chef-hat',
        lesson: 'Kindness and sweetness can turn any wild monster into a beloved friend.',
        svgScene: 'royal-feast'
      }
    ]
  },
  {
    id: 'story-2',
    title: 'The Starlight Compass',
    slug: 'the-starlight-compass',
    category: 'adventure',
    categoryName: 'Adventure',
    ageRange: '6-10 yrs',
    readingTime: '5 min',
    stars: 5,
    coverColor: '#e0e7ff',
    accentColor: '#6366f1',
    tagline: 'A mysterious compass that points not north, but straight to hidden wonders!',
    synopsis: 'Twins Maya and Leo discover an antique glowing brass instrument wrapped in indigo silk in grandpa’s observatory. Its celestial dial pulses with starlight and guides them across singing dunes toward a forgotten sky temple.',
    badge: 'Popular',
    mascot: '🧭',
    pages: [
      {
        pageNumber: 1,
        title: 'Dusty Secrets in the Attic',
        text: 'Rain pattered against the stained-glass window of Grandpa Elias’s Victorian attic. Twins Maya and Leo were exploring old sea trunks when Leo’s foot bumped against a polished mahogany chest. Inside, nestled on a bed of star-embroidered velvet, lay a heavy brass pocket compass. But when Maya touched the cold metal rim, the needle began to spin like a miniature galaxy! Instead of pointing north, its luminescent needle spun in glittering circles, settling steadily toward the eastern window with a soft sapphire glow.',
        prompt: 'Tap the antique compass to awaken its celestial dial!',
        interactiveTarget: 'starlight-compass',
        lesson: 'Curiosity is the lantern that illuminates the darkest corners of discovery.',
        svgScene: 'attic-chest'
      },
      {
        pageNumber: 2,
        title: 'The Whispering Singing Dunes',
        text: 'Following the compass’s beam through the orchard gate, the twins found themselves stepping onto the Whispering Dunes—a wondrous desert where the night breeze played harmonic chords across the crests of pale sand. "Listen!" whispered Maya. The sands hummed like a giant cello. As they walked, their footsteps left trails of glowing phosphorescent footprints. High above, shooting stars seemed to pace their every stride, dancing to the compass’s gentle rhythmic pulse.',
        prompt: 'Tap the glowing desert dunes to hear the harmonic night song!',
        interactiveTarget: 'singing-dunes',
        lesson: 'Nature speaks in wonders if we quiet our minds to listen.',
        svgScene: 'whispering-dunes'
      },
      {
        pageNumber: 3,
        title: 'The Crystal Firefly Cavern',
        text: 'The compass led them to an archway carved into a towering obsidian cliff. Inside, a subterranean river sparkled with thousands of bioluminescent fireflies! An ancient stone stepping-stone path spanned across the shimmering waters, but three stones were dark. Leo noticed constellations engraved on each stone: Ursa Major, Orion, and the Northern Cross. By holding the compass close, the brass needle beamed starlight into each carving, raising a glowing bridge of solid crystal light across the water!',
        prompt: 'Tap the constellation stones to illuminate the crystal bridge!',
        interactiveTarget: 'firefly-bridge',
        lesson: 'Teamwork and careful observation unlock every puzzling challenge.',
        svgScene: 'firefly-cavern'
      },
      {
        pageNumber: 4,
        title: 'The Sky Observatory of Lumaria',
        text: 'Climbing a spiral staircase carved from moonstone, the twins emerged above the cloud canopy onto the floating terrace of Lumaria! Ahead stood a giant telescope with lenses polished from meteoric crystal. Through its eyepiece, the universe blossomed into breathtaking nebulae of magenta, emerald, and gold. In the center of the terrace rested an empty pedestal inscribed: "To those who seek with wonder, the stars yield their secrets."',
        prompt: 'Tap the giant telescope to view dancing cosmic nebulae!',
        interactiveTarget: 'sky-telescope',
        lesson: 'Looking upward reminds us how vast, beautiful, and connected our world is.',
        svgScene: 'sky-observatory'
      },
      {
        pageNumber: 5,
        title: 'Constellation of the Brave Heart',
        text: 'Maya placed the brass compass onto the pedestal. Instantly, seven beams of prismatic light shot straight into the zenith of the sky, igniting a brand-new constellation shaped like two hands holding a lantern. A celestial inscription echoed softly in their minds: "The true treasure is not the map, but the bravery to take the first step." Holding hands, the twins watched the sunrise tint the clouds in peach and lavender, knowing this adventure was just the beginning.',
        prompt: 'Tap the night sky to light up the brave heart constellation!',
        interactiveTarget: 'brave-constellation',
        lesson: 'Every great journey begins with the courage to take a single step.',
        svgScene: 'sunrise-constellation'
      }
    ]
  },
  {
    id: 'story-3',
    title: 'The Oak Tree and the Little Robin',
    slug: 'the-oak-tree-and-the-little-robin',
    category: 'moral',
    categoryName: 'Moral Stories',
    ageRange: '4-8 yrs',
    readingTime: '4 min',
    stars: 5,
    coverColor: '#dcfce7',
    accentColor: '#16a34a',
    tagline: 'An ancient tree and an injured songbird discover that kindness warms the coldest winter.',
    synopsis: 'Old Grandfather Oak stood tall through three centuries of storms. When an icy gale injures a young robin before winter migration, the oak makes a quiet sacrifice that changes the entire forest forever.',
    badge: 'Heartwarming',
    mascot: '🌳',
    pages: [
      {
        pageNumber: 1,
        title: 'The Cold North Wind',
        text: 'Late in November, the Frost King sent chilling gales sweeping through the Whispering Woods. All the geese, swifts, and songbirds had already flown south toward the warm beaches of the Sunlit Coast. But high in the rocky canopy, little Oliver the robin was caught in an icy gust. A heavy pinecone tumbled, clipping his left wing. Fluttering helplessly, Oliver tumbled through the bare branches and landed softly on the snowy roots of Old Grandfather Oak.',
        prompt: 'Tap Oliver the robin to wrap him in a warm, protective glow!',
        interactiveTarget: 'oliver-robin',
        lesson: 'Life sometimes brings sudden storms when we least expect them.',
        svgScene: 'autumn-forest'
      },
      {
        pageNumber: 2,
        title: 'A Shelter in the Bark',
        text: 'Grandfather Oak had lived for over three hundred seasons. He had sheltered deer from blizzards and woodpeckers from summer hailstorms. Seeing the shivering little red-breasted bird, the great tree bent his lower bough low against the freezing wind. "Come close to my trunk, little one," creaked the oak’s deep, soothing voice. "My heartwood is dry, and my bark is thick. You may rest here until your feathers mend."',
        prompt: 'Tap Grandfather Oak’s hollow to light a cozy woodland lantern!',
        interactiveTarget: 'oak-hollow',
        lesson: 'True hospitality means opening our shelter to those in need without asking for anything in return.',
        svgScene: 'tree-hollow'
      },
      {
        pageNumber: 3,
        title: 'The Blanket of Golden Leaves',
        text: 'As night fell, freezing sleet began to fall from the pitch-black sky. Grandfather Oak had only a dozen golden leaves clinging stubbornly to his highest twigs—his proudest autumn crown. Knowing that the sleet would freeze the little robin, Grandfather Oak gently shook his crown. One by one, the golden leaves drifted downward, tucking around Oliver like a quilted golden sleeping bag. Warm and snug beneath the fragrant oak leaves, Oliver fell into a deep, healing sleep.',
        prompt: 'Tap the falling golden leaves to tuck Oliver into sleep!',
        interactiveTarget: 'falling-leaves',
        lesson: 'Sacrificing our pride to protect someone small is the highest honor.',
        svgScene: 'leaf-blanket'
      },
      {
        pageNumber: 4,
        title: 'Woodland Friends Unite',
        text: 'The next morning, Barnaby Bear and Hazel the dormouse saw the ancient oak standing proudly over the tiny bird. Moved by the tree’s selfless generosity, Hazel brought dried blueberries from her pantry. Barnaby brought fluffy lichen from the stone bluffs to insulate the nest. A family of red squirrels brought dried sweet corn. For the first time in memory, animals who usually kept to themselves gathered around the oak, singing cheerful winter choruses that kept the frost at bay.',
        prompt: 'Tap the squirrel family to share treats with the gathering!',
        interactiveTarget: 'squirrel-friends',
        lesson: 'One act of pure kindness inspires an entire community to join hands.',
        svgScene: 'animal-gathering'
      },
      {
        pageNumber: 5,
        title: 'The Spring Miracle',
        text: 'When the spring thaw finally arrived, Oliver tested his wing. With a happy chirrup, he soared in wide, joyous loops around the canopy! And then, a miraculous thing happened: while other oak trees still slept in winter grey, Grandfather Oak burst into thousands of radiant emerald leaves, accompanied by sweet golden blossoms that smelled like honey. The spirits of the forest had blessed the kind oak: the tree that gave away his warmth would forever be the first to greet the spring.',
        prompt: 'Tap the blooming spring branches to shower the woodland with petals!',
        interactiveTarget: 'spring-blossoms',
        lesson: 'Whatever love and warmth you give away returns to you tenfold.',
        svgScene: 'spring-miracle'
      }
    ]
  },
  {
    id: 'story-4',
    title: 'The Whispering Cloud of Mount Lumina',
    slug: 'the-whispering-cloud-of-mount-lumina',
    category: 'fairytales',
    categoryName: 'Fairy Tales',
    ageRange: '5-9 yrs',
    readingTime: '5 min',
    stars: 5,
    coverColor: '#f3e8ff',
    accentColor: '#9333ea',
    tagline: 'A gentle enchanted pink cloud that only rains music when kind words are spoken.',
    synopsis: 'In the valley of Solaria, a strange quiet fell when people forgot how to speak with courtesy. Princess Tara undertakes an expedition up Mount Lumina to seek Cloudette, an ancient pastel cloud who holds the kingdom’s lost music.',
    badge: 'Magical',
    mascot: '☁️',
    pages: [
      {
        pageNumber: 1,
        title: 'The Silent Valley of Solaria',
        text: 'Once upon a time, Solaria was the most cheerful realm in the fairy lands. The fountains sang crystal lullabies and the rosebushes hummed in four-part harmony. But as years passed, the villagers became busy and hurried. People snapped: "Hurry up!" and "Out of my way!" Without kind words to nourish them, the flowers lost their colors, and the kingdom fell into a heavy, dull grey silence.',
        prompt: 'Tap the fountain to see if you can hear a faint whisper of melody!',
        interactiveTarget: 'silent-fountain',
        lesson: 'The words we choose each day shape the mood of the world around us.',
        svgScene: 'silent-valley'
      },
      {
        pageNumber: 2,
        title: 'Tara’s High Ascent',
        text: 'Seven-year-old Princess Tara could not bear the silence. Taking her cedar walking stick and her grandmother’s silver bell, she hiked up the steep spiraling trail of Mount Lumina. Above the mountain peak hovered a fluffy, iridescent cotton-candy cloud named Cloudette. But Cloudette looked dim and misty grey, weeping tiny salty puddles onto the granite rocks.',
        prompt: 'Tap Princess Tara to give her energy to reach the mountain peak!',
        interactiveTarget: 'mountain-climb',
        lesson: 'When things feel grey, young hearts often see the cure that grownups overlook.',
        svgScene: 'mountain-peak'
      },
      {
        pageNumber: 3,
        title: 'The Power of "Thank You"',
        text: 'Tara approached the weeping cloud and curtsied politely. "Dear Cloudette," she said with genuine warmth, "thank you for all the gentle rains you gave our kingdom when I was small. I appreciate your soft shade on sunny afternoons, and I love how fluffy you look against the blue sky." As Tara spoke each word of gratitude, Cloudette began to shimmer! Warm pink hues and golden sparkles pulsed inside the mist.',
        prompt: 'Tap the pink cloud to make it glow with vibrant rainbow hues!',
        interactiveTarget: 'glowing-cloud',
        lesson: 'Gratitude is magical; saying "thank you" makes both the speaker and the listener glow.',
        svgScene: 'gratitude-glow'
      },
      {
        pageNumber: 4,
        title: 'The Rainbow Melody Shower',
        text: 'Cloudette giggled with joy, sounding like glass wind chimes. She floated down over Solaria and let loose a glorious shower! But these were no ordinary raindrops—each pastel droplet played a musical note when it touched a roof, a leaf, or a cobblestone. "Ding! Plink! Chim-chim!" The dull grey valley was soaked in melodic rain that painted every petal in shades of peach, lavender, and mint green!',
        prompt: 'Tap the musical rain drops to create a dancing melody!',
        interactiveTarget: 'musical-rain',
        lesson: 'Joy is contagious; when kindness starts pouring, beauty follows everywhere.',
        svgScene: 'musical-shower'
      },
      {
        pageNumber: 5,
        title: 'The Symphony of Solaria',
        text: 'Villagers rushed out into the musical shower, laughing and apologizing for their hurried frowns. "Thank you for the warm bread, Baker Martin!" shouted the shoemaker. "You are welcome, my friend!" replied the baker with a beaming smile. As more compliments and polite words danced through the air, Cloudette spun into a permanent rainbow bridge arching over Mount Lumina, ensuring Solaria’s song would never fade again.',
        prompt: 'Tap the rainbow bridge to crown the kingdom in pure harmony!',
        interactiveTarget: 'rainbow-bridge',
        lesson: 'Politeness and appreciation are golden keys that unlock every heart.',
        svgScene: 'rainbow-kingdom'
      }
    ]
  },
  {
    id: 'story-5',
    title: 'Sammy’s Coral Reef Rescue',
    slug: 'sammys-coral-reef-rescue',
    category: 'educational',
    categoryName: 'Educational Stories',
    ageRange: '6-11 yrs',
    readingTime: '6 min',
    stars: 5,
    coverColor: '#cffafe',
    accentColor: '#0284c7',
    tagline: 'Dive with Sammy the Sea Turtle to uncover the secrets of our ocean ecosystems!',
    synopsis: 'Sammy the green sea turtle guides young marine explorers into the vibrant world of coral reefs, revealing how clownfish, cleaner wrasses, and coral polyps depend on one another, and how we can protect our living oceans.',
    badge: 'Educational',
    mascot: '🐢',
    pages: [
      {
        pageNumber: 1,
        title: 'Meet Sammy the Sea Explorer',
        text: 'Gliding through turquoise waters as warm as a bathtub, Sammy the green sea turtle flapped his powerful flippers. "Welcome to the Great Sunken Garden!" Sammy clicked his beak. "Did you know that coral reefs cover less than one percent of the ocean floor, yet they are home to twenty-five percent of all marine species? It’s the busiest city on planet Earth!" Below them stretched underwater castles of brain coral, sea fans, and staghorn antlers in every color of the spectrum.',
        prompt: 'Tap Sammy’s flipper to glide deeper into the turquoise reef!',
        interactiveTarget: 'sammy-turtle',
        lesson: 'Biodiversity means millions of different plants and animals living in harmony together.',
        svgScene: 'reef-intro'
      },
      {
        pageNumber: 2,
        title: 'The Tiny Polyp Builders',
        text: 'Sammy pointed with his front flipper to an orange branch. "Corals look like colorful rocks, but they are actually colonies of millions of tiny animals called coral polyps!" Inside each clear polyp live microscopic algae called zooxanthellae. In exchange for a safe home, the tiny algae use sunlight to create food for the polyp. "It’s a perfect partnership called symbiosis!" Sammy explained. "They share food and shelter, keeping each other alive."',
        prompt: 'Tap the coral polyp to see the glowing zooxanthellae inside!',
        interactiveTarget: 'coral-polyp',
        lesson: 'Symbiosis: When two different living things help each other survive and thrive.',
        svgScene: 'polyp-close'
      },
      {
        pageNumber: 3,
        title: 'The Clownfish & The Anemone',
        text: 'Darting through stinging purple tentacles was Pip, a cheerful orange clownfish with three bright white stripes. "Don’t those tentacles sting you, Pip?" asked a passing seahorse. Pip chuckled: "Other fish get stung, but we clownfish have a special mucus coating on our scales! The anemone protects me from big barracudas, and I keep the anemone clean and chase away butterflyfish!" It was another brilliant marine teamwork team at work.',
        prompt: 'Tap Pip the clownfish to weave through the soft sea anemone!',
        interactiveTarget: 'clownfish-pip',
        lesson: 'Even the smallest creatures have unique adaptations to survive in the wild.',
        svgScene: 'anemone-home'
      },
      {
        pageNumber: 4,
        title: 'Trouble in the Blue Haven',
        text: 'Suddenly, Sammy noticed a pale white section of the reef. "Oh no," whispered Sammy solemnly. "This is coral bleaching. When ocean waters get too hot from global warming or get polluted by trash and plastic bags, the stressed polyps expel their algae and turn ghostly white. If the water stays too hot for too long, the corals cannot survive, and the fish lose their homes."',
        prompt: 'Tap the cleaning bubbles to cool the ocean water around the reef!',
        interactiveTarget: 'cooling-bubbles',
        lesson: 'Pollution and climate change hurt fragile ecosystems, but human care can heal them.',
        svgScene: 'coral-bleach'
      },
      {
        pageNumber: 5,
        title: 'The Great Ocean Cleanup Squad',
        text: 'Sammy rallied the reef community! Giant manta rays swooped to scoop floating plastic bottles. A school of friendly parrotfish nibbled overgrown seaweed to give young coral babies room to grow. In nearby coastal schools, children organized beach cleanup patrols, swapped single-use plastic bags for cloth totes, and planted mangroves along the shore. Clean, oxygen-rich currents began flowing across the bay once more!',
        prompt: 'Tap the manta ray to help gather floating ocean debris!',
        interactiveTarget: 'manta-clean',
        lesson: 'Every single piece of trash picked up on land saves a marine creature at sea.',
        svgScene: 'ocean-cleanup'
      },
      {
        pageNumber: 6,
        title: 'The Junior Ocean Guardian Pledge',
        text: 'Within months, the bleached corals welcomed their colorful algae friends back. The reef blossomed into an explosion of violet, emerald, and gold! Sammy surfaced at sunset, looking directly at you with wise, happy eyes: "You don’t have to live near the beach to be an ocean hero. Turn off lights to save energy, never litter, recycle your plastics, and share our ocean story with your friends!"',
        prompt: 'Tap the Ocean Guardian badge to earn your Official Reef Explorer star!',
        interactiveTarget: 'guardian-badge',
        lesson: 'We do not inherit the Earth from our ancestors; we borrow it from our children.',
        svgScene: 'guardian-celebration'
      }
    ]
  },
  {
    id: 'story-6',
    title: 'The Boy Who Befriended the Moon',
    slug: 'the-boy-who-befriended-the-moon',
    category: 'bedtime',
    categoryName: 'Bedtime Stories',
    ageRange: '4-8 yrs',
    readingTime: '4 min',
    stars: 5,
    coverColor: '#ede9fe',
    accentColor: '#8b5cf6',
    tagline: 'A bedtime tale of paper kites, celestial stardust, and starry lullabies.',
    synopsis: 'When everyone in the village goes to sleep, seven-year-old Theo notices that the Moon looks lonely hanging in the midnight sky. With origami paper, silver thread, and a warm heart, he crafts messages that reach across the cosmos.',
    badge: 'Bedtime Classic',
    mascot: '🌙',
    pages: [
      {
        pageNumber: 1,
        title: 'The Quiet Bedroom Window',
        text: 'Every evening at eight o’clock, after his mother tucked him into bed and kissed his forehead, Theo would quietly pad over to his bay window. Outside, the world was blanketed in deep indigo twilight. Up in the velvety sky hung the Crescent Moon, looking like a pale silver cradle. "You must get so chilly up there all by yourself," Theo whispered. The Moon seemed to twinkle gently in response, casting a ribbon of silver light across Theo’s wooden floor.',
        prompt: 'Tap the bedroom window to view the glowing crescent moon!',
        interactiveTarget: 'bedroom-window',
        lesson: 'Empathy means caring about the feelings of others, even across great distances.',
        svgScene: 'bedroom-night'
      },
      {
        pageNumber: 2,
        title: 'Origami Cranes of Starlight',
        text: 'Theo gathered silver origami foil and folded five delicate paper cranes. On each crane’s wing, he wrote a gentle note: "You light our way home," "Your craters look like cheerful smiles," and "Sweet dreams, dear Moon." He tied each crane to a spool of iridescent kite thread and released them into the gentle midnight breeze. The breeze caught the paper wings, carrying them higher and higher through wisps of lavender clouds.',
        prompt: 'Tap the silver paper crane to guide it toward the starry sky!',
        interactiveTarget: 'paper-crane',
        lesson: 'Words of affirmation carry further than we can ever imagine.',
        svgScene: 'crane-flight'
      },
      {
        pageNumber: 3,
        title: 'The Silver Moonbeam Ladder',
        text: 'Suddenly, a beam of moonlight widened, transforming into a shimmering spiral staircase made of solid moonlight! At the bottom of the ladder stood Luna, a rabbit woven entirely of luminescent starlight. "Theo!" Luna chimed with a voice like silver bells. "The Moon read your messages and sent me down to show you how your kindness has brightened the entire galaxy!"',
        prompt: 'Tap Luna the star rabbit to climb the luminous spiral stairs!',
        interactiveTarget: 'star-rabbit',
        lesson: 'When you give warmth into the universe, wonders come knocking at your door.',
        svgScene: 'moonbeam-ladder'
      },
      {
        pageNumber: 4,
        title: 'The Lunar Lullaby Garden',
        text: 'High upon the moon’s silver surface, Theo discovered vast gardens of crystal flowers that chimed whenever shooting stars danced overhead. The Moon smiled down—a warm, radiant glow of pure contentment. Together with the moon rabbits, Theo baked stardust cookies that tasted like vanilla clouds and powdered sugar. Every time Theo laughed, a new constellation sparked into life across the Milky Way.',
        prompt: 'Tap the crystal moon flower to hear its cosmic chime!',
        interactiveTarget: 'moon-flower',
        lesson: 'Friendship bridges any distance between Earth and the stars.',
        svgScene: 'lunar-garden'
      },
      {
        pageNumber: 5,
        title: 'Peaceful Bedtime Wishes',
        text: 'As dawn approached, Luna wrapped Theo in a blanket of warm celestial fleece and floated him gently back into his cozy bed. When Theo opened his eyes to the morning sun, he found a tiny glowing lunar pebble resting on his bedside table. Whenever he felt lonely, he would hold the warm silver stone and look up, knowing that the Moon was always smiling right back at him.',
        prompt: 'Tap the glowing lunar pebble to tuck Theo in for sweet dreams!',
        interactiveTarget: 'lunar-pebble',
        lesson: 'You are never truly alone when you carry love in your heart.',
        svgScene: 'morning-sun'
      }
    ]
  },
  {
    id: 'story-7',
    title: 'The Great Forest Bake-Off',
    slug: 'the-great-forest-bake-off',
    category: 'moral',
    categoryName: 'Moral Stories',
    ageRange: '4-8 yrs',
    readingTime: '4 min',
    stars: 5,
    coverColor: '#fef3c7',
    accentColor: '#d97706',
    tagline: 'When three rival woodland chefs combine their secret ingredients, magic happens!',
    synopsis: 'Benny the Bear, Penny Porcupine, and Rosie Rabbit enter the Annual Sunny Meadow Pastry Contest. But when an unexpected rainstorm ruins their individual recipes, they learn that teamwork creates a masterpiece.',
    badge: 'Fun & Uplifting',
    mascot: '🥧',
    pages: [
      {
        pageNumber: 1,
        title: 'The Rival Chefs of Sunny Meadow',
        text: 'Banners fluttered between birch trees for the Annual Sunny Meadow Pastry Championship! Three competitors set up their cooking stations. Benny the Bear had gathered barrels of golden wildflower honey. Penny Porcupine had cracked a mountain of crisp mountain pecans. Rosie Rabbit had picked five baskets of tart wild blackberries. "My honey tart will win first prize!" boasted Benny. "No, my pecan pie will take the ribbon!" quilled Penny. "You’re both wrong—my blackberry tart is perfection!" declared Rosie.',
        prompt: 'Tap the festival banner to begin the forest bake-off countdown!',
        interactiveTarget: 'bake-banner',
        lesson: 'Boasting and pride divide us, while humility opens the door to unity.',
        svgScene: 'bakeoff-banner'
      },
      {
        pageNumber: 2,
        title: 'The Troubles Begin',
        text: 'The cooking whistle blew, and chaos erupted! Benny’s honey was so thick and sticky that his wooden spoon snapped in half! Penny’s pecans were so rock-hard that they bounced off her rolling pin and rolled into the bushes! And Rosie’s blackberries were so tart that even one taste made the judges’ ears turn purple! Each animal was stubborn, refusing to admit that their single ingredient was out of balance.',
        prompt: 'Tap Benny’s sticky honey bowl to try unstirring the spoon!',
        interactiveTarget: 'honey-bowl',
        lesson: 'No single person possesses every strength; on our own, we are incomplete.',
        svgScene: 'cooking-chaos'
      },
      {
        pageNumber: 3,
        title: 'The Sudden Downpour',
        text: 'Suddenly, dark thunderclouds rolled in, pelting heavy rain over the meadow! The individual campfire ovens hissed, and muddy puddles threatened to wash away their cooking tables. "Quick!" squeaked Penny. "The hollow oak trunk has a warm stone hearth that is completely dry!" Working desperately against the storm, Benny lifted the heavy mixing iron, Penny shielded the embers with her prickly quills, and Rosie darted back and forth rescuing bowls.',
        prompt: 'Tap the hollow oak hearth to start the dry stone fire!',
        interactiveTarget: 'oak-hearth',
        lesson: 'Shared adversity teaches us to look past our differences.',
        svgScene: 'storm-hollow'
      },
      {
        pageNumber: 4,
        title: 'The Harmony Cobbler',
        text: 'Crowded inside the dry oak trunk, they realized they had only fifteen minutes before the contest ended. "Benny," said Rosie softly, "what if your sweet honey balances my sour blackberries?" Penny’s eyes lit up: "And my roasted pecans can make the crunchiest golden crust on top!" Laughing together, they tossed all their ingredients into one giant cast-iron pan. The combination of sweet, tart, and nutty baked into a bubbling, golden masterpiece of heavenly aromas.',
        prompt: 'Tap the bubbling cobbler to watch the golden crust rise!',
        interactiveTarget: 'golden-cobbler',
        lesson: 'When different talents combine, the whole is greater than the sum of its parts.',
        svgScene: 'harmony-pie'
      },
      {
        pageNumber: 5,
        title: 'The Sweetest Victory of All',
        text: 'When the rain stopped, Judge Badger tasted the woodland cobbler. His whiskers twitched with sheer delight. "Three first-place ribbons!" Badger proclaimed. "This is the most balanced dessert in forest history!" Benny, Penny, and Rosie hugged each other, their paws dusted in flour and honey. They realized that winning a ribbon by yourself is nice, but sharing a joyous victory with friends is the sweetest flavor in the world.',
        prompt: 'Tap the golden championship ribbon to crown the three friends!',
        interactiveTarget: 'trio-ribbon',
        lesson: 'True victory is found in harmony, cooperation, and shared joy.',
        svgScene: 'celebration-trio'
      }
    ]
  },
  {
    id: 'story-8',
    title: 'Nova’s Secret Solar System Tour',
    slug: 'novas-secret-solar-system-tour',
    category: 'educational',
    categoryName: 'Educational Stories',
    ageRange: '7-12 yrs',
    readingTime: '6 min',
    stars: 5,
    coverColor: '#e0f2fe',
    accentColor: '#0369a1',
    tagline: 'Join Nova the Astro-Puppy on a rocket voyage from the Sun to Saturn’s rings!',
    synopsis: 'Buckle your helmet! Nova the golden astro-pup ignites his eco-rocket to show young scientists how planets orbit, why Mars is rust-colored, and how Earth’s atmosphere protects all living things.',
    badge: 'STEM Adventure',
    mascot: '🚀',
    pages: [
      {
        pageNumber: 1,
        title: 'T-Minus Five to Ignition!',
        text: 'At Cape Starlight, Nova the Astro-Puppy adjusted his shiny silver helmet. "All systems nominal!" Nova barked with excitement. "Today, we’re embarking on a high-speed cosmic tour of our Solar System. Did you know our Sun is a yellow dwarf star so massive that over one million Earths could fit inside it?" 5... 4... 3... 2... 1... WHOOSH! The rocket soared into the velvet black cosmos, with our blue Earth shrinking like a glowing sapphire marble behind them.',
        prompt: 'Tap the rocket booster to ignite the plasma launch engines!',
        interactiveTarget: 'rocket-booster',
        lesson: 'Gravity is the invisible cosmic glue that keeps planets orbiting around the Sun.',
        svgScene: 'rocket-launch'
      },
      {
        pageNumber: 2,
        title: 'The Scorching Inner Planets',
        text: 'Zipping past Mercury, Nova checked the temperature gauges. "Mercury has no thick atmosphere, so its sunny side sizzles at 800 degrees Fahrenheit, while its night side freezes at minus 290!" Next was Venus, shrouded in dense clouds of carbon dioxide that trap heat in a runaway greenhouse effect, making it the hottest planet in the solar system. "A big lesson on why protecting a planet’s delicate atmosphere matters so much!" Nova noted in his flight log.',
        prompt: 'Tap Venus’s golden cloud veil to inspect its atmospheric layers!',
        interactiveTarget: 'venus-clouds',
        lesson: 'Atmospheres act as protective thermal blankets for planetary bodies.',
        svgScene: 'inner-planets'
      },
      {
        pageNumber: 3,
        title: 'Earth: The Goldilocks Oasis',
        text: 'Looking back at our home planet, Nova’s tail wagged happily. "Earth is in the habitable zone—not too close and hot, not too far and cold—just right for liquid water! Our churning molten iron core creates a magnetic shield called the magnetosphere, which deflects dangerous solar radiation like a cosmic umbrella. From ocean depths to mountain peaks, Earth is our one and only precious home in the dark expanse."',
        prompt: 'Tap Earth’s glowing magnetic shield to deflect solar wind particles!',
        interactiveTarget: 'earth-shield',
        lesson: 'Earth’s water, atmosphere, and magnetic field make it a unique haven for life.',
        svgScene: 'earth-oasis'
      },
      {
        pageNumber: 4,
        title: 'The Rust-Red Planet: Mars',
        text: 'Their rocket decelerated above Mars. The landscape below glowed in deep crimson hues. "Why is Mars red?" asked the navigation computer. "Because its soil is rich in iron oxide—the exact same chemical as rusty bicycle chains!" Nova explained. Towering before them was Olympus Mons, an extinct shield volcano three times taller than Mount Everest! Scientists believe rivers once flowed here billions of years ago.',
        prompt: 'Tap Olympus Mons to measure the height of the solar system’s biggest volcano!',
        interactiveTarget: 'olympus-mons',
        lesson: 'Planetary geology shows how worlds evolve and change over billions of years.',
        svgScene: 'mars-surface'
      },
      {
        pageNumber: 5,
        title: 'The Gas Giants & Saturn’s Rings',
        text: 'After navigating safely through the Asteroid Belt, they arrived at Jupiter, the king of planets, with its Great Red Spot—a storm so huge it could swallow Earth whole! Beyond lay breathtaking Saturn, encircled by dazzling rings. "Saturn’s rings look solid from afar," Nova showed on the radar, "but they are made of billions of chunks of pure water ice and dust, ranging from tiny sugar-cube crystals to house-sized boulders, orbiting in perfect harmony!"',
        prompt: 'Tap Saturn’s sparkling rings to see the spinning ice boulders!',
        interactiveTarget: 'saturn-rings',
        lesson: 'The outer gas giants act as gravitational shields for the inner solar system.',
        svgScene: 'saturn-spectacle'
      },
      {
        pageNumber: 6,
        title: 'Cosmic Junior Scientist Badge',
        text: 'Turning their ship toward home, Nova smiled through his visor: "Space reminds us that we are all crew members on spaceship Earth. Keep questioning, keep reading, and keep looking up at the night sky. Who knows? You might be the astronaut who takes humanity’s next giant leap!" Touchdown at Cape Starlight complete! Congratulations, Junior Cosmic Explorer!',
        prompt: 'Tap Nova’s mission patch to claim your Official Astro-Explorer badge!',
        interactiveTarget: 'astro-badge',
        lesson: 'Curiosity and scientific inquiry can take human imagination to the edges of infinity.',
        svgScene: 'space-badge'
      }
    ]
  }
];
