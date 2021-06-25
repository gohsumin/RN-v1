const images = [
    require("../assets/annawiener.png"),
    require("../assets/ayadakhtar.png"),
    require("../assets/barackobama.png"),
    require("../assets/britbennett.png"),
    require("../assets/jamesmcbride.png"),
    require("../assets/jamesshapiro.png"),
    require("../assets/lydiamillet.png"),
    require("../assets/maggieofarrell.png"),
    require("../assets/margaretmacmillan.png"),
    require("../assets/robertkolker.png"),
    require("../assets/headerbgdark.jpeg"),
    require("../assets/headerbglight.jpeg"),
    require("../assets/dongsan.jpeg"),
    require('../assets/SoShNavLogo.png'),
    {
        uri: 'https://www.ikea.com/kr/en/images/products/fejka-artificial-potted-plant-in-outdoor-monstera__0614197_pe686822_s5.jpg',
        cache: 'force-cache'
    },
    {
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bNrKZqCCuyi6Se_-7M6d85i1882HBId9c81kQ9uYY7Af535dxw0ypqbkinIaxjK7uqU&usqp=CAU',
        cache: 'force-cache'
    },
    {
        uri: 'https://cf.shopee.com.my/file/7552d406a037e1f90ad766845a7e7bd1',
        cache: 'force-cache'
    },
    {
        uri: 'https://static.pullandbear.net/2/photos/2021/V/0/1/p/4470/328/802/4470328802_1_1_3.jpg?t=1614855668191',
        cache: 'force-cache'
    },
    {
        uri: "https://lexfridman.com/wordpress/wp-content/uploads/2019/03/lex_zoomed_out_cropped.jpg",
        cache: "force-cache",
    },
    {
        uri: "https://static.onecms.io/wp-content/uploads/sites/20/2020/09/20/new-dad-joe-jonas.jpg",
        cache: "force-cache",
    },
    {
        uri: "https://cdn.britannica.com/83/130983-050-82EE4ECC/Michelle-Obama-portrait-first-lady-Blue-Room-2009.jpg",
        cache: "force-cache",
    },
    {
        uri: "https://thesmokingcuban.com/wp-content/uploads/getty-images/2017/07/1185327461.jpeg",
        cache: "force-cache",
    },
    {
        uri: "https://pbs.twimg.com/media/DsIRXVIX4AAlQlj.jpg",
        cache: "force-cache",
    },
    {
        uri: "https://api-prod.freedom.com.au/medias/39137-Popular-Category-Deep-etches-Artificial-Plants.png?context=bWFzdGVyfHJvb3R8ODAxMjI4fGltYWdlL3BuZ3xoNjIvaDhhLzg4MDIzMjg4MzgxNzQvMzkxMzcgUG9wdWxhciBDYXRlZ29yeSAtIERlZXAgZXRjaGVzX0FydGlmaWNpYWwgUGxhbnRzLnBuZ3xhYTFjM2U2NzAxNGZkNzE5NjI5MmY4MWM4ODhiNDk5NjM3MWRkYTA0ZjhiOGQwMDk2MTY3MzMzMTcyMDNmNGIz",
        cache: "force-cache"
    },
    {
        uri: "https://www.esperiri.com/wp-content/uploads/prodotti/arf-naviglio-sof/arflex-naviglio.png",
        cache: "force-cache"
    }
];

