<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/nav'
export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>
