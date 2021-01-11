<!--Component du footer identique présent sur toutes les pages-->
<template>
    <footer>
        <div class="container-fluid footer">
            <div class="row">
                  <div class="col-lg-4 col-md-6 footer__social ">
                        <h3 class="footer__title">Rejoignez-nous sur les réseaux sociaux</h3>
                        <ul class="social">
                            <li class="col-sm-3">
                                <a class="social__item" href="https://twitter.com/" title="Twitter"><i class="fab fa-twitter"></i></a>
                            </li>
                            <li class="col-sm-3">
                                <a class="social__item" href="https://www.facebook.com/" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                            </li>
                            <li class="col-sm-3">
                                <a class="social__item" href="https://www.instagram.com/" title="Instagram"><i class="fab fa-instagram"></i></a>
                            </li>
                            <li class="col-sm-3">
                                <a class="social__item" href="https://www.linkedin.com/" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-4 col-md-6 footer__links links">
                        <h3 class="footer__title">Liens utiles</h3>
                        <div class="links__item">
                            <a href="#" target="_blank" class="pull-left">Site Officiel CONNECT-E</a>
                        </div>
                        <div class="links__item">
                            <a href="#" target="_blank" class="pull-left">Politique de confidentialité</a>
                        </div>
                        <div class="links__item">
                            <a href="#" target="_blank" class="pull-left">Contacter l'administrateur du site</a>
                        </div> 
                    </div>

                    <div class="col-lg-4">
                        <img src="/images/icon.png" width="150" alt="Site logo"/>
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

footer {
    background: #222;
    color: #aaa;
    padding-top: 10px;
    & h3 {
        color: #c0190e;
        letter-spacing: 1px;
        margin: 30px 0 20px;
    }
    & a {
        color: #aaa;
        &:hover {
            color: #fff;
        }
    }
}

.social {
    //overflow: hidden;
    margin: 20px 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style: none;
    padding: 0;
    & li {
        font-size: 1.8em;
        padding: 0;
        opacity: 0.7;
        //overflow: hidden;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
        &:hover {
            opacity: 1;
        }
    }
}

</style>


