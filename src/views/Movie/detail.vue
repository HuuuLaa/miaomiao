<template>
    <div id="detailContainer" class="slide-enter-active">
        <Header title="影片详情" >
            <i class="iconfont icon-left" @touchstart="handleToback"></i><h1>影片详情</h1>
        </Header>
        <Loading v-if="isLoading" />
        <div v-else id="content" class="contentDetail">
            <div class="detail_list">
                <div class="detail_list_bg"></div>
                <div class="detail_list_filter"></div>
                <div class="detail_list_content">
                    <div class="detail_list_img">
                        <img :src="detailMovie.albumImg" alt="">
                    </div>
                    <div class="detail_list_info">
                        <h2>{{detailMovie.nm}}</h2>
                        <p>{{detailMovie.enm}}</p>
                        <p>{{detailMovie.sc}}</p>
                        <p>{{detailMovie.cat}}</p>
                        <p>{{detailMovie.src}} / {{detailMovie.dur}}</p>
                        <p>{{detailMovie.pubDesc}}</p>
                    </div>
                </div>
            </div>
            <div class="detail_intro">
                <p>{{detailMovie.dra}}</p>
            </div>
            <div class="detail_player swiper-container" ref="detail_player">
                <ul class="swiper-wrapper">
                    <li v-for="(item,index) in detailMovie.photos" :key="index" class="swiper-slide">
                        <div>
                            <img :src="item | setWH('140.127')" alt="">
                        </div>
                        <p>dddd</p>
                        <p></p>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import Header from "@/components/Header";
import Loading from "@/components/Loading"

export default {
    name: 'Detail',
    components:{
        Header,
        Loading
    },
    props: ['movieId'],
    data(){
        return{
            detailMovie:{},
            isLoading: true
        }
    },
    mounted(){
        //console.log(this.movieId)
        var _this = this;
        _this.$axios.get('/api/detailmovie?movieId='+_this.movieId).then((res)=>{
            var msg = res.data.msg;
            if(msg === 'ok'){
                _this.isLoading = false;
                _this.detailMovie = res.data.data.detailMovie;
                //console.log(_this.detailMovie)
                _this.$nextTick(()=>{
                    new Swiper(_this.$refs.detail_player,{
                        slidePerView: 'auto',
                        freeMode: true,   //自由拖放
                        freeModeSticky: true,  //自行对齐
                        observer: true,//修改swiper自己或子元素时，自动初始化swiper
                        observeParents: true//修改swiper的父元素时，自动初始化swiper
                    });
                });
            }
        })
    },
    methods: {
        handleToback(){
            this.$router.back(-1);
        }
    },
}
</script>

<style scoped>
#detailContainer{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    min-height: 100%;
    background: white;
}
#detailContainer .contentDetail{display: block; margin-bottom: 0}
#detailContainer.slide-enter-active{animation: .5s slideMove;}
@keyframes slideMove{
    0%{ transform: translateX(100%);}
    100%{ transform: translateX(0);}
}
#detailContainer .detail_list{height: 190px; width: 100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{width: 100%; height: 100%; background: url(/images/movie_1.jpg) 0 40%; filter: blur(20px); position: absolute;}
.detail_list .detail_list_filter{width: 100%; height: 100%; position: absolute; background-color: #40454d; opacity: .55; }
.detail_list .detail_list_content{ display: flex; width: 100%; height: 100%; position: absolute; left: 0; top:0; z-index: 2;}
.detail_list .detail_list_img{width: 108px; height: 150px; border: 1px solid #f0f2f3; margin: 20px;}
.detail_list .detail_list_img img{width:100%; height: 100%;}
.detail_list .detail_list_info{margin-top: 20px; }
.detail_list .detail_list_info h2{font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{color: white; line-height: 20px; font-size: 14px; color: #ccc}

#detailContainer .detail_intro{padding: 10px;}
#detailContainer .detail_player{margin: 20px;}
.detail_player .swiper-slide{width: 70px !important; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{width: 100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){color: #999;}
</style>