const remaining = [
    {
        "user": "lex.fridman",
        "datePurchased": "1623733185",
        "title": "Artificial Plant for Decoration",
        "imageURL": "https://api-prod.freedom.com.au/medias/39137-Popular-Category-Deep-etches-Artificial-Plants.png?context=bWFzdGVyfHJvb3R8ODAxMjI4fGltYWdlL3BuZ3xoNjIvaDhhLzg4MDIzMjg4MzgxNzQvMzkxMzcgUG9wdWxhciBDYXRlZ29yeSAtIERlZXAgZXRjaGVzX0FydGlmaWNpYWwgUGxhbnRzLnBuZ3xhYTFjM2U2NzAxNGZkNzE5NjI5MmY4MWM4ODhiNDk5NjM3MWRkYTA0ZjhiOGQwMDk2MTY3MzMzMTcyMDNmNGIz",
        "itemURL": "https://www.freedomfurniture.co.nz/cushions-throws-and-decor/c/artificial-foliage"
    },
    {
        "user": "travis.scott",
        "datePurchased": "1623733200",
        "title": "Naviglio Couch",
        "imageURL": "https://www.esperiri.com/wp-content/uploads/prodotti/arf-naviglio-sof/arflex-naviglio.png",
        "itemURL": "https://www.esperiri.com/luxury-italian-furniture/sofas/arflex-naviglio/"
    },
    {
        "user": "luka.doncic",
        "datePurchased": "1624594478",
        "title": "Vintage Silver Swirl Crystal Glasses",
        "imageURL": "https://chairish-prod.freetls.fastly.net/image/product/master/72f58b62-6b17-4774-afed-22e502bec83a/vintage-silver-swirl-crystal-glasses-set-of-6-3029",
        "itemURL": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.chairish.com%2Fproduct%2F591509%2Fvintage-silver-swirl-crystal-glasses-set-of-6&psig=AOvVaw2aG9jFzQ8RgpTEh-hSzS0O&ust=1624681035378000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKD0o9L2sfECFQAAAAAdAAAAABAE"
    },
    {
        "user": "michelle.obama",
        "datePurchased": "1624594756",
        "title": "Original Organic Pearl Couscous",
        "imageURL": "https://images-na.ssl-images-amazon.com/images/I/91DVUNxvOrL._SL1500_.jpg",
        "itemURL": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FRiceSelect-Organic-Pearl-Couscous-24-5%2Fdp%2FB07F2T9TR3&psig=AOvVaw0Kz_IkjT8ZdzC3fV8nDKJh&ust=1624681112797000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCJCLt_j2sfECFQAAAAAdAAAAABAD"
    },
    {
        "user": "lex.fridman",
        "datePurchased": "1624594853",
        "title": "Handmade Vintage Leather Journal",
        "imageURL": "http://cdn.shopify.com/s/files/1/1658/7771/products/large_book_cover_clipped_rev_1_1024x1024.png?v=1510093178",
        "itemURL": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fboldhome.com%2Fproducts%2Fkauri-handmade-leather-journal-wrap-genuine-leather-journal-diary-and-notebook-cover&psig=AOvVaw1qXrlfHhu3zOOiFadc44AG&ust=1624681329842000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPDXwOb3sfECFQAAAAAdAAAAABAl"
    }
]

const posts = [
    {
        user: "michelle.obama",
        datePurchased: "1622931841",
        datePosted: "1622931843",
        likes: 870,
        title: "Faux Plant",
        imageSource: { uri: 'https://www.ikea.com/kr/en/images/products/fejka-artificial-potted-plant-in-outdoor-monstera__0614197_pe686822_s5.jpg' },
    },
    {
        user: "michelle.obama",
        datePurchased: "1622931840",
        datePosted: "1622931842",
        likes: 870,
        title: "Blazer",
        imageSource: { uri: 'https://static.pullandbear.net/2/photos/2021/V/0/1/p/4470/328/802/4470328802_1_1_3.jpg?t=1614855668191' },
    },
    {
        user: "travis.scott",
        datePurchased: "1622931742",
        datePosted: "1622931742",
        likes: 2904,
        title: "Shakespeare in a Divided America",
        imageSource: require('../assets/jamesshapiro.png'),
    },
    {
        user: "michelle.obama",
        datePurchased: "1622866650",
        datePosted: "1622866660",
        likes: 870,
        title: "Carlton Badminton Set",
        imageSource: { uri: 'https://cf.shopee.com.my/file/7552d406a037e1f90ad766845a7e7bd1' },
    },
    {
        user: "luka.doncic",
        datePurchased: "1622766654",
        datePosted: "1622766660",
        likes: 4500,
        title: "A Children's Bible",
        imageSource: require('../assets/lydiamillet.png'),
    },

    {
        user: "michelle.obama",
        datePurchased: "1622682163",
        datePosted: "1622692163",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: require('../assets/annawiener.png'),
    },
    {
        user: "lex.fridman",
        datePurchased: "1622606180",
        datePosted: "1622606223",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: require('../assets/annawiener.png'),
    },
    {
        user: "joe.jonas",
        datePurchased: "1622589049",
        datePosted: "1622592163",
        likes: 2143,
        title: "Hamnet",
        imageSource: require('../assets/maggieofarrell.png'),
    },
    {
        user: "michelle.obama",
        datePurchased: "1622442002",
        datePosted: "1622442102",
        likes: 870,
        title: "Abstract Bookshelf",
        imageSource: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bNrKZqCCuyi6Se_-7M6d85i1882HBId9c81kQ9uYY7Af535dxw0ypqbkinIaxjK7uqU&usqp=CAU' },
    },
    {
        user: "lex.fridman",
        datePurchased: "1622342002",
        datePosted: "1622390711",
        likes: 7489,
        title: "Homeland Elegies",
        imageSource: require('../assets/ayadakhtar.png'),
    },
    {
        user: "michelle.obama",
        datePurchased: "1622230580",
        datePosted: "1622230702",
        likes: 834,
        title: "Hidden Valley Road",
        imageSource: require('../assets/robertkolker.png'),
    },
    {
        user: "joe.jonas",
        datePurchased: "1621324680",
        datePosted: "1621324682",
        likes: 5673,
        title: "Deacon King Kong",
        imageSource: require('../assets/jamesmcbride.png'),
    },
    {
        user: "travis.scott",
        datePurchased: "1620470052",
        datePosted: "1620516970",
        likes: 4953,
        title: "War",
        imageSource: require('../assets/margaretmacmillan.png'),
    },
    {
        user: "luka.doncic",
        datePurchased: "1619936425",
        datePosted: "1620058856",
        likes: 35746,
        title: "A Promised Land",
        imageSource: require('../assets/barackobama.png'),
    },
    {
        user: "michelle.obama",
        datePurchased: "1618767121",
        datePosted: "1618767260",
        likes: 12467,
        title: "The Vanishing Half",
        imageSource: require('../assets/britbennett.png'),
    },
];

