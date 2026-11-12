export type Mood = "alabanza" | "calma" | "navidad";

export type Track = {
  id: string;
  title: string;
  original: string;
  artistId: string;
  albumId: string;
  src: string;
  duration: number;
  mood: Mood;
  language: string;
  lyrics?: string;
};

export type Album = {
  id: string;
  title: string;
  artistId: string;
  year: string;
  cover: string;
  description: string;
  trackIds: string[];
};

export type Artist = {
  id: string;
  name: string;
  cover: string;
  blurb: string;
};

export type Mix = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  trackIds: string[];
};

const HYMNS = "hymn_collection_001_0909_librivox";
const CAROLS20 = "ccc20_2012_librivox";
const CAROLS21 = "christmas_carol_collection_2021_2112_librivox";

function ia(item: string, file: string) {
  return `https://archive.org/download/${item}/${file}`;
}

export const artists: Artist[] = [
  {
    id: "voces",
    name: "Voces LibriVox",
    cover: "/covers/voces.svg",
    blurb:
      "Voluntarios que cantan himnos clásicos de dominio público. Las voces son del proyecto LibriVox.",
  },
  {
    id: "coro",
    name: "Coro de Adviento",
    cover: "/covers/coro.svg",
    blurb:
      "Villancicos tradicionales en inglés, latín y francés, grabados por voluntarios de LibriVox.",
  },
];

