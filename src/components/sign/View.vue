<template lang="pug">
  .view
    app-tool-bar
    app-table
    app-page
</template>

<script>
import AppPage from './Page'
import AppTable from './Table'
import AppToolBar from './ToolBar'
export default {
  components: { AppPage, AppTable, AppToolBar }
}
</script>
