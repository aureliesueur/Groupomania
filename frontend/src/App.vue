<!--PAGE DE BASE DU FRONTEND DE L'APPLICATION GROUPOMANIA-->                           
<template>
    <div id="app">
        <!--Menu présent sur toutes les pages quand on est sur desktop-->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> 
            <!--Grand logo s'affiche quand on est sur desktop-->
            <img src="/images/icon-left-font.png" width="400" aria-label="Logo Groupomania" alt="Logo Groupomania" class="navbar-brand img-large" />
            <!--Petit logo s'affiche quand on est sur tablette ou smartphone-->
            <img src="/images/icon.png" width="100" alt="Site logo" class="navbar-brand img-narrow"/>
            <div class="collapse navbar-collapse" id="navCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active "><router-link to="/" class="nav-link" aria-label="Lien vers la page accueil" >Accueil</router-link></li>   
                    <li class="nav-item "><router-link to="/articles" class="nav-link " aria-label="Lien vers la plateforme articles">Partagez vos articles</router-link></li>
                    <li class="nav-item "><router-link to="/gifs" class="nav-link navbar__link" aria-label="Lien vers la plateforme Gifs">Partagez vos Gifs</router-link></li>
                </ul>
            </div>
            <!--Bouton qui permet d'ouvrir ou de fermer un menu latéral quand on est sur smartphone ou tablette-->
            <button @click="toggleNav" type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navCollapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
            
        <nav v-if="toggleOn" >
            <!--Menu latéral qui s'affiche quand on est sur smartphone ou tablette-->
            <div class="menu">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active"><router-link to="/" class="nav-link" aria-label="Lien vers la page accueil">Accueil</router-link></li>   
                    <li class="nav-item"><router-link to="/articles" class="nav-link" aria-label="Lien vers la plateforme articles">Partagez vos articles</router-link></li>
                    <li class="nav-item"><router-link to="/gifs" class="nav-link" aria-label="Lien vers la plateforme Gifs">Partagez vos Gifs</router-link></li>
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
    font-weight: bold;
    color: #OOO;
    font-family: 'Comfortaa', 'Varela', Verdana, sans-serif;
}
    
h2 {
    font-size: 1.5em!important;
    color: $color-primary;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px!important;
    font-family: 'Comfortaa', 'Varela', Verdana, sans-serif;
}
    
.navbar {
    position: fixed!important;
    width: 100%;
    padding-right: 30%!important;
    z-index: 3;
}
    
.nav-link {
    color: #FFF!important;
    position: relative;
    line-height: 20px;
    &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%) scaleX(0);
        transform-origin: 50% 50%;
        width: 100%;
        height: 2px;
        background-color: rgba(255,255,255,0.8);
        transition: transform 250ms;
    }
    &:hover {
        font-weight: bold!important;
        &::after {
          transform: translateX(-50%) scaleX(1);
        }
    }
}
    
.active {
    font-weight: bold!important;
}
    
.navbar-toggler {
    position: absolute;
    right: 10px; 
    top: 10px;
}
    
.menu {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
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

/*KEYFRAMES UTILISES SUR PLUSIEURS PAGES*/
    
@keyframes opacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
    
@keyframes revelation {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes reverseRevelation {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}
    
@keyframes lateralRevelation {
    0% {
        opacity: 0;
        transform: translateX(20px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}
    
@keyframes leftShow {
    0% {
        opacity: 0;
        transform: translateX(-40px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}
    
@keyframes rightShow {
    0% {
        opacity: 0;
        transform: translateX(40px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}
 
/*MEDIA QUERIES POUR RENDRE LE SITE RESPONSIVE*/
    
//Média query pour adapter la page au smartphone
@media screen and (min-width : 768px) and (max-width : 1024px) { 
   .navbar-toggler {
        right: 10px; 
        top: 20px;
    }
    .img-narrow {
        display: block!important;
    }
    .img-large {
        display: none!important;
    }
}
    
//Média query pour adapter la page au smartphone
@media screen and (max-width : 768px) {
    h1 {
        font-size: 1.4em!important;
        margin-top: 120px!important;
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
