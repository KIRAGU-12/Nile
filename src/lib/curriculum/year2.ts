import type { Course } from "./types";

export const YEAR_2: Course[] = [
  {
    code: "ENG 215",
    title: "Medieval Literature I: Old English and Early Medieval Verse",
    year: 2,
    semester: 3,
    credits: 4,
    description:
      "An introduction to Old English and early medieval literature in translation and in the original where appropriate, focusing on heroes, Christian conversion and the poetic vocabulary of the period.",
    learningOutcomes: [
      "Identify the main features of Old English verse and Christian epic.",
      "Explain the role of the heroic code and Christian values in *Beowulf*.",
      "Analyse the use of kennings, alliteration and the concept of wyrd."
    ],
    topics: [
      {
        title: "Old English metre and poetic diction",
        notes:
          "Old English verse is accentual (stress-based) rather than syllabic: four stressed syllables per line separated by a caesura. Oral-formulaic composition relies on alliteration (the repeated initial sound linking half-lines) and kennings (compound metaphors such as 'whale-road' for sea or 'battle-sweat' for blood). Words like wyrd (fate) and comitatus (the lord-retainer bond) express a distinctive ethic."
      },
      {
        title: "Beowulf and the heroic code",
        notes:
          "*Beowulf* pits the Germanic heroic code (loyalty, courage, revenge, fame) against Christian values (humility, mercy). Beowulf is a *eardstapa* (hero) who serves Hrothgar, then a Geatish king, and dies fighting a dragon. Its world is one where glory is won in battle and fate (wyrd) governs all; the poem's Christian scribe frames the pagan hero within salvation history, creating the famous tension between the mead-hall (Heorot) and the promise of heaven."
      }
    ],
    setBooks: [
      { title: "Beowulf", author: "trans. Seamus Heaney (2000)", note: "Penguin Classics edition, with introduction." },
      { title: "The Anglo-Saxon Chronicle", author: "trans. Michael Swanton (1998)", note: "Prose annals recording events year by year." },
      { title: "The Cambridge Companion to Old English Literature", author: "ed. Michael Lapidge & Andy Rabinwald", note: "Critical introduction to the period." }
    ],
    keyAuthors: [
      {
        name: "The Beowulf Poet",
        lifespan: "fl. c. 975–1025",
        nationality: "Anglo-Saxon (UK)",
        notableWorks: ["Beowulf", "The Fight at Finnsburg (remnant)"],
        bio: "Anonymous author of the great Old English epic, composed in the late first millennium and preserved in the Nowell Codex (c. 1000); it is the single most important surviving work of Old English literature."
      },
      {
        name: "Cynewulf",
        lifespan: "fl. 9th–10th c.",
        nationality: "Anglo-Saxon",
        notableWorks: ["The Dream of Christ", "Elene"],
        bio: "Minor poet signing his name in runic acrostics, representative of the Christian conversion poetry that bridges the heroic and Christian worlds."
      }
    ],
    notes: `## Medieval Literature I — Lecture Notes

### The world of Old English verse
Old English (Anglo-Saxon) was spoken in England from roughly 450 to 1150. Its literature was composed orally and later written down by clerics. *Beowulf* (c. 1000) is the great epic and the oldest surviving English poem of major length. Its world is a Christian poem about a pre-Christian heroism in which two value systems meet: the Germanic heroic code and Christian morality.

### Features of the verse
Old English metre is **accentual**: lines have four stressed syllables divided by a medial pause (caesura). Alliteration links the two half-lines (the same consonant sound opens each stressed syllable). A **kenning** is a compact metaphor, e.g. *sædǽl* 'sea' is often called 'whale-road'. Other stock devices: **litotes** (understatement, 'not the least good') and **betrayal imagery** drawn from kinship feuds.

### The heroic ethic
Central concepts: *wyrd* (fate, the web that cannot be escaped), *comitatus* (the bond between lord and thane, where loyalty is rewarded with treasure and protection), *geard* (the hall-as-world, the mead-hall Heorot as a fragile centre of civilisation). Heroes seek *mærþ* (renown) that outlasts death. Beowulf embodies this: he sails to Denmark to kill Grendel for fame, returns home a king, and dies defending his people from a dragon.

### Christianity and conversion
The poet is Christian and frames the story accordingly: Grendel is the 'descendant of Cain', the dragon episode evokes the Fall, and the funeral pyneises echo Christian burial. But the heroic world remains pagan in its values — honour, vengeance, fate. The tension between these world-views is the poem's enduring power.

### After 1066
The Norman Conquest nearly ended English literary tradition; for three centuries French dominated. Yet English survived: the *Pearl* poet wrote *Pearl*, *Patience*, *Cleanness* and *Sir Gawain and the Green Knight* in nigh-on perfect alliterative stanza, turning English into a vehicle for complex philosophical and chivalric themes.`
      },
      {
        code: "ENG 216",
        title: "Medieval Literature II: Chaucer and the Canterbury Tales",
        year: 2,
        semester: 3,
        credits: 4,
        description:
      "Study of Geoffrey Chaucer's narrative art, the range of medieval society he portrays, and the development of English as a literary language in the late fourteenth and early fifteenth centuries.",
    learningOutcomes: [
      "Situate *The Canterbury Tales* within late-medieval English culture and literature.",
      "Analyse Chaucer's use of frame narrative, character-portraiture and genre variety.",
      "Explain the significance of iambic pentameter, rhymed couplets and linguistic variation in Middle English."
    ],
        topics: [
      {
        title: "Chaucer's London and the pilgrimage",
        notes:
          "The General Prologue gathers thirty pilgrims of varied classes and occupations — the Knight, Miller, Wife of Bath, Prioress, Pardoner, Merchant — for a story-telling contest on the road to Canterbury. This frame lets Chaucer display a cross-section of late-medieval English society and to satirise each estate while also giving voice to marginal figures."
      },
      {
        title: "Genre and characterisation",
        notes:
          "The Tales range from the romantic Knight's Tale (chivalric romance), through fabliaux (bawdy comic stories like the Miller's and Reeve's), the moralising Pardoner's Tale, to the Wife of Bath's Prologue (a defence of female experience and marriage). Each tells a story that both performs and critiques its genre. Chaucer's character-portraits often undercut their tellers: the Knight is idealised, the Miller coarse and self-serving, the Wife of Bath worldly and outspoken."
      }
    ],
        setBooks: [
      { title: "The Canterbury Tales", author: "Geoffrey Chaucer", edition: "Penguin Classics, trans. Nevill Coghill", note: "Full modern-spelling edition used in class." },
      { title: "The Riverside Chaucer", author: "ed. Larry D. Benson", note: "Authoritative text with facing Middle English." }
    ],
    keyAuthors: [
      {
        name: "Geoffrey Chaucer",
        lifespan: "c. 1340s–1400",
        nationality: "England",
        notableWorks: ["The Canterbury Tales", "Troilus and Criseyde", "The House of Fame"],
        bio: "Often called the 'father of English literature,' Chaucer was a courtier and diplomat whose polished vernacular narrative established English as a literary language and whose psychological portraits remain vivid."
      }
    ],
        notes: `## Medieval Literature II — Lecture Notes

### Geoffrey Chaucer and the birth of English literature
Chaucer (c. 1340s–1400) was the first major writer to compose extensively in English at a time when English was still recovering from the trauma of the Norman Conquest. *The Canterbury Tales* (left unfinished) is a frame narrative: the narrator meets thirty pilgrims at the Tabard Inn in London and joins them on the road to Canterbury Cathedral, where each agrees to tell two tales on the way and two on the return.

### The General Prologue
Each pilgrim is introduced by a short portrait balancing ideal and reality. The Knight is presented in ideal terms (he fought in the Holy Land, modest, honourable), while others expose the gap between appearance and conduct: the Prioress is fussy and affected; the Friar is Worldly and greedy; the Pardoner preaches against greed while selling fake relics. This pattern of **contrast** (and often **irony**) is Chaucer's central comic and critical technique.

### Language and form
Chaucer wrote in Middle English using rhymed couplets in iambic pentameter (ten syllables, unstressed-STRESSED), the meter that would dominate English poetry for centuries. His language mixes the London dialect with colloquial and elevated registers. Reading him in the original shows the flexibility that English gained from contact with French and Latin.

### Genres within the Tales
- **The Knight's Tale** — chivalric romance; courtly, elevated; a debate between Apollo and Mars over the love of Emily.
- **The Miller's Tale** — fabliau; a bawdy story exposing the gullibility of the clerk John.
- **The Wife of Bath's Prologue** — confessional; a powerful assertion of female experience and authority over marriage and sexuality.
- **The Pardoner's Tale** — morality tale; one of the darkest and most effective anti-corruption sermons in literature ('Radix malorum est cupiditas').`
      },
      {
        code: "ENG 251",
        title: "Language and Society",
        year: 2,
        semester: 3,
        credits: 4,
        description:
      "Introduction to sociolinguistics: how language varies according to social factors (class, region, gender, age), the multilingual reality of Kenya, code-switching, diglossia and language planning.",
    learningOutcomes: [
      "Analyse patterns of linguistic variation and their social meanings.",
      "Account for multilingualism and code-switching in the Kenyan context.",
      "Evaluate language-planning issues facing English and Kiswahili in education."
    ],
        topics: [
      {
        title: "Linguistic variation",
        notes:
          "No two speakers talk alike: variation correlates with social class (Basil Bernstein's Elaborated and Restricted codes), region (dialects), gender (different linguistic styles and tags), and age (linguistic change over the life-course). Sociolinguistics studies these patterns and their meanings, using tools such as variationist analysis pioneered by William Labov."
      },
      {
        title: "Kenya's multilingual ecology",
        notes:
          "Kenya is home to around 70 languages (Nilo-Saharan, Niger-Congo, Cushitic, Nilotic groups). English and Kiswahili are the official languages; over 60 other languages are used daily. The pattern is **multilingual fluidity**: speakers routinely switch (code-switching) and mix codes, for instance in Sheng (urban youth slang mixing English, Kiswahili and ethnic languages). **Diglossia** assigns English high (formal/official) and mother-tongues low (domestic/intimate) functions, though the boundary is constantly negotiated."
      }
    ],
        setBooks: [
      { title: "Language in Society: A Reader", author: "ed. Ruth Wodak & Michael Myerscough", note: "Essential readings in sociolinguistics." },
      { title: "The Sociolinguistics of Developing Post-Colonial States", author: "ed. Kofi Agyekan & Ayo Bamgbose" }
    ],
    keyAuthors: [],
        notes: `## Language and Society — Lecture Notes

### Why language varies
Speech is not random. Sociolinguists find systematic patterns linking language to society. **Social class**: speakers of higher socioeconomic status typically use a prestige variety (often the standard) and wider vocabularies; working-class speech may show distinctive phonology and grammar. **Region**: dialects mark local identity (compare Nairobi English with Mombasa or Kisumu varieties). **Gender**: women and men may use different vocabulary, address forms, and politeness strategies. **Age**: language changes over individuals' life-courses and across generations.

### Multilingualism in Kenya
Kenya has roughly 70 languages. English and Kiswahili are official; the rest are used in homes and communities. Most Kenyans are multilingual — often speaking an ethnic language, Kiswahili, and English. **Code-switching** (alternating between languages within a conversation or sentence) is the norm, not the exception, e.g. mixing English and Kiswahili: 'Nimepita kwenye meeting'. **Sheng** is an urban lingua mixing English, Kiswahili and ethnic-language forms.

### Diglossia and language planning
In diglossia, two varieties coexist with distinct functions: **H** (High, e.g. English in formal schooling, media, administration) and **L** (Low, e.g. mother-tongue at home). Language planning deals with choices: which language is used in schools, how orthographies are standardised, and the effects of language-in-education policies. Kenya's 2010 Constitution recognises languages; debates continue over the role of English versus mother-tongues and Kiswahili in schooling.`
      },
      {
        code: "EDU 201",
        title: "Teaching English and Literature in Secondary Schools I",
        year: 2,
        semester: 3,
        credits: 4,
        description:
      "Principles and methods of teaching English language, grammar and literature in the Kenyan secondary school, including lesson planning, resource use, group work and assessment of the KCSE literature and English components.",
    learningOutcomes: [
      "Apply approaches such as the communicative approach and literature-based reading to English and Literature lessons.",
      "Design lesson plans that integrate language and literature study.",
      "Use formative and summative assessment strategies appropriate to English and Literature."
    ],
        topics: [
      {
        title: "Approaches to English and Literature teaching",
        notes:
          "The **communicative language teaching (CLT)** approach prioritises real communication: pair work, role-play, information gaps. For literature, **reader-response** and **shared reading** build confidence; the **language arts** approach treats reading, writing and speaking as integrated. **Differentiation** helps mixed-ability classes: tiered tasks, choice boards and scaffolding. For Kenyan classrooms, integrating Kiswahili and local languages supports comprehension."
      },
      {
        title: "Assessment and KCSE patterns",
        notes:
          "English (KCSE) components: comprehension, grammar and usage, essay writing, letter/article, and functional writing. Literature: study of set books (a novel, a drama, a collection of poetry/ short stories) with passage-based and essay questions. Formative assessment — quizzes, peer review, oral presentations — should feed into summative marks. Mark schemes must reward both content and the clear organisation of ideas."
      }
    ],
        setBooks: [
      { title: "English for Kenya: Secondary School English Syllabus", author: "Ministry of Education (KNEB/KICD)", note: "Current curriculum and KCSE guidance." },
      { title: "Teaching Literature in the Secondary School", author: "Axel Boozer & Maureen Devlin" }
    ],
    keyAuthors: [],
        notes: ""
      },
      {
        code: "ENG 231",
        title: "Renaissance Literature",
        year: 2,
        semester: 4,
        credits: 4,
        description:
      "Reading of major poetry and drama of the English Renaissance, including Shakespeare, with attention to humanism, the sonnet sequence, and the period's re-valuation of classicism.",
    learningOutcomes: [
      "Situate Renaissance writing within humanist culture and Reformation debate.",
      "Analyse Shakespearean tragedy and comedy in their dramatic and historical contexts.",
      "Interpret the English sonnet sequence and Petrarchan influence."
    ],
        topics: [
      {
        title: "Humanism and the drama of revenge",
        notes:
          "Renaissance humanism restored the study of classical texts and placed man at the centre of creation — a confidence later tested by scepticism and the Reformation. Drama moved from mystery/morality plays to secular city comedies and tragic histories. Revenge tragedy (Kyd's *The Spanish Tragedy*) dramatised justice, conscience and the corruption of power; Shakespeare's problem plays develop these themes with psychological complexity."
      },
      {
        title: "Shakespeare's major genres",
        notes:
          "Shakespeare's tragedies (*Hamlet*, *Macbeth*, *King Lear*, *Othello*) explore guilt, ambition, madness, appearance vs. reality and the structure of power. His comedies (*A Midsummer Night's Dream*, *Twelfth Night*, *Much Ado About Nothing*) use mistaken identity, word-play and festive reconciliation. The histories (*Henry IV*, *Richard III*) examine legitimacy and political legitimacy. The sonnets (154 poems) investigate beauty, mortality, time and same-sex desire."
      }
    ],
        setBooks: [
      { title: "Hamlet", author: "William Shakespeare", edition: "Arden Shakespeare" },
      { title: "Macbeth", author: "William Shakespeare", edition: "Arden Shakespeare" },
      { title: "The Sonnets", author: "William Shakespeare", edition: "Penguin Classics" }
    ],
    keyAuthors: [
      {
        name: "William Shakespeare",
        lifespan: "1564–1616",
        nationality: "England",
        notableWorks: ["Hamlet", "Macbeth", "King Lear", "Othello", "A Midsummer Night's Dream", "Twelfth Night", "Sonnets"],
        bio: "The pre-eminent dramatist of Renaissance England, whose exploration of human psychology and invention of character have made him a universal reference point for literature."
      },
      {
        name: "Christopher Marlowe",
        lifespan: "1564–1593",
        nationality: "England",
        notableWorks: ["Tamburlaine", "Doctor Faustus", "The Jew of Malta"],
        bio: "Pioneer of the English blank-verse drama of tyranny and overreaching, whose * Doctor Faustus* dramatised Renaissance human ambition and damnation."
      },
      {
        name: "John Donne",
        lifespan: "1572–1631",
        nationality: "England",
        notableWorks: ["Holy Sonnets", "Devotions upon Emergent Occasions", "The Good-Morrow"],
        bio: "Metaphysical poet whose witty, argumentative poems fuse love, religion and philosophy in surprising conceits."
      }
    ],
        notes: `## Renaissance Literature — Lecture Notes

### The spirit of the age
The English Renaissance (c. 1500–1660) was a cultural 're-birth' of classical learning. **Humanism** placed humans, reason and classical texts at the centre of inquiry; the printing press (1476 in England) spread ideas rapidly. The period also saw the Protestant Reformation, religious conflict, and expanding overseas trade and colonisation — all of which press into the literature.

### Key themes
- **Classical influence** and emulation of Greek and Roman models.
- **Theatre and the public**: Elizabethan playhouses (the Globe) created a new, mixed public for literature.
- **Revenge and justice**: private vengeance, corrupt courts, conscience (Kyd, Marlowe, Shakespeare).
- **The sonnet**: Petrarch's model adapted by Shakespeare, Sidney and others to explore love, beauty, mortality and poetic authority.
- **Scepticism and disorder**: from the confidence of early humanism to the existential questioning of *Hamlet*.

### Shakespeare: form and meaning in three tragedies
**Macbeth** (1606) compresses guilt and horror: the witches' prophecy, Lady Macbeth's ambition, Duncan's murder, Banquo's ghost, the descent into tyranny, and final defeat. The play's power lies in psychological realism and imagery of blood, darkness and sleepwalking.
**Hamlet** (c. 1600) is the exemplary 'revenge tragedy' that becomes meditation on thought, action, mortality and appearance. 'To be, or not to be' frames the debate between life and death; the play-within-a-play ('The Mousetrap') stages the problem of representation itself.
**King Lear** confronts ageing, authority, family and justice in a world where natural order breaks down — the storm on the heath mirrors the king's inner and outer chaos.`
      },
      {
        code: "ENG 241",
        title: "Restoration and Eighteenth-Century Literature",
        year: 2,
        semester: 4,
        credits: 4,
        description:
      "The rise of neoclassicism, the heroic couplet, and the drama of manners, with Dryden and Pope and the satire ofSwift and Johnson.",
    learningOutcomes: [
      "Identify the neoclassical ideals of order, decorum and imitation of nature.",
      "Analyse the heroic couplet and Augustan poetic technique in Pope and Dryden.",
      "Interpret the social satire of Restoration comedy and Swift's mock-heroic."
    ],
        topics: [
      {
        title: "Neoclassicism and the heroic couplet",
        notes:
          "After the Puritan closure of theatres (1642) and the Interregnum, Charles II restored drama (1660). Neoclassicism imposed rules: the unities of time, place and action, the three unities drawn from Aristotle, and decorum (each genre observes its level). Dryden and Pope perfected the **heroic couplet** — closed rhyming pairs of iambic pentameter — as the vehicle for epigram, satire and didacticism."
      },
      {
        title: "Satire and the drama of manners",
        notes:
          "Restoration comedy (Wycherley, Congreve) exposes sexual manners and social hypocrisy through witty, often amoral dialogue. Satire as a mode — from Juvenal to Swift — attacks vice by ridicule; Swift's *A Modest Proposal* is the supreme mock-heroic, presenting a monstrous 'rational' solution to Irish poverty to expose English cruelty."
      }
    ],
        setBooks: [
      { title: "The Rape of the Lock", author: "Alexander Pope", edition: "Oxford World's Classics" },
      { title: "Gulliver's Travels", author: "Jonathan Swift", edition: "Oxford World's Classics" },
      { title: "The Way of the World", author: "William Congreve", edition: "Arden" }
    ],
    keyAuthors: [
      {
        name: "Alexander Pope",
        lifespan: "1688–1744",
        nationality: "England",
        notableWorks: ["The Rape of the Lock", "An Essay on Man", "Moral Essays"],
        bio: "The dominant Augustan poet, famous for his polished heroic couplets and satirical precision."
      },
      {
        name: "Jonathan Swift",
        lifespan: "1667–1745",
        nationality: "Anglo-Irish",
        notableWorks: ["Gulliver's Travels", "A Modest Proposal", "Journal to Stella"],
        bio: "Satirist and clergyman whose savage wit targeted English policy in Ireland and human folly."
      },
      {
        name: "John Dryden",
        lifespan: "1631–1700",
        nationality: "England",
        notableWorks: ["Absalom and Achitophel", "Mac Flecknoe", "All for Love"],
        bio: "Poet Laureate and dominant literary figure of the Restoration, bridging classicism and the emerging Augustan age."
      }
    ],
        notes: `## Restoration and 18th-Century Literature — Lecture Notes

### From Puritan ban to Restoration wit
The Puritan Commonwealth (1649–1660) closed the theatres and suppressed drama. The Restoration of the monarchy in 1660 reopened playhouses, and a new, secular, urban culture of wit and pleasure emerged. Literature turned to the city, to reason, to order.

### Neoclassicism
The period's ideal was **neoclassicism**: imitation of nature through the mediation of classical rules, politeness, rational argument, and the principle that literature should instruct and delight. Pope's *An Essay on Man* (1709–34) sets out this world-view in the famous line 'Whatever IS, is right' — a theodicy of order.

### The heroic couplet
Pope and Dryden made the closed rhyming couplet the characteristic vehicle of the age. Its balance and antithesis mirror the period's taste for reason and wit. Pope's 'Epistle to Burlington':
> 'True ease in writing comes from art, not chance,  / As those move lightest who have learned to dance.'

### Satire: from Juvenal to Swift
Satire attacks folly and vice. Swift's *A Modest Proposal* (1729) is **mock-heroic**: it treats the horrific suggestion that Irish children be eaten as if a serious economic proposal, using rational, measured language to expose English brutality. This juxtaposition of lofty style and base content is the engine of the satire.

### Restoration comedy of manners
Wycherilla's *The Country Wife* and Congreve's *The Way of the World* deploy wit — quick, polished, often sexual repartee. These plays expose the gap between social codes and desires, and between manners and morals.`
      },
      {
        code: "ENG 242",
        title: "Romantic Literature",
        year: 2,
        semester: 4,
        credits: 4,
        description:
      "The Romantic revolution in poetry and prose: imagination, nature, the sublime, individualism, the supernatural, and the gothic, from the 'Lyrical Ballads' to Shelley and Keats and Scott.",
    learningOutcomes: [
      "Trace the main themes and concerns of British Romanticism.",
      "Analyse the use of nature, imagination and the supernatural in major poems.",
      "Situate Romantic writing against the French Revolution and industrialisation."
    ],
        topics: [
      {
        title: "Imagination, nature and the sublime",
        notes:
          "Romanticism (c. 1798–1832) reacted against Enlightenment rationalism and industrial society. Writers exalted the imagination, nature, emotion, the individual and the supernatural. Wordsworth's 'spontaneous overflow of powerful feelings' and Coleridge's 'esemplastic' imagination reorganise experience. The sublime — awe mixed with terror in the face of vast natural power (mountains, storms, oceans) — is key to the period."
      },
      {
        title: "The Lake Poets and the gothic",
        notes:
          "Wordsworth and Coleridge's *Lyrical Ballads* (1798) launched English Romanticism with a Preface defending the language of ordinary men and the poetry of sensation. Byron, Shelley and Keats produced ambitious lyrics and odes exploring beauty, mortality and political idealism. Gothic fiction (Ann Radcliffe, Mary Shelley's *Frankenstein*) explored psychological terror and the consequences of transgressing natural limits."
      }
    ],
        setBooks: [
      { title: "Lyrical Ballads", author: "William Wordsworth & Samuel Taylor Coleridge", edition: "Oxford World's Classics" },
      { title: "Songs of Innocence and Experience", author: "William Blake", edition: "Oxford World's Classics" },
      { title: "The Norton Anthology of English Literature: Romantic Period", author: "ed. various" }
    ],
    keyAuthors: [
      {
        name: "William Wordsworth",
        lifespan: "1770–1850",
        nationality: "England",
        notableWorks: ["Lyrical Ballads", "The Prelude", "I Wandered Lonely as a Cloud", "Tintern Abbey"],
        bio: "Central Romantic poet who, with Coleridge, initiated the period; emphasised nature, memory and the ordinary language of men."
      },
      {
        name: "John Keats",
        lifespan: "1795–1821",
        nationality: "England",
        notableWorks: ["Ode on a Grecian Urn", "Ode to a Nightingale", "To Autumn", "Endymion"],
        bio: "Youngest of the major Romantics; famed for his odes and the concept of 'negative capability' — dwelling on uncertainties without irritable reaching after fact and reason."
      },
      {
        name: "Percy Bysshe Shelley",
        lifespan: "1792–1822",
        nationality: "England",
        notableWorks: ["The Cloud", "Ozymandias", "Prometheus Unbound", "A Defence of Poetry"],
        bio: "Radical poet of nature, political idealism and the transformative power of poetry; his 'Defence of Poetry' asserts the poet as the 'unacknowledged legislator' of the world."
      },
      {
        name: "Lord Byron",
        lifespan: "1788–1824",
        nationality: "England (Anglo-Scottish)",
        notableWorks: ["Don Juan", "Childe Harold's Pilgrimage"],
        bio: "The archetypal Romantic hero whose narrative poems and satires combined personal charisma with social critique."
      }
    ],
        notes: `## Romantic Literature — Lecture Notes

### Origins and ideals
Romanticism began with Lyrical Ballads (1798), especially Wordsworth's *Preface*, which declared that poetry is the spontaneous overflow of powerful feelings and that the language of ordinary men is the fittest medium. The period's ideals: **imagination** (the mind's creative power), **nature** (a source of truth and healing opposed to industrial society), **the individual**, **emotion**, and the **sublime**.

### Core themes
- **Nature:** not scenery but a living, moral force — 'a presence full of love' (Wordsworth). Nature heals the wounded spirit and teaches truth.
- **Imagination:** Coleridge's 'esemplastic' (shaping) power unifies perception; poetry as the record of the mind's activity.
- **The sublime:** Burke's Amazement mixed with terror in the face of mountains, storms, oceans — Kant's 'dynamical sublime'.
- **The Byronic hero:** defiant, melancholy, rebellious against society (Byron's Childe Harold, Shelley's Prometheus).
- **The gothic and supernatural:** ghosts, ruins, madness — from Ann Radcliffe's haunted castles to Mary Shelley's *Frankenstein*.

### Reading Keats's 'Ode on a Grecian Urn'
The poem meditates on art, permanence and desire. The famous closing — 'Beauty is truth, truth beauty' — has sparked endless debate about whether Keats endorses an aesthetic of pure beauty or exposes the limits of art to know truth. The urn is both witness and maker of the moments it depicts — a classic example of Romantic self-reflexive art.

### Frankenstein and the gothic novel
Mary Shelley's *Frankenstein* (1818) takes the gothic into the modern age: Victor's Promethean ambition, the Creature's education and rage, the Arctic framing. It asks what counts as monstrous and whose responsibility is the consequences of creation — a question that resonates today.`
      },
      {
        code: "ENG 201",
        title: "Introduction to Literary Criticism",
        year: 2,
        semester: 4,
        credits: 3,
        description:
      "An overview of the Western tradition of literary criticism from classical antiquity to the early nineteenth century, examining how writers and thinkers have interpreted literature.",
    learningOutcomes: [
      "Describe classical and medieval theories of poetry and drama.",
      "Compare Renaissance defences of poetry with Augustan criticism.",
      "Identify the shift toward historical and psychological criticism in the Romantic period."
    ],
        topics: [
      {
        title: "Classical foundations",
        notes:
          "Plato (Republic) famously banished the poets for mimesis (imitation) and their power to corrupt youth; Aristotle (Poetics) counter-argued that tragedy purges emotions through pity and fear (catharsis). Longinus' *On the Sublime* (1st c. CE) locates greatness in grandeur of thought and passion that lifts the reader beyond themselves."
      },
      {
        title: "Renaissance to Romantic criticism",
        notes:
          "Philip Sidney's *Defence of Poetry* (1595) rebuts the charge that poetry is false, arguing it is 'the most high, estimative, and sigmaticall of things'. Dryden and Johnson gave practical criticism (close reading with judgment). Wordsworth's *Preface to Lyrical Ballads* (1800) re-centred criticism on the poet's imaginative power and the language of common life. Romantic criticism opened the door to the personal, the historical and the psychological."
      }
    ],
        setBooks: [
      { title: "The Norton Anthology: Theory/Criticism", author: "ed. various", note: "Source excerpts from each period." },
      { title: "Literary Theory: An Introduction", author: "Terry Eagleton", note: "Accessible overview of critical traditions." }
    ],
    keyAuthors: [
      { name: "Plato", lifespan: "427–347 BCE", notableWorks: ["Republic", "Ion"], bio: "Classical Greek philosopher who argued that poetry is imitation and morally dangerous." },
      { name: "Aristotle", lifespan: "384–322 BCE", notableWorks: ["Poetics", "Nicomachean Ethics"], bio: "Systematised tragedy's cathartic effect and the structure of plot as the 'soul of tragedy'." },
      {
        name: "Terry Eagleton",
        lifespan: "1943–",
        nationality: "UK",
        notableWorks: ["Literary Theory: An Introduction", "Ideology of the Aesthetic"],
        bio: "Marxist critic whose popular introduction maps the history of theory from the ancients to the present."
      }
    ],
    notes: ``
      }
];
