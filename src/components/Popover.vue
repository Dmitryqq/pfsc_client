<template>
    <label class="icon-btn qs">
        <i class="fas fa-info-circle">
            <div class="pop">
                <slot></slot>
            </div>
        </i>
    </label>
</template>

<script>
export default {
    name: 'Popover'
}
</script>


<style>
.qs {
  cursor: pointer;
  display: inline-block; 
  position: relative;
  text-align: center; 
}  
.pop {
    background-color: #fff;
    border-radius: .3rem;
    border: 1px solid rgba(0,0,0,.2);
    bottom: 42px;
    color: #000;
    display: none;
    font-size: .875rem;
    left: -95px;
    padding: 7px 10px;
    position: absolute;
    width: 200px; 
    z-index: 4;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
}
.pop:before, .pop::after{
    border-color: transparent;
    position: absolute;
    display: block;
    content: "";
    border-style: solid;
    left: calc(100px - .6rem);
    width: 1rem;
    margin: 0 .3rem;
}
.pop:before {
    bottom: 0;
    border-width: .5rem .5rem 0;
    border-top-color: rgba(0,0,0,.25);    
    bottom: calc((.5rem + 1px) * -1);
    height: .5rem;  
}
.pop::after{
    bottom: 1px;
    border-width: .6rem .5rem 0;
    border-top-color: #fff;  
    bottom: calc((.5rem + 1px) * -1);    
    height: .3rem;
}
.qs:hover .pop{
    display: block;    
}
</style>