const users = {
    "dongsan.goh": {
        firstName: "dongsan.goh",
        lastName: "Goh",
        following: ["lex.fridman", "joe.jonas", "adin", "travis.scott", "luka.doncic"],
        followers: ["lex.fridman", "joe.jonas", "adin", "travis.scott", "luka.doncic"],
        pfpSource: require("../assets/dongsan.jpeg"),
        bio: "n u t r i t i o n",
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
    "lex.fridman": {
        firstName: "lex.fridman",
        lastName: "Fridman",
        following: ["joe.jonas", "adin", "travis.scott", "luka.doncic"],
        followers: ["joe.jonas", "adin", "luka.doncic"],
        pfpSource: {
            uri: "https://lexfridman.com/wordpress/wp-content/uploads/2019/03/lex_zoomed_out_cropped.jpg",
        },
        bio: '"This is the real secret of life -- to be completely engaged with what you are doing in the here and now. And instead of calling it work, realize it is play." - Alan Watts',
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
    "joe.jonas": {
        firstName: "joe.jonas",
        lastName: "Jonas",
        following: ["lex.fridman", "adin", "michelle.obama", "luka.doncic", "travis.scott"],
        followers: ["lex.fridman", "luka.doncic"],
        pfpSource: {
            uri: "https://static.onecms.io/wp-content/uploads/sites/20/2020/09/20/new-dad-joe-jonas.jpg"
        },
        bio: "I love making Italian food. And coconut chicken",
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
    "michelle.obama": {
        firstName: "Michelle",
        lastName: "Obama",
        following: ["lex.fridman", "travis.scott"],
        followers: ["lex.fridman", "travis.scott", "joe.jonas", "luka.doncic"],
        pfpSource: {
            uri: "https://cdn.britannica.com/83/130983-050-82EE4ECC/Michelle-Obama-portrait-first-lady-Blue-Room-2009.jpg"
        },
        bio: "Always stay true to yourself",
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
    "luka.doncic": {
        firstName: "luka.doncic",
        lastName: "Doncic",
        following: ["lex.fridman", "joe.jonas", "michelle.obama"],
        followers: ["lex.fridman", "travis.scott", "joe.jonas"],
        pfpSource: {
            uri: "https://thesmokingcuban.com/wp-content/uploads/getty-images/2017/07/1185327461.jpeg"
        },
        bio: "To succeed you have to believe in something with such passion that it becomes a reality.",
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
    "travis.scott": {
        firstName: "Travis",
        lastName: "Scott",
        following: ["luka.doncic", "adin"],
        followers: ["lex.fridman", "adin", "joe.jonas"],
        pfpSource: {
            uri: "https://pbs.twimg.com/media/DsIRXVIX4AAlQlj.jpg"
        },
        bio: "If she bad, she get a pass into the tour",
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
}

export { images, remaining, posts, users };