export const tracks: Track[] = [
  {
    id: "gloria",
    title: "Gloria, laude y honor",
    original: "All Glory, Laud and Honor",
    artistId: "voces",
    albumId: "alabanza",
    src: ia(HYMNS, "hymns001_allglorylaudandhonor_js_64kb.mp3"),
    duration: 218,
    mood: "alabanza",
    language: "Inglés",
    lyrics: "All glory, laud and honor\nto thee, Redeemer, King,\nto whom the lips of children\nmade sweet hosannas ring.",
  },
  {
    id: "gracia",
    title: "Sublime gracia",
    original: "Amazing Grace",
    artistId: "voces",
    albumId: "alabanza",
    src: ia(HYMNS, "hymns001_amazinggrace_meg_64kb.mp3"),
    duration: 309,
    mood: "alabanza",
    language: "Inglés",
    lyrics:
      "Amazing grace, how sweet the sound\nthat saved a wretch like me.\nI once was lost, but now am found,\nwas blind, but now I see.",
  },
  {
    id: "certeza",
    title: "Bendita certeza",
    original: "Blessed Assurance",
    artistId: "voces",
    albumId: "alabanza",
    src: ia(HYMNS, "hymns001_blessedassurance_mfslaw_64kb.mp3"),
    duration: 148,
    mood: "alabanza",
    language: "Inglés",
    lyrics: "Blessed assurance, Jesus is mine!\nO what a foretaste of glory divine!\nHeir of salvation, purchase of God,\nborn of his Spirit, washed in his blood.",
  },
  {
    id: "fuente",
    title: "Fuente de toda bendición",
    original: "Come Thou Fount of Every Blessing",
    artistId: "voces",
    albumId: "alabanza",
    src: ia(HYMNS, "hymns001_comethoufount_lw_64kb.mp3"),
    duration: 216,
    mood: "alabanza",
    language: "Inglés",
  },
  {
    id: "hermosura",
    title: "Por la hermosura de la tierra",
    original: "For the Beauty of the Earth",
    artistId: "voces",
    albumId: "alabanza",
    src: ia(HYMNS, "hymns001_forthebeautyoftheearth_tg_64kb.mp3"),
    duration: 254,
    mood: "alabanza",
    language: "Inglés",
  },
  {
    id: "gorrion",
    title: "Él cuida del gorrión",
    original: "His Eye Is on the Sparrow",
    artistId: "voces",
    albumId: "consuelo",
    src: ia(HYMNS, "hymns001_hiseyeisonthesparrow_jc_64kb.mp3"),
    duration: 203,
    mood: "calma",
    language: "Inglés",
    lyrics: "Why should I feel discouraged?\nWhy should the shadows come?\nWhy should my heart be lonely\nand long for heaven and home?",
  },
  {
    id: "poder",
    title: "Canto el poder de Dios",
    original: "I Sing the Almighty Power of God",
    artistId: "voces",
    albumId: "alabanza",
    src: ia(HYMNS, "hymns001_isingalmighty_law_64kb.mp3"),
    duration: 133,
    mood: "alabanza",
    language: "Inglés",
  },
  {
    id: "jesus",
    title: "Te amo, mi Jesús",
    original: "My Jesus, I Love Thee",
    artistId: "voces",
    albumId: "alabanza",
    src: ia(HYMNS, "hymns001_myjesusilovethee_js_64kb.mp3"),
    duration: 154,
    mood: "alabanza",
    language: "Inglés",
  },
  {
    id: "reunimos",
    title: "Juntos nos reunimos",
    original: "We Gather Together",
    artistId: "voces",
    albumId: "alabanza",
    src: ia(HYMNS, "hymns001_wegathertogether_cc_64kb.mp3"),
    duration: 113,
    mood: "alabanza",
    language: "Inglés",
  },
  {
    id: "vision",
    title: "Sé tú mi visión",
    original: "Be Thou My Vision",
    artistId: "voces",
    albumId: "consuelo",
    src: ia(HYMNS, "hymns001_bethoumyvision_kgb_64kb.mp3"),
    duration: 238,
    mood: "calma",
    language: "Inglés",
    lyrics: "Be thou my vision, O Lord of my heart.\nNaught be all else to me, save that thou art.\nThou my best thought, by day or by night,\nwaking or sleeping, thy presence my light.",
  },
  {
    id: "padre",
    title: "Señor y Padre",
    original: "Dear Lord and Father of Mankind",
    artistId: "voces",
    albumId: "consuelo",
    src: ia(HYMNS, "hymns001_dearlordandfather_gl_64kb.mp3"),
    duration: 245,
    mood: "calma",
    language: "Inglés",
  },
  {
    id: "peregrino",
    title: "Soy un pobre peregrino",
    original: "Wayfaring Stranger",
    artistId: "voces",
    albumId: "consuelo",
    src: ia(HYMNS, "hymns001_iamapoorwayfaringstranger_meg_64kb.mp3"),
    duration: 203,
    mood: "calma",
    language: "Inglés",
  },
  {
    id: "entrego",
    title: "Todo lo entrego",
    original: "I Surrender All",
    artistId: "voces",
    albumId: "consuelo",
    src: ia(HYMNS, "hymns001_isurrenderall_ezwa_64kb.mp3"),
    duration: 285,
    mood: "calma",
    language: "Inglés",
    lyrics: "All to Jesus I surrender,\nall to him I freely give.\nI will ever love and trust him,\nin his presence daily live.",
  },
  {
    id: "paz",
    title: "Paz en mi alma",
    original: "It Is Well with My Soul",
    artistId: "voces",
    albumId: "consuelo",
    src: ia(HYMNS, "hymns001_itiswellwithmysoul_jc_64kb.mp3"),
    duration: 290,
    mood: "calma",
    language: "Inglés",
    lyrics:
      "When peace like a river attendeth my way,\nwhen sorrows like sea billows roll,\nwhatever my lot, thou hast taught me to say:\nit is well, it is well with my soul.",
  },
  {
    id: "talcomo",
    title: "Tal como soy",
    original: "Just as I Am",
    artistId: "voces",
    albumId: "consuelo",
    src: ia(HYMNS, "hymns001_justasiam_ezwa_64kb.mp3"),
    duration: 308,
    mood: "calma",
    language: "Inglés",
  },
  {
    id: "roca",
    title: "Roca de la eternidad",
    original: "Rock of Ages",
    artistId: "voces",
    albumId: "consuelo",
    src: ia(HYMNS, "hymns001_rockofages_lw_64kb.mp3"),
    duration: 140,
    mood: "calma",
    language: "Inglés",
    lyrics: "Rock of Ages, cleft for me,\nlet me hide myself in thee.",
  },
  {
    id: "suave",
    title: "Suave y tiernamente",
    original: "Softly and Tenderly",
    artistId: "voces",
    albumId: "consuelo",
    src: ia(HYMNS, "hymns001_softlyandtenderly_bt_64kb.mp3"),
    duration: 217,
    mood: "calma",
    language: "Inglés",
  },
  {
    id: "dulce",
    title: "Dulce es confiar",
    original: "'Tis So Sweet to Trust in Jesus",
    artistId: "voces",
    albumId: "consuelo",
    src: ia(HYMNS, "hymns001_tissosweettotrustinjesus_jle_64kb.mp3"),
    duration: 159,
    mood: "calma",
    language: "Inglés",
  },
  {
    id: "confia",
    title: "Confía y obedece",
    original: "Trust and Obey",
    artistId: "voces",
    albumId: "alabanza",
    src: ia(HYMNS, "hymns001_trustandobey_tg_64kb.mp3"),
    duration: 217,
    mood: "alabanza",
    language: "Inglés",
  },
  {
    id: "adeste",
    title: "Venid, fieles todos",
    original: "Adeste Fideles",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_adestefideles_sr_64kb.mp3"),
    duration: 201,
    mood: "navidad",
    language: "Latín",
    lyrics: "Adeste fideles, laeti triumphantes,\nvenite, venite in Bethlehem.\nNatum videte, regem angelorum.\nVenite adoremus, dominum.",
  },
  {
    id: "aleluya",
    title: "Aleluya, gloria y alabanza",
    original: "Alleluia! Gloire et louanges!",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_alleluiagloirelouanges_ez_64kb.mp3"),
    duration: 246,
    mood: "navidad",
    language: "Francés",
  },
  {
    id: "pesebre",
    title: "En un pesebre",
    original: "Away in a Manger",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_awayinamanger_group_64kb.mp3"),
    duration: 129,
    mood: "navidad",
    language: "Inglés",
    lyrics: "Away in a manger, no crib for a bed,\nthe little Lord Jesus laid down his sweet head.",
  },
  {
    id: "estrella",
    title: "Mirad aquella estrella",
    original: "Behold That Star",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_beholdthatstar_mk_64kb.mp3"),
    duration: 132,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "pastores",
    title: "Los pastores de Belén",
    original: "Les Bergers de Bethléem",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_bergersbethleem_ez_64kb.mp3"),
    duration: 176,
    mood: "navidad",
    language: "Francés",
  },
  {
    id: "ding",
    title: "Suenan las campanas",
    original: "Ding Dong Merrily on High",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_dingdongmerrily_ap_64kb.mp3"),
    duration: 175,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "descanso",
    title: "Dios os dé feliz descanso",
    original: "God Rest You Merry, Gentlemen",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_godrestyou_rl_64kb.mp3"),
    duration: 138,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "oid",
    title: "Oíd un son en alta esfera",
    original: "Hark! The Herald Angels Sing",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_harktheherald_rm_64kb.mp3"),
    duration: 171,
    mood: "navidad",
    language: "Inglés",
    lyrics: "Hark! the herald angels sing,\nGlory to the newborn King.\nPeace on earth and mercy mild,\nGod and sinners reconciled.",
  },
  {
    id: "nacido",
    title: "Él ha nacido",
    original: "He Is Born",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_heisborn_jb_64kb.mp3"),
    duration: 145,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "naves",
    title: "Vi tres naves",
    original: "I Saw Three Ships",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_isawthreeships_ap_64kb.mp3"),
    duration: 216,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "gozo",
    title: "Gozo al mundo",
    original: "Joy to the World",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_joytotheworld_ap_64kb.mp3"),
    duration: 148,
    mood: "navidad",
    language: "Inglés",
    lyrics: "Joy to the world, the Lord is come.\nLet earth receive her King.\nLet every heart prepare him room,\nand heaven and nature sing.",
  },
  {
    id: "acebo",
    title: "El acebo y la hiedra",
    original: "The Holly and the Ivy",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_thehollyandtheivy_aps_64kb.mp3"),
    duration: 247,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "emanuel",
    title: "Oh ven, oh ven Emanuel",
    original: "Veni, Veni, Emmanuel",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_veniveniemmanuel_asm_64kb.mp3"),
    duration: 217,
    mood: "navidad",
    language: "Latín",
    lyrics: "Veni, veni, Emmanuel,\ncaptivum solve Israel,\nqui gemit in exilio,\nprivatus Dei Filio.",
  },
  {
    id: "reyes",
    title: "Los tres reyes",
    original: "We Three Kings",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_wethreekings_ap_64kb.mp3"),
    duration: 241,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "nino",
    title: "¿Qué niño es este?",
    original: "What Child Is This?",
    artistId: "coro",
    albumId: "villancicos",
    src: ia(CAROLS20, "ccc20_whatchildisthis_gh_64kb.mp3"),
    duration: 182,
    mood: "navidad",
    language: "Inglés",
    lyrics: "What child is this, who, laid to rest,\non Mary's lap is sleeping?\nWhom angels greet with anthems sweet,\nwhile shepherds watch are keeping?",
  },
  {
    id: "nino-nace",
    title: "Un niño ha nacido",
    original: "A Child Is Born in Bethlehem",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_achildisborninbethlehem_bc_64kb.mp3"),
    duration: 134,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "adam",
    title: "Adán yacía atado",
    original: "Adam Lay Ybounden",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_adamlayybounden_asm_64kb.mp3"),
    duration: 87,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "toda-gloria",
    title: "Toda gloria a Dios",
    original: "All Glory to God",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_allglorytogod_bc_64kb.mp3"),
    duration: 125,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "gabriel",
    title: "El ángel Gabriel",
    original: "The Angel Gabriel from Heaven Came",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_angelgabriel_da_64kb.mp3"),
    duration: 185,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "aves",
    title: "Villancico de las aves",
    original: "Carol of the Birds",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_carolofbirds_mk_64kb.mp3"),
    duration: 98,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "cristo-nace",
    title: "Cristo ha nacido",
    original: "Christ Is Born",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_christisborn_bc_64kb.mp3"),
    duration: 139,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "medianoche",
    title: "En la medianoche clara",
    original: "It Came Upon the Midnight Clear",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_itcameuponamidnightclear_asm_64kb.mp3"),
    duration: 164,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "silencio",
    title: "Calle todo mortal",
    original: "Let All Mortal Flesh Keep Silence",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_letallmortalflesh_da_64kb.mp3"),
    duration: 201,
    mood: "calma",
    language: "Inglés",
  },
  {
    id: "personent",
    title: "Suenen hoy",
    original: "Personent Hodie",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_personenthodie_jhzh_64kb.mp3"),
    duration: 175,
    mood: "navidad",
    language: "Latín",
  },
  {
    id: "despertad",
    title: "Pastores, despertad",
    original: "Shepherds, Shake Off Your Drowsy Sleep",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_shepherdsshakeoff_mk_64kb.mp3"),
    duration: 134,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "oriente",
    title: "Estrella de oriente",
    original: "Star in the East",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_starintheeeast_jhzh_64kb.mp3"),
    duration: 237,
    mood: "navidad",
    language: "Inglés",
  },
  {
    id: "centinela",
    title: "Centinela, dinos de la noche",
    original: "Watchman, Tell Us of the Night",
    artistId: "coro",
    albumId: "nochebuena",
    src: ia(CAROLS21, "ccc21_watchmantellus_jhzh_64kb.mp3"),
    duration: 189,
    mood: "navidad",
    language: "Inglés",
  },
];

