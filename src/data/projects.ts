export type ProjectCategory = 'professional' | 'hobby' | 'academic'

// [year, month] where month is 1–12. end: null = ongoing
export type DatePoint = [number, number]

export interface Project {
  slug: string
  title: string
  client: string
  period: string
  startYear: number
  dateStart: DatePoint
  dateEnd: DatePoint | null
  category: ProjectCategory
  summary: string
  fullDescription: string
  roles: string[]
  keywords: string[]
  image: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'hjalpmedelsportalen',
    title: 'Hjälpmedelsportalen — Assistive Devices Portal',
    client: 'Region Stockholm (via Sopra Steria)',
    period: 'May 2025 – Feb 2026',
    startYear: 2025,
    dateStart: [2025, 5],
    dateEnd: [2026, 2],
    category: 'professional',
    summary:
      'A web-based system for managing prescriptions for assistive devices across the Stockholm Region, including an API layer enabling 300+ legacy-system suppliers to integrate securely and reliably.',
    fullDescription: `
The Healthcare Administration (Hälso- och sjukvårdsförvaltningen) is responsible for ensuring that residents of Stockholm County have access to good and safe medical and dental care. The Assistive Devices Portal is a web-based system, developed in 2025, for managing prescriptions for assistive devices for people with various disabilities within the Stockholm Region, as well as validating billing.

An API layer was built that followed new requirements and allowed over 300 suppliers to integrate their legacy systems — originally built in 2005. Robin took over responsibility from the previous solution architect, developer, communicator, and tester working with suppliers, to ensure rapid development cycles and maintain a flexible architecture saving weeks of development time.

**As Technical Owner**, Robin owned the external integration end-to-end: planning, prioritization, and quality assurance from requirements to production. He led communication with suppliers' technical leads and developers, managed the backlog, and coordinated internal tracks so that integrations and release cycles stayed on schedule.

**As Solution Architect**, Robin designed the API contract, data and process flows, and data validation for the external integration layer. He defined error/retry strategies, logging, and traceability for robust operations and high availability.

**As .NET Developer**, Robin implemented integration endpoints, service layers, retry and error handling logic, regression tests, and validation logic in .NET, optimized database interactions, and exposed REST APIs with Swagger/OpenAPI.

**As Tester**, Robin planned and drove continuous testing (functional, E2E, and data quality) for supplier flows, defined acceptance criteria and test cases, and delegated execution to testers. He used logs/metrics to verify flows and catch regression risks before production deployment.

**As Requirements Manager**, Robin took responsibility for the requirements picture on the supplier side: identifying unknown business rules together with suppliers, syncing these against known internal requirements, and translating agreements into user stories, acceptance criteria, and supplier documentation.
    `,
    roles: ['Technical Owner', 'Solution Architect', '.NET Developer', 'Tester', 'Requirements Manager'],
    keywords: ['.NET Core', 'C#', 'REST API', 'Azure DevOps', 'SQL Server', 'Microservices', 'CI/CD', 'Swagger', 'EF Core', 'RBAC'],
    image: '/images/healthcare.jpg',
    featured: true,
  },
  {
    slug: 'elefant-mvp',
    title: 'Elefant — Retail Media Network MVP',
    client: 'Elefant',
    period: 'Feb 2024 – Apr 2025',
    startYear: 2024,
    dateStart: [2024, 2],
    dateEnd: [2025, 4],
    category: 'professional',
    summary:
      'A Retail Media Network initiative combining physical in-store touchpoints with AI-driven digital activation. First pilot resulted in 300% increased sales. Robin served as CTO, co-founder, and led full product and technical delivery.',
    fullDescription: `
Elefant is a Retail Media Network initiative combining physical touchpoints in-store with digital activation driven by AI. The solution was designed to enable rapid hypothesis testing following LEAN methodology, deliver measurable impact in campaigns, and be commercially viable both physically and digitally.

Key outcomes included:
- Physical flagship product developed; patent application completed in collaboration with a consultant and offered as a marketing platform
- Business loan of 250,000 SEK secured; professional email domains and routines established for sales/support
- Digital marketing platform PoC built with generative AI integration for simple game-advertisements (prizes/competitions) and campaign measurement
- Automated cold-email engine with dynamic templates and A/B testing for higher response rates; improved prospecting and sales pipeline
- Active customer cultivation and customer success with user insight collection for hypothesis validation
- First pilot resulted in **300% increased sales** from the previous year, and **225% growth** from the previous three months

**As Product Owner**, Robin owned the roadmap, prioritization, and hypothesis backlog from the flagship idea to patent application and pilot case. He defined goals/KPIs, ensured measurability, and drove decision-making for investment steps.

**As Business Developer**, Robin secured the business loan with 10% risk, established professional email/identity, and participated in customer meetings and case design. He was responsible for customer success and insight collection to validate hypotheses and guide the backlog.

**As Tech Lead**, Robin set technical quality criteria (performance, security, measurability), coordinated full-stack, AI integration, and UX so that the PoC could be demonstrated and iterated quickly for different customers.

**As Architect**, Robin designed the architecture and service boundaries for the digital platform: data model, API contracts, authentication/authorization, event/job queues, and observability. He defined integration points for generative AI in ad/game flows and tracking of interactions and conversions.

**As Full Stack Developer**, Robin implemented the PoC platform (full-stack) and cold-email automation (dynamic templates, A/B, follow-up). He maintained and developed the website (performance, content, SEO) and built prototypes for gamified advertisements.
    `,
    roles: ['CTO & Co-Founder', 'Product Owner', 'Business Developer', 'Tech Lead', 'Architect', 'Full Stack Developer'],
    keywords: ['Generative AI', 'Lean Startup', 'Product Strategy', 'A/B Testing', 'Architecture', 'TypeScript', 'Next.js', 'React', 'AI Integration'],
    image: '/images/retail.jpg',
    featured: true,
  },
  {
    slug: 'secondry-mvp',
    title: 'Secondry — Unlisted Stock Trading Platform MVP',
    client: 'Secondry',
    period: 'Sep 2024 – Jan 2025',
    startYear: 2024,
    dateStart: [2024, 9],
    dateEnd: [2025, 1],
    category: 'professional',
    summary:
      'A Swedish fintech startup democratizing trade in unlisted shares. Built a secure, scalable MVP with BankID authentication, anonymous negotiation chat, real-time bidding, and automated contract/e-signature generation.',
    fullDescription: `
Secondry is a Swedish fintech startup with the goal of democratizing trade in unlisted shares. The platform serves both investors and companies, enabling secure and anonymous trading between parties through digital identification and real-time communication.

The startup needed a scalable platform to validate its business model with features for federated login, bidding, chat functionality, and handling of business agreements. The goal was to quickly launch an MVP that can be tested on the Swedish market and provide the basis for further product development and potential investment.

Delivered a working MVP where users can browse listed companies, sell, place bids, negotiate anonymously via chat, and complete transactions via federated e-signature. The platform enabled faster testing of product ideas and provided decision support for continued development and capital raising.

**As Tech Lead**, Robin was responsible for the overall technical direction and daily delivery: prioritized the backlog together with stakeholders, established quality criteria (performance, security, observability), and coordinated work between backend, real-time communication, and interface so the MVP could be delivered on time.

**As Solution Architect**, Robin designed the architecture and service boundaries: data model, API contracts, BankID authentication, and user flows. He ensured the solution can scale and that security and integrity are handled correctly throughout the flow from onboarding to e-signed agreement.

**As Full Stack Developer**, Robin was responsible for backend development, API design and database modeling (including transaction and logic layers), real-time communication, and automated email handling upon deal completion. He also contributed to frontend and UX design to ensure a cohesive user experience from listing to transaction. He automated contract generation, email dispatch, and invoice creation.
    `,
    roles: ['Tech Lead', 'Solution Architect', 'Full Stack Developer'],
    keywords: ['.NET Core', 'Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'BankID', 'Real-time', 'E-signature', 'Fintech', 'RBAC'],
    image: '/images/fintech.jpg',
  },
  {
    slug: 'price-engine-mvp',
    title: 'Price Engine — Competitive Intelligence Platform',
    client: 'All White Online',
    period: 'Feb 2024 – Apr 2025',
    startYear: 2024,
    dateStart: [2024, 2],
    dateEnd: [2025, 4],
    category: 'professional',
    summary:
      'An automated competitive pricing intelligence system for a European e-commerce company, scraping thousands of product pages, normalizing data, and visualizing price gaps to drive smart pricing decisions and improve Google Ads ROAS.',
    fullDescription: `
All White Online is a European e-commerce company with a large product range and competitive markets. The goal was to create a system that automatically collects and structures price data from competitors to enable rapid price adjustment and improved competitiveness.

The client's need was a robust web scraper system that could handle thousands of product pages, convert the data into a standardized format, and visualize it intuitively. The purpose was to create the basis for smart pricing as well as optimizing SEO and online advertising.

Key outcomes:
- Production-deployed price intelligence with scheduled collection, data cleaning/normalization, and accurate matching against own assortment
- Visualization & traceability of price gaps, history, and recommended actions
- Improved product feeds, targeted Google Ads, and ensured correct ROAS
- Strengthened decision-making capacity for procurement/merchandising/marketing through unified views and API access to price insights

**As Requirements Analyst**, Robin received 3 main use cases from the client and broke them down into requirements and acceptance criteria. He led the dialogue with the client, advised on system design and architecture choices, obtained approvals, and translated decisions into backlog, user stories, and UI flows.

**As Tech Lead**, Robin led work on data collection (web scraping), data cleaning, backend, frontend, and data visualization. He implemented robust error handling, logging, and validation logic, and improved the e-commerce product feeds and SEO performance for targeted Google Ads.

**As Solution Architect**, Robin defined the system architecture for collection, processing, storage, and visualization of data. He developed API contracts, error/retry strategies, logging/traceability, and security principles. He designed data models and pipeline patterns (batch/near-real-time) to ensure scalability and data security.

**As Full Stack Developer**, Robin implemented web scraping, data validation and normalization, API layer and dashboards. He was responsible for all UI/UX work for the platform: information architecture, component library, and interaction design, as well as user testing and iteration with the client.
    `,
    roles: ['Tech Lead', 'Solution Architect', 'Full Stack Developer', 'Requirements Analyst'],
    keywords: ['Next.js', 'React', '.NET Core', 'TypeScript', 'SQL Server', 'Azure', 'Docker', 'CI/CD', 'Web Scraping', 'Data Engineering', 'E-commerce'],
    image: '/images/ecommerce.jpg',
  },
  {
    slug: 'ingenius-mlp',
    title: 'Ingenius — AI-Powered Learning Platform',
    client: 'Ingenius',
    period: 'Jun 2023 – Feb 2024',
    startYear: 2023,
    dateStart: [2023, 6],
    dateEnd: [2024, 2],
    category: 'professional',
    summary:
      'A globally scalable EdTech platform with AI-generated course content, adaptive learning schedules, video streaming, and detailed engagement analytics — designed to reduce learning time and increase retention through personalization.',
    fullDescription: `
Ingenius is a global player in educational technology that wants to offer personalized learning experiences at scale. The platform was designed to support the entire chain: creation and upload of course material, global distribution, and follow-up.

The need was a scalable platform with support for AI-generated course material, personalized study schedules, global video streaming, and detailed engagement tracking for different archetypes. The purpose was to reduce learning time and increase retention through AI-adapted learning experiences.

Key deliverables:
- A CMS with support for multiple media formats (text, image, video, audio) and AI generation of courses
- Detailed engagement measurement enabling validation of impact on learning time and retention
- Ability for end customers to reduce costs for mandatory courses and certifications
- Data collection on how different personalities learn best (personality tests, chosen times of day, lesson duration, and content format) for continued personalization

**As Tech Lead**, Robin was responsible for the overall technical direction and daily delivery. He prioritized the backlog together with stakeholders, established quality criteria (performance, security, observability), and ensured release flows. Robin coordinated cross-functionally between AI generation, backend/API, data layer, and video/media flows, and facilitated UI/UX reviews.

**As Solution Architect**, Robin designed the foundational architecture and service boundaries for the platform: data model, media/video streaming flows, API contracts, authentication, and observability to ensure global performance and operational reliability.

**As Full Stack Developer**, Robin was responsible for database schema, backend, APIs, admin panel, and delivery to client. He integrated video streaming and built analytics logic to track user interactions and engagement. He ensured performance and security at a global scale.
    `,
    roles: ['Tech Lead', 'Solution Architect', 'Full Stack Developer'],
    keywords: ['Node.js', 'TypeScript', 'Next.js', 'React', 'Azure', 'CMS', 'Generative AI', 'Video Streaming', 'Docker', 'RBAC', 'EdTech'],
    image: '/images/edtech.jpg',
  },
  {
    slug: 'celebratix-mlp',
    title: 'Celebratix — Event Ticketing Platform',
    client: 'Celebratix',
    period: 'Feb 2023 – Jun 2023',
    startYear: 2023,
    dateStart: [2023, 2],
    dateEnd: [2023, 6],
    category: 'professional',
    summary:
      'A B2B2C ticketing platform for events and festivals built for a Dutch company. Full-stack delivery including primary and secondary market ticketing, QR code generation, organizer admin panels, and ETL pipelines for analytics.',
    fullDescription: `
Celebratix is a Dutch company offering ticket management for events and festivals via a B2B2C model. The project aimed to build a unified tool for organizers and consumers, from event creation to distribution, follow-up, and development of new hypotheses.

The need was a secure platform that handles event and ticket sales on both the primary and secondary market, so that organizers can easily administer their events and participants, while consumers can buy for others and resell tickets in a controlled manner.

Key outcomes:
- A cohesive platform where organizers can create events, manage participants, generate QR tickets, and track statistics
- Support for secondary market directly within the platform, reducing the need for external actors and providing a secure end-to-end experience
- Clear admin experience for B2B and B2C with permission management and component reuse for rapid further development

**As Full Stack Developer**, Robin built the entire stack for admin panels (B2B and B2C): component management, user permissions, QR ticket generation, statistics views, and database modeling. He conducted weekly remote reviews on UX/UI and functionality with the client, and translated feedback into iterative improvements in both backend and frontend.

**As Data Engineer**, Robin developed ETL flows from database models to visualization of key metrics in the B2B admin panel. Focus was on modular design and scalability to facilitate future expansion of data visualization, reporting, and segmentation of user data.
    `,
    roles: ['Full Stack Developer', 'Data Engineer'],
    keywords: ['Next.js', 'React', 'TypeScript', '.NET Core', 'Azure', 'SQL Server', 'Docker', 'QR Codes', 'ETL', 'Data Visualization', 'B2B2C', 'Events'],
    image: '/images/events.jpg',
  },
  {
    slug: 'abb-industry40',
    title: 'ABB — Industry 4.0 Cloud Architecture',
    client: 'ABB',
    period: 'Feb 2021 – Jul 2022',
    startYear: 2021,
    dateStart: [2021, 2],
    dateEnd: [2022, 7],
    category: 'professional',
    summary:
      'Designed and built the Industry 4.0 cloud architecture for ABB — a world-leading automation provider — enabling centralized monitoring and control of autonomous factories, bridging legacy standalone robot cells to a modern cloud platform.',
    fullDescription: `
ABB is a world-leading provider of automated production solutions. The client's portfolio initially consisted of standalone solutions managed individually. The goal was an Industry 4.0 architecture where autonomous factories can be controlled and monitored centrally, so that ABB maintains its leading position and solutions can quickly be integrated at end customers.

A central part was enabling cost reduction for end customers through easier integration of various guiding systems (with and without camera) into the robot cells.

Target architecture for Industry 4.0: a cloud-based central solution for comprehensive overview, control, and analysis across all robot cells in the factory. Path forward from standalone to cloud: standardized interfaces and data flows enabling successive migration of existing cells. Cost-effective integration: support for modular selection of guiding systems with and without camera, reducing integration time and ownership cost for end customers.

**As Solution Architect**, Robin worked as a solution architect and designed database models, data flows, and process flows for learning and object localization (with and without camera) in a cloud environment with high security and availability requirements. The work encompassed architecture principles, API contracts, access models, and error handling to ensure robust operation in a distributed factory environment.

**As Full Stack Developer**, Robin built the API layer between the legacy code in the standalone robot cells and the cloud platform, including robust commands to start, stop, and analyze production in specific cells. He developed cloud components for each cell's guiding system (with/without camera) and supported both internal teams and external end customers during implementation and troubleshooting.
    `,
    roles: ['Solution Architect', 'Full Stack Developer'],
    keywords: ['.NET Core', 'C#', 'Azure', 'Computer Vision', 'OpenCV', 'REST API', 'Industry 4.0', 'Robotics', 'WPF', 'Blazor'],
    image: '/images/robotics.jpg',
    featured: true,
  },
  {
    slug: 'voorkom-en-herstel',
    title: '2M Engineering — Medical Rehabilitation Platform',
    client: '2M Engineering (Netherlands)',
    period: 'Feb 2019 – Sep 2020',
    startYear: 2019,
    dateStart: [2019, 2],
    dateEnd: [2020, 9],
    category: 'professional',
    summary:
      'Developed digital rehabilitation products for motion analysis and a modular SDK for commercial development. Built real-time 3D visualization for home-based stroke recovery and hand therapy using sensor-equipped wearables.',
    fullDescription: `
2M Engineering is a Dutch company developing sensor technology for healthcare. The focus of the assignment was to develop digital products for motion analysis and rehabilitation, as well as an SDK enabling commercial further development by external parties.

The client needed technical solutions for home rehabilitation, including visualization of motion data and sensor feedback in real-time, to complement today's standard for rehabilitation in clinics. The goal was to create a cohesive digital experience that is easy to use at home and can be extended by partners via a developer SDK.

Key outcomes:
- Several MVPs were developed, including a suit for stroke recovery and a glove with feedback sensors, with accompanying 3D applications for visualization and analysis
- A modular SDK enabling commercial further development and faster integration in partners' solutions
- A scalable architecture for collection, processing, and presentation of sensor data in real-time, adapted for home use
- Market analysis to increase ROI on developed products and IP from EU projects

**As Tech Lead**, Robin was responsible for the overall technical direction and daily delivery. He set technical direction, prioritized the backlog together with product stakeholders, and coordinated work between sensor/embedded, backend, data, and 3D client to ensure short delivery cycles from prototype to MVP.

**As Solution Architect**, Robin designed the system's end-to-end architecture: data acquisition from sensors, streaming/processing in real-time, storage and APIs, 3D client, and SDK design for external developers.

**As Full Stack Developer**, Robin implemented the full stack: data collection and preprocessing of sensor data to Windows over BT, service layer and APIs for real-time and historical queries, and client logic for 3D visualization and feedback loops.

**As Data Engineer**, Robin designed, analyzed, and implemented PoCs to identify sliding patterns and direction with pyroelectric material and wavelet transforms, and contributed to PCB design to optimize signal capture and noise levels. He built ETL pipelines for sensor data (extraction, cleaning, fusion/feature steps) that were then visualized intuitively in the 3D platform.
    `,
    roles: ['Tech Lead', 'Solution Architect', 'Full Stack Developer', 'Data Engineer'],
    keywords: ['Unity3D', '.NET Core', 'C#', 'Signal Processing', 'Data Engineering', 'IoT', 'Sensor Fusion', 'MATLAB', 'TDD', 'Healthcare'],
    image: '/images/medtech.jpg',
  },
  {
    slug: 'koguma',
    title: 'Koguma — Space Robotics & Swarm Navigation',
    client: "Yoshida's Space Robotics Lab, Japan",
    period: 'Apr 2017 – Feb 2018',
    startYear: 2017,
    dateStart: [2017, 4],
    dateEnd: [2018, 2],
    category: 'academic',
    summary:
      'A research project linked to the Google Lunar X Prize initiative in Japan. Developed autonomous swarm formation algorithms and a modular LTE communication protocol for remote-controlled miniature moon-exploration robots.',
    fullDescription: `
This research project was related to the Google Lunar X Prize initiative at Yoshida's Space Robotics Lab in Japan. The purpose was to distribute a swarm of minimalist collaborative robots for planetary exploration and mapping of the moon.

**Autonomous Swarm Algorithms**: Created autonomous algorithms for edge systems with strictly limited resources. These could be used for a swarm of mini-robots to follow each other in formation, thereby saving energy.

**Communication Protocol**: Developed a modular communication protocol to manually control, stream video, and take photos with each individual robot over LTE.

The client needed autonomous, energy-efficient algorithms that can execute locally "on the edge" with low latency and limited memory/CPU, as well as a modular communication protocol for remote control, real-time video streaming, and image capture over LTE.

**As Solution Architect**, Robin was responsible for the overall system design in an edge environment. He designed the pipeline for real-time video streaming and image capture over LTE from autonomous robots, with clear latency and bandwidth budgets, and modular separation between sensor input, encoding/compression, transmission, and decoding. He designed object-tracking algorithms based on classical state-of-the-art methods in image and video analysis, adapted for limited CPU and memory resources.

**As Full Stack Developer**, Robin implemented the full solution: from camera reading and efficient frame handling to encoding/compression and network transmission, as well as client logic for control commands, testing, and media handling. He optimized algorithms to meet real-time requirements on limited hardware (profiling, memory footprint, threading), built test suites for both offline and integration tests in field-like scenarios.
    `,
    roles: ['Research Engineer', 'Solution Architect', 'Full Stack Developer'],
    keywords: ['Python', 'C++', 'Computer Vision', 'OpenCV', 'Machine Learning', 'Edge Computing', 'LTE', 'Space Robotics', 'Swarm Intelligence'],
    image: '/images/space.jpg',
    featured: true,
  },
  {
    slug: 'happy-birthday-game',
    title: 'Happy Birthday — Multiplayer 3D Party Game',
    client: 'Personal Project',
    period: 'Mar 2020 – Apr 2020',
    startYear: 2020,
    dateStart: [2020, 3],
    dateEnd: [2020, 4],
    category: 'hobby',
    summary:
      'A 3D multiplayer game built from scratch in Unity as a surprise birthday gift during COVID-19 lockdown. Features a fully custom client-server networking layer, WebGL browser support, a MongoDB-backed account system with Discord-style logins, and a confetti easter egg.',
    fullDescription: `
Built as a surprise birthday gift during the COVID-19 lockdown — a fully networked 3D multiplayer game created from scratch in Unity over a few weeks. The goal was to produce something personal, playable together over the internet, and full of small surprises to celebrate the occasion.

**Repository:** [ARobLar/Play-N-Fun on GitHub](https://github.com/ARobLar/Play-N-Fun/tree/Development/HappyBirthday)

**Multiplayer Architecture**

Rather than using a pre-built matchmaking service, a custom client-server networking layer was written on top of Unity's NetworkTransport. The server opens two simultaneous ports so the game can be played from any device:

- **TCP port 26000** — for standalone desktop clients (Windows/Mac/Linux)
- **WebSocket port 26001** — for WebGL browser builds, so friends could join directly in a browser tab without installing anything

Messages are binary-serialised with BinaryFormatter and dispatched through a typed operation-code system (the NetOP enum), keeping the protocol clean and extensible. The server handles up to 10 concurrent connections and tracks every player's active connection ID.

**Account System**

A full account and authentication system was built on MongoDB Atlas (migrated from the deprecated mLab service mid-development — required installing updated MongoDB C# drivers as NuGet packages and placing the DLLs in Unity's Plugins folder). Features:

- Account creation with username, email, and SHA-256 hashed password, with duplicate username detection
- Login via email or a username#discriminator pair (Discord-style) — e.g. \`Robin#0042\`
- Input validation via regex for email format, username length/characters, and the discriminator suffix
- Session tokens: 64-character cryptographically random strings (alphanumeric) generated server-side and issued on successful login
- Player state persisted to the database on each login: active connection ID, login timestamp, and online status

**Lobby Scene**

The client-side lobby is a Unity scene with a Canvas UI managing two flows side by side: account creation (username, password, email fields) and login (username#discriminator + password). The canvas group is disabled during network calls and re-enabled on response — preventing duplicate submissions while a request is in flight.

**Easter Egg — Confetti**

As a birthday surprise, a confetti particle system is wired into the scene. The ParticleSceneControls system supports three modes: Instantiate (single-shot burst on click), Trail (continuous stream while held), and Activate (ambient looping). The ParticleClouds material renders the confetti in a vibrant birthday palette — pink, teal, orange, mauve, yellow, and turquoise — matching the overall colour theme of the game.

**Tech Stack**

Unity 2019 · C# · Unity NetworkTransport · MongoDB Atlas · BinaryFormatter · SHA-256 · WebGL build target · Regex input validation
    `,
    roles: ['Solo Developer', 'Game Designer', 'Network Engineer'],
    keywords: ['Unity3D', 'C#', 'Multiplayer', 'MongoDB', 'Networking', 'WebGL', 'Game Development', 'Authentication', 'Particle Systems', 'Birthday'],
    image: '/images/game.jpg',
  },
  {
    slug: 'scooteroni',
    title: 'Scooteroni — 3D Multiplayer Racing Game',
    client: 'Personal Project',
    period: 'Mar 2020 – Apr 2020',
    startYear: 2020,
    dateStart: [2020, 3],
    dateEnd: [2020, 4],
    category: 'hobby',
    summary:
      'A 3D multiplayer vehicle racing game built in Unity during the COVID-19 lockdown. Features a custom-modelled circuit with loops, ramps, and obstacles, five driveable vehicle types, Photon-powered multiplayer, and a handful of hidden easter eggs including a confetti cannon and slow-motion mode.',
    fullDescription: `
A self-contained 3D racing game built for fun in Unity during the COVID-19 lockdown. Everything from the track geometry to the camera behaviour was built from scratch, with Photon PUN providing the online multiplayer layer.

**Repository:** [ARobLar/Play-N-Fun on GitHub](https://github.com/ARobLar/Play-N-Fun/tree/Development/CarGame)

**The Track**

The race circuit was modelled in FBX and imported directly into Unity. The layout includes:

- A looping circuit with a primary jump ramp launching cars into the air
- Multiple mini-ramps and an elevated ramp leading outside the track boundary
- Pillars, walls, and obstacles to navigate around
- A finish line with two upright poles as the timing marker
- Tree-lined terrain surrounding the course

**Vehicles**

Five vehicle types are playable, each with their own physics model and dedicated audio mixer:

- **Car** — the primary racing vehicle, chased by a stabilised follow-camera
- **Jet plane (2-axis)** — simplified aircraft flight model with two control axes
- **Propeller plane (4-axis)** — full flight controls including roll and yaw
- **RollerBall** — physics sphere mode for chaotic fun
- **First/Third person character** — on-foot traversal of the track

The CameraStable script keeps the chase camera smooth: it copies the car's Y-rotation (heading direction) but strips the X and Z components, so the camera never flips or tilts when the car goes over a ramp or spins out.

**Easter Eggs**

- **Confetti cannon** — a particle system fires bursts of coloured confetti. The ParticleSceneControls system supports three trigger modes: Instantiate (one-shot burst), Trail (continuous stream while held), and Activate (looping ambient). The ParticleClouds material renders the confetti in vibrant colours.
- **Slow-motion toggle** — a button drops Time.timeScale to 0.3×, with a UI icon swap to indicate the mode. Time is correctly restored on component destroy, preventing a permanently-frozen game state.
- **Laser bolt** — a custom-modelled projectile (LaserBolt.fbx) hidden in the scene as an unlockable weapon.
- **Smash boxes** — physics rigidbody boxes and box-piles scattered around the track that explode on impact.

**UI and Menus**

- Main menu with scene loader (selects race scene or network lobby)
- Pause menu that simultaneously freezes Time.timeScale to 0 and mutes AudioListener.volume — and correctly restores both values on resume
- Network game lobby and live score bar UI for multiplayer race positions
- Camera-switch UI for toggling between vehicle views mid-race
- Level reset button that reloads the entire scene from scratch

**Multiplayer**

Online multiplayer is powered by Photon PUN, handling room creation, player synchronisation, and network events across players.

**Tech Stack**

Unity 2019 · C# · Photon PUN · FBX custom models · Unity Standard Assets (vehicles, cameras, particles)
    `,
    roles: ['Solo Developer', 'Game Designer', 'Level Designer'],
    keywords: ['Unity3D', 'C#', 'Multiplayer', 'Photon', 'Game Development', '3D Modelling', 'Particle Systems', 'Level Design', 'Physics'],
    image: '/images/game.jpg',
  },
  {
    slug: 'engineers-without-borders',
    title: 'Schools of the Future — Mozambique',
    client: 'Engineers Without Borders (EWB)',
    period: '2018 – 2020',
    startYear: 2018,
    dateStart: [2018, 1],
    dateEnd: [2020, 12],
    category: 'hobby',
    summary:
      'Volunteered with Engineers Without Borders to create workshops and teaching materials on basic electronics and programming for high school students in Mozambique, building a sustainable local summer course over 5 years.',
    fullDescription: `
As part of the Engineers Without Borders — Schools of the Future initiative, Robin joined a team of 10–15 engineers working to build a recurring, locally sustainable 5-week summer course aimed at helping middle school students in developing countries reach higher education.

**The Mission**: Over 5 years, the team created diverse workshops to encourage students to apply for higher education, demonstrate that it opens many doors, and show that it is possible with planning and dedication. The focus was on basic electronics and programming literacy — skills that equip young people with tools for the future.

**Sustainability by Design**: By reaching out to students at local universities who could continue the workshops, and to local companies that could supply materials, the team built a sustainable system where the course continued locally without ongoing external support.

**Impact**: The initiative empowered a generation of students in Mozambique with technical foundations and the confidence to pursue university education, creating a self-sustaining educational ecosystem.

More information: [ewbnl.org — Schools of the Future Mozambique](https://www.ewbnl.org/portfolio-items/schools-of-the-future-mozambique/)
    `,
    roles: ['Volunteer Engineer', 'Workshop Facilitator', 'Curriculum Designer'],
    keywords: ['Education', 'Electronics', 'Programming', 'Sustainability', 'Volunteering', 'Social Impact', 'Mozambique'],
    image: '/images/ewb.jpg',
  },
  {
    slug: 'tu-eindhoven-exchange',
    title: 'TU Eindhoven — International Engineering Exchange',
    client: 'Technische Universiteit Eindhoven',
    period: 'Jan 2018 – Jun 2018',
    startYear: 2018,
    dateStart: [2018, 1],
    dateEnd: [2018, 6],
    category: 'academic',
    summary:
      'Exchange semester at one of Europe\'s top technical universities, covering Business Intelligence, Process Mining, Machine Learning, Signal Processing, Image Encoding/Decoding, and App Development.',
    fullDescription: `
During a semester exchange at Technische Universiteit Eindhoven (TU/e) — one of Europe's leading universities of technology — Robin completed 6 courses spanning a broad spectrum of engineering and computer science disciplines:

- **Business Intelligence**: Strategic use of data for organizational decision-making
- **Process Mining**: Extracting knowledge from event logs to discover, monitor, and improve real processes
- **Machine Learning**: Algorithms and statistical models for predictive analytics and pattern recognition
- **Signal Processing**: Techniques for analyzing and manipulating signals from sensors and communications systems
- **Image Encoding/Decoding**: Compression algorithms and standards for visual data transmission
- **App Development**: Mobile and web application development methodologies

This international experience not only broadened Robin's technical foundations but also developed cross-cultural collaboration skills and exposed him to cutting-edge European research in AI and engineering.
    `,
    roles: ['Exchange Student'],
    keywords: ['Machine Learning', 'Business Intelligence', 'Process Mining', 'Signal Processing', 'Image Processing', 'App Development'],
    image: '/images/university.jpg',
  },
  {
    slug: 'malardalen-civil-engineering',
    title: 'BSc+MSc in Robotics — Three Master\'s Theses',
    client: 'Mälardalen University',
    period: 'Aug 2014 – Jun 2020',
    startYear: 2014,
    dateStart: [2014, 8],
    dateEnd: [2020, 6],
    category: 'academic',
    summary:
      '300-credit Civil Engineering degree in Robotics with Software & Architecture as main specialisation. Completed three Master\'s-level theses in Computer & Data Science, focusing on tracking algorithms, AI/ML, and modular system design. Secondary focus on hardware, mechanics, and embedded prototyping.',
    fullDescription: `
Mälardalen University's Civil Engineering programme in Robotics is one of Sweden's most comprehensive engineering degrees, spanning hardware, software, mechanics, and AI over 300 credits (5 years).

**Main area: Software & Architecture**
- Tracking algorithms for image and video analysis
- AI/ML and classical statistics for analysis and automated problem solving
- Completed **3 Master's-level theses** in Computer & Data Science, focused on algorithms and modular design

**Secondary areas: Hardware & Mechanics**
- Designing and building circuit boards (PCB) and physical prototypes based on specific requirement specifications
- Embedded systems programming and sensor integration

**Exchange semester at TU Eindhoven (Jan–Jun 2018)**
- Business Intelligence, Process Mining, Machine Learning, Signal Processing, Image Encoding/Decoding, App Development

**Research internship at Yoshida's Space Robotics Lab, Japan (2017–2018)**
- Applied computer vision and edge computing on autonomous moon-exploration robots (see Koguma project)

This degree gave Robin the rare ability to think from transistor to cloud — understanding hardware constraints while designing scalable software architectures.
    `,
    roles: ['Engineering Student', 'Graduate Researcher', 'Thesis Author'],
    keywords: ['Robotics', 'Computer Vision', 'Signal Processing', 'Algorithm Design', 'Software Architecture', 'Embedded Systems', 'PCB Design', 'MATLAB', 'C++'],
    image: '/images/robotics-academic.jpg',
  },
  {
    slug: 'jonkoping-msc-ai',
    title: 'MSc in Artificial Intelligence',
    client: 'Jönköping University',
    period: 'Aug 2021 – Jun 2022',
    startYear: 2021,
    dateStart: [2021, 8],
    dateEnd: [2022, 6],
    category: 'academic',
    summary:
      '90-credit Master of Science in AI at Jönköping University, covering advanced machine learning, deep learning, AI systems design, and applied research methodologies — pursued in parallel with the ABB Industry 4.0 engagement.',
    fullDescription: `
Following his Civil Engineering degree, Robin pursued a focused Master of Science in Artificial Intelligence at Jönköping University to deepen his expertise at the frontier of the field.

The programme covered:

- **Advanced Machine Learning** — supervised, unsupervised, and reinforcement learning; model selection and evaluation
- **Deep Learning** — neural network architectures, CNNs, RNNs, transformers, and modern training techniques
- **AI Systems Design** — architecting AI-integrated systems for production, scalability, and reliability
- **Applied Research Methodologies** — quantitative and qualitative methods, experiment design, academic writing

This degree was completed alongside professional work (ABB Industry 4.0), demonstrating Robin's ability to balance high-intensity academic study with demanding consultancy engagements simultaneously.

The MSc directly informs his current specialisation in agentic AI, LLM integrations, and AI-driven platform development.
    `,
    roles: ['Graduate Student', 'Researcher'],
    keywords: ['Machine Learning', 'Deep Learning', 'AI Systems', 'Neural Networks', 'Transformers', 'Research Methods', 'Python', 'Applied AI'],
    image: '/images/university.jpg',
    featured: true,
  },
  {
    slug: 'investment-club',
    title: 'University Investment Club — Lead Analyst',
    client: 'Jönköping University',
    period: 'Aug 2021 – Jun 2022',
    startYear: 2021,
    dateStart: [2021, 8],
    dateEnd: [2022, 6],
    category: 'academic',
    summary:
      'Led the analytical work for a university investment club during the MSc AI programme. The mandate: identify high-return equity investments while keeping risk mitigated. Produced three full research cycles — AMD, Thermo Fisher Scientific, and Yamana Gold — each covering fundamental, financial, and technical analysis culminating in a formal investment recommendation.',
    fullDescription: `
University Investment Club, Jönköping University — MSc AI Programme (2021–2022)

As part of extracurricular activities alongside the MSc in Artificial Intelligence at Jönköping University, Robin led the analytical work for a university investment club. The mandate was to identify high-return equity opportunities while maintaining a disciplined, risk-mitigated approach to portfolio construction.

**Structure and Methodology**

The club operated as a team of four analysts. Each investment cycle followed a structured, professional-grade research framework:

1. **Company Profiling** — product range, business segments, geographic markets, management, and shareholder structure
2. **Market Analysis** — TAM, CAGR projections, market share dynamics, and macroeconomic external factors
3. **Company Analysis** — competitive positioning, competitive advantages, company outlook, and key risks
4. **Financial Analysis** — revenue growth trends, key financial ratios (P/E, EV/EBITDA, EV/Sales, ROE, ROI, D/E), and a Comparable Company Analysis (comps) against industry peers
5. **Technical Analysis** — price action, moving averages (50/100/200 SMA), RSI, MACD, trend patterns, and technical price targets
6. **Investment Thesis & Recommendation** — a synthesised buy/hold/sell recommendation with a target price and investment horizon

Each full cycle produced a written research report and a formal presentation delivered to the group.

**Analyses Completed**

**AMD (Advanced Micro Devices), Q4 2021** — Semiconductor sector. BUY recommendation based on growing CPU/GPU market share, an exceptionally clean balance sheet (D/E ratio of 0.04), strong CEO leadership under Lisa Su (+1,300% share price since 2014), and structural demand tailwinds from gaming, HPC, autonomous vehicles, and data centres. Technical price target: 200 USD.

**Thermo Fisher Scientific, Q1 2022** — Life sciences & healthcare sector. STRONG BUY recommendation based on a 12.64% revenue CAGR, an attractive PEG ratio of 1.85 (growing faster than valuation implies), an aggressive acquisition growth engine (~40 acquisitions since formation), and a short-term RSI oversold dip interpreted as a discount entry into a high-quality long-term compounder.

**Yamana Gold, Q1 2022** — Precious metals sector. BUY recommendation based on the inflation hedge thesis, Americas-only mine portfolio with no Russia exposure (competitors with Russian operations were facing forced shutdowns due to Ukraine war sanctions), undervaluation relative to peers, and a confirmed technical uptrend above both the 50 and 200 SMA. Timed to align with the macro environment of surging inflation and geopolitical uncertainty.

**Role as Lead Analyst**

Robin coordinated the team's research workstreams, defined the analytical framework for each cycle, synthesised findings into the final reports, and led the investment presentations. The investment club sharpened skills in fundamental analysis, financial modelling, macro-to-micro research methodology, and communicating complex financial arguments — skills that directly complement work in technical architecture and data-driven product strategy.
    `,
    roles: ['Lead Analyst', 'Investment Strategist', 'Financial Analyst'],
    keywords: ['Equity Research', 'Fundamental Analysis', 'Financial Modelling', 'Technical Analysis', 'Comparable Company Analysis', 'Risk Management', 'Portfolio Strategy', 'Investment Thesis'],
    image: '/images/finance.jpg',
  },
  {
    slug: 'investment-amd',
    title: 'AMD — Equity Research & Investment Analysis',
    client: 'Investment Club, Jönköping University',
    period: 'Q4 2021',
    startYear: 2021,
    dateStart: [2021, 11],
    dateEnd: [2021, 12],
    category: 'hobby',
    summary:
      'Full equity research report on Advanced Micro Devices (AMD) produced for the university investment club. Covered company profile, market dynamics, competitor mapping, financial ratios, comparable company valuation, and technical analysis — culminating in a BUY recommendation.',
    fullDescription: `
**Team:** Robin Larsson (Lead Analyst), Rasmus Bogren, Lennart Erdmann, Valeria Vitale

AMD was selected as the first investment candidate of the university investment club cycle. The team produced a full equity research report and formal presentation.

**Company Overview**

AMD is a US-based semiconductor company (founded 1969) specialising in CPUs and GPUs for PCs, gaming consoles, cloud computing, and high-performance computing (HPC). At time of analysis, revenue was split across two segments: Computing & Graphics (56%) and Enterprise, Embedded & Semicustom (44%), with Q3 2021 combined revenue of ~$4.3B.

**Market Analysis**

- GPU market projected to grow at 33% CAGR to 2027; CPU market at 4.1% CAGR to 2027
- AMD held 38% CPU market share (vs. Intel 62%) and 19% discrete GPU share (vs. Nvidia 81%)
- Semiconductor shortage (2020–) created a supply constraint that also raised the barrier to entry for new competitors — net positive for incumbents
- Key demand tailwinds: crypto mining, autonomous vehicles, gaming, Metaverse, and data centres

**Company Analysis**

- CEO Dr. Lisa Su (since 2014): share price +1,300% under her leadership; named one of Barron's Top 50 CEOs
- Major institutional holders: Vanguard (7.68%), BlackRock (4.48%), SSgA (3.74%)
- Exclusive CPU/GPU supplier for both Sony PlayStation 5 and Microsoft Xbox Series X/S — long-term, locked-in console revenue
- Described as selling "shovels in the gold rush": regardless of which high-tech trend wins, they all require AMD's computing power

**Financial Analysis**

- Revenue grew 45% YoY from 2019 to 2020; steady growth trajectory with reinvestment focus (no dividends paid)
- Debt/Equity ratio of 0.04 — the lowest in the peer group; significant headroom for future acquisitions or R&D spending
- Strong ROE and ROI relative to peers, demonstrating efficient capital deployment despite lower absolute earnings margins
- Comparable company analysis vs. Nvidia, Qualcomm, Intel, and ADI: AMD appeared **fairly valued to undervalued** at current price relative to peers

**Technical Analysis**

- Strong uptrend with price trading above both the 50 and 100 SMA
- RSI normalising from overbought territory — classic bull consolidation setup after an Omicron-driven pullback
- MACD showing a slight bearish crossover post run-up (considered a short-term signal, not a trend reversal)
- Prior breakout from a pennant formation added ~50 USD to price
- Technical price target: **200 USD** if a new pennant forms and breaks to the upside
- AMD outperformed the S&P 500 by ~40% year-to-date at time of analysis

**Conclusion: BUY**

AMD is well positioned to capitalise on structural semiconductor demand growth. A capable CEO, the lowest debt levels in the peer group, growing market share in both CPUs and GPUs, strong institutional ownership, and an attractive relative valuation made AMD a high-conviction long-term buy recommendation.
    `,
    roles: ['Lead Analyst', 'Financial Analyst'],
    keywords: ['Equity Research', 'Semiconductors', 'Fundamental Analysis', 'Technical Analysis', 'Comparable Company Analysis', 'Financial Ratios', 'Investment Thesis', 'Buy Recommendation'],
    image: '/images/finance.jpg',
  },
  {
    slug: 'investment-thermofisher',
    title: 'Thermo Fisher Scientific — Equity Research & Investment Analysis',
    client: 'Investment Club, Jönköping University',
    period: 'Q1 2022',
    startYear: 2022,
    dateStart: [2022, 1],
    dateEnd: [2022, 2],
    category: 'hobby',
    summary:
      'Full equity research report on Thermo Fisher Scientific produced for the university investment club. Covered company profile, business segments, market dynamics, competitor analysis, financial ratios, and technical analysis — culminating in a strong BUY recommendation for one of the world\'s leading life science companies.',
    fullDescription: `
**Team:** Robin Larsson (Lead Analyst), Rasmus Bogren, Valeria Vitale

Thermo Fisher Scientific was selected as a third investment candidate for the university investment club. The analysis focused on the healthcare and life sciences sector — a defensively positioned, structurally growing market with high barriers to entry.

**Company Overview**

Thermo Fisher Scientific is an American life sciences company founded in 2006 through the merger of Thermo Electron and Fisher Scientific (with roots dating back to 1956). Headquartered in Waltham, Massachusetts, it is the world leader in serving science with annual revenue of ~$40B, 130,000+ employees (up from 75,000 in 2019 — almost doubled through acquisitions), and the same CEO, Marc N. Casper, since 2009.

The company consists of nine operating brands: Thermo Scientific, Applied Biosystems, Invitrogen, Fisher Scientific, Unity Lab Services, Patheon, PPD, Ion Torrent, and Gibco.

**Business Segments and Geography**

Revenue breakdown by segment:
- Life Sciences Solutions: 37.0%
- Laboratory Products & Services: 35.2%
- Analytical Instruments: 14.4%
- Specialty Diagnostics: 13.4%

Revenue breakdown by geography:
- United States: 48.2%
- China: 8.8%
- Rest of world: 43.0%

**Market Analysis**

The company operates at the intersection of two fast-growing markets:
- Global healthcare market: projected to reach $665.37B by 2028; US healthcare spending estimated to double from $4T (2020) to $8.3T by 2040
- Clinical diagnostics market: $70B (2021) → $99B by 2027, growing at 6.1% CAGR, driven by infectious and chronic disease incidence and automated platform adoption

**Company Analysis**

- Mission: "enabling customers to make the world healthier, cleaner and safer"
- Growth strategy rests on three pillars: developing high-impact innovative products, leveraging scale in high-growth and emerging markets, and delivering a unique value proposition
- Aggressive acquisition model: formed by merger, then made ~40 further acquisitions — including PeproTech ($1.85B, Dec 2021), PPD ($17.4B clinical research organisation, Dec 2021), Mesa BioTech (Feb 2021), and Propel Labs cell sorting technology (Feb 2021)
- $3B share buyback programme authorised (Q3 2021)
- Committed to net-zero carbon emissions by 2050; 30% GHG reduction target by 2030
- Named on Forbes most female-friendly companies list; 100% LGBTQ+ workplace equality rating (HRC) for seventh consecutive year

**Competitor Analysis**

| Competitor | Revenue | Market Cap | Focus |
|---|---|---|---|
| Roche | $61.2B | $323.95B | Pharma + diagnostics |
| Abbott | $43.1B | $212.2B | Diagnostics, medical devices |
| Danaher | $29.5B | $180.3B | Life sciences, diagnostics, environmental |
| Ingersoll Rand | $5.2B | $19.2B | Industrial flow & compression |

Thermo Fisher competes across all segments but differentiates through its breadth of portfolio (equipment, consumables, reagents, software) and acquisition-driven knowledge accumulation.

**Financial Analysis**

- Revenue CAGR of 12.64% since 2018 — stable, accelerating growth
- P/E ratio of 28 — in line with peers
- **PEG ratio of 1.85** — more attractive than most competitors, indicating the company is growing faster than its valuation implies
- Low dividend payout (quarterly dividend of $0.26/share) with the majority of capital returned via share buybacks rather than dividends
- Strong net earnings and profit margins in line with the peer group; efficient asset management

**Technical Analysis**

- At time of analysis: stock trading **below** both the 50 and 200 SMA — a short-term bearish signal, but interpreted as a buying opportunity rather than a structural break
- RSI reaching oversold territory — a classic mean-reversion setup in a fundamentally strong company
- Year-to-date: down -18% (in line with broader market correction)
- Three-year performance: **up +96%**, outperforming both the S&P 500 and OMXS30 over the longer horizon
- The team interpreted the dip as a discount entry point into a high-quality compounder

**Conclusion: STRONG BUY**

Thermo Fisher combines defensively positioned, structurally growing markets with an acquisition-driven growth engine and strong financial fundamentals. The short-term technical weakness (below SMAs, oversold RSI) provided an attractive entry point into a company with a multi-decade track record of compounding shareholder value. The team's strong conviction was reflected in a STRONG BUY recommendation.
    `,
    roles: ['Lead Analyst', 'Financial Analyst'],
    keywords: ['Equity Research', 'Life Sciences', 'Healthcare', 'Fundamental Analysis', 'Technical Analysis', 'Comparable Company Analysis', 'Financial Ratios', 'Buy Recommendation'],
    image: '/images/finance.jpg',
  },
  {
    slug: 'investment-yamana',
    title: 'Yamana Gold — Equity Research & Investment Analysis',
    client: 'Investment Club, Jönköping University',
    period: 'Q1 2022',
    startYear: 2022,
    dateStart: [2022, 2],
    dateEnd: [2022, 3],
    category: 'hobby',
    summary:
      'Full equity research report on Yamana Gold Inc produced for the university investment club during a period of surging inflation and the Russia-Ukraine war. Covered gold market dynamics, mine portfolio analysis, financial ratios, comparable company valuation, and technical analysis — culminating in a BUY recommendation.',
    fullDescription: `
**Team:** Robin Larsson (Lead Analyst), Rasmus Bogren, Valeria Vitale

Yamana Gold was the second investment candidate of the university investment club cycle. The analysis was produced during Q1 2022 — a period of surging global inflation and the outbreak of the Russia-Ukraine war — both highly relevant to the precious metals investment thesis.

**Company Overview**

Yamana Gold is a Canadian-based precious metals producer (founded 1994) mining gold (88% of production) and silver (12%) across five long-life, fully or majority-owned mines in the Americas. Listed on the Toronto Stock Exchange, New York Stock Exchange, and London Stock Exchange with ~5,000 employees.

**Mine Portfolio**

- **Canadian Malartic** (Quebec): Largest gold mine in Canada; 50% owned; 1.77M oz reserves; mine life until 2039
- **Cerro Moro** (Argentina): Gold + silver; 457K oz gold and 22.2M oz silver reserves; 5–10 year life
- **El Penon** (Chile): Gold + silver; 6–8 year life, extendable with further exploration
- **Jacobina** (Brazil): Located on one of the world's largest gold reserves; 2.94M oz probable reserves; production doubled since 2014
- **Minera Florida** (Chile): 30+ years in operation; long-term production expansion underway

**Market Analysis**

- Global gold mining market projected to grow from $214.1B (2021) to $249.6B by 2026 at 3.1% CAGR
- Key demand drivers: inflation hedging, investment ETFs, rising jewellery demand in Asia
- At time of analysis: inflation surging globally, Russia-Ukraine war driving energy prices and market uncertainty — both directly favourable for gold and silver prices
- Deflationary risk: rising interest rates could suppress gold prices if inflation is brought under control quickly

**Company Analysis**

- Management holds significant personal stakes (CEO: 572K shares; Executive Chairman: 2.77M shares) — strong shareholder alignment
- No operations in Russia or Ukraine — competitors with Russian mines faced forced shutdowns and sanctions risk
- Recognised for sustainability practices — strategic advantage for new mine permitting with governments and local communities
- Largest institutional holder: VanEck (10.6%) — the world's leading gold ETF provider; strong sector-specialist backing

**Financial Analysis**

- Revenue stable over the past decade with 17% YoY growth at time of analysis; revenue closely tracks gold price movements
- Average production cost ~900 USD/oz; gold price significantly above this level, yielding healthy margins
- Low debt/equity ratio; small dividend paid to shareholders while retaining most profits for reinvestment
- Comparable company analysis vs. Newmont, Barrick, Kinross, and Agnico Eagle: Yamana near the **25th percentile of EV/Revenue** — trading below peers, suggesting undervaluation relative to similar operators

**Technical Analysis**

- Trading above both the 50 and 200 SMA — confirmed long-term uptrend
- Strong momentum; outperformed the S&P 500 over the preceding 6 months
- Technical setup supported continued upside in line with the macro thesis

**Key Risks Assessed**

- Gold/silver price sensitivity — margins directly tied to commodity prices, which can reverse quickly
- Acquisition risk — as a smaller producer, potential takeover target (short-term price upside but loss of long-term holding)
- Mine lifetime — all mines have finite reserves, though current lifetimes range from 5 to 40+ years with extension potential

**Conclusion: BUY**

Yamana Gold offered a well-timed inflation hedge with an operationally robust, Americas-only portfolio. The combination of a rising gold price environment, no geopolitical exposure to Russia, solid balance sheet, Americas-focused ESG-recognised operations, and undervaluation relative to peers made Yamana a compelling buy recommendation for the portfolio.
    `,
    roles: ['Lead Analyst', 'Financial Analyst'],
    keywords: ['Equity Research', 'Precious Metals', 'Gold Mining', 'Fundamental Analysis', 'Technical Analysis', 'Comparable Company Analysis', 'Inflation Hedge', 'Buy Recommendation'],
    image: '/images/finance.jpg',
  },
  {
    slug: 'ubit-consulting',
    title: 'Ubit — Digital Startup Consulting',
    client: 'Ubit',
    period: 'Feb 2023 – Apr 2025',
    startYear: 2023,
    dateStart: [2023, 2],
    dateEnd: [2025, 4],
    category: 'professional',
    summary:
      'Worked at Ubit, a digital consulting firm helping non-technical startup founders build their first MVP or MLP. Delivered four platforms across EdTech, fintech, e-commerce, and events — all as sole technical lead.',
    fullDescription: `
Ubit is a digital startup consultancy helping non-technical founders turn ideas into testable, investable digital products.

**The model:** Work directly with founders to build a platform validating their 2–3 core hypotheses, with 1–2 years of future development in mind — written so other developers could continue it cleanly.

**Engagements delivered at Ubit:**

- **Ingenius** (Jun 2023 – Feb 2024) — AI-personalised global EdTech platform
- **Celebratix** (Feb 2023 – Jun 2023) — B2B2C event ticketing for Netherlands festivals
- **Secondry** (Sep 2024 – Jan 2025) — Fintech platform for trading unlisted Swedish shares
- **All White Online / Price Engine** (Feb 2024 – Apr 2025) — Competitive pricing intelligence for European e-commerce

**Additional services delivered:**
- Data analysis and growth hacking
- Exit-strategy development (building asset value for acquisition)
- UI/UX design and information architecture
- SEO ranking improvement
- Product strategy using LEAN Startup, Agile, and Blue/Red Ocean frameworks

Robin operated as sole technical owner on each engagement — from first conversation with the founder to production deployment.
    `,
    roles: ['Tech Lead', 'Solution Architect', 'Full Stack Developer'],
    keywords: ['Next.js', 'React', 'TypeScript', '.NET Core', 'LEAN Startup', 'MVP Development', 'Product Strategy', 'Full Stack', 'Growth Hacking', 'SEO', 'Architecture', 'Startup Consulting'],
    image: '/images/consulting.jpg',
  },
  {
    slug: 'sopra-steria',
    title: 'Sopra Steria — Senior AI & Software Consultant',
    client: 'Sopra Steria',
    period: 'May 2025 – Present',
    startYear: 2025,
    dateStart: [2025, 5],
    dateEnd: null,
    category: 'professional',
    summary:
      'Employed as a Senior Consultant at Sopra Steria — one of Europe\'s leading IT and digital transformation consultancies — delivering AI integrations and .NET development across public and private sector clients in Sweden.',
    fullDescription: `
Sopra Steria is one of Europe's leading IT consulting and digital transformation firms, with over 50,000 employees across 30 countries. Robin joined as a Senior Consultant in May 2025.

**Current engagement: Region Stockholm — Hjälpmedelsportalen (May 2025 – Feb 2026)**

Working as Technical Owner, Solution Architect, .NET Developer, Tester, and Requirements Manager on the Stockholm Region's Assistive Devices Portal — a production system serving 300+ healthcare suppliers across the Stockholm County.

See the [Hjälpmedelsportalen project](/projects/hjalpmedelsportalen/) for full details.

**Role at Sopra Steria:**

Robin operates at the intersection of technical delivery and client advisory — taking broad responsibility across the full development chain, from architecture decisions and stakeholder communication to hands-on implementation and quality assurance.

His focus areas within Sopra Steria align with the firm's AI & Data practice and .NET engineering capability:
- AI integration and agentic system design
- Solution architecture for public sector platforms
- Technical ownership of complex integration projects
- Full-stack .NET development (C#, EF Core, REST APIs, Azure)
    `,
    roles: ['Senior Consultant', 'Technical Owner', 'Solution Architect', '.NET Developer'],
    keywords: ['.NET Core', 'C#', 'Azure', 'AI Integration', 'Solution Architecture', 'Public Sector', 'Technical Ownership', 'Consulting'],
    image: '/images/consulting.jpg',
    featured: true,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const idx = projects.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  }
}
