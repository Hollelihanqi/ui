
import { Directive } from "vue";
const map = new WeakMap()
const ob = new ResizeObserver( (entries) => {
  for(const entry of entries){
    console.log('ResizeObserver',entry);
    const handle = map.get(entry.target)
    if(handle){
      const box = entry.borderBoxSize[0]
      handle({
        width: box.inlineSize,
        height:box.blockSize
      })
    }
  }
})

 const resizeElement: Directive = {
  mounted: function (el, binding) {
    ob.observe(el)
    map.set(el, binding.value)
  },
  unmounted(el, binding) {
    ob.unobserve(el)
  }
};
export default resizeElement