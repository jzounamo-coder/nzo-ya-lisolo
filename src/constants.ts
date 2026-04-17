import { CategoryTheme, Proverb } from './types';

export const AFRICAN_COUNTRIES = [
  { id: 'EG', name: 'Égypte', flag: '🇪🇬' },
  { id: 'NG', name: 'Nigéria', flag: '🇳🇬' },
  { id: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { id: 'ZA', name: 'Afrique du Sud', flag: '🇿🇦' },
  { id: 'MA', name: 'Maroc', flag: '🇲🇦' },
  { id: 'ET', name: 'Éthiopie', flag: '🇪🇹' },
  { id: 'CD', name: 'RDC', flag: '🇨🇩' },
  { id: 'SN', name: 'Sénégal', flag: '🇸🇳' },
  { id: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { id: 'ML', name: 'Mali', flag: '🇲🇱' },
  { id: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { id: 'CM', name: 'Cameroun', flag: '🇨🇲' },
  { id: 'AO', name: 'Angola', flag: '🇦🇴' },
  { id: 'DZ', name: 'Algérie', flag: '🇩🇿' },
  { id: 'TN', name: 'Tunisie', flag: '🇹🇳' },
];

export const PROVERB_THEMES: CategoryTheme[] = [
  'Famille & Communauté',
  'Courage & Persévérance',
  'Sagesse & Patience',
  'Amour & Relations',
  'Argent & Travail',
  'Justice & Vérité',
];

export const MOCK_PROVERBS: Proverb[] = [
  // --- FAMILLE & COMMUNAUTÉ ---
  { id: '1', text: "Il faut tout un village pour élever un enfant.", translation: "It takes a village to raise a child.", explanation: "L'éducation est une responsabilité collective.", countryId: 'NG', language: 'Yoruba', themeId: 'Famille & Communauté', likesCount: 2500, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Nigéria' },
  { id: '2', text: "Si tu veux aller vite, marche seul. Si tu veux aller loin, marchons ensemble.", translation: "Go far together.", explanation: "La solidarité est la clé du succès durable.", countryId: 'GH', language: 'Akan', themeId: 'Famille & Communauté', likesCount: 1800, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Ghana' },
  { id: '3', text: "L'arbre soutenu par ses racines ne craint pas le vent.", translation: "Roots protect the tree.", explanation: "La famille nous donne la force de résister aux épreuves.", countryId: 'CD', language: 'Lingala', themeId: 'Famille & Communauté', likesCount: 950, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'RDC' },
  { id: '4', text: "Le vieux qui meurt est une bibliothèque qui brûle.", translation: "Elders are libraries.", explanation: "Respect des aînés et de la transmission orale.", countryId: 'ML', language: 'Bambara', themeId: 'Famille & Communauté', likesCount: 3200, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Mali' },
  { id: '5', text: "Un seul doigt ne peut pas laver la figure.", translation: "One finger can't wash a face.", explanation: "L'importance de l'entraide communautaire.", countryId: 'CI', language: 'Baoulé', themeId: 'Famille & Communauté', likesCount: 450, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Côte d\'Ivoire' },
  { id: '6', text: "Le bâton de la famille se plie mais ne se casse pas.", translation: "Family bonds are flexible.", explanation: "Les liens familiaux sont plus forts que les disputes.", countryId: 'CD', language: 'Kongo', themeId: 'Famille & Communauté', likesCount: 120, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'RDC' },
  { id: '7', text: "On est mieux là où on a ses attaches.", translation: "Home is where the heart is.", explanation: "Le sentiment d'appartenance à sa communauté.", countryId: 'SN', language: 'Wolof', themeId: 'Famille & Communauté', likesCount: 670, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Sénégal' },
  { id: '8', text: "Les traces de ceux qui marchent ensemble ne s'effacent jamais.", translation: "Strong bonds last.", explanation: "L'amitié et la fraternité marquent la vie.", countryId: 'GA', language: 'Fang', themeId: 'Famille & Communauté', likesCount: 890, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Gabon' },

  // --- COURAGE & PERSÉVÉRANCE ---
  { id: '9', text: "L'étincelle ne demande pas la permission pour devenir un incendie.", translation: "Courage starts small.", explanation: "L'audace peut transformer une situation.", countryId: 'CD', language: 'Swahili', themeId: 'Courage & Persévérance', likesCount: 1500, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'RDC' },
  { id: '10', text: "Le lion ne se retourne pas quand un petit chien aboie.", translation: "Focus on your goals.", explanation: "Ne pas se laisser distraire par les critiques.", countryId: 'CI', language: 'Dioula', themeId: 'Courage & Persévérance', likesCount: 2100, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Côte d\'Ivoire' },
  { id: '11', text: "Tomber n'est rien, c'est se relever qui compte.", translation: "Rising is everything.", explanation: "La résilience face à l'échec.", countryId: 'CM', language: 'Ewondo', themeId: 'Courage & Persévérance', likesCount: 3000, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Cameroun' },
  { id: '12', text: "Même le plus grand palmier a commencé par une graine.", translation: "Greatness takes time.", explanation: "Tout grand accomplissement commence petit.", countryId: 'TG', language: 'Ewe', themeId: 'Courage & Persévérance', likesCount: 1300, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Togo' },
  { id: '13', text: "La pluie mouille le léopard mais n'efface pas ses taches.", translation: "Identity remains.", explanation: "Les épreuves n'altèrent pas notre vraie nature.", countryId: 'GH', language: 'Akan', themeId: 'Courage & Persévérance', likesCount: 1700, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Ghana' },
  { id: '14', text: "L'eau qui coule finit par percer le rocher.", translation: "Persistence wins.", explanation: "La persévérance surmonte tous les obstacles.", countryId: 'EG', language: 'Arabe', themeId: 'Courage & Persévérance', likesCount: 880, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Égypte' },
  { id: '15', text: "Le serpent qui veut mordre n'aboie pas.", translation: "Action over words.", explanation: "Les défis les plus sérieux sont silencieux.", countryId: 'CD', language: 'Lingala', themeId: 'Courage & Persévérance', likesCount: 420, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'RDC' },
  { id: '16', text: "Si tu es une enclume, sois patiente ; si tu es un marteau, frappe fort.", translation: "Adapt to your role.", explanation: "Savoir s'adapter selon les circonstances.", countryId: 'GN', language: 'Soussou', themeId: 'Courage & Persévérance', likesCount: 610, isKidFriendly: false, createdAt: new Date().toISOString(), originCountryName: 'Guinée' },

  // --- SAGESSE & PATIENCE ---
  { id: '17', text: "Mwana ya nkoko te kozanga nzela", translation: "Vulture's child finds its path.", explanation: "Celui qui est bien guidé trouve toujours sa voie.", countryId: 'CD', language: 'Lingala', themeId: 'Sagesse & Patience', likesCount: 124, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'RDC' },
  { id: '18', text: "L'eau chaude n'oublie pas qu'elle a été froide.", translation: "Hot water was once cold.", explanation: "Ne jamais oublier ses origines modestes.", countryId: 'KE', language: 'Swahili', themeId: 'Sagesse & Patience', likesCount: 890, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Kenya' },
  { id: '19', text: "La patience est un chemin d'or.", translation: "Patience is golden.", explanation: "Tout vient à point à qui sait attendre.", countryId: 'ML', language: 'Bambara', themeId: 'Sagesse & Patience', likesCount: 2300, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Mali' },
  { id: '20', text: "Celui qui ne sait pas d'où il vient ne sait pas où il va.", translation: "Know your origins.", explanation: "Connaître son passé pour construire son futur.", countryId: 'SN', language: 'Wolof', themeId: 'Sagesse & Patience', likesCount: 4500, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Sénégal' },
  { id: '21', text: "Petit à petit, l'oiseau fait son nid.", translation: "Step by step.", explanation: "Le travail régulier mène au succès.", countryId: 'MA', language: 'Arabe', themeId: 'Sagesse & Patience', likesCount: 1900, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Maroc' },
  { id: '22', text: "On n'apprend pas à un vieux singe à faire des grimaces.", translation: "Experience matters.", explanation: "Respecter la sagesse de l'expérience.", countryId: 'CD', language: 'Luba', themeId: 'Sagesse & Patience', likesCount: 1500, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'RDC' },
  { id: '23', text: "Le fleuve fait des détours car personne ne lui montre la voie.", translation: "Find your own way.", explanation: "L'autonomie et l'apprentissage personnel.", countryId: 'GH', language: 'Twi', themeId: 'Sagesse & Patience', likesCount: 920, isKidFriendly: false, createdAt: new Date().toISOString(), originCountryName: 'Ghana' },
  { id: '24', text: "Si tu cherches une aiguille, ne regarde pas les étoiles.", translation: "Be pragmatic.", explanation: "Il faut chercher des solutions concrètes.", countryId: 'ET', language: 'Amharique', themeId: 'Sagesse & Patience', likesCount: 410, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Éthiopie' },

  // --- AMOUR & RELATIONS ---
  { id: '25', text: "Là où on s'aime, il ne fait jamais nuit.", translation: "Love brings light.", explanation: "L'amour illumine la vie quotidienne.", countryId: 'CD', language: 'Swahili', themeId: 'Amour & Relations', likesCount: 5000, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'RDC' },
  { id: '26', text: "L'amour est un piment qui pique mais qu'on adore.", translation: "Love is a spicy chili.", explanation: "La passion malgré ses difficultés.", countryId: 'CM', language: 'Douala', themeId: 'Amour & Relations', likesCount: 1200, isKidFriendly: false, createdAt: new Date().toISOString(), originCountryName: 'Cameroun' },
  { id: '27', text: "Le cœur n'a pas de genoux pour se plier.", translation: "The heart doesn't bend.", explanation: "On ne force pas les sentiments amoureux.", countryId: 'CI', language: 'Bété', themeId: 'Amour & Relations', likesCount: 840, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Côte d\'Ivoire' },
  { id: '28', text: "Une amitié est une fleur qu'il faut arroser chaque jour.", translation: "Friendship needs care.", explanation: "Les relations demandent de l'attention constante.", countryId: 'MA', language: 'Berbère', themeId: 'Amour & Relations', likesCount: 2200, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Maroc' },
  { id: '29', text: "Qui aime l'arbre, aime aussi les branches.", translation: "Love the whole tree.", explanation: "Aimer quelqu'un, c'est accepter son entourage.", countryId: 'KE', language: 'Kikuyu', themeId: 'Amour & Relations', likesCount: 770, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Kenya' },
  { id: '30', text: "Le regard est le messager du cœur.", translation: "Eyes are messengers.", explanation: "Les yeux révèlent les sentiments profonds.", countryId: 'TD', language: 'Arabe', themeId: 'Amour & Relations', likesCount: 560, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Tchad' },

  // --- ARGENT & TRAVAIL ---
  { id: '31', text: "L'argent est un bon serviteur mais un mauvais maître.", translation: "Money is a servant.", explanation: "Ne pas se laisser asservir par la richesse.", countryId: 'ZA', language: 'Zoulou', themeId: 'Argent & Travail', likesCount: 3100, isKidFriendly: false, createdAt: new Date().toISOString(), originCountryName: 'Afrique du Sud' },
  { id: '32', text: "La sueur du travail est le parfum de la réussite.", translation: "Hard work smells like success.", explanation: "Le succès demande un effort honnête.", countryId: 'CI', language: 'Dioula', themeId: 'Argent & Travail', likesCount: 1600, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Côte d\'Ivoire' },
  { id: '33', text: "Si tu dors sur une natte empruntée, tu dors par terre.", translation: "Borrowed mats are floor.", explanation: "L'importance de l'indépendance financière.", countryId: 'BF', language: 'Mossi', themeId: 'Argent & Travail', likesCount: 580, isKidFriendly: false, createdAt: new Date().toISOString(), originCountryName: 'Burkina Faso' },
  { id: '34', text: "C'est au bout de la vieille corde qu'on tisse la nouvelle.", translation: "Build on old rope.", explanation: "Le travail se base sur l'expérience acquise.", countryId: 'CD', language: 'Lingala', themeId: 'Argent & Travail', likesCount: 940, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'RDC' },
  { id: '35', text: "La fortune ne va pas chez celui qui dort.", translation: "Fortune avoids sleepers.", explanation: "Il faut être actif pour réussir.", countryId: 'UG', language: 'Luganda', themeId: 'Argent & Travail', likesCount: 720, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Ouganda' },
  { id: '36', text: "On ne mange pas la poule qui pond des œufs d'or.", translation: "Don't eat the golden hen.", explanation: "Savoir préserver ses sources de revenus.", countryId: 'EG', language: 'Arabe', themeId: 'Argent & Travail', likesCount: 1100, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Égypte' },

  // --- JUSTICE & VÉRITÉ ---
  { id: '37', text: "Le feu qui brûle la case n'épargne pas le toit.", translation: "Fire doesn't spare the roof.", explanation: "Les injustices finissent par toucher tout le monde.", countryId: 'SN', language: 'Wolof', themeId: 'Justice & Vérité', likesCount: 540, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Sénégal' },
  { id: '38', text: "Le mensonge produit des fleurs mais pas de fruits.", translation: "Lies bear no fruit.", explanation: "La tromperie ne mène à rien de durable.", countryId: 'ET', language: 'Amharique', themeId: 'Justice & Vérité', likesCount: 2700, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Éthiopie' },
  { id: '39', text: "La vérité est comme le soleil, on ne peut la cacher.", translation: "Truth is like the sun.", explanation: "La vérité finit toujours par éclater au grand jour.", countryId: 'MA', language: 'Malagasy', themeId: 'Justice & Vérité', likesCount: 1400, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Madagascar' },
  { id: '40', text: "On ne peut pas cacher la fumée si on a mis le feu.", translation: "Can't hide smoke from fire.", explanation: "On doit assumer les conséquences de ses actes.", countryId: 'ML', language: 'Bambara', themeId: 'Justice & Vérité', likesCount: 960, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Mali' },
  { id: '41', text: "La bouche qui mange ne parle pas de justice.", translation: "Eating mouths don't talk justice.", explanation: "Dénonciation de la corruption.", countryId: 'AO', language: 'Portugais', themeId: 'Justice & Vérité', likesCount: 310, isKidFriendly: false, createdAt: new Date().toISOString(), originCountryName: 'Angola' },
  { id: '42', text: "Mieux vaut une vérité qui fait mal qu'un mensonge qui réjouit.", translation: "Painful truth over sweet lie.", explanation: "L'intégrité avant tout.", countryId: 'BJ', language: 'Fon', themeId: 'Justice & Vérité', likesCount: 1250, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Bénin' },
  { id: '43', text: "Le juge qui n'écoute qu'une partie n'est pas juste.", translation: "Hear both sides.", explanation: "L'impartialité est la base de la justice.", countryId: 'SD', language: 'Arabe', themeId: 'Justice & Vérité', likesCount: 440, isKidFriendly: false, createdAt: new Date().toISOString(), originCountryName: 'Soudan' },
  { id: '44', text: "Si tu es dans le vrai, tu n'as pas besoin de crier.", translation: "Truth doesn't need shouting.", explanation: "La vérité a sa propre force tranquille.", countryId: 'MW', language: 'Chewa', themeId: 'Justice & Vérité', likesCount: 980, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Malawi' },

  // --- MIX COMPLÉMENTAIRE ---
  { id: '45', text: "Une main lave l'autre.", translation: "One hand washes the other.", explanation: "La réciprocité dans l'aide.", countryId: 'SN', language: 'Wolof', themeId: 'Famille & Communauté', likesCount: 1560, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Sénégal' },
  { id: '46', text: "Celui qui a été mordu par un serpent a peur d'un ver de terre.", translation: "Once bitten, twice shy.", explanation: "L'expérience nous rend plus prudents.", countryId: 'CD', language: 'Swahili', themeId: 'Sagesse & Patience', likesCount: 880, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'RDC' },
  { id: '47', text: "Même au milieu du fleuve, on a soif de vérité.", translation: "Thirst for truth.", explanation: "Le besoin fondamental d'honnêteté.", countryId: 'NG', language: 'Igbo', themeId: 'Justice & Vérité', likesCount: 520, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Nigéria' },
  { id: '48', text: "Le cœur d'une mère est un abri sûr.", translation: "Mother's heart is a shelter.", explanation: "L'amour inconditionnel maternel.", countryId: 'ML', language: 'Bambara', themeId: 'Famille & Communauté', likesCount: 2900, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Mali' },
  { id: '49', text: "On ne traverse pas le fleuve sur le dos d'un crocodile.", translation: "Don't ride the crocodile.", explanation: "Ne pas compter sur ses ennemis.", countryId: 'CG', language: 'Lingala', themeId: 'Courage & Persévérance', likesCount: 730, isKidFriendly: false, createdAt: new Date().toISOString(), originCountryName: 'Congo' },
  { id: '50', text: "Le temps est le remède à tous les maux.", translation: "Time heals all.", explanation: "La patience guérit la douleur.", countryId: 'BI', language: 'Kirundi', themeId: 'Sagesse & Patience', likesCount: 1400, isKidFriendly: true, createdAt: new Date().toISOString(), originCountryName: 'Burundi' }
];

export const MOCK_QUIZ = [
  {
    id: 'q1',
    proverbId: '17',
    options: [
      "Que les enfants doivent rester chez eux",
      "Que l'ambition mène toujours vers une issue",
      "Que les oiseaux volent haut",
      "Qu'il faut éviter les vautours"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 'q2',
    proverbId: '18',
    options: [
      "Qu'il faut se baigner à l'eau chaude",
      "Que le succès est éphémère",
      "Qu'il ne faut jamais oublier ses débuts modestes",
      "Que l'eau bouillante est dangereuse"
    ],
    correctAnswerIndex: 2
  },
  {
    id: 'q3',
    proverbId: '37',
    options: [
      "Qu'il faut construire des toits solides",
      "Que les problèmes des autres finissent par nous concerner",
      "Que le feu est utile pour cuisiner",
      "Que les cases sont fragiles"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 'q4',
    proverbId: '1',
    options: [
      "Qu'il faut punir les enfants",
      "Que l'éducation est l'affaire de toute la communauté",
      "Qu'un enfant ne doit pas sortir du village",
      "Que les parents sont les seuls éducateurs"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 'q5',
    proverbId: '2',
    options: [
      "Qu'il faut toujours courir",
      "Que l'on gagne du temps en étant seul",
      "Que l'union et la solidarité permettent d'aller plus loin",
      "Qu'il ne faut jamais marcher en groupe"
    ],
    correctAnswerIndex: 2
  },
  {
    id: 'q6',
    proverbId: '9',
    options: [
      "Que le feu est dangereux",
      "Qu'un petit acte d'audace peut avoir de grandes conséquences",
      "Qu'il faut demander la permission avant d'agir",
      "Que les étincelles s'éteignent vite"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 'q7',
    proverbId: '10',
    options: [
      "Que le lion a peur des chiens",
      "Qu'il faut répondre à toutes les provocations",
      "Qu'il faut ignorer les critiques insignifiantes pour rester concentré",
      "Que les chiens aboient plus fort que les lions"
    ],
    correctAnswerIndex: 2
  },
  {
    id: 'q8',
    proverbId: '19',
    options: [
      "Que l'or se trouve sur les chemins",
      "Que la précipitation est une vertu",
      "Que la patience finit toujours par être récompensée",
      "Qu'il faut marcher lentement pour trouver de l'or"
    ],
    correctAnswerIndex: 2
  },
  {
    id: 'q9',
    proverbId: '25',
    options: [
      "Que l'amour permet de surmonter les moments sombres de la vie",
      "Qu'il ne faut pas dormir quand on est amoureux",
      "Que l'amour remplace l'électricité",
      "Que les amoureux vivent la nuit"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 'q10',
    proverbId: '31',
    options: [
      "Qu'il faut donner tout son argent aux serviteurs",
      "Qu'il ne faut pas laisser l'argent diriger notre vie",
      "Qu'un maître doit être riche",
      "Que l'argent ne sert à rien"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 'q11',
    proverbId: '38',
    options: [
      "Que le mensonge est utile à court terme mais ne construit rien",
      "Que les menteurs aiment les fleurs",
      "Que la vérité est stérile",
      "Qu'il faut planter des fleurs pour cacher ses mensonges"
    ],
    correctAnswerIndex: 0
  },
  {
    id: 'q12',
    proverbId: '40',
    options: [
      "Qu'il faut éteindre tous les feux",
      "Que nos actions finissent toujours par se savoir",
      "Que la fumée est bonne pour la santé",
      "Qu'il ne faut jamais cuisiner à l'intérieur"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 'q13',
    proverbId: '46',
    options: [
      "Que les serpents ressemblent aux vers de terre",
      "Que les expériences passées nous rendent plus prudents",
      "Qu'il ne faut pas avoir peur des animaux",
      "Que les vers de terre sont dangereux"
    ],
    correctAnswerIndex: 1
  },
  {
    id: 'q14',
    proverbId: '50',
    options: [
      "Qu'il ne faut jamais aller chez le médecin",
      "Que le temps efface les souvenirs",
      "Que la patience et le temps apaisent les souffrances",
      "Que les médicaments ne servent à rien"
    ],
    correctAnswerIndex: 2
  },
  {
    id: 'q15',
    proverbId: '15',
    options: [
      "Qu'il faut se méfier de ceux qui agissent sans prévenir",
      "Que les serpents sont silencieux quand ils dorment",
      "Qu'il faut aboyer avant de mordre",
      "Que le bruit est la preuve de la force"
    ],
    correctAnswerIndex: 0
  }
];