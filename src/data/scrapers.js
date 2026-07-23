/**
 * Per-site scraper pages — the "spoke" half of the topic cluster.
 *
 * Search Console is already showing impressions for these exact queries
 * ("autoscout24 scraper", "autotrader scraper", "carmax scraper",
 * "carsales scraper", "mediamarkt scraper", "dealer inventory scraper") at
 * position ~56, matched against the homepage because nothing else exists.
 * One page per query, at a root-level exact-match URL, is what turns an
 * impression into a click.
 *
 * These deliberately do NOT duplicate /services/* — the service pages sell a
 * capability, these answer a specific "can you scrape <site>" search. Each one
 * links up to its pillar so the cluster passes authority in both directions.
 *
 * Shape:
 *   slug        root-level URL, exact-match to the query
 *   site        the platform name
 *   h1          optional heading override, when "<site> Scraper" reads wrong
 *   metaTitle   exact-match phrasing first, brand last
 *   metaDesc    140–158 chars, written for click-through
 *   keywords    the query cluster
 *   what        what the site is, for people who don't know it
 *   why         who buys this scrape and what they do with it
 *   fields      the columns the output actually contains
 *   defenses    the specific anti-bot problem this site presents
 *   uses        bullet list of concrete applications
 *   faqs        visible on the page and emitted as FAQPage schema
 *   pillar      slug in services.js this page rolls up to
 *   siblings    other scraper slugs to cross-link
 */

