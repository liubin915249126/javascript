[
    {
      "name": "usdt-airdrop",
    // name = usdt-airdrop
        // airdropInfo.beforeTradeActivity?banner.title : banner.titleActivity    
        // airdropInfo.beforeTradeActivity?banner.subTitle : banner.subTitleActivity
        //   <i18n-link
        //   class="banner__link icon iconfont"
        //   v-if="airdropInfo.current_at"
        //   :name="banner.page"
        //   :query="banner.linkQuery"
        //   v-gtm="['banner', $route.name, `banner.${banner.name}`]"
        // >
        //   <span class="banner__link-txt">
        //     {{airdropInfo.beforeTradeActivity ?
        //     banner.guide : banner.guideActivity}}
        //   </span>
        //   <!-- 活动开始前是立即预约, 开始后是立即参与 -->
        // </i18n-link>  
    // name = 'koreaPersonalContest'
        // title,subTitle
        //    <a
        //       class="banner__link icon iconfont icon-right1"
        //       :name="banner.page"
        //       :href="`${base}/ko-KR/personalContest?contestId=9`"
        //       target="_self"
        //       v-gtm="['banner', $route.name, `banner.${banner.name}`]"
        //     >
        //       <span class="banner__link-txt" v-sanitize-html="banner.guide"></span>
        //     </a>
   // name = else
        // title,subTitle
        // <a
        //     class="banner__link icon iconfont icon-right1"
        //     v-if="banner.externalLink"
        //     :href="banner.link | sanitizeLink"
        //     target="_blank"
        //     v-gtm="['banner', $route.name, `banner.${banner.name}`]"
        //   >
        //     <span class="banner__link-txt" v-sanitize-html="banner.guide"></span>
        //   </a>
        //   <i18n-link
        //     v-else
        //     class="banner__link icon iconfont icon-right1"
        //     :name="banner.page"
        //     :query="banner.linkQuery"
        //     v-gtm="['banner', $route.name, `banner.${banner.name}`]"
        //   >
        //     <span class="banner__link-txt" v-sanitize-html="banner.guide"></span>
        //   </i18n-link>    
      "link": "",
      "page": "usdt-airdrop",
      "imgBanner": true, //为true则会显示 imgs下面的图片
      "externalLink": false,
      "imgs": {
        "img768": "/images/banner/768/usdt-airdrop.jpg",
        "img1280": "/images/banner/1280/usdt-airdrop.jpg",
        "img1920": "/images/banner/1920/usdt-airdrop.jpg"
      },
      "title": "$:newTopBanner0Title",
      "subTitle": "$:newTopBanner0SubTitle",
      "guide": "$:newTopBanner0Guide",
      "titleActivity": "$:newTopBanner0TitleActivity",
      "subTitleActivity": "$:newTopBanner0SubTitleActivity",
      "guideActivity": "$:newTopBanner0GuideActivity"
    }
]    