export const albums: Album[] = [
  {
    id: "alabanza",
    title: "Alabanza eterna",
    artistId: "voces",
    year: "2009",
    cover: "/covers/alabanza.svg",
    description: "Himnos de alabanza cantados por voluntarios. Domingo por la mañana, en voz y piano sencillo.",
    trackIds: ["gloria", "gracia", "certeza", "fuente", "hermosura", "poder", "jesus", "reunimos", "confia"],
  },
  {
    id: "consuelo",
    title: "Consuelo",
    artistId: "voces",
    year: "2009",
    cover: "/covers/consuelo.svg",
    description: "Canciones para orar cuando el día pesa: visión, paz, rendición y refugio.",
    trackIds: ["vision", "padre", "peregrino", "entrego", "paz", "talcomo", "roca", "suave", "dulce", "gorrion"],
  },
  {
    id: "villancicos",
    title: "Villancicos",
    artistId: "coro",
    year: "2020",
    cover: "/covers/villancicos.svg",
    description: "Los villancicos que ya conoces, en las lenguas en que se cantaron primero.",
    trackIds: [
      "adeste",
      "pesebre",
      "oid",
      "gozo",
      "reyes",
      "nino",
      "emanuel",
      "ding",
      "descanso",
      "naves",
      "acebo",
      "estrella",
      "nacido",
      "aleluya",
      "pastores",
    ],
  },
  {
    id: "nochebuena",
    title: "Nochebuena",
    artistId: "coro",
    year: "2021",
    cover: "/covers/nochebuena.svg",
    description: "Una noche más quieta: ángeles, pastores y el silencio antes del canto.",
    trackIds: [
      "gabriel",
      "medianoche",
      "silencio",
      "nino-nace",
      "cristo-nace",
      "personent",
      "oriente",
      "centinela",
      "despertad",
      "toda-gloria",
      "aves",
      "adam",
    ],
  },
];

