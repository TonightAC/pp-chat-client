<template>
    <el-container>
        <el-header class="el-header">
            <el-card style="width: 100%; height: 100%; border-radius: 0" :body-style="{ padding: '10px' }" shadow="never">
                <i @click="back" class="el-icon-arrow-left" style="position: absolute; top: 50%; transform: translateY(-50%); font-size: 20px"></i>
                <div style="font-size: 16px; position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%)">添加</div>
            </el-card>
        </el-header>
    </el-container>
</template>

<script>
    export default {
        name: "Add",
        methods: {
            back () {
                this.$emit('switchView', {chatShow: false, homeShow: true, addShow: false, settingShow: false});
            }
        }
    }
</script>

<style scoped>
    .el-header {
        position: absolute;
        padding: 0;
        left: 0;
        right: 0;
        top: 0;
    }
</style>
