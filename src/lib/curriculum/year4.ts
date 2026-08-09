import type { Course } from "./types";

export const YEAR_4: Course[] = [
  {
    code: "ENG 426",
    title: "Twentieth-Century English Literature",
    year: 4,
    semester: 7,
    credits: 4,
    description:
      "From literary modernism through post-war and contemporary writing, examining modernist experiments in form, the trauma of two world wars, and the expanding cultural map of English literature.",
    learningOutcomes: [
      "Analyse modernist techniques of fragmentation, stream of consciousness and montage.",
      "Interpret how war, empire and mass culture reshape literary form and theme.",
      "Evaluate the shift from modernism to postmodernism and world literatures."
    ],
    topics: [
      {
        title: "Modernism",
        notes:
          "Modernist writers broke with Victorian realism, using fragmentation, collage, stream of consciousness and intertextual allusion to represent a shattered world. Virginia Woolf's *Mrs Dalloway* follows a single day through Clarissa's mind and Septimus's trauma, collapsing past and present. T.S. Eliot's *The Waste Land* juxtaposes voices in a landscape of spiritual desolation. James Joyce's *Ulysses* makes an ordinary Dublin day into an epic."
      },
      {
        title: "Post-war and postcolonial",
        notes:
          "After 1945, literature grappled with totalitarianism (Orwell's *Nineteen Eighty-Four*, *Animal Farm*), the Holocaust, and decolonisation. Postmodernism (Pynchon, Barthelme) embraced parody, pastiche and metafiction. The 'global novel' (Salman Rushdie, Kazuo Ishiguro) brought postcolonial voices into the mainstream of English literature, using magic realism and unreliable narration to explore identity and history."
      }
    ],
    setBooks: [
      { title: "Mrs Dalloway", author: "Virginia Woolf", edition: "Harcourt Brace" },
      { title: "Nineteen Eighty-Four", author: "George Orwell", edition: "Harvill Secker" },
      { title: "Midnight's Children", author: "Salman Rushdie", edition: "Vintage" }
    ],
    keyAuthors: [
      {
        name: "Virginia Woolf",
        lifespan: "1882–1941",
        nationality: "UK",
        notableWorks: ["Mrs Dalloway", "To the Lighthouse", "Orlando", "A Room of One's Own"],
        bio: "Modernist novelist and essayist who pioneered stream of consciousness and wrote influential feminist literary criticism."
      },
      {
        name: "George Orwell",
        lifespan: "1903–1950",
        nationality: "UK",
        notableWorks: ["Nineteen Eighty-Four", "Animal Farm", "Homage to Catalonia"],
        bio: "Novelist and essayist whose vivid dystopias and political reportage exposed totalitarianism and social injustice."
      },
      {
        name: "Salman Rushdie",
        lifespan: "1947–",
        nationality: "India/UK",
        notableWorks: ["Midnight's Children", "The Satanic Verses", "Midnight's Children"],
        bio: "Anglo-Indian novelist whose magical realist epics blend personal and national history; *Midnight's Children* won the Booker Prize."
      }
    ],
    notes: `## Twentieth-Century English Literature — Lecture Notes

### Modernism (c. 1900–1945)
Modernism reacted against Victorian moralising and realist conventions, responding to Freudian psychology, Einstein's relativity, and the trauma of the First World War. Writers experimented with form: **stream of consciousness** (interior monologue without narrator mediation), **fragmentation**, **collage** and dense **intertextual allusion**.

**Virginia Woolf** dissolves the omniscient narrator. *Mrs Dalloway* (1925) travels through a single London day, moving between Clarissa's party preparations and Septimus's war trauma, collapsing past and present in free indirect thought. 'She felt somehow very like him — the young man's passion for the little pool... she was positive about it.'

**T.S. Eliot's *The Waste Land*** (1922) is a modernist manifesto in verse: voices, languages, myth, and quotations pile up until the reader must assemble meaning. The famous opening ('April is the cruellest month') ironises the usual spring-rebirth trope.

**James Joyce's *Ulysses*** (1922) makes a single Dublin day — June 16, 1904 — the matter of epic, mapping Leopold Bloom's wanderings onto Odysseus's journey.

### Post-war to postmodern
Orwell's *Nineteen Eighty-Four* (1949) and *Animal Farm* (1945) are direct political interventions against totalitarianism. Postmodern writers (Pynchon, Barthelme, Calvino) parody, metafee, and fragment. The 'global novel' (Rushdie, Ishiguro) brings postcolonial experience into the heart of English literature: *Midnight's Children* (1981) uses magical realism to tell India's birth from a child whose powers mirror the new nation.`
  },
  {
    code: "ENG 415",
    title: "Literary Theory and Criticism",
    year: 4,
    semester: 7,
    credits: 4,
    description:
      "An introduction to major schools of modern and contemporary literary theory: structuralism and post-structuralism, Marxism, feminism and gender studies, postcolonial theory, and psychoanalysis.",
    learningOutcomes: [
      "Distinguish the central concerns and methods of major theoretical schools.",
      "Apply theoretical concepts to close readings of literary texts.",
      "Critically evaluate how theory reads texts and vice versa."
    ],
    topics: [
      {
        title: "Structuralism to post-structuralism",
        notes:
          "Structuralism (Lévi-Strauss, Barthes) argued that meaning arises from underlying structures and binary oppositions; the 'death of the author' (Barthes) shifted focus to the reader/text. **Post-structuralism** (Derrida's deconstruction) showed that meaning is never stable: texts contain internal contradictions and the play of signifiers (différance). Foucault's 'archaeology of knowledge' mapped how discourses produce subjects and truths."
      },
      {
        title: "Marxism, feminism and postcolonial theory",
        notes:
          "Marxist criticism (Marx, Engels, later Althusser, Gramsci) reads literature as ideology and as product of material conditions: consider authorial class position, ideology and the base/superstructure relation. **Feminist/gender theory** (de Beauvoir, Cixous, Butler) examines gender construction; Butler's 'performativity' argues gender is repeated, not innate. **Postcolonial theory** (Fanon, Said, Bhabha, Spivak) analyses imperial discourse: Said's *Orientalism* showed how the West constructed the East; Fanon on violence and decolonisation; Bhabha on hybridity and the 'third space'; Spivak's 'Can the Subaltern Speak?' on who can represent the voiceless."
      }
    ],
    setBooks: [
      {
        title: "Literary Theory: An Introduction",
        author: "Terry Eagleton",
        edition: "4th ed."
      },
      {
        title: "The Routledge Companion to Critical Theory",
        author: "ed. Simon Glendinning, et al."
      }
    ],
    keyAuthors: [
      {
        name: "Michel Foucault",
        lifespan: "1926–1984",
        nationality: "France",
        notableWorks: ["Madness and Civilization", "The Archaeology of Knowledge", "Discipline and Punish"],
        bio: "Philosopher whose work on power, knowledge and discourse reshaped literary and cultural studies."
      },
      {
        name: "Jacques Derrida",
        lifespan: "1930–2004",
        nationality: "France/Algeria",
        notableWorks: ["Of Grammatology", "Writing and Difference"],
        bio: "Founder of deconstruction, which showed that texts undermine their own meanings through internal contradictions."
      },
      {
        name: "Frantz Fanon",
        lifespan: "1925–1961",
        nationality: "Martinique/France/Algeria",
        notableWorks: ["The Wretched of the Earth", "The Colonised and the Coloniser"],
        bio: "Psychiatrist and revolutionary whose analysis of colonial psychology and violence remains central to postcolonial theory."
      },
      {
        name: "Gayatri Chakravorty Spivak",
        lifespan: "1942–",
        nationality: "India/US",
        notableWorks: ["Can the Subaltern Speak?", "In Other Worlds"],
        bio: "Literary theorist and translator whose work on deconstruction and postcolonialism interrogates representation and voice."
      }
    ],
    notes: `## Literary Theory and Criticism — Lecture Notes

### Why theory?
Theory gives us a vocabulary for asking what literature does, how it means, and what social work it performs. It also reminds us that reading is never neutral.

### Schools in brief
**Structuralism** (Lévi-Strauss, Barthes): culture and literature are governed by underlying structures of binary oppositions. Barthes declared the 'death of the author' — the text and reader do the work.
**Post-structuralism / Deconstruction** (Derrida, Foucault): meaning is never final; texts contain contradictions that deconstruct them. Foucault studied how discourses produce subjects and 'truths.' 
**Marxism**: literature reflects and shapes material conditions and ideology. Consider class, labour, the relation between base and superstructure, and how stories can naturalise or resist power.
**Feminism / Gender**: de Beauvoir ('One is not born, but rather becomes, a woman'), Cixous's 'écriture féminine', and Butler's claim that gender is a repeated performance.
**Psychoanalysis**: Freud on the unconscious and Oedipus; Lacan on language and the psyche; the text as dream-work, the author as analysand.
**Postcolonial**: Said's *Orientalism* (the West's constructed East); Fanon on the violence of decolonisation; Bhabha's 'hybridity' and 'third space'; Spivak's question of who may speak for the subaltern.

### Applying theory
A text read 'Marxistly' asks: who owns the means of production in this world? A 'feminist' reading asks: whose voices are centred, whose silenced, how is gender performed? A 'deconstructive' reading asks: where does the text contradict itself, where does the centre not hold? Theory multiplies possible meanings; it does not cancel close reading.`
  },
  {
    code: "ENG 434",
    title: "Literary Stylistics",
    year: 4,
    semester: 7,
    credits: 4,
    description:
      "The linguistic analysis of literary texts: foregrounding, speech and thought presentation, point of view, sound patterns in poetry, and an introduction to corpus stylistics.",
    learningOutcomes: [
      "Apply linguistic concepts to the analysis of literary texts.",
      "Analyse point of view, focalisation and speech/thought presentation in fiction.",
      "Interpret sound and prosody in poetic texts."
    ],
    topics: [
      {
        title: "Foregrounding and point of view",
        notes:
          "Leech and Short's *Style* defines foregrounding as the way literary language stands out from non-literary language through **deviation** (unexpected) and **redundancy** (repeated). Point of view is analysed via **focalisation** (who sees: Homodiegetic/Heterodiegetic, internal/external, zero/first/third person). **Speech and Thought Presentation** (Banfield–Burke–Fowler types 0–4) maps how thoughts move from reported to free indirect to direct discourse."
      },
      {
        title: "Poet voice and corpus stylistics",
        notes:
          "In poetry, prosody (stress, rhythm, line breaks) and semantic patterning create meaning beyond the denotation of words. **Corpus stylistics** uses large databases and keyword analysis (e.g. Hansard Corpora, Google Books Ngram) to find unusual patterns — for instance, distinctive lexis around a theme. It complements but does not replace close reading."
      }
    ],
    setBooks: [
      { title: "Style: Language and the Literary Text", author: "Geoffrey N. Leech, Matthew Pfheifer & Stig Johansson (formerly Leech & Short)" }
    ],
    keyAuthors: [],
    notes: `## Literary Stylistics — Lecture Notes

### What is stylistics?
Stylistics is the linguistic analysis of literary (and sometimes non-literary) texts. It asks how form creates meaning: grammar, lexis, sound, structure, and the relationship between reader and text. The aim is not to 'explain away' literature but to add a precise vocabulary for talking about how it works.

### Foregrounding
Leech and Short argue literature is *foregrounded* language — it stands out. Two mechanisms: **deviation** (something unexpected, e.g. archaism, neologism) and **redundancy** (repeated patterns, parallelism, lists). When you notice a pattern being broken, you've found foregrounding.

### Point of view and focalisation
Genette distinguished **mood** (who sees: internal vs external focalisation), **voice** (who speaks: homodiegetic vs heterodiegetic narrator), and **time** (order, duration, frequency). Free indirect discourse is internal focalisation with the narrator's voice — a hallmark of the English novel (Austen, the Brontës, Eliot).

### Speech and Thought Presentation
Fowler's model (Types 1–5) charts the gradient from **reported** ('He thought...') to **direct** ('I...') through **free indirect** ('He was sure she was lying'). Most 19th- and 20th-century fiction moves fluidly across these types.

### Sound in poetry
Stress, rhythm, rhyme, alliteration and enjambment create prosody — the poem's music — which carries emotional and structural weight. Read aloud.`
  },
  {
    code: "ENG 432",
    title: "Pragmatics",
    year: 4,
    semester: 7,
    credits: 4,
    description:
      "How meaning is constructed in context: speech acts, implicature, deixis, politeness and discourse analysis, with application to literary texts.",
    learningOutcomes: [
      "Analyse utterances in terms of speech act and conversational implicature.",
      "Identify deictic expressions and politeness strategies in discourse.",
      "Apply pragmatic concepts to interpret literary dialogue."
    ],
    topics: [
      {
        title: "Speech acts and implicature",
        notes:
          "Austin distinguished locutionary (what is said), illocutionary (what is done in saying, e.g. promising, warning) and perlocutionary (effects on the listener) acts. Searle classified speech acts as assertives, directives, commissives, expressives and declarations. Grice's cooperative principle (quantity, quality, relation, manner) explains **conversational implicature**: what is meant beyond what is said. Irony and metaphor exploit the gap between literal and intended meaning."
      },
      {
        title: "Deixis and politeness",
        notes:
          "Deixis is 'pointing' in language: person ('I/you'), time ('now/tomorrow'), place ('here/there'), and social deixis (status, familiarity). Brown & Levinson's politeness theory distinguishes **positive** (friendly, solidarity) and **negative** (deference, autonomy) face; speakers use **hedges** and **boosters** to manage face in conversation and in literary dialogue."
      }
    ],
    setBooks: [
      { title: "Pragmatics", author: "Stephen C. Levinson", note: "Foundational textbook." },
      { title: "Speech Acts", author: "John Searle", note: "Classic essays on the topic." }
    ],
    keyAuthors: [],
    notes: ""
  },
  {
    code: "EDU 401",
    title: "Teaching English and Literature in Secondary Schools III",
    year: 4,
    semester: 7,
    credits: 4,
    description:
      "Advanced pedagogy: designing curriculum units, using digital tools, teaching controversial literature, and professional development for English and Literature teachers.",
    learningOutcomes: [
      "Design and assess coherent curriculum units across genres and years.",
      "Integrate digital tools and resources appropriately and ethically.",
      "Teach sensitive/literary content with awareness of diverse learners."
    ],
    topics: [
      {
        title: "Curriculum design and digital tools",
        notes:
          "Use the 5E model (Engage, Explore, Explain, Elaborate, Evaluate) or Understanding by Design for unit planning. Digital tools — online annotation (Hypothesis/Perusall), audio/video texts, digital storytelling — can deepen engagement with literature, but require teaching digital literacy and critical evaluation of sources. Assessment should be balanced (reading, writing, speaking, listening) and aligned to learning outcomes."
      },
      {
        title: "Controversial literature and professional growth",
        notes:
          "Some texts (e.g. *Things Fall Apart*, texts dealing with gender, violence, colonialism) can trigger strong responses. Establish ground rules, allow opt-outs where policy requires, and connect to learners' lived experience carefully. Professional development: keeping up with scholarship, peer observation, action research, and joining communities of practice (e.g. KELA, KAT) are essential for growth."
      }
    ],
    setBooks: [],
    keyAuthors: [],
    notes: ""
  },
  {
    code: "ENG 417",
    title: "Postcolonial Literature",
    year: 4,
    semester: 8,
    credits: 4,
    description:
      "Theories and texts of postcolonial writing worldwide, examining empire, migration, identity, language and resistance.",
    learningOutcomes: [
      "Apply postcolonial concepts (orientalism, hybridity, mimicry, subaltern) to texts.",
      "Analyse how writers write back to empire and represent cultural translation.",
      "Interpret literature's role in decolonisation and identity formation."
    ],
    topics: [
      {
        title: "Orientalism and writing back",
        notes:
          "Edward Said's *Orientalism* (1978) showed how Western discourse constructed 'the Orient' as exotic, backward and feminine — a justification for empire. 'Writing back' (Ashcroft, Griffiths, Tiffin) is the strategy by which colonial/subordinate writers re-articulate themselves in the colonial language: Chinua Achebe's response to Conrad, V.S. Naipaul's critique, and the Indian English novel."
      },
      {
        title: "Hybridity, mimicry and the diaspora",
        notes:
          "Homi Bhabha's 'mimicry' is the colonised subject's partial imitation of the coloniser that almost matches but never quite — 'almost the same, *but not quite*,' producing a threat to colonial authority. 'Hybridity' names the mixed cultural identities that emerge in the 'third space.' Postcolonial literature tracks migration, the journey narrative, translation and the re-creation of identity in a new land (Chimamanda Adichie, Jhumpa Lahiri, Dinaw Mengestu)."
      }
    ],
    setBooks: [
      { title: "Culture and Imperialism", author: "Edward Said", edition: "Vintage" },
      { title: "The Location of Culture", author: "Homi K. Bhabha", edition: "Routledge" }
    ],
    keyAuthors: [
      {
        name: "Edward Said",
        lifespan: "1935–2003",
        nationality: "Palestine/US",
        notableWorks: ["Orientalism", "Culture and Imperialism", "The Question of Palestine"],
        bio: "Literary critic and public intellectual whose *Orientalism* launched postcolonial studies as a field."
      },
      {
        name: "Homi K. Bhabha",
        lifespan: "1948–",
        nationality: "India/UK/US",
        notableWorks: ["The Location of Culture", "The Commitment"],
        bio: "Cultural theorist whose concepts of mimicry, hybridity and the third space are central to postcolonial theory."
      }
    ],
    notes: `## Postcolonial Literature — Lecture Notes

### The imperial archive and its critique
Edward Said's *Orientalism* (1978) argued that the West did not simply 'discover' the Orient but constructed it — as sensual, backward, despotic — in order to justify domination. Literature and scholarship together formed an 'imperial discourse.'

### Writing back
Postcolonial writers use the coloniser's language to speak their own truths, a strategy scholars call 'writing back to empire.' Chinua Achebe's *Things Fall Apart* is the touchstone: it tells the Igbo encounter with British colonialism from the inside, and its title ironises the collapse of traditional order ('Things fall apart; the centre cannot hold').

### Key concepts
- **Hybridity** (Bhabha): cultural identities are not pure but forged in the 'third space' of mixing; mimicry is 'almost the same, but not quite.'
- **Mimicry**: the colonised subject adopts the coloniser's language/culture in a way that destabilises colonial authority.
- **Subaltern** (Spivak): can the voiceless speak, and be heard? — a warning about representing the marginalised.
- **Mastery**: Achebe's concept that the colonised must 'master' the coloniser's language before turning it against him.
- **Diaspora**: the journey narrative, translation, and identity re-creation across borders.`
  },
  {
    code: "ENG 453",
    title: "Language and National Development (Kenya)",
    year: 4,
    semester: 8,
    credits: 4,
    description:
      "Examines the role of English and Kiswahili in Kenyan education, governance, media and the economy, and the challenges of language planning in a multilingual society.",
    learningOutcomes: [
      "Evaluate the functions of English and Kiswahili in Kenyan society.",
      "Explain the policy of mother-tongue-based multilingual education (MTB-MLE) and its challenges.",
      "Assess language as a factor in national development and inequality."
    ],
    topics: [
      {
        title: "Languages in Kenyan society",
        notes:
          "Kenya has ~70 languages (Niger-Congo, Nilotic, Cushitic, Bantu). English and Kiswahili are official (12-table constitution). English is the language of higher education, government and business; Kiswahili is the medium of early primary (MTB-MLE) and a unifying lingua. Mother tongues serve home, community and cultural identity. This three-tier system creates both access and exclusion: those strong in English/Kiswahili advance; others are left behind."
      },
      {
        title: "Language planning and education",
        notes:
          "The 2010 Constitution and the Language in Education Policy (MTB-MLE: instruction in the mother tongue in grades 1–3) aim to strengthen foundations. But implementation is uneven: a shortage of materials in mother tongues, teacher proficiency gaps, and the pull toward English for upward mobility undermine the policy. Language is tied to development: literacy in a known language boosts learning; denying it entrenches inequality."
      }
    ],
    setBooks: [
      { title: "Language and Development in East Africa", author: "John K. Bukuluni (ed.)", note: "Regional perspectives on language and development." },
      { title: "Kiswahili: Kegl-309", author: "M.A. Muhammed", note: "Introductory Swahili reference." }
    ],
    keyAuthors: [],
    notes: ""
  },
  {
    code: "ENG 454",
    title: "Multilingualism in the Kenyan Context",
    year: 4,
    semester: 8,
    credits: 4,
    description:
      "Theories and practice of multilingualism with special reference to Kenya: code-switching, translanguaging, urban youth language (Sheng), and the education system as a multilingual environment.",
    learningOutcomes: [
      "Describe code-switching and translanguaging phenomena in Kenyan contexts.",
      "Analyse the structure and social meaning of urban youth language (Sheng).",
      "Evaluate multilingual practices in Kenyan education."
    ],
    topics: [
      {
        title: "Code-switching and translanguaging",
        notes:
          "Code-switching is alternating between two or more languages within an utterance or conversation. In Kenya, English–Kiswahili and Kiswahili–mother-tongue switches are routine. **Translanguaging** is the more integrated practice of drawing flexibly on a speaker's full linguistic repertoire as one resource. Both reflect multilingual competence, not deficiency. Code-switching follows systematic rules (matrix language frame, markedness) and indexes identity, solidarity and stance."
      },
      {
        title: "Sheng and digital communication",
        notes:
          "Sheng (Sheng) is an evolving urban youth language — a lexicon and grammar mixing English, Kiswahili and ethnic-language elements (e.g. 'Ninakwenda sokoni' / 'Niko njiani'). It indexes youth identity and belonging across ethnic lines. Social media extends multilingual practices: SMS abbreviations, hashtags, and mixed-language posts. These are legitimate linguistic resources, not 'broken' language."
      }
    ],
    setBooks: [
      { title: "Multilingualism: A Very Short Introduction", author: "John E. Joseph", note: "Concise overview." },
      { title: "Sheng: Current Theories and Issues", author: "ed. B. O. Ogot" }
    ],
    keyAuthors: [],
    notes: ""
  },
  {
    code: "ENG 491",
    title: "Psycholinguistics",
    year: 4,
    semester: 8,
    credits: 4,
    description:
      "The psychological processes involved in language: comprehension, production, reading and writing, bilingualism and language disorders, with implications for teaching.",
    learningOutcomes: [
      "Explain models of language comprehension and production.",
      "Describe developmental and individual differences in reading and writing.",
      "Apply psycholinguistic insights to language teaching and assessment."
    ],
    topics: [
      {
        title: "Language processing",
        notes:
          "Comprehension is incremental: listeners build meaning word by word, using context and prediction. Production goes from concept to message to grammatical plan to speech — a non-trivial chain. **Reading** involves orthographic, phonological and semantic processing; dyslexia shows how phonological processing can break down. **Bilingualism** is the norm, not the exception: bilingual children develop both languages without confusion, though mixing may occur. Age of acquisition effects mean early exposure gives native-like pronunciation."
      },
      {
        title: "Implications for teaching",
        notes:
          "Learner factors — aptitude, motivation, anxiety, working memory, age — predict success. The **simple view of reading** (decoding × linguistic comprehension) explains why learners strong in one component can struggle overall. Short-term memory limits affect listening and reading. Effective teaching gives learners rich, meaningful input, opportunities to produce language, and explicit attention to form within meaning-focused tasks."
      }
    ],
    setBooks: [
      { title: "Psycholinguistics: Introduction and Applications", author: "Thomas Scovel", note: "Accessible introduction." },
      { title: "The Psychology of Second Language Acquisition", author: "Günter Senoohn" }
    ],
    keyAuthors: [],
    notes: ""
  },
  {
    code: "ENG 409",
    title: "Research Project / Dissertation",
    year: 4,
    semester: 8,
    credits: 6,
    description:
      "An independent research project under supervision, applying the methods of literary studies and/or applied linguistics to a topic in English and Literature.",
    learningOutcomes: [
      "Formulate a research question and design a feasible methodology.",
      "Locate the project in relevant theoretical and critical literature.",
      "Present findings clearly in writing following academic conventions."
    ],
    topics: [
      {
        title: "Research methods",
        notes:
          "Projects may be archival/library-based (critical editions, textual scholarship, corpus analysis, theoretical readings), empirical (surveys, interviews, classroom observation), or creative-critical (a critical commentary plus a creative piece). Ethics approval is required for empirical work. Keep a research diary, manage time with a timeline, and write in stages with supervisor feedback."
      }
    ],
    setBooks: [
      { title: "Doing Your Undergraduate Research Project", author: "Patrick Davies", note: "Practical guide to researching and writing." },
      { title: "The MLA Handbook", author: "Modern Language Association", note: "Standard citation and formatting guide." }
    ],
    keyAuthors: [],
    notes: ""
  }
];