export const mixes: Mix[] = [
  {
    id: "domingo",
    title: "Domingo por la mañana",
    subtitle: "Alabanza para empezar el día",
    cover: "/covers/domingo.svg",
    trackIds: ["reunimos", "gloria", "gracia", "hermosura", "poder", "gozo", "oid", "certeza"],
  },
  {
    id: "oracion",
    title: "Para orar",
    subtitle: "Voces quietas, sin prisa",
    cover: "/covers/oracion.svg",
    trackIds: ["vision", "paz", "roca", "padre", "suave", "dulce", "silencio", "gorrion", "talcomo"],
  },
  {
    id: "navidad",
    title: "Navidad en casa",
    subtitle: "Villancicos de siempre",
    cover: "/covers/villancicos.svg",
    trackIds: ["gozo", "oid", "pesebre", "adeste", "reyes", "nino", "emanuel", "ding", "medianoche"],
  },
  {
    id: "clasicos",
    title: "Clásicos que conoces",
    subtitle: "Los himnos que la iglesia no suelta",
    cover: "/covers/alabanza.svg",
    trackIds: ["gracia", "paz", "vision", "roca", "talcomo", "certeza", "entrego", "fuente"],
  },
  {
    id: "latin",
    title: "Latín y coro",
    subtitle: "Adeste, Emanuel y más",
    cover: "/covers/coro.svg",
    trackIds: ["adeste", "emanuel", "personent", "aleluya", "pastores", "nacido", "silencio"],
  },
];

