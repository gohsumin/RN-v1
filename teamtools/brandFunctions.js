let brandFunctions = {
    "UrbanOutfitters": function urbanOutfitters(html) {
        console.log("hello from urbanOutfitters function");
        var ret = {};
        var index = 0;
        const brandImageRE = new RegExp("<img class=\"x_header-logo-img\"(.+?(?=src=\"))src=\"([^\"]*)\"");
        const brandImageRet = html.match(brandImageRE);
        ret.brandImage = brandImageRet[2];
        index = brandImageRet.index;
        const itemListRE = new RegExp('<td class=\"x_item-image\" rowspan=\"2\"[^>]*>([^]*?(?=<))<a href=\"([^\"]*)\"[^>]*>([^]*?(?=<))<img(.+?(?=src=\"))src=\"([^\"]*)\"[^>]*>([^]*?(?=<))<\/a>([^]*?(?=<))<\/td>([^]*?(?=<))<td[^>]*>([^]*?(?=<))<table[^>]*>([^]*?(?=<))<tbody[^>]*>([^]*?(?=<))<tr[^>]*>([^]*?(?=<))<td[^>]*>([^]*?(?=<))<h4[^>]*>([^]*?(?=<\/h4>))', 'g');
        itemListRE.lastIndex = index;
        const itemListRet = html.matchAll(itemListRE);
        let items = [];
        for (const item of itemListRet) {
            let obj = {};
            obj.itemName = item[14].trim();
            obj.itemLink = item[2];
            obj.itemImage = item[5];
            items.push(obj);
        }
        ret.items = items;
        return ret;
    }
}

export default brandFunctions;