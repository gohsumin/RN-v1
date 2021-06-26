const images = [
    'https://static01.nyt.com/images/2020/11/20/books/review/best-books-07/best-books-07-mobileMasterAt3x.png',
    'https://static01.nyt.com/images/2020/11/20/books/review/best-books/best-books-superJumbo.png',
    'https://static01.nyt.com/images/2020/11/17/books/review/best-books-obama/best-books-obama-mobileMasterAt3x.png',
    'https://i.pinimg.com/originals/cb/63/5a/cb635a8bf07b9b19a24ac264dae42cf9.png',
    'https://i.pinimg.com/originals/6d/ef/1a/6def1ae413fc935cce64403d0b280746.png',
    'https://static01.nyt.com/images/2020/11/20/books/review/best-books-06/best-books-06-mobileMasterAt3x.png',
    'https://images.ctfassets.net/tbduj203nkkk/7cdswhCnjFxWflLGmWlzZH/ffd9e594495606fb948c2ba18d349a00/LightGray1.png',
    'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1612995602-df-34_gal-large1_35ce02b1-99d5-48ee-901f-f21d8f9d5f2f_345x@2x.jpg?crop=1xw:1xh;center,top&resize=768:*',
    'https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf62cc46-e47c-429a-b60e-23618743090a_1439x2048.png',
    'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1612995792-group8541-800x-1612995767.png?crop=0.97125xw:1xh;center,top&resize=768:*',
    'https://static.tumblr.com/9f892ba4c75b5508bab2acf04a7af33f/eiptfpo/ZZQpu42lq/tumblr_static_-515427585-content_2048_v2.jpg',
    require("../assets/headerbglight.jpeg"),
    require("../assets/dongsan.jpeg"),
    require('../assets/SoShNavLogo.png'),
    'https://www.ikea.com/kr/en/images/products/fejka-artificial-potted-plant-in-outdoor-monstera__0614197_pe686822_s5.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bNrKZqCCuyi6Se_-7M6d85i1882HBId9c81kQ9uYY7Af535dxw0ypqbkinIaxjK7uqU&usqp=CAU',
    'https://cf.shopee.com.my/file/7552d406a037e1f90ad766845a7e7bd1',
    'https://static.pullandbear.net/2/photos/2021/V/0/1/p/4470/328/802/4470328802_1_1_3.jpg?t=1614855668191',
    "https://lexfridman.com/wordpress/wp-content/uploads/2019/03/lex_zoomed_out_cropped.jpg",
    "https://static.onecms.io/wp-content/uploads/sites/20/2020/09/20/new-dad-joe-jonas.jpg",
    "https://cdn.britannica.com/83/130983-050-82EE4ECC/Michelle-Obama-portrait-first-lady-Blue-Room-2009.jpg",
    "https://thesmokingcuban.com/wp-content/uploads/getty-images/2017/07/1185327461.jpeg",
    "https://pbs.twimg.com/media/DsIRXVIX4AAlQlj.jpg",
    "https://api-prod.freedom.com.au/medias/39137-Popular-Category-Deep-etches-Artificial-Plants.png?context=bWFzdGVyfHJvb3R8ODAxMjI4fGltYWdlL3BuZ3xoNjIvaDhhLzg4MDIzMjg4MzgxNzQvMzkxMzcgUG9wdWxhciBDYXRlZ29yeSAtIERlZXAgZXRjaGVzX0FydGlmaWNpYWwgUGxhbnRzLnBuZ3xhYTFjM2U2NzAxNGZkNzE5NjI5MmY4MWM4ODhiNDk5NjM3MWRkYTA0ZjhiOGQwMDk2MTY3MzMzMTcyMDNmNGIz",
    "https://www.esperiri.com/wp-content/uploads/prodotti/arf-naviglio-sof/arflex-naviglio.png"
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
        imageSource: {uri: 'https://www.ikea.com/kr/en/images/products/fejka-artificial-potted-plant-in-outdoor-monstera__0614197_pe686822_s5.jpg'},
    },
    {
        user: "michelle.obama",
        datePurchased: "1622931840",
        datePosted: "1622931842",
        likes: 870,
        title: "Blazer",
        imageSource: {uri: 'https://static.pullandbear.net/2/photos/2021/V/0/1/p/4470/328/802/4470328802_1_1_3.jpg?t=1614855668191'},
    },
    {
        user: "travis.scott",
        datePurchased: "1622931742",
        datePosted: "1622931742",
        likes: 2904,
        title: "Shakespeare in a Divided America",
        imageSource: {uri: 'https://static01.nyt.com/images/2020/11/20/books/review/best-books-06/best-books-06-mobileMasterAt3x.png'},
    },
    {
        user: "michelle.obama",
        datePurchased: "1622866650",
        datePosted: "1622866660",
        likes: 870,
        title: "Carlton Badminton Set",
        imageSource: {uri: 'https://cf.shopee.com.my/file/7552d406a037e1f90ad766845a7e7bd1'},
    },
    {
        user: "luka.doncic",
        datePurchased: "1622766654",
        datePosted: "1622766660",
        likes: 4500,
        title: "The Light Phone",
        imageSource: {uri: 'https://images.ctfassets.net/tbduj203nkkk/7cdswhCnjFxWflLGmWlzZH/ffd9e594495606fb948c2ba18d349a00/LightGray1.png'},
    },

    {
        user: "michelle.obama",
        datePurchased: "1622682163",
        datePosted: "1622692163",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: {uri: 'https://static01.nyt.com/images/2020/11/20/books/review/best-books-07/best-books-07-mobileMasterAt3x.png'},
    },
    {
        user: "lex.fridman",
        datePurchased: "1622606180",
        datePosted: "1622606223",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: {uri: 'https://static01.nyt.com/images/2020/11/20/books/review/best-books-07/best-books-07-mobileMasterAt3x.png'},
    },
    {
        user: "joe.jonas",
        datePurchased: "1622589049",
        datePosted: "1622592163",
        likes: 2143,
        title: "Time Cube",
        imageSource: {uri: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1612995602-df-34_gal-large1_35ce02b1-99d5-48ee-901f-f21d8f9d5f2f_345x@2x.jpg?crop=1xw:1xh;center,top&resize=768:*'},
    },
    {
        user: "michelle.obama",
        datePurchased: "1622442002",
        datePosted: "1622442102",
        likes: 870,
        title: "Abstract Bookshelf",
        imageSource: {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bNrKZqCCuyi6Se_-7M6d85i1882HBId9c81kQ9uYY7Af535dxw0ypqbkinIaxjK7uqU&usqp=CAU'},
    },
    {
        user: "lex.fridman",
        datePurchased: "1622342002",
        datePosted: "1622390711",
        likes: 7489,
        title: "Homeland Elegies",
        imageSource: {uri: 'https://static01.nyt.com/images/2020/11/20/books/review/best-books/best-books-superJumbo.png'},
    },
    {
        user: "michelle.obama",
        datePurchased: "1622230580",
        datePosted: "1622230702",
        likes: 834,
        title: "Hidden Valley Road",
        imageSource: {uri: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1612995792-group8541-800x-1612995767.png?crop=0.97125xw:1xh;center,top&resize=768:*'},
    },
    {
        user: "joe.jonas",
        datePurchased: "1621324680",
        datePosted: "1621324682",
        likes: 5673,
        title: "Deacon King Kong",
        imageSource: {uri: 'https://i.pinimg.com/originals/6d/ef/1a/6def1ae413fc935cce64403d0b280746.png'},
    },
    {
        user: "travis.scott",
        datePurchased: "1620470052",
        datePosted: "1620516970",
        likes: 4953,
        title: "War",
        imageSource: {uri: 'https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf62cc46-e47c-429a-b60e-23618743090a_1439x2048.png'},
    },
    {
        user: "luka.doncic",
        datePurchased: "1619936425",
        datePosted: "1620058856",
        likes: 35746,
        title: "A Promised Land",
        imageSource: {uri: 'https://static01.nyt.com/images/2020/11/17/books/review/best-books-obama/best-books-obama-mobileMasterAt3x.png'},
    },
    {
        user: "michelle.obama",
        datePurchased: "1618767121",
        datePosted: "1618767260",
        likes: 12467,
        title: "The Vanishing Half",
        imageSource: {uri: 'https://static01.nyt.com/images/2020/11/17/books/review/best-books-obama/best-books-obama-mobileMasterAt3x.png'},
    },
];

const users = {
    "dongsan.goh": {
        firstName: "Dongsan",
        lastName: "Goh",
        following: ["lex.fridman", "joe.jonas", "adin", "travis.scott", "luka.doncic"],
        followers: ["lex.fridman", "joe.jonas", "adin", "travis.scott", "luka.doncic"],
        pfpSource: require("../assets/dongsan.jpeg"),
        bio: "n u t r i t i o n",
        available: "$33,351.12",
        pending: "$1,000,000.00",
    },
    "lex.fridman": {
        firstName: "Lex",
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
        firstName: "Joe",
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
        firstName: "Luka",
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