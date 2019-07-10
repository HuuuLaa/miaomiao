<template>
    <div class="search-body">
        <div class="search-input">
            <div class="search-input-wrapper">
                <i class="iconfont icon-search"></i>
                <input type="text" v-model="message">
            </div>
        </div>
        <div class="search-result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <!-- <li>
                    <div class="img"><img src="/static/images/movie.jpg" alt=""></div>
                    <div class="info">
                        <p><span>无名之辈</span><span>8.5</span></p>
                        <p>A Cool Fish</p>
                        <p>剧情，喜剧，犯罪</p>
                        <p>2018-11-16</p>
                    </div>
                </li> -->
                <li v-for="item in moviesList" :key="item.id">
                    <div class="img"><img :src=" item.img | setWH('128.180') " alt=""></div>
                    <div class="info">
                        <p><span>{{item.nm}}</span><span>{{item.sc}}</span></p>
                        <p>{{item.enm}}</p>
                        <p>{{item.cat}}</p>
                        <p>{{item.rt}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Search",
    data(){
        return{
            message : '',
            moviesList:[]
        }
    },
    methods : {
        cancelRequest(){
            if(typeof this.source ==='function'){
                this.source('终止请求')
            }
        },
    },
    watch: {
        message(newVal){
            var _this = this;
            var cityId = _this.$store.state.city.id;
            //console.log(newVal)
            //防抖 （快速输入情况）
            // clearTimeout()
            // setTimeout()

            this.cancelRequest();

            this.$axios.get('/api/searchList?cityId=' + cityId + '&kw='+newVal,{
                cancelToken: new this.$axios.CancelToken(function (c) {
                    _this.source = c;
                })
            }).then((res)=>{
                //console.log(res)
                var msg = res.data.msg;
                var movies = res.data.data.movies;
                if(msg && movies){
                    this.moviesList = res.data.data.movies.list;
                }
            }).catch((err) =>{
                if (this.$axios.isCancel(err)) {
                    console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
                } else {
                    //handle error
                    console.log(err);
                }
            })
        }
    }
}
</script>

<style>
#content .search-body{flex: 1; overflow: auto;}
.search-body .search-input{padding: 8px 10px; background: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search-body .search-input-wrapper{padding: 0px 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff;display: flex;}
.search-body .search-input-wrapper i{font-size: 16px; padding: 4px 0;}
.search-body .search-input-wrapper input{border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px;}
.search-body .search-result h3{font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search-body .search-result li{border-bottom: 1px #c9c9c9 dashed; padding: 10px 15px; box-sizing: border-box; display: flex;}
.search-body .search-result .img{width: 60px; float: left;}
.search-body .search-result .img img{width: 100%;} 
.search-body .search-result .info{float: left; margin-left: 15px; flex: 1;}
.search-body .search-result .info p{height: 22px; display: flex; line-height: 22px; font-size: 12px;}
.search-body .search-result .info p:nth-of-type(1) span:nth-of-type(1){font-size: 18px; flex: 1;}
.search-body .search-result .info p:nth-of-type(1) span:nth-of-type(2){font-size: 16px; color: #f7c710;}
</style>
