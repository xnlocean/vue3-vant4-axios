### 插槽使用示例：


```
  <nav-bar leftArrow border :placeholder="false" :safeAreaInsetTop="true" leftSlot titleSlot rightSlot >
    <template v-slot:left>
        <div>左边</div>
    </template>
    <template v-slot:title>
        <div>中间</div>
    </template>
    <template v-slot:right>
        <div>右边</div>
    </template>
  </nav-bar>
```