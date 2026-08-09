import type { Course } from "./types";

export const YEAR_1: Course[] = [
  {
    code: "ENG 111",
    title: "An Introduction to Literature",
    year: 1,
    semester: 1,
    credits: 4,
    description:
      "An introductory survey of the study of literature. Students are introduced to the major literary genres, basic elements of literary language and the practice of close, critical reading of texts drawn from prose fiction, poetry, drama and oral literature.",
    learningOutcomes: [
      "Identify and explain the major literary genres and their distinguishing features.",
      "Analyse literary elements such as plot, character, setting, point of view, theme, tone, symbolism and imagery.",
      "Apply close-reading skills to a range of literary texts.",
      "Distinguish between literal and figurative language in literary texts."
    ],
    topics: [
      {
        title: "Literary genres and their formal features",
        notes:
          "Literature is grouped into genres distinguished by form and convention. Prose fiction is organised in sentences and paragraphs; its material is narrative developed through plot, character, setting, point of view and technique. Poetry is written in verse, relying on line, rhythm, metre, sound devices (alliteration, assonance, consonance, rhyme) and compression; it commonly uses figurative language deliberately. Drama is literature in dialogue, meant to be performed; it is structured into acts and scenes and realised through dialogue, stage directions, plot and characterisation. Oral literature — folktales, myths, legends, proverbs, riddles, praise poetry and epic — is transmitted by word of mouth and preserves cultural values, worldviews and history; it remains a living tradition in many Kenyan communities."
      },
      {
        title: "Elements of literary language",
        notes:
          "Critical reading requires attention to how meaning is made through language. Diction is the author's choice of words and registers; connotation is a word's associative meaning beyond its dictionary (denotation). Imagery is language that appeals to the senses. Symbol stands for something beyond itself. Motif is a recurring element. Irony is a discrepancy between expectation and reality — verbal, situational and dramatic. Tone is the author's attitude; mood is the atmosphere for the reader. Figurative language includes metaphor, simile, personification, hyperbole, metonymy and synecdoche."
      },
      {
        title: "Close reading and textual analysis",
        notes:
          "Close reading means reading a text slowly and attentively, noticing how every word and formal choice contributes to meaning. Begin by identifying what the text says at the surface level (the literal meaning), then consider how the language and structure produce that meaning and what else they may be doing. A strong analytical paragraph centres on a single point (topic sentence), supports it with specific evidence (quotations and references to the text), and explains how that evidence supports the point. This method is the foundation of all literary essay writing."
      }
    ],
    setBooks: [
      {
        title: "The Penguin Introduction to Literature",
        author: "ed. various",
        note: "Anthology of short stories, poems and one-act plays used for class discussion."
      }
    ],
    keyAuthors: [
      {
        name: "Ngũgĩ wa Thiong'o",
        lifespan: "1938–",
        nationality: "Kenya",
        notableWorks: ["Weep Not, Child", "A Grain of Wheat", "Decolonising the Mind"],
        bio: "Kenyan novelist, playwright and scholar whose early novels in English were followed by a decisive turn to writing in Gĩkũyũ; his theory of linguistic decolonisation is central to postcolonial studies."
      },
      {
        name: "Chinua Achebe",
        lifespan: "1930–2013",
        nationality: "Nigeria",
        notableWorks: ["Things Fall Apart", "No Longer at Ease"],
        bio: "Novelist and critic widely regarded as the father of modern African literature in English; his work interrogates the colonial encounter and its aftermath."
      }
    ],
    notes: `## An Introduction to Literature — Lecture Notes

Literature is imaginative and artistic writing that uses language for aesthetic and expressive ends — language that is dense, compressed, figurative and open to interpretation. It gives us a way of seeing and feeling our lives and the lives of others that ordinary discourse cannot provide.

### The major literary genres

**Prose fiction.** Organised in sentences and paragraphs (not verse lines). Its material is narrative: a sequence of events told through a narrator and developed through plot, character, setting, point of view and technique. The short story is brief and focused on a single incident or mood; the novel is longer and more complex.

**Poetry.** Written in verse, arranged in lines and stanzas. It trades on rhythm and sound as well as sense: alliteration, assonance, consonance, rhyme, metre. It uses imagery, metaphor and symbol deliberately and is often compressed. Forms include the sonnet (Petrarchan and Shakespearean), the ode, ballad, elegy and free verse.

**Drama.** Literature in dialogue intended for performance. It unfolds in acts and scenes, realised by actors and partly described through stage directions. Its power lies in conflict presented through speech and action. Forms include tragedy (e.g. Shakespeare's *Hamlet*), comedy and tragicomedy, the one-act play and modern verbatim drama.

**Oral literature.** Traditional stories, songs, proverbs, riddles, epics and praise-poetry of communities transmitted by word of mouth. In Kenya this includes Gĩkũyũ *Hadithi* (folktales featuring *Mũkurū wa Njoki*, *Kĩhĩnju*), Kĩsĩ/Mĩgĩrĩmanĩ (proverbs), and praise poetry such as *bĩrĩku* among the Kalenjin. Oral literature is not a primitive precursor to written literature; it is a sophisticated mode of cultural preservation and artistic expression.

### Key terms
Plot · Character (flat/round, static/dynamic) · Setting · Point of view (first/second/third person; limited/omniscient) · Theme · Tone · Mood · Irony (verbal, situational, dramatic) · Symbol · Motif · Imagery · Diction · Connotation/Denomination · Metaphor · Simile · Personification · Genre · Stanza · Line · Rhyme/Metre · Alliteration/Assonance/Consonance
`
  },
  {
    code: "EDU 101",
    title: "Communication Skills and Academic Writing",
    year: 1,
    semester: 1,
    credits: 3,
    description:
      "Foundational academic literacy for Literary Studies: essay planning, paragraphing, source use, referencing, and the production of coherent academic prose.",
    learningOutcomes: [
      "Plan, draft and revise essays that present a clear, organised argument.",
      "Use paragraph structure effectively with clear topic sentences and evidence.",
      "Integrate and acknowledge sources using the Harvard referencing system.",
      "Identify and correct common grammatical errors in academic writing."
    ],
    topics: [
      {
        title: "Academic essay structure",
        notes:
          "A literary essay advances a debatable claim (thesis) supported by evidence and analysis. An introduction orients the reader and states the thesis; body paragraphs each turn on a single point (topic sentence) backed by a quotation and explanation; a conclusion shows the argument's significance. Unity, coherence and proportion are essential."
      },
      {
        title: "Paraphrase, summary, quotation and plagiarism",
        notes:
          "A summary condenses main points in your own words; a paraphrase restates closely in your own words; a quotation reproduces exact words in quotation marks and cited. Each must be cited. Plagiarism — presenting others' ideas or words as your own — is a serious offence. The Harvard (author-date) system is standard in Kenyan universities: in-text (Author Year, page) and a reference list at the end."
      }
    ],
    setBooks: [
      {
        title: "The OWL at Purdue: Academic Writing",
        author: "Purdue University",
        note: "Online guide to essay writing and referencing."
      }
    ],
    keyAuthors: [],
    notes: `## Communication Skills and Academic Writing — Lecture Notes

### Planning an essay
Start by unpacking the question. Turn it into a specific, arguable thesis. Make a rough outline: an introduction that introduces the topic, gives context and states the thesis; two or three body sections each covering one point; a conclusion that evaluates the argument's wider significance.

### The paragraph
A good paragraph has a clear topic sentence, relevant evidence (a short quotation from the text), and an explanation of how the evidence supports the point. Keep one idea per paragraph. Link ideas between paragraphs with transitional words (however, furthermore, in contrast).

### Using sources
Always cite sources for both ideas and direct quotation. When you summarise or paraphrase, still give credit. Harvard in-text citation looks like (Shakespeare 2005, 12) and the reference list gives surname, initials, year, italic title, edition, place: publisher.

### Common errors to avoid
- Run-on sentences and fragments.
- Missing articles (a, an, the) and subject-verb disagreement.
- Quotations dropped in without analysis.
- A conclusion that only summarises instead of evaluating.

### Practice
Rewrite a paragraph that simply lists events into one that argues a point, using one close-reading detail as evidence.`
  },
  {
    code: "EDU 102",
    title: "Study Skills, Research Methods and ICT",
    year: 1,
    semester: 1,
    credits: 3,
    description:
      "Introduces the methods and skills required for literary and humanities research: planning research, evaluating sources, note-taking, bibliography building, and using ICT tools for learning.",
    learningOutcomes: [
      "Distinguish between primary and secondary sources and evaluate their reliability.",
      "Construct effective research questions and locate relevant materials.",
      "Take reasoned notes and build a bibliography following standard conventions.",
      "Use ICT tools appropriately for research and academic writing."
    ],
    topics: [
      {
        title: "Research questions and secondary criticism",
        notes:
          "Good literary research begins with a question that is specific, manageable and arguable. Secondary criticism (journal articles, monographs, edited collections) helps map what has been written. Use the library catalogue, JSTOR, Project MUSE and the university's digital resources. Keep a research log of what you searched, where, and what you found."
      },
      {
        title: "Evaluating sources",
        notes:
          "Ask: Who wrote this and what are their credentials? When was it published? Who published it (scholarly press vs trade)? Is the argument supported by evidence? Are other scholars cited? Peer-reviewed articles and university-press monographs are most reliable; websites require careful corroboration. ICT skills include using reference managers (Zotero), database search with Boolean operators, and careful file organisation."
      }
    ],
    setBooks: [],
    keyAuthors: [],
    notes: ""
  },
  {
    code: "EDU 103",
    title: "Introduction to Education and Teaching Practice",
    year: 1,
    semester: 1,
    credits: 3,
    description:
      "Orientation to the education system in Kenya, the professional role of the teacher, and the basic principles, planning and assessment strategies of effective teaching and learning.",
    learningOutcomes: [
      "Outline the structure of basic education in Kenya and the professional role of the teacher.",
      "Explain principles of lesson planning, teaching and learning.",
      "Apply basic assessment methods for formative and summative purposes."
    ],
    topics: [
      {
        title: "The Kenyan education system and the teacher's role",
        notes:
          "Kenya's education structure (currently 2-6-3-4: early years, primary, junior secondary, senior secondary, university) and the Competency-Based Curriculum (CBC). The teacher is a facilitator, mentor and assessor. Professionalism, subject knowledge, communication and ethics are central. Teachers must understand curriculum aims and learners' diverse needs, including inclusive practice."
      },
      {
        title: "Lesson planning and assessment",
        notes:
          "A lesson plan states the objective, learning outcomes, teaching and learning activities, resources and how learning will be assessed. Assessment can be formative (during learning: questioning, peer feedback) or summative (end of unit/term). Valid assessment measures intended outcomes fairly and reliably."
      }
    ],
    setBooks: [],
    keyAuthors: [],
    notes: ""
  },
  {
    code: "ENG 181",
    title: "Introduction to Prose Fiction",
    year: 1,
    semester: 2,
    credits: 4,
    description:
      "Introduction to the reading and interpretation of narrative prose fiction. Covers the elements of narrative — plot, character, focalisation, narrative voice — through close reading of short stories and novel extracts.",
    learningOutcomes: [
      "Identify and analyse the major elements of narrative fiction.",
      "Compare different narrative techniques and points of view (homodiegetic, heterodiegetic, focalisation).",
      "Interpret how narrative form shapes meaning in prose."
    ],
    topics: [
      {
        title: "Elements of narrative",
        notes:
          "Narrative has core elements: an event sequence (plot), expressed in a particular way (narration), set in time and place (setting), involving characters, carrying a story (myth) plus a specific telling (story). Plot concerns the organisation of events: exposition, inciting incident, rising action, climax, falling action and resolution. Character can be flat or round, static or dynamic. Mood and voice matter."
      },
      {
        title: "Narratology: story and discourse, point of view",
        notes:
          "The 'story' is the chronological sequence; the 'discourse' is how it is told, which may reorder events (flashback/analepsis, flashforward/prolepsis). Point of view: first-person ('I'), first-person multiple, third-person limited, third-person omniscient, or free indirect discourse. Free indirect discourse lets the narrator adopt a character's voice while remaining offstage — crucial in the English novel."
      }
    ],
    setBooks: [
      {
        title: "The Oxford Book of African Stories",
        author: "ed. Helon Habila & Chika Unigwe",
        note: "Anthology of African short fiction including Kenyan writers."
      }
    ],
    keyAuthors: [
      {
        name: "Grace Ogot",
        lifespan: "1930–2018",
        nationality: "Kenya",
        notableWorks: ["The Promised Gift", "The Stone of Ibira"],
        bio: "One of the first East African women published in English; her stories explore traditional beliefs, Christian conversion and women's inner lives."
      },
      {
        name: "Meja Mwangi",
        lifespan: "1940–",
        nationality: "Kenya",
        notableWorks: ["Going Down River Road", "The Cockroach Dance"],
        bio: "Kenyan novelist and screenwriter whose gritty urban stories chart postcolonial Kenyan society."
      }
    ],
    notes: `## Introduction to Prose Fiction — Lecture Notes

### Story, plot and narration
Narrative fiction tells a story through prose. The **story** is the chronological sequence of incidents; the **plot** is how those events are arranged and presented (the discourse). A plot usually moves through exposition → inciting incident → rising action → climax → falling action → resolution. The narrator decides what we see and when.

### Character and point of view
Characters may be **flat** (stereotypical, quickly recognised) or **round** (complex, surprising), **static** (unchanged) or **dynamic** (changed by events). **Point of view** is the narrator's position: first-person 'I', third-person limited (one character's thoughts), third-person omniscient (all minds), or **free indirect discourse** (the narrator adopts a character's voice).

### Reading a passage
When you read a paragraph, ask: whose voice do we hear? What does the choice of words (diction) suggest about class or emotion? Where does the camera 'move' — close on a detail, then pulling back? How would the scene differ if told by another character?

### Telling detail
Great fiction makes the abstract concrete. A character's gesture, a room's smell, a sudden silence — these 'tell' us more than explicit statement. Notice how writers use detail to create mood, reveal class, or signal theme.`
  },
  {
    code: "ENG 171",
    title: "Introduction to Poetry",
    year: 1,
    semester: 2,
    credits: 4,
    description:
      "Introduction to reading and interpretation of poetry. Covers verse form, sound, imagery, figurative language and a range of poetic forms from the sonnet to free verse.",
    learningOutcomes: [
      "Read poetry aloud to hear its rhythm and sound.",
      "Identify and analyse poetic devices: metre, rhyme, imagery, metaphor, symbol.",
      "Interpret how form and technique shape meaning across poetic traditions."
    ],
    topics: [
      {
        title: "Form, line and sound",
        notes:
          "A line is the basic unit of poetry; a stanza is its paragraph. Metre is the pattern of stressed and unstressed syllables: iambic (unstressed-STRESSED), trochaic (STRESSED-unstressed), anapestic, dactylic. Rhyme schemes are labelled with letters. Sound devices include alliteration, assonance, consonance and onomatopoeia. Enjambment (line breaks across syntax) controls pace and surprise."
      },
      {
        title: "Figurative language and meaning",
        notes:
          "Poetry works through density and indirection. A metaphor states one thing is another; a simile uses 'like'/'as'. A symbol carries meaning beyond itself. Imagery appeals to the senses. Because poetry compresses, a single image can carry thematic weight. The sonnet is a fourteen-line form (Petrarchan: octave + sestet; Shakespearean: three quatrains + couplet) traditionally addressing love, beauty, politics or mortality."
      }
    ],
    setBooks: [
      {
        title: "The Rattle Bag",
        author: "ed. Seamus Heaney & Ted Hughes",
        note: "Anthology of poems from many traditions."
      }
    ],
    keyAuthors: [
      {
        name: "Okello wa Lande-Liage",
        lifespan: "?",
        nationality: "Kenya",
        notableWorks: ["Songs of Innocence"],
        bio: "Kenyan poet writing in English and Luo; his work explores East African identity, language and the politics of belonging."
      }
    ],
    notes: `## Introduction to Poetry — Lecture Notes

Poetry is language shaped by line and rhythm as well as sense. To read a poem, first read it aloud, several times.

### Sound and structure
Listen to the rhythm: is it regular (metre) or irregular (free verse)? Mark stressed and unstressed syllables. Note end-rhyme and internal sound patterns: alliteration, assonance, consonance. Notice where lines break (enjambment) and how that affects pace and surprise.

### Meaning and device
Poetry is dense. Look for figurative language — metaphor, simile, personification, symbol — and ask how they extend meaning. A symbol gathers associations; a single image (a dove, a road, a season) can carry a whole theme. The 'speaker' of a lyric is rarely the poet.

### The sonnet
Fourteen lines, two chief kinds: **Petrarchan** (octave presents, sestet replies) and **Shakespearean** (three quatrains + final couplet). The volta (the 'turn' of argument or emotion) usually comes at the sestet or the final couplet.

### Practice
- What is the poem's voice? Persona or poet?
- Where does the poem's 'action' happen — description, thought, address?
- How does the form interact with the subject matter?`
  },
  {
    code: "ENG 161",
    title: "Introduction to Drama",
    year: 1,
    semester: 2,
    credits: 4,
    description:
      "Introduction to reading and interpreting drama. Covers theatrical vocabulary, dramatic structure, characterisation through dialogue, and the relationship between text and performance.",
    learningOutcomes: [
      "Use basic theatrical vocabulary: proscenium, aside, soliloquy, chorus, catastrophe.",
      "Analyse how dramatic structure creates tension and release.",
      "Interpret how character is revealed through speech and action."
    ],
    topics: [
      {
        title: "Dramatic form and structure",
        notes:
          "Drama is literature in dialogue intended for performance. Five-act structure (exposition, rising action, climax, falling action, catastrophe) derives from classical tragedy. Aristotle's unities (action, time, place) were ideals. Devices: the soliloquy (a character alone, e.g. Hamlet's 'To be or not to be'), the aside (secret to the audience), and dramatic irony (audience knows more than characters)."
      },
      {
        title: "Stagecraft and interpretation",
        notes:
          "When reading a play, imagine it staged. Note entrances/exits and timing. Consider how spatial relationships, costume and props convey status and theme. Theatrical conventions change: Elizabethan thrust stage, Restoration proscenium, modern naturalism, Brecht's alienation. Each convention shapes what the audience feels and thinks."
      }
    ],
    setBooks: [
      {
        title: "Shakespeare: The Comedies / The Tragedies",
        author: "William Shakespeare",
        edition: "Penguin Classics",
        note: "Standard editions used in class."
      }
    ],
    keyAuthors: [],
    notes: `## Introduction to Drama — Lecture Notes

Drama is literature in dialogue, written to be performed before an audience. Its meaning is made through speech, action, voice, movement, space and time — not just the printed word.

### Types of drama
**Tragedy** portrays a protagonist's fall, arousing pity and fear (Aristotelian catharsis). **Comedy** exposes folly and ends in reconciliation. **History** dramatises the past. Modern forms include the one-act play and verbatim drama.

### Dramatic structure
Classical tragedy follows five parts: exposition, rising action, climax, falling action, catastrophe. Shakespeare's five-act plays (e.g. *Macbeth*) generally follow this. Modern plays may fracture the order deliberately.

### Key theatrical terms
- **Soliloquy** — a character's speech alone (Hamlet's 'To be or not to be').
- **Aside** — spoken by a character to the audience, unheard by others.
- **Dramatic irony** — the audience knows more than the characters.
- **Chorus** — comments on the action (Greek tragedy).
- **Catastrophe** — the final resolution, especially of a tragedy.

### Reading a play
Read twice: once for story, once as a blueprint for performance. Mark who speaks, when they enter/exit, and stage directions. Ask how dialogue reveals status, intention and conflict, and how the structure builds and releases tension.`
  },
  {
    code: "ENG 121",
    title: "The History of the English Language",
    year: 1,
    semester: 2,
    credits: 4,
    description:
      "Surveys the development of English from its Indo-European roots through Old, Middle and Early Modern English, focussing on major phonological, morphological and lexical changes and their social causes.",
    learningOutcomes: [
      "Trace the development of English through Old, Middle and Early Modern periods.",
      "Explain major sound changes such as the Great Vowel Shift.",
      "Account for lexical and grammatical change in terms of social and historical factors."
    ],
    topics: [
      {
        title: "Old and Middle English",
        notes:
          "English began with the Anglo-Saxon settlements (5th century) giving Old English (Beowulf's language) — a heavily inflected Germanic tongue. Christianisation (597+) brought Latin loanwords; Viking invasions added Norse. The 1066 Norman Conquest made French the language of court/law while English survived among people. Middle English (Chaucer's Canterbury Tales c. 1400) saw inflections drop and word order take over grammatical work."
      },
      {
        title: "Early Modern English and the Great Vowel Shift",
        notes:
          "The Renaissance brought a flood of Latin and Greek borrowings into English. The Great Vowel Shift (c. 1400–1700) changed long-vowel pronunciation dramatically — the reason 'time' and 'name' no longer match their spelling. Printing (Caxton 1476) and the King James Bible (1611) spread standardisation. Shakespeare and his contemporaries coined or popularised thousands of words still in use."
      }
    ],
    setBooks: [
      {
        title: "The Cambridge Encyclopedia of the English Language",
        author: "David Crystal",
        note: "Authoritative visual guide to the history and structure of English."
      },
      {
        title: "Beowulf",
        author: "trans. Seamus Heaney (2000)",
        note: "Penguin Classics edition; representative Old English text."
      }
    ],
    keyAuthors: [],
    notes: `## The History of the English Language — Lecture Notes

### Four periods
English is usually divided into four periods: **Old English** (450–1150), **Middle English** (1150–1500), **Early Modern English** (1500–1700) and **Modern English** (1700–present).

### Old English (450–1150)
Brought by Angles, Saxons and Jutes. *Beowulf* (c. 1000) is the great epic. It was a heavily inflected Germanic tongue with three grammatical genders and a complex case system. Verse was accentual (four stresses per line, split by a caesura). Christian missionaries added Latin religious vocabulary; Vikings added Norse (sky, skin, they, are, egg).

### Middle English (1150–1500)
The Norman Conquest (1066) made French the language of the court, law and elite; English survived among ordinary people and was reborn in Chaucer's time. Inflectional endings disappeared, so word order became important. Chaucer wrote *The Canterbury Tales* in the London dialect — the foundation of modern English.

### Early Modern English (1500–1700)
The Renaissance brought huge numbers of borrowings from Latin and Greek, especially in science and scholarship. The **Great Vowel Shift** (c. 1400–1700) changed the pronunciation of long vowels: 'time' once rhymed with 'team', 'name' with 'fame' as then pronounced. Printing (Caxton, 1476) and the King James Bible (1611) spread standardisation. Shakespeare and the Bible coined or popularised thousands of words still in use (assassination, lonely, accommodation, etc.).

### Why it matters for teachers
This history explains why English spelling is so irregular, why vocabulary is enormous, and why idioms resist logical explanation. It is essential background for teaching the language.`
  }
];
