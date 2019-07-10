<template>
  
    <keep-alive>
        <router-view  v-if="isRouterAlive"/>
    </keep-alive>
  
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
          isRouterAlive: true
        }
    },
     // 提供reload方法
    provide () {
      return {
        reload: this.reload
      }
    },
    methods: {
      reload () {
        var _this = this;
        _this.isRouterAlive = false;
        _this.$nextTick(()=> {
          _this.isRouterAlive = true;
        });
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} 
</style>
