<!--COMPONENT AFFICHANT LE FOOTER, PRESENT SUR TOUTES LES PAGES-->

<template>
    <footer>
        <div class="container footer">
            <div class="row footer__box">
                  <div class="col-12 col-md-5 footer__social ">
                        <h2 class="footer__title">Rejoignez-nous sur les réseaux sociaux</h2>
                        <ul class="social">
                            <li class="col-sm-3">
                                <a class="social__item" href="https://twitter.com/" title="Twitter" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            </li>
                            <li class="col-sm-3">
                                <a class="social__item" href="https://www.facebook.com/" title="Facebook" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            </li>
                            <li class="col-sm-3">
                                <a class="social__item" href="https://www.instagram.com/" title="Instagram" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            </li>
                            <li class="col-sm-3">
                                <a class="social__item" href="https://www.linkedin.com/" title="LinkedIn" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-12 col-md-5 footer__links links">
                        <h2 class="footer__title">Liens utiles</h2>
                        <div class="links__item">
                            <a href="#" target="_blank" aria-label="Lien vers le site de Connect-E" class="pull-left">Site Officiel CONNECT-E</a>
                        </div>
                        <div class="links__item">
                            <a href="#" target="_blank" aria-label="Confidentialité" class="pull-left">Politique de confidentialité</a>
                        </div>
                        <div class="links__item">
                            <a href="#" target="_blank" aria-label="Contact administrateur" class="pull-left">Contacter l'administrateur du site</a>
                        </div> 
                    </div>

                    <div class="col-md-2">
                        <img src="/images/icon.png" width="100" alt="Petit logo Groupomania" aria-label="Logo Groupomania" class="footer__logo img-narrow"/>
                        <img src="/images/icon-left-font.png" width="250" alt="Grand logo Groupomania" class=" footer__logo navbar-brand img-large" aria-label="Logo Groupomania" />
                    </div>
                </div>
            </div>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
  }
}
</script>

<style scoped lang="scss">
   
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
$color-footerbkg: #101010;
    
.footer {
    background: $color-footerbkg;
    color: #aaa;
    padding: 20px 20px 20px 40px;
    min-width: 100%!important;
    margin-top: 0!important;
    margin-bottom: 0!important;
    & h2 {
        color: lighten($color-primary, 10%);
        font-size: 1.2em;
        letter-spacing: 1px;
        margin: 30px 0 20px;
    }
    & a {
        color: #FFF;
        &:hover {
            font-weight: bold;
        }
    }
    &__logo {
        display:block;
        margin: auto!important;
        margin-top: 30px!important;
    }
}

.social {
    margin: 20px 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style: none;
    padding: 0;
    &__item {
        color: #FFF!important;
    }
    & li {
        font-size: 1.8em;
        padding: 0;
        opacity: 0.7;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
        &:hover {
            opacity: 1;
        }
    }
}  


    
.img-large {
    display: none!important;
}
    
.img-narrow {
    display: block!important;
}
   
    
//Média query pour adapter la page à la tablette
@media screen and (min-width : 768px) and (max-width : 1024px) { 
    .footer__logo {
        padding-right: 20px!important;
    }
    .img-narrow {
        display: block!important;
    }
}

//Média query pour adapter la page au smartphone
@media screen and (max-width : 768px) {  
    .img-large {
        display: block!important;
    }
    .img-narrow {
        display: none!important;
    }
}

</style>


