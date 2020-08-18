import Vue from 'vue'
import Swiper from 'swiper'
Vue.directive('swiper', {
  inserted (el, binding, vnode) {
    // let flag=binding.value.effect?binding.value.effect:'none'
    if (binding.value.current == binding.value.length - 1) {
      new Swiper('.' + binding.value.swipe, {
        // ...binding.value.free,
        // ...binding.value.films,
            loop:true,
        //    autoplay:true,
        //    effect:flag;
            pagination: {
              el: '.swiper-pagination'
            }
      })
    }
  }
})


