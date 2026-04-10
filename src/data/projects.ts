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
    keywords: ['Generative AI', 'Lean Startup', 'Product Strategy', 'A/B Testing', 'Architecture', 'TypeScript', 'Next.js', 'AI Integration'],
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
    keywords: ['.NET Core', 'Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'BankID', 'Real-time', 'E-signature', 'Fintech', 'RBAC'],
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
    roles: ['Requirements Analyst', 'Tech Lead', 'Solution Architect', 'Full Stack Developer'],
    keywords: ['Next.js', '.NET Core', 'TypeScript', 'SQL Server', 'Azure', 'Docker', 'CI/CD', 'Web Scraping', 'Data Engineering', 'E-commerce'],
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
    keywords: ['Node.js', 'TypeScript', 'Next.js', 'Azure', 'CMS', 'Generative AI', 'Video Streaming', 'Docker', 'RBAC', 'EdTech'],
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
    keywords: ['.NET Core', 'TypeScript', 'Azure', 'SQL Server', 'Docker', 'QR Codes', 'ETL', 'Data Visualization', 'B2B2C', 'Events'],
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
    title: 'Civil Engineer in Robotics — Three Master\'s Theses',
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
    slug: 'ubit-consulting',
    title: 'Ubit — Digital Startup Consulting',
    client: 'Ubit (own company)',
    period: 'Feb 2023 – Apr 2025',
    startYear: 2023,
    dateStart: [2023, 2],
    dateEnd: [2025, 4],
    category: 'professional',
    summary:
      'Founded and ran Ubit, a digital consulting firm helping non-technical startup founders build their first MVP or MLP. Delivered five platforms across EdTech, fintech, e-commerce, events, and retail media — all as sole technical lead.',
    fullDescription: `
Ubit was Robin's own digital startup consultancy, founded to help non-technical founders turn ideas into testable, investable digital products.

**The model:** Work directly with founders to build a platform validating their 2–3 core hypotheses, with 1–2 years of future development in mind — written so other developers could continue it cleanly.

**Engagements delivered under Ubit:**

- **Ingenius** (Jun 2023 – Feb 2024) — AI-personalised global EdTech platform
- **Celebratix** (Feb 2023 – Jun 2023) — B2B2C event ticketing for Netherlands festivals
- **Secondry** (Sep 2024 – Jan 2025) — Fintech platform for trading unlisted Swedish shares
- **All White Online / Price Engine** (Feb 2024 – Apr 2025) — Competitive pricing intelligence for European e-commerce
- **Elefant** (Feb 2024 – Apr 2025) — Retail Media Network with physical + digital advertising

**Additional services delivered:**
- Data analysis and growth hacking
- Exit-strategy development (building asset value for acquisition)
- UI/UX design and information architecture
- SEO ranking improvement
- Product strategy using LEAN Startup, Agile, and Blue/Red Ocean frameworks

Robin operated as sole technical owner on each engagement — from first conversation with the founder to production deployment.
    `,
    roles: ['Founder', 'Tech Lead', 'Solution Architect', 'Full Stack Developer'],
    keywords: ['LEAN Startup', 'MVP Development', 'Product Strategy', 'Full Stack', 'Growth Hacking', 'SEO', 'Architecture', 'Startup Consulting'],
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
