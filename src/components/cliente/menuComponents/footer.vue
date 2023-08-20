<template>
    <footer class="footer">
        <div class="cont">
            <div class="fila">
                <div class="footer-col">
                    <h4>Desarrollares</h4>
                    <ul>
                        <li><a href="https://github.com/MarcoChavezB">Marco Chavez</a></li>
                        <li><a href="https://github.com/anthonyfs77">Anthony Fuentes</a></li>
                        <li><a href="https://github.com/AAReynosoG">Abraham Alonoso</a></li>
                        <li><a href="#">Jose Jeronimo</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>get help</h4>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">shipping</a></li>
                        <li><a href="#">returns</a></li>
                        <li><a href="#">order status</a></li>
                        <li><a href="#">payment option</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Shop</h4>
                    <ul>
                        <li><a href="#">watch</a></li>
                        <li><a href="#">bag</a></li>
                        <li><a href="#">shoes</a></li>
                        <li><a href="#">dress</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>follow us</h4>
                    <div class="social-links">
                        <a href="#"><span class="material-symbols-outlined">travel_explore</span></a>
                        <a href="#"><span class="material-symbols-outlined">travel_explore</span></a>
                        <a href="#"><span class="material-symbols-outlined">travel_explore</span></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.footer{
    background-color: #24262b;
    height: 20em;    
}
.cont{
    max-width: 1170px;
    margin: auto;
}

.fila{
    display: flex;
    flex-wrap: wrap;
}

ul{
    list-style-type: none;
}

.footer{
    background-color: #24262b;
}

.footer-col{
    width: 25%;
    padding: 20px 15px;
}

.footer-col h4{
    font-size: 18px;
    color: white;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
}

.footer-col h4::before{
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color: #f8be28;
    height: 2px;
    box-sizing: border-box;
    width: 50px;
}

.footer-col ul li:not(:last-child){
    margin-bottom: 10px;
}

.footer-col ul li a{
    font-size: 16px;
    text-transform: capitalize;
    color: white ;
    text-decoration: none;
    font-weight: 300;
    color: #bbbbbb;
    display: block;
    display: block ;
    transition: all 0.3s ease;
}

.footer-col ul li a:hover{
    color: white;
    padding-left: 8px;
}

.footer-col .social-links a{
    display: inline-block;
    height: 40px;
    width: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 0 10px 10px 0;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    color: white;
    transition: all 0.5s ease;
}

.footer-col .social-links a:hover{
    color: #24262b;
    background-color: white;
}


/*Media querrs*/

@media(max-width: 767px){
    .footer-col{
        width: auto;
        margin-bottom: 30px;
    }
}

@media(max-width: 574px){
    .footer-col{
        width: 100%;
        margin-bottom: 30px;
    }

    .footer{
        height: auto;
    }
}

</style>