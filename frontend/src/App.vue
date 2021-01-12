                            
<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> 
            <img src="/images/icon-left-font.png" width="400" alt="Site logo" class="navbar-brand" />
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#nav-collapse">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="nav-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active"><router-link to="/api/" class="nav-link" >Accueil</router-link></li> 
                    <li class="nav-item"><router-link to="/api/gifs" class="nav-link" >Partagez vos Gifs</router-link></li>  
                    <li class="nav-item dropdown"><router-link to="/api/articles" class="nav-link dropdown-toggle" id="navbarDropdown" data-toggle="dropdown">Partagez vos articles</router-link>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li class="dropdown-item"><router-link to="/api/articles" class="nav-link dropdown-item">Découvrir tous les articles</router-link></li>  
                            <li class="dropdown-item"><router-link to="/api/articles/add" class="nav-link dropdown-item">Poster un nouvel article</router-link></li>  
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <router-view />
    </div>
</template>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
