                            
<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> 
            <img src="/images/icon-left-font.png" width="400" alt="Site logo" class="navbar-brand" />
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#nav-collapse">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="nav-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active"><router-link to="/" class="nav-link" >Accueil</router-link></li>   
                    <li class="nav-item"><router-link to="/articles" class="nav-link">Partagez vos articles</router-link></li>
                    <li class="nav-item"><router-link to="/gifs" class="nav-link" >Partagez vos Gifs</router-link></li>
                </ul>
            </div>
        </nav>
        <router-view />    
    </div>
</template>

<script>   
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
    
button, .card__btnDetails {
    background: #324392!important;
    border: 2px solid black!important;
    color: #FFF!important;
}

.auth__btn, .deconnect__btn, .card__btnWeb, .account__btn, .confirm__btn {
    margin-bottom: 10px!important;
    background-color: #FFF!important;
    border: 2px solid #cc2810!important;
    color: black!important;
}
    
h1 {
    font-size: 2em!important;
    margin-top: 150px!important;
    margin-bottom: 30px!important;
}
    
h2 {
    font-size: 1.5em!important;
    color: #cc2810;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px!important;
}
    
.navbar {
    position: fixed!important;
    width: 100%;
    z-index: 2;
}
</style>
