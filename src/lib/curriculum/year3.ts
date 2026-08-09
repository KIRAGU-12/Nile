import type { Course } from "./types";

export const YEAR_3: Course[] = [
  {
    code: "ENG 301",
    title: "Victorian Literature",
    year: 3,
    semester: 5,
    credits: 4,
    description:
      "Reading of major Victorian poetry and prose in relation to the period's social concerns: industrialisation, empire, social reform, gender and the crisis of faith brought by scientific discovery.",
    learningOutcomes: [
      "Analyse Victorian literature in relation to its historical and social contexts.",
      "Compare realist, Gothic and sensation modes in Victorian fiction.",
      "Interpret Victorian poetry as engagement with faith, science and social criticism."
    ],
    topics: [
      {
        title: "The condition of England",
        notes:
          "Victorian writers confronted industrial cities, class inequality, the woman question, and British imperial expansion. Charles Dickens portrayed social injustice (Oliver Twist, Hard Times), while George Eliot (Mary Ann Evans) used realism to explore moral development and gender ('Middlemarch'). The period's poetry — Tennyson's *In Memoriam* (faith and doubt after Darwin), Robert Browning's dramatic monologues (the self speaking), and Matthew Arnold's 'Dover Beach' (the retreat of faith) — registers a crisis of certainty."
      },
      {
        title: "Gothic and sensation",
        notes:
          "Alongside realism, the Victorian period revived the Gothic (Charlotte Brontë's *Jane Eyre*, with its haunted house, mysterious woman and gothic hero; Bram Stoker's *Dracula* late in the period) and sensation fiction (Wilkie Collins's *The Woman in White*, *The Moonstone*) which used mystery, disguise and scandal to explore anxieties about class, gender and identity."
      }
    ],
    setBooks: [
      { title: "Middlemarch", author: "George Eliot", edition: "Penguin Classics" },
      { title: "Jane Eyre", author: "Charlotte Brontë", edition: "Penguin Classics" }
    ],
    keyAuthors: [
      {
        name: "Charles Dickens",
        lifespan: "1812–1870",
        nationality: "England",
        notableWorks: ["Oliver Twist", "Hard Times", "Bleak House"],
        bio: "The most popular novelist of his day, whose vivid caricatures and social scenes exposed the harsh realities of industrial urban life."
      },
      {
        name: "George Eliot",
        lifespan: "1819–1880",
        nationality: "England",
        notableWorks: ["Middlemarch", "The Lifted Veil", "Silas Marner"],
        bio: "Pen name of Mary Ann Evans, whose realist novelscombine psychological depth with social and feminist concerns."
      },
      {
        name: "Alfred, Lord Tennyson",
        lifespan: "1809–1892",
        nationality: "England",
        notableWorks: ["In Memoriam A.H.H.", "Idylls of the King", "Ulysses"],
        bio: "Poet Laureate whose long narrative and elegiac poems grappled with faith, science and the meaning of empire."
      },
      {
        name: "Robert Browning",
        lifespan: "1812–1889",
        nationality: "England",
        notableWorks: ["My Last Duchess", "Kubla Khan", "Men and Women"],
        bio: "Master of the dramatic monologue, revealing character through speech and subtext rather than narration."
      }
    ],
    notes: `## Victorian Literature — Lecture Notes

### Context: the age of confidence and crisis
The Victorian age (1837–1901) was one of empire, industry and evangelical reform — but also of stark inequality, urban squalor and scientific challenges to faith (Darwin's *Origin of Species*, 1859). Literature both celebrated and criticised this world.

### Realism and its limits
**George Eliot** (*Middlemarch*) practices psychological realism: she traces the inner lives of ordinary people and the consequences of idealism in provincial life. Dorothea Brooke's desire to do good leads to frustration because the world is more complex than she imagines. Eliot's free indirect discourse lets us inhabit characters' minds while keeping a moral distance.

### Poetry of faith and doubt
Tennyson's *In Memoriam* moves from doubt to faith through 133 short lyrics, registering grief, scientific uncertainty and the long reach of Christianity. Browning's dramatic monologues (*My Last Duchess*) let speakers reveal their own psychology — and their moral blindness — through speech. Arnold's 'Dover Beach' laments the 'melancholy' retreat of faith: 'the Sea of Faith' has receded, leaving the world 'huddled... / Like fool, fool...'

### The Gothic and social critique
The Victorian Gothic (Charlotte Brontë's *Jane Eyre*, with Bertha Mason in the attic; Stoker's *Dracula*) expresses anxiety about women, foreignness and the repressed. Sensation fiction (Wilkie Collins) used mystery and disguise to explore scandal and identity. Both forms show how the private world of the home can conceal violence and transgression.`
  },
  {
    code: "ENG 302",
    title: "The English Novel (19th Century)",
    year: 3,
    semester: 5,
    credits: 4,
    description:
      "The rise of the English novel from its eighteenth-century origins through Victorian realism to the threshold of literary modernism. Emphasis on narrative technique, social purpose and the development of free indirect discourse.",
    learningOutcomes: [
      "Map the development of the English novel from the 18th to the 19th century.",
      "Analyse narrative techniques including free indirect discourse.",
      "Interpret novels as responses to social and cultural change."
    ],
    topics: [
      {
        title: "From satire to realism",
        notes:
          "The novel began in the 18th century as comic satire (Defoe's *Robinson Crusoe*, Richardson's *Pamela*, Fielding's *Tom Jones*) and grew into Victorian realism (Dickens, the Brontës, Eliot, Thackeray). Realism sought to represent ordinary life and character truthfully, using detailed description, free indirect discourse, and complex plotting. The serial publication of Dickens's novels shaped narrative structure and length."
      },
      {
        title: "Free indirect discourse",
        notes:
          "Perhaps the novel's greatest technical invention, free indirect discourse lets the narrator inhabit a character's thoughts and words while retaining narrative distance. It allows irony — the gap between what a character feels and the narrator's perspective. Jane Austen perfected it; the Brontës and Eliot developed it further toward modernism."
      }
    ],
    setBooks: [
      { title: "Jane Eyre", author: "Charlotte Brontë", edition: "Penguin Classics" },
      { title: "North and South", author: "Elizabeth Gaskell", edition: "Oxford World's Classics" }
    ],
    keyAuthors: [
      {
        name: "Jane Austen",
        lifespan: "1775–1817",
        nationality: "England",
        notableWorks: ["Pride and Prejudice", "Emma", "Mansfield Park"],
        bio: "Novelist of manners whose free indirect discourse and irony dissect class, marriage and sensibility."
      },
      {
        name: "Charlotte Brontë",
        lifespan: "1816–1855",
        nationality: "England",
        notableWorks: ["Jane Eyre", "Villette"],
        bio: "Novelist whose strong female protagonists and gothic elements advanced the psychological novel."
      },
      {
        name: "Thomas Hardy",
        lifespan: "1840–1928",
        nationality: "England",
        notableWorks: ["Tess of the d'Urbervilles", "Jude the Obscure", "Far from the Madding Crowd"],
        bio: "Novelist and poet whose Wessex novels combine naturalistic determination with lyrical power; often tragic."
      }
    ],
    notes: `## The English Novel (19th Century) — Lecture Notes

### Origins
The English novel emerged in the 18th century: Daniel Defoe's *Robinson Crusoe* (1719) and *Moll Flanders* gave a realist account of individual experience; Samuel Richardson's *Pamela* (1740) explored moral sentiment; Henry Fielding's *Tom Jones* (1749) gave the form epic scope and comic energy.

### The 19th-century flowering
The Victorian novel became the period's great cultural form, published in serial parts and read by a mass public. **Charles Dickens** combined elaborate plots with social criticism; **George Eliot** brought psychological depth and moral complexity; **Charlotte Brontë** gave interiority and gothic passion; **Thomas Hardy** fused naturalistic determinism with poetic power.

### Narrative technique
The novel's key inventions are **free indirect discourse** (the narrator thinking in a character's voice) and **stream of consciousness** at the century's end. Serial publication demanded chapter-end hooks, shaping plotting and pacing. Realism's 'invisible' narrator presents a godlike view of events and character motivations.

### Why read them now
These novels defined how we imagine the self, society and language. They model the tensions of modernity: individual vs. society, freedom vs. structure, love vs. duty. Their technical innovations — free indirect discourse, focalisation, the unreliable narrator — are the raw material of every novel that followed.`
  },
  {
    code: "ENG 372",
    title: "English Poetry: Romantic to Modern",
    year: 3,
    semester: 5,
    credits: 4,
    description:
      "A survey of English-language poetry from the late eighteenth century to the modern period, examining changing aesthetics, the self, and the response to modernity.",
    learningOutcomes: [
      "Trace major stylistic and thematic shifts from Romanticism to Modernism.",
      "Analyse the treatment of the self, nature and the contemporary world in poetry.",
      "Interpret the break with tradition in Modernist and post-Modern verse."
    ],
    topics: [
      {
        title: "Late Romanticism and Victorian poetry",
        notes:
          "By the early 19th century Romantic ideals were transforming: Wordsworth's 'spontaneous overflow' gave way to Arnold's classicism and doubt. Victorian poets included the narrative grandeur of Tennyson and the psychological depth of Browning's dramatic monologues. The Pre-Raphaelites (Rossetti, Swinburne, Meredith) prized colour and sensuous immediacy. Gerard Manley Hopkins broke formally with 'inscape' and 'sprung rhythm'."
      },
      {
        title: "Modernism and after",
        notes:
          "Modernist poets (T.S. Eliot, Ezra Pound, W.B. Yeats, W.H. Auden) shattered the lyric 'I', used fragmentation, allusion and collage, and confronted the trauma of the First World War and urban alienation. Eliot's *The Waste Land* is the period's central text. After them came the Confessional poets (Plath, Sexton) and postmodern voices (Ashbery, Larkin)."
      }
    ],
    setBooks: [
      { title: "The Norton Anthology of English Literature: Romantic and Victorian Poetry", author: "ed. various" },
      { title: "The Waste Land and Other Poems", author: "T.S. Eliot" }
    ],
    keyAuthors: [
      {
        name: "T.S. Eliot",
        lifespan: "1888–1965",
        nationality: "USA/UK",
        notableWorks: ["The Waste Land", "The Love Song of J. Alfred Prufrock", "Four Quartets"],
        bio: "Modernist poet and critic whose fragmented, allusive poetry mapped the spiritual emptiness of the modern world."
      },
      {
        name: "W.B. Yeats",
        lifespan: "1865–1939",
        nationality: "Ireland",
        notableWorks: ["Easter, 1916", "The Second Coming", "Aedh Wise"],
        bio: "Irish poet who evolved from Celtic Revival lyricist to modernist master of political and mystical verse."
      }
    ],
    notes: `## English Poetry: Romantic to Modern — Lecture Notes

### The Romantic self
Romantic poetry turned inward and outward at once: inward to feeling, memory and imagination (Wordsworth's 'spontaneous overflow of powerful feelings'; Coleridge's 'esemplastic' power); outward to nature as a living force. The 'Byronic hero' (Byron) and the Gothic (Keats, Shelley) expressed individual rebellion and melancholy.

### Victorian and Pre-Raphaelite turns
Victorian poetry grew more narrative and philosophical. Tennyson wrote at length about loss and faith; Browning perfected the dramatic monologue (the speaker reveals more than intended). The Pre-Raphaelites (Dante Gabriel Rossetti, William Morris, Christina Rossetti) revived medieval colour and intensity, while **Gerard Manley Hopkins** — unpublished in his lifetime — broke lines into 'sprung rhythm' and coined 'inscape' for each thing's unique style.

### Modernism
Modernist poets rejected the expressive lyric 'I' and linear narrative. **T.S. Eliot's *The Waste Land*** (1922) pieces together voices, allusions and fragments — 'I will show you fear in a handful of dust' — to portray a spiritually sterile age. **Ezra Pound** championed 'Make it new' and the precision of imagism. **W.H. Auden** mixed public politics with private psychology. The break from tradition is deliberate and shocking: the old forms no longer fit the new world.

### Reading modern poetry
Do not look for a single 'meaning.' Let the images, voices and rhythms work. Follow the allusions (myth, the Bible, other poems). Ask what historical moment the poem responds to — the First World War, urbanisation, industrial capitalism. Modern poetry trusts the reader to assemble meaning from fragments.`
  },
  {
    code: "ENG 362",
    title: "English Drama (19th & 20th Century)",
    year: 3,
    semester: 5,
    credits: 4,
    description:
      "A survey of English drama from the early 19th century to the contemporary stage, considering the move from melodrama to realism to modern and postmodern performance.",
    learningOutcomes: [
      "Identify key movements and dramatists from 1800 to the present.",
      "Analyse how theatrical conventions shape meaning and audience response.",
      "Compare realism, absurd drama and contemporary political theatre."
    ],
    topics: [
      {
        title: "From melodrama to realism",
        notes:
          "The 19th-century stage was dominated by melodrama (clear moral oppositions, music, spectacle). Realist drama arrived with Ibsen (family secrets as social critique) and continued in George Bernard Shaw, who used wit to argue for social transformation. Oscar Wilde's *The Importance of Being Earnest* is a masterpiece of manners — a comedy that mocks Victorian moral hypocrisy while delighting in wordplay."
      },
      {
        title: "Modern and contemporary drama",
        notes:
          "Modern drama moves from the psychological realism of T.S. Eliot's verse drama to the existential absurd (Samuel Beckett's *Waiting for Godot* influenced British theatre), to post-war political and feminist work. Harold Pinter's 'comedies of menace' use subtext and silence. Caryl Churchill (*Top Girls*, *Cloud Nine*, *Far Away*) experiments with structure and gender. Contemporary theatre engages postcolonial and environmental themes."
      }
    ],
    setBooks: [
      { title: "The Importance of Being Earnest", author: "Oscar Wilde" },
      { title: "Top Girls", author: "Caryl Churchill" },
      { title: "Pinter: Four Plays", author: "Harold Pinter" }
    ],
    keyAuthors: [
      {
        name: "Harold Pinter",
        lifespan: "1930–2008",
        nationality: "UK",
        notableWorks: ["The Birthday Party", "The Caretaker", "Betrayal"],
        bio: "Nobel laureate whose stark, subtext-rich dramas explore power, memory and the difficulty of communication."
      },
      {
        name: "Caryl Churchill",
        lifespan: "1931–",
        nationality: "UK",
        notableWorks: ["Top Girls", "Cloud Nine", "Far Away", "Escaped Alroup"],
        bio: "Playwright whose experimental structures and political feminist themes have made her a central voice in contemporary British theatre."
      }
    ],
    notes: `## English Drama (19th & 20th Century) — Lecture Notes

### Realism and social drama
Realism brought the domestic interior onto the stage. Henrik Ibsen exposed family secrets as social critique (e.g. *Hedda Gabler*). **George Bernard Shaw** used wit and argument (*Man and Superman*, *Pygmalion*) to advance socialism and women's education. **Oscar Wilde's *The Importance of Being Earnest*** is a perfect 'comedy of manners': every line is a epigram, and the plot's triviality (a missing handbag) gently mocks the triviality of social concern.

### Modernism and the absurd
T.S. Eliot's verse dramas (*Murder in the Cathedral*) sought a ritualised, non-naturalistic theatre. The **Theatre of the Absurd** (Beckett, Ionesco, Stoppard) portrayed a universe without clear meaning — characters wait, repeat, speak past each other. **Harold Pinter** called his plays 'comedies of menace': beneath witty banter lies threat and power games. The pauses do as much work as the words.

### Political and feminist theatre
**Caryl Churchill** shattered chronology and gender norms: *Top Girls* stages women's history across centuries in one dinner party; *Cloud Nine* uses cross-casting across time and race to expose colonial and patriarchal power. Contemporary drama continues to engage with migration, climate and postcolonial identity — often through devised and physical theatre.`
  },
  {
    code: "ENG 351",
    title: "Introduction to Applied Linguistics",
    year: 3,
    semester: 5,
    credits: 4,
    description:
      "Foundations of applied linguistics for language education: first and second language acquisition, error analysis, communicative competence, vocabulary and reading/writing development.",
    learningOutcomes: [
      "Explain major theories of first and second language acquisition.",
      "Analyse learner language and identify developmental errors.",
      "Apply principles of communicative language teaching to classroom practice."
    ],
    topics: [
      {
        title: "Second language acquisition theories",
        notes:
          "Krashen's Input Hypothesis (comprehensible input +1, the affective filter) remains influential; Long's Interaction Hypothesis emphasises negotiation of meaning; Swain's Output Hypothesis argues that producing language pushes development. Cognitive approaches treat language learning like any skill: noticing, practice, feedback. For Kenyan classrooms, the mix of English (medium), Kiswahili and mother tongues creates both opportunities and challenges for CLT."
      },
      {
        title: "Communicative competence and teaching",
        notes:
          "Communicative Language Teaching (CLT) teaches language through real communication, integrating skills and focusing on meaning over form. Canale and Zimberg identified four strands of competence: grammatical, sociolinguistic, discourse and strategic. In Kenya, teaching must account for code-switching, varying proficiency and the need to develop both Standard English and local communicative practices."
      }
    ],
    setBooks: [
      { title: "An Introduction to Applied Linguistics", author: "Norbert Schmitt", edition: "4th ed." },
      { title: "Approaches and Methods in Language Teaching", author: "Jack C. Richards & Rodgers, Wilga M.", edition: "2nd ed." }
    ],
    keyAuthors: [],
    notes: `## Introduction to Applied Linguistics — Lecture Notes

### How languages are learned
Children acquire their first language in predictable stages; second language acquisition follows a more variable path influenced by age, motivation, exposure and learning strategies. **Krashen** proposed that comprehension of 'i+1' (input slightly above current level) plus a low 'affective filter' produces acquisition. **Swain's Output Hypothesis** adds that producing language — especially when learners are pushed to explain or correct themselves — accelerates development.

### Error analysis
Learner errors are **interlanguage** — a rule-governed system evolving toward the target. Analyse errors by collecting samples, identifying the gap between learner production and target, and classifying the cause (overgeneralisation, L1 transfer, etc.). Errors are learning, not failure.

### Communicative competence
Knowing a language means more than grammar and vocabulary. **Communicative Language Teaching** builds grammatical, sociolinguistic (when/formality), discourse (coherence/cohesion) and strategic (compensating for breakdowns) competence. Tasks include information-gap activities, role-plays and real communication.

### Teaching reading and writing
Reading develops through decoding, fluency and comprehension strategies (predicting, questioning, summarising). Writing needs modelling, guided practice, and feedback focused on both meaning and accuracy. In Kenyan contexts, use familiar topics and integrate the learner's full linguistic repertoire rather than treating languages in isolation.`
  },
  {
    code: "ENG 313",
    title: "Black Diaspora Literature",
    year: 3,
    semester: 6,
    credits: 4,
    description:
      "Literature of the African diaspora: African American, Caribbean and British Black writing from the eighteenth century to the present, focussing on identity, history, resistance and language.",
    learningOutcomes: [
      "Analyse representations of slavery, freedom and identity across diasporic literatures.",
      "Compare literary responses to the Middle Passage and its legacies.",
      "Interpret the role of language, form and orality in diasporic writing."
    ],
    topics: [
      {
        title: "The Middle Passage and its literatures",
        notes:
          "The forced migration of 12 million Africans created a diaspora whose literature gives voice to loss, survival and cultural memory. Toni Morrison's *Beloved* (rememory and haunting), Alex Haley's *Roots* (genealogical recovery), and slave narratives (Frederick Douglass, Harriet Jacobs) write against the silence of history. W.E.B. Du Bois's concept of 'double consciousness' — seeing oneself from the outside — is central to understanding diasporic identity."
      },
      {
        title: "Nation language and cultural renaissance",
        notes:
          "Caribbean writers reclaimed African-rooted culture and language: Derek Walcott (Nobel 1992) wrote in standard English but celebrated the Caribbean landscape; Kamau Brathwaite coined 'nation language' for the Creole that carries Caribbean English poetry. The Harlem Renaissance (Langston Hughes, Zora Neale Hurston, Claude McKay) asserted a distinct African-American voice in the 1920s."
      }
    ],
    setBooks: [
      { title: "Beloved", author: "Toni Morrison", edition: "Vintage" },
      { title: "Their Eyes Were Watching God", author: "Zora Neale Hurston", edition: "Penguin Classics" },
      { title: "The Norton Anthology of African-American Literature", author: "ed. various" }
    ],
    keyAuthors: [
      {
        name: "Toni Morrison",
        lifespan: "1931–2019",
        nationality: "USA (African-American)",
        notableWorks: ["Beloved", "Song of Solomon", "Sula"],
        bio: "Nobel laureate whose lyrical, historically grounded novels recovered Black American lives and voices, especially women's."
      },
      {
        name: "Langston Hughes",
        lifespan: "1902–1967",
        nationality: "USA (African-American)",
        notableWorks: ["The Weary Blues", "Montage of Misplaced Qualities", "Not Without Laughter"],
        bio: "Poet of the Harlem Renaissance who gave voice to Black urban life in jazz-influenced verse and fiction."
      },
      {
        name: "Derek Walcott",
        lifespan: "1933–2017",
        nationality: "Saint Lucia",
        notableWorks: ["Omeros", "In a Green Shade", "The Antilles Trilogy"],
        bio: "Nobel laureate whose epic poem *Omeros* fused Caribbean landscape with Homeric form to reclaim postcolonial history."
      }
    ],
    notes: `## Black Diaspora Literature — Lecture Notes

### Framing concepts
The African diaspora was created by the transatlantic slave trade (c. 1525–1866). Its literature is, centrally, literature of **displacement** and **re-memory** (Morrison): telling and retelling stories torn from their archives. **W.E.B. Du Bois's 'double consciousness'** — 'this sense of always looking at one's self through the eyes of others' — captures the diasporic condition: never fully at home in the white world, never uncomplicatedly 'African' in a new world.

### Slave narratives and abolition
Frederick Douglass's *Narrative of the Life of a Frederick Douglass* (1845) turned personal testimony into political argument. Harriet Jacobs's *Incidents in the Life of a Slave Girl* (1861) exposed the particular oppression of enslaved women. These texts combine the demand to be believed with the strategic use of Christian and Enlightenment rhetoric.

### The Harlem Renaissance and beyond
The 1920s Harlem Renaissance (Langston Hughes, Zora Neale Hurston, Claude McKay) asserted a modern, urban, Black voice: jazz rhythms, vernacular speech, pride in African heritage. Hughes's poetry fused jazz and blues into a distinctly American idiom.

### Caribbean recovery and 'nation language'
Derek Walcott rewrote European epics (Homer, Crusoe) in Caribbean settings. **Kamau Brathwaite** coined 'nation language' for the Creole English that carries Caribbean poetic voice — a deliberate move away from the colonial standard. This is literature reclaiming its own tongue.`
  },
  {
    code: "ENG 309",
    title: "African Literature in English",
    year: 3,
    semester: 6,
    credits: 4,
    description:
      "A study of major African writers in English, examining the negotiation of oral and written traditions, decolonisation, gender and postcolonial identity.",
    learningOutcomes: [
      "Compare how African writers in English engage with colonial and postcolonial experience.",
      "Analyse the use of orality, mythology and history in African fiction.",
      "Interpret representations of gender, tradition and modernity."
    ],
    topics: [
      {
        title: "Origins and the decolonisation of the word",
        notes:
          "Chinua Achebe's *Things Fall Apart* (1958) is widely seen as launching the African novel in English: it tells the colonised story back from the inside, ending with the white narrator's arrival. Achebe's famous essay 'The Danger of a Single Story' warns against Western stereotypes. Ngũgĩ wa Thiong'o went further, abandoning English for Gĩkũyũ (his novels *Caita Kĩrĩa* and *Matĩga Mũyũ* of the Fig tree) to write back against linguistic colonialism."
      },
      {
        title: "Women's voices and postcolonial critique",
        notes:
          "African women writers (Buchi Emecheta, Flora Nwapa, Tsitsi Dangarembga, Chimamanda Adichie) have centred female experience often marginalised in early male-authored nationalist narratives. They explore family, education, polygamy, migration and the limits of liberation. Contemporary writers like Adichie (*Half of a Yellow Sun*, *Americanah*) engage global circulation and the diaspora while remaining rooted in specific African societies."
      }
    ],
    setBooks: [
      { title: "Things Fall Apart", author: "Chinua Achebe", edition: "Penguin Classics" },
      { title: "Weep Not, Child", author: "Ngũgĩ wa Thiong'o", edition: "Heinemann" },
      { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie", edition: "Knopf" }
    ],
    keyAuthors: [
      {
        name: "Chinua Achebe",
        lifespan: "1930–2013",
        nationality: "Nigeria",
        notableWorks: ["Things Fall Apart", "No Longer at Ease", "A Man of the People"],
        bio: "Novelist, poet and critic who founded modern African literature in English and insisted on the African novel telling its own story."
      },
      {
        name: "Ngũgĩ wa Thiong'o",
        lifespan: "1938–",
        nationality: "Kenya",
        notableWorks: ["Weep Not, Child", "A Grain of Wheat", "Decolonising the Mind"],
        bio: "Kenyan novelist, playwright and scholar whose engagement with language and decolonisation makes him a central intellectual of post-independence Africa."
      },
      {
        name: "Chimamanda Ngozi Adichie",
        lifespan: "1977–",
        nationality: "Nigeria",
        notableWorks: ["Half of a Yellow Sun", "Purple Hibiscus", "Americanah"],
        bio: "Contemporary novelist and public intellectual whose work spans the Nigerian Civil War, family life and the diasporic experience, widely read in schools."
      },
      {
        name: "Tsitsi Dangarembga",
        lifespan: "1956–",
        nationality: "Zimbabwe",
        notableWorks: ["Nervous Conditions", "The Book of Not"],
        bio: "Zimbabwean novelist whose *Nervous Conditions* is a foundational feminist text in African literature, exploring education and patriarchy under colonialism."
      }
    ],
    notes: `## African Literature in English — Lecture Notes

### Starting with Achebe
Chinua Achebe's *Things Fall Apart* (1958) is the gateway text of modern African literature. It tells the story of Okonkwo, a proud Igbo warrior, from prosperity through British colonial disruption to tragic ruin. Crucially, it ends with the District Commissioner's dismissive history — a reminder that colonial narratives still frame Africans. Achebe's project is to recover the 'African gaze.'

### Language and decolonisation
Ngũgĩ wa Thiong'o's *Decolonising the Mind* (1986) argues that colonial languages imprison the imagination. *Weep Not, Child* (his first English novel, 1964) follows a family torn apart by the Mau Mau uprising — land loss, betrayal, violence — showing how colonial policies destroy communities from within. Ngũgĩ later wrote entirely in Gĩkũyũ, insisting that African languages carry knowledge English cannot translate.

### Women's writing
Women writers expanded the frame beyond nationalist male narratives. Buchi Emecheta's novels examine women's education and family life in Lagos; Flora Nwapa's *Efuru* (1967) centres Igbo women's spirituality and autonomy; Tsitsi Dangarembga's *Nervous Conditions* (1988) makes education a site of both liberation and oppression for Shona girls. Chimamanda Adichie's *Half of a Yellow Sun* (2006) brings the Nigerian Biafran War into intimate, domestic focus alongside political scope.

### Orality and the written word
African literature in English constantly negotiates oral and written traditions: proverbs, praise poetry, folktales, and the rhythm of spoken language appear in written form. Writers like Wole Soyinka blend Igbo oral drama with Western tragedy.`
  },
  {
    code: "ENG 363",
    title: "The English Short Story",
    year: 3,
    semester: 6,
    credits: 3,
    description:
      "A study of the English and Commonwealth short story from the Victorian period to the present, focusing on economy of style and the short-story 'moment'.",
    learningOutcomes: [
      "Analyse the techniques of compression, focalisation and ending in short fiction.",
      "Compare short stories across British, Commonwealth and African traditions.",
      "Write a short story demonstrating awareness of form."
    ],
    topics: [
      {
        title: "The art of the short story",
        notes:
          "The short story depends on a single 'moment' or revelation, a tightly controlled focus and a telling ending. Unlike the novel, it cannot sustain subplots or large casts. Techniques include a surprise revelation (O. Henry), interior monologue (Virginia Woolf), and the 'story of a single sitting' (Chekhov). The ending should arise inevitably from the material — 'the epigraph to a larger unwritten story'."
      }
    ],
    setBooks: [
      { title: "Told by an African", author: "ed. Gerald Moore & Brenda F. Glass", note: "Anthology of African short stories." },
      { title: "The Oxford Book of English Short Stories", author: "ed. various" }
    ],
    keyAuthors: [],
    notes: ""
  },
  {
    code: "EDU 301",
    title: "Teaching English and Literature in Secondary Schools II",
    year: 3,
    semester: 6,
    credits: 4,
    description:
      "Advanced methods for teaching English language and literature in Kenyan secondary schools, including reading programmes, writing across the curriculum, and teaching set books.",
    learningOutcomes: [
      "Design and deliver lessons for reading comprehension and vocabulary development.",
      "Teach set literary texts using learner-centred methods.",
      "Assess reading and literary understanding effectively."
    ],
    topics: [
      {
        title: "Reading instruction",
        notes:
          "Effective reading instruction balances decoding, fluency and comprehension. Before reading: activate prior knowledge and predict. During: question, summarise, clarify vocabulary. After: discuss themes and connect to experience. For literature, shared reading of a poem builds confidence; 'seen' and ' unseen' passages both need explicit strategy instruction. In Kenya, many learners read in English as an additional language, so pre-teaching vocabulary and using the mother tongue to check understanding is essential."
      },
      {
        title: "Writing across the curriculum",
        notes:
          "Students need to write in many forms: narrative, descriptive, expository, argumentative, and analytical literary essays. The process approach (pre-writing, drafting, peer feedback, revising) works across subjects. Teach 'paragraphing' explicitly: topic sentence, evidence, analysis. Model academic style and give specific, actionable feedback."
      }
    ],
    setBooks: [],
    keyAuthors: [],
    notes: ""
  }
];
