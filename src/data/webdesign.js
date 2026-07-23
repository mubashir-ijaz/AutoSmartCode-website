/**
 * Web design landing pages — the second half of the business.
 *
 * These target a completely different buyer from everything else on the site.
 * A salon owner searching "salon website design" is not the person searching
 * "autoscout24 scraper", and copy written for one repels the other. Same
 * domain, same authority, deliberately different tone: no anti-bot talk, no
 * Python, no proxy rotation — just what they get and what it costs.
 *
 * Shape:
 *   slug        root-level URL, exact-match to the query
 *   nav         short label
 *   h1          visible heading
 *   metaTitle / metaDesc / keywords   as elsewhere
 *   problem     the situation the buyer is already in
 *   answer      what gets built instead
 *   includes    what's in every build
 *   process     the steps, in the buyer's language
 *   signals     symptoms of the problem — the "is this me?" checklist
 *   faqs        visible on the page and emitted as FAQPage schema
 *   siblings    cross-links within the cluster
 */

export const webdesign = [
  {
    slug: "small-business-website-design",
    nav: "Small Business Websites",
    emoji: "🏪",
    color: "#34d399",
    h1: "Small Business Website Design",
    metaTitle: "Small Business Website Design — Fast, Modern, Affordable",
    metaDesc:
      "Websites for small businesses that load fast, work on phones and actually bring in enquiries. Fixed price, live in under two weeks, and you own everything.",
    keywords: [
      "small business website design",
      "affordable website for small business",
      "website for local business",
      "small business web developer",
      "cheap professional website design",
    ],
    tagline: "Most small business websites were built once, years ago, by someone who has since stopped answering emails.",
    problem:
      "The usual story is some version of this: the site was built five years ago by a relative or a cheap agency, it has never been updated, it takes six seconds to load, it looks broken on a phone, and nobody can edit it because the person who made it is gone and no one knows where it is hosted. Meanwhile it is the first thing every prospective customer sees, and roughly half of them leave before it finishes loading.",
    answer:
      "What replaces it is a small, fast, modern site that says clearly what you do, who you do it for, and how to get in touch — built to load in under two seconds on a phone on mobile data, structured so Google can actually read it, and handed over with everything in your own accounts. No page builder subscription, no proprietary platform, no monthly fee to keep your own website online.",
    signals: [
      "It takes more than three seconds to load",
      "It looks wrong or requires pinching to read on a phone",
      "You cannot update your own opening hours or prices",
      "It still shows a phone number or address you no longer use",
      "You do not appear on Google for your own business type in your own town",
      "There is no clear way for a visitor to contact you without scrolling",
      "You are not sure who owns the domain or where it is hosted",
    ],
    includes: [
      "A fast, mobile-first site — typically 4 to 8 pages",
      "Copy written or tightened up, not left as placeholder text",
      "Contact form that reaches your actual inbox reliably",
      "Google Business Profile connected and local SEO set up",
      "Google Analytics so you can see what visitors do",
      "SSL, hosting and domain configured in your own accounts",
      "A simple way for you to edit text yourself afterwards",
      "Everything handed over — code, accounts, domain, all yours",
    ],
    process: [
      { n: "01", h: "A conversation, not a brief", p: "You tell me what your business does and who your customers are. No technical questions, no design vocabulary required." },
      { n: "02", h: "Fixed price within 24 hours", p: "You get a page count, a price and a date. Not an hourly estimate that grows — the number you are told is the number you pay." },
      { n: "03", h: "You see it as it is built", p: "A live link from the first day, updated as pages appear. Changes are cheap while it is being built and expensive after launch, so this is where feedback matters." },
      { n: "04", h: "Live, and yours", p: "Deployed to your accounts, domain pointed, Google notified, analytics running. You own the domain, the hosting and the code outright." },
    ],
    faqs: [
      {
        q: "How much does a small business website cost?",
        a: "Most small business sites land between $800 and $2,000 depending on page count and whether copy and photography need work. You get a fixed price before anything starts, and it does not move unless you add pages.",
      },
      {
        q: "How long does it take?",
        a: "Usually under two weeks from the first conversation to going live. The part that slows projects down is almost never the building — it is waiting on text and photos from the business, so having those ready makes it faster.",
      },
      {
        q: "Do I have to pay a monthly fee?",
        a: "Not to me. Hosting for a site this size is typically free to a few dollars a month on your own account, and your domain renews annually as it always has. There is no retainer and no licence — if you never speak to me again, your website keeps working.",
      },
      {
        q: "Can I edit it myself afterwards?",
        a: "Yes. Text and images are editable without touching code, and you get a short walkthrough at handover. Structural changes — new page types, new sections — are worth asking me about, but changing your opening hours is not.",
      },
      {
        q: "Will it help me show up on Google?",
        a: "It removes the technical reasons you are invisible: it loads fast, it is readable by crawlers, it has proper page structure and local business markup, and your Google Business Profile gets connected properly. Ranking beyond that comes from reviews and from other local sites linking to you — which I will point you at, but cannot manufacture.",
      },
      {
        q: "What if I already have a website?",
        a: "Then this is a redesign, which is usually easier — the content exists and the domain has history worth keeping. What matters is doing the redirects properly so you do not lose whatever ranking you already have.",
      },
    ],
    siblings: ["website-redesign-services", "salon-website-design", "restaurant-website-design"],
  },

  {
    slug: "website-redesign-services",
    nav: "Website Redesign",
    emoji: "🔧",
    color: "#60a5fa",
    h1: "Website Redesign Services",
    metaTitle: "Website Redesign Services — Fix a Slow, Dated or Broken Site",
    metaDesc:
      "Redesign for websites that are slow, dated or broken on mobile — without losing the Google ranking you already have. Fixed price, live in two weeks.",
    keywords: [
      "website redesign services",
      "redesign my website",
      "fix slow website",
      "modernise old website",
      "website makeover small business",
    ],
    tagline: "A redesign that loses your existing Google ranking is not a redesign, it is a reset. Most of them do exactly that.",
    problem:
      "A site that has been running for years has something genuinely valuable attached to it: history. Google knows the URLs, other sites link to some of them, and a few pages quietly bring in traffic that nobody has ever looked at. The standard redesign throws all of that away — new URLs, no redirects, and three months later the enquiries have not come back and nobody can work out why.",
    answer:
      "The rebuild is the easy half. The half that decides whether it works is the migration: every existing URL mapped to its replacement, 301 redirects in place before launch, the pages that already earn traffic identified and kept rather than quietly dropped, and the whole thing checked in Search Console afterwards. Done properly, a redesign holds its rankings through the change and improves from there because the new site is faster.",
    signals: [
      "The site loads slowly and visitors leave before it finishes",
      "It looks dated next to competitors in the same search results",
      "It breaks or needs pinching on a phone",
      "Enquiries have dropped without an obvious cause",
      "It runs on a platform or theme that is no longer supported",
      "You have been quoted for a rebuild and nobody mentioned redirects",
      "It has security warnings, or no SSL at all",
    ],
    includes: [
      "Full crawl of the existing site before anything changes",
      "Every URL mapped and 301-redirected to its replacement",
      "Existing traffic and ranking pages identified and preserved",
      "Rebuild on a fast modern stack with the content intact",
      "Core Web Vitals tuned before launch, not after",
      "Search Console checked post-launch for crawl and index errors",
      "Analytics carried across so history is not lost",
      "All accounts, code and domain in your own name",
    ],
    process: [
      { n: "01", h: "Audit what you already have", p: "A crawl of the current site plus whatever Analytics and Search Console data exists, to find which pages are actually earning something. Usually at least one surprise." },
      { n: "02", h: "Map old to new", p: "Every existing URL gets a destination on the new site before a single page is built. This is the step that gets skipped, and it is the one that costs rankings." },
      { n: "03", h: "Rebuild fast", p: "New site on a modern stack, content carried across and tightened, speed handled during the build rather than bolted on afterwards." },
      { n: "04", h: "Launch and watch", p: "Redirects go live with the site, Search Console gets checked for crawl errors in the following days, and anything that moved wrong gets fixed while it still matters." },
    ],
    faqs: [
      {
        q: "Will a redesign lose my Google rankings?",
        a: "It will if the redirects are not done, which is why most redesigns cost traffic. Every old URL gets a 301 to its replacement before launch, and Search Console gets checked afterwards. Done that way, rankings carry across and usually improve, because the new site is faster.",
      },
      {
        q: "How much does a website redesign cost?",
        a: "Most small business redesigns land between $900 and $2,500 depending on how many pages carry across and how much of the content needs rewriting. The migration work is included rather than being an add-on you find out about later.",
      },
      {
        q: "Can you keep my existing design?",
        a: "If it still works, yes — sometimes the problem is speed and mobile behaviour rather than looks, and rebuilding the same design on a better foundation is the cheaper and less disruptive answer. I will tell you which situation you are in honestly.",
      },
      {
        q: "What if I do not have Analytics or Search Console?",
        a: "Then we set both up as step one and work from a crawl of the existing site instead. It is less information than I would like, but it is still enough to map URLs properly and avoid the damage.",
      },
      {
        q: "How long will my site be down?",
        a: "It is not. The new site is built and tested on a separate address, and the switch happens once everything is ready — redirects included. The changeover is a few minutes, not a few days.",
      },
    ],
    siblings: ["small-business-website-design", "salon-website-design", "restaurant-website-design"],
  },

  {
    slug: "salon-website-design",
    nav: "Salon Websites",
    emoji: "💇",
    color: "#fb7185",
    h1: "Salon & Barbershop Website Design",
    metaTitle: "Salon Website Design — Online Booking That Fills Chairs",
    metaDesc:
      "Websites for salons, barbershops and spas with online booking, a real gallery and Google Maps set up properly. Live in two weeks, fixed price, no monthly fee.",
    keywords: [
      "salon website design",
      "barbershop website design",
      "salon website developer",
      "hair salon website with booking",
      "spa website design",
    ],
    tagline: "Half your bookings are attempted after 8pm, when nobody is there to answer the phone.",
    problem:
      "Salons lose bookings in a specific and measurable way: someone decides at nine in the evening that they want a cut on Saturday, they find you on their phone, and the only way to book is a phone number that nobody will answer for twelve hours. By morning they have booked with whoever had a button. The website is not failing because it is ugly — it is failing because it asks the customer to wait.",
    answer:
      "A salon site is a short list of things done properly: a booking system that works on a phone at midnight, a gallery of your actual work rather than stock photos of someone else's, prices where people can find them, and a Google Business Profile set up so you turn up on Maps when someone searches for a salon near them. Everything else is decoration.",
    signals: [
      "Bookings only happen by phone, during opening hours",
      "Your gallery is stock photography, not your own work",
      "Prices are not on the site, so people call to ask and you lose the time",
      "You do not appear on Google Maps for your area",
      "Your Instagram is more current than your website",
      "The site does not show which stylist does what",
      "Customers say they could not find your opening hours",
    ],
    includes: [
      "Online booking that works on a phone, integrated with your system",
      "Gallery built for your own photos, easy to add to",
      "Service and price list that you can update yourself",
      "Stylist or barber profiles with individual specialisms",
      "Google Business Profile set up and connected to the site",
      "Google Maps, directions and parking information",
      "Instagram feed pulled in so the site stays current on its own",
      "Reviews displayed where new customers will see them",
    ],
    process: [
      { n: "01", h: "Your services and your prices", p: "Send the service list, the prices and whatever booking system you already use — Fresha, Booksy, Square, or a paper diary. All of them can work." },
      { n: "02", h: "Fixed price within 24 hours", p: "A page count, a number and a date. If you need photography or your booking system needs migrating, that is priced up front rather than discovered later." },
      { n: "03", h: "Built and shown", p: "A live link from day one so you can see it come together, and so the stylists can tell you what is missing before it goes live rather than after." },
      { n: "04", h: "Live and on the map", p: "Site launched, booking tested end to end on a real phone, Google Business Profile verified and connected. You own all of it." },
    ],
    faqs: [
      {
        q: "Can you connect my existing booking system?",
        a: "Yes. Fresha, Booksy, Square Appointments, Vagaro, Treatwell and most others integrate directly, so you keep the system your team already knows and the website just becomes a better front door to it.",
      },
      {
        q: "What if I do not have a booking system yet?",
        a: "Then one gets set up as part of the build. Which one depends on your size and whether you need per-stylist calendars — there is a sensible free or cheap option for most salons, and I will recommend the one that fits rather than the one that pays a referral.",
      },
      {
        q: "How much does a salon website cost?",
        a: "Most salon sites land between $800 and $1,800 depending on page count, how many stylists need profiles and whether booking needs migrating. Fixed price up front, no monthly fee to me.",
      },
      {
        q: "Will it help me show up on Google Maps?",
        a: "Getting your Google Business Profile properly set up, verified and connected to the site is part of the build, and for a local salon that matters more than almost anything else on the website. Reviews do the rest, and those you have to earn.",
      },
      {
        q: "Can I add my own photos afterwards?",
        a: "Yes — the gallery is built to be added to without touching code, and you get a walkthrough at handover. Most salons update it monthly, and the ones that do get noticeably more enquiries than the ones that do not.",
      },
    ],
    siblings: ["restaurant-website-design", "small-business-website-design", "website-redesign-services"],
  },

  {
    slug: "restaurant-website-design",
    nav: "Restaurant Websites",
    emoji: "🍽️",
    color: "#fbbf24",
    h1: "Restaurant & Cafe Website Design",
    metaTitle: "Restaurant Website Design — Menu, Bookings & Google Maps",
    metaDesc:
      "Websites for restaurants and cafes with a readable menu, table booking, and Google set up properly so you appear when someone searches for food nearby.",
    keywords: [
      "restaurant website design",
      "cafe website design",
      "restaurant website with online menu",
      "restaurant web developer",
      "takeaway website design",
    ],
    tagline: "A menu as a PDF is a menu nobody reads on a phone — which is where almost everyone is reading it.",
    problem:
      "The single most common failure in restaurant websites is the menu being a PDF. Someone standing on the street decides where to eat, taps your menu, waits for a download, gets a document they have to pinch and drag around, and gives up. Google cannot read it either, so you do not appear when someone searches for the dish you are known for. That one decision costs more covers than any design choice on the site.",
    answer:
      "The menu becomes part of the page — readable on a phone at arm's length, updatable by you when a price changes or a dish comes off, and readable by Google so your dishes can appear in search. Around that: table booking that works on a phone, real photographs of your own food, opening hours that are correct, and a Google Business Profile set up so you turn up on Maps when someone nearby is hungry.",
    signals: [
      "Your menu is a PDF, or an image of a printed menu",
      "Prices on the site are out of date because updating it is a hassle",
      "Booking is phone-only during service, when nobody can answer",
      "You do not appear on Google Maps for food searches nearby",
      "The photos are stock images of food you do not serve",
      "Opening hours differ between your site, Google and the door",
      "The site does not work properly on a phone",
    ],
    includes: [
      "Menu as real text — readable on a phone, readable by Google",
      "You can update dishes and prices yourself in minutes",
      "Table booking integrated with OpenTable, Resy or your own system",
      "Gallery for your own food and room photography",
      "Google Business Profile set up, verified and connected",
      "Opening hours in one place, synced to Google",
      "Directions, parking and accessibility information",
      "Restaurant and menu structured data so dishes can show in search",
    ],
    process: [
      { n: "01", h: "Menu, hours, photos", p: "Send the current menu, your opening hours and whatever photography you have. If the photos are weak, I will say so — it matters more here than on any other kind of site." },
      { n: "02", h: "Fixed price within 24 hours", p: "Page count, price, date. Booking integration and menu migration are priced up front, not discovered halfway through." },
      { n: "03", h: "Built and shown", p: "A live link from the start so front of house can check the menu is right before customers do." },
      { n: "04", h: "Live and findable", p: "Launched, booking tested on a real phone, Google Business Profile verified, hours synced. All accounts in your name." },
    ],
    faqs: [
      {
        q: "Why is a PDF menu a problem?",
        a: "Two reasons, and both cost covers. Phones handle PDFs badly, so a hungry person on the street gives up before reading it. And Google cannot index the dishes inside it, so you never appear when someone searches for the thing you are best at. A text menu fixes both at once.",
      },
      {
        q: "Can I update the menu myself?",
        a: "Yes, and you should — that is the whole point of moving off a PDF. Changing a price or removing a dish takes a minute from a phone, without calling anyone.",
      },
      {
        q: "Can you set up online table booking?",
        a: "Yes. OpenTable, Resy, SevenRooms and Google's own reservation system all integrate, or a simple built-in form works if you are not on a platform yet and do not want the monthly cost.",
      },
      {
        q: "How much does a restaurant website cost?",
        a: "Most restaurant sites land between $900 and $2,000 depending on menu size, booking integration and how many pages you need. Fixed price up front, no monthly fee to me.",
      },
      {
        q: "Will this help me show up when people search for food nearby?",
        a: "It removes the technical reasons you do not: readable menu text, correct structured data, fast mobile loading, and a properly verified Google Business Profile with hours that match. Beyond that, local search is driven by reviews and proximity, and neither of those is something a website can manufacture.",
      },
    ],
    siblings: ["salon-website-design", "small-business-website-design", "website-redesign-services"],
  },
];

export const webdesignBySlug = slug => webdesign.find(w => w.slug === slug);
