<template>

  <div class="deck">
    <div class="card" id="flip">
      <div class="front face" >
        <h2>Card flip 1</h2>
        <button class="rad-button" @click="Btnflip()">Flip me</button>
        <div class="bottext">
          <h3>6000kr</h3>
        </div>
      </div>
      <div class="back face">
        <h2>Basic</h2>
        <ul>
          <li>6 Sider</li>
          <li>Kontaktside</li>
          <li>SEO optimeret</li>
          <li>Mobilvenlig</li>
        </ul>
        <div class="botprice">
          <h3>6000kr</h3>
        </div>
        <button class="return" @click="Btnflip()"><i class="fa fa-undo"></i></button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Card",

  methods: {
    Btnflip() {
      document.getElementById("flip").classList.toggle("flipped");         
    },


  }
}
</script>

<style scoped lang="scss">


button{
  &:focus{
    outline:none;
  }
}
.deck{
  width:30%;
  height:380px;
  position:relative;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  border-radius:10px;
}
.card{
  margin : 0;
  width:100%;
  height:100%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: all .5s linear;
  transition: all .5s linear;
  border-radius:10px;
}
.face {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color:whitesmoke;  
  border-radius:10px;
}
.back {
  overflow:hidden;
  z-index:-1;
  display: block;
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  box-sizing: border-box;
  &:before{
    content: "";
	  position: absolute;
      top : 0;
      left : 0;
	  width: 100%;
	  height: 100%;
	  z-index: -1;
    background-size:100% 100%;
	  background: url('https://i.imgur.com/W3tra4F.gif');
	  -webkit-transform: rotateY(180deg);
	  -moz-transform: rotateY(180deg);
	  -ms-transform: rotateY(180deg);
	  -o-transform: rotateY(180deg);
	  transform: rotateY(180deg);
  }
}
.front, .back{
  transition: all .5s linear;
}
.front{
  background-image:url('https://i.imgur.com/W3tra4F.gif');
  z-index:1;
  box-shadow: 5px 5px 5px #aaa;
}
.back{
  box-shadow: 0 0 0 #aaa;
}
.flipped {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  .front{
    box-shadow:0 0 0 #aaa;
  }
  .back{
    box-shadow: 5px 5px 5px #aaa;
  }
}
.bottext{
  position:absolute; 
  color:whitesmoke;
  width:100%; 
  height:100px; 
  bottom:0; 
  border-radius:0 0 10px 10px; 
  text-align:center;
  padding:10px;
  h2{
    margin:0;
  }
  h3{
    margin:10px 0;
  }
}
.rad-button{
  border:2px solid gray;
  color:gray;
  width:90px;
  background-color:rgba(255, 255, 255, .3);
  padding:10px;
  border-radius:4px;
  cursor: pointer;
  position:absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 110px;
  -webkit-transition:all .5s linear;
  transition:all .5s linear;
}
.rad-button:hover{
  color:gray;
  background-color:rgba(255, 255, 255, 1);
}

.front{
  h2, h3{
    text-align:center;
    color:whitesmoke;
  }
}

.back{
  h2{
    margin:0;
    border-radius:10px 10px 0 0;
    padding:10px;
    text-align:center;
    color:whitesmoke;
  }
  ul{
    text-align:center;
    list-style:none;
    padding:10px;
    margin:0;
    li{
      margin-top:15px;
      color:whitesmoke;
    }
  }
  .botprice{
    position:absolute;
    bottom:30px;
    border-radius:0 0 10px 10px;
    text-align:center;
    width:100%;
    padding:15px;
    color:whitesmoke;
    h3{
      margin:0px;
    }    
  }
}
.return{
  position:absolute;
  left: 0;
  width:100%;
  height: 30px;
  background-color:transparent;
  border:none;
  color:gray;
  cursor:pointer;
  padding:5px;
  bottom:0;
  border-radius:0 0 10px 10px;
  background-color:darken(whitesmoke, 10%);
  font-size:18px;
  &:focus{
    outline:none;
  }
}

</style>