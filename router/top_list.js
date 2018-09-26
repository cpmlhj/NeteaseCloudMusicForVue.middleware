const top_list_all = {
    "19723756": ["云音乐飙升榜", "19723756"],
    "3779629": ["云音乐新歌榜", "3779629"],
    "2884035": ["网易原创歌曲榜", "2884035"],
    "3778678": ["云音乐热歌榜", "3778678"],
    "1978921795": ["云音乐电音榜", "1978921795"],
    "991319590": ["云音乐嘻哈榜", "991319590"],
    "71385702": ["云音乐ACG音乐榜", "71385702"],
    "10520166": ["云音乐新电力榜", "10520166"],
    "3812895": ["BeatPort全球电子舞曲榜", "3812895"],
    "60131": ["日本Oricon周榜", "60131"],
    "71384707": ["云音乐古典音乐榜", "71384707"],
    "180106": ["UK排行榜周榜", "180106"],
    "60198": ["美国Billboard周榜", "60198"],
    "27135204": ["法国 NRJ Vos Hits 周榜", "27135204"],
    "11641012": ["iTunes榜Top20~", "11641012"],
    "120001": ["Hit FM Top榜", "120001"],
    "2023401535": ["英国Q杂志中文版周榜", "2023401535"],
    "2006508653": ["电竞音乐榜", "2006508653"],
    "21845217": ["KTV唛榜", "21845217"],
    "112463": ["台湾Hito排行榜", "112463"],
    "112504": ["中国TOP排行榜(港台榜)", "112504"],
    "64016": ["中国TOP排行榜(内地榜)", "64016"],
    "10169002": ["香港电台中文歌曲龙虎榜", "10169002"],
    "1899724": ["中国嘻哈榜", "1899724"]
};
const express = require("express");
const router = express();
const { createWebAPIRequest } = require("../util/util");

router.get("/", (req, res) => {
    const idx = req.query.idx;
    const id = top_list_all[idx][1];
    const cookie = req.get("Cookie") ? req.get("Cookie") : "";
    const action = "/weapi/v3/playlist/detail";
    const data = {
        id,
        n: 10000,
        csrf_token: ""
    };
    createWebAPIRequest(
        "music.163.com",
        action,
        "POST",
        data,
        cookie,
        music_req => {
            res.setHeader("Content-Type", "application/json");
            // console.log(JSON.parse(music_req).playlist.tracks.length)
            // console.log(JSON.parse(music_req).playlist.trackIds.length)
            res.send(music_req);
        },
        err => res.status(502).send("fetch error")
    );
});

module.exports = router;
