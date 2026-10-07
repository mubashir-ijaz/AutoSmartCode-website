/**
 * Service landing pages — one page per commercial search term.
 *
 * Search Console showed the site picking up impressions for narrow queries
 * ("dealer inventory scraper", "autoscout24 scraper", "carmax scraper") at
 * position ~56 with nothing but the homepage to rank. A homepage cannot rank
 * for six different services at once; each of these is the page Google gets
 * to put against one intent.
 *
 * Shape:
 *   slug        URL segment under /services/
 *   nav         short label for menus
 *   h1          the visible page heading (carries the primary keyword)
 *   metaTitle   <title> — keep under ~60 chars before the brand
 *   metaDesc    <meta description> — 140–158 chars, written to be clicked
 *   keywords    the query cluster this page is answering (used in schema)
 *   sections    body copy: { h, p[], list? }
 *   deliverables/platforms/stack   the scannable proof columns
 *   faqs        rendered on the page AND emitted as FAQPage schema —
 *               never emit a question that isn't visible on the page
 *   related     slugs of sibling pages, for internal linking
 *   caseStudy   project id in content.js to link as proof
 */

export const services = [
  /* ------------------------------------------------------------------ */
  {
    slug: "auction-run-list-triage",
    nav: "Run-List Triage & Watch List",
    emoji: "📋",
    accent: "green",
    color: "#34d399",
    h1: "Auction Run-List Triage — Watch List Built Before You Reach the Office",
    metaTitle: "Auction Run-List Triage for Dealers",
    metaDesc:
      "5,000 cars in the sale cut to the few hundred worth bidding on, overnight. Your filters, Carfax, AutoCheck and MMR per VIN, notes written, watch list by 6 AM.",
    keywords: [
      "auction run list triage",
      "auction watch list automation",
      "car auction run list software",
      "bulk vin check auction",
      "manheim run list filter",
      "auction pre bid research",
      "wholesale car buying automation",
      "auction condition report automation",
      "car auction notes automation",
      "filter 5000 auction cars",
    ],
    hero:
      "A 5,000-car sale read overnight and cut to the few hundred worth your morning — each one annotated, each one with a max bid, sitting in your watch list before anyone is in.",
    sections: [
      {
        h: "The problem is arithmetic, not effort",
        p: [
          "A mid-week wholesale sale runs three to five thousand cars. Your buyer has maybe two hours before the first lane opens. Even at twenty seconds a car — glance at the row, check the grade, decide — that is twenty-eight hours of looking. Nobody is lazy here. The maths simply does not work.",
          "So what happens instead is that the list gets worked top-down until the sale starts, and the rest is never looked at. The cars that would have made money are distributed randomly through five thousand rows, which means most of them are in the part nobody reached.",
        ],
      },
      {
        h: "What triage actually does to a run list",
        p: [
          "Overnight, while the sale is still being loaded, the whole run list is pulled — every lot, not the first page and not a sample. Then your buy box is applied to all of it at once: years, mileage bands, makes and models, condition grade floor, title rules, lane, geography, whatever you told me matters.",
          "What survives gets the lookups your buyer would have done one car at a time, nine tabs deep: title brand check, Carfax, AutoCheck, Manheim MMR, book values, and the seller's own announcements and disclosures. Then each car gets a note written in the format your desk already reads, the ones that fail your rules are dropped with the reason kept, and the rest are pushed into the auction's own watch list ranked by margin.",
          "By six in the morning the work is done. Your buyer opens the laptop and the list is already there — not a spreadsheet to interpret, the watch list they were going to build by hand.",
        ],
      },
      {
        h: "Filters are yours, and they change by phone call",
        p: [
          "The filters are not a fixed product feature set — they are whatever you buy on. Some desks care most about grade and announced frame damage. Some will not touch a car over 90,000 miles regardless of grade. Some want Northeast cars excluded in winter, some want a specific trim level only, some run a different rule for trucks than for sedans.",
          "All of that is configuration, not code. You do not log into anything to change it and you do not pay for a revision — you tell me the rule has changed and it changes for the next sale.",
        ],
        list: [
          "Year range, and different ranges per segment",
          "Mileage ceiling, with exceptions by make",
          "Condition grade floor, per lane if you want",
          "Title status — clean only, or branded types you will accept",
          "Announced damage, frame, odometer and as-is flags",
          "Accident count and owner count ceilings from history reports",
          "Recon estimate ceiling, by your own rates",
          "Minimum margin against MMR or your retail comps",
          "Makes, models and trims you will and will not buy",
          "Lane, auction location and transport distance",
        ],
      },
      {
        h: "The notes are the part dealers underestimate",
        p: [
          "A filtered list still needs reading. What makes a watch list usable at 7 AM is that every car on it already explains itself: title and owner count, what the history report said, the MMR with its range, the grade and whether frame was announced, the recon estimate, and then the number that matters — the maximum bid that still holds your margin.",
          "Written once, in your wording, the same way every time. The useful side-effect is auditability: when a car turns out badly, the note says what was known before the bid, so you can tell the difference between a bad call and bad luck.",
        ],
      },
      {
        h: "Dropped cars keep their reason",
        p: [
          "Nothing is deleted silently. Every car that comes out of the list is logged with why — branded title, three accidents on Carfax, recon estimate over your ceiling, bidding already above MMR, odometer discrepancy declared.",
          "That matters for two reasons. It lets you check the rules are doing what you think rather than asking you to trust them, and it means that when you want to loosen a rule, you can see exactly how many cars it was costing you.",
        ],
      },
      {
        h: "Where the list lands",
        p: [
          "Most dealers want two things: the cars in the auction platform's own watch list, so the buyer logs in and they are simply there, and a ranked email or Google Sheet as the readable version. Both, usually.",
          "Beyond that it can go wherever you work — Slack or Telegram for instant alerts on a car that scores unusually well, a shared sheet the whole desk can open, a direct write into your DMS or inventory database, or a CSV into whatever tool your analyst already uses.",
        ],
      },
      {
        h: "Accounts, access and what this is not",
        p: [
          "This runs on the auction accounts you already hold and are licensed to use, and the history-report subscriptions you already pay for. I do not resell auction data, share credentials between clients, or create access you do not have. A system built on borrowed access dies the first time somebody audits it, and it takes your account with it.",
          "It also does not bid. Most platforms prohibit automated bidding outright, and the downside of a bug in a bidding bot is that you own a car nobody wanted. The system finds, checks, annotates and ranks. A person decides.",
        ],
      },
    ],
    deliverables: [
      "Every car in the sale read, not a sample",
      "Your buy box applied identically to all of them",
      "Title, Carfax, AutoCheck, MMR and book values per VIN",
      "A written note per car, in your own format",
      "Max bid per car that holds your margin",
      "Cars pushed into the auction's own watch list",
      "Ranked email or Google Sheet as the readable copy",
      "Dropped-car log with the reason for every exclusion",
      "Failure alerting, so silence never means 'no cars'",
    ],
    platforms: ["Manheim", "ADESA", "ACV Auctions", "OPENLANE", "BacklotCars", "SmartAuction", "EDGE Pipeline", "Copart", "IAA", "Your own dealer portal"],
    stack: ["Python", "Selenium", "Playwright", "Pandas", "Cookie management", "Proxy rotation", "Cron / scheduling", "SMTP"],
    faqs: [
      {
        q: "How many cars can it actually get through in one night?",
        a: "The run list itself is fast — a five-thousand-lot sale is read in minutes. The slow part is the per-VIN lookups, because those run at a rate that does not hammer your accounts. A couple of thousand VINs fully enriched overnight is routine, and since your filters have already removed most of the sale before that stage, that is normally the whole qualifying list with room spare.",
      },
      {
        q: "Can it put cars straight into my watch list on the auction site?",
        a: "Yes, on the platforms that have a watch list, using your own logged-in account. That is the version most dealers want, because the buyer does not have to do anything with a spreadsheet — they log in and the cars are already flagged. You also get the ranked email as the readable copy.",
      },
      {
        q: "What if my filters are more complicated than year and mileage?",
        a: "They usually are, and that is the point of a custom build rather than a product. Different rules per segment, recon ceilings by your own labour rates, margin floors that vary by make, exclusions on specific trims or regions — all of it is configuration. You tell me the rule in plain English and it applies from the next sale.",
      },
      {
        q: "How much does run-list triage cost?",
        a: "A single-platform build with watch-list push and daily email delivery starts around $450, plus roughly $149 a month to keep it running, which covers hosting, site changes and fixes. There is no per-car or per-seat charge — the same price covers a 900-car sale and a 6,000-car sale, and your whole desk can read the output.",
      },
      {
        q: "Can I see it work on a real sale before I commit?",
        a: "That is the normal way in. Tell me the auction and your buy box, and I will triage one actual upcoming sale and send you the watch list it produces. If the calls look wrong, we fix the rules then — before you have paid for a build. A one-off pull of a single sale is $150, and it comes off the build fee if you go ahead.",
      },
      {
        q: "Does it work on the portal I actually buy on?",
        a: "Almost certainly. Most of the trade buys on a platform nobody outside their region has heard of — a private dealer-only marketplace, a regional auction's own site, a lender's repo portal, an in-house system with a listings module bolted on. Obscure portals are usually easier than famous ones, because nobody has ever bothered to defend them. Send me the name and a couple of screenshots and you will have a straight answer within a day.",
      },
      {
        q: "What happens when the auction site changes its layout?",
        a: "It breaks, like every scraper eventually does — anyone who tells you otherwise is selling something. The difference is that you hear it from an alert the same morning rather than from three quiet days of an empty watch list, and fixes on systems I built are covered by the monthly, not quoted as a new project.",
      },
      {
        q: "Will it bid for me?",
        a: "No, and I will not build that. Most auction platforms prohibit automated bidding, and a bug in a bidding bot means you own a car you never wanted. This finds, checks, annotates and ranks. The bidding stays with your buyer.",
      },
    ],
    related: ["dealer-browser-extension", "car-auction-automation", "vehicle-history-reports"],
    caseStudy: 10,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "dealer-browser-extension",
    nav: "Custom Dealer Extension",
    emoji: "🧩",
    accent: "violet",
    color: "#a78bfa",
    h1: "Custom Dealer Browser Extension — The Autoniq Alternative You Own",
    metaTitle: "Autoniq Alternative — Custom VIN Panel",
    metaDesc:
      "An Autoniq alternative built to your spec: title, Carfax, AutoCheck, MMR and your own margin maths in one panel on the listing. Paid once, no per-seat fee.",
    /* Carries both intents now: people shopping to switch ("autoniq
       alternative") and people who already know they want one built. The
       separate comparison page was folded in here — one page, one signal. */
    keywords: [
      "autoniq alternative",
      "alternative to autoniq",
      "cheaper than autoniq",
      "autoniq competitor",
      "custom dealer browser extension",
      "vin scanner app for dealers",
      "dealer vin scanning tool",
      "auction vin lookup tool",
      "car auction browser extension",
      "dealer chrome extension development",
    ],
    hero:
      "The panel you wish was on the auction listing — VIN decoded, title checked, history pulled, MMR fetched and your own margin maths run, all in the tab you were already in. Built once, yours to keep, seats are free.",
    sections: [
      {
        h: "You already know this tool. That is the problem",
        p: [
          "Extensions like Autoniq exist because the workflow is obvious: read the VIN off the page you are looking at, go and fetch everything known about that car, and show it next to the listing instead of across nine tabs. Dealers pay per seat per month for that, and it is worth paying for.",
          "What it does not do is know your business. It does not know your recon rates, your margin floor, your transport cost from that auction, which announcements you treat as fatal, or the order your buyer wants the numbers in. So the panel tells you what the car is, and your buyer still copies three figures into their own spreadsheet to find out whether to bid. That last step is the one that matters, and it is the one no off-the-shelf tool can do for you.",
        ],
      },
      {
        h: "What a custom extension puts on the page",
        p: [
          "The same reports, plus the decision. Land on a car — or scan a VIN — and the panel fills itself with the lookups you care about, then runs your own arithmetic on top and tells you the maximum bid that still holds your margin.",
        ],
        list: [
          "VIN read straight off the listing, or scanned from a windscreen",
          "Full VIN decode — year, make, model, trim, drivetrain, engine, options",
          "Title brand check, and the states involved",
          "Carfax — accidents, owners, service history, use type",
          "AutoCheck — score and where it sits against the class average",
          "Manheim MMR with its range, adjusted for grade and mileage",
          "Book values — J.D. Power, Galves, KBB, Black Book",
          "Seller announcements and as-is disclosures, parsed",
          "Your recon estimate, by your own labour and parts rates",
          "Your landed cost — transport, fees, floor plan",
          "Max bid to hold your margin, and a plain BID / PASS on the car",
        ],
      },
      {
        h: "Built per client, to your spec",
        p: [
          "This is not a product with a licence. It is a build: you tell me the fields, the order, the wording and the maths, and I write the extension that does exactly that on the portals you actually buy on. Two dealers who buy differently end up with two different panels, which is the entire reason this beats renting a generic one.",
          "It installs the way any Chrome or Edge extension does, loaded from a file or through your own workspace, and it runs against your own logged-in sessions and your own report subscriptions. It does not route your data through me and it does not need an account with me to work.",
        ],
      },
      {
        h: "Looking for an Autoniq alternative?",
        p: [
          "Almost nobody goes shopping for one because the category is bad. Scan a VIN, get the reports and the book values next to the car — that workflow is correct, and the tools that do it earn their keep. Dealers come looking for an alternative for three much narrower reasons, and it is worth being honest about which one is yours, because only two of them justify a build.",
          "The first is seat cost. A per-buyer monthly fee is fine for one buyer and starts to grate at four, because the price scales with your desk while the value does not. The second is fit: the panel shows what the vendor decided every dealer needs, which means it stops exactly where your business starts — at your recon rates, your fee structure, your transport cost, your margin floor. The third is coverage: you buy on a portal the tool does not support, so on those cars you are back to nine tabs anyway.",
          "If you simply want the standard panel on the standard platforms for one or two buyers, an off-the-shelf subscription is probably the right answer, and I will tell you that rather than sell you a build.",
        ],
      },
      {
        h: "The cost comparison, done honestly",
        p: [
          "A subscription is an operating cost that never ends and scales with headcount. A build is a one-off cost that does not scale with headcount, plus an optional monthly if you want me maintaining it as the auction sites change.",
          "Which is cheaper depends entirely on your desk size and how long you keep it. One buyer, twelve months, standard platforms — a subscription probably wins. Three or more buyers, or a portal nobody supports, or arithmetic the vendor cannot do, and a build is usually ahead inside the first year and clearly ahead after that. Ask me to work it out against what you actually pay now; if the answer is that you should stay where you are, that is the answer you will get.",
        ],
      },
      {
        h: "Why it is cheaper than what you are paying now",
        p: [
          "Subscription tools charge per buyer, per month, forever, and the price goes up when your desk grows. A build is paid for once. Install it for three buyers or thirty and the cost does not move, because there is no licence server deciding what you are allowed.",
          "A typical build starts around $600, with roughly $39 a month if you want me keeping it working as the auction sites change. For most dealers that is a few months of what they were renting, after which it is theirs.",
        ],
      },
      {
        h: "What it cannot do",
        p: [
          "It cannot show you data you do not have access to. The panel pulls Carfax through your Carfax account, AutoCheck through your AutoCheck or auction access, MMR through your Manheim login. If you do not subscribe to something, no extension — mine or anyone's — can conjure it, and I would rather say that now than after you have paid.",
          "It also will not bid. Automated bidding is prohibited on most platforms and the failure mode is owning a car nobody chose. The panel tells your buyer what the car is worth; your buyer bids.",
          "And it breaks when a site changes its markup, the same as every extension does. The monthly covers fixing that. Without it, you own the code and can have anyone fix it — that is the trade you are getting.",
        ],
      },
      {
        h: "Browsers and portals",
        p: [
          "Chrome and Edge are the normal targets, because that is what dealer desks run; Firefox is possible if you need it. On the portal side, the extension is written against the specific sites you buy on, including the private ones — a dealer-only marketplace, a regional auction's own platform, a lender's repo portal, your group's in-house system.",
          "If you buy on four platforms, the panel works on all four and normalises the output, so your buyer reads the same layout regardless of which site the car is on.",
        ],
      },
    ],
    deliverables: [
      "A working Chrome / Edge extension, built to your spec",
      "VIN read from the listing, or scanned",
      "Every report you subscribe to, in one panel",
      "Your recon, fees and margin maths run on the car",
      "Max bid and a plain BID / PASS verdict",
      "Works across every portal you buy on, one layout",
      "Installs for your whole desk — no per-seat fee",
      "Source code is yours, not licensed to you",
    ],
    platforms: ["Manheim", "ADESA", "ACV Auctions", "OPENLANE", "Copart", "IAA", "Carfax", "AutoCheck", "Chrome", "Edge", "Your own dealer portal"],
    stack: ["JavaScript", "Chrome Extension APIs", "Manifest V3", "Python", "REST APIs", "Playwright"],
    faqs: [
      {
        q: "What is the best Autoniq alternative for a small dealer?",
        a: "If you have one or two buyers and you buy on the major platforms, the honest answer is usually another off-the-shelf subscription rather than a custom build — the maths does not favour a build at that size. A custom panel starts to make sense at around three buyers, or immediately if you buy on a portal no tool supports, or if your bid decision depends on recon and fee numbers no vendor has.",
      },
      {
        q: "Can it do everything Autoniq does?",
        a: "It can do the parts you actually use, which is usually not the whole feature list. The approach is to watch what your buyer does with the tool today, rebuild exactly that, and then add the arithmetic no off-the-shelf panel can do. Anything you rely on that I cannot replicate, I will tell you about before you commission the build rather than after.",
      },
      {
        q: "Is this just a copy of Autoniq?",
        a: "No — it is the same workflow built to your spec instead of to an average dealer's. Autoniq decides what the panel shows; on a custom build you do. The practical difference is that your recon rates, fee structure and margin floor are in the panel, so it ends on a max bid rather than on data you still have to interpret.",
      },
      {
        q: "How much does a custom dealer extension cost?",
        a: "Builds start around $600 one-off, plus about $39 a month if you want me maintaining it as the auction sites change. There is no per-seat charge — install it for your whole desk at the same price. Compared with a per-buyer monthly subscription it usually pays for itself inside a few months.",
      },
      {
        q: "Do I need my own Carfax, AutoCheck and MMR subscriptions?",
        a: "Yes. The extension works through the accounts you already hold — it automates the lookups you are entitled to make, it does not create access. If you are not subscribed to something, that row simply will not be in your panel, and I will tell you that before you commission anything rather than after.",
      },
      {
        q: "Will it work on the auction portal I use?",
        a: "Usually, including the private ones. The extension is written against the specific sites you buy on, so an in-house dealer-group system or a regional auction's own platform is a normal target rather than an exception. Send me the portal and a couple of screenshots of the car page and you will know within a day.",
      },
      {
        q: "How long does a build take?",
        a: "Most extensions are working in 5 to 10 days depending on how many portals and how many report sources are involved. You see the panel running on a real listing partway through, so the layout and the wording get settled before the maths is finished.",
      },
      {
        q: "Can my whole team use it?",
        a: "Yes, and that is one of the main reasons to build rather than rent. There is no licence check and no seat count — install it on every machine on the desk. Adding a buyer costs nothing.",
      },
      {
        q: "What happens if the auction site changes and it stops working?",
        a: "Extensions break when markup changes, the same as scrapers do. The monthly covers fixing it. If you would rather not pay a monthly, you still own the source, so you or anyone you hire can maintain it — which is not true of anything you subscribe to.",
      },
      {
        q: "Can it bid or place proxy bids for me?",
        a: "No. Automated bidding is prohibited on most platforms, and a bug in a bidding bot means you own a car you never wanted. The panel gives your buyer the number; the buyer bids.",
      },
    ],
    related: ["auction-run-list-triage", "car-auction-automation", "vehicle-history-reports"],
    caseStudy: 11,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "car-auction-automation",
    nav: "Car Auction Automation",
    emoji: "🔨",
    accent: "green",
    color: "#34d399",
    h1: "Car Auction Automation for Dealers and Wholesalers",
    metaTitle: "Car Auction Automation for Dealers",
    metaDesc:
      "Automated auction data for dealers and wholesalers. Run lists from Manheim, ADESA, ACV or the private portal you actually buy on, scored against MMR daily.",
    /* Category terms only. The brand terms — "adesa auction data",
       "backlotcars scraper", "private auction portal scraper" — belong to the
       per-platform pages that roll up to this pillar, and listing them here
       too had the site bidding against itself. */
    keywords: [
      "car auction automation",
      "auction data automation",
      "wholesale car buying software",
      "auction deal finder",
      "automate auction run lists",
      "car auction software for dealers",
      "wholesale auction data feed",
      "auction inventory automation",
      "dealer auction integration",
    ],
    hero:
      "Your buyers open six auction tabs every morning and still miss cars. This replaces that hour with an email that already has the answer in it — whichever platforms those six tabs happen to be.",
    sections: [
      {
        h: "What car auction automation actually does",
        p: [
          "A car auction automation system logs into the auction platforms you already have accounts on, reads every run list and live listing that matches your buy box, and compares each vehicle against its market value before a person looks at it. What lands in your inbox is not a data dump — it is a ranked list of the cars worth bidding on, with the numbers that justify the bid attached.",
          "The work it removes is the work nobody wants: opening Manheim, then ADESA, then BacklotCars, then Autoniq, filtering each one by hand, copying VINs into a spreadsheet, and pulling condition reports one at a time. That routine takes a buyer three to four hours a day and it still misses cars, because the profitable ones move before anyone gets to the fourth tab.",
        ],
      },
      {
        h: "Auction platforms this covers",
        p: [
          "The platforms below are ones I have built against for a paying dealer, using the dealer's own licensed account. Treat the list as examples rather than as a menu — the mechanics do not change with the logo, only the login and the page structure do.",
        ],
        list: [
          "Manheim and Manheim MMR — run lists, live pricing, MMR market values",
          "ADESA — listings, condition grades, sale calendars",
          "ACV Auctions — live lots, inspection reports, announced damage",
          "BacklotCars and OPENLANE — inventory, buy-now pricing, offer history",
          "SmartAuction — off-lease and repossessed remarketing inventory",
          "EDGE Pipeline and Simulcast — the independent auctions in your region",
          "Autoniq — VIN scan data and valuation lookups",
          "Copart and IAA — salvage and total-loss listings",
          "Facebook Marketplace, Craigslist and OfferUp — private-party sourcing",
        ],
      },
      {
        h: "The platform you actually buy on",
        p: [
          "Most of the trade does not live on the platforms that get written about. Every dealer group, wholesaler, rental remarketer, fleet operator and captive lender runs its own portal, and a working buyer's day is usually spent inside two or three of them that no article has ever mentioned — a closed dealer-only marketplace, a lender's repo portal, a manufacturer's closed sale, a wholesaler's private inventory board, an in-house system with a listings module bolted on.",
          "The most common reason a dealer decides this is not for them is looking at a supported-platform list, not seeing theirs, and assuming it cannot be done. That assumption is nearly always wrong, and an obscure portal is usually easier to work with than a famous one, because nobody has ever bothered to defend it. Send me the name and a couple of screenshots of the screens you use, and you will know within a day whether it is straightforward, awkward, or genuinely not worth doing.",
        ],
      },
      {
        h: "The arithmetic it does for you",
        p: [
          "Pulling the listings is the easy half. The half that makes money is the scoring: for each vehicle, the system takes the auction price, adds your transport, recon and fee assumptions, compares that landed cost against MMR or your own retail comps, and drops anything that does not clear the margin you set.",
          "You set the buy box once — years, mileage bands, makes, minimum margin, maximum recon, geography — and the system applies it identically to every car, every day, without the fatigue that makes a human skim the last thirty rows of a run list.",
        ],
      },
      {
        h: "How it reaches you",
        p: [
          "Most dealers take a formatted HTML email at 6 AM, sorted best deal first, with a photo, the key numbers and a direct link to the lane. Others take a Google Sheet the whole desk can open, a Slack or Telegram alert the moment a matching car appears, or a write straight into their DMS or inventory database.",
          "Systems that run unattended need to tell you when they stop working, so every build ships with alerting — if a login expires or a site changes its markup, you hear about it from the system rather than from a quiet inbox.",
        ],
      },
      {
        h: "Access, credentials and what is fair game",
        p: [
          "This runs on accounts you hold and are entitled to use. I do not resell auction data, share credentials between clients, or work around a platform's licensing — a system built on borrowed access is a system that dies the first time somebody audits it, and it takes your account with it.",
          "Where a platform publishes an official API or data feed, that is what the build uses. Where it does not, the system automates the same browser session your buyer would have opened anyway, at a request rate that does not hammer the site.",
        ],
      },
    ],
    deliverables: [
      "Daily ranked deal email before the lane opens",
      "Buy-box filtering you control without touching code",
      "Landed-cost and margin calculation per vehicle",
      "MMR / market-value comparison on every VIN",
      "Google Sheet, Excel, database or DMS delivery",
      "Slack, Telegram or SMS alerts for instant matches",
      "Failure alerting so silence never means 'no deals'",
    ],
    platforms: ["Manheim MMR", "ADESA", "ACV Auctions", "BacklotCars", "OPENLANE", "SmartAuction", "EDGE Pipeline", "Autoniq", "Copart", "IAA", "Your own dealer portal"],
    stack: ["Python", "Selenium", "Playwright", "Pandas", "Cookie management", "Proxy rotation", "Cron / scheduling", "SMTP"],
    faqs: [
      {
        q: "Do I need my own Manheim or ADESA account?",
        a: "Yes. The system automates the account you already hold and are licensed to use — it does not create access you do not have, and I do not share credentials between clients. If you have a dealer login, that is all it needs.",
      },
      {
        q: "My auction platform is not on your list. Can you still automate it?",
        a: "Almost certainly. Most dealers and wholesalers buy on a portal nobody outside their region has heard of — a private marketplace, a regional auction's own site, a lender's repo portal, an in-house system. If you can log into it, it can usually be automated, and obscure portals are typically easier than the big ones. Send me the name and a screenshot or two and you will have a straight answer within a day.",
      },
      {
        q: "Can it read several platforms into one list?",
        a: "That is the shape of most builds. Two or three platforms, one normalised schema, one ranked email with a platform column, and the same VIN appearing on two sources reconciled rather than duplicated — so you are comparing cars instead of comparing tabs.",
      },
      {
        q: "How much does a car auction automation system cost?",
        a: "A single-platform build with daily email delivery typically lands between $600 and $1,500 depending on how many sites and how much scoring logic is involved. Multi-platform pipelines with MMR reconciliation run higher. Recurring systems are quoted as a build fee plus a small monthly amount that covers hosting and fixes.",
      },
      {
        q: "How long before it is running?",
        a: "Most auction builds are live in 3 to 7 days. You see sample output from your real buy box in the first couple of days, so any misunderstanding about what counts as a good car gets caught before the full build.",
      },
      {
        q: "What happens when an auction site changes its layout?",
        a: "It breaks, like every scraper eventually does — the difference is you find out from an alert the same morning rather than from three quiet days of no deals. Fixes on systems I built are part of the arrangement, not a new project.",
      },
      {
        q: "Can it place bids automatically?",
        a: "I do not build automated bidding. Most auction platforms prohibit it outright, and the downside of a bug in a bidding bot is that you own a car you never wanted. The system finds and ranks; a person decides.",
      },
    ],
    related: ["auction-run-list-triage", "dealer-browser-extension", "vehicle-history-reports"],
    caseStudy: 1,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "vehicle-history-reports",
    nav: "Vehicle History Reports",
    emoji: "📄",
    accent: "violet",
    color: "#a78bfa",
    h1: "Vehicle History Report Automation — Carfax, AutoCheck and VIN Data",
    metaTitle: "Bulk Vehicle History Report Pulls",
    metaDesc:
      "Stop pulling history reports one VIN at a time. Bulk VIN decoding and automated Carfax or AutoCheck retrieval through your own dealer account, in one sheet.",
    /* Deliberately capability terms only. The brand-specific queries —
       "carfax scraper", "carfax report by vin", "autocheck scraper",
       "autocheck vin report" — belong to /carfax-scraper and
       /autocheck-scraper now. Two pages chasing one query beat each other;
       see the note at the top of scrapers.js. */
    keywords: [
      "vehicle history report automation",
      "car history report",
      "vehicle history report api",
      "bulk vin decoder",
      "vin lookup automation",
      "vin history data",
      "vin decoding at scale",
    ],
    hero:
      "One VIN at a time is fine for one car. For a 400-car run list it is a lost afternoon — and the reports end up as 400 PDFs nobody can sort.",
    sections: [
      {
        h: "The problem with car history reports at volume",
        p: [
          "Vehicle history reports are built for looking at one car. You paste a VIN, you read a page, you make a call. That model falls apart the moment you are appraising a whole run list or reconciling a hundred-car inventory, because the thing you actually want — accident count, title brand, owner count, odometer rollback flag, service gaps — is buried in prose across a hundred separate documents.",
          "What this service does is turn that into a table. One row per VIN, one column per fact you care about, sortable, filterable, and joinable against your auction data or your inventory feed.",
        ],
      },
      {
        h: "How the reports get pulled",
        p: [
          "Through your own dealer account. Carfax and AutoCheck both sell dealer subscriptions with report allowances, and if you hold one, the automation drives that session the same way your team would — it just does it four hundred times without stopping for lunch, and it parses each result instead of filing a PDF.",
          "Where you hold an official data agreement, the build uses the API instead of the browser, which is faster, cleaner and does not break when a page is redesigned. If you have an enterprise or API-tier arrangement with either provider, say so up front and the build changes shape accordingly.",
        ],
      },
      {
        h: "Free and public VIN data you may not be using",
        p: [
          "A surprising amount of what dealers pay for is available at no cost and no licensing risk, and a good pipeline pulls it first so paid report credits get spent only where they add something.",
        ],
        list: [
          "NHTSA vPIC — full VIN decode: make, model, year, trim, engine, plant, body class, restraint systems",
          "NHTSA recall and complaint data by VIN or by make and model",
          "NHTSA safety ratings and crash test results",
          "NMVTIS-derived title and brand data through an approved provider",
          "Manufacturer window-sticker and build-sheet lookups where published",
        ],
      },
      {
        h: "What you get back",
        p: [
          "A single sheet or database table where each row is a VIN and each column is a decision input: accident count and severity, title brand, number of owners, reported odometer readings with a rollback flag, service record density, use type — personal, fleet, rental, lease — and open recalls.",
          "Because it is structured, it becomes filterable in ways a PDF never is. Show me every car in this run list with a clean title, one owner, no accidents and no open recall. That query takes a second instead of an afternoon, and it is the same query every day.",
        ],
      },
      {
        h: "Where the line is on licensing",
        p: [
          "Carfax and AutoCheck licence their data; their terms restrict redistribution, and I will not build something that republishes their reports to third parties or resells report access you have not paid for. That is not caution for its own sake — it is the difference between a system you can run for years and one that gets your dealer account terminated.",
          "What is squarely fine: automating your own licensed account for your own inventory, decoding VINs against public government data, and structuring the results for your own internal use. That covers what almost every dealer actually wants. If your use case is outside it, I will tell you before you pay, not after.",
        ],
      },
    ],
    deliverables: [
      "Bulk VIN decode — thousands of VINs in one pass",
      "Automated report retrieval via your own dealer account",
      "Every report parsed into structured columns",
      "Accident, title-brand, owner-count and odometer flags",
      "Open recall check against NHTSA per VIN",
      "One spreadsheet, database table or API endpoint",
      "Joins straight onto your auction or inventory data",
    ],
    platforms: ["Carfax (your account)", "AutoCheck (your account)", "NHTSA vPIC", "NHTSA recalls", "NMVTIS providers", "Window sticker lookups"],
    stack: ["Python", "Requests", "Playwright", "Pandas", "PDF parsing", "REST APIs", "PostgreSQL"],
    faqs: [
      {
        q: "Can you get me Carfax reports without a Carfax account?",
        a: "No. Carfax licences its data and its terms prohibit redistribution — a system built on someone else's access gets shut down and takes the account with it. What I automate is your own dealer subscription, which is exactly what most dealers need and is entirely within their agreement.",
      },
      {
        q: "What is the difference between a VIN decode and a history report?",
        a: "A decode tells you what the car is — make, model, year, trim, engine, plant — and comes free from NHTSA's vPIC database with no licensing at all. A history report tells you what happened to the car: accidents, title brands, owners, odometer readings. Most builds use free decoding for everything and spend paid report credits only where a decision depends on history.",
      },
      {
        q: "How many VINs can it process?",
        a: "Decoding runs to tens of thousands per day with no practical ceiling. Paid report retrieval is capped by whatever your subscription allows, not by the software — the automation is built to respect that limit and to prioritise which VINs are worth a credit.",
      },
      {
        q: "Can this feed into my auction deal-finder?",
        a: "That is the usual reason people ask for it. History data joins onto the auction pipeline on VIN, so the morning deal email arrives with accident count and title status already on each row — and cars with a branded title never make the list in the first place.",
      },
      {
        q: "Do you handle AutoCheck as well as Carfax?",
        a: "Yes, and the same rules apply — your own account, your own inventory. Some dealers run both and reconcile them, which is straightforward once each report is parsed into the same set of columns.",
      },
    ],
    related: ["auction-run-list-triage", "dealer-browser-extension", "car-auction-automation"],
    caseStudy: 1,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "marketplace-government-lease-sales",
    nav: "Marketplace, Gov & Lease Sales",
    emoji: "📡",
    accent: "amber",
    color: "#fbbf24",
    h1: "Daily Marketplace, Government & Lease Sale Monitoring for Car Dealers",
    metaTitle: "Marketplace, Government & Lease Sale Alerts",
    metaDesc:
      "OPENLANE, Facebook Marketplace, eBay Motors, GovDeals, GSA Auctions and off-lease sales checked every day for your buy box. New matches in your inbox each morning.",
    keywords: [
      "facebook marketplace car alerts for dealers",
      "government vehicle auction monitoring",
      "govdeals car alerts",
      "gsa auctions vehicles",
      "off lease vehicle sales dealers",
      "lease return car auctions",
      "openlane daily listings",
      "used car sourcing automation",
      "dealer car sourcing tool",
      "find cars to buy for dealership",
    ],
    hero:
      "Every place good cars turn up outside the big lanes — OPENLANE, Facebook Marketplace, eBay Motors, government and fleet sales, off-lease and lease-return sales — checked daily against your buy box, with the matches waiting for you each morning.",
    sections: [
      {
        h: "The cheap cars are not all in the Tuesday sale",
        p: [
          "Wholesale lanes are where most of the volume is, but they are also where every other buyer is looking. The cars that leave the most margin often show up somewhere quieter: a private seller on Facebook Marketplace who wants it gone this weekend, a county retiring a fleet of pickups on GovDeals, a federal agency listing sedans on GSA Auctions, a lease-return SUV that the grounding dealer passed on and is now in an online closed sale.",
          "The problem is that these sources do not come to you. Each one has its own site, its own search, its own schedule, and none of them will tell you when the car you want is listed. Checking them by hand every day is a job nobody on a busy desk actually does — so the opportunities are simply missed.",
        ],
      },
      {
        h: "What gets watched, every day",
        p: [
          "You give me the buy box once — years, makes and models, mileage, price ceiling, distance from your store, title rules. Every source on your list is then searched on a schedule, new listings are compared against what was seen yesterday, and only the new matches come through.",
        ],
        list: [
          "OPENLANE — dealer and off-lease inventory, including closed sales on your account",
          "Facebook Marketplace — private-party vehicles across the cities you choose",
          "eBay Motors — live auctions, Buy It Now and sold prices",
          "Craigslist, AutoTrader private sellers and Cars.com private listings",
          "GovDeals, GSA Auctions, Public Surplus and municipal or police auctions",
          "Off-lease and lease-return sales — captive and bank closed sales you have access to",
          "Fleet, rental and repo remarketing portals on your account",
        ],
      },
      {
        h: "Government and fleet sales, made usable",
        p: [
          "Government vehicles are some of the best-documented used cars sold anywhere — fleet maintenance, known mileage, usually one owner — but government auction sites were built for compliance, not for dealers. Listings are spread across thousands of agencies and locations, the search tools are basic, and closing times vary by lot.",
          "The monitor reads them all into one list with the same columns as everything else: year, make, model, mileage, location, current bid, closing time and the lot link. Lots outside your distance or above your ceiling are dropped. The rest arrive with the closing time highlighted, so you only open the ones worth bidding on.",
        ],
      },
      {
        h: "Off-lease and lease-return cars, before the open sale",
        p: [
          "A leased car that comes back is usually offered to the grounding dealer first, then to a closed sale for that brand's dealers, then to the open market. Each step narrows the field of buyers. If you have access to those closed sales, the earlier you see a car the better the price — but closed-sale inventory changes daily and is easy to miss.",
          "Where you hold the account, those sales are read on the same daily schedule, checked against your buy box, and the matching VINs get the same Carfax, AutoCheck and MMR lookups as any other car.",
        ],
      },
      {
        h: "Every match checked before it reaches you",
        p: [
          "A listing is only interesting if the car is. Matches with a VIN are run through Carfax, AutoCheck and MMR on your own accounts, then a margin is calculated using your recon and transport numbers. Cars that fail your history rules are dropped with the reason logged, so the morning list is short and every line on it is worth a look.",
        ],
      },
      {
        h: "How you get it",
        p: [
          "A morning email ranked by margin is the default, with a Google Sheet holding the full history. For fast-moving sources like Facebook Marketplace, an instant SMS, Telegram or Slack alert when a strong match is listed — because a good private-party car is often gone the same day.",
        ],
      },
      {
        h: "Accounts and limits",
        p: [
          "Sources that need a login — closed lease sales, OPENLANE, fleet portals — run on your own account. Public sources are read at a gentle pace. Some platforms, Facebook in particular, restrict automated access in their terms; for those the monitor is kept to low-volume alerts on your own logged-in session, and I will explain the risk before you decide. Nothing is ever bought or bid on automatically.",
        ],
      },
    ],
    deliverables: [
      "Daily search of every source on your list",
      "Only new listings — nothing you saw yesterday",
      "Your buy box applied to every source the same way",
      "Carfax, AutoCheck and MMR per VIN where a VIN is listed",
      "Margin per car using your own recon and transport numbers",
      "Government lots with closing times highlighted",
      "Morning email ranked by margin, plus a Google Sheet",
      "Instant alerts for fast-moving private-party cars",
      "Failure alerting if a source stops returning data",
    ],
    platforms: ["OPENLANE", "Facebook Marketplace", "eBay Motors", "Craigslist", "GovDeals", "GSA Auctions", "Public Surplus", "Off-lease closed sales", "Fleet & rental portals"],
    stack: ["Python", "Playwright", "Selenium", "Pandas", "Scheduling", "SMS / Telegram alerts", "Google Sheets API"],
    faqs: [
      {
        q: "Which marketplaces can you monitor?",
        a: "OPENLANE, Facebook Marketplace, eBay Motors, Craigslist, AutoTrader and Cars.com private listings, GovDeals, GSA Auctions, Public Surplus, municipal and police auctions, and the off-lease, fleet and repo portals you have access to. If you buy somewhere that is not on the list, send me the name — most sources can be added.",
      },
      {
        q: "Can you monitor government vehicle auctions?",
        a: "Yes. GovDeals, GSA Auctions, Public Surplus and many city, county and police auctions are read daily into one list with mileage, location, current bid and closing time. Lots outside your distance or price ceiling are filtered out before you see them.",
      },
      {
        q: "What about off-lease and lease-return vehicles?",
        a: "Where you have access to closed or captive lease sales, they are checked on the same daily schedule against your buy box, and matching VINs get Carfax, AutoCheck and MMR. Seeing a lease return in the closed sale, before it reaches the open market, is usually where the better price is.",
      },
      {
        q: "Is monitoring Facebook Marketplace allowed?",
        a: "Facebook's terms restrict automated access, so it carries more risk than other sources. When a dealer wants it, it is kept to low-volume searches and alerts on their own logged-in session, and I explain the risk first. Many dealers decide eBay Motors, Craigslist and government sales cover enough private and fleet supply without it.",
      },
      {
        q: "How fast are the alerts?",
        a: "Daily is standard and suits most sources. For private-party marketplaces, where a good car can sell in hours, matches can be checked several times a day with an instant SMS, Telegram or Slack alert.",
      },
      {
        q: "What does marketplace and government sale monitoring cost?",
        a: "It depends on how many sources and how often. A daily monitor across a handful of sources with a morning email typically starts in the same range as a single auction triage build. You get a fixed quote within 24 hours of sending the list of sources and your buy box.",
      },
    ],
    related: ["auction-run-list-triage", "custom-dealer-software", "vehicle-history-reports"],
    caseStudy: 7,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "custom-dealer-software",
    nav: "Custom Dealer Software",
    emoji: "🛠️",
    accent: "cyan",
    color: "#22d3ee",
    h1: "Custom Dealer Software — Manheim, Carfax, AutoCheck & Autoniq in One System",
    metaTitle: "Custom Software for Car Dealers",
    metaDesc:
      "Custom software for car dealers and wholesalers that connects Manheim, MMR, Carfax, AutoCheck, Autoniq and your DMS into one dashboard built around how you buy.",
    keywords: [
      "custom software for car dealers",
      "dealer software development",
      "car dealer dashboard",
      "manheim carfax integration",
      "autoniq integration",
      "wholesale car business software",
      "used car buying software",
      "dealer automation software",
      "car dealer crm custom",
      "auction buying software",
    ],
    hero:
      "Your Manheim, MMR, Carfax, AutoCheck and Autoniq accounts working together in one system built around how your desk actually buys — not five logins and a spreadsheet holding it all together.",
    sections: [
      {
        h: "Five good tools, no system",
        p: [
          "Most dealers and wholesalers already pay for the right data: Manheim and MMR for wholesale values, Carfax and AutoCheck for history, Autoniq or a similar tool for VIN lookups, a DMS for inventory, and maybe a book-value service on top. Each is good on its own. None of them talk to each other.",
          "So the business runs on people moving numbers between tabs — copying a VIN here, pasting an MMR there, keeping a spreadsheet that is the only place everything lives. It works until you grow, and then the spreadsheet becomes the thing slowing you down.",
        ],
      },
      {
        h: "What a custom system looks like",
        p: [
          "One place your desk logs into. Cars arrive in it from wherever you source — auction run lists, marketplaces, trade-ins, government sales. Each one is enriched automatically with history, MMR and book values through your own subscriptions. Your rules score it. Your buyers see a ranked list, a margin and a max bid, and every decision is recorded.",
        ],
        list: [
          "A buying dashboard with every car you are considering, from every source",
          "Automatic Carfax, AutoCheck, MMR and book values per VIN",
          "Your recon, transport, fee and margin rules applied to every car",
          "Bought, passed and lost cars tracked with the reason",
          "Purchase history and performance by auction, buyer and segment",
          "Push into your DMS or inventory system when a car is bought",
          "Alerts by email, SMS, Slack or Telegram",
          "Access for your whole team with no per-seat licence",
        ],
      },
      {
        h: "Built on the accounts you already have",
        p: [
          "The system uses your existing Manheim, Carfax, AutoCheck and Autoniq access rather than replacing it. Where a provider offers an official API or data feed, that is used. Where it does not, the system works through your own logged-in session in the same way a person would — nothing is shared between clients and nothing is accessed that you are not licensed for.",
        ],
      },
      {
        h: "Start small, grow it",
        p: [
          "Most custom systems start from one piece that already saves time — usually overnight auction triage or a VIN-scan extension — and grow outward: add marketplaces, then a dashboard, then reporting, then the DMS hand-off. Each step is quoted separately at a fixed price, so you never commit to a large project before you have seen the first part work.",
        ],
      },
      {
        h: "You own it",
        p: [
          "The code and the data belong to you. There is no per-seat fee, so adding buyers does not add cost, and the source is handed over so you are never locked in. A small monthly covers hosting, monitoring and fixes when one of the sites it reads changes.",
        ],
      },
    ],
    deliverables: [
      "One dashboard for every car you are considering",
      "Manheim, MMR, Carfax, AutoCheck and Autoniq connected",
      "Your buying rules and margin maths built in",
      "Auction, marketplace and trade-in sources in one place",
      "Reports on what you bought, passed and lost — and why",
      "DMS or inventory hand-off when a car is bought",
      "Team access with no per-seat licence",
      "Source code and data owned by you",
    ],
    platforms: ["Manheim", "Manheim MMR", "Carfax", "AutoCheck", "Autoniq", "OPENLANE", "ACV Auctions", "Your DMS", "Google Sheets"],
    stack: ["Python", "Node.js", "React", "PostgreSQL", "REST APIs", "Chrome extensions", "Scheduling"],
    faqs: [
      {
        q: "Can you connect Manheim, Carfax and Autoniq into one system?",
        a: "Yes, using your own accounts. Each source is read through its official API where one exists, or through your logged-in session where it does not, and the results are combined per VIN in one dashboard with your own margin rules applied.",
      },
      {
        q: "Do I have to replace the tools I already pay for?",
        a: "No. The system sits on top of the subscriptions you already have and makes them work together. Some dealers later drop a per-seat tool once the custom system covers what they used it for, but that is your call.",
      },
      {
        q: "How long does a custom dealer system take?",
        a: "The first useful piece is usually live in one to two weeks. Larger systems are built in stages, each with a fixed price and a working result, so you see progress every step instead of waiting months for one big delivery.",
      },
      {
        q: "What does custom dealer software cost?",
        a: "It depends on the scope, so every project is quoted at a fixed price after a short call about how your desk buys. Starting with a single piece — triage or an extension — keeps the first step affordable and lets the system grow as it pays for itself.",
      },
      {
        q: "Who owns the software?",
        a: "You do. The source code and all the data are handed over, there is no per-seat licence, and you are free to have anyone maintain it. A small monthly covers hosting and fixes if you want me to keep running it.",
      },
    ],
    related: ["dealer-browser-extension", "auction-run-list-triage", "marketplace-government-lease-sales"],
    caseStudy: 1,
  },
];

export const serviceBySlug = slug => services.find(s => s.slug === slug);
