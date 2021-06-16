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
        "user": "lex",
        "datePurchased": "1623733185",
        "title": "Artificial Plant for Decoration",
        "imageURL": "https://api-prod.freedom.com.au/medias/39137-Popular-Category-Deep-etches-Artificial-Plants.png?context=bWFzdGVyfHJvb3R8ODAxMjI4fGltYWdlL3BuZ3xoNjIvaDhhLzg4MDIzMjg4MzgxNzQvMzkxMzcgUG9wdWxhciBDYXRlZ29yeSAtIERlZXAgZXRjaGVzX0FydGlmaWNpYWwgUGxhbnRzLnBuZ3xhYTFjM2U2NzAxNGZkNzE5NjI5MmY4MWM4ODhiNDk5NjM3MWRkYTA0ZjhiOGQwMDk2MTY3MzMzMTcyMDNmNGIz",
        "itemURL": "https://www.freedomfurniture.co.nz/cushions-throws-and-decor/c/artificial-foliage"
    },
    {
        "user": "travis",
        "datePurchased": "1623733200",
        "title": "Naviglio Couch",
        "imageURL": "https://www.esperiri.com/wp-content/uploads/prodotti/arf-naviglio-sof/arflex-naviglio.png",
        "itemURL": "https://www.esperiri.com/luxury-italian-furniture/sofas/arflex-naviglio/"
    }
]

const posts = [
    {
        user: "michelle",
        datePurchased: "1622931841",
        datePosted: "1622931843",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: { uri: 'https://www.ikea.com/kr/en/images/products/fejka-artificial-potted-plant-in-outdoor-monstera__0614197_pe686822_s5.jpg' },
    },
    {
        user: "michelle",
        datePurchased: "1622931840",
        datePosted: "1622931842",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: { uri: 'https://static.pullandbear.net/2/photos/2021/V/0/1/p/4470/328/802/4470328802_1_1_3.jpg?t=1614855668191' },
    },
    {
        user: "travis",
        datePurchased: "1622931742",
        datePosted: "1622931742",
        likes: 2904,
        title: "Shakespeare in a Divided America",
        imageSource: require('../assets/jamesshapiro.png'),
    },
    {
        user: "michelle",
        datePurchased: "1622866650",
        datePosted: "1622866660",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: { uri: 'https://cf.shopee.com.my/file/7552d406a037e1f90ad766845a7e7bd1' },
    },
    {
        user: "luka",
        datePurchased: "1622766654",
        datePosted: "1622766660",
        likes: 4500,
        title: "A Children's Bible",
        imageSource: require('../assets/lydiamillet.png'),
    },

    {
        user: "michelle",
        datePurchased: "1622682163",
        datePosted: "1622692163",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: require('../assets/annawiener.png'),
    },
    {
        user: "lex",
        datePurchased: "1622606180",
        datePosted: "1622606223",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: require('../assets/annawiener.png'),
    },
    {
        user: "joe",
        datePurchased: "1622589049",
        datePosted: "1622592163",
        likes: 2143,
        title: "Hamnet",
        imageSource: require('../assets/maggieofarrell.png'),
    },
    {
        user: "michelle",
        datePurchased: "1622442002",
        datePosted: "1622442102",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bNrKZqCCuyi6Se_-7M6d85i1882HBId9c81kQ9uYY7Af535dxw0ypqbkinIaxjK7uqU&usqp=CAU' },
    },
    {
        user: "lex",
        datePurchased: "1622342002",
        datePosted: "1622390711",
        likes: 7489,
        title: "Homeland Elegies",
        imageSource: require('../assets/ayadakhtar.png'),
    },
    {
        user: "michelle",
        datePurchased: "1622230580",
        datePosted: "1622230702",
        likes: 834,
        title: "Hidden Valley Road",
        imageSource: require('../assets/robertkolker.png'),
    },
    {
        user: "joe",
        datePurchased: "1621324680",
        datePosted: "1621324682",
        likes: 5673,
        title: "Deacon King Kong",
        imageSource: require('../assets/jamesmcbride.png'),
    },
    {
        user: "travis",
        datePurchased: "1620470052",
        datePosted: "1620516970",
        likes: 4953,
        title: "War",
        imageSource: require('../assets/margaretmacmillan.png'),
    },
    {
        user: "luka",
        datePurchased: "1619936425",
        datePosted: "1620058856",
        likes: 35746,
        title: "A Promised Land",
        imageSource: require('../assets/barackobama.png'),
    },
    {
        user: "michelle",
        datePurchased: "1618767121",
        datePosted: "1618767260",
        likes: 12467,
        title: "The Vanishing Half",
        imageSource: require('../assets/britbennett.png'),
    },
];

const users = {
    dongsan: {
        firstName: "Dongsan",
        lastName: "Goh",
        following: ["lex", "joe", "adin", "travis", "luka"],
        followers: ["lex", "joe", "adin", "travis", "luka"],
        pfpSource: require("../assets/dongsan.jpeg"),
        bio: "n u t r i t i o n",
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
    lex: {
        firstName: "Lex",
        lastName: "Fridman",
        following: ["joe", "adin", "travis", "luka"],
        followers: ["joe", "adin", "luka"],
        pfpSource: {
            uri: "https://lexfridman.com/wordpress/wp-content/uploads/2019/03/lex_zoomed_out_cropped.jpg",
            cache: "force-cache",
        },
        bio: '"This is the real secret of life -- to be completely engaged with what you are doing in the here and now. And instead of calling it work, realize it is play." - Alan Watts',
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
    joe: {
        firstName: "Joe",
        lastName: "Jonas",
        following: ["lex", "adin", "michelle", "luka", "travis"],
        followers: ["lex", "luka"],
        pfpSource: {
            uri: "https://static.onecms.io/wp-content/uploads/sites/20/2020/09/20/new-dad-joe-jonas.jpg",
            cache: "force-cache",
        },
        bio: "I love making Italian food. And coconut chicken",
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
    michelle: {
        firstName: "Michelle",
        lastName: "Obama",
        following: ["lex", "travis"],
        followers: ["lex", "travis", "joe", "luka"],
        pfpSource: {
            uri: "https://cdn.britannica.com/83/130983-050-82EE4ECC/Michelle-Obama-portrait-first-lady-Blue-Room-2009.jpg",
            cache: "force-cache",
        },
        bio: "Always stay true to yourself",
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
    luka: {
        firstName: "Luka",
        lastName: "Doncic",
        following: ["lex", "joe", "michelle"],
        followers: ["lex", "travis", "joe"],
        pfpSource: {
            uri: "https://thesmokingcuban.com/wp-content/uploads/getty-images/2017/07/1185327461.jpeg",
            cache: "force-cache",
        },
        bio: "To succeed you have to believe in something with such passion that it becomes a reality.",
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
    travis: {
        firstName: "Travis",
        lastName: "Scott",
        following: ["luka", "adin"],
        followers: ["lex", "adin", "joe"],
        pfpSource: {
            uri: "https://pbs.twimg.com/media/DsIRXVIX4AAlQlj.jpg",
            cache: "force-cache",
        },
        bio: "If she bad, she get a pass into the tour",
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
}

export { images, remaining, posts, users };