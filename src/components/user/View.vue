<template lang="pug">
  .view
    app-tool-bar
    app-table(style="margin-top:15px")
    app-page(style="margin-top:25px")
    app-modal
</template>
<script>
import AppTable from './Table'
import AppToolBar from './ToolBar'
import AppModal from './Modal'
import AppPage from './Page'
export default {
  components: { AppTable, AppToolBar, AppModal, AppPage }
}
</script>