export const scrapers = [
  {
    slug: "autotrader-scraper",
    site: "AutoTrader",
    emoji: "🚘",
    color: "#60a5fa",
    metaTitle: "AutoTrader Scraper — Automated Vehicle Listing Extraction",
    metaDesc:
      "Custom AutoTrader scraper that pulls every matching listing daily — VIN, price, mileage, trim, dealer and photos — into one clean spreadsheet. Built in days, fixed price.",
    keywords: ["autotrader scraper", "autotrader data extraction", "scrape autotrader listings", "autotrader api alternative", "autotrader inventory data"],
    tagline: "Every AutoTrader listing that matches your criteria, in a spreadsheet, refreshed while you sleep.",
    what:
      "AutoTrader is the largest used-vehicle marketplace in the United States, carrying millions of listings from franchise dealers, independents and private sellers. It publishes asking prices, mileage, trim, dealer identity and photos on every listing page — which makes it the single richest public source of what the US used-car market is actually asking for a given car today.",
    why:
      "Dealers use it to price their own inventory against genuine local comps instead of a gut feel. Wholesalers use it to work out which trims are thin in which markets before they bid at auction. Lenders and analysts use it to track residual values across a segment. All three need the same thing: the whole comparable set as rows, not as forty browser tabs.",
    fields: [
      "VIN, year, make, model and trim",
      "Asking price, plus every price change seen since first capture",
      "Mileage, exterior and interior colour, drivetrain",
      "Dealer name, dealer ID, city, state and ZIP",
      "Days listed and first-seen date",
      "Full option and feature list where published",
      "All photo URLs",
      "Listing URL and stock number",
      "New / used / certified pre-owned status",
    ],
    defenses:
      "AutoTrader runs bot detection and rate limiting, renders significant parts of the listing through JavaScript, and paginates search results in a way that quietly caps how deep an unauthenticated session can go. The build handles this with a real browser engine, paced requests, rotating residential exits, and search segmentation — slicing by ZIP radius, price band and model year so no single query ever hits the depth cap and nothing gets silently dropped from the middle of a result set.",
    uses: [
      "Price your inventory against live local comps every morning",
      "Track a named competitor's whole lot and get alerted on every price cut",
      "Measure days-on-market by trim to decide what to stock",
      "Find markets where a model is scarce and margins are wider",
      "Feed a valuation model with real asking prices rather than book values",
      "Reconcile against auction data to spot cars worth buying",
    ],
    faqs: [
      {
        q: "Does AutoTrader have a public API?",
        a: "Not one that is open to buy for general market research — their data feeds are commercial arrangements aimed at partners and syndication, and most dealers cannot get access. A scraper reading the public listing pages is what fills that gap for the majority of people who ask.",
      },
      {
        q: "How many AutoTrader listings can you pull?",
        a: "Tens of thousands per run is routine. The practical constraint is search depth rather than volume, which is why the build slices the market into overlapping segments by geography, price band and model year — that reaches the full matching set instead of the first few hundred results per query.",
      },
      {
        q: "How often can it refresh?",
        a: "Daily overnight is the usual choice and suits pricing work. Hourly is possible for a narrow watch list — a specific competitor, a specific model — and costs more because it means more requests and more infrastructure.",
      },
      {
        q: "Is scraping AutoTrader legal?",
        a: "Collecting publicly visible listing data is generally lawful in the United States, and US appellate courts have repeatedly held that reading public pages is not unauthorised access. I keep request rates civil, stay off anything behind a login, and avoid personal seller data. If a specific request looks like a problem I will say so before you pay.",
      },
      {
        q: "What does an AutoTrader scraper cost?",
        a: "A single-market daily feed typically lands between $300 and $700. Nationwide coverage with price history and competitor roll-ups runs higher. You get a fixed quote within 24 hours of telling me the filters and fields you want.",
      },
    ],
    pillar: "dealer-inventory-scraping",
    siblings: ["carmax-scraper", "cars-com-scraper", "cargurus-scraper"],
  },

  {
    slug: "autoscout24-scraper",
    site: "AutoScout24",
    emoji: "🇪🇺",
    color: "#34d399",
    metaTitle: "AutoScout24 Scraper — European Vehicle Listing Data",
    metaDesc:
      "AutoScout24 scraper for dealers and traders. Extract listings, prices, mileage and dealer details across Germany, Italy, Netherlands and every AutoScout24 market into one dataset.",
    keywords: ["autoscout24 scraper", "autoscout24 data extraction", "scrape autoscout24", "european car listing data", "autoscout24 api"],
    tagline: "Every AutoScout24 market in one dataset — normalised, deduplicated and refreshed daily.",
    what:
      "AutoScout24 is Europe's largest online car marketplace, operating separate country sites across Germany, Austria, Belgium, Italy, the Netherlands, Spain and more. Each market has its own domain, its own language and its own field conventions — which is exactly why traders working across borders find it so hard to compare, and why the data is worth having in one table.",
    why:
      "Cross-border traders live on price differences between markets. A car that sits in Germany moves quickly in Italy; a spec that carries a premium in the Netherlands is ordinary in Spain. Seeing all of it in one normalised dataset turns that from folklore into arithmetic. Dealers importing into the UK or the US use the same feed to source stock at the point where the arbitrage is real.",
    fields: [
      "Make, model, variant and body type",
      "Price in listing currency plus a normalised comparison currency",
      "Mileage in km, with miles computed alongside",
      "First registration date and vehicle age",
      "Fuel type, gearbox, power in kW and PS",
      "Emissions class, CO₂ figure and efficiency rating",
      "Seller type — dealer or private — with dealer name and location",
      "Country, region and postcode",
      "Full equipment list and photo URLs",
    ],
    defenses:
      "AutoScout24 renders listings client-side, rate-limits aggressively, and geo-varies both markup and content — the same query returns a different page shape depending on which country domain you hit and where the request appears to come from. The build runs a real browser engine with per-country residential exits so each market returns its native results, then normalises every field into one schema so German kW and Italian trim labels end up in comparable columns.",
    uses: [
      "Compare the same model across every European market at once",
      "Find cross-border arbitrage before it closes",
      "Source import stock at the right price point",
      "Track how quickly a spec moves in each country",
      "Build residual-value curves per market and per fuel type",
      "Monitor named dealers across borders",
    ],
    faqs: [
      {
        q: "Can you scrape all AutoScout24 country sites at once?",
        a: "Yes — that is usually the point. Germany, Austria, Belgium, Italy, the Netherlands, Spain, France and the rest can run as one job, with every field normalised into a single schema so a Dutch listing and an Italian listing sit in comparable columns.",
      },
      {
        q: "How do you handle different languages and units?",
        a: "Field names, fuel types, gearbox types and body styles are mapped to one controlled vocabulary during extraction. Mileage arrives in both km and miles, prices in the listing currency and in whichever comparison currency you nominate, converted at the rate on the day of capture.",
      },
      {
        q: "Does it include Mobile.de as well?",
        a: "It can. Mobile.de is a separate build but the same job, and most German-market clients want both in one table — the overlap between the two is smaller than people expect, and cars listed on only one of them are often the interesting ones.",
      },
      {
        q: "How fresh is the data?",
        a: "Daily overnight refresh is standard, which is enough for pricing and sourcing work. Because the system remembers what it saw yesterday, you get price-change history accumulating from day one at no extra cost.",
      },
      {
        q: "What does an AutoScout24 scraper cost?",
        a: "A single country with daily delivery is typically $350 to $700. Multi-country with normalisation and cross-market comparison runs higher. Fixed quote within 24 hours of describing the markets and filters you need.",
      },
    ],
    pillar: "dealer-inventory-scraping",
    siblings: ["carsales-scraper", "autotrader-scraper", "cargurus-scraper"],
  },

  {
    slug: "carmax-scraper",
    site: "CarMax",
    emoji: "🚗",
    color: "#fbbf24",
    metaTitle: "CarMax Scraper — Inventory, Pricing & Availability Data",
    metaDesc:
      "CarMax scraper pulling live nationwide inventory — VIN, no-haggle price, mileage, trim, store location and transfer availability — into a clean daily dataset.",
    keywords: ["carmax scraper", "carmax inventory data", "scrape carmax listings", "carmax pricing data", "carmax api"],
    tagline: "CarMax posts one price and never moves it. That makes their inventory the cleanest pricing benchmark in the country.",
    what:
      "CarMax is the largest used-car retailer in the United States, running a no-haggle model across roughly 250 stores with nationwide inventory transfer. Because the posted price is the actual transaction price, their listings are unusually clean as a benchmark — there is no negotiation gap to guess at, which is not true of almost any other source.",
    why:
      "Independent dealers price against CarMax whether they admit it or not, because their customers do. Having the whole national inventory as data means you can see the real retail ceiling for any VIN-adjacent spec, watch how fast CarMax moves a trim, and spot where their price is high enough that you can undercut it and still make money.",
    fields: [
      "Stock number and VIN",
      "Posted price — the actual transaction price under their model",
      "Year, make, model, trim and body style",
      "Mileage, exterior and interior colour",
      "Store location, city, state and transfer eligibility",
      "Transfer fee and estimated availability date",
      "Features, packages and option list",
      "Photo URLs and 360 view availability",
      "Days on site and price-change history once tracking begins",
    ],
    defenses:
      "CarMax serves inventory through a JavaScript-driven search backed by an internal API with request signing and rate limiting, and it geo-personalises results by store proximity so a naïve scrape returns whatever is near the exit IP rather than the national picture. The build works store by store with matched geography so coverage is genuinely nationwide, and paces requests so the pipeline lasts rather than getting cut off in week two.",
    uses: [
      "Establish the real retail ceiling for a spec before you buy it",
      "Track how fast CarMax turns a given trim",
      "Find regional price spreads across their own store network",
      "Price your lot against the benchmark customers are comparing you to",
      "Spot models where their pricing leaves room underneath",
      "Feed a valuation model with no-haggle prices rather than asking prices",
    ],
    faqs: [
      {
        q: "Does CarMax have a public API?",
        a: "No public API is offered for market research. Their site is powered by an internal API that is not documented or licensed for outside use, so a scraper reading what the site publicly renders is the practical route — and it is what this build does.",
      },
      {
        q: "Can you get nationwide inventory, not just my local store?",
        a: "Yes, and this is the part most naïve scrapes get wrong. CarMax personalises results by proximity, so a single scraping session only ever sees a slice. The build iterates store by store with matched geography, which is what produces genuine national coverage.",
      },
      {
        q: "Does it capture price changes?",
        a: "Once it has run for more than a day, yes. Each run is compared against the last, so price movements and days-on-site accumulate automatically — you do not need to do anything to start collecting price history.",
      },
      {
        q: "Can this be combined with auction data?",
        a: "That is the highest-value version of it. CarMax retail prices joined against Manheim or ADESA auction prices on the same spec gives you the spread directly, which is the number that decides whether a car is worth bidding on.",
      },
      {
        q: "What does a CarMax scraper cost?",
        a: "A filtered daily feed typically runs $350 to $700. Full nationwide capture with price history and store-level breakdowns is higher. You get a fixed price within 24 hours of describing what you want tracked.",
      },
    ],
    pillar: "dealer-inventory-scraping",
    siblings: ["autotrader-scraper", "cars-com-scraper", "manheim-mmr-scraper"],
  },

  {
    slug: "carsales-scraper",
    site: "Carsales",
    emoji: "🇦🇺",
    color: "#22d3ee",
    metaTitle: "Carsales Scraper — Australian Vehicle Listing Data",
    metaDesc:
      "Carsales.com.au scraper for Australian dealers and traders. Pull listings, prices, kilometres, dealer details and state-level market data into one refreshed dataset.",
    keywords: ["carsales scraper", "carsales.com.au data", "scrape carsales listings", "australian car listing data", "carsales api"],
    tagline: "The Australian market in one table — every state, every dealer, every price change.",
    what:
      "Carsales.com.au is Australia's dominant vehicle marketplace, carrying dealer and private listings across every state and territory. Because the Australian market is geographically fragmented and thin in specific segments, national visibility is worth considerably more there than the same view is worth in a dense market like the US.",
    why:
      "Australian dealers and traders use it to price against genuine state-level comps, to find stock in a state where a model is cheap and move it to one where it is scarce, and to watch how long specific specs take to move in each capital city. Interstate arbitrage is a real business in Australia in a way it is not in most markets, and it runs on exactly this data.",
    fields: [
      "Make, model, badge, series and body type",
      "Price — advertised, drive-away, and excluding on-road costs where distinguished",
      "Odometer in kilometres",
      "Build year and compliance year",
      "Transmission, engine, fuel type and drive type",
      "Rego status and expiry where published",
      "Seller type, dealer name, suburb and state",
      "Days listed and price-change history",
      "Photo URLs and full feature list",
    ],
    defenses:
      "Carsales renders through a JavaScript front end, rate-limits, and geo-gates some results — a request from outside Australia sees a different and thinner set than one from inside it. The build runs Australian residential exits so results match what a local buyer sees, then paginates by state and price band so no segment silently truncates.",
    uses: [
      "Price stock against real comps in your own state",
      "Find interstate arbitrage on scarce specs",
      "Track days-to-sell by badge and by capital city",
      "Monitor named dealers across every state at once",
      "Spot which specs are thin nationally before you buy",
      "Build state-level residual curves from advertised prices",
    ],
    faqs: [
      {
        q: "Can you scrape Carsales from outside Australia?",
        a: "Yes, but it has to be done properly. Carsales geo-varies its results, so a request from a US or European exit returns a thinner and different set than a local one. The build routes through Australian residential exits, which is what makes the data match what an actual buyer sees.",
      },
      {
        q: "Does it cover private listings as well as dealers?",
        a: "Both, and the seller type is a column so you can filter either way. Private listings matter for sourcing; dealer listings matter for pricing. Most clients want them separated rather than mixed.",
      },
      {
        q: "Can you also cover Drive, Gumtree or CarsGuide?",
        a: "Yes. They are separate builds but the same job, and the fields normalise into one schema so all sources sit in comparable columns. Most Australian clients end up wanting at least Carsales plus one other.",
      },
      {
        q: "How current is the data?",
        a: "Daily overnight refresh is standard and suits pricing and sourcing. Price history builds up automatically from the first run, since each run is diffed against the last.",
      },
      {
        q: "What does a Carsales scraper cost?",
        a: "A filtered daily feed typically runs $350 to $700 depending on breadth. National coverage with price history and state roll-ups is higher. Fixed quote within 24 hours.",
      },
    ],
    pillar: "dealer-inventory-scraping",
    siblings: ["autoscout24-scraper", "autotrader-scraper", "carmax-scraper"],
  },

  {
    slug: "cars-com-scraper",
    site: "Cars.com",
    emoji: "🏷️",
    color: "#a78bfa",
    metaTitle: "Cars.com Scraper — Listing, Price & Dealer Data Extraction",
    metaDesc:
      "Cars.com scraper that captures every matching listing — VIN, price, deal rating, mileage, dealer and photos — refreshed daily into Excel, Sheets or your database.",
    keywords: ["cars.com scraper", "cars com data extraction", "scrape cars.com listings", "cars.com inventory data", "cars.com api"],
    tagline: "Cars.com publishes a deal rating on every listing. Captured at scale, that becomes a map of who is mispriced.",
    what:
      "Cars.com is one of the largest US vehicle marketplaces, carrying franchise, independent and private listings nationwide. Its distinguishing feature for data work is the deal rating it attaches to listings — great, good, fair, above market — computed against its own view of local comparables and published openly on the page.",
    why:
      "That rating is a competitor's opinion of who is mispriced, given away for free on every listing. Captured across a whole market, it tells you where the soft spots are: which dealers are consistently above market and losing time, which segments are being underpriced, and where your own listings sit in a buyer's eyes before they ever call you.",
    fields: [
      "VIN, year, make, model and trim",
      "Listing price and price-change history",
      "Deal rating — great / good / fair / above market",
      "Mileage, colour, drivetrain and fuel type",
      "Dealer name, dealer rating, review count and location",
      "Days on site",
      "Certified pre-owned status and warranty details",
      "Full feature list and photo URLs",
      "Free vehicle history report availability flag",
    ],
    defenses:
      "Cars.com uses bot detection with JavaScript challenges, rate-limits by IP, and serves search results through a client-rendered layer with a depth cap per query. The build drives a real browser, paces requests, rotates residential exits, and segments the market by ZIP radius and price band so the full result set is reachable without ever pushing a single query past its cap.",
    uses: [
      "See which dealers in your market are consistently above market",
      "Check how your own inventory is rated before a buyer does",
      "Track deal-rating distribution by segment to find soft spots",
      "Correlate dealer rating and review count with pricing power",
      "Pull local comps for any spec on demand",
      "Watch days-on-site to time your own price cuts",
    ],
    faqs: [
      {
        q: "Can you capture the Cars.com deal rating?",
        a: "Yes — it is published on the listing page and it is one of the more useful columns in the output. Across a whole market it effectively gives you a free second opinion on who is mispriced, computed by someone else's model.",
      },
      {
        q: "How does this differ from an AutoTrader scrape?",
        a: "Overlapping inventory, different extras. Cars.com gives you the deal rating and dealer review data; AutoTrader gives broader private-seller coverage and different geographic strengths. Most dealers doing serious pricing work run both and reconcile them on VIN.",
      },
      {
        q: "Can it monitor just my competitors?",
        a: "Yes, and that is the cheapest useful version of this. A named-dealer watch list is a much smaller job than full market capture, and you get alerted the same morning any of them changes a price.",
      },
      {
        q: "Is scraping Cars.com legal?",
        a: "Collecting publicly visible listing data is generally lawful in the US, and courts have consistently held that reading public pages is not unauthorised access. The build stays off anything behind a login, avoids personal seller data, and keeps request rates civil.",
      },
      {
        q: "What does a Cars.com scraper cost?",
        a: "A competitor watch list starts around $250. A filtered daily market feed is typically $400 to $800. Fixed quote within 24 hours of describing the filters and fields.",
      },
    ],
    pillar: "dealer-inventory-scraping",
    siblings: ["autotrader-scraper", "cargurus-scraper", "carmax-scraper"],
  },

  {
    slug: "cargurus-scraper",
    site: "CarGurus",
    emoji: "📈",
    color: "#fb7185",
    metaTitle: "CarGurus Scraper — Deal Ratings, Prices & Dealer Data",
    metaDesc:
      "CarGurus scraper capturing listings, instant market value, deal ratings, price history and dealer reputation data across any US market, refreshed on your schedule.",
    keywords: ["cargurus scraper", "cargurus data extraction", "scrape cargurus listings", "cargurus imv data", "cargurus deal rating"],
    tagline: "CarGurus publishes its own market valuation next to every price. That comparison is the whole reason to scrape it.",
    what:
      "CarGurus is a major US vehicle marketplace built around its Instant Market Value estimate — a computed fair price shown alongside every listing, with the deal labelled relative to it. Where other sites publish an asking price, CarGurus publishes an asking price and an opinion about it, on every single car.",
    why:
      "Having both numbers at scale means you can measure the gap rather than guess at it. Which dealers price above IMV and get away with it, which segments are systematically overvalued by the model, and where your own inventory falls relative to a benchmark that your customers are seeing. It is competitive intelligence that the site does the hard part of for you.",
    fields: [
      "VIN, year, make, model and trim",
      "Listing price and Instant Market Value estimate",
      "Deal rating — great / good / fair / high / overpriced",
      "Price-drop history as published, plus what we observe",
      "Mileage, colour, drivetrain and accident-free flag",
      "Dealer name, dealer rating, review count and location",
      "Days on market",
      "Full feature list and photo URLs",
    ],
    defenses:
      "CarGurus runs strong bot detection with fingerprinting, JavaScript challenges and aggressive rate limits, and personalises results by location. The build uses a properly driven browser engine with consistent fingerprints, residential exits matched to the target market, deliberate pacing, and market segmentation so nothing is lost to a per-query result cap.",
    uses: [
      "Measure the gap between asking price and published market value",
      "Find segments the market model systematically over- or under-values",
      "Benchmark your own listings against what buyers are shown",
      "Track competitor price-drop cadence",
      "Correlate deal rating with days on market to see what actually moves",
      "Feed real market values into your own pricing tool",
    ],
    faqs: [
      {
        q: "Can you capture Instant Market Value?",
        a: "Yes — IMV is rendered on the listing page and is captured as its own column alongside the asking price. Having both is what makes a CarGurus scrape more useful than a plain listing scrape.",
      },
      {
        q: "CarGurus blocks a lot of tools. Will this work?",
        a: "It is one of the harder sites in this category and it does defeat off-the-shelf scrapers. It is handled with a real browser engine, consistent fingerprinting, residential exits and honest pacing. Slower than a naive scraper, and unlike a naive scraper it is still running next month.",
      },
      {
        q: "How often can it run?",
        a: "Daily is the sensible default given how defended the site is. Higher frequency on a narrow watch list is possible; hammering the whole market hourly is not, and anyone who tells you otherwise is selling you a pipeline that dies in a fortnight.",
      },
      {
        q: "Can I combine CarGurus with Cars.com and AutoTrader?",
        a: "Yes, and reconciling them on VIN is where it gets genuinely valuable — three independent opinions on the same car, in the same row. That is a multi-source build rather than a single scrape, quoted accordingly.",
      },
      {
        q: "What does a CarGurus scraper cost?",
        a: "Typically $450 to $900 for a filtered daily feed, higher than the easier sites because the anti-bot work is real. Fixed quote within 24 hours.",
      },
    ],
    pillar: "dealer-inventory-scraping",
    siblings: ["cars-com-scraper", "autotrader-scraper", "carmax-scraper"],
  },

  {
    slug: "manheim-mmr-scraper",
    site: "Manheim MMR",
    emoji: "🔨",
    color: "#34d399",
    metaTitle: "Manheim MMR Scraper — Automated Auction Price Lookups",
    metaDesc:
      "Automate Manheim MMR lookups against your own dealer account. Bulk VIN valuations, run-list scoring and a ranked deal email before the lane opens.",
    keywords: ["manheim mmr scraper", "manheim automation", "mmr lookup automation", "manheim run list data", "auction price automation"],
    tagline: "Four hundred VINs against MMR, before your first coffee, using the account you already pay for.",
    what:
      "Manheim Market Report is the wholesale valuation benchmark for the US used-car trade — the number the whole industry prices against. It is available through a Manheim dealer account, one VIN at a time, which is fine for one car and hopeless for a four-hundred-car run list.",
    why:
      "The value is not in any single lookup, it is in doing all of them before the sale starts. When every car on a run list has been scored against MMR overnight, your buyer walks in with a ranked shortlist instead of a browser full of tabs, and the cars that clear your margin threshold are already at the top.",
    fields: [
      "VIN with full decode",
      "MMR value — wholesale average, above, below",
      "Adjusted MMR for mileage and condition grade",
      "Regional MMR variance",
      "Recent comparable sales and volume",
      "Auction listing price and lane details",
      "Computed landed cost with your transport, recon and fee assumptions",
      "Margin against MMR and against your retail comps",
    ],
    defenses:
      "Manheim requires an authenticated dealer session, uses short-lived tokens, and enforces rate limits per account. The build drives your own licensed session with proper cookie and token lifecycle handling, refreshes credentials cleanly rather than re-logging in constantly, and paces lookups to stay within what a normal heavy user would generate.",
    uses: [
      "Score an entire run list against MMR overnight",
      "Rank tomorrow's sale by margin before anyone opens a browser",
      "Reconcile MMR against live retail comps from AutoTrader or CarMax",
      "Track how MMR moves on a segment week over week",
      "Filter out branded-title cars automatically before they reach a buyer",
      "Send a ranked deal email at 6 AM every trading day",
    ],
    faqs: [
      {
        q: "Do I need my own Manheim account?",
        a: "Yes, and there is no version of this that does not. The automation drives the licensed dealer session you already pay for. I do not share credentials between clients or resell MMR data — that is both against Manheim's terms and a fast route to losing your account.",
      },
      {
        q: "Will this get my account flagged?",
        a: "Not if it is built properly. The lookup volume is paced to look like a heavy human user rather than a scraper, because a system that gets your account suspended has negative value no matter how fast it runs. That pacing is a design constraint, not an afterthought.",
      },
      {
        q: "Can it also read the run lists?",
        a: "Yes, and that is the usual shape of the build — read the sale's run list, decode and score every VIN against MMR, apply your buy box, and deliver a ranked shortlist. The MMR lookup on its own is the smaller half of the job.",
      },
      {
        q: "Can it bid for me?",
        a: "No. I do not build automated bidding — most platforms prohibit it and the downside of a bug is that you own a car you never wanted. The system finds and ranks; a person decides.",
      },
      {
        q: "What does Manheim automation cost?",
        a: "MMR lookup automation on its own typically runs $500 to $1,000. A full pipeline with run lists, buy-box scoring and a daily ranked email is usually $900 to $1,800 plus a small monthly amount for hosting and fixes.",
      },
    ],
    pillar: "car-auction-automation",
    siblings: ["carmax-scraper", "autotrader-scraper", "cars-com-scraper"],
  },

  {
    slug: "google-maps-scraper",
    site: "Google Maps",
    emoji: "🗺️",
    color: "#fbbf24",
    metaTitle: "Google Maps Scraper — Business Leads Data Extraction",
    metaDesc:
      "Google Maps scraper that builds verified B2B lead lists — name, phone, email, website, rating and reviews — for any category in any city. 5,000 leads in about 24 hours.",
    keywords: ["google maps scraper", "google maps lead scraping", "business leads data", "google maps data extraction", "b2b lead list building"],
    tagline: "Every business of a given type, in a given place, with a verified way to reach them.",
    what:
      "Google Maps is the most complete public directory of operating businesses that exists — better maintained than any purchased database, because the businesses maintain it themselves to be found. Category, location, phone, website, hours, rating and review count are all published, and the ones that are actually trading are the ones that keep it current.",
    why:
      "It is the fastest route from an ideal-customer definition to a list of real companies that match it. Every HVAC contractor in three metros rated above 4.0 with more than 25 reviews and no online booking — that is a query against Maps plus a pass over each website, and it is a far better list than anything you can buy, because it was built this week to your criteria rather than two years ago to somebody else's.",
    fields: [
      "Business name, category and subcategory",
      "Full address, plus latitude and longitude",
      "Phone number, format-validated and line-type checked",
      "Website URL",
      "Email addresses found on the site, fully verified",
      "Star rating and total review count",
      "Opening hours and current status",
      "Price level and service attributes",
      "Social profiles linked from the site",
      "Technology signals — booking system, chat, eCommerce platform",
    ],
    defenses:
      "Maps results are rendered dynamically, capped per query, and localised to the requesting location, so a naïve scrape returns a few dozen results and stops. The build tiles the target area into overlapping geographic cells and queries each one, which reaches the full set rather than the first page — then deduplicates across cells so a business sitting on a boundary appears exactly once.",
    uses: [
      "Build an outreach list for any category in any market",
      "Find businesses with a specific weakness — no website, no booking, poor rating",
      "Map competitor density before opening a location",
      "Enrich an existing CRM with phone, hours and rating",
      "Track review counts on a competitor set over time",
      "Segment by technology signals to personalise your first line",
    ],
    faqs: [
      {
        q: "How many leads can you get from Google Maps?",
        a: "Five thousand verified businesses in about 24 to 48 hours is a normal run. The real ceiling is how many businesses actually match your criteria — if a niche only contains 800 genuine targets, you get 800 real ones rather than 5,000 padded with junk.",
      },
      {
        q: "Do I get email addresses?",
        a: "Maps itself rarely publishes them, so the build visits each business website and extracts contact addresses from there, then verifies each one against syntax, domain, MX and mailbox checks. Typical outcome is a verified email on 40 to 70 percent of the list depending on the industry — trades are lower, professional services are higher.",
      },
      {
        q: "Why not just use the official Google Places API?",
        a: "For some jobs that is the right answer and I will tell you so. The API is clean but it caps results per query, omits fields the map itself shows, and gets expensive at volume. Most builds use the API where it is sufficient and page extraction where it is not.",
      },
      {
        q: "Is this legal under GDPR and CCPA?",
        a: "This is B2B data from public listings — business names, addresses, published phone numbers and business email addresses. I do not touch consumer PII or anything behind a login. What you may lawfully do with the list once you have it depends on where your targets are; if the list includes EU or UK businesses I will flag it, though your sending practice is a question for your lawyer rather than for me.",
      },
      {
        q: "What does a Google Maps lead list cost?",
        a: "Most one-off lists land between $200 and $700 depending on the number of cities, categories, the depth of enrichment and whether verification is included. Recurring monthly builds are cheaper per run. Fixed price up front.",
      },
    ],
    pillar: "business-leads-data",
    siblings: ["mediamarkt-scraper", "autotrader-scraper", "cars-com-scraper"],
  },

  {
    slug: "mediamarkt-scraper",
    site: "MediaMarkt",
    emoji: "🛒",
    color: "#60a5fa",
    metaTitle: "MediaMarkt Scraper — Product, Price & Stock Data",
    metaDesc:
      "MediaMarkt scraper for price monitoring and catalogue data across Germany, Spain, Italy and every MediaMarkt market. Prices, stock, specs and promotions, refreshed daily.",
    keywords: ["mediamarkt scraper", "mediamarkt price monitoring", "scrape mediamarkt products", "mediamarkt product data", "european electronics price data"],
    tagline: "Europe's biggest electronics retailer, priced and tracked across every country it trades in.",
    what:
      "MediaMarkt — with Saturn, part of the same group — is Europe's largest consumer electronics retailer, running separate country sites across Germany, Spain, Italy, the Netherlands, Belgium, Austria, Poland and more. Each market prices independently, which makes them a benchmark for anyone selling electronics in Europe and a puzzle for anyone trying to see the whole picture.",
    why:
      "If you sell electronics in Europe, MediaMarkt is the price your customers check. Brands use this feed for MAP compliance monitoring; resellers use it to price against the market leader; cross-border sellers use it to find the country where a SKU is cheapest. All three need the same table, and none of them can get it by opening seven websites.",
    fields: [
      "Product name, brand, EAN and manufacturer part number",
      "Current price, previous price and discount percentage",
      "Promotional flags — bundle, cashback, clearance",
      "Stock status per country and per store where published",
      "Full technical specification set",
      "Category path and product URL",
      "Customer rating and review count",
      "Photo URLs",
      "Country and currency, with a normalised comparison price",
    ],
    defenses:
      "MediaMarkt runs bot detection, rate-limits, renders prices client-side, and varies both markup and pricing by country domain. The build uses a real browser engine with per-country residential exits, paces requests per domain, and matches products across markets on EAN so the same SKU lines up in one row regardless of how each country names it.",
    uses: [
      "Monitor competitor prices daily across every European market",
      "Enforce MAP compliance as a brand",
      "Find the cheapest country for a SKU before sourcing",
      "Track promotion cadence to time your own",
      "Pull full catalogue data with specs for your own listings",
      "Get alerted the moment a watched SKU drops or restocks",
    ],
    faqs: [
      {
        q: "Can you cover all MediaMarkt country sites?",
        a: "Yes. Germany, Spain, Italy, the Netherlands, Belgium, Austria, Poland, Hungary and the rest can run as one job, matched on EAN so the same product appears as one row with a price column per country.",
      },
      {
        q: "Does it include Saturn?",
        a: "Yes — Saturn is part of the same group and works the same way, and most clients who want one want both. It runs in the same job rather than as a separate build.",
      },
      {
        q: "How often can prices be checked?",
        a: "Daily is standard and covers most price-monitoring needs. Hourly on a defined watch list is possible and is the usual choice for MAP enforcement, where the lag between a violation and finding out is the whole point.",
      },
      {
        q: "Can I get alerted on price changes?",
        a: "Yes — email, Slack or Telegram alerts fire when a watched product crosses a threshold, drops below your floor, or comes back into stock. Most clients take a daily digest plus instant alerts on a shorter critical list.",
      },
      {
        q: "What does a MediaMarkt scraper cost?",
        a: "A single-country price monitor on a defined product set typically runs $250 to $600. Multi-country full-catalogue extraction with EAN matching runs higher. Fixed quote within 24 hours.",
      },
    ],
    pillar: "web-scraping",
    siblings: ["google-maps-scraper", "autoscout24-scraper", "carsales-scraper"],
  },

  /* ------------------ Auction cluster ------------------ */

  {
    slug: "adesa-scraper",
    site: "ADESA",
    emoji: "🏦",
    color: "#34d399",
    metaTitle: "ADESA Scraper — Auction Run List & Condition Report Data",
    metaDesc:
      "Automate ADESA run lists, condition grades and sale calendars through your own dealer account. Every lot scored against MMR and delivered before the sale starts.",
    keywords: ["adesa scraper", "adesa auction data", "adesa run list automation", "adesa condition report data", "car auction data extraction"],
    tagline: "The whole sale calendar read overnight, every lot graded and scored, before anyone opens a browser.",
    what:
      "ADESA is one of the two dominant wholesale auto auction networks in North America, running physical and digital sales with published run lists, condition grades and sale calendars. Everything a buyer needs to decide is on the platform — the problem is that it is spread across sales, lanes and separate condition reports, and it is only useful before the sale, not after.",
    why:
      "Buyers work to a deadline that does not move. If a run list takes two hours to review by hand, the lots at the bottom get less attention than the lots at the top, and that is where money quietly leaks. Reading the whole calendar overnight and scoring every lot against your buy box means the shortlist is ready before the sale, ranked by margin rather than by lane order.",
    fields: [
      "Sale, lane, run number and scheduled time",
      "VIN with full decode",
      "Year, make, model, trim and mileage",
      "Condition grade and announced defects",
      "Condition report detail — damage items and estimated recon",
      "Title status and any brand announcement",
      "Seller type and consignor where published",
      "Starting bid, buy-now price and reserve indication",
      "Photo URLs from the condition report",
    ],
    defenses:
      "ADESA requires an authenticated dealer session, expires tokens quickly, and delivers run lists and condition reports through separate internal endpoints that rate-limit independently. The build drives your own licensed session with proper token lifecycle handling, fetches condition reports in a paced second pass rather than hammering them alongside the list, and resumes cleanly if a sale is large enough to span a refresh.",
    uses: [
      "Score an entire sale calendar against your buy box overnight",
      "Rank lots by margin instead of by lane order",
      "Filter out branded titles and heavy recon before a buyer sees them",
      "Reconcile ADESA lots against Manheim MMR on the same VIN",
      "Track which consignors reliably bring clean cars",
      "Get a ranked deal email before the first lane opens",
    ],
    faqs: [
      {
        q: "Do I need my own ADESA dealer account?",
        a: "Yes. The automation drives the licensed session you already hold — it does not create access you do not have, and I do not share credentials between clients. Without a dealer login there is no version of this that works or that would survive an audit.",
      },
      {
        q: "Can it pull condition reports as well as run lists?",
        a: "Yes, and the condition report is where most of the value is — announced defects and estimated recon are what turn an asking price into a landed cost. They are fetched in a paced second pass so the volume does not trip rate limits.",
      },
      {
        q: "Can it score lots against MMR?",
        a: "That is the usual build. ADESA run lists joined against Manheim MMR on VIN gives you the spread per lot directly, which is the number that decides whether to bid. Both sides run on your own accounts.",
      },
      {
        q: "Will this get my account suspended?",
        a: "Not if it is paced properly, which is a design constraint here rather than an afterthought. The lookup rate is set to look like a heavy human user, because a system that costs you your dealer account has negative value regardless of how fast it runs.",
      },
      {
        q: "What does ADESA automation cost?",
        a: "Run-list extraction with scoring typically runs $600 to $1,200. Adding condition reports and MMR reconciliation pushes it higher. Recurring systems are a build fee plus a small monthly amount for hosting and fixes.",
      },
    ],
    pillar: "car-auction-automation",
    siblings: ["manheim-mmr-scraper", "backlotcars-scraper", "openlane-scraper"],
  },

  {
    slug: "backlotcars-scraper",
    site: "BacklotCars",
    emoji: "🔗",
    color: "#22d3ee",
    metaTitle: "BacklotCars Scraper — Digital Wholesale Inventory Data",
    metaDesc:
      "Automate BacklotCars inventory, buy-now pricing and offer data through your own account. Every listing scored against market value and delivered as a ranked daily shortlist.",
    keywords: ["backlotcars scraper", "backlotcars data extraction", "backlotcars inventory automation", "digital wholesale auction data", "car wholesale scraper"],
    tagline: "A 24/7 marketplace needs a 24/7 watcher. Cars appear and sell between your morning checks.",
    what:
      "BacklotCars is a digital-only wholesale marketplace where dealers buy and sell without a physical lane. Inventory is continuous rather than scheduled, with buy-now pricing and an offer mechanism, which makes it fundamentally different from a timed auction — there is no sale calendar to check, just a pool that changes all day.",
    why:
      "Continuous inventory punishes periodic attention. A car that fits your buy box perfectly can appear at 11am and be gone by 2pm, and no amount of discipline about checking twice a day catches it. A watcher that reads the pool every few minutes and alerts on a match is the only way to compete with dealers who are doing exactly that.",
    fields: [
      "VIN with full decode",
      "Year, make, model, trim and mileage",
      "Buy-now price and current offer level",
      "Condition grade and inspection report detail",
      "Announced damage and estimated recon",
      "Title status and brand announcements",
      "Seller dealer and location",
      "Time listed and time remaining where applicable",
      "Photo and inspection image URLs",
    ],
    defenses:
      "BacklotCars runs on an authenticated internal API with short-lived tokens and per-account rate limits, and its inventory changes continuously rather than in batches. The build drives your own session with clean token refresh, polls at a rate the platform tolerates, and diffs each poll against the last so it alerts on genuinely new inventory instead of re-notifying you about cars you already declined.",
    uses: [
      "Get alerted within minutes when a matching car appears",
      "Score every listing against MMR and your recon assumptions automatically",
      "Filter out branded titles and heavy damage before you see them",
      "Track how quickly specific specs clear the platform",
      "Watch named sellers whose cars have been good to you",
      "Feed matches straight into Slack or Telegram for the buying desk",
    ],
    faqs: [
      {
        q: "Do I need a BacklotCars account?",
        a: "Yes — the automation runs your own licensed dealer session. I do not share credentials between clients or resell platform data, both because it breaches their terms and because it is the fastest way to lose the account the whole system depends on.",
      },
      {
        q: "How quickly will I hear about a new car?",
        a: "Within minutes on a defined watch list. The polling rate is set as high as the platform comfortably tolerates — fast enough to matter on a continuous marketplace, paced enough that the pipeline is still running in six months.",
      },
      {
        q: "Can it make offers automatically?",
        a: "No. I do not build automated bidding or automated offers — most platforms prohibit it, and the downside of a bug is that you own a car you never wanted. The system finds, scores and alerts; a person decides.",
      },
      {
        q: "Can it run alongside ADESA and Manheim?",
        a: "Yes, and that is the common shape. One pipeline reading every platform you hold an account on, scoring everything against the same buy box, and delivering one ranked list — rather than three separate feeds you have to reconcile yourself.",
      },
      {
        q: "What does it cost?",
        a: "A single-platform watcher with alerting typically runs $600 to $1,200. Multi-platform pipelines with MMR reconciliation run higher, plus a small monthly amount covering hosting and fixes.",
      },
    ],
    pillar: "car-auction-automation",
    siblings: ["adesa-scraper", "manheim-mmr-scraper", "openlane-scraper"],
  },

  {
    slug: "openlane-scraper",
    site: "OpenLane",
    emoji: "🛣️",
    color: "#a78bfa",
    metaTitle: "OpenLane Scraper — Digital Auction Inventory Extraction",
    metaDesc:
      "Automate OpenLane listings, condition reports and pricing through your own dealer account. Every lot scored against market value in one ranked daily shortlist.",
    keywords: ["openlane scraper", "openlane auction data", "openlane inventory automation", "openlane data extraction", "digital auction scraper"],
    tagline: "Off-lease, off-rental and fleet inventory, read and scored before the buyers who check by hand.",
    what:
      "OpenLane is a major digital wholesale auction platform, now the umbrella brand covering ADESA's digital operation. Its inventory skews heavily toward off-lease, off-rental and fleet cars coming out of institutional consignors — which means known histories, predictable condition and a lot of volume in specific specs.",
    why:
      "Institutional inventory is attractive precisely because it is predictable, which means everyone wants it and the good lots clear fast. The advantage goes to whoever evaluates the whole pool first. Reading every listing overnight and ranking by margin turns a volume problem into a shortlist, and it is the difference between bidding on what you found and bidding on what was left.",
    fields: [
      "VIN with full decode",
      "Year, make, model, trim and mileage",
      "Current bid, buy-now price and reserve indication",
      "Condition grade and full inspection detail",
      "Announced damage items and estimated recon cost",
      "Title status and brand announcements",
      "Consignor type — lease, rental, fleet, dealer",
      "Sale end time and location",
      "Photo and inspection image URLs",
    ],
    defenses:
      "OpenLane serves inventory through an authenticated single-page application backed by an internal API with token expiry and rate limiting, and results are personalised to your account's buying permissions. The build drives your own session with proper token lifecycle handling, paginates within the platform's limits, and pulls condition detail in a paced second pass rather than alongside the listing sweep.",
    uses: [
      "Evaluate the entire pool overnight instead of sampling it",
      "Rank every lot by margin against MMR and your recon assumptions",
      "Filter to specific consignor types — lease returns, fleet, rental",
      "Get alerted when a spec you want appears with time still on the clock",
      "Reconcile against retail comps to size the spread before bidding",
      "Deliver one ranked list across OpenLane, ADESA and Manheim together",
    ],
    faqs: [
      {
        q: "Is OpenLane the same as ADESA?",
        a: "They are the same group — OpenLane is the brand covering the digital auction operation that ADESA's physical business sits alongside. In practice the platforms present differently and need separate builds, and most dealers who want one end up wanting both in the same pipeline.",
      },
      {
        q: "Do I need my own OpenLane account?",
        a: "Yes. The automation drives your own licensed dealer session. Results are personalised to your buying permissions, so there is no meaningful version of this that runs on anyone else's access.",
      },
      {
        q: "Can it capture condition reports?",
        a: "Yes, and it should — announced damage and estimated recon are what convert a bid price into a landed cost. They are fetched in a paced second pass so the extra volume does not trip the platform's rate limits.",
      },
      {
        q: "Can it alert me before a sale ends?",
        a: "Yes. A matching lot with time still on the clock triggers an alert by email, Slack or Telegram, with the scoring already attached so the decision is a yes or no rather than a research task.",
      },
      {
        q: "What does OpenLane automation cost?",
        a: "Listing extraction with scoring typically runs $600 to $1,200. Adding condition reports and cross-platform MMR reconciliation runs higher, plus a small monthly amount for hosting and fixes.",
      },
    ],
    pillar: "car-auction-automation",
    siblings: ["adesa-scraper", "backlotcars-scraper", "manheim-mmr-scraper"],
  },

  /* ------------------ eCommerce cluster ------------------ */

  {
    slug: "ebay-scraper",
    site: "eBay",
    emoji: "🛍️",
    color: "#fbbf24",
    metaTitle: "eBay Scraper — Product, Price & Sold Listing Data",
    metaDesc:
      "eBay scraper for resellers and brands. Extract active listings, sold prices, seller data and category trends into one dataset. Sold-listing history is the real prize.",
    keywords: ["ebay scraper", "ebay scraper python", "ebay sold listings data", "scrape ebay prices", "ebay product research tool"],
    tagline: "Active listings tell you what people are asking. Sold listings tell you what people are paying.",
    what:
      "eBay is the largest open marketplace where both active and completed listings are publicly visible. That second half is the unusual part — almost no other marketplace publishes what things actually sold for, at what price, in what condition, and how many bids it took to get there.",
    why:
      "Asking prices are opinions; sold prices are facts. Resellers use sold-listing data to work out what a category genuinely clears at before buying inventory. Brands use it to see how their products move on the secondary market and where grey-market sellers are undercutting them. Both need the sold half, and both need it as a table rather than as a search results page.",
    fields: [
      "Title, item number and category path",
      "Current price, Buy It Now price and best-offer status",
      "Sold price and sale date for completed listings",
      "Bid count and watcher count where shown",
      "Condition — new, used, refurbished, for parts",
      "Seller username, feedback score and percentage",
      "Shipping cost, location and handling time",
      "Item specifics, brand, model and MPN",
      "Photo URLs and listing URL",
    ],
    defenses:
      "eBay rate-limits aggressively, serves search through a JavaScript layer, caps result depth per query, and treats rapid pagination as a signal worth blocking. The build paces requests, rotates residential exits, and segments searches by category, price band and condition so the full matching set is reachable without pushing any single query past its depth cap. Where the official Browse API covers what you need, the build uses that instead — it is cleaner and does not break on a redesign.",
    uses: [
      "Find what a category actually sells for, not what it is listed at",
      "Size demand before committing to inventory",
      "Track a competitor seller's whole catalogue and pricing",
      "Monitor grey-market listings of your own brand",
      "Spot arbitrage between eBay and another marketplace",
      "Build sell-through rate by category and condition",
    ],
    faqs: [
      {
        q: "Can you scrape eBay sold listings?",
        a: "Yes, and for most people that is the entire reason to do this. Completed and sold listings are publicly visible, and captured at scale they give you real transaction prices rather than asking prices — which is a fundamentally better input to any buying decision.",
      },
      {
        q: "Why not just use the official eBay API?",
        a: "Where it covers your need, that is exactly what the build uses — it is faster, cleaner and does not break when a page changes. The gaps are where the API restricts or omits what you want, particularly around historical sold data at volume, and that is where page extraction fills in.",
      },
      {
        q: "How many listings can it handle?",
        a: "Tens of thousands per run comfortably. The constraint is eBay's per-query depth cap rather than total volume, which is why searches get segmented by category, price band and condition instead of run as one broad query.",
      },
      {
        q: "Can it monitor prices continuously?",
        a: "Yes. Daily is standard; a defined watch list can run hourly with alerts by email, Slack or Telegram when something crosses a threshold or a competitor repricing event happens.",
      },
      {
        q: "What does an eBay scraper cost?",
        a: "A one-off category extract typically runs $200 to $500. An ongoing monitor with sold-price tracking and alerts is usually $400 to $900 plus a small monthly amount. Fixed quote within 24 hours.",
      },
    ],
    pillar: "web-scraping",
    siblings: ["amazon-product-scraper", "walmart-scraper", "mediamarkt-scraper"],
  },

  {
    slug: "amazon-product-scraper",
    site: "Amazon",
    h1: "Amazon Product Scraper",
    emoji: "🛒",
    color: "#fb7185",
    metaTitle: "Amazon Product Scraper — Price, Rank, Review & Seller Data",
    metaDesc:
      "Amazon scraper pulling product data, prices, BSR, Buy Box ownership, reviews and seller info at scale. For product research, repricing and brand monitoring.",
    keywords: ["amazon product scraper", "amazon price scraper", "scrape amazon reviews", "amazon bsr data", "product hunting tool", "dropshipping product finder"],
    tagline: "Price, rank, Buy Box and review sentiment on every ASIN you care about — as data, every day.",
    what:
      "Amazon publishes an enormous amount on every product page: price, Best Sellers Rank, Buy Box winner, seller count, review distribution, A+ content and variation structure. Individually these are a page; captured across a category every day, they are the closest thing to a live feed of what is actually selling.",
    why:
      "Product research, repricing and brand protection are all the same data problem wearing different hats. A reseller wants to know which ASINs in a category have demand and thin competition. A brand wants to know who is on their listings and whether they are holding the Buy Box. A private-label seller wants review text at volume because that is where the next product's feature list is hiding.",
    fields: [
      "ASIN, title, brand and category path",
      "Current price, list price and discount",
      "Best Sellers Rank, overall and per subcategory",
      "Buy Box owner and total offer count",
      "Seller names, ratings and fulfilment type",
      "Star rating and review count over time",
      "Full review text, rating, date and verified status",
      "Bullet points, description and A+ content",
      "Variation family — sizes, colours and their individual data",
      "Image URLs and video presence",
    ],
    defenses:
      "Amazon is among the most defended sites on the open web: fingerprinting, CAPTCHA challenges, aggressive rate limits, geo and session personalisation, and page structures that differ by category and by which experiment bucket you land in. The build uses a properly driven browser engine with consistent fingerprints, residential exits matched to the target marketplace, deliberate pacing, and per-category parsers rather than one selector set that silently returns empty on half the catalogue.",
    uses: [
      "Product research — find demand with thin competition",
      "Track BSR movement across a category to spot what is rising",
      "Monitor Buy Box ownership on your own listings",
      "Detect unauthorised sellers on your brand's ASINs",
      "Mine review text for feature gaps and complaint patterns",
      "Reprice against real competitor movement rather than a schedule",
    ],
    faqs: [
      {
        q: "Can you scrape Amazon reviews at scale?",
        a: "Yes — full review text, rating, date and verified-purchase status, across as many ASINs as you need. Running the text through sentiment and topic analysis afterwards is a common add-on, and is usually where the actual insight comes from rather than the raw text.",
      },
      {
        q: "Is this a product hunting tool?",
        a: "It is the data layer under one. BSR, price, offer count, review velocity and category position across a whole category is exactly what the paid research tools are selling you — the difference is you get the raw data, on your criteria, and you own it.",
      },
      {
        q: "Amazon blocks everything. Does this actually work?",
        a: "It does, and it is genuinely the hardest site in this list. What makes it work is a real browser engine with consistent fingerprinting, residential exits, honest pacing and per-category parsers. It is slower than a naive scraper, and unlike a naive scraper it is still returning data next month.",
      },
      {
        q: "Which Amazon marketplaces are covered?",
        a: "Any of them — US, UK, DE, FR, IT, ES, CA, JP and the rest. Multi-marketplace runs match on ASIN so the same product lines up across countries in one row, which is what makes cross-border price comparison possible.",
      },
      {
        q: "What does an Amazon scraper cost?",
        a: "A one-off category or ASIN-list extract typically runs $300 to $700. An ongoing daily monitor with Buy Box and BSR tracking is usually $600 to $1,200 plus a small monthly amount, reflecting the real infrastructure cost of staying unblocked.",
      },
    ],
    pillar: "web-scraping",
    siblings: ["ebay-scraper", "walmart-scraper", "mediamarkt-scraper"],
  },

  {
    slug: "walmart-scraper",
    site: "Walmart",
    emoji: "🏪",
    color: "#60a5fa",
    metaTitle: "Walmart Scraper — Product, Price & Stock Data Extraction",
    metaDesc:
      "Walmart scraper for price monitoring and product research. Multi-keyword parallel extraction of prices, stock, seller and rating data into one clean daily dataset.",
    keywords: ["walmart scraper", "walmart price scraper", "scrape walmart products", "walmart marketplace data", "walmart product research"],
    tagline: "Thousands of products across hundreds of keywords, run in parallel, into one clean file.",
    what:
      "Walmart runs both first-party retail and a growing third-party marketplace, which means its product pages carry two different kinds of signal: Walmart's own pricing, and independent sellers competing on the same items. It is the second-largest US eCommerce destination and consistently the most useful cross-check against Amazon pricing.",
    why:
      "Sellers listing on both marketplaces need to know where they sit on each. Brands need to see who is selling their products through Walmart's marketplace and at what price. And for anyone doing product research, Walmart is a useful independent read on demand — a product selling well in both places is a much stronger signal than one selling well in either.",
    fields: [
      "Item ID, title, brand and category path",
      "Current price, was-price and rollback status",
      "Seller name and whether it is sold by Walmart or a marketplace seller",
      "Stock status and store-level availability where published",
      "Star rating and review count",
      "Shipping and pickup options",
      "Specifications and product attributes",
      "Variation family — sizes, colours and their pricing",
      "Image URLs and product URL",
    ],
    defenses:
      "Walmart uses bot detection with JavaScript challenges, rate-limits by IP, and renders search results client-side with a per-query depth cap. The build drives a real browser, runs keyword searches in controlled parallel rather than sequentially — which is what makes hundreds of keywords practical in one run — rotates residential exits, and paces each worker so parallelism does not turn into a block.",
    uses: [
      "Monitor competitor pricing across the marketplace daily",
      "Cross-check Amazon demand signals against an independent source",
      "Find products where Walmart pricing leaves room underneath",
      "Detect unauthorised marketplace sellers of your brand",
      "Track rollback cadence to time your own promotions",
      "Pull full catalogue data with specs for your own listings",
    ],
    faqs: [
      {
        q: "Can it handle hundreds of keywords at once?",
        a: "Yes, and that is the usual shape of the job. Keyword searches run in controlled parallel with each worker paced independently, which is what makes a few hundred keywords a single overnight run rather than a week of sequential scraping.",
      },
      {
        q: "Does it distinguish Walmart's own items from marketplace sellers?",
        a: "Yes — seller identity is its own column, and for most use cases it is the important one. First-party pricing and third-party pricing behave completely differently and mixing them produces conclusions that are not true of either.",
      },
      {
        q: "How often can it run?",
        a: "Daily is standard and covers price monitoring. A defined watch list can run more frequently with alerts when a product crosses a price threshold or comes back into stock.",
      },
      {
        q: "Can I combine this with Amazon and eBay data?",
        a: "Yes, and matched on UPC or brand plus model, that is the most useful version — one row per product with a price column per marketplace. That is a multi-source build rather than a single scrape, quoted accordingly.",
      },
      {
        q: "What does a Walmart scraper cost?",
        a: "A one-off multi-keyword extract typically runs $250 to $600. An ongoing daily monitor with alerts is usually $400 to $900 plus a small monthly amount. Fixed quote within 24 hours.",
      },
    ],
    pillar: "web-scraping",
    siblings: ["amazon-product-scraper", "ebay-scraper", "mediamarkt-scraper"],
  },
];

export const scraperBySlug = slug => scrapers.find(s => s.slug === slug);
