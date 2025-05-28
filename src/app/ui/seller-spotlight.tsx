import {inter} from '@/app/ui/fonts';
import styles from './home.module.css';
import Image from "next/image";

export default function SellerSpotlight() {
    return (
        <section className={`${inter.className} ${styles["seller-spotlight"]}`}>
            <div className={`${styles["seller-spotlight-wrapper"]}`}>
                <h2>Seller spotlight</h2>
                <div className={`${styles["seller-spotlight-detail"]}`}>
                    <h3>Katie's Pottery</h3>
                    <p>For over 13 years, Katie has transformed clay into unique pottery. Her passion shines through in every piece, from her distinctive original designs to special, custom-commissioned works crafted just for you. With Katie, you're getting a handcrafted work of art with a personal touch.</p>
                </div>
                <div className={`${styles["seller-spotlight-detail"]}`}>
                    <h4>Location</h4>
                    <p>From her home studio in Mesa, Arizona, Katie draws inspiration from her surroundings, transforming creative visions into beautiful pottery pieces.</p>
                </div>
                <div className={`${styles["seller-spotlight-detail"]}`}>
                    <h4>Testimonial</h4>
                    <p>"Our custom mug from Katie is absolutely perfect! The quality is amazing, and it's clear how much care she puts into every piece. It's truly become my favorite." — Sarah M.</p>
                </div>
            </div>
            <div className={`${styles["seller-image-wrapper"]}`}>
                <Image src="/images/seller-spotlight_large.webp" alt="Katie's Pottery" width={215} height={301}/>
            </div>
        </section>
    );
}
