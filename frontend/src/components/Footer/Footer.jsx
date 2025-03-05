import style from './Footer.module.css';

export default function Footer() {
    return (
        <div>
            <footer className={style.footer}>
                <div className={style.contactInfo}>
                    <h3>Contáctanos</h3>
                    <p>Teléfono: (962) 456-7890</p>
                    <p>Correo electrónico: contacto@escolares.com</p>
                    <p>Dirección: Tapachula, Chiapas, México</p>
                </div>
                <div className={style.socialMedia}>
                    <h3>Síguenos en</h3>
                    <ul>
                        <li><a href="https://www.facebook.com/" target="_blank">Facebook</a></li>
                        <li><a href="https://twitter.com/" target="_blank">Twitter</a></li>
                        <li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
                        <li><a href="https://www.linkedin.com/company/" target="_blank">LinkedIn</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    );

}