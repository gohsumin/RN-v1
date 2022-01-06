let brandFunctions = {
    "UrbanOutfitters": function urbanOutfitters(html) {
        var ret = {};
        var index = 0;
        const brandImageRE = new RegExp("<img([^]+?(?=class))class=\"x_header-logo-img\"([^]+?(?=src=\"))src=\"([^\"]*)\"");
        const brandImageRet = html.match(brandImageRE);
        if (!brandImageRet) {
            return false;
        }
        ret.brandImage = brandImageRet[3];
        index = brandImageRet.index;
        const itemListRE = new RegExp('<td([^]+?(?=class))class=\"x_item-image\"([^]+?(?=rowspan))rowspan=\"2\"([^]*?(?=<))<a([^]+?(?=href))href=\"([^\"]*)\"([^]*?(?=<))<img([^]+?(?=src=\"))src=\"([^\"]*)\"([^]*?(?=<))<\/a([^]*?(?=<))<\/td([^]*?(?=<))<td([^]*?(?=<))<table([^]*?(?=<))<tbody([^]*?(?=<))<tr([^]*?(?=<))<td([^]*?(?=<))<h4([^]+?(?=>))>([^]+?(?=<))', 'g');
        itemListRE.lastIndex = index;
        const itemListRet = html.matchAll(itemListRE);
        if (!itemListRet) {
            return false;
        }
        let items = [];
        for (const item of itemListRet) {
            let obj = {};
            obj.itemName = item[18].trim();
            obj.itemLink = item[5];
            obj.itemImage = item[8];
            items.push(obj);
        }
        ret.items = items;
        return ret;
    }
}

export default brandFunctions;