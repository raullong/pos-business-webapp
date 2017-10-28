<template lang="pug">
  .view
    app-tool-bar
    app-table
    app-page(style="margin-top:10px")
    app-modal
</template>
<script>
import AppTable from './Table'
import AppToolBar from './ToolBar'
import AppPage from './Page'
import AppModal from './Modal'
export default {
  components: { AppTable, AppToolBar, AppPage, AppModal }
}
</script>

