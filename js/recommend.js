//打乱顺序
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}

//随机文章函数，根据标签实现相关性
function recommended_posts(page, site, limit = 5) {
    page.tags = page.tags || []
    if (page.tags.length == 0) return [];
    let pageTags = page.tags.map(x => x.name);
    let sitePosts = site.posts.toArray().map(x => {

        return { tags: x.tags.toArray().map(y => y.name), title: x.title, permalink: x.permalink, date: x.date, img: x.headimg }
    });
    let relatedPosts = pageTags.map(x => sitePosts.filter(y => y.title != page.title && (y.tags.indexOf(x) != -1 || y.date.format('MM/DD') == page.date.format('MM/DD') || y.headimg == page.headimg))).reduce((prev, next) => {
        return prev.concat(next);
    }, []);
    return shuffle(Array.from(new Set(relatedPosts))).slice(0, limit);

}

//随机头图，根据标题link.title生成固定的随机头图
var hashCode = function (str) {
    if (!str && str.length === 0) {
        return 0;
    }

    var hash = 0;
    for (var i = 0, len = str.length; i < len; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
};  
var featureimg = 'https://picup.heson10.com/img/upyun/home_top_bg.webp'; 
var featureImages = theme.featureImages;
featureimg = featureImages[Math.abs(hashCode(link.title) % featureImages.length)];

//把绝对链接改为相对链接，下面的30代表从30个字符开始截取
//取值要自己去试试，改为相对链接的好处就是可用pjax                            
var lianjie = function (e){
    return e.substr(23)
}