const trackMap = new Map(tracks.map((track) => [track.id, track]));
const albumMap = new Map(albums.map((album) => [album.id, album]));
const artistMap = new Map(artists.map((artist) => [artist.id, artist]));
const mixMap = new Map(mixes.map((mix) => [mix.id, mix]));

export function trackById(id: string | undefined) {
  return id ? trackMap.get(id) : undefined;
}

export function albumById(id: string) {
  return albumMap.get(id);
}

export function artistById(id: string) {
  return artistMap.get(id);
}

export function mixById(id: string) {
  return mixMap.get(id);
}

export function tracksOf(ids: string[]) {
  return ids.map((id) => trackMap.get(id)).filter((track): track is Track => Boolean(track));
}

export function albumTracks(albumId: string) {
  const album = albumMap.get(albumId);
  return album ? tracksOf(album.trackIds) : [];
}

export function artistAlbums(artistId: string) {
  return albums.filter((album) => album.artistId === artistId);
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const min = Math.floor(whole / 60);
  const sec = whole % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export function searchCatalog(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { tracks: [] as Track[], albums: [] as Album[], artists: [] as Artist[] };
  return {
    tracks: tracks.filter((track) =>
      [track.title, track.original, track.language, artistById(track.artistId)?.name, albumById(track.albumId)?.title]
        .join(" ")
        .toLowerCase()
        .includes(q),
    ),
    albums: albums.filter((album) =>
      [album.title, album.description, artistById(album.artistId)?.name].join(" ").toLowerCase().includes(q),
    ),
    artists: artists.filter((artist) => artist.name.toLowerCase().includes(q) || artist.blurb.toLowerCase().includes(q)),
  };
}
