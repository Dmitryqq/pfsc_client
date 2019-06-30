<template>
    <div class="modal" tabindex="-1" role="dialog" id="thisModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-primary" @click="clickHandler">{{button}}</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'Modal',
    props:{
        title: String,
        button: String
    },
    methods:{
        clickHandler(){
            this.$emit('clickHandler');
            this.hide();
        },
        show(){
            $('#thisModal').modal('show');
        },
        hide(){
            $('#thisModal').modal('hide');
        }
    }
}
</script>

