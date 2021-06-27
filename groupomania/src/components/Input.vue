<template>
      
         <div class="input-data">
            <input type="text" :value="modelValue" :name="modelValue" @input="$emit('update:modelValue', $event.target.value)" required>
            <div class="underline"></div>
            
            <label>{{title}}</label>
            </div>
  
</template>

<script>
export default {
name : "input",
props : {
  modelValue :  {
    type : String,
  },
  title : {
    type : String,  
  }
}
}
</script>

<style scoped lang="scss">
$primary: #091f43;
$secondary: #d1515a;


*{
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}
.input-data{
  height: 40px;
  width: 100%;
  margin-bottom: 30px;
  position: relative;
}
.input-data input{
  height: 100%;
  width: 100%;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid silver;
}
.input-data input:focus ~ label,
.input-data input:valid ~ label{
  transform: translateY(-25px);
  font-size: 15px;
  color: $primary;
}
.input-data label{
  position: absolute;
  bottom: 10px;
  left: 0;
  color: grey;
  pointer-events: none;
  transition: all 0.3s ease;
}
.input-data .underline{
  position: absolute;
  height: 2px;
  width: 100%;
  bottom: 0;
}
.input-data .underline:before{
  position: absolute;
  content: "";
  left: 0;
  height: 100%;
  width: 100%;
  background: $primary;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}
.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before{
  transform: scaleX(1);
}
</style>