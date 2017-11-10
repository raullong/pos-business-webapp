<template lang="pug">
  .view
    app-tool-bar
    app-modal
    app-table
    app-page(style="margin-top:25px")
</template>
<script>
import AppTable from './Table'
import AppModal from './Modal'
import AppToolBar from './ToolBar'
import AppPage from './Page'
export default {
  components: { AppTable, AppModal, AppToolBar, AppPage }
}
</script>
