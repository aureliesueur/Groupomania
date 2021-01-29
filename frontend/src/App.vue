                            
<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> 
            <img src="/images/icon-left-font.png" width="400" alt="Site logo" class="navbar-brand img-large" />
            <img src="/images/icon.png" width="100" alt="Site logo" class="navbar-brand img-narrow"/>
            <button @click="toggleNav" type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navCollapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active"><router-link to="/" class="nav-link" >Accueil</router-link></li>   
                    <li class="nav-item"><router-link to="/articles" class="nav-link">Partagez vos articles</router-link></li>
                    <li class="nav-item"><router-link to="/gifs" class="nav-link" >Partagez vos Gifs</router-link></li>
                </ul>
            </div>
        </nav>
            
        <nav v-if="toggleOn" >
            <div class="menu">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active"><router-link to="/" class="nav-link" >Accueil</router-link></li>   
                    <li class="nav-item"><router-link to="/articles" class="nav-link">Partagez vos articles</router-link></li>
                    <li class="nav-item"><router-link to="/gifs" class="nav-link" >Partagez vos Gifs</router-link></li>
                    <li class="nav-item menu__close" @click="toggleNav"><i class="far fa-window-close"></i></li>
                </ul>
            </div>
        </nav>
        <router-view />    
    </div>
</template>

<script>   
    
 export default {
	name: "App", 
    data() {
        return {
            toggleOn: false
        }
    },
    methods: {
        toggleNav() {
            this.toggleOn = !this.toggleOn;
        }
    }
}   
</script>

<style lang="scss">
    
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
$color-tertiary: #6f757b;
    
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
    
button, .card__btnDetails {
    background: $color-secondary!important;
    border: 2px solid black!important;
    color: #FFF!important;
}

button:hover {
    box-shadow: 2px 2px 4px $color-tertiary;
}

.auth__btn, .deconnect__btn, .card__btnWeb, .account__btn, .confirm__btn {
    margin-bottom: 10px!important;
    background-color: #FFF!important;
    border: 2px solid $color-primary!important;
    color: black!important;
}
    
h1 {
    font-size: 2em!important;
    margin-top: 150px!important;
    margin-bottom: 30px!important;
}
    
h2 {
    font-size: 1.5em!important;
    color: $color-primary;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px!important;
}
    
.navbar {
    position: fixed!important;
    width: 100%;
    padding-right: 30%!important;
    z-index: 2;
}
    
.menu {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    background: $color-secondary;
    border-radius: 5px;
    padding: 20px;
    text-align: left;
    & a, li {
        color: #FFF;
        margin-top: 0!important;
        &:hover {
            color: $color-primary;
        }
    }
    &__close {
        text-align: right;
        font-size: 1.2em;
    }      
}
  
.img-narrow {
    display: none!important;
}
    
//Média query pour adapter la page au smartphone
@media screen and (max-width : 768px) {
    h1 {
        font-size: 1.4em!important;
        margin-top: 120px!important;
    }
    .navbar {
        padding-right: 2%!important;
    }
    .img-narrow {
        display: block!important;
    }
    .img-large {
        display: none!important;
    }
    .btn, .btn-primary {
        font-size: 0.8em!important;
    }
}
    
    
</